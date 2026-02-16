---
name: vault
description: Simple local password storage tool. Store, retrieve, and manage passwords with CLI commands. Plain text storage - use for non-critical credentials only.
version: 1.0.1
author: zuiho-kai
homepage: https://github.com/zuiho-kai/openclaw-vault
tags: [password, vault, security, credentials, password-manager, cli]
metadata:
  openclaw:
    requires:
      bins: [node, npm]
---

# vault

**Use when** you need a simple local storage for non-critical passwords, API keys, or credentials.

⚠️ **Plain text storage** - This plugin stores passwords in unencrypted JSON. Use only for low-value credentials or development/testing purposes. For production secrets, use a proper password manager with encryption.

## Features

- 📝 Simple command-line interface
- 🗂️ Key management and listing
- 💾 JSON-based local storage (plain text)
- 🕐 Automatic timestamp tracking
- ⚠️ No encryption - suitable for non-critical credentials only

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

⚠️ **IMPORTANT - Plain Text Storage**:

This plugin stores passwords in **unencrypted JSON format**. It is suitable ONLY for:
- Development/testing credentials
- Non-critical API keys
- Temporary passwords
- Low-value secrets

**DO NOT use for**:
- Production credentials
- Financial information
- Personal sensitive data
- High-value API keys

**Recommendations**:
- Set strict file permissions: `chmod 600 ~/.vault/passwords.json`
- Add `.vault/` to your `.gitignore`
- Use system-level disk encryption
- For production secrets, use proper password managers (1Password, Bitwarden, etc.)

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
