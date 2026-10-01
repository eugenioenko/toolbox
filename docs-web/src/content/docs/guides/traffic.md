---
title: Inspect captured traffic
description: Find captured flows, inspect requests and responses, and identify the traffic relevant to your test.
---

Start a session and browse the application through the proxy. Replace `app.example.com` below with your test host and `FLOW_ID` with an ID returned by the listing.

## Narrow the traffic

```bash
sectool proxy summary
sectool proxy list --host app.example.com --limit 20
sectool proxy get FLOW_ID
```

A flow identifies a captured exchange. The agent can use `proxy_poll` for summary or individual-flow output, then `flow_get` for request and response details. For MCP flow listings, provide at least one filter or a limit.

Use the CLI's help to find path, method, status, and content search filters:

```bash
sectool proxy list --help
```

## Inspect cookies

```bash
sectool proxy cookies
sectool proxy cookies --name session_id
```

Cookie inspection extracts data from captured traffic. It is not a browser automation or login feature. Narrowing by name or domain can reveal full cookie values and JWT details; treat that output as session data.

## Check reflections

```bash
sectool reflected FLOW_ID
```

Reflection analysis looks for request parameter values in the response across encoding variants. A match is a place to investigate, not proof of an exploitable injection. Check where the value appears and how the application uses it.

## Interpret partial responses

For streaming responses, `flow_get` can report `in_progress: true` while the captured body grows. Retrieve the flow again for later content. Agent-facing body views de-chunk and decompress supported encodings, while displayed wire headers remain unchanged.

See [replay and compare](../replay/) to test a hypothesis based on the captured exchange.
