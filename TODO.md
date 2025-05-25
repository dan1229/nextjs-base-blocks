# TODO for NextJS Base Blocks
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹

-------------------------------------------------------
## [Unreleased]
------
### TODO

----
#### demo page improvements


##### demo page - `children` props
- what to do about them?
- React.ReactNode ones render weird
- most are useless anyway


##### how to display all props automatically?
- currently they're hardcoded


##### demo page - bbcard 'composite' components
- what to do with header, body and footer?
-
- similar issue with collapsible component
  - even bigger here since collapsible content has specific options
-
- how to handle passing props to children?
  - i.e., 'noPadding' to header/body/footer


##### demo pages - navbar component
- fix links
- add image src
- bbnavbar item - improve component and add children
  - i.e., multiple bbnavbar items


##### demo page - do boolean fields work at all?
- test and if not fix
- some dont
  - bb text - italics field
  - bb card - noborder field


##### demo page - bbmodal demo doesn't work great
- need way to hide modal
- onCancel and onConfirm need to update showComponent state in DemoComponent



##### demo page - show options for props
- props that have options or types should show them
- i.e., bbtext size - show the size 'choices'


##### demo page - rehydration error
- idk fix it


#### demo page - add docs
- add docs / tips for each component
- quick descpription
- specific tips
  - loading spinner - suggest creating a 'wrapper' loader for other loading components
    - or to set a 'default' loading style
  - variables for each component
    - i.e., bbcard has elevation and border thickness





#### bb form demo components
- fix the broken one
- add any missing ones
- generally improve



----
### 1.6.0


#### DEMO PAGE IMPROVEMENTS!!! MAKE IT GREAT!!!
- see above



---


#### Cypress Testing


TODO - write specific test cases to write
- e.g., for each base blocks component


##### cypress tests
- add cypress component testing



##### code cov
- hook up code cov and coverage



#### cypress testing
- install
  - write basic components tests
  - should / could these use the demo page?
    - are those just separate tests?
- coverage
  - add codecov
-
- add TODOs for future tests



#### add bbtooltip to other components
- button
- fields
  - all?




#### "default" theme colors
- update defaults in readme




---
### 1.5.0


#### convert to app router
- yup




#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out





#### field specific errors
- i.e., highlight particular fields if there is an issue with it








#### bbnavbar 
- vertical mobile styling
  - emulate styling from flutter navbars a bit
    - i.e., always slide out kinda thing
-
- add divider between brand and items
  - horizontal and vertical
  - any props for this?
    - thickness
    - color
    - padding?
    - classname?
-
- add back 'sticky' prop
  - is it working?


#### bbnavbar item
- width?
  - set min width somehow?
-
- bbnavbar item - allow these to just be components?
  - i.e., let me pass a button to a navbar as a child component?










#### bbform fields - sizes
- add size options
  - small, normal, large
  - does this work with most?
    - doesnt work well with checkbox
-
- can i add this to the base component/props?
  - already is...?


#### improve actual defaults in each component
- try on an app with no global vars and try to make it look good / sensical






#### bb form fields - helper text
- can this be handled by BBToolTip?
  - add option to do via tooltip




### [1.5.0] - 2025-05-DD
- Added SCSS vars for font of form field labels
  - `form-input-font-family`
  - `form-label-font-family`
- Auto release CD configs
                                            
-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.