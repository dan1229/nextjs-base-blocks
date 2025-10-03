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

#### Performance testing
- rendering benchmarks
- memory usage monitoring
- bundle size tracking over time
-
- likely not necessary but maybe worth trying


#### add tests for demo components
- demo components are currently excluded from coverage
  - thats probably fine honestly
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


#### BBSkeleton
- loading skeleton placeholders
- auto-generate from existing components
- customizable shapes and animations






#### BBDrawer / BBSidebar
- slide-out panel component
- overlay or push content modes
- responsive behavior


---
### Soon?



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


---
### 2.4.0


#### BBLayout components
- BBGrid - css grid wrapper with responsive breakpoints
- BBStack - vertical/horizontal spacing component
- BBContainer - max-width wrapper with responsive padding
- BBSpacer - flexible spacing component



### Cypress enhancements
- [ ] Visual regression testing with screenshot comparison
  - automated screenshot comparison
  - cross-browser testing setup
  - responsive design validation
- [ ] Performance benchmarking for component rendering


##### Animation system
- consistent motion design language
- enter/exit animations for all components
- spring-based animations investigation
- reduced motion preference support
-
- at the very very least, add some super simple animations
  - i.e., translate on hover, fade in, etc.
  - stuff that's unopinionated if it can't be turned off


---
### 2.4.0



#### cypress tests - fill in rest of tests
- get coverage higher!
- components left
  - button? collapsible, divider, link, loading spinner, modal, navbar, navbar item, tooltip
    - double check these / all existing tests
  - form components
    - dont exist yet
-
- update docs again - theyre quite long









#### bb form demo components get fully functional
- OR switch to storybook - see if that's easier at this point idk
  - the demo components have lots of issues tbh
-
- fix the broken ones
  - TODO
- add any missing ones
  - form components might be missing?
  - TODO
- generally improve
  - make sure that all props are used
    - find a way to auto detect these so we dont need to manually add


#### flutter esque pullout navbars
- vertical mobile styling
  - emulate styling from flutter navbars a bit
    - i.e., always slide out kinda thing
  - even if a million navbar items make the mobile menu scrollable
    - overflow-y?







#### BBTabs
- accessible tab interface
- lazy loading of tab content
- vertical/horizontal orientations




#### navbar (horizontal) sticky prop
- add back 'sticky' prop
  - is it working?

#### consolidate bb field select and bb field select multiple
- e.g., could just add a `multiple` prop to the select field
- is this a good move?
- is it easily do-able


---
### 2.3.0







#### BBTable component
- data table with sorting, filtering, pagination
  - look at twineline
  - similar to react table
- responsive mobile view (cards on small screens)
- customizable column definitions
- built-in loading states
- support for row selection/actions
- integrate with existing theming system
-
- add demo component
- add any necesssary docs?



whats props do we actually want?




### [2.3.0] - 2025-10-DD
- **New!** - `BBTable`
  - Table component with all the bells and whistles you'd expect
  - Cypress tests for table
- `BBCard`
  - Removed unused `--card-darken-default-color` CSS variable and updated default header/footer backgrounds to be transparent
  - BREAKING CHANGE: BBCard `elevation` prop standardized from `'med'` to `'medium'` for consistency with other components
- `BBLoadingSpinner`
  - Added CSS custom variables for setting global defaults: `--bb-loading-default-variant`, `--bb-loading-default-size`, `--bb-loading-default-color`
  - Allows users to avoid creating wrapper components for different default configurations
- `BBNavbar`
  - Improved vertical navbar width handling: Now automatically adjusts to fit wide action buttons
  - Added responsive width support: Vertical navbar now adapts to different screen sizes
    - `--navbar-vertical-width`: Default width (8rem)
    - `--navbar-vertical-width-xs/sm/md/lg/xl`: Responsive widths for each breakpoint
  - Improved active state highlighting: Fixed CSS specificity issues that prevented proper active state styling
- Standardized SCSS class selection
  - i.e., SCSS switch statements were all over the place, inconsistent and fragile
  - Major refactoring

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2025 © Daniel Nazarian.
