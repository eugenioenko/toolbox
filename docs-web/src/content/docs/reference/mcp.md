---
title: MCP tools
description: Overview of Sectool's core MCP tools, their purposes, and conditional availability.
---

The server advertises tool schemas to connected clients. Use those schemas for exact parameters; this page summarizes the core surface. Tools and optional parameters can vary with backend, workflow, and connected sidecars.

| Area | Tools | Purpose |
| --- | --- | --- |
| Workflow | `workflow` | Initialize the default session workflow |
| Traffic | `proxy_poll`, `flow_get`, `cookie_jar` | Find flows, inspect exchanges, extract captured cookies |
| Rules | `proxy_rule_list`, `proxy_rule_add`, `proxy_rule_delete` | Manage live match/replace rules |
| Canned responses | `proxy_respond_add`, `proxy_respond_delete`, `proxy_respond_list` | Serve registered responses for matched hosts and paths |
| Requests | `replay_send`, `request_send` | Replay modified flows or originate HTTP requests |
| Crawling | `crawl_create`, `crawl_seed`, `crawl_status`, `crawl_poll`, `crawl_sessions`, `crawl_stop` | Manage crawls and query their results |
| OAST | `oast_create`, `oast_poll`, `oast_get`, `oast_list`, `oast_delete` | Manage callback domains and inspect interactions |
| Analysis | `diff_flow`, `find_reflected`, `js_surface`, `js_endpoint` | Compare flows, locate reflections, and extract JS/HTML references |
| Utilities | `encode`, `decode`, `uuid_generate`, `hash`, `jwt_decode` | Transform or inspect supplied values |
| Notes | `notes_save`, `notes_list` | Save and retrieve observations linked to flows |

## Availability

- `workflow` is advertised for the default mode; agents must initialize it before other core tools work.
- Starting with `--workflow test-report` omits crawl tools.
- Canned-response tools require the native backend.
- Notes tools require `--notes` and are experimental.
- `oast_create` advertises `redirect_target` only if the OAST backend supports redirects.
- Connected sidecars can add tools and conditional parameters to the advertised surface.

## Use identifiers from results

Use returned flow IDs with `flow_get`, `replay_send`, and `diff_flow`. Crawl tools return session IDs; OAST tools return session and event IDs. `js_endpoint` accepts an `endpoint` handle in the form `FLOW_ID.ENDPOINT_ID`, using the endpoint ID from `js_surface`.

Analysis results need interpretation. `find_reflected` does not establish exploitability, `js_surface` does not guarantee endpoint reachability, and `jwt_decode` does not verify signatures.

See [server and workflows](../server/) for mode selection and [sidecars](../../integrations/sidecars/) for extensions.
