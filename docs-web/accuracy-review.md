# Documentation accuracy review

Reviewed on 2026-09-30 against upstream commit `52caa0dab590adf363d9430519922f82d5d0b866`.

## Method

The initial draft used `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, and the sidecar README. A separate pass after writing checked the site pages and their examples against implementation files. No live target testing or browser certificate installation is claimed by this review.

| Documentation area | Implementation checked |
| --- | --- |
| Installation, local utilities, server-dependent CLI | `sectool/main.go`, `go.mod`, `Makefile` |
| Defaults, scope rules, capture exclusions | `sectool/config/config.go`, `sectool/service/capture_filter.go`, `mcp_proxy.go`, `mcp_replay.go`, `backend_crawler_colly.go` |
| Server flags and workflow availability | `sectool/service/flags.go`, `mcp_server.go`, `sectool/mcpclient/client.go` |
| CA location and generation | `sectool/service/server.go`, `sectool/service/proxy/cert.go` |
| Traffic, cookie, replay, crawl, OAST commands | Respective `sectool/*/flags.go` files and MCP handlers |
| Replay mutation and redirect semantics | `sectool/replay/flags.go`, `sectool/service/mcp_replay.go` |
| Exported bundles | `sectool/bundle/bundle.go` |
| Diff and reflections | `sectool/service/mcp_diff.go`, `mcp_reflection.go` |
| JavaScript extraction and endpoint handles | `sectool/js/flags.go`, `sectool/service/mcp_jssurface.go`, `mcp_jsendpoint.go` |
| JWT inspection | `sectool/jwt/jwt.go` |
| Optional notes and responders | `sectool/service/mcp_notes.go`, `mcp_respond.go`, `mcp_server.go` |
| Sidecar lifecycle and config | `sidecar/README.md`, `sectool/config/config.go`, `socket_unix.go`, `socket_windows.go`, `sectool/service/server.go` |
| Contributor commands | `CONTRIBUTING.md`, `Makefile` |

External cross-checks: [sidenuclei README](https://github.com/go-appsec/toolbox-sidenuclei), and the [official OpenAI MCP setup example](https://developers.openai.com/learn/docs-mcp). Claude Code's snippet is reproduced from the project's README rather than claimed to have been executed here.

## Corrections and qualifications

- The existing README's `--add-header` example was stale: the CLI defines `--set-header`. The README and new guide now use the implemented option.
- Encoding, decoding, hashing, JWT inspection, and version commands run locally; the testing command families require the server.
- The native backend is forced in the quickstart, avoiding implicit Burp selection.
- The CA follows the selected configuration directory, not invariably `~/.sectool`.
- Bundle response files are conditional on captured response content.
- Domain scope affects queries and sending/crawling operations, not all native proxy forwarding.
- Notes are optional and experimental. Crawling is omitted when starting in `test-report` mode. Canned-response tools and the sidecar listener require native mode.
- The sidecar config key is nested under `sidecars`. Platform transport is summarized without repeating outdated port wording from the SDK README.
- Reflections, callback events, static extraction, scanner results, and JWT decoding are not presented as proof of exploitability, guaranteed coverage, or signature verification.
- CLI and MCP pages are labeled overviews. Exact options belong to the installed command help and advertised schemas; no exhaustive parameter coverage is implied.

## Site verification

Run `pnpm check`, `pnpm build`, and `pnpm check:links`. Repeat the build and link check with `SITE_URL=https://example.com BASE_PATH=/toolbox` (also set `BASE_PATH` for the link checker). CI performs these checks without deploying.

Verification passed: frozen-lockfile installation, Astro Check (zero diagnostics), production builds and internal link/asset/anchor checks for root and `/toolbox` hosting. Browser checks confirmed homepage-to-quickstart navigation, working Pagefind search, canonical/social URLs, and a sitemap containing the subpath URLs. All 17 content routes returned HTTP 200 at mobile width with no horizontal overflow or JavaScript errors.

Desktop/mobile inspection also confirmed dark surfaces (`#151b23`), light accents and the secondary button (`#0a3253`), and the artwork's original 1200×480 aspect ratio. This checks presentation, not the toolkit's network behavior.

Versions were checked against the package registry: Astro 7.3.5, Starlight 0.42.4, Galaxy 1.0.0, sitemap 3.7.4, Sharp 0.35.5, and Astro Check 0.9.10. TypeScript 6.0.3 is the newest release within Astro Check's supported peer range; TypeScript 7.0.2 is published but unsupported by that checker. The pnpm lockfile pins the resolved dependency graph.

The latest Astro bundler emits a non-fatal MDX directive warning; Starlight emits optional i18n/default-404 content warnings. A build without `SITE_URL` also reports that no sitemap can be generated. A real public URL is required before deployment; canonical URLs and the sitemap were verified with a placeholder origin during the subpath build.
