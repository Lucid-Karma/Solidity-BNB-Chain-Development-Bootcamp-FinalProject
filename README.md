# Solidity-BNB-Chain-Development-Bootcamp-FinalProject

Welcome to the Web3 Safe Lock DApp project repository! This project is the first part of the final project of the Solidity & BNB Chain Development Bootcamp. This decentralized application (DApp) leverages blockchain technology to implement a Safe Smart Contract on the BNB Chain. This contract acts as a secure vault for users to lock their tokens for a specified period, earning rewards over time.

## Table of Contents
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Smart Contracts](#smart-contracts)
  - [Testing](#testing)
  - [Frontend](#frontend)
  - [Contributing](#contributing)
  - [License](#license)
  - [Thanks](#thanks)

## Overview

Each user have a separate compartment within the contract, ensuring individualized security and reward calculation. Thanks to the security checks, only the caller of function(owner of the tokens) can lock, unlock, or query their compartment.

## Features

- **Token Locking:** Users can send tokens to the contract and lock them for a defined period.

- **Reward Calculation:** The contract calculates rewards based on the time the tokens are locked.

- **Individual Compartments:** Each user have a unique compartment within the contract, ensuring personalized security and reward management.

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
4. Install required npm packages:
```
npm install
```

## Usage
1. Start the development server:
```
npm start
```
2. Open your web browser and navigate to `http://localhost:3000`  to access the DApp.
3. Connect your Ethereum wallet (e.g., MetaMask) to the DApp.
4. Lock your token, check your calculated reward during the period, and unlock it at the end of the period.

## Smart Contracts
The smart contract called `SafeContract.sol` in this project facilitate the lockup process. It handles locking token, unlocking, and checking. This contract is deployed on the BNB Chain Testnet.


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


## Frontend
The DApp frontend is built using modern web technologies including React.js. It provides an intuitive and interactive user interface for auction participation.

- **React.js:** Powers the DApp's user interface.
- **Web3.js:** The Ethereum JavaScript API for smart contract interaction.
- **MetaMask:** A popular Ethereum wallet browser extension for secure transactions.


## Contributing

Contributions to this project are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix.
3. Make changes and test thoroughly.
4. Commit with clear and concise messages.
5. Push changes to your fork.
6. Submit a pull request describing your changes.


The code here will allow you to compile, migrate, and test your code on the BNB Smart Chain before you contribute. The following commands can be run:

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

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).




## Thanks

Thank you for your interest in the Web3 Safe Lock DApp project! For questions or suggestions, reach out to us or open an issue on [GitHub](https://github.com/Lucid-Karma/Solidity-BNB-Chain-Development-Bootcamp-FinalProject/tree/master). Happy bidding on the blockchain! 🚀
