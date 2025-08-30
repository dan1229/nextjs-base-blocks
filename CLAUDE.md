# NextJS Base Blocks - Claude Assistant Guide

This file provides comprehensive guidance for **Claude Code** (`claude.ai/code`) when working with this repository.

---

## Repository Overview

**NextJS Base Blocks** is a comprehensive React component library designed as a git submodule for TypeScript + NextJS projects. It provides a collection of standardized UI "blocks" - the smallest reusable units of interface code that serve as building blocks for larger components.

### Key Philosophy
- **Self-contained blocks**: Each component is fully independent and reusable
- **No external style dependencies**: Avoid Bootstrap/Tailwind lock-in while maintaining flexibility
- **Submodule architecture**: Easy to adopt, modify, or remove from projects
- **TypeScript-first**: Full type safety with comprehensive interfaces
- **CSS Variables**: Extensive customization without touching component code

### Component Inventory
**Core UI Components (13):**
- BBAlert, BBButton, BBCard, BBCollapsible, BBDivider, BBLink, BBLoadingSpinner, BBModal, BBNavbar, BBNavbarItem, BBText, BBTooltip

**Form Components (8):**
- BBFieldBase, BBFieldCheckbox, BBFieldFile, BBFieldNumber, BBFieldSelect, BBFieldSelectCard, BBFieldSelectMultiple, BBFieldText

**Architecture:**
- Dependencies: Minimal React ecosystem essentials
- Test Coverage: Comprehensive Cypress component testing

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

- **`cypress/`**  
  - Contains Cypress E2E tests

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

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.