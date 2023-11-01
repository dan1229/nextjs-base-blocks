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


#### demo page - rehydration error
- idk fix it

---


#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out

#### form css
- cant use globals
- maybe just make scss shared module for form components?
  - in forms dir
  - will likely have to rewrite a lot of the form scss


#### remove next theme?
- do we need the next-theme package?



----
### 0.3.0




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
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2023 © Daniel Nazarian.
