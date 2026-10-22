# NextJS Base Blocks - Agent Guide

This file provides comprehensive guidance for coding agents working in this repository.

---

## Repository Overview

**NextJS Base Blocks** is a comprehensive React component library designed as a git submodule for TypeScript + NextJS projects. Other React hosts are supported through `src/framework/generic/` and the Vite plugin in `vite.js`. It provides a collection of standardized UI "blocks" - the smallest reusable units of interface code that serve as building blocks for larger components.

### Key Philosophy
- **Self-contained blocks**: Each component is fully independent and reusable
- **No external style dependencies**: Avoid Bootstrap/Tailwind lock-in while maintaining flexibility
- **Submodule architecture**: Easy to adopt, modify, or remove from projects
- **TypeScript-first**: Full type safety with comprehensive interfaces
- **CSS Variables**: Extensive customization without touching component code

### Component Inventory
**Core UI Components (16):**
- BBAlert, BBButton, BBCard, BBCode, BBCollapsible, BBDivider, BBLabel, BBLink, BBLoadingSpinner, BBModal, BBNavbar, BBNavbarItem, BBQuote, BBTable, BBText, BBTooltip

**Form Components (8):**
- BBFieldBase, BBFieldCheckbox, BBFieldFile, BBFieldNumber, BBFieldSelect, BBFieldSelectCard, BBFieldSelectMultiple, BBFieldText

**Architecture:**
- Dependencies: Minimal React ecosystem essentials
- Test Coverage: Comprehensive Cypress component testing (see `cypress/component/`)

---

## Repository Structure

- **`TODO.md`**  
  - Master TODO list.  
  - Tasks flow **bottom-up** → items at the bottom are the most relevant/current.  
  - The very bottom often contains **draft release notes** for the WIP release.  
  - Use this as the **primary reference** for requirements.  

- **`src/`**  
  - Main code directory
  - `src/app/` - demo app for this project
  - `src/framework/` - the routing and image primitives the blocks need from their host.
    The top level is the NextJS implementation, `generic/` is the same exports with no
    `next` import. **A block never imports `next` itself** - it imports from `../framework`,
    and anything added there is added to both

- **`mixins.js`, `vite.js`**
  - What a host's bundler config imports: the SCSS mixin wiring for NextJS, and the Vite
    plugin that swaps in `src/framework/generic/` and wires the same mixins

- **`cypress/`**  
  - Contains Cypress component tests in `cypress/component/` (the `e2e/` directory is currently unused)

- **`.github/`**  
  - GitHub Actions workflows for CI/CD.  

- **`CHANGELOG.md`**  
  - Release notes.  
  - **Only update on release commits**.  

---

## Key Guidelines

ABOVE ALL ELSE - be mindful that this is a submodule. Treat it like any other package. Be careful to document any breaking design choices and do everything possible to not add any breaking changes.

1. **MINIMAL EFFECTIVE CHANGES**  
   - Unless specifically asked, prioritize **small, incremental changes** over large refactors.  
   - This reduces review time and Claude’s compute cost and makes changes safer.

2. **Iterative Changes**  
   - Keep contributions **small, minimal, and incremental**.  
   - This reduces review time and Claude’s compute cost.  

3. **Resource Quality**  
   - Only add resources or dependencies if they provide **real value**.  

4. **Design Consistency**  
   - Follow **existing design patterns, file structure, and conventions**.  
   - Proposals for improvements are welcome, but **default to current patterns**.  

5. **Formatting**  
   - Match existing code style and formatting **exactly**.  

---

## General Style Requests

- No barrel import files
- Use SCSS variables as much as possible - MAKE SURE THEY'RE REAL
  - Prefer existing ones over new ones
  - Document all of them in the `README.md` for other users
- Be mindful of the dark / light them requirements
- Try to be DRY as much as possible and use pre-existing tooling whenever available

---

## Testing, Linting, and Building

```bash
# Lint
npm run lint

# Bulid
npm run build

# Tests
npm run test:coverage
```

## Testing Philosophy

We strive to get as close to 100% coverage for this.

Tests are run via Cypress and since this is a submodule, we want to ensure that we are not introducing breaking changes / bugs.

---

## Releasing

Releases are **triggered by the commit subject**, not by a manual tag. `.github/workflows/detect-version.yml` is the standard release workflow (`dan-release-standard: 3` in its header), installed by the `release-setup` skill.

- A push to `main` whose commit **subject** contains a bracketed version (`release: [X.X.X]`) is a release. Only the subject is read — a `[X.X.X]` in a commit body does nothing.
- The workflow checks that `package.json`'s `version` matches, tags `X.X.X` (bare, no `v`), cuts a `release/X.X.X` marker branch, and publishes a GitHub release whose body is the `### [X.X.X]` section of `CHANGELOG.md` at that commit. A missing or empty section fails the release instead of shipping a blank body.
- It then dispatches `.github/workflows/deploy-branch.yml`, which cuts the `version/X.X.X` branch. Repos that vendor this one as a submodule pin that branch (`branch = version/X.X.X` in their `.gitmodules`), so it must keep being cut.
- A subject with **no** `[X.X.X]` releases nothing. Do **not** hand-create git tags, `version/` branches or GitHub releases — let the workflow do it.

The canonical way to cut a release is the `release` skill, which:
1. Moves the finished `### [X.X.X]` section from the bottom of `TODO.md` into `CHANGELOG.md` (with the final date).
2. Bumps `version` in `package.json` and `package-lock.json` to match — the workflow refuses a release whose `package.json` disagrees, before anything is tagged.
3. Commits with the subject `release: [X.X.X]`, pushes to `main`, and leaves a fresh placeholder in `TODO.md`.

---

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.