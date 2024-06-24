# TODO for NextJS Base Blocks
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹

-------------------------------------------------------
## [Unreleased]
------
### TODO
----
#### Cypress Testing


##### cypress tests
- add cypress component testing



##### code cov
- hook up code cov and coverage



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
- update collapsible similarly
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


----
### 1.3.0




#### bbform fields - sizes
- add size options
  - small, normal, large
  - does this work with most?
    - doesnt work well with checkbox
-
- can i add this to the base component/props?
  - already is...?

  

#### bbform fields - helper text
- can this be handled by BBToolTip?



#### bb form components variables
- start adding variables for colors and all that
- border color
- border thickness
  - when focussed
- border radius
- background color
- text color
   - when focussed
- placeholder color



#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out




#### tooltips
- add tooltip functionality
  - BBToolTip components?
- add to other components
  - button
  - link?
  - TODO
  - fields?
    - TODO





#### demo page - form components
- just add them
- probably in a different page
- make sections expandable
-
- make home page a real home page
  - links to:
  - `/components`
  - `/components/forms`



#### bbdivider?
- hr
- props
  - color
  - size?
  - border?


#### bb navbar
- add divider between brand and items
  - horizontal and vertical


#### default theme colors?
- update
- have to find and replace lots of defaults sadly


#### bbnavbar item
- borders?
  - make optional?  
    - copy from bbcard?
-
- width?
  - set min width somehow?



#### bbmodal scrolling
- ensure backgrounds dont scroll EVER
- ensure if tall enough, the content scrolls
-
- background scrolling
  - still not great
  - need to somehow add 'overflow-y: hidden' to 'body'/'html' when modal is open




---
### 1.2.1



#### bbloading spinner - allow defalut to be chosen by scss var
- make default spinner style determined by some css var
  - `--loading-spinner-variant`
  - add to readme
- ensure that 'variant' prop still overrides and works


#### docs and scss variables
- improve defaults for scss variables - namely mobile text sizes
  - same with dark theme stuff and comments - check get twenty



### [1.2.1] - 2024-MM-DD
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
