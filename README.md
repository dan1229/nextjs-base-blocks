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
- [Next Themes](https://www.npmjs.com/package/next-themes)
- [Recoil](https://recoiljs.org/)
- [Sass](https://sass-lang.com/)
- [Node Sass](https://www.npmjs.com/package/node-sass)
- [classnames](https://www.npmjs.com/package/classnames)
- [UseHooks TS](https://usehooks-typescript.com/)

See `package.json` for all the requirements.

### SCSS Globals

To use the `Base Blocks` properly, you should have the following SCSS variables defined in your project, typically in a `globals.scss` file:

```scss
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
  --black: 35, 35, 35;
  --grey-light: #8199c2;
  --grey-dark: #58647a;
  --grey-darkest: #2d3a4f;
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
  --text-color: rgb(24, 23, 23) !important;
  // border radius options
  --border-radius-bbalert: 8px;
  --border-radius--bbbutton: 8px;
  --border-radius--bbcard: 8px;
  --border-radius--bbnavbar: 8px;
  --border-radius--bbnavbar-item: 8px;
  // font family
  --font-family-header: 'Montserrat';  // Used for larger fonts/headers
  --font-family-main: 'Josefin Sans';  // Used for main text
}
```

Add overrides for dark themes like so:
    
```scss
[data-theme='dark'] {
    // override any of the above variables
  --bg-color: rgb(25, 25, 25) !important;
  --bg-light-color: rgb(60, 60, 60) !important;
  --bg-dark-color: rgb(39, 39, 39) !important;
  --bs-body-color: rgb(245, 245, 245) !important;
  --text-primary: rgb(255, 255, 255) !important;
}
```

While variables are not all required, the more you have defined the better!

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)

##### Copyright 2023 © Daniel Nazarian.

