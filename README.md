# Vault - Simple Password Storage

⚠️ **Plain text storage** - Use only for non-critical credentials.

Simple local password storage tool with CLI interface.

## Features

- 📝 Simple command-line interface
- 🗂️ Key management and listing
- 💾 JSON-based local storage (plain text)
- 🕐 Automatic timestamp tracking

⚠️ **Security Notice**: This plugin stores passwords in unencrypted JSON. Suitable only for development/testing credentials or low-value secrets. For production use, consider proper password managers with encryption.

## 安装

```bash
cd /path/to/openclaw-vault
npm install
openclaw plugins link $(pwd)
```

## 使用方法

### 设置密码

```bash
vault gemini sk-abc123xyz
```

保存密钥 `gemini` 的密码为 `sk-abc123xyz`。

### 显示密码

```bash
vault gemini show
```

显示密钥 `gemini` 的密码。

### 删除密码

```bash
vault gemini remove
```

删除密钥 `gemini` 的密码。

### 列出所有密钥

```bash
vault list
```

显示所有已保存的密钥及其创建/更新时间。

## 配置

在 OpenClaw 配置中可以自定义：

```json
{
  "plugins": {
    "vault": {
      "storageFile": ".vault/passwords.json"
    }
  }
}
```

### 配置选项

- `storageFile`: 密码存储文件路径（相对于用户主目录）

## 存储位置

默认存储在 `~/.vault/passwords.json`

## 安全提示

⚠️ **重要 - 明文存储**:

当前版本使用**未加密的 JSON 格式**存储密码。仅适用于：
- 开发/测试凭据
- 非关键 API 密钥
- 临时密码
- 低价值秘密

**不要用于**：
- 生产环境凭据
- 金融信息
- 个人敏感数据
- 高价值 API 密钥

**建议**：
1. 设置严格的文件权限：`chmod 600 ~/.vault/passwords.json`
2. 将存储文件添加到 `.gitignore`
3. 使用系统级磁盘加密
4. 对于生产秘密，使用专业密码管理器（1Password、Bitwarden 等）

## 示例

```bash
# 保存 API 密钥
vault openai sk-proj-abc123
vault anthropic sk-ant-xyz789

# 查看密钥
vault openai show
# 输出: Password for 'openai': sk-proj-abc123

# 列出所有密钥
vault list
# 输出:
# Stored passwords:
# • openai (created: 2026-02-17T..., updated: 2026-02-17T...)
# • anthropic (created: 2026-02-17T..., updated: 2026-02-17T...)

# 删除密钥
vault openai remove
```

## 许可证

MIT

## 作者

zuiho-kai
