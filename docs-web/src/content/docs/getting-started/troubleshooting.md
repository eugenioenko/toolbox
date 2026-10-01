---
title: Troubleshooting
description: Diagnose missing captures, HTTPS trust errors, MCP connection issues, and workflow initialization errors.
---

## No captured requests

Check that Sectool is running, the browser's proxy port matches, and the application host is not bypassing the proxy. Localhost is a common bypass. Confirm the backend in Sectool's startup output: plain `sectool mcp` tries Burp first; `--proxy-port 8080` forces the native proxy.

Capture excludes some image and font extensions by default. Try an HTML page or an API action and check `sectool proxy summary`. Review domain scope and capture exclusions in [configuration](../../reference/configuration/).

## HTTPS certificate errors

Check that you imported the CA for the backend in use: Sectool's `~/.sectool/ca.pem` for native interception, or Burp's CA for Burp. Verify browser trust for websites, not just certificate import. See [browser setup](../browser/).

## CLI or agent cannot connect

Keep the server process running. Check its startup output and match the MCP port in the client's configuration. Browser proxy port `8080` and MCP port `9119` serve different purposes. Container and remote clients do not share the host's loopback address.

## “Call workflow first”

Ask the agent to call `workflow` with an appropriate task. Alternatively, restart with an explicit mode such as `--workflow explore`. See [workflow modes](../../reference/server/).

## Tools are missing

`--workflow test-report` omits crawling tools. Notes tools require `--notes`. Canned-response tools require the native backend. Sidecar tools depend on connected adapters. See the [MCP overview](../../reference/mcp/).

## A response is incomplete

A captured streaming response can still be in progress. `flow_get` reports `in_progress`; retrieve it again after more data arrives. Body size limits and decompression failures can also limit what tools display.
