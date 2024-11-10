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



#### demo page - form components
- just add them
- probably in a different page
- make sections expandable
-
- ensure all entries options are up to date!
-
- make home page a real home page
  - links to:
  - `/components`
  - `/components/forms`




----
#### Cypress Testing


TODO - write specific test cases to write
- e.g., for each base blocks component


##### cypress tests
- add cypress component testing



##### code cov
- hook up code cov and coverage


---
### 1.5.0

#### demo page stuff?
- see above TODOs






#### bbnavbar 
- vertical mobile styling
  - emulate styling from flutter navbars a bit
    - i.e., always slide out kinda thing






----
### 1.4.0


#### default theme colors?
- update defaults in readme
  - sync with bootstrapper








#### cypress testing
- install
  - write basic components tests
  - should / could these use the demo page?
    - are those just separate tests?
- coverage
  - add codecov
-
- add TODOs for future tests


#### bbnavbar item
- width?
  - set min width somehow?
-
- bbnavbar item - allow these to just be components?
  - i.e., let me pass a button to a navbar as a child component?




#### improve actual defaults in each component
- try on an app with no global vars and try to make it look good / sensical









#### bbform fields - sizes
- add size options
  - small, normal, large
  - does this work with most?
    - doesnt work well with checkbox
-
- can i add this to the base component/props?
  - already is...?
  

#### bb form fields - helper text
- can this be handled by BBToolTip?


#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out



#### bb form components - basic style variables
- add variables for colors and all that
  - border color
  - border thickness
    - when focussed
  - border radius
  - background color
  - text color
    - when focussed
  - placeholder color
-
- are these handled by scss variables well enough?







#### bb card
- header border radius no bueno
  - check <CardMeetingInstace.cardYourStatusForm> to see the hack
  - try to fix this
  - check footer


#### bb navbar
- add 'max width'
  - i.e., like how the page content is sometimes limited, navbar should be too
    - scss variable
  - is this just for vertical navbar?
-
- wider button action components?
  - could this just use better handling?
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
-
- add ability to right align navbar items?



#### bb tooltips - NEW COMPONENT
- add tooltip functionality
  - BBToolTip components?
- add to other components
  - button
  - link?
  - TODO
  - fields?
    - TODO


#### bbbutton
- container icon looks weird with margin sometimes?
  - look at <InputMeetingMemberStatus> in get twenty - there's a hakc for margin-bottom



#### bbmodal
- background scrolling
  - ensure backgrounds dont scroll EVER


### [1.4.0] - 2024-11-DD
- `BBNavbar`
  - Removed `--navbar-vertical-width`


-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
