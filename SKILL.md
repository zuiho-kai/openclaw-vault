# Vault - Password Manager

安全密码管理工具，用于存储和管理密码。

## 功能

- 🔐 安全存储密码
- 📝 简单的命令行接口
- 🗂️ 密钥管理和查看
- 💾 本地 JSON 存储

## 使用方法

### 设置密码

```bash
vault gemini sk-abc123xyz
```

### 显示密码

```bash
vault gemini show
```

### 删除密码

```bash
vault gemini remove
```

### 列出所有密钥

```bash
vault list
```

## 配置

```json
{
  "plugins": {
    "vault": {
      "storageFile": ".vault/passwords.json"
    }
  }
}
```

## 安全提示

⚠️ 当前版本使用明文存储，请确保文件系统权限正确设置。

## 示例

```bash
# 保存 API 密钥
vault openai sk-proj-abc123
vault anthropic sk-ant-xyz789

# 查看密钥
vault openai show

# 列出所有密钥
vault list

# 删除密钥
vault openai remove
```
