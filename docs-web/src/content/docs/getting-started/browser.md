---
title: Browser & HTTPS
description: Route browser requests through the native Sectool proxy and configure trust for HTTPS interception.
---

## Route traffic through the proxy

Start Sectool with `sectool mcp --proxy-port 8080 --workflow explore`, then configure the browser to use `127.0.0.1:8080` for HTTP and HTTPS proxying. The location of these settings depends on the browser and operating system; some browsers use system proxy settings.

If you change `--proxy-port`, update the browser configuration to match. For a local application, check whether `localhost` or `127.0.0.1` is excluded by the browser's proxy bypass settings.

## Trust the native proxy CA

With the default configuration path, the native proxy generates `~/.sectool/ca.pem` on first run. If you use `--config PATH`, the CA is generated beside that configuration file. Import it into the certificate store used by your browser and enable trust for identifying websites. On macOS, the project README also describes adding it to the system keychain.

The CA lets the native proxy intercept HTTPS connections. Use a dedicated testing browser profile where practical. Remove the trust when you no longer need it; stop routing that profile through the proxy when Sectool is stopped.

If HTTPS still fails, check that the browser actually uses the certificate store where you imported the CA. Clients with certificate pinning or a separate trust store may require additional application-specific setup.

## Verify

Open a page in your test application, then run:

```bash
sectool proxy list --host app.example.com
```

Replace the host with your application's host. Some image and font extensions are excluded from capture by default, even though the proxy still forwards them. See [configuration](../../reference/configuration/).

## Using Burp instead

With the Burp backend, configure the browser and certificate trust using [Burp's instructions](https://portswigger.net/burp/documentation/desktop/external-browser-config). Sectool's native CA is for its native proxy. See [Burp integration](../../integrations/burp/).
