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


---
## Coming soon!?
#### add tests for demo page(s)?
- is that redundant? whats coverage at?


#### add support for coverage for cypress tests
- coverage
  - add codecov


#### test for hooks
- add cypress tests for hooks like use outside click



----
### 2.1.0



#### DEMO PAGE IMPROVEMENTS!!! MAKE IT GREAT!!!
- see above
- overall get it working a bit better though







#### improve actual defaults in each component
- try on an app with no global variables set and try to make it look good
-
- update defaults in readme as well


----
### 2.0.0




#### cypress testing
- install
  - write basic components tests for every single components
-
- write basic tests for each component
- TODOs to flesh out?




#### add bbtooltip to other components
- button
- fields
  - all?



#### bb tooltip style improvements
- looks meh


#### bbmodal
- just doesnt look great
- header color is a bit similar?

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



#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out



### [2.0.0] - 2025-06-DD
- Converted demo app to use the app router!
- Upgraded to Next.js 15 and React 19.
  - LOTS of package updates
- `BBLoadingSpinner`
  - Added `color` prop to allow for custom colors.
- `BBModal`
  - `z-index` increased and set as a variable: `--modal-z-index`.
- `BBFieldFile`
  - Improved styling for light mode.
                                            
-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2025 © Daniel Nazarian.