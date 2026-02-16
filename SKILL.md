---
name: vault
description: Secure password management tool. Store, retrieve, and manage passwords locally with simple CLI commands.
version: 1.0.0
author: zuiho-kai
homepage: https://github.com/zuiho-kai/openclaw-vault
tags: [password, vault, security, credentials, password-manager, cli]
metadata:
  openclaw:
    requires:
      bins: [node, npm]
---

# vault

**Use when** you need to securely store and manage passwords, API keys, or other credentials locally.

Local password management plugin with simple CLI interface. Zero configuration, fully local storage.

## Features

- 🔐 Secure local password storage
- 📝 Simple command-line interface
- 🗂️ Key management and listing
- 💾 JSON-based local storage
- 🕐 Automatic timestamp tracking

## Installation

```bash
clawhub install vault
```

## Usage

### Set a password

```bash
vault gemini sk-abc123xyz
```

### Show a password

```bash
vault gemini show
```

### Remove a password

```bash
vault gemini remove
```

### List all keys

```bash
vault list
```

## Configuration

Optional configuration in your OpenClaw config:

```json
{
  "plugins": {
    "vault": {
      "storageFile": ".vault/passwords.json"
    }
  }
}
```

**Options:**
- `storageFile` (default: `.vault/passwords.json`) - Storage file path relative to home directory

## Security

⚠️ **Important**: Current version uses plain text storage. Ensure:
- Proper file system permissions
- Don't commit storage file to version control
- Consider using system-level encryption (disk encryption)

## Examples

```bash
# Save API keys
vault openai sk-proj-abc123
vault anthropic sk-ant-xyz789

# View a key
vault openai show
# Output: Password for 'openai': sk-proj-abc123

# List all keys
vault list
# Output:
# Stored passwords:
# • openai (created: 2026-02-17T..., updated: 2026-02-17T...)
# • anthropic (created: 2026-02-17T..., updated: 2026-02-17T...)

# Remove a key
vault openai remove
```

## Links

- GitHub: https://github.com/zuiho-kai/openclaw-vault
- Issues: https://github.com/zuiho-kai/openclaw-vault/issues
