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




#### bbcard
- black color default not working if not provided
-
- footer and header styling
  - find a way to offer customization for these?
    - same as body?
  - `sameColor` prop or something?
    - could allow them to pass colors directly? same as body?
-
- padding mobile styling?
  - reduce padding in mobile?
-
- using as link breaks a few things
  - no more hover
    - adding a bogus 'onclick' fixes this but this gives a console warning
-
- black border doesnt work
  - ensure other borders work



#### demo page - form components
- just add them
- probably in a different page
- make sections expandable
-
- make home page a real home page
  - links to:
  - `/components`
  - `/components/forms`


#### bbmodal scrolling
- ensure backgrounds dont scroll EVER
- ensure if tall enough, the content scrolls
-
- background scrolling
  - still not great
  - need to somehow add 'overflow-y: hidden' to 'body'/'html' when modal is open



---
### 1.2.0





#### bbdivider?
- hr
- props
  - color
  - size?
  - border?



#### bblink
- colors not working?
  - secondary color not working




#### bbbutton
- black color default not working if not provided
- inverse danger doesnt work
-
- href nesting bug:
```
Warning: validateDOMNesting(...): <div> cannot appear as a descendant of <p>.
div
div
p
BBText@webpack-internal:///./base_blocks/src/bbtext/index.tsx:20:151
a
LinkComponent@webpack-internal:///./node_modules/next/dist/client/link.js:106:254
BBLink@webpack-internal:///./base_blocks/src/bblink/index.tsx:22:164
BBButton@webpack-internal:///./base_blocks/src/bbbutton/index.tsx:26:262
div
ButtonCardDetails@webpack-internal:///./components/buttons/button_card_details/index.tsx:33:175
div
```
- happens a lot tbh
  - check button in 404 page in bootstrapper
-
- href buttons also are a bit less padded than regular buttons
  - apply to just a tags


---

#### bbnavbar item
- navbaritem color
  - variable or prop?
  - variable would be nice since it'll probably be across the board
  - variants for secondary/primary/etc
- navbar item active state bug
  - border-radius not rounded correctly on last child of dropdown
- borders?
- width?
- classname if it doesnt already


#### bbnavbar and item item new props
- navbar
  - make height/width of image props
  - uses 'quicksand' font
  - rename 'buttonsAuth' to something else
    - buttons action
    - component action
    - component buttons


#### vertical navbar
- play with it
- add to base blocks?


---

#### default theme colors?
- update
- have to find and replace lots of defaults sadly



#### bbtext
- add 'font' prop
- italics not working



#### docs and scss variables
- improve defaults for scss variables - namely mobile text sizes
  - same with dark theme stuff and comments - check get twenty


#### bbloading spinner - allow defalut to be chosen by scss var
- make default spinner style determined by some css var
  - `--loading-spinner-variant`
  - add to readme
- ensure that 'variant' prop still overrides and works


### [1.2.0] - 2024-MM-DD
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
