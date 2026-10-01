---
title: Replay & compare
description: Modify a captured request with Sectool, inspect the replay, and compare responses without treating differences as automatic findings.
---

Use a running server and a captured request from your test application. Replace `FLOW_ID` and `REPLAY_ID` with IDs returned by Sectool. Sending a replay makes a real request, so choose a request whose effects you understand.

## Make a targeted change

```bash
sectool replay send --flow FLOW_ID --set-header "X-Test: value"
```

`--set-header` adds or replaces a header. The replay result supplies a flow ID; inspect and compare it with the original:

```bash
sectool replay get REPLAY_ID
sectool diff FLOW_ID REPLAY_ID --scope response
```

Diffing compares status, headers, and bodies for `--scope response`. JSON bodies get structured comparison, text gets a text diff, and binary bodies get size comparison. A changed status or body needs interpretation: authentication, dynamic content, rate limiting, and application state can also cause differences.

## Modify query parameters or JSON

```bash
sectool replay send --flow FLOW_ID --set-query "page=2"
sectool replay send --flow FLOW_ID --set-json "preferences.theme=dark"
```

Choose a flow with the relevant query or a valid JSON body. JSON values are inferred as literals, numbers, objects, arrays, or strings. The CLI also supports removal, path changes, destination overrides, and optional redirect following. Consult the current options:

```bash
sectool replay send --help
```

Redirects are not followed by default.

## Edit an exported bundle

```bash
sectool proxy export FLOW_ID
```

The default output directory is `./sectool-requests/FLOW_ID/`, containing `request.http`, `body`, and `request.meta.json`, plus `response.http` and `response.body` when that response content is available. Edit the request headers in `request.http` or raw body in `body`, then send:

```bash
sectool replay send --bundle FLOW_ID
```

Keep the exported request's HTTP line endings and bundle layout. For bundles and raw files, edit the source files directly; inline modification flags are for `--flow`.

## Work with the agent

Ask the agent to explain its hypothesis, identify the baseline flow, replay one meaningful change, and use `diff_flow` to review the result. Report the observed behavior and its limits before assessing security impact.
