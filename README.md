# Vault - OpenClaw Password Manager

安全密码管理插件，用于存储和管理密码。

## 功能特性

- 🔐 安全存储密码
- 📝 简单的命令行接口
- 🗂️ 密钥管理和查看
- 💾 本地 JSON 存储
- 🕐 自动记录创建和更新时间

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
      "storageFile": ".vault/passwords.json",
      "encryptionEnabled": false
    }
  }
}
```

### 配置选项

- `storageFile`: 密码存储文件路径（相对于用户主目录）
- `encryptionEnabled`: 是否启用加密（当前版本暂不支持）

## 存储位置

默认存储在 `~/.vault/passwords.json`

## 安全提示

⚠️ **重要**: 当前版本使用明文存储密码。请确保：

1. 文件系统权限正确设置
2. 不要将存储文件提交到版本控制
3. 定期备份密码文件
4. 考虑使用系统级加密（如磁盘加密）

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
