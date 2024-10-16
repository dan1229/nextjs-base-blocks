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
- [Recoil](https://recoiljs.org/)
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
$accent-color: #ebeb30;
$info-color: #284af7;
$warning-color: #f1c500;
$success-color: #50c758;
$danger-color: #e8352e;

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
  // general colors
  --white: #fff;
  --white-dark: #f5f5f5;
  --black: rgb(35, 35, 35);
  --grey-light: #8199c2;
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
  // bb navbar
  --navbar-border-radius: 8px;
  --navbar-background-color: rgb(221, 221, 221);
  --navbar-title-color: #{$primary-color};
  --navbar-brand-padding: 0rem;
  --navbar-container-brand-margin: 0.25rem;
  --navbar-container-brand-width: 10%;
  --navbar-icon-mobile-color: #{$primary-color};
  --navbar-vertical-width: 132px;
  --navbar-horizontal-height: 96px;
  // bb navbar item
  --navbar-item-border-radius: 8px;
  --navbar-item-padding: 12px;
  --navbar-item-text-color: #{$primary-color};
  --navbar-item-text-color-hover: #{darken($secondary-color, 20%)};
  --navbar-item-bg-color-active: #{lighten($primary-color, 45%)};
  --navbar-item-bg-color-hover: #{lighten($secondary-color, 20%)};
  // bb text
  --text-color-default: rgb(24, 24, 24);
  --text-size-xs: 0.6rem;
  --text-size-s: 0.8rem;
  --text-size-m: 1rem;
  --text-size-l: 1.8rem;
  --text-size-xl: 2.2rem;
  --text-size-xxl: 2.8rem;
  --text-size-xxxl: 3.2rem;
  --mobile-text-size-xs: 0.6rem;
  --mobile-text-size-s: 0.8rem;
  --mobile-text-size-m: 1rem;
  --mobile-text-size-l: 1.2rem;
  --mobile-text-size-xl: 1.6rem;
  --mobile-text-size-xxl: 2.4rem;
  --mobile-text-size-xxxl: 2.8rem;
  // font family
  --font-family-main: 'Josefin Sans';  // Used for main text
  --font-family-header: 'Montserrat';  // Used for larger fonts/headers
  --font-family-navbar-header: 'Montserrat';  // Used for navbar headers
  // font family - app router font usage
  --font-family-main: var(--font-lexend);
  --font-family-header: var(--font-lexend);
  --font-family-navbar-header: var(--font-lexend);
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
  --navbar-border-radius: 8px;
  --navbar-background-color: rgb(54, 54, 54);
  --navbar-title-color: rgb(255, 255, 255);
  // bb card
  --card-background-default-color: rgb(77, 77, 77);
  --card-darken-default-color: rgb(39, 39, 39);
  --card-border-default-color: rgb(77, 77, 77);
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

**Please not this is a work in progress.**

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)

##### Copyright 2024 © Daniel Nazarian.

