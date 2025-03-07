# WattSwap
Your one stop solution for decentralized energy trading needs, with your safety in mind.
Built exclusively on Aptos for its sub-second latency and finality capabilities.

We recommend interacting with this smart contract using the frontend here: [Link to frontend repo](https://github.com/allwin23/powerlink-haus)


## What tools the dapp uses?

- React framework
- shadcn/ui + tailwind for styling
- Aptos TS SDK
- Aptos Wallet Adapter
- Node based Move commands
- [Next-pwa](https://ducanh-next-pwa.vercel.app/)

## What Move commands are available?

The tool utilizes [aptos-cli npm package](https://github.com/aptos-labs/aptos-cli) that lets us run Aptos CLI in a Node environment.

Some commands are built-in the template and can be ran as a npm script, for example:

- `npm run move:publish` - a command to publish the Move contract
- `npm run move:test` - a command to run Move unit tests
- `npm run move:compile` - a command to compile the Move contract
- `npm run move:upgrade` - a command to upgrade the Move contract
- `npm run dev` - a command to run the frontend locally
- `npm run deploy` - a command to deploy the dapp to Vercel

For all other available CLI commands, can run `npx aptos` and see a list of all available commands.
