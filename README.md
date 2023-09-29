# Solidity-BNB-Chain-Development-Bootcamp-FinalProject

Welcome to the Web3 Safe Lock DApp project repository! This decentralized application (DApp) leverages blockchain technology to implement a Safe Smart Contract on the BNB Chain. This contract acts as a secure vault for users to lock their tokens for a specified period, earning rewards over time.

## Table of Contents
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Testing](#testing)
    - [Compiling](#compiling)
    - [Migrating](#migrating)
    - [Paying for Migrations](#paying-for-migrations)
  - [Basic Commands](#basic-commands)
    - [Testing](#testing)
  - [Support](#support)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

This Truffle BNB Smart Chain box provides you with the boilerplate structure necessary to start coding on the BNB Smart Chain. For detailed information on how the BNB Smart Chain works, please see their documentation [here](https://docs.bnbchain.org/docs/getting-started).

As a starting point, this box contains only the ```SimpleStorage``` Solidity contract. Including minimal code was a conscious decision as this box is meant to provide the initial building blocks needed to get to work on BNB Smart Chain without pushing developers to write any particular sort of application. With this box, you will be able to compile, migrate, and test Solidity code against several instances of BNB Smart Chain networks.

The BNB Smart Chain is fully compatible with the EVM. This means you will not need a new compiler to deploy Solidity contracts, and should be able to add your own Solidity contracts to this project. The main difference developers will encounter is in accessing and interacting with the BNB Smart Chain network.

## Overview

Each user have a separate compartment within the contract, ensuring individualized security and reward calculation. Thanks to the security checks, only the caller of function(owner of the tokens) can lock, unlock, or query their compartment.

## Features

-Token Locking: Users can send tokens to the contract and lock them for a defined period.
-Reward Calculation: The contract will calculate rewards based on the time the tokens are locked.
-Individual Compartments: Each user will have a unique compartment within the contract, ensuring personalized security and reward management.

## Getting Started

Follow these steps to set up the project locally

### Prerequisites

- [Node.js](https://nodejs.org/) 10.x or later
- [NPM](https://docs.npmjs.com/cli/) version 5.2 or later
- [Ganache](https://trufflesuite.com/ganache/) 
- Windows

Helpful, but optional:

- A [MetaMask](https://metamask.io/) account

### Installation

1. Install the "ganache" package:
```
npm i ganache
```
2. Clone the repository:
```
git clone https://github.com/Lucid-Karma/Solidity-BNB-Chain-Development-Bootcamp-FinalProject.git
```
3. Navigate to the project directory:
```
cd Solidity-BNB-Chain-Development-Bootcamp-FinalProject
```

## Testing

Smart contract tests are located in the `test` folder. These tests ensure the correct functioning of the smart contract. To run the tests, follow these steps:

1.Open a terminal in the project directory.

2.Run blockchain simulation with ganache:
```
ganache-cli
```
3.Run the following command to execute the tests:
```
npm run test
```
4.Run the following command to execute the tests on the BSC Testnet:
```
npm run test:bsc bscTestnet   
```

In order to run the test currently in the boilerplate, use the following command: `npm run test:bsc --network=(bscTestnet | bscMainnet)` (remember to choose a network!). The current test file just has some boilerplate tests to get you started. You will likely want to add network-specific tests to ensure your contracts are behaving as expected.

### Compiling

You do not need to add any new compilers or settings to compile your contracts for the BNB Smart Chain, as it is fully EVM compatible. The `truffle-config.bsc.js` configuration file indicates the contract and build paths for BSC-destined contracts.

If you are compiling contracts specifically for the BNB Smart Chain network, use the following command, which indicates the appropriate configuration file:

```
npm run compile:bsc
```

If you would like to recompile previously compiled contracts, you can manually run this command with
`truffle compile --config=truffle-config.bsc.js` and add the `--all` flag.

### Migrating

To migrate on the BNB Smart Chain network, run `npm run migrate:bsc --network=(bscTestnet | bscMainnet)` (remember to choose a network from these options!).

As you can see, you have two BSC networks to choose from:

- `bscTestnet`: This is the BNB Smart Chain testnet.
- `bscMainnet`: This is the BNB Smart Chain mainnet. Caution! If you deploy to this network using a connected wallet, the fees are charged in mainnet BNB.

If you would like to migrate previously migrated contracts on the same network, you can run `truffle migrate --config truffle-config.bsc.js --network= (bscTestnet | bscMainnet)` and add the `--reset` flag.

### Paying for Migrations

To pay for your deployments, you will need to have an account with BNB available to spend. You will need your mnemomic phrase (saved in the `.env` file or through some other secure method). The first account generated by the seed needs to have the BNB you need to deploy. 

If you do not have a wallet with funds to deploy, you will need to connect a wallet to at least one of the networks above. For testing, this means you will want to connect a wallet to the `BSC Testnet` network. We recommend using [MetaMask](https://metamask.io/).

Documentation for how to set up MetaMask to configure custom network like BSc Testnet can be found [here](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain).

Follow the steps in the documentation above using the BNB Smart Chain RPC endpoints (`https://docs.bnbchain.org/docs/rpc`). The `chainId` values are the same as those in the `truffle-config.bsc.js` networks entries.

To get testnet BNB tokens use the official [faucet](https://testnet.bnbchain.org/faucet-smart).

## Basic Commands

The code here will allow you to compile, migrate, and test your code on the BNB Smart Chain. The following commands can be run (more details on each can be found in the next section):

To compile:

```
npm run compile:bsc
```

To migrate:

```
npm run migrate:bsc --network=(bscTestnet | bscMainnet)
```

To test:

```
npm run test:bsc --network=(bscTestnet | bscMainnet)
```

### Testing




## Support

Support for this box is available via the Truffle community [here](https://www.trufflesuite.com/community) or on our official [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597).
