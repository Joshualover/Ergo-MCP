# Ergo MCP Server

A Model Context Protocol (MCP) server for the Ergo Platform. This server provides a suite of tools for exploring the blockchain, querying real-time data, and dynamically loading "skills" (agentic workflows) from the Ergo ecosystem.

## Features

### 1. Blockchain Explorer Tools
- **`get_address_balance`**: Check confirmed ERG and token balances for any address.
- **`get_transaction_details`**: Retrieve detailed information about a transaction.
- **`get_block_header`**: Fetch block headers by ID or height.
- **`search_tokens`**: Find tokens by name/ticker.
- **`get_ergo_price`**: Get real-time ERG price in USD and EUR via CoinGecko.
- **`get_address_transactions`**: Get transaction history for an address with pagination.
- **`get_unspent_boxes`**: Get unspent UTXOs for an address — essential for building transactions.
- **`get_network_state`**: Current chain height, difficulty, latest block info, and miner reward.

### 2. Dynamic Ergo Skills (Agentic Tools)
The server includes a **Dynamic Skill Registry** that scans the `ergo-skills-repo` to automatically load and expose capabilities.

- **`local_ergo_node_deployment`** (Native Support):
    - Automates the deployment of a local Ergo full node.
    - Downloads JAR, configures API security (hashed password), and launches the process.
    - Verified to work with `java` installed on the host.

- **Other Skills** (Text-Based):
    - **`ergo_appkit_code_generator`**
    - **`ergo_wasm_cryptographic_toolkit`**
    - **`nautilus_wallet_dapp_connector`**
    - These tools return their instruction manuals (from `SKILL.md`) when called, allowing an AI agent to follow the guide for manual implementation or code generation.

### 3. Beacon Agent Discovery (A2A)
Integration with the [Beacon protocol](https://github.com/Scottcjn/beacon-skill) for agent-to-agent coordination:

- **`discover_beacon_agents`**: Find AI agents on the Beacon network. Filter by capability (`ergo`, `coding`, `analysis`) or provider (`anthropic`, `openai`, `google`, `xai`).
- **`beacon_relay_info`**: Get relay network statistics — total agents, provider breakdown, uptime.

Beacon is an open A2A protocol that handles agent identity, discovery, and messaging across 13+ platforms. This integration lets agents using Ergo-MCP discover other agents in the broader ecosystem.

**Configuration**: Set `BEACON_ATLAS_URL` to point to any Beacon relay (default: `https://rustchain.org/beacon`). No additional dependencies required.

## Installation

1.  **Clone this repository**:
    ```bash
    git clone https://github.com/Degens-World/Ergo-MCP.git
    cd ergo-mcp-server
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the project**:
    ```bash
    npm run build
    ```

## Usage

### Configuration

The server automatically fetches skills from `https://github.com/Degens-World/Ergo-Skills`.

**Optional Environment Variables:**

- `GITHUB_TOKEN`: Add a GitHub Personal Access Token to increase API rate limits (recommended for heavy usage).
- `GITHUB_REPO_URL`: Override the target skills repository URL.
- `BEACON_ATLAS_URL`: Override the Beacon relay endpoint (default: `https://rustchain.org/beacon`).

```bash
# Example with token (Linux/Mac)
export GITHUB_TOKEN=ghp_yourtoken...
node dist/index.js
```

### Running with MCP Inspector
To test the server interactively:
```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

### Running in Production
```bash
node dist/index.js
```

## Development

- **Run in dev mode**:
    ```bash
    npm run dev
    ```
- **Run verification tests**:
    ```bash
    npm test
    ```

## Project Structure

- `src/index.ts`: Main server entry point and tool registration.
- `src/tools.ts`: Implementation of core explorer tools.
- `src/skill_registry.ts`: Logic for dynamically loading skills from the repo.
- `src/skills/`: Native implementations for specific skills (e.g., node deployment, beacon discovery).
- `test/`: Verification scripts.
