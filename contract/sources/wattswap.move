module wattswap_addr::wattswap_hacknight {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::event::{Self, EventHandle};
    use aptos_framework::timestamp;

    // Define error codes
    const E_SWAP_NOT_ACTIVE: u64 = 1;
    const E_NOT_OWNER: u64 = 2;
    const E_INSUFFICIENT_BALANCE: u64 = 3;
    const E_SWAP_NOT_FOUND: u64 = 4;
    const E_NOT_SELLER: u64 = 5;
    const E_NOT_BUYER: u64 = 6;
    const E_ESCROW_EXPIRED: u64 = 7;
    const E_NOT_ESCROW_BUYER: u64 = 8;

    // Define constants
    const WATTSWAP_ADDRESS: address = @wattswap_addr;

    // Struct for a WattSwap (similar to a Campaign)
    struct WattSwap has key, store, copy, drop {
        id: u64,
        seller: address, // Address of the seller
        buyers: vector<address>, // Addresses of the buyers
        amounts_bought: vector<u64>, //amounts bought by each buyer
        watt_amount: u64, // Amount of watts being sold
        min_watt_amount: u64, //minimum watts a buyer can buy
        max_watt_amount: u64, //maximum watts a buyer can buy
        apt_price_per_watt: u64, // Price in APT per watt
        is_active: bool, // Active status of the swap
        creation_timestamp: u64, // Timestamp of swap creation
    }

    // Struct for Escrow
    struct Escrow has key, store {
        buyer: address,
        seller: address,
        swap_id: u64,
        apt_amount: u64,
        expiry_timestamp: u64,
        resource_cap: account::SignerCapability,
    }

    // Struct to hold all WattSwaps
    struct WattSwaps has key {
        swaps: vector<WattSwap>,
        swap_count: u64,
        join_date: u64,
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
        listing_removed_events: EventHandle<ListingRemovedEvent>,
        escrow_events: EventHandle<EscrowExpiredEvent>,
    }

    struct SwapCreatedEvent has drop, store {
        seller: address,
        swap_id: u64,
        watt_amount: u64,
        apt_price: u64,
        timestamp: u64,
    }

    struct PurchaseEvent has drop, store {
        buyer: address,
        seller: address,
        swap_id: u64,
        apt_amount: u64,
        timestamp: u64,
    }

    struct ConfirmEvent has drop, store {
        seller: address,
        swap_id: u64,
        timestamp: u64,
    }

    struct EscrowExpiredEvent has drop, store {
        buyer: address,
        seller: address,
        swap_id: u64,
        timestamp: u64,
    }

    struct ListingRemovedEvent has drop, store {
        seller: address,
        swap_id: u64,
        timestamp: u64,
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
            swap_count: 0,
            join_date: timestamp::now_seconds(),
        });

        move_to(account, WattSwapEvents {
            swap_created_events: account::new_event_handle<SwapCreatedEvent>(account),
            purchase_events: account::new_event_handle<PurchaseEvent>(account),
            confirm_events: account::new_event_handle<ConfirmEvent>(account),
            listing_removed_events: account::new_event_handle<ListingRemovedEvent>(account),
            escrow_events: account::new_event_handle<EscrowExpiredEvent>(account),
        });

        move_to(account, ActiveListings {
            listings: vector::empty<WattSwap>(),
        });
    }

    // Create a new WattSwap (by a seller)
    public entry fun create_swap(
        account: &signer,
        watt_amount: u64,
        apt_price_per_watt: u64,
        min_watt_amount: u64,
        max_watt_amount: u64
    ) acquires WattSwaps, WattSwapEvents, ActiveListings {
        let addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(addr);

        let swap_id = swaps_ref.swap_count + 1;
        swaps_ref.swap_count = swap_id;
        assert!(max_watt_amount <= watt_amount, 7);
        let new_swap = WattSwap {
            id: swap_id,
            seller: addr,
            buyers: vector::empty<address>(), // Initialize buyers to empty vector
            amounts_bought: vector::empty<u64>(),
            watt_amount,
            min_watt_amount,
            max_watt_amount,
            apt_price_per_watt,
            is_active: true,
            creation_timestamp: timestamp::now_seconds(),
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
                apt_price: apt_price_per_watt,
                timestamp: timestamp::now_seconds(),
            }
        );
    }

    // Purchase watts (by a buyer)
    public entry fun purchase(
        account: &signer,
        seller: address,
        swap_id: u64,
        buy_watt_amount: u64,
    ) acquires WattSwaps, WattSwapEvents, ActiveListings {
        let buyer_addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(seller);

        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        let swap_ref = vector::borrow_mut(&mut swaps_ref.swaps, swap_index);
        assert!(swap_ref.is_active, E_SWAP_NOT_ACTIVE);
        assert!(swap_ref.seller != buyer_addr, E_NOT_BUYER); // Prevent seller from buying own swap
        assert!(buy_watt_amount >= swap_ref.min_watt_amount, 8);
        assert!(buy_watt_amount <= swap_ref.max_watt_amount, 9);
        assert!(buy_watt_amount <= swap_ref.watt_amount, 10);

        // Create resource account for escrow
        let (escrow_signer, escrow_cap) = account::create_resource_account(account, vector::singleton<u8>(swap_id as u8));
        let escrow_addr = signer::address_of(&escrow_signer);

        // Register for AptosCoin in the escrow account
        coin::register<AptosCoin>(&escrow_signer);

        // Transfer APT from buyer to escrow
        let apt_amount = swap_ref.apt_price_per_watt * buy_watt_amount;
        coin::transfer<AptosCoin>(account, escrow_addr, apt_amount);

        // Store escrow details
        move_to(&escrow_signer, Escrow {
            buyer: buyer_addr,
            seller,
            swap_id,
            apt_amount,
            expiry_timestamp: timestamp::now_seconds() + 900, // 15 minutes (15 * 60 = 900),
            resource_cap: escrow_cap,
        });

        // Update swap details
        vector::push_back(&mut swap_ref.buyers, buyer_addr);
        vector::push_back(&mut swap_ref.amounts_bought, buy_watt_amount);
        swap_ref.watt_amount = swap_ref.watt_amount - buy_watt_amount;
        if(swap_ref.watt_amount == 0){
            swap_ref.is_active = false; // Deactivate after purchase
            // Remove from active listings
            let seller_active_listings_ref = borrow_global_mut<ActiveListings>(seller);
            let (found, index) = find_swap_by_id(&seller_active_listings_ref.listings, swap_id);
            if (found) {
                vector::remove(&mut seller_active_listings_ref.listings, index);
            };
        };

        let events_ref = borrow_global_mut<WattSwapEvents>(seller);
        event::emit_event(
            &mut events_ref.purchase_events,
            PurchaseEvent {
                buyer: buyer_addr,
                seller,
                swap_id,
                apt_amount,
                timestamp: timestamp::now_seconds(),
            }
        );
    }

    // Confirm energy transfer (by the seller)
   public entry fun confirm(
        account: &signer,
        swap_id: u64,
    ) acquires WattSwaps, WattSwapEvents, Escrow {
        let current_timestamp = timestamp::now_seconds();
        let seller_addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(seller_addr);

        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        let swap_ref = vector::borrow_mut(&mut swaps_ref.swaps, swap_index);
        assert!(swap_ref.seller == seller_addr, E_NOT_SELLER);

        // Iterate through buyers to find the escrow
        let i = 0;
        let len = vector::length(&swap_ref.buyers);
        while (i < len) {
            let buyer_addr = *vector::borrow(&swap_ref.buyers, i);
            let escrow_addr = account::create_resource_address(&buyer_addr, vector::singleton<u8>(swap_id as u8));

            if (exists<Escrow>(escrow_addr)) {
                let escrow_ref = borrow_global_mut<Escrow>(escrow_addr);

                // Check if the escrow has expired
                assert!(timestamp::now_seconds() <= escrow_ref.expiry_timestamp, E_ESCROW_EXPIRED);

               // Transfer APT from escrow to seller
                coin::transfer<AptosCoin>(&account::create_signer_with_capability(&escrow_ref.resource_cap), seller_addr, escrow_ref.apt_amount);

                // Clean up escrow
                let Escrow {
                    buyer: _,
                    seller: _,
                    swap_id: _,
                    apt_amount: _,
                    expiry_timestamp: _,
                    resource_cap: _
                } = move_from(escrow_addr);

                break; // Exit loop after finding and processing the escrow
            };
            i = i + 1;
        };

        let events_ref = borrow_global_mut<WattSwapEvents>(seller_addr);
        event::emit_event(
            &mut events_ref.confirm_events,
            ConfirmEvent {
                seller: seller_addr,
                swap_id,
                timestamp: current_timestamp,
            }
        );
    }

    // Withdraw funds from an expired escrow (by the buyer)
    public entry fun withdraw_expired_escrow(
        account: &signer,
        seller: address,
        swap_id: u64,
    ) acquires WattSwaps, Escrow, WattSwapEvents {
        let buyer_addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(seller);

        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        let _swap_ref = vector::borrow(&swaps_ref.swaps, swap_index);

        // reconstruct the escrow address
        let escrow_addr = account::create_resource_address(&buyer_addr, vector::singleton<u8>(swap_id as u8));

        assert!(exists<Escrow>(escrow_addr), E_SWAP_NOT_FOUND);

        let escrow_ref = borrow_global_mut<Escrow>(escrow_addr);

        assert!(escrow_ref.buyer == buyer_addr, E_NOT_ESCROW_BUYER);
        assert!(timestamp::now_seconds() > escrow_ref.expiry_timestamp, E_SWAP_NOT_FOUND); //should be expired

        let events_ref = borrow_global_mut<WattSwapEvents>(seller);
        event::emit_event(
            &mut events_ref.escrow_events,
            EscrowExpiredEvent {
                buyer: buyer_addr,
                seller,
                swap_id,
                timestamp: timestamp::now_seconds(),
            }
        );

        // Transfer APT from escrow back to buyer
        coin::transfer<AptosCoin>(&account::create_signer_with_capability(&escrow_ref.resource_cap), buyer_addr, escrow_ref.apt_amount);

        // Clean up escrow
        let Escrow {
            buyer: _,
            seller: _,
            swap_id: _,
            apt_amount: _,
            expiry_timestamp: _,
            resource_cap: _
        } = move_from(escrow_addr);
    }

     // Remove a listing (by the seller)
    public entry fun remove_listing(
        account: &signer,
        swap_id: u64,
    ) acquires WattSwaps, ActiveListings, WattSwapEvents {
        let seller_addr = signer::address_of(account);
        let swaps_ref = borrow_global_mut<WattSwaps>(seller_addr);

        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        let swap_ref = vector::borrow_mut(&mut swaps_ref.swaps, swap_index);
        assert!(swap_ref.seller == seller_addr, E_NOT_SELLER);
        assert!(swap_ref.is_active, E_SWAP_NOT_ACTIVE);

        // Deactivate the swap
        swap_ref.is_active = false;

        let events_ref = borrow_global_mut<WattSwapEvents>(seller_addr);
        event::emit_event(
            &mut events_ref.listing_removed_events,
            ListingRemovedEvent {
                seller: seller_addr,
                swap_id,
                timestamp: timestamp::now_seconds(),
            }
        );

        // Remove from active listings
        let seller_active_listings_ref = borrow_global_mut<ActiveListings>(seller_addr);
        let (found_active, index) = find_swap_by_id(&seller_active_listings_ref.listings, swap_id);
        if (found_active) {
            vector::remove(&mut seller_active_listings_ref.listings, index);
        };
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
    ): WattSwap acquires WattSwaps {
        let swaps_ref = borrow_global<WattSwaps>(seller);
        let (found, swap_index) = find_swap_by_id(&swaps_ref.swaps, swap_id);
        assert!(found, E_SWAP_NOT_FOUND);

        *vector::borrow(&swaps_ref.swaps, swap_index)
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

    // View function to get the join date
    #[view]
    public fun get_join_date(addr: address): u64 acquires WattSwaps {
        let watt_swaps = borrow_global<WattSwaps>(addr);
        watt_swaps.join_date
    }
}
