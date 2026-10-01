---
title: Out-of-band testing
description: Create an Interactsh-backed Sectool session, use its domain in a test, and inspect callback events.
---

Out-of-band application security testing (OAST) collects interactions outside the application's direct response. Sectool uses an Interactsh backend and returns a domain you can use in a test payload.

## Create a session

```bash
sectool oast create
```

The result supplies an OAST session ID and domain. Use that domain in the specific request you are investigating, then trigger the relevant application behavior. Creating a session alone does not send a payload to the target.

## Inspect events

```bash
sectool oast poll OAST_ID
sectool oast get EVENT_ID
```

Replace `OAST_ID` with the returned session ID, and `EVENT_ID` with an event from polling. Events may include DNS, HTTP, or SMTP interactions. Their contents and availability depend on the server and the target's behavior.

The agent uses `oast_create`, `oast_poll`, and `oast_get` for the same workflow. Polling can wait for new events; it need not return immediately.

## Interpret the evidence

A callback shows that something interacted with the domain. Establish whether it came from the target, a browser, an intermediary, or your own test tooling. A DNS lookup alone does not demonstrate an HTTP fetch or access to internal resources. No callback does not conclusively rule out a vulnerability.

## Redirect probing

On a supporting OAST server, the `redirect_target` option can make HTTP callbacks receive a 307 redirect. The option is advertised by MCP only when the backend supports it. Use it to investigate redirect following; do not assume all Interactsh servers offer this behavior.

## Close the session

```bash
sectool oast delete OAST_ID
```

See [configuration](../../reference/configuration/) for custom Interactsh server and authentication settings.
