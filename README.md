# NextJS Base Blocks
[![Lint](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/lint.yml/badge.svg)](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/lint.yml)
[![Build](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/build.yml/badge.svg)](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/build.yml)
[![Component Tests](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/test.yml/badge.svg)](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/dan1229/nextjs-base-blocks/branch/main/graph/badge.svg)](https://codecov.io/gh/dan1229/nextjs-base-blocks)

#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹
##### Contact me at <dnaz@danielnazarian.com>

-------------------------------------------------------

## Description

`Base Block`s is a collection of UI 'blocks' that are used to build the rest of the components used on the sites.

This is intended to be used as a git submodule in a NextJS + Typescript project.

A `block` ideally is the smallest unit of UI code that can be reasonably reused. It is a self-contained piece of code that can be used in any context. It is not a component, but a building block for other, bigger components.

The idea behind this is that you can standardize your components and styling without an overabundance of classes and styles or a third party style library like [bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) or [tailwind](https://tailwindcss.com/) (you can still switch to one if you want though!) This will make it easier to maintain and update your codebase as requirements grow.

If you ever want to move away or edit the base components, you can easily remove the git submodule and take what you need.

The goal here is to provide consistent and easy to use components that can be used in any project, helping you get a project off the ground quickly or to improve an existing project.

## Requirements

You must have the following installed to use this submodule
- [React Hook Forms](https://react-hook-form.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Sass](https://sass-lang.com/)
- [Node Sass](https://www.npmjs.com/package/node-sass)
- [classnames](https://www.npmjs.com/package/classnames)
- [UseHooks TS](https://usehooks-typescript.com/)

See `package.json` for all the requirements.

Since this is a submodule it can't enforce these requirements, but you will get errors if you don't have them installed.

### Components

At the moment, the following components are available:
- `BBAlert`
- `BBButton`
- `BBCard`
- `BBCollapsible`
- `BBLink`
- `BBLoadingSpinner`
- `BBModal`
- `BBNavbar`
- `BBNavbarItem`
- `BBText`

As well as the following 'Form Components':
- `BBFieldBase`
- `BBFieldCheckbox`
- `BBFieldDropdown`
- `BBFieldFile`
- `BBFieldNumber`
- `BBFieldSelectCard`
- `BBFieldSelectMultiple`
- `BBFieldText`

Also including a number of form helper functions and components.

### SCSS Variables

You are also able to customize `Base Blocks` via SCSS variables. You typically will want to put these in `globals.scss`.

The list of available options is here:

```scss
// keep these variables separate to allow for dynamic lighten/darken usage
// NOTE: these are not required but it is highly recommended to at least
// set these theme colors
$primary-color: #6366f1;
$secondary-color: #10b981;
$accent-color: #f59e0b;
$info-color: #3b82f6;
$warning-color: #f59e0b;
$success-color: #10b981;
$danger-color: #ef4444;

html,
:root {
  // app theme
  --primary-color: #{$primary-color};
  --primary-dark-color: #{darken($primary-color, 10%)};
  --primary-darkest-color: #{darken($primary-color, 20%)};
  --primary-light-color: #{lighten($primary-color, 10%)};
  --secondary-color: #{$secondary-color};
  --secondary-dark-color: #{darken($secondary-color, 10%)};
  --secondary-darkest-color: #{darken($secondary-color, 20%)};
  --secondary-light-color: #{lighten($secondary-color, 10%)};
  --accent-color: #{$accent-color};
  --accent-dark-color: #{darken($accent-color, 10%)};
  --accent-light-color: #{lighten($accent-color, 10%)};
  --accent-darkest-color: #{darken($accent-color, 20%)};
  // general colors
  --white: #ffffff;
  --black: #1f2937;
  --grey-lightest: #f9fafb;
  --grey-light: #e5e7eb;
  --grey-dark: #6b7280;
  --grey-darkest: #374151;
  // theme colors
  --info-color: #{$info-color};
  --info-dark-color: #{darken($info-color, 10%)};
  --info-light-color: #{lighten($info-color, 10%)};
  --warning-color: #{$warning-color};
  --warning-dark-color: #{darken($warning-color, 10%)};
  --warning-light-color: #{lighten($warning-color, 10%)};
  --success-color: #{$success-color};
  --success-dark-color: #{darken($success-color, 10%)};
  --success-light-color: #{lighten($success-color, 10%)};
  --danger-color: #{$danger-color};
  --danger-dark-color: #{darken($danger-color, 10%)};
  --danger-light-color: #{lighten($danger-color, 10%)};
  // bg theme colors
  --bg-color: #f8fafc;
  --bg-light-color: #ffffff;
  --bg-dark-color: #e2e8f0;
  // bb alert
  --alert-border-radius: 0.75rem;
  // bb button
  --button-base-padding: 0.75rem 1.25rem;
  --button-border-radius: 0.5rem;
  // bb card
  --card-background-default-color: #ffffff;
  --card-darken-default-color: #f8fafc;
  --card-border-default-color: #e2e8f0;
  --card-border-radius: 0.75rem;
  --card-border-thickness: 1px;
  --card-elevation-default: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --card-elevation-low: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --card-elevation-med: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --card-elevation-high: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  // bb divider
  --divider-color-default: #e2e8f0;
  // bb modal
  --modal-z-index: 9999;
  // bb navbar
  --navbar-background-color: var(--white);
  --navbar-brand-padding: 0.5rem;
  --navbar-icon-mobile-color: var(--primary-color);
  --navbar-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  // if using vertical navbar, uncomment this
  // --navbar-vertical-width: 8rem;
  // bb navbar item
  --navbar-item-border-radius: 0.5rem;
  --navbar-item-padding: 0.75rem 1rem;
  --navbar-item-min-width: unset;
  --navbar-item-background-color: transparent;
  --navbar-item-text-color: var(--grey-darkest);
  --navbar-item-text-color-hover: var(--primary-color);
  --navbar-item-bg-color-active: #{lighten($primary-color, 45%)};
  --navbar-item-bg-color-hover: var(--grey-lightest);
  --navbar-item-border-thickness: 1px;
  --navbar-item-border-default-color: transparent;
  // bb tooltip
  --tooltip-padding: 0.75rem 1rem;
  --tooltip-border-radius: 0.5rem;
  --tooltip-z-index: 1070;
  --tooltip-box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --tooltip-arrow-size: 6px;
  // bb form components
  --form-input-bg: var(--white);
  --form-input-border-color: var(--grey-light);
  --form-input-color: var(--grey-darkest);
  --form-input-focus-color: var(--primary-color);
  --form-input-focus-bg: var(--white);
  --form-input-focus-border-color: var(--primary-color);
  --form-input-placeholder-color: var(--grey-dark);
  --form-input-disabled-color: var(--grey-dark);
  --form-input-disabled-bg: var(--grey-lightest);
  --form-input-disabled-border-color: var(--grey-light);
  --form-file-button-border-color: var(--grey-light);
  --form-file-button-hover-color: var(--white);
  --form-file-button-color: var(--grey-darkest);
  --form-file-button-hover-bg: var(--primary-color);
  --form-input-plaintext-color: var(--grey-darkest);
  --form-select-arrow-color: var(--grey-dark);
  // bb text
  --text-color-default: #1f2937;
  --text-size-xs: 0.75rem;
  --text-size-s: 0.875rem;
  --text-size-m: 1rem;
  --text-size-l: 1.125rem;
  --text-size-xl: 1.25rem;
  --text-size-xxl: 1.875rem;
  --text-size-xxxl: 3rem;
  --mobile-text-size-xs: 0.75rem;
  --mobile-text-size-s: 0.875rem;
  --mobile-text-size-m: 1rem;
  --mobile-text-size-l: 1.125rem;
  --mobile-text-size-xl: 1.25rem;
  --mobile-text-size-xxl: 1.5rem;
  --mobile-text-size-xxxl: 2.25rem;
  // font family - page router font usage
  --font-family-main: 'Josefin Sans';  // Used for main text
  --font-family-header: 'Montserrat';  // Used for larger fonts/headers
  --font-family-navbar-header: 'Montserrat';  // Used for navbar headers
  --form-input-font-family: 'Montserrat' // Font family for all form fields
  --form-label-font-family: 'Montserrat' // Font family for all form field labels
  // font family - app router font usage
  --font-family-main: var(--font-lexend);
  --font-family-header: var(--font-lexend);
  --font-family-navbar-header: var(--font-lexend);
  --form-input-font-family: var(--font-family-main); // Font family for all form fields
  --form-label-font-family: var(--font-family-main); // Font family for all form field labels
}
```

While none of these variables are required, it definitely will help make your app look and feel more custom.

It is recommended to copy and paste this whole block into your `globals.scss` file and then edit the variables as needed.

#### Dark Mode / Themes

Add overrides for dark themes like so:
    
```scss
[data-theme='dark'] {
  // override any of the above variables
  --bg-color: #0f172a;
  --bg-light-color: #1e293b;
  --bg-dark-color: #334155;
  --grey-lightest: #1e293b;
  --grey-light: #334155;
  --grey-dark: #64748b;
  --grey-darkest: #cbd5e1;
  // bb navbar
  --navbar-background-color: #1e293b;
  --navbar-item-text-color: #cbd5e1;
  --navbar-item-bg-color-hover: #334155;
  // bb card
  --card-background-default-color: #1e293b;
  --card-darken-default-color: #0f172a;
  --card-border-default-color: #334155;
  // bb divider
  --divider-color-default: #334155;
  // bb text
  --text-color-default: #f1f5f9;
  // bb form components
  --form-input-bg: #1e293b;
  --form-input-border-color: #334155;
  --form-input-color: #f1f5f9;
  --form-input-disabled-bg: #0f172a;
}
```


## Testing

This project includes comprehensive testing with Cypress component testing and code coverage.

### Running Tests

```bash
# Run all component tests
npm run test

# Run tests with coverage report
npm run test:coverage

# Open Cypress GUI for component testing
npm run test:open

# Generate coverage reports
npm run coverage:report

# Open HTML coverage report in browser
npm run coverage:open
```

### Test Structure

- **Component Tests**: Located in `cypress/component/` directory
- **Test Utilities**: Custom commands and helpers in `cypress/support/`
- **Coverage Reports**: Generated in `coverage/` directory

All base components have comprehensive test coverage including:
- Rendering tests for all prop variations
- Interaction testing (clicks, hovers, form inputs)
- Responsive behavior testing
- Accessibility testing
- Edge case handling

### Writing New Tests

To create a new test file, use the template in `cypress/support/_template.cy.tsx` or follow the existing test patterns. All tests should follow the established naming convention: `componentname.cy.tsx`.

## Demo

This project is also a standalone NextJS project that you can run to see the components in action.

To do so, simply run:

```bash
npm run dev
```

Then navigate to [http://localhost:3000](http://localhost:3000) to see the demo of the components.

Form Components Demo are available at [http://localhost:3000/form-components](http://localhost:3000/form-components).

**Please note this is a work in progress.**

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)

##### Copyright 2025 © Daniel Nazarian.

