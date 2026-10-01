---
title: Server & workflows
description: Sectool MCP server flags, proxy backend selection, transports, workflow modes, and optional notes.
---

## Start the server

```bash
sectool mcp
```

By default, Sectool tries the Burp MCP backend first and falls back to its native proxy. Default MCP and native proxy ports are 9119 and 8080, unless configuration overrides them.

| Option | Behavior |
| --- | --- |
| `--proxy-port 8080` | Select the native proxy on this port, skipping Burp detection |
| `--burp` | Require Burp MCP; fail if unavailable |
| `--burp-mcp-url URL` | Override the Burp MCP endpoint, default `http://127.0.0.1:9876/` |
| `--port PORT` | Set the MCP port |
| `--config PATH` | Use a different configuration file |
| `--workflow MODE` | Preselect a workflow mode |
| `--notes` | Enable experimental notes and findings tools |
| `--sidecar-socket ADDRESS` | Override the sidecar IPC address |

Check `sectool mcp --help` for the executable's current flags.

## Workflow modes

| Mode | Behavior |
| --- | --- |
| Omitted | Advertise `workflow`; an agent selects `explore` or `test-report` before using other tools |
| `explore` | Supply exploration instructions upfront, with crawling available |
| `test-report` | Supply report-validation instructions upfront and omit crawl tools |
| `none` | Omit workflow instructions and make tools available immediately |
| `multi` | Supply shared-server guidance and adjust features such as shared polling cursors |

Other availability constraints still apply: notes need `--notes`, canned responses need the native backend, and adapter tools need a connected sidecar. `multi` is a shared-server workflow, not a promise of isolated sessions.

The CLI initializes its own workflow when needed; humans do not have to call an MCP workflow tool manually.

## Notes

```bash
sectool mcp --proxy-port 8080 --workflow explore --notes
```

`notes_save` and `notes_list` let an agent save observations and findings linked to flows. They are disabled by default and marked experimental by the CLI. A note's `finding` type is a label, not independent confirmation of a vulnerability.

## Transports

MCP binds to `127.0.0.1` and exposes `/mcp` for Streamable HTTP and `/sse` for legacy SSE. Browser traffic uses the separate proxy port. See [agent connection](../../getting-started/agents/).
