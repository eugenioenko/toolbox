---
title: Contributing
description: Help Toolbox grow through useful reports, code contributions, and accurate documentation.
---

Toolbox accepts improvements through [GitHub](https://github.com/go-appsec/toolbox). Useful contributions include reproducible bug reports, concrete feature requests, corrections to examples, and testing workflows that explain observed behavior.

## Develop the Go toolkit

Fork the repository, clone your fork, and install Go dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/toolbox
cd toolbox
go mod download
make test-all
```

Create a feature branch and follow existing code patterns. Add tests for changed application behavior. Before submitting toolkit changes, the contributor guide asks you to run:

```bash
make test-all
make lint
```

See [CONTRIBUTING.md](https://github.com/go-appsec/toolbox/blob/main/CONTRIBUTING.md) for the development workflow and [AGENTS.md](https://github.com/go-appsec/toolbox/blob/main/AGENTS.md) for architecture and implementation conventions.

## Improve this site

The site lives in `docs-web/` and uses Astro, Starlight, and Galaxy. Use Node.js 22.12 or newer and the pnpm version declared in `package.json`:

```bash
cd docs-web
pnpm install
pnpm dev
```

Before submitting documentation changes, run `pnpm check` and `pnpm build`. Verify commands and claims against the relevant source or executable help. Clearly distinguish an observation from a security conclusion, and avoid claiming guaranteed coverage or discovery.

## Submit a contribution

Commit clear changes on your fork, push your branch, and open a pull request describing the result and relevant verification. For questions, use the project's [question issue template](https://github.com/go-appsec/toolbox/issues/new?template=question.md).
