---
title: Quickstart
description: Start the native Sectool proxy, connect a browser and coding agent, and inspect your first captured requests.
---

This walkthrough uses the native proxy and an application you can test. [Install Sectool](../installation/) first.

## 1. Start the server

```bash
sectool mcp --proxy-port 8080 --workflow explore
```

Keep this terminal running. Explicitly setting `--proxy-port` chooses the native proxy rather than trying Burp first. With default configuration, the MCP server listens at `http://127.0.0.1:9119/mcp` and the proxy uses port `8080`.

`--workflow explore` supplies exploration instructions upfront. Without a workflow flag, the agent must call `workflow` before using other MCP tools.

## 2. Configure your browser

Set the browser's HTTP/HTTPS proxy to `127.0.0.1:8080`. For HTTPS, trust the generated CA at `~/.sectool/ca.pem` in the browser's certificate settings. See [browser and HTTPS setup](../browser/) for details, including localhost bypasses.

Browse your test application, sign in if needed, and perform an action that sends a request. Sectool captures traffic routed through its proxy; it does not import traffic from an unconfigured browser.

## 3. Check the capture

In a second terminal:

```bash
sectool proxy summary
sectool proxy list --host app.example.com
```

Replace `app.example.com` with your application's hostname. Use a returned flow ID to inspect an exchange:

```bash
sectool proxy get FLOW_ID
```

`FLOW_ID` is a placeholder, not an executable example ID.

## 4. Connect your coding agent

Configure a client supporting Streamable HTTP MCP to use `http://127.0.0.1:9119/mcp`. The [agent connection guide](../agents/) includes the client configuration examples from the project README.

Start with a bounded request, for example:

> Inspect the captured traffic for app.example.com. Summarize the endpoints we exercised and suggest a request to investigate. Explain the proposed change before sending it.

The agent can query flows and use replay and analysis tools while you continue browsing. Its access to captured traffic includes authentication material in those requests.

## 5. Investigate one hypothesis

Choose a captured request, [replay a targeted modification](../../guides/replay/), and compare the responses. Interpret differences in application context before calling them a finding.
