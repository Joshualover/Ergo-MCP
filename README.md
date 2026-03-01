# Ergo MCP Server 🌐

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Ergo](https://img.shields.io/badge/Ergo-Platform-orange.svg)](https://ergoplatform.org/)
[![MCP](https://img.shields.io/badge/MCP-Protocol-green.svg)](https://modelcontextprotocol.io/)

A [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for the [Ergo Platform](https://ergoplatform.org/). This server provides AI agents with powerful tools for exploring the Ergo blockchain, querying real-time data, and dynamically loading specialized skills from the Ergo ecosystem.

## 🚀 Features

### Blockchain Explorer Tools

Interact with the Ergo blockchain through simple, powerful APIs:

| Tool | Description | Example Use Case |
|------|-------------|------------------|
| `get_address_balance` | Check confirmed ERG and token balances | Portfolio tracking, verification |
| `get_transaction_details` | Retrieve detailed transaction information | Transaction auditing, analysis |
| `get_block_header` | Fetch block headers by ID or height | Block exploration, chain analysis |
| `search_tokens` | Find tokens by name or ticker | Token discovery, market research |
| `get_ergo_price` | Real-time ERG price in USD/EUR | Price monitoring, trading decisions |

### Dynamic Skill Registry

The server includes an intelligent **Dynamic Skill Registry** that automatically discovers and loads capabilities from the Ergo ecosystem.

#### Native Skills

- **`local_ergo_node_deployment`** - Full local node automation
  - Downloads and configures Ergo node JAR
  - Sets up API security with hashed passwords
  - Manages the node lifecycle
  - Requires: Java runtime installed

#### Text-Based Skills

These skills provide instruction manuals for AI-guided implementation:

- **`ergo_appkit_code_generator`** - Generate Ergo AppKit code
- **`ergo_wasm_cryptographic_toolkit`** - WASM cryptography utilities
- **`nautilus_wallet_dapp_connector`** - Nautilus wallet integration

> 💡 **Note**: Text-based skills return detailed `SKILL.md` content that AI agents can use to implement features manually or generate code.

---

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ 
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Java](https://www.java.com/) (for local node deployment feature)

### Quick Install

```bash
# Clone the repository
git clone https://github.com/Scottcjn/Ergo-MCP.git
cd Ergo-MCP

# Install dependencies
npm install

# Build the project
npm run build
```

---

## 🎯 Usage

### Configuration

The server automatically fetches skills from the [Ergo Skills repository](https://github.com/Degens-World/Ergo-Skills).

#### Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GITHUB_TOKEN` | No | GitHub Personal Access Token for higher API rate limits | - |
| `GITHUB_REPO_URL` | No | Override the skills repository URL | `https://github.com/Degens-World/Ergo-Skills` |

#### Example Configuration

```bash
# Linux/Mac
export GITHUB_TOKEN=ghp_your_personal_access_token

# Windows (PowerShell)
$env:GITHUB_TOKEN="ghp_your_personal_access_token"

# Windows (CMD)
set GITHUB_TOKEN=ghp_your_personal_access_token
```

### Running the Server

#### Production Mode
```bash
node dist/index.js
```

#### Development Mode
```bash
npm run dev
```

#### Testing with MCP Inspector

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) provides an interactive UI for testing:

```bash
npx @modelcontextprotocol/inspector node dist/index.js
```

---

## 🛠️ Development

### Available Scripts

```bash
# Build the project
npm run build

# Run in development mode (with auto-reload)
npm run dev

# Run tests
npm test

# Type checking
npx tsc --noEmit

# Lint code
npm run lint
```

### Project Structure

```
Ergo-MCP/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── tools.ts              # Core blockchain explorer tools
│   ├── skill_registry.ts     # Dynamic skill loading logic
│   └── skills/
│       └── node_deployment/  # Native skill implementations
├── test/                     # Verification and test scripts
├── dist/                     # Compiled JavaScript output
├── package.json
└── README.md
```

### Architecture

```
┌─────────────────┐
│   MCP Client    │  (Claude, IDE, etc.)
└────────┬────────┘
         │ MCP Protocol
         ▼
┌─────────────────┐
│  Ergo MCP Server │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────────┐
│ Tools  │ │ Skill Registry│
│ Module │ └──────┬───────┘
└───┬────┘        │
    │             ▼
    │      ┌─────────────┐
    │      │ Ergo Skills │
    │      │   Repository│
    │      └─────────────┘
    ▼
┌─────────────────┐
│  Ergo Blockchain │
│   API / Node     │
└─────────────────┘
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Ideas

- 🐛 Report bugs or issues
- ✨ Add new blockchain explorer tools
- 📝 Improve documentation
- 🧪 Add more test coverage
- 🌐 Add support for additional Ergo ecosystem tools

---

## 📚 Resources

### Ergo Platform
- [Ergo Documentation](https://docs.ergoplatform.com/)
- [Ergo Explorer](https://explorer.ergoplatform.com/)
- [Ergo Platform Website](https://ergoplatform.org/)

### Model Context Protocol
- [MCP Specification](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)

### Related Projects
- [Ergo Skills Repository](https://github.com/Degens-World/Ergo-Skills)
- [Ergo AppKit](https://github.com/ergoplatform/ergo-appkit)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Ergo Platform](https://ergoplatform.org/) - The blockchain that powers this ecosystem
- [Model Context Protocol](https://modelcontextprotocol.io/) - Enabling AI-native tools
- [Degens World](https://github.com/Degens-World) - Original project foundation

---

<p align="center">
  Built with ❤️ for the Ergo and AI agent communities
</p>
