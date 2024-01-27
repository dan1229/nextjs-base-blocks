# CHANGELOG for TypeScript API Services
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹
##### Contact me at <dnaz@danielnazarian.com>

-------------------------------------------------------

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


-------------------------------------------------------

## [Released]

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
