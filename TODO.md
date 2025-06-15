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
### 1.7.0



#### DEMO PAGE IMPROVEMENTS!!! MAKE IT GREAT!!!
- see above
- overall get it working a bit better though


----
### 1.6.0



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



#### bb tooltip style improvements
- looks meh



#### bbnavbar item
- width?
  - set min width somehow?
-
- bbnavbar item - allow these to just be components?
  - i.e., let me pass a button to a navbar as a child component?





#### bbnavbar 
- vertical mobile styling
  - emulate styling from flutter navbars a bit
    - i.e., always slide out kinda thing
-
- add back 'sticky' prop
  - is it working?







#### improve actual defaults in each component
- try on an app with no global variables set and try to make it look good
-
- update defaults in readme as well



#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out



#### convert to app router
- yup





raise z index of modal container
- it's only 5 lol


### [1.6.0] - 2025-MM-DD
- TODO
                                            
-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2025 © Daniel Nazarian.