# Contributing to Ergo MCP Server

Thank you for your interest in contributing to the Ergo MCP Server! This document provides guidelines for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Adding New Tools](#adding-new-tools)
- [Adding New Skills](#adding-new-skills)

## Code of Conduct

This project and everyone participating in it is governed by a code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Basic understanding of TypeScript
- Familiarity with Ergo Platform (helpful but not required)

### Quick Setup

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Ergo-MCP.git
   cd Ergo-MCP
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Run tests:
   ```bash
   npm test
   ```

## How to Contribute

### Reporting Bugs

If you find a bug, please [open an issue](https://github.com/Scottcjn/Ergo-MCP/issues/new) with:

- **Clear title** and description
- **Steps to reproduce** the bug
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node.js version, etc.)
- **Code samples** or logs if applicable

#### Bug Report Template

```markdown
**Description**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:
1. Run '...'
2. Call tool '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g., macOS 14.0]
- Node.js: [e.g., 18.17.0]
- Version: [e.g., 1.0.0]

**Additional Context**
Add any other context here.
```

### Suggesting Features

We welcome feature suggestions! Please [open an issue](https://github.com/Scottcjn/Ergo-MCP/issues/new) with:

- **Clear use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - What else did you consider?

### Contributing Code

#### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

#### 2. Make Your Changes

- Write clear, documented code
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed

#### 3. Commit Your Changes

```bash
git add .
git commit -m "feat: add new tool for token metadata retrieval

- Implement get_token_metadata tool
- Add unit tests
- Update README with examples"
```

#### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then [open a Pull Request](https://github.com/Scottcjn/Ergo-MCP/compare) on GitHub.

## Development Setup

### Environment Variables

Create a `.env` file for local development:

```bash
# Optional: GitHub token for higher API rate limits
GITHUB_TOKEN=your_token_here

# Optional: Custom skills repository
GITHUB_REPO_URL=https://github.com/your-org/your-skills-repo
```

### Running Locally

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run build
node dist/index.js

# With MCP Inspector for testing
npx @modelcontextprotocol/inspector node dist/index.js
```

## Project Structure

```
Ergo-MCP/
├── src/
│   ├── index.ts           # Server entry point and MCP setup
│   ├── tools.ts           # Blockchain explorer tool implementations
│   ├── skill_registry.ts  # Dynamic skill loading
│   ├── types.ts           # TypeScript type definitions
│   └── skills/
│       └── node_deployment/
│           ├── index.ts
│           └── ...
├── test/
│   ├── tools.test.ts      # Tool tests
│   └── ...
└── package.json
```

### Key Files

- **`src/index.ts`** - Server initialization, MCP protocol setup
- **`src/tools.ts`** - Core blockchain tools implementation
- **`src/skill_registry.ts`** - Skill discovery and loading logic
- **`test/`** - Test suites

## Coding Standards

### TypeScript Guidelines

- Use TypeScript's strict mode
- Define interfaces for all data structures
- Use `const` and `let`, avoid `var`
- Prefer async/await over raw promises

### Code Style

```typescript
// ✅ Good: Typed interfaces, async/await, error handling
interface TokenBalance {
  tokenId: string;
  amount: bigint;
  decimals: number;
}

async function getTokenBalance(address: string): Promise<TokenBalance> {
  try {
    const response = await fetch(`${API_URL}/tokens/${address}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch token balance:', error);
    throw error;
  }
}

// ❌ Avoid: Untyped, callback-based, poor error handling
function getBalance(addr, callback) {
  fetch(url + addr).then(r => r.json()).then(d => callback(null, d));
}
```

### Naming Conventions

- **Files**: kebab-case (e.g., `skill-registry.ts`)
- **Classes**: PascalCase (e.g., `SkillRegistry`)
- **Functions**: camelCase (e.g., `loadSkill`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_TIMEOUT`)
- **Interfaces**: PascalCase with descriptive names (e.g., `TokenBalance`)

### Documentation

- Use JSDoc for public functions
- Include parameter types and descriptions
- Document return values and thrown errors

```typescript
/**
 * Retrieves the confirmed balance for an Ergo address.
 * @param address - The Ergo address to query
 * @returns Promise resolving to the address balance
 * @throws Error if the API request fails
 * @example
 * ```typescript
 * const balance = await getAddressBalance('9f...');
 * console.log(balance.confirmed);
 * ```
 */
async function getAddressBalance(address: string): Promise<AddressBalance> {
  // Implementation
}
```

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- tools.test.ts
```

### Writing Tests

- Place tests in `test/` directory
- Name test files with `.test.ts` suffix
- Use descriptive test names
- Test both success and error cases

```typescript
import { describe, it, expect } from 'vitest';
import { getAddressBalance } from '../src/tools';

describe('getAddressBalance', () => {
  it('should return balance for valid address', async () => {
    const balance = await getAddressBalance('9f...');
    expect(balance).toHaveProperty('confirmed');
    expect(balance).toHaveProperty('unconfirmed');
  });

  it('should throw error for invalid address', async () => {
    await expect(getAddressBalance('invalid'))
      .rejects.toThrow('Invalid address format');
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Update documentation** - Ensure README reflects changes
2. **Add tests** - All new code should have tests
3. **Update CHANGELOG** - If applicable, add entry to CHANGELOG.md
4. **Ensure tests pass** - Run `npm test`
5. **Request review** - Assign a maintainer for review

### PR Checklist

Before submitting:

- [ ] Code follows style guidelines
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] Commit messages are clear
- [ ] Branch is up to date with main

### Review Process

1. A maintainer will review within 7 days
2. Address any requested changes
3. Once approved, a maintainer will merge

## Adding New Tools

To add a new blockchain explorer tool:

1. Define the tool schema in `src/tools.ts`
2. Implement the tool function
3. Register the tool in `src/index.ts`
4. Add tests in `test/tools.test.ts`
5. Update README with documentation

### Tool Template

```typescript
// In src/tools.ts

export const NewToolSchema = {
  name: 'new_tool_name',
  description: 'Description of what the tool does',
  inputSchema: {
    type: 'object',
    properties: {
      param1: {
        type: 'string',
        description: 'Description of param1',
      },
    },
    required: ['param1'],
  },
};

export async function newToolFunction(param1: string): Promise<any> {
  // Implementation
}
```

## Adding New Skills

Skills can be added in two ways:

### 1. Native Skills

Add TypeScript code directly to `src/skills/`:

```typescript
// src/skills/my_skill/index.ts

export async function executeSkill(params: any): Promise<any> {
  // Implementation
}
```

### 2. Text-Based Skills

Add to the skills repository with a `SKILL.md` file.

## Questions?

- Open an issue with the `question` label
- Join Ergo community discussions
- Contact maintainers

## Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Acknowledged in release notes
- Credited in commit history

Thank you for contributing to the Ergo MCP Server! 🚀
