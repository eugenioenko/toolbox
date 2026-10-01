---
title: Connect your agent
description: Connect a coding agent to Sectool's local Streamable HTTP MCP endpoint.
---

Start Sectool before connecting the agent. The default Streamable HTTP endpoint is:

```text
http://127.0.0.1:9119/mcp
```

The project README provides these client configuration examples. Client setup can vary by version; use your client's current MCP configuration interface if it differs.

## Claude Code

```bash
claude mcp add --transport http sectool http://127.0.0.1:9119/mcp
```

## Codex

Add this entry to `~/.codex/config.toml`:

```toml
[mcp_servers.sectool]
url = "http://127.0.0.1:9119/mcp"
```

This configuration follows the [official OpenAI MCP configuration example](https://developers.openai.com/learn/docs-mcp).

## Other MCP clients

Configure a Streamable HTTP connection to the endpoint above. `/sse` is available as a legacy SSE endpoint for older clients. Change the URL's port if you started Sectool with a different `--port`.

The server binds MCP to loopback. A client in a container or on another machine has a different `127.0.0.1`; these examples assume the agent and Sectool run on the same host.

## Begin a session

When started with plain `sectool mcp`, the agent must call `workflow` with `task: "explore"` or `task: "test-report"` before other tools work. Starting with `--workflow explore` preselects that mode.

Tell the agent the application host, your objective, and any constraints on requests. You supply browser login and application context; the agent can inspect captured authentication data and send modified requests through the tools.

See [server and workflows](../../reference/server/) for availability differences and optional notes.
