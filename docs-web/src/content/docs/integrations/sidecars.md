---
title: Sidecars & scanning
description: Extend the native Sectool backend with separately launched protocol adapters or the sidenuclei scanning sidecar.
---

Sidecars are separate processes connected to Sectool's native backend. They can add protocol adapters or tools and emit traffic into the unified flow timeline. Sectool supplies the integration surface; it does not automatically launch these processes or implement every protocol.

## Custom protocol adapters

Adapters can use the Go `sidecar` SDK or implement the length-prefixed JSON-RPC 2.0 contract in another language. The SDK provides registration, rule caching, and flow emission. Adapters remain responsible for their protocol handling.

The native listener uses local IPC: a Unix domain socket by default on Linux/macOS, and loopback TCP on Windows. `--sidecar-socket` overrides the address; config stores it under `sidecars.sidecar_socket`.

Read the [Sidecar SDK & Protocol](https://github.com/go-appsec/toolbox/blob/main/sidecar/README.md) for wire types, version negotiation, claims, mutation handling, and examples. That document is the maintained SDK/protocol contract; this page does not duplicate it.

## Automated scanning with sidenuclei

[sidenuclei](https://github.com/go-appsec/toolbox-sidenuclei) is a first-party sidecar that runs Nuclei using captured request context and records results as `finding` notes linked to flows.

Start a native Sectool session with notes enabled:

```bash
sectool mcp --proxy-port 8080 --workflow explore --notes
```

Then install and launch sidenuclei following [its own documentation](https://github.com/go-appsec/toolbox-sidenuclei). It runs alongside Sectool rather than being bundled into the Sectool executable.

Captured parameters, cookies, and authentication context can make scans more relevant to the requests you actually exercised. Coverage depends on captured traffic, scanner configuration, and templates. Review scanner results before reporting them as confirmed vulnerabilities.
