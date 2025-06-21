# NextJS Base Blocks
[![Lint](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/lint.yml/badge.svg)](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/lint.yml)
[![Build](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/build.yml/badge.svg)](https://github.com/dan1229/nextjs-base-blocks/actions/workflows/build.yml)

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
  --primary-light-color: #{lighten($primary-color, 10%)};
  --secondary-color: #{$secondary-color};
  --secondary-dark-color: #{darken($secondary-color, 10%)};
  --secondary-light-color: #{lighten($secondary-color, 10%)};
  --accent-color: #{$accent-color};
  --accent-dark-color: #{darken($accent-color, 10%)};
  --accent-light-color: #{lighten($accent-color, 10%)};
  --primary-darkest-color: #{darken($primary-color, 20%)};
  --secondary-darkest-color: #{darken($secondary-color, 20%)};
  --accent-darkest-color: #{darken($accent-color, 20%)};
  // general colors
  --white: #fff;
  --black: rgb(35, 35, 35);
  --grey-lightest: #8199c2;
  --grey-light: #9daeca;
  --grey-dark: #58647a;
  --grey-darkest: #606775;
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
  --bg-color: rgb(221, 221, 221);
  --bg-light-color: rgb(255, 255, 255);
  --bg-dark-color: rgb(177, 177, 177);
  // bb alert
  --alert-border-radius: 8px;
  // bb button
  --button-border-radius: 8px;
  // bb card
  --card-background-default-color: rgb(255, 255, 255);
  --card-darken-default-color: rgb(237, 237, 237);
  --card-border-default-color: rgb(221, 221, 221);
  --card-border-radius: 8px;
  --card-border-thickness: 1px;
  --card-elevation-default: rgba(0, 0, 0, 0.12) 0px 1px 1px, rgba(0, 0, 0, 0.24) 0px 1px 1px;
  --card-elevation-low: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  --card-elevation-med: rgba(0, 0, 0, 0.12) 0px 3px 6px, rgba(0, 0, 0, 0.24) 0px 3px 6px;
  --card-elevation-high: rgba(0, 0, 0, 0.12) 0px 10px 20px, rgba(0, 0, 0, 0.24) 0px 6px 6px;
  // bb divider
  --divider-color-default: rgb(221, 221, 221);
  // bb modal
  --modal-z-index: 9999;
  // bb navbar
  --navbar-background-color: rgb(221, 221, 221);
  --navbar-brand-padding: 0rem;
  --navbar-container-brand-margin: 0.25rem;
  --navbar-icon-mobile-color: #{$primary-color};
  --navbar-transition: all 0.2s ease-in-out;
  --navbar-max-width: 100%;
  --navbar-vertical-width: 8rem;
  // bb navbar item
  --navbar-item-border-radius: 1rem;
  --navbar-item-padding: 1rem;
  --navbar-item-background-color: #{$primary-color};
  --navbar-item-text-color: #{$primary-color};
  --navbar-item-text-color-hover: #{darken($secondary-color, 20%)};
  --navbar-item-bg-color-active: #{lighten($primary-color, 45%)};
  --navbar-item-bg-color-hover: #{lighten($secondary-color, 20%)};
  --navbar-item-border-thickness: 2px;
  --navbar-item-border-default-color: #{$primary-color};
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
  // bb text
  --text-color-default: rgb(24, 24, 24);
  --text-size-xs: 0.6rem;
  --text-size-s: 0.8rem;
  --text-size-m: 1rem;
  --text-size-l: 1.6rem;
  --text-size-xl: 2rem;
  --text-size-xxl: 2.6rem;
  --text-size-xxxl: 3.2rem;
  --mobile-text-size-xs: 0.4rem;
  --mobile-text-size-s: 0.6rem;
  --mobile-text-size-m: 0.8rem;
  --mobile-text-size-l: 1.2rem;
  --mobile-text-size-xl: 1.8rem;
  --mobile-text-size-xxl: 2.2rem;
  --mobile-text-size-xxxl: 2.6rem;
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


## Demo

This project is also a standalone NextJS project that you can run to see the components in action.

To do so, simply run:

```bash
npm run dev
```

Then navigate to [http://localhost:3000](http://localhost:3000) to see the demo of the components.

Form Components Demo are available at [http://localhost:3000/form-components](http://localhost:3000/form-components).

**Please not this is a work in progress.**

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)

##### Copyright 2025 © Daniel Nazarian.

