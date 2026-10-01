# Toolbox documentation site

Astro + Starlight + Galaxy, built as a standalone static site. This package does not change the Go toolkit or start its server.

## Develop

Use Node.js >=22.12.0 and pnpm 11.3.0 (declared in `package.json`).

```bash
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

## Hosting

The site is configured for `https://go-appsec.github.io/toolbox/` with Astro's `site` set to `https://go-appsec.github.io` and `base` set to `/toolbox`. Canonical URLs, social URLs, assets, search, and the sitemap use that location.

`.github/workflows/docs-web-deploy.yml` builds and publishes `docs-web/dist/` when documentation or its workflows change on `main`, including when a pull request is merged. It can also be run manually on `main`. Publishing is restricted to `go-appsec/toolbox`; forks run the documentation checks without publishing.

In the upstream repository, select **Settings → Pages → Build and deployment → Source → GitHub Actions** before the first deployment. The separate `docs-web.yml` workflow checks pull requests and branch pushes.

Local development and preview also use `/toolbox/`, for example `http://localhost:4321/toolbox/`.

## Content accuracy

Pages summarize the main README, contributor guidance, SDK contract, and source at the checked-out revision. The installed CLI help and advertised MCP schemas are the detailed references for a running version.

The [go-appsec GitHub avatar](https://avatars.githubusercontent.com/u/251776565) is bundled unchanged for the header logo, favicon, and right-hand homepage image. GitHub serves it at 460×460 pixels. Dark surfaces use `#151b23`, highlights use `#df6009`, and light-theme accents use `#0a3253`.
