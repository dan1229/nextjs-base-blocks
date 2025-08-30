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


#### standardize how we do the class name assigns
- i.e., some places there are swtich functions
- some are more manual `textAlign{textAlignment.strip}
  - bbcard, bbbutton also great examples
- a mess and a half
  - standardize this / the class names somehow
    - could cut down code a ton
  - maybe some utility component?


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
- components left
  - button? collapsible, divider, link, loading spinner, modal, navbar, navbar item, tooltip
    - double check these / all existing tests
  - form components
    - dont exist yet













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


#### test for hooks
- add cypress tests for hooks like use outside click




#### add support for media sizing vars
- in projects i use:
```
  --media-screen-width-xs: 480px; // Extra small devices (phones)
  --media-screen-width-sm: 576px; // Small devices (large phones)
  --media-screen-width-md: 768px; // Medium devices (tablets)
  --media-screen-width-lg: 992px; // Large devices (small desktops)
  --media-screen-width-xl: 1200px; // Extra large devices (desktops)
  --media-screen-width-xxl: 1400px; // Extra extra large devices (large desktops)
```
- use throughout app and add docs
  - update readme
  - update media usages throughout app




  

#### some field labels are not created properly
- for example 'fieldName="location_preference_names"' sets as 'Location preference_names' which is incorrect
  - Should be "Location Preference Names"
  - this is a bb select multiple if that matters



make sure cypress/readme is up to date










**DOUBLE CHECK THE FOLLOWING**
- make sure they work
- big review
  - claude and copilot
  - myself too
- add tests?
  - is there anything novel here worth testing?



### [2.2.0] - 2025-MM-DD
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

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2025 © Daniel Nazarian.
