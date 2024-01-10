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

The idea behind this is that you can standardize your components and styling without an overabundance of classes and styles or a third party style library like [bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) or [tailwind](https://tailwindcss.com/) (you can still switch to one if you want though!) This will make it easier to maintain and update your codebase as requirements become more intense.

If you ever want to move away or edit the base components, you can easily 'remove' the git submodule and do what you need. This is a great way to get started with a new project or to add to an existing one.

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

### SCSS Variables

You are also able to customize `Base Blocks` via SCSS variables. You typically will want to put these in `globals.scss`.

The available options are here:

```scss
// keep these variables separate to allow for dynamic lighten/darken usage
// NOTE: these are not required but it is highly recommended to at least
// set these theme colors
$primary-color: #5a65ff;
$secondary-color: #45b689;
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
  // general colors
  --white: #fff;
  --white-dark: #f5f5f5;
  --black: 35, 35, 35;
  --grey-light: #a9bcde;
  --grey-light-dark: #a8b6cc;  // used for hover states and similar
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
  --bg-color: rgb(221, 221, 221) !important;
  --bg-light-color: rgb(255, 255, 255) !important;
  --bg-dark-color: rgb(177, 177, 177) !important;
  --bs-body-color: rgb(24, 23, 23) !important;
  // bb alert
  --alert-border-radius: 8px;
  // bb button
  --button-border-radius: 8px;
  // bb card
  --card-background-default-color: rgb(255, 255, 255);
  --card-darken-default-color: rgb(39, 39, 39);
  --card-border-default-color: rgb(221, 221, 221);
  --card-border-radius: 8px;
  --card-elevation-low: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  --card-elevation-medium: rgba(0, 0, 0, 0.12) 0px 3px 6px, rgba(0, 0, 0, 0.24) 0px 3px 6px;
  --card-elevation-high: rgba(0, 0, 0, 0.12) 0px 10px 20px, rgba(0, 0, 0, 0.24) 0px 6px 6px;
  // bb navbar
  --navbar-border-radius: 8px;
  --navbar-background-color: rgb(221, 221, 221);
  --navbar-title-color: rgb(24, 23, 23);
  --navbar-brand-padding: 0rem;
  --navbar-container-brand-margin: 0.5rem;
  // bb navbar item
  --navbar-item-border-radius: 8px;
  --navbar-item-padding: 12px;
  // bb text
  --text-color-default: rgb(24, 23, 23) !important;
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
  --mobile-text-size-l: 1.8rem;
  --mobile-text-size-xl: 2.2rem;
  --mobile-text-size-xxl: 2.8rem;
  --mobile-text-size-xxxl: 3.2rem;
  // font family
  --font-family-main: 'Josefin Sans';  // Used for main text
  --font-family-header: 'Montserrat';  // Used for larger fonts/headers
}
```

While none of these variables are required, it definitely will help make your app look and feel more custom.

It is recommended to copy and paste this whole block into your `globals.scss` file and then edit the variables as needed.


#### Dark Mode / Themes

Add overrides for dark themes like so:
    
```scss
[data-theme='dark'] {
  // override any of the above variables
  --bg-color: rgb(25, 25, 25) !important;
  --bg-light-color: rgb(60, 60, 60) !important;
  --bg-dark-color: rgb(39, 39, 39) !important;
  --bs-body-color: rgb(245, 245, 245) !important;
  // bb card
  --card-background-default-color: rgb(255, 255, 255);
  --card-darken-default-color: rgb(39, 39, 39);
  --card-border-default-color: rgb(221, 221, 221);
  // bb text
  --text-color-default: rgb(255, 255, 255) !important;
}
```
-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)

##### Copyright 2024 © Daniel Nazarian.

