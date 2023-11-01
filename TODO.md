# TODO for NextJS Base Blocks
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



#### demo page - add bbnavbar dropdown
- i.e., multiple bbnavbar items


#### demo page - do boolean fields work
- test and if not fix
- some dont
  - bb text - italics field



----
### 0.4.0

#### demo page - bbmodal demo doesnt work great
- need way to hide modal
- onCancel and onConfirm need to update showComponent state in DemoComponent


#### demo page - show options for props
- props that have options or types should show them
- i.e., bbtext size - show the size 'choices'

---

#### form css
- how to apply global css to a git submodule?
  - just add a styles/global.scss file and import it in the main app?
  - may have to start directly styling the components in the submodule
    - i.e., `BBFormComponents`
  - if global works, add the `*` css rules as well
-
- maybe just make scss shared module for form components if that doesnt work?
  - in forms dir


#### bb field dropdown styling
- add arrow or something
    - add to global styling

----
### 0.3.0


#### bbalert - bugs
- on click intercepting dismissible
  - other places could use this too if we get an answer
- dismissible kinda works?
- dismissible doesnt work in demo




### [0.3.0] - 2023-10-DD
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
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2023 © Daniel Nazarian.
