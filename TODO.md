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
### 1.2.0




#### bbform fields - sizes
- add size options
  - small, normal, large
- can i add this to the base component/props?


#### bbform fields - helper text
- add helper text
  - color options
- can i add this to the base component/props?
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




#### vertical navbar
- play with it
- add to base blocks?



#### bbcard - footer and header styling
- find a way to offer customization for these?
  - same as body?
- `sameColor` prop or something?
  - could allow them to pass colors directly? same as body?



#### bbbutton
- colors
  - inverse danger/success/warning?

----
### 1.1.0


#### demo page - form components
- just add them
- probably in a different page
- make sections expandable



#### bbdivider?
- hr
- props
  - color
  - size?
  - border?




#### bbmodal
- background scrolling
  - still not great
  - need to somehow add 'overflow-y: hidden' to 'body'/'html' when modal is open
-
- width prop?
  - 'narrow', 'normal', 'full'?



#### bbfield checkbox
- add size variables/scss variables
- add border-radius scss variables




#### bb collapsible
- use bbcard
- collapsible component similar to card at least
- BBSectionCollapsible
  - BBSectionCollapsibleHeader
  - BBSectionCollapsibleBody



#### bbcard
- color options
  - accent color option
    - border and background?
-
- add 'noPadding' prop
  - to header, body, footer
  - make the padding smaller in general?
-
- 'cardStyle'
  - remove?
  - only uses 'transparent' - this can just be a background option...?



#### bbnavbar
- add title color as prop/option?
- add className prop
- add 'sticky' prop
-
- customizable logo size
- customizable logo image padding
- make title optional



#### bbnavbar item
-  mobile styling hover mode - try to get border-radius not curved on 'middle' items
-
- bugs
  - hover not really workings?
    - what does this mean? can't reproduce



#### bbtext
- color options
  - add accent color
  - add '-light' options?
-
- add 'font' prop
-
- mobile styling could be improved
  - more media queries
  - more appropriate sizes

  


#### bbbutton
- fixes
  - better mobile styling
    - particularly big sizes
  - does hover work in mobile?
    - is it supposed to...?
  - maybe more sizes in general
    - xs and xl?
  




- 'link' functionality



### [1.1.0] - 2024-04-DD
- `BBButton`
  - New colors!
    - `accent`/`inverse-accent`/`transparent-accent`
    - `black`/`white`
  - Added `colorText` prop to change text color manually
  - Added `href` prop to make button a link
    - Allows for right-clicking and opening in new tab
- `BBFieldSelectCard`
  - remove `optionWidth` prop
- Support for `accent` color
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
