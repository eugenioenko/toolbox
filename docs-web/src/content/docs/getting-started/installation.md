---
title: Installation
description: Install Sectool from Go, download a release binary, or build Toolbox from source.
---

## Install with Go

```bash
go install github.com/go-appsec/toolbox/sectool@latest
sectool version
```

Use a Go toolchain compatible with the repository's [go.mod](https://github.com/go-appsec/toolbox/blob/main/go.mod). Go installs the executable in `GOBIN`, or the `bin` directory under `GOPATH` when `GOBIN` is unset. Add that directory to your `PATH` if your shell cannot find `sectool`.

## Download a binary

Download the archive for your operating system and architecture from [GitHub releases](https://github.com/go-appsec/toolbox/releases). Builds cover Linux, macOS, and Windows on amd64 and arm64. Extract the executable, make it executable where required, and put it on your `PATH`.

## Build from source

```bash
git clone https://github.com/go-appsec/toolbox.git
cd toolbox
make build
./bin/sectool version
```

`make build` writes `bin/sectool`. You can run that executable directly; building does not install it on your `PATH`.

## Next

Follow the [quickstart](../quickstart/) to launch the server and capture traffic. Proxy, replay, crawl, and OAST CLI operations require a running server. Local utilities such as `encode`, `decode`, `hash`, `jwt`, and `version` do not.
