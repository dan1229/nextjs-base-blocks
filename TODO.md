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


---


##### Storybook integration
- replace demo pages with proper storybook
- better component documentation
- interactive prop controls
- design system documentation


##### Animation system
- consistent motion design language
- enter/exit animations for all components
- spring-based animations investigation
- reduced motion preference support

##### Advanced accessibility
- comprehensive aria-label automation
- keyboard navigation improvements
- screen reader testing and optimization
- color contrast validation tools

##### Internationalization (i18n)
- RTL language support
- text direction handling in components
- locale-aware formatting (dates, numbers)

##### Performance optimizations
- virtual scrolling for large lists/tables
- lazy loading patterns
- memoization strategies
- bundle size monitoring

---

### Cypress

#### Visual regression testing
- automated screenshot comparison
- cross-browser testing setup
- responsive design validation

#### Performance testing
- rendering benchmarks
- memory usage monitoring
- bundle size tracking over time


### Cypress enhancements
- [ ] Visual regression testing with screenshot comparison
- [ ] Performance benchmarking for component rendering


#### add tests for demo components
- demo components are currently excluded from coverage
- not high priority since they're just for demo purposes
- if they break it's not critical to the library functionality
- is that redundant? whats coverage at?


---
### New Components

#### BBDatePicker / BBTimePicker
- integrate with react-hook-form
- customizable date formats
- range selection support
- timezone support considerations


#### BBTabs
- accessible tab interface
- lazy loading of tab content
- vertical/horizontal orientations


#### BBTable component
- data table with sorting, filtering, pagination
- responsive mobile view (cards on small screens)
- customizable column definitions
- built-in loading states
- support for row selection/actions
- integrate with existing theming system


#### BBLayout components
- BBGrid - css grid wrapper with responsive breakpoints
- BBStack - vertical/horizontal spacing component
- BBContainer - max-width wrapper with responsive padding
- BBSpacer - flexible spacing component


#### BBDrawer / BBSidebar
- slide-out panel component
- overlay or push content modes
- responsive behavior

#### BBSkeleton
- loading skeleton placeholders
- auto-generate from existing components
- customizable shapes and animations


---
### 2.3.0



#### improve actual defaults in each component
- try on an app with no global variables set and try to make it look good
  - should defaults rely on other vars?
    - should / could the defaults in general be better? theyre awful right now
-
- update defaults in readme as well to be more reasonable / stylish
  - they should be okay
-
- add some 'variables/styles' or something so we can set them normally for the project itself
  - then we can get rid of readme docs
  - globals.scss? would that work with minimal config / non conflicting with downstream projects?
-
- ideally people dont need to set most of these honestly it should look good out of the box
  - more broadly what's the deal with these scss variables?
    - there's a lot which is fine
    - need to mark which are 'required'
      - are any other than the 'big colors'?


#### standardize how we do the class name assigns
- i.e., some places there are swtich functions
- some are more manual `textAlign{textAlignment.strip}
  - bbcard, bbbutton also great examples
- a mess and a half
  - standardize this / the class names somehow
    - could cut down code a ton
  - maybe some utility component?






#### bb form demo components get functional
- OR switch to storybook - see if that's easier at this point
-
- fix the broken ones
  - TODO
- add any missing ones
  - form components might be missing?
  - TODO
- generally improve
  - make sure that all props are used
    - find a way to auto detect these so we dont need to manually add


#### cypress tests - fill in rest of tests
- get coverage higher!
- components left
  - button? collapsible, divider, link, loading spinner, modal, navbar, navbar item, tooltip
    - double check these / all existing tests
  - form components
    - dont exist yet
-
- update docs again - theyre quite long











#### consolidate bb field select and bb field select multiple
- is this a good move?


#### bbnavbar - mobile styling and sticky option
- vertical mobile styling
  - emulate styling from flutter navbars a bit
    - i.e., always slide out kinda thing
  - even if a million navbar items make the mobile menu scrollable
    - overflow-y?
-
- add back 'sticky' prop
  - is it working?



---
### 2.2.0




  
test on g20 to finalize
- validate breakpoints work
- validate use outside click works



### [2.2.0] - 2025-08-30
- Added support for media sizing variables
  - `--media-screen-width-xs/xxl` variables added
  - Media queries updated to use these variables
- `BBNavbar`
  - vertical styling improvements
  - `navbar-item-min-width` removed
  - `textAlignment` prop added to allow aligning text
  - `verticalAlignment` prop added to allow for aligning items within a vertical nav
- `BBNavbarItem`
  - Fixed width / alignment issues
- `BBCard`
  - Fixed issue with nested `BBCard` components that have differing `colorBackground`s
  - Many more options for `colorBackground` as well!
  - Removed auto darkening of header / footer
- Cypress tests for hooks
- `BBForm` components fix related to breaking up multi word labels

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2025 © Daniel Nazarian.
