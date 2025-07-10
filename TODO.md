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

### AI Suggestions
- need to sort through these


##### CSS-in-JS investigation
- research styled-components or emotion integration
- better runtime theming support
- improved tree-shaking
- dynamic theme switching

##### Tailwind CSS integration
- hybrid approach: tailwind utilities + bb components
- allow className passthrough for tailwind classes
- maybe BBButton variant="primary" className="hover:scale-105"
- investigate tailwind plugin for bb design tokens

##### Design tokens system
- structured approach to design variables
- json/js export of tokens for other tools
- better organization of color palettes, spacing scales, etc.
- figma/design tool integration considerations

##### Enhanced dark mode
- smoother transitions between themes
- system preference detection
- per-component theme overrides
- better contrast ratios and accessibility

#### Developer Experience

##### Storybook integration
- replace demo pages with proper storybook
- better component documentation
- interactive prop controls
- design system documentation

##### CLI tool for component generation
- scaffold new components with proper structure
- auto-generate tests, stories, and types
- consistency across new components

##### Better TypeScript support
- stricter prop validation
- better autocomplete for variant/size props
- generic component patterns

##### Bundle optimization
- per-component builds for better tree-shaking
- css extraction and purging
- runtime performance monitoring

#### Advanced Features

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
### Coming soon!!



#### test for hooks
- add cypress tests for hooks like use outside click



#### aria labels
- for accessibility support


---
### 2.2.0


#### consolidate bb field select and bb field select multiple
- ya

----
### 2.1.0



#### DEMO PAGE IMPROVEMENTS!!! MAKE IT GREAT!!!
- see above
- overall get it working a bit better though



#### convert demo pages to app router
- probably lots of package and lint updates



#### cypress tests - fill in rest of tests
- components left
  - button? collapsible, divider, link, loading spinner, modal, navbar, navbar item, tooltip
    - double check these / all existing tests
  - form components
    - dont exist yet


---


#### work on defaults / variables system
- should defaults rely on other vars?
  - should / could the defaults in general be better? theyre awful right now
-
- more broadly what's the deal with these scss variables?
  - there's a lot which is fine
  - need to mark which are 'required'
    - are any other than the 'big colors'?

    

#### improve actual defaults in each component
- try on an app with no global variables set and try to make it look good
-
- update defaults in readme as well to be more reasonable / stylish
  - they should be okay







#### bbnavbar 
- vertical mobile styling
  - emulate styling from flutter navbars a bit
    - i.e., always slide out kinda thing
-
- add back 'sticky' prop
  - is it working?


NEED TO TEST
- navbar item - children as title



#### form components - indicate when required
- if passing required - either through the prop or `reigster` - add visual indicator
  - a "*" is classic
  - make the color of the asterisk an scss variable?



### [2.1.0] - 2025-MM-DD
- Breaking Change!
  - `BBFieldDropdown` -> `BBFieldSelect`
- `BBNavbarItem`
  - `title` now accepts components and `string`s
  - Better text wrapping (or lack thereof)


-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2025 © Daniel Nazarian.
