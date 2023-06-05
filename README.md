# PosterCloud: Blockchain-based Ticket Verification System

PosterCloud is a unique ticket verification system built on blockchain technology. The project consists of three main components:

- Front: A ReactJS application that connects to Metamask and sends requests to the server.
- Server: Manages the smart contract through onlyOwner. This is necessary because payments in the Russian Federation cannot occur through cryptocurrencies.
- Contracts: The PosterCloud contract factory which creates ERC-721 ticket contracts.

By leveraging the Ethereum blockchain, PosterCloud aims to reduce fraud, increase transparency and enhance the overall experience in ticketing.

The PosterCloud smart contracts have been deployed on two networks:

- **Sepolia (Ethereum Test Network)**
- **Polygon Mumbai (Test Network)**

## Installation
Prerequisites: Node.js, npm, Hardhat, Metamask

```bash
# Clone the repository
git clone https://github.com/mysteryon88/PosterCloud.git

# Navigate to the project directory
cd PosterCloud

# Install dependencies for the front-end
cd front
npm install

# Install dependencies for the server
cd ../server
npm install

# Install dependencies for the smart contracts
cd ../contracts
npm install
```
## Usage
### Front-end:
```bash
cd front
npm start
```
### Server:
```bash
cd server
npm start
```
### Smart Contracts:

Please note: You might need to configure Hardhat network settings as per your local blockchain setup in hardhat.config.js file.
```bash
# Navigate to the contracts directory
cd contracts

# Compile the contracts
npx hardhat compile

# Deploy the contracts
npx hardhat run scripts/deploy.js --network <network>
```
