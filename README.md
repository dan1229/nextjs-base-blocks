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
- `BBFieldSelect`
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
$primary-color: #5a65ff;
$secondary-color: #45b689;
$accent-color: #FF6B6C;
$info-color: #FFC800;
$warning-color: #f1c500;
$success-color: #50c758;
$danger-color: #78CDD7;

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
  --white: #fff;
  --black: rgb(35, 35, 35);
  --grey-lightest: #abb3c0;
  --grey-light: #b1bfd5;
  --grey-dark: #969dac;
  --grey-darkest: #6f7e9d;
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
  --bg-color: rgb(210, 210, 210);
  --bg-light-color: rgb(230, 230, 230);
  --bg-dark-color: rgb(189, 189, 189);
  // bb alert
  --alert-border-radius: 1rem;
  // bb button
  --button-base-padding: 0.6rem;
  --button-border-radius: 1rem;
  // bb card
  --card-background-default-color: rgb(250, 250, 250);
  --card-darken-default-color: rgb(220, 220, 220);
  --card-border-default-color: rgb(230, 230, 230);
  --card-border-radius: 1rem;
  --card-border-thickness: 2px;
  --card-elevation-default: rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.24) 0px 1px 1px;
  --card-elevation-low: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  --card-elevation-med: rgba(0, 0, 0, 0.12) 0px 3px 6px, rgba(0, 0, 0, 0.24) 0px 3px 6px;
  --card-elevation-high: rgba(0, 0, 0, 0.12) 0px 10px 20px, rgba(0, 0, 0, 0.24) 0px 6px 6px;
  // bb divider
  --divider-color-default: rgb(221, 221, 221);
  // bb modal
  --modal-z-index: 9999;
  // bb navbar
  --navbar-background-color: var(--primary-color);
  --navbar-brand-padding: 0;
  --navbar-icon-mobile-color: var(--primary-color);
  --navbar-transition: all 0.2s ease-in-out;
  // if using vertical navbar, uncomment this
  // --navbar-vertical-width: 8rem;
  // bb navbar item
  --navbar-item-border-radius: 1rem;
  --navbar-item-padding: 0.5rem;
  --navbar-item-background-color: transparent;
  --navbar-item-text-color: var(--accent-color);
  --navbar-item-text-color-hover: #{darken($accent-color, 20%)};
  --navbar-item-bg-color-active: #{lighten($primary-color, 45%)};
  --navbar-item-bg-color-hover: #{lighten($accent-color, 20%)};
  --navbar-item-border-thickness: 2px;
  --navbar-item-border-default-color: var(--primary-color);
  // bb tooltip
  --tooltip-padding: 0.5rem 1rem;
  --tooltip-border-radius: 8px;
  --tooltip-z-index: 1070;
  --tooltip-box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --tooltip-arrow-size: 4px;
  // bb form components
  --form-input-bg: var(--bg-color);
  --form-input-border-color: var(--bg-dark-color);
  --form-input-color: var(--text-color-default);
  --form-input-focus-color: var(--secondary-color);
  --form-input-focus-bg: var(--bg-color);
  --form-input-focus-border-color: var(--secondary-color);
  --form-input-placeholder-color: var(--grey-lightest);
  --form-input-disabled-color: var(--grey-lightest);
  --form-input-disabled-bg: var(--bg-color);
  --form-input-disabled-border-color: var(--grey-dark);
  --form-file-button-border-color: var(--grey-dark);
  --form-file-button-hover-color: var(--text-color-default);
  --form-file-button-color: var(--text-color-default);
  --form-file-button-hover-bg: var(--primary-color);
  --form-input-plaintext-color: var(--white);
  --form-select-arrow-color: var(--form-input-color);
  --form-required-indicator-color: var(--form-input-color);
  // bb text
  --text-color-default: rgb(24, 24, 24);
  --text-size-xs: 0.5rem;
  --text-size-s: 0.75rem;
  --text-size-m: 1rem;
  --text-size-l: 1.5rem;
  --text-size-xl: 2rem;
  --text-size-xxl: 2.5rem;
  --text-size-xxxl: 3rem;
  --mobile-text-size-xs: 0.6rem;
  --mobile-text-size-s: 0.8rem;
  --mobile-text-size-m: 1rem;
  --mobile-text-size-l: 1.2rem;
  --mobile-text-size-xl: 1.6rem;
  --mobile-text-size-xxl: 2rem;
  --mobile-text-size-xxxl: 2.5rem;
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

#### Media Sizing Variables

This one's important!

The media sizing variables provide consistent responsive breakpoints throughout your application.

To use these in NextJS, check `src/styles/mixins.scss` and copy that to your projects `styles/mixins.scss`.

I prefer to do these in `styles/mixins.scss`. Then in your `next.config.js` define the following:

```
sassOptions: {
  includePaths: [path.join(__dirname, 'styles')],
  // Automatically import mixins.scss into all SCSS files
  // This makes responsive mixins available globally without manual imports
  additionalData: `@import "mixins.scss";`
},
```


Use these in your media queries for consistent responsive design:

```scss
@include media-xl {
  ...
}

@include media-lg {
  ...
}
```


#### Dark Mode / Themes

Add overrides for dark themes like so:
    
```scss
[data-theme='dark'] {
  // override any of the above variables
  --bg-color: rgb(25, 25, 25);
  --bg-light-color: rgb(60, 60, 60);
  --bg-dark-color: rgb(39, 39, 39);
  // bb navbar
  --navbar-background-color: rgb(54, 54, 54);
  // bb card
  --card-background-default-color: rgb(77, 77, 77);
  --card-darken-default-color: rgb(39, 39, 39);
  --card-border-default-color: rgb(77, 77, 77);
  // bb divider
  --divider-color-default: rgb(77, 77, 77);
  // bb text
  --text-color-default: rgb(255, 255, 255);
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

