# jiangbyte-resume

简历子站：`https://resume.jiangbyte.cn`。轻量 Astro 静态页，视觉对齐博客「冰蓝 Soft Ice」。

根域博客仍由 [code-guide](../code-guide)（摸鱼猫泡泡）承载：`https://jiangbyte.cn`。

## 目录职责

| 仓库 | 域名 | 远端目录（示例） |
|------|------|------------------|
| **code-guide**（博客） | `https://jiangbyte.cn` | `/opt/nginx-gateway/html` |
| **jiangbyte-resume**（本仓 · 简历） | `https://resume.jiangbyte.cn` | `/opt/nginx-gateway/html-resume` |

`deploy.sh` 默认 `DEPLOY_REMOTE_DIR=/opt/nginx-gateway/html-resume`，与博客分开，避免 `rsync --delete` 互相覆盖。

## 开发

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build
pnpm preview
```

## 部署

```bash
pnpm deploy

# 或显式指定
DEPLOY_SSH_HOST=jiangbyte DEPLOY_REMOTE_DIR=/opt/nginx-gateway/html-resume pnpm deploy
```

密钥与服务器地址写在本机 `~/.ssh/config`，不要提交进仓库。

## Nginx / DNS（上线时）

1. DNS：`resume.jiangbyte.cn` → 服务器。
2. Nginx：`resume.jiangbyte.cn` 的 `root` 指向 `html-resume`。
3. 根域 `jiangbyte.cn` 继续指向博客 `html`（code-guide），**不再**把根域改成简历站。
4. 博客 `config/site.yaml` 的 `site.url` 保持 `https://jiangbyte.cn/`。

## 结构

```
src/
  components/   Hero · 经历时间轴 · Snowfall · SiteSettings …
  data/         resume.ts · projects.ts · site.ts
  lib/          prefs.ts · snowflake.ts · snow-field.ts
  pages/        index.astro
scripts/deploy.sh
```

偏简历向单页；项目明细引导到博客 / jiangfolio。不包含内容集合、Pagefind、写作室。
