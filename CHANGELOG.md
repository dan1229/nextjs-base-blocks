# CHANGELOG for TypeScript API Services
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹
##### Contact me at <dnaz@danielnazarian.com>

-------------------------------------------------------

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


-------------------------------------------------------

## [Released]

### [2.1.0] - 2025-07-21
- Breaking Change!
  - `BBFieldDropdown` -> `BBFieldSelect`
- `BBNavbarItem`
  - `title` now accepts components and `string`s
  - Better text wrapping (or lack thereof)
- Form components now show a `required` indicator
  - Based on `required` prop or passing `required` through `register`
  - variable to set indicator color
- Converted demo pages to use app router
  - Updated lots of packages


### [2.0.4] - 2025-07-03
- `register` type issues in legacy projects


### [2.0.3] - 2025-06-27
- `onChange` / `register` conflict fixed


### [2.0.2] - 2025-06-27
- `register` type fix


### [2.0.1] - 2025-06-27
- Fix issue with form component `register` syntax


### [2.0.0] - 2025-06-22
- `BBModal`
  - Improved overall styling for a more modern look and feel.
  - `z-index` is now set via a variable: `--modal-z-index`.
- `BBButton`
  - `noBorder` prop added
  - `--button-base-padding` variable added
  - Fixed `transparentPrimary`, `transparentSecondary` and `transparentAccent` variants
- `BBNavbarItem`
  - added `navbar-item-min-width` to set min width
- `BBFieldDropdown` (now `BBFieldSelect`)
  - Improved styling by adding a custom dropdown arrow.
- `BBLoadingSpinner`
  - Added `color` prop to allow for custom colors.
- `BBFieldFile`
  - Improved styling for light mode.
  - Added theming variables for file input button.
- `BBTooltip`
  - Visual clean up
  - Fixed mis-alignment of full text bubble
  - `showIcon` prop can now be used to hide the icon and wrap `children` elements.
- Installed Cypress component testing with comprehensive setup
  - Created test framework with custom commands and utilities
  - Added documentation and template for easy test creation
  - Implemented example tests for BBButton, BBAlert, and BBCard
  - Added CI/CD pipeline with GitHub Actions for automated testing
  - Over 200 test cases to start
    - Only regular components for now, no form components yet
  - Coverage and CodeCov support!
- Package version updates


### [1.5.1] - 2025-05-28
- Added keydown events for `BBFieldText`


### [1.5.0] - 2025-05-27
- Support for field specific errors
  - Typing and props for field specific errors
  - Ref props supported as well
- Fixes for form field sizing options
  - Added sizing options prompt
- Added `helperTextType` to allow for helper text in forms in tooltips
- Added SCSS vars for font of form field labels
  - `form-input-font-family`
  - `form-label-font-family`
- Auto release CD configs


### [1.4.2] - 2025-05-07
- Typo with `BBText` variable sizes


### [1.4.1] - 2025-05-04
May 4, 2025
- `BBFieldSelectMultiple` - added support for field specific errors
  - `InputWrapper` also supports displaying errors now
- CI pipeline fixes


### [1.4.0] - 2025-01-09
- `BBFormComponents`
  - Added color and style variables!
    - View `README.md` for more info but over 10 new variables added
  - Added basic demo page at `/form-components`
- `BBCard`
  - Header, Body, and Footer border radius improvements
- `BBNavbar`
  - `--navbar-max-width` variable added
  - `--navbar-vertical-width` variable added back lol
  - `menuAlignment` prop added
  - Action button sizing improved / more dynamic
- `BBTooltip` component added!
  - Able to pass text or custom content
  - Some props - `variant`, TODO
  - Demo components added too
- `BBModal`
  - Fix (attempted) for `BBModal` background scrolling
  - Improved demo component state
- `BBDivider`
  - Thickness and minimum thickness improvements
  

### [1.3.4] - 2025-01-04
- Fix `BBNavbar` vertical width issues
- Fix `BBNavbar` centering on 'regular' navbar issues
- Removed `--navbar-container-brand-width` variable


### [1.3.3] - 2024-11-13
- `BBNavbar`
  - Removed `--navbar-vertical-width`
  - Hover shadow improved visually

  
### [1.3.2] - 2024-11-05
- `BBNavbar`
  - Modernization and styling improvements
  - `--navbar-transition` variable added
  - `brandHorizontal` prop added
- `BBNavbarItem`
  - SCSS clean up
  - Fix border radius on dropdown issues

  
### [1.3.1] - 2024-10-29
- `BBNavbar`
  - Mobile styling clean up
  - Removed `navbar-border-radius`
  - Added `--navbar-item-background-color`
  - Improved mobile styling

  
### [1.3.0] - 2024-10-19
- Variable updates
  - `--grey-light-dark` renamed to `--grey-light`
  - `--grey-light` renamed to `--grey-lightest`
  - `--card-elevation-default` variable added
  - `--card-border-thickness` variable added
  - `--white-dark` variable removed
- `BBDivider`
  - Added new component!
  - Lots of props for styling
  - Added to demo page
- `BBButton`
  - Added `iconColor` prop
- `BBCard`
  - Added `default` elevation prop and SCSS variable
  - `href` cards made external links to open in new tab
  - Fix hover state for `href` cards
  - FIX: added back `className` prop
- `BBAlert`
  - Added `classNameIcon` prop
- `BBCollapsible`
  - Added `isExpandedInitial` prop
  - Added `onExpanded` and `onCollapsed` props
  - Added `arrowUp` and `arrowDown` props
  - Added `buttonVariant` prop
    - Removed `colorArrow` prop
  - Renamed `isExpanded` prop to `showButtonUp`
  - Added `buttonTransparent` prop
  - General component styling clean up
- `BBModal`
  - Improved general styling and feel
  - Added `colorBorder` prop
- `BBNavbar`
  - Removed `navbar-horizontal-height` variable
  - Weird alignment issues fixed with pop ups
  - Mobile styling alignment fixed
  - Vertical navbar styling improved
  - Vertical navbar mobile styling improved
- `BBNavbarItem`
  - `activePaths` prop added to specify active paths if they differ from the current path
  - `colorBorder` prop added along with type and styles
  - `noBorder` prop added
  - `--navbar-item-border-thickness` variable added
  - `--navbar-item-border-radius` variable added
  - `--navbar-item-border-default-color` variable added
  - Hover state border radius issue fixed
- Default theme colors updated


### [1.2.3] - 2024-07-01
- `BBNavbar`
  - Improve `buttonsAction` padding
- Improved doc / SCSS variables


### [1.2.2] - 2024-06-27
- `BBFieldBase`
  - Fix for `className` prop not being passed properly
- `BBButton`
  - `openInNewTab` prop added for link buttons

  
### [1.2.1] - 2024-06-24
- `BBNavbar`
  - `content` and alignment improvements
  - Mobile styling improvements
- `BBCard`
  - Border radius fixes for only `header` and weird configs

  
### [1.2.0] - 2024-06-23
- `BBButton`
  - Fixed DOM nesting error when using `href` prop
  - Fixed padding/styling for `href` buttons
  - Hover state improvements
  - Black color default not working if not provided
  - Some inverse colors not working
- `BBCard`
  - Mobile styling padding improvements
  - Added `colorBackground` to `header`, `body`, and `footer`
  - Border radius issues fixed for different combinations of `header`, `body`, and `footer`
  - Fixes for `href` cards
    - Fixed DOM nesting error
    - Fixed padding/styling/hover
    - Removed `hrefColor` prop
- `BBNavbar`
  - Updated structure to take `mainContent` prop
  - Added `vertical` prop and styling!!!
  - Renamed `buttonsAuth` to `buttonsAction`
    - Same with `show` prop
  - Added `sticky` prop
  - Improved font defaults, styling and new variable
    - `--font-family-navbar-header` added, defaults to `--font-family-header`
  - Added `textSizeTitle` prop
  - Added `--navbar-icon-mobile-color` variable - defaults to `--primary-color`
  - Added `--navbar-vertical-width` variable - defaults to `auto`
  - Added `--navbar-horizontal-height` variable - defaults to `96px`
- `BBNavbarItem`
  - Fixed issue with border radius on last child of active dropdown
  - New variables!
    - `--navbar-item-text-color` - used for navbar text color, defaults to `--primary-color`
    - `--navbar-item-text-color-hover` - used for navbar text hover color, defaults to primary dark color
    - `--navbar-item-bg-color-active` - used for active navbar item background color, defaults to `--bg-dark-color`
    - `--navbar-item-bg-color-hover` - used for navbar item hover background color, defaults to `--bg-color`
- `BBText`
  - Added `font` prop
  - Fixed italics not working
- `BBCollapsible`
  - Fixed props - added base props
- `BBLink`
  - Added `hover` prop
  - Fixed issues related to some colors not working
- Updated browser list


### [1.1.9] - 2024-06-05
- `BBNavbar` new props for brand image dimensions


### [1.1.8] - 2024-06-02
- `BBNavbarItem` support for page routers with `path` detection


### [1.1.7] - 2024-06-02
- `BBButton` - `onClick` typing improvements with HTML events


### [1.1.6] - 2024-05-28
- Added `use client` directives as appropriate to support app router in NextJS


### [1.1.5] - 2024-05-08
- `BBCollapsible`
  - Using `BBButton` for collapsible button
  - Fix button styling


### [1.1.4] - 2024-05-07
- Added eslint rules for relative imports
  - This will help prevent issues with imports in the future
- `BBButton`
  - New colors! `inverse-danger`, `inverse-success`, `inverse-warning`
  - Fix disabled state for link buttons

  
### [1.1.3] - 2024-04-22
- `BBButton` removed `min-height` for styling


### [1.1.2] - 2024-04-22
- Relative imports fix AGAIN


### [1.1.1] - 2024-04-21
- Import fixes
- `BBButton` - icon and text alignment fix
- `BBCard` - `noBorder` prop fix


### [1.1.0] - 2024-04-21
- `BBCollapsibleCard`
  - **New component!**
  - Allows for collapsible cards!
- `BBButton`
  - New colors!
    - `accent`/`inverse-accent`/`transparent-accent`
    - `black`/`white`
  - Added `colorText` prop to change text color manually
  - Added `href` prop to make button a link
    - Allows for right-clicking and opening in new tab
  - `SCSS` clean up
  - `hover` and `focus` state clean up and color improvements
  - `textHelperOnHover` prop to show helper text on hover
  - Added `xs` and `xl` sizes
  - Removed old `showTextOnHover` prop
- `BBCard`
  - New colors!
    - `accent` for background and border
    - `transparent` for background
  - `noPadding` prop added to `header`, `body`, and `footer`
    - Padding in general tweaked a bit
  - Added `href` property to make card a link
    - Allows for right-clicking and opening in new tab
    - `hrefColor` prop to change the color of the link
  - `onClick` interception fixes for different parts of the card
- `BBText`
  - New colors!
    - `accent` color
    - `_light` and `_dark` variations for some colors
  - Fixed mobile styling sizes
  - Removed `cardStyle` prop
- `BBNavbar`
  - New props! `colorTitle`, `className`
    - Removed `--navbar-title-color` variable
  - `title` now optional
- `BBNavbarItem`
  - Cleaned up styling and hover states for desktop and mobile
- `BBModal`
  - Width options added - `narrow`, `normal`, `full`
  - Mobile styling improvements
- `Form Field` improvements:
  - `BBFieldCheckbox`
    - Checkbox color support - primary, secondary and accent
  - `BBFieldSelectCard`
    - Remove `optionWidth` prop
    - Sizing improved
  - Added `helperText` to Form Fields
    - `helperTextColor` added as well
- Support for `accent` color


### [1.0.3] - 2024-03-02
- Added `BBFieldSelectCard` component


### [1.0.2] - 2024-02-04
- `BBFieldText` value/default fix


### [1.0.1] - 2024-01-27
- `BBFieldCheckbox` fix states and form styling


### [1.0.0] - 2024-01-12
#### Features
- Added form styling to BB Form components!
  - No more defining form styles as globals!!!
  - Added options for sizing
- Added options for `BBNavbar` and `BBNavbarItem` padding and margins
- `BBCard` - new background color options and border option added
  - Also just cleaned up color organization and theming support
  - Added `elevation` variables to customize elevation levels
- `BBLoadingSpinner` - improved a bit and added some variants
  - Added `size` prop as well
#### Bugs
- Cleaned up primary and secondary color variables
  - Cleaned up usages of all color variables
  - `text-primary` variable renamed `text-color-primary`
  - Lots of other refactoring and clean up of colors and color variables
- Updated other NPM package requirements
- Removed `next-theme` package
- `BBButton` bugs
  - Disabled state improved
  - Added `transparent` prop for background color
  - Secondary and inverse color variant fixes
  - Focus and hover states improved
  - Hover state cursors improved
- `InputWrapper` rerendering bugs fixed
- `BBAlert` 'hierarchy' bug fixed
- `BBNavbar` and `BBNavbarItem` hover bugs
- Browser list update
- Updated packages and requirements
- Fixed `AlertsFieldErrors` bug related to `ref`


### [0.3.4] - 2023-11-24
- `BBFieldSelectMultiple` - fixes
  - Default value fix
  - Error rendering fixes with `ref`

  
### [0.3.3] - 2023-11-02
- Import fixes


### [0.3.2] - 2023-11-02
- Import fixes


### [0.3.1] - 2023-11-02
- `BBAlert` - pointer on hover


### [0.3.0] - 2023-11-01
#### Features
- Demo Page!!!
  - Added demo page to show all components
  - Allows for editing of props to test
  - Works with 'nested' component props
- SCSS variable defaults
  - Added default values to all SCSS variables
  - Base Blocks now works way better out of the box
#### Fixes
- All component props now exported
- Improved and added `README`s
- `BBAlert` - added `onClick` functionality/prop
- `BBCard` components added `onClick` functionality/prop
- `BBButton` vertical alignment for text fixed
- `BBNavbar` new color variables for background and title text
  - `BBNavbarItem` styling fixes too
- `BBText` size variables
  - Added variables and mobile variables
- Made variable names more consistent
  - NOTE: this could be breaking! Sorry!
- Fixed lots of overlapping click issues


### [0.2.0] - 2023-09-23
- Base props added for components and form components
    - Some breaking changes :/ i.e., `fieldLabel` is now `label` for all components
- `InputWrapper` component for `BBFormComponents`
- Added `BBFieldNumber` component
- `BBModal` improvements
    - `confirmCancel` functionality
    - Outside click functionality
    - Loading state
    - Lots of customization
    - Prop clean up
- Package imports and aliases improved
- `BBLoadingSpinner` component added
- Font cleanup and standardization
    - Added `font-family-header` option
    - Better default fonts and shit
- `BBCard` fixes and updates
    - transparent style fixed
    - `noBorder` prop
- `BBButton` features and fixes
    - More color variants and options
- `showLabel` prop for form inputs and many more new options!


### [0.1.5] - 2023-08-30
- BBCard border-radius fix


### [0.1.4] - 2023-08-21
- Border radius SCSS variable support
- BBCard styling and fixes
- Text sizing improvements
- Added `.bablerc` for SWC issues
- Custom font variable support


### [0.1.3] - 2023.08-20
- Get twenty base blocks updates
- Card style options
- Fixed dependencies a bit
  - NPM audit fix as well

  
### [0.1.1] - 2023-05-22
- BBNavbar prop updates


### [0.1.0] - 2023-05-22
- Initial release!
- Base Blocks components system
- Documentation updates
- Basic CI/CD setup
  - Workflow badges in `README.md`
  - Added `lint` and `build`` workflows
- Basic linting setup
- Added Prettier for code formatting

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
