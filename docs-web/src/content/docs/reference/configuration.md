---
title: Configuration
description: Sectool configuration location, domain scope, body limits, capture exclusions, and crawler defaults.
---

Sectool uses `~/.sectool/config.json`, created with defaults when needed. Use `--config PATH` to select another file. Edit configuration before starting the server; do not assume file edits are reloaded by a running instance.

The tables below summarize selected settings, not the complete configuration schema. See [config.go](https://github.com/go-appsec/toolbox/blob/main/sectool/config/config.go) for the implementation.

## Server and scope

| Key | Default | Purpose |
| --- | --- | --- |
| `mcp_port` | `9119` | MCP listener port |
| `proxy_port` | `8080` | Native proxy port |
| `burp_required` | `false` | Require Burp instead of falling back |
| `max_body_bytes` | `10485760` | Body size limit (10 MiB) |
| `allowed_domains` | `[]` | Domain allowlist; empty means no allowlist restriction |
| `exclude_domains` | `[]` | Excluded domains; takes precedence and matches subdomains |
| `include_subdomains` | `true` | Include subdomains when matching allowed domains |
| `interactsh_server_url` | `""` | Empty uses default public Interactsh servers |
| `interactsh_auth_token` | `""` | Optional server token; `INTERACTSH_TOKEN` is a fallback |

Domain settings filter proxy queries and constrain request sending, crawler scope, and sidecar upstream dialing. They do not act as a network firewall: browsing through the native proxy can still forward traffic outside these domains.

## Native proxy

The following keys live inside the `proxy` object:

| Key | Default |
| --- | --- |
| `dial_timeout_secs` | `20` |
| `read_timeout_secs` | `240` |
| `write_timeout_secs` | `60` |
| `exclude_extensions` | `"gif\|jpg\|jpeg\|png\|ico\|webp\|woff\|woff2\|ttf\|eot"` |
| `full_buffer` | `false` |

Capture exclusions match file extensions without the dot using an anchored RE2 pattern. Matching requests are forwarded but not stored. An empty string disables extension exclusions; an omitted or null value uses the default.

`full_buffer` affects response body match/replace rules. With streaming rule application, a match spanning chunks can be missed. Enable full buffering for whole-body rule matching. Compressed or Content-Length-framed responses with body rules are buffered regardless. Native replay responses are read fully before storage.

## Crawler

Settings inside `crawler` include:

| Key | Default |
| --- | --- |
| `delay_ms` | `200` |
| `parallelism` | `2` |
| `max_depth` | `20` |
| `max_requests` | `2000` |
| `extract_forms` | `true` |
| `submit_forms` | `false` |
| `respect_robots` | `false` |
| `recon` | `false` |

Default `disallowed_paths` are `*logout*`, `*signout*`, `*sign-out*`, `*delete*`, and `*remove*`. Review scope and limits before crawling; these patterns cannot identify every action that changes state.

## Sidecars

The `sidecars` object includes `enabled` (default `true`), `sidecar_socket`, and heartbeat settings. The listener is created under the native backend. Sectool does not launch adapters for you. See [sidecars](../../integrations/sidecars/) for the SDK contract and platform-specific transport.
