/**
 * OpenClaw Vault Plugin
 *
 * 安全密码管理工具
 *
 * 命令:
 *   vault <key> <password>  - 设置密码
 *   vault <key> show        - 显示密码
 *   vault <key> remove      - 删除密码
 *   vault list              - 列出所有密钥
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { existsSync } from 'fs';

// ============================================================================
// 存储管理
// ============================================================================

class VaultStorage {
  constructor(storagePath) {
    this.storagePath = join(homedir(), storagePath);
  }

  async ensureStorage() {
    const dir = dirname(this.storagePath);
    if (!existsSync(dir)) {
      await mkdir(dir, { recursive: true });
    }
    if (!existsSync(this.storagePath)) {
      await writeFile(this.storagePath, JSON.stringify({}, null, 2));
    }
  }

  async load() {
    await this.ensureStorage();
    const content = await readFile(this.storagePath, 'utf-8');
    return JSON.parse(content);
  }

  async save(data) {
    await this.ensureStorage();
    await writeFile(this.storagePath, JSON.stringify(data, null, 2));
  }

  async set(key, password) {
    const data = await this.load();
    data[key] = {
      password,
      createdAt: data[key]?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await this.save(data);
    return true;
  }

  async get(key) {
    const data = await this.load();
    return data[key];
  }

  async remove(key) {
    const data = await this.load();
    if (!(key in data)) {
      return false;
    }
    delete data[key];
    await this.save(data);
    return true;
  }

  async list() {
    const data = await this.load();
    return Object.keys(data).map(key => ({
      key,
      createdAt: data[key].createdAt,
      updatedAt: data[key].updatedAt
    }));
  }
}

// ============================================================================
// 插件导出
// ============================================================================

export default function vaultPlugin(api) {
  const config = api.getConfig() || {};
  const storagePath = config.storageFile || '.vault/passwords.json';
  const storage = new VaultStorage(storagePath);

  // 注册 vault 命令
  api.registerSkill({
    id: 'vault',
    name: 'Vault',
    description: 'Password management tool',

    async execute(args) {
      const parts = args.trim().split(/\s+/);

      // vault list
      if (parts[0] === 'list') {
        const entries = await storage.list();
        if (entries.length === 0) {
          return { success: true, message: 'No passwords stored.' };
        }

        const list = entries.map(e =>
          `• ${e.key} (created: ${e.createdAt}, updated: ${e.updatedAt})`
        ).join('\n');

        return {
          success: true,
          message: `Stored passwords:\n${list}`
        };
      }

      // vault <key> show
      if (parts.length === 2 && parts[1] === 'show') {
        const key = parts[0];
        const entry = await storage.get(key);

        if (!entry) {
          return { success: false, message: `Password for '${key}' not found.` };
        }

        return {
          success: true,
          message: `Password for '${key}': ${entry.password}`
        };
      }

      // vault <key> remove
      if (parts.length === 2 && parts[1] === 'remove') {
        const key = parts[0];
        const removed = await storage.remove(key);

        if (!removed) {
          return { success: false, message: `Password for '${key}' not found.` };
        }

        return {
          success: true,
          message: `Password for '${key}' removed.`
        };
      }

      // vault <key> <password>
      if (parts.length === 2) {
        const [key, password] = parts;
        await storage.set(key, password);

        return {
          success: true,
          message: `Password for '${key}' saved.`
        };
      }

      // 无效命令
      return {
        success: false,
        message: `Usage:
  vault <key> <password>  - Set password
  vault <key> show        - Show password
  vault <key> remove      - Remove password
  vault list              - List all keys`
      };
    }
  });

  return {
    id: 'vault',
    name: 'Vault',
    version: '1.0.0'
  };
}
