# TODO for TypeScript API Services
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹

-------------------------------------------------------
## [Unreleased]
------

### TODO

#### code cov
- hook up code cov and coverage


#### cypress tests
- add cypress component testing


#### more color variables?
- which ones?


----
### demo page improvements


#### demo page - children props
- what to do about them?
- React.ReactNode ones render weird
- most are useless anyway

#### demo page - form components
- just add them
- probably in a different page


#### demo page - bbcard 'composite' components
- what to do with header, body and footer?


#### demo page - bbmodal demo doesnt work great
- need way to hide modal
- onCancel and onConfirm need to update showComponent state in DemoComponent


#### demo page - add bbnavbar dropdown
- i.e., multiple bbnavbar items


#### demo page - do boolean fields work
- test and if not fix


#### demo page - show options for props
- props that have options or types should show them
- i.e., bbtext size - show the size 'choices'


----
### 0.4.0


#### form css
- how to apply global css to a git submodule?
  - just add a styles/global.scss file and import it in the main app?
  - may have to start directly styling the components in the submodule
    - i.e., `BBFormComponents`
  - if global works, add the `*` css rules as well
-
- maybe just make scss shared module for form components if that doesnt work?
  - in forms dir


----
### 0.3.0


#### bbalert - bugs
- on click intercepting dismissible
  - other places could use this too if we get an answer
- dismissible kinda works?
- dismissible doesnt work in demo


#### bbtext - size variables
- text variables - text size
  - add scss vars to edit text size
      - i.e., `--text-size-s` or something corresponding to the types
  - NOTE: this must be after defaults are figured out

#### bbnavbar - color variables
- navbar variables - add support for color
  - i.e.,
    - `--color-background-navbar` or something
      - maybe variants for navbar?
    - add something for text colors as well
  - navbar items min width - 'dashboard' looks weird
    - remove 'min_width: 10%'


#### bb field dropdown styling
- add arrow or something
    - add to global styling


#### bbbutton - vertical alignment
- text and icons dont look always vertically aligned
- particularly when icons are larger than text


#### bbcard
- add onclick and other props to header/body/footer




### [0.3.0] - 2023-10-DD
#### Features
- Demo Page!!!
  - Added demo page to show all components
  - Allows for editing of props to test
  - Works with 'nested' component props
- `BBAlert` - added `onClick` functionality/prop
- SCSS variable defaults
  - Added default values to all SCSS variables
  - Base Blocks now works way better out of the box
#### Fixes
- All component props now exported
- Improved and added `README`s
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2023 © Daniel Nazarian.
