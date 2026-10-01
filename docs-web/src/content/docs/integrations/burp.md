---
title: Burp Suite
description: Use Burp Suite's MCP extension as Sectool's HTTP backend while retaining the Sectool CLI and agent workflow.
---

Sectool can use Burp's MCP extension as its HTTP backend. This is useful when you already browse through Burp or want its GUI to inspect traffic.

## Set up Burp

Install Burp's MCP extension from the BApp Store and enable its MCP server at `http://127.0.0.1:9876/`, the endpoint Sectool expects by default. Configure the browser proxy and certificate trust following [Burp's browser instructions](https://portswigger.net/burp/documentation/desktop/external-browser-config).

## Require the Burp backend

```bash
sectool mcp --burp --workflow explore
```

`--burp` fails if Burp MCP is unavailable. Without an explicit backend flag, Sectool tries Burp and falls back to native. Use `--burp-mcp-url URL` if your Burp extension listens elsewhere.

Connect your agent to Sectool's MCP endpoint, normally `http://127.0.0.1:9119/mcp`. Sectool's endpoint and Burp's endpoint are separate services.

## Backend differences

The native proxy is also available without Burp. Native-only features include Sectool's canned-response tools and its sidecar listener. Do not assume every low-level behavior or tool is identical across backends.

To switch to native explicitly:

```bash
sectool mcp --proxy-port 8080 --workflow explore
```

If Burp already owns port 8080, stop its listener or choose another native port and update the browser configuration.
