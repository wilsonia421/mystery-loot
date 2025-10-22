# 🎰 MysteryLoot – NFT Mystery Loot System (Powered by Hedera)

**MysteryLoot** is a decentralized Web3 gaming DApp where players can **buy and open NFT loot boxes** on the **Hedera network**.  
Each loot box is an **HTS NFT** that unlocks random blockchain-based rewards through **Hedera Smart Contracts**.  
All transactions and reward proofs are verifiable via the **Hedera Mirror Node API**, with seamless wallet integration through **HashPack**.

---

## 🧩 Core Features

### 🔐 Authentication (Login & Signup)
- Users can **sign up, log in**, and manage profiles via a traditional email/password system.  
- After login, users can connect their **HashPack Wallet** for blockchain operations.  
- Backend uses **Node.js + MongoDB** or **Supabase** for authentication and user data.

---

### 🎁 NFT Loot Box Purchase
- Players buy **mystery loot boxes** minted as **HTS NFTs** using the **Hedera Token Service**.  
- Loot box NFTs store metadata like rarity, reward type, and creation date on **IPFS**.  
- API endpoints:  
POST /api/v1/tokens → Mint NFT loot boxes
GET /api/v1/tokens/{tokenId} → Retrieve metadata

yaml
Copy code
- Purchases are handled via HTS fungible tokens (e.g., `$LOOT`).

---

### 🧠 Smart Contract Random Reward Logic
- **Hedera Smart Contracts (Solidity)** handle random reward generation and distribution.  
- Example functions:
```solidity
function buyLootBox(address player) public;
function openLootBox(uint256 tokenId) public returns (string memory reward);
function claimReward(uint256 rewardId) public;
Rewards may include NFTs (rare items) or token payouts.

Smart contract ensures provable randomness and fair distribution.

🪙 Transparent On-Chain Proofs via Mirror Node
Integrates the Hedera Mirror Node API for verified transaction tracking:

bash
Copy code
GET /api/v1/transactions
GET /api/v1/topics/{topicId}/messages
Players can view:

Verified purchase transactions

Reward claim history

Randomness proof logs

Ensures auditability and trustless gameplay.

💼 HashPack Wallet Integration
Users connect HashPack Wallet using hashconnect library.

Enables:

Secure NFT purchase and transfers

Transaction signing

Viewing wallet balance and owned NFTs

Frontend “Connect Wallet” button triggers HashPack popup for authentication.

js
Copy code
import { HashConnect } from "hashconnect";

const hashconnect = new HashConnect();
await hashconnect.init(appMetadata, "testnet", false);
🏗️ System Architecture
scss
Copy code
Frontend (React + TypeScript + Tailwind)
   │
   ├── HashPack Wallet (hashconnect)
   │   └── Sign + execute Hedera transactions
   │
   ├── Backend (Node.js + Express)
   │   ├── User Auth (JWT)
   │   ├── NFT Minting (HTS REST API)
   │   ├── Smart Contract Calls
   │   └── IPFS Metadata Management
   │
   └── Mirror Node API
       ├── Fetch verified transactions
       └── Display drop rate + history
🧰 Tech Stack
Layer	Technology
Blockchain	Hedera Hashgraph
Smart Contracts	Solidity + Hedera Smart Contract Service
Tokenization	Hedera Token Service (HTS)
Wallet	HashPack Wallet + hashconnect
APIs	Hedera REST API, Mirror Node API
Storage	IPFS (for NFT metadata & reward images)
Backend	Node.js + Express + Hedera SDK
Database	MongoDB or Supabase
Frontend	React + TypeScript + TailwindCSS

⚙️ Installation & Setup
1. Clone Repository
bash
Copy code
git clone https://github.com/<your-username>/mysteryloot.git
cd mysteryloot
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the project root:

env
Copy code
HEDERA_OPERATOR_ID=your-hedera-account-id
HEDERA_OPERATOR_KEY=your-private-key
NETWORK=testnet
MONGO_URI=your-mongo-db-uri
IPFS_API_KEY=your-ipfs-api-key
JWT_SECRET=your-secret-key
4. Run Development Server
bash
Copy code
npm run dev
🎮 Gameplay Flow
User registers & logs in

Connects HashPack Wallet to link blockchain identity

Buys NFT loot box via Hedera Token Service (HTS)

Opens loot box through smart contract → random reward generated

Mirror Node verifies transaction + displays drop proof

User claims reward (NFT or tokens) into wallet

💡 Example Smart Contract Functions
solidity
Copy code
pragma solidity ^0.8.0;

contract MysteryLoot {
    struct LootBox {
        address owner;
        bool opened;
        string reward;
    }

    mapping(uint256 => LootBox) public lootBoxes;
    uint256 public boxCounter = 0;

    function buyLootBox(address player) public returns (uint256) {
        boxCounter++;
        lootBoxes[boxCounter] = LootBox(player, false, "");
        return boxCounter;
    }

    function openLootBox(uint256 tokenId) public {
        require(!lootBoxes[tokenId].opened, "Already opened");
        lootBoxes[tokenId].opened = true;
        lootBoxes[tokenId].reward = _generateReward();
    }

    function _generateReward() private view returns (string memory) {
        // Simulated randomization — replace with Hedera randomness or oracle
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        if (rand < 60) return "Common NFT";
        else if (rand < 90) return "Rare NFT";
        else return "Legendary Token Reward";
    }
}
🔗 API References
Hedera REST API:
https://docs.hedera.com/hedera/sdks-and-apis/rest-api/tokens

Smart Contracts on Hedera:
https://hashgraph.github.io/hedera

Mirror Node API:
https://mainnet.mirrornode.hedera.com/api/v1/docs/

HashPack Wallet Docs:
https://www.hashpack.app/

