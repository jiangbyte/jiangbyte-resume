# Soft Ice Resume

轻量 Astro 静态简历单页，视觉风格对齐「冰蓝 Soft Ice」。

在线：https://resume.jiangbyte.cn

适合作为博客 / 主站之外的独立简历子站部署；与博客静态目录分开，避免 `rsync --delete` 互相覆盖。

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

# 或显式指定 SSH Host 与远端目录
DEPLOY_SSH_HOST=myserver DEPLOY_REMOTE_DIR=/opt/nginx-gateway/sites/resume pnpm deploy
```

默认 rsync 到 `/opt/nginx-gateway/sites/resume`（`resume.jiangbyte.cn`）。密钥与服务器地址写在本机 `~/.ssh/config`，不要提交进仓库。

站点 URL 在 `astro.config.mjs` 的 `site` 中配置。

## 结构

```
src/
  components/   Hero · 经历 · Snowfall · SiteSettings …
  data/         resume.ts · projects.ts · site.ts
  lib/          prefs.ts · snowflake.ts · snow-field.ts
  pages/        index.astro
scripts/deploy.sh
```

偏简历向单页；项目明细可外链到博客项目集。不包含内容集合、Pagefind、写作室。

内容与外链请改 `src/data/` 下的配置文件。
