# Base Blocks

`Base Block`s is a collection of UI 'blocks' that are used to build the rest of the components used on the sites.

A `block` ideally is the smallest unit of UI code that can be reasonably reused. It is a self-contained piece of code that can be used in any context. It is not a component, but a building block for other, bigger components.

The idea behind this is that you can standardize your components and styling without an overabundance of classes and styles or a third party style library like [bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/) or [tailwind](https://tailwindcss.com/) (you can still switch to one if you want though!) This will make it easier to maintain and update your codebase as requirements become more intense.

## Requirements

You must have the following installed to use this submodule
- [NextJS](https://nextjs.org/)
- [React Hook Forms](https://react-hook-form.com/)
- [Recoil](https://recoiljs.org/)
- [Sass](https://sass-lang.com/)

- nextjs themes thing lol?

### SCSS Globals

To use the `Base Blocks` you are able to have the following SCSS variables defined in your project, typically in a `globals.scss` file:

```scss

html,
:root {
  // NOTE: do NOT use 'var' in any of these values as SASS will not compile them
  // Know as well, ANY updates to the following will require a recompilation of the
  // stylesheets
  // app theme
  --primary-color: #{$primary-color};
  --primary-dark-color: #{darken($primary-color, 10%)};
  --primary-light-color: #{lighten($primary-color, 10%)};
  --secondary-color: #{$secondary-color};
  --secondary-dark-color: #{darken($secondary-color, 10%)};
  --secondary-light-color: #{lighten($secondary-color, 10%)};
  // shared across all themes
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
  // light theme colors
  --bg-color: rgb(221, 221, 221) !important;
  --bg-light-color: rgb(255, 255, 255) !important;
  --bg-dark-color: rgb(177, 177, 177) !important;
  --bs-body-color: rgb(24, 23, 23) !important;
  --text-primary: rgb(0, 0, 0) !important;
}
