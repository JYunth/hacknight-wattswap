module wattswap_addr::wattswap {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::vector;
    use std::string::String;
    use aptos_framework::account;
    use aptos_framework::event::{Self, EventHandle};

    // Define error codes
    const E_SWAP_NOT_ACTIVE: u64 = 1;
    const E_NOT_OWNER: u64 = 2;
    const E_INSUFFICIENT_BALANCE: u64 = 3;
    const E_SWAP_NOT_FOUND: u64 = 4;
    const E_NOT_SELLER: u64 = 5;
    const E_NOT_BUYER: u64 = 6;

    // Define constants
    const WATTSWAP_ADDRESS: address = @wattswap_addr;

    // Struct for a WattSwap (similar to a Campaign)
    struct WattSwap has key, store, copy, drop {
        id: u64,
        seller: address, // Address of the seller
        buyer: address, // Address of the buyer (can be 0 before purchase)
        watt_amount: u64, // Amount of watts being sold
        apt_price: u64, // Price in APT
        is_active: bool, // Active status of the swap
    }

    // Struct to hold all WattSwaps
    struct WattSwaps has key {
        swaps: vector<WattSwap>,
        swap_count: u64,
    }

    // Struct to hold active listings
    struct ActiveListings has key {
        listings: vector<WattSwap>,
    }

    // Event structs
    struct WattSwapEvents has key {
        swap_created_events: EventHandle<SwapCreatedEvent>,
        purchase_events: EventHandle<PurchaseEvent>,
        confirm_events: EventHandle<ConfirmEvent>,
    }

    struct SwapCreatedEvent has drop, store {
        seller: address,
        swap_id: u64,
        watt_amount: u64,
        apt_price: u64,
    }

    struct PurchaseEvent has drop, store {
        buyer: address,
        seller: address,
        swap_id: u64,
        apt_amount: u64,
    }

    struct ConfirmEvent has drop, store {
        seller: address,
        swap_id: u64,
    }

    // Helper function to find a swap by ID
    fun find_swap_by_id(swaps: &vector<WattSwap>, swap_id: u64): (bool, u64) {
        let i = 0;
        let len = vector::length(swaps);

        while (i < len) {
            let swap = vector::borrow(swaps, i);
            if (swap.id == swap_id) {
                return (true, i)
            };
            i = i + 1;
        };

        (false, 0)
    }

    // Initialize WattSwaps
    public entry fun initialize_swaps(account: &signer) {
        let addr = signer::address_of(account);
        assert!(!exists<WattSwaps>(addr), 0); // Check if already initialized

        move_to(account, WattSwaps {
            swaps: vector::empty<WattSwap>(),
            swap_count: 0
        });

        move_to(account, WattSwapEvents {
            swap_created_events: account::new_event_handle<SwapCreatedEvent>(account),
            purchase_events: account::new_event_handle<PurchaseEvent>(account),
            confirm_events: account::new_event_handle<ConfirmEvent>(account),
        });

        move_to(account, ActiveListings {
            listings: vector::empty<WattSwap>(),
        });
    }

    // Create a new WattSwap (by a seller)
    public entry fun create_swap(
        account: &signer,
        watt_amount: u64,
        apt_price: u64,
    ) acquires WattSwaps, WattSwapEvents, ActiveListings {
        let addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(addr);

        let swap_id = swaps_ref.swap_count + 1;
        swaps_ref.swap_count = swap_id;

        let new_swap = WattSwap {
            id: swap_id,
            seller: addr,
            buyer: @0x0, // Initialize buyer to 0x0
            watt_amount,
            apt_price,
            is_active: true,
        };

        vector::push_back(&mut swaps_ref.swaps, new_swap);

       let active_listings_ref = borrow_global_mut<ActiveListings>(addr);
       vector::push_back(&mut active_listings_ref.listings, new_swap);

        let events_ref = borrow_global_mut<WattSwapEvents>(addr);
        event::emit_event(
            &mut events_ref.swap_created_events,
            SwapCreatedEvent {
                seller: addr,
                swap_id,
                watt_amount,
                apt_price,
            }
        );
    }

    // Purchase watts (by a buyer)
    public entry fun purchase(
        account: &signer,
        seller: address,
        swap_id: u64,
    ) acquires WattSwaps, WattSwapEvents, ActiveListings {
        let buyer_addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(seller);

        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        let swap_ref = vector::borrow_mut(&mut swaps_ref.swaps, swap_index);
        assert!(swap_ref.is_active, E_SWAP_NOT_ACTIVE);
        assert!(swap_ref.buyer == @0x0, E_SWAP_NOT_ACTIVE); // Ensure not already purchased
        assert!(swap_ref.seller != buyer_addr, E_NOT_BUYER); // Prevent seller from buying own swap

        // Transfer APT from buyer to seller
        coin::transfer<AptosCoin>(account, seller, swap_ref.apt_price);

        // Update swap details
        swap_ref.buyer = buyer_addr;
        swap_ref.is_active = false; // Deactivate after purchase

        // Remove from active listings
        let seller_active_listings_ref = borrow_global_mut<ActiveListings>(seller);
        let (found, index) = find_swap_by_id(&seller_active_listings_ref.listings, swap_id);
        if (found) {
            vector::remove(&mut seller_active_listings_ref.listings, index);
        };

        let events_ref = borrow_global_mut<WattSwapEvents>(seller);
        event::emit_event(
            &mut events_ref.purchase_events,
            PurchaseEvent {
                buyer: buyer_addr,
                seller,
                swap_id,
                apt_amount: swap_ref.apt_price,
            }
        );
    }

    // Confirm energy transfer (by the seller)
    public entry fun confirm(
        account: &signer,
        swap_id: u64,
    ) acquires WattSwaps, WattSwapEvents {
        let addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(addr);

        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        let swap_ref = vector::borrow_mut(&mut swaps_ref.swaps, swap_index);
        assert!(swap_ref.seller == addr, E_NOT_SELLER);
        // In a real-world scenario, we would have a mechanism (oracle) to verify
        // the energy transfer. Here, we assume it's confirmed.

        let events_ref = borrow_global_mut<WattSwapEvents>(addr);
        event::emit_event(
            &mut events_ref.confirm_events,
            ConfirmEvent {
                seller: addr,
                swap_id,
            }
        );
    }

    // View function to get all swaps for a seller
    #[view]
    public fun get_swaps(seller: address): vector<WattSwap> acquires WattSwaps {
        let swaps_ref = borrow_global<WattSwaps>(seller);
        swaps_ref.swaps
    }

    // View function to get active swaps for a seller
    #[view]
    public fun get_active_swaps(seller: address): vector<WattSwap> acquires WattSwaps {
        let swaps_ref = borrow_global<WattSwaps>(seller);
        let active_swaps = vector::empty<WattSwap>();
        let i = 0;
        let len = vector::length(&swaps_ref.swaps);

        while (i < len) {
            let swap = vector::borrow(&swaps_ref.swaps, i);
            if (swap.is_active) {
                vector::push_back(&mut active_swaps, *swap);
            };
            i = i + 1;
        };

        active_swaps
    }

     // View function to get swap details
    #[view]
    public fun get_swap_details(
        seller: address,
        swap_id: u64
    ): (u64, address, address, u64, u64, bool) acquires WattSwaps {
        let swaps_ref = borrow_global<WattSwaps>(seller);
        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        let swap = vector::borrow(&swaps_ref.swaps, swap_index);
        (
            swap.id,
            swap.seller,
            swap.buyer,
            swap.watt_amount,
            swap.apt_price,
            swap.is_active
        )
    }

   // View function to get all active listings for a specific seller
    #[view]
    public fun get_all_active_listings(seller: address): vector<WattSwap> acquires ActiveListings {
        let active_listings_ref = borrow_global<ActiveListings>(seller);
        let filtered_listings = vector::empty<WattSwap>();
        let i = 0;
        let len = vector::length(&active_listings_ref.listings);

        while (i < len) {
            let swap = vector::borrow(&active_listings_ref.listings, i);
            if (swap.is_active && swap.seller == seller) {
                vector::push_back(&mut filtered_listings, *swap);
            };
            i = i + 1;
        };
        filtered_listings
    }
}
