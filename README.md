# Soft Ice Resume

轻量 Astro 静态简历单页，视觉风格对齐「冰蓝 Soft Ice」。

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
DEPLOY_SSH_HOST=myserver DEPLOY_REMOTE_DIR=/var/www/html-resume pnpm deploy
```

`scripts/deploy.sh` 通过环境变量配置目标机与目录；密钥与服务器地址写在本机 `~/.ssh/config`，不要提交进仓库。

## Nginx / DNS（上线时）

1. 为简历子域配置 DNS。
2. Nginx `root` 指向简历静态目录（与博客目录分离）。
3. 站点 URL 在 `astro.config.mjs` 的 `site` 中配置。

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
