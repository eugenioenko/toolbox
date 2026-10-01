---
title: Discover the API surface
description: Analyze JavaScript and HTML references and crawl from URLs or captured flows to explore an application's surface.
---

## Analyze captured JavaScript or HTML

Find a relevant response in proxy history, then pass its flow ID:

```bash
sectool js FLOW_ID
sectool js --origin summary FLOW_ID
```

The analyzer extracts endpoint references, routes, WebSocket URLs, URL literals, and external script URLs. The default endpoint scope is same-origin; `--origin summary` provides per-host counts. HTML inline scripts are parsed independently.

When an endpoint has an extractable request shape, the listing includes an `endpoint_id`. Expand it using:

```bash
sectool js FLOW_ID.ENDPOINT_ID
```

Replace both placeholders with returned values. This can show body fields, headers, query parameters, and path parameters available at the call site. The corresponding agent tools are `js_surface` and `js_endpoint`.

Static analysis is a starting point. Computed URLs, runtime values, and unsupported patterns can limit extraction. An extracted reference does not prove that an endpoint is reachable, that a request is complete, or that a secret-looking value is sensitive. Capture and validate actual behavior.

## Crawl from a URL or flow

```bash
sectool crawl create --url https://app.example.com
sectool crawl create --flow FLOW_ID
```

These are alternative starting points. Replace the example host and flow ID. A crawl sends requests; review the intended scope and limits first. Flow seeds let the crawler start from captured request context.

Use the returned session ID:

```bash
sectool crawl status SESSION_ID
sectool crawl summary SESSION_ID
sectool crawl forms SESSION_ID
sectool crawl errors SESSION_ID
sectool crawl stop SESSION_ID
```

Crawling uses Colly rather than a browser. Do not expect it to execute the application like your interactive browser. Defaults include a depth of 20, a maximum of 2,000 requests, parallelism of 2, and a 200 ms delay. Form extraction is enabled; form submission and robots.txt respect are disabled by default. Some paths such as logout and delete are disallowed by default, but that is not a guarantee against state-changing requests.

See [configuration](../../reference/configuration/) and `sectool crawl create --help` for controls. Crawling tools are omitted when the server starts with `--workflow test-report`.
