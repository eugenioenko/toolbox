# Toolbox documentation site

Astro + Starlight + Galaxy, built as a standalone static site. This package does not change the Go toolkit or start its server.

## Develop

Use Node.js >=22.12.0 and pnpm 11.3.0 (declared in `package.json`).

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm check:links
pnpm preview
```

## Hosting

Deploy `dist/` to a static host after building. No production domain or deployment is configured yet. Set `SITE_URL` to the actual public origin to generate canonical URLs, social URLs, and a sitemap; set `BASE_PATH` when hosting under a subpath. For example, for a GitHub Pages project site:

```bash
SITE_URL=https://YOUR_USERNAME.github.io BASE_PATH=/toolbox pnpm build
```

The root-hosted default uses `/`. Review public URLs and the upstream GitHub/edit links before launch. CI builds both root and `/toolbox` variants but does not publish the site.

## Content accuracy

Pages summarize the main README, contributor guidance, SDK contract, and source at the checked-out revision. The installed CLI help and advertised MCP schemas are the detailed references for a running version.

The [go-appsec GitHub avatar](https://avatars.githubusercontent.com/u/251776565) is bundled unchanged for the header logo, favicon, and right-hand homepage image. GitHub serves it at 460×460 pixels. Dark surfaces use `#151b23`, highlights use `#df6009`, and light-theme accents use `#0a3253`.
