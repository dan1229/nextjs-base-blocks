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


#### bbnavbar - vertical mobile styling
- emulate styling from flutter navbars a bit
  - i.e., always slide out kinda thing











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










#### bb navbar
- add 'max width'
  - i.e., like how the page content is sometimes limited, navbar should be too
  - scss variable
-
- wider button action components?
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



#### bb tooltips - NEW COMPONENT
- add tooltip functionality
  - BBToolTip components?
- add to other components
  - button
  - link?
  - TODO
  - fields?
    - TODO




#### bbmodal
- background scrolling
  - ensure backgrounds dont scroll EVER



----
### 1.3.0








### [1.3.0] - 2024-10-DD
- Variable updates
  - `--grey-light-dark` renamed to `--grey-light`
  - `--grey-light` renamed to `--grey-lightest`
  - `--card-elevation-default` variable added
  - `--card-border-thickness` variable added
  - `--white-dark` variable removed
- `BBDivider`
  - Added new component!
  - Lots of props for styling
  - Added to demo page
- `BBButton`
  - Added `iconColor` prop
- `BBCard`
  - Added `default` elevation prop and SCSS variable
  - `href` cards made external links to open in new tab
  - Fix hover state for `href` cards
  - FIX: added back `className` prop
- `BBAlert`
  - Added `classNameIcon` prop
- `BBCollapsible`
  - Added `isExpandedInitial` prop
  - Added `onExpanded` and `onCollapsed` props
  - Added `arrowUp` and `arrowDown` props
  - Added `buttonVariant` prop
    - Removed `colorArrow` prop
  - Renamed `isExpanded` prop to `showButtonUp`
  - Added `buttonTransparent` prop
  - General component styling clean up
- `BBModal`
  - Improved general styling and feel
  - Added `colorBorder` prop
- `BBNavbar`
  - Removed `navbar-horizontal-height` variable
  - Weird alignment issues fixed with pop ups
  - Mobile styling alignment fixed
  - Vertical navbar styling improved
  - Vertical navbar mobile styling improved
- `BBNavbarItem`
  - `activePaths` prop added to specify active paths if they differ from the current path
  - `colorBorder` prop added along with type and styles
  - `noBorder` prop added
  - `--navbar-item-border-thickness` variable added
  - `--navbar-item-border-radius` variable added
  - `--navbar-item-border-default-color` variable added
  - Hover state border radius issue fixed
- Default theme colors updated

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
