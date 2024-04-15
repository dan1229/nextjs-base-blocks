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


#### default theme colors?
- update
- have to find and replace lots of defaults sadly



#### demo page - form components
- just add them
- probably in a different page
- make sections expandable
-
- make home page a real home page
  - links to:
  - `/components`
  - `/components/forms`


#### bbtext
- add 'font' prop



----
### 1.1.0



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




#### bbcard
- add 'href' prop
  - similar to bbbutton - just to allow for right click
  - if passed, auto navigate to that href on click
    - console warning if both are passed





### [1.1.0] - 2024-04-DD
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
  - *Removed old `showTextOnHover` prop*
- `BBCard`
  - New colors!
    - `accent` for background and border
    - `transparent` for background
  - `noPadding` prop added to `header`, `body`, and `footer`
    - Padding in general tweaked a bit
- `BBText`
  - New colors!
    - `accent` color
    - `_light` and `_dark` variations for some colors
  - Fixed mobile styling sizes
  - *Removed `cardStyle` prop*
- `BBFieldSelectCard`
  - remove `optionWidth` prop
- Support for `accent` color
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
