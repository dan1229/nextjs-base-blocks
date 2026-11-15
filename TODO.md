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
### 2.6.5 - fixes

#### several colour fallbacks name one token and carry another hue's hex
- found while centralising the palette into `src/styles/_colors.scss` for 2.6.3. Each of these
  is the second argument to a `var(--token, fallback)`, so it only shows when a consumer leaves
  that token unset - which is exactly the unthemed default this library ships
- `--danger-color` falls back to the PRIMARY cyan `#78cdd7` in `bbtext` (`.danger`) and
  `bbalert`, and `--danger-light-color` does the same in `bbalert`. An unthemed danger alert or
  a `color='danger'` BBText renders cyan
- `--accent-color` falls back to the WARNING yellow `#f1c500` in `bbtext` (`.accent`) and
  `bbquote`
- `--secondary-color` falls back to the primary cyan in `bbfield_select_card` and
  `bbfield_select_multiple`
- `--success-light-color` and `--info-light-color` in `bbalert` fall back to the BASE hue
  rather than the light variant, so an unthemed success/info alert is darker than intended
- the fix is to point every one at the matching `colors.$…` entry, which is what the four
  migrated stylesheets already do. Held out of 2.6.3 deliberately: 2.6.3 is provably
  byte-identical CSS, and these change rendered colour for any consumer not setting the token
- wants a changelog callout naming each component, since a consumer may have been compensating

#### navbar (horizontal) sticky prop
- add back 'sticky' prop
  - is it working?


#### the hamburger and the action buttons collapse at different widths
- `.hamburger` appears under `media-xl` (<=1200px) but `.containerButtonsAction` only flips
  from row to column under `media-lg` (<=992px)
- so 993-1200px renders the collapsed drawer with a full row of action buttons still beside
  it, which is the one width where the bar has the least room for them
- noticed while fixing the drawer's item colours for 2.6.2; not touched, since it is a
  layout call rather than a bug with one right answer


#### the dropdown opens on hover and nothing else
- `.dropdownContainer:hover .dropdownContent { display: flex !important }` is the only thing
  that opens a submenu. There is no click handler, no `:focus-within`, and no `aria-expanded`
- a touch device at a width above the hamburger breakpoint - a tablet in landscape - cannot
  open one at all, and neither can a keyboard. Any consumer putting real navigation in a
  dropdown loses it for those users
- a `:focus-within` branch is the cheap half and is additive. A tap-to-open needs state and
  an outside-click, which `BBNavbar` already has a hook for


#### the brand is a div with an onClick, not a link
- `.containerBrand` in `BBNavbar` is `<div onClick={() => router.push(routeBrand)}>`, so the
  logo is not keyboard reachable, does not middle-click into a new tab, and shows no href on
  hover. Every site puts its way home there
- this is why a consumer still has to carry a separate "Home" nav item. Sites keep one
  for exactly this reason
- making it a real anchor is the right fix but is not free: an `<a>` brings default link
  styling that could disturb an existing consumer's brand block, so it wants a release of its
  own rather than riding along with something else


#### `BBNavbarItem`'s secondary and grey fallbacks diverge from the rest
- its `$secondary-color` (`#f50057`) and greys also diverge from every other component's
  defaults, which is why this file was left out of the 2.6.3 palette migration
- deciding which hexes are correct is a visual change, so it does not ride along with a
  no-op refactor


#### navbar item ids can collide
- `BBNavbarItem` derives its element id from the title: `nav-item-${title.toLowerCase()}`
  - a dropdown that repeats its parent's title as the first child - a normal pattern - emits the
    same id twice, which is invalid html and makes `getElementById` / anchors pick whichever comes
    first
  - hit this for real on a downstream site with an 'About' dropdown containing 'About'
  - non string titles all collapse to the bare `nav-item`, same problem
-
- add an `id` prop so a consumer can name it, and make the DEFAULT safe rather than just
  documenting the footgun
  - fold in the href? or a `useId()` suffix? or de-dupe within the parent `BBNavbar`?
  - href derived reads better in devtools than a `useId` hash - probably worth the churn
-
- consumers may key off todays `nav-item-<title>` in tests/css, so this is breaking-ish
  - minor bump, and call it out in the changelog entry


#### the vertical navbar's item rules never match
- `BBNavbarItem`'s `.vertical &` rules (full width, left alignment, dropdown height) key on its own
  module's `.vertical` class, which nothing sets. `BBNavbar`'s `.vertical` is a different class, so a
  vertical navbar's items never get them
- found while clearing the navbar's dead rules for 2.9.0. Wiring them changes how every vertical navbar
  lays out, so it wants its own callout


#### `BBButton`'s `text` variant has no styles
- `TBBButtonVariant` offers `'text'` and no rule styles it, so it renders as a bare base button with a
  white label


#### `BBButton`'s `hover` and `focus` props do nothing
- both are accepted and documented as having no effect since 2.9.0. `focus` showing each variant's
  `:focus` look is 21 variant blocks and needs a design; `hover` could turn the hover look off


---
### 2.7.0 - new components

#### bbbadge
- new component!
  - minimal addition
- demo page?


#### BBTabs
- accessible tab interface
- lazy loading of tab content
- vertical/horizontal orientations


#### BBLayout components
- BBGrid - css grid wrapper with responsive breakpoints
- BBStack - vertical/horizontal spacing component
- BBContainer - max-width wrapper with responsive padding
- BBSpacer - flexible spacing component


---
### 2.10.0 - motion & mobile navbar

#### Animation system
- consistent motion design language
- enter/exit animations for all components
- spring-based animations investigation
- reduced motion preference support
-
- at the very very least, add some super simple animations
  - i.e., translate on hover, fade in, etc.
  - stuff that's unopinionated if it can't be turned off


#### flutter esque pullout navbars
- vertical mobile styling
  - emulate styling from flutter navbars a bit
    - i.e., always slide out kinda thing
  - even if a million navbar items make the mobile menu scrollable
    - overflow-y?


#### the hamburger's hover chip and the drawer's shadow take no tokens
- `.iconHamburger:hover` mixes 20% black into the bar colour on a fixed 1rem radius, and the drawer's
  shadow is fixed too. 2.9.0 gave the logo's hover box tokens; these two are the rest of the bar


---
### 2.11.0 - form components

#### consolidate bb field select and bb field select multiple
- e.g., could just add a `multiple` prop to the select field
- is this a good move?
- is it easily do-able


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


---
### Testing backlog

#### cypress tests - fill in rest of tests
- get coverage higher!
- components left
  - button? collapsible, divider, link, loading spinner, modal, navbar, navbar item, tooltip
    - double check these / all existing tests
  - form components
    - dont exist yet
-
- update docs again - theyre quite long


#### visual regression + performance benchmarking
- [ ] Visual regression testing with screenshot comparison
  - automated screenshot comparison
  - cross-browser testing setup
  - responsive design validation
- [ ] Performance benchmarking for component rendering


---
### 3.0.0 - breaking

#### `BBLink`'s `className` points at the wrong element
- `className` lands on the inner `BBText`, not on the `<a>` that `next/link` renders. Every
  other component in the library sends `className` to its outer element and names sub-parts
  with a `classNameX` (`classNameHelperText`, `classNameButton`, `classNameIcon`,
  `classNameWrapper`), so `BBLink` is the one inversion
- 2.6.0 added `classNameLink` so the anchor is reachable at all, which is the non-breaking
  half. Straightening the rest means `className` moves to the `<a>` and a `classNameText`
  takes over the inner text
-
- this is genuinely breaking and not just a rename. The inner `BBText` stamps its own color
  and `font-family` classes, which beat anything inherited from a parent anchor - so a
  consumer whose class currently sets a color or a font silently loses it the moment the
  class moves up. Anchor-level layout (flex, gap, borders) has the mirror problem in reverse
- one known consumer passes `className` at 17 call sites, so a migration has to land in the
  same push as the release, not after it
- the same release should decide whether `BBLink`'s default should be `asSpan`. A link is
  inline, but the default renders a `<p>` below size `large` and an `<h4>`/`<h3>` above it,
  which is why consumers keep hitting hydration failures when a link wraps anything but text


#### remove `TBBNavbarAlignment`
- deprecated in 2.9.0. Nothing has read it since `BBNavbar` lost its `menuAlignment` prop in 2.2.0


### [X.X.X] - TBD
- **Dead code is gone from `BBNavbar` and `BBNavbarItem`.** Rules and Sass variables that never applied are removed, and so is a docblock line for `menuAlignment`, a prop that left in 2.2.0. Nothing renders differently. `TBBNavbarAlignment` is marked deprecated: nothing has read it since then, and 3.0.0 removes it.
- **The horizontal navbar's padding and bottom border take tokens.** `--navbar-padding` sets the bar's padding (default `0.25rem`, as before) and `--navbar-border-bottom` draws a line under it (default `none`). A vertical navbar keeps its own padding.
- **The current page's nav item can be told apart by its label, and says so to a screen reader.** `--navbar-item-text-color-active` colours its label (default: `--navbar-item-text-color`, as before), and `--navbar-item-text-decoration-active`, `--navbar-item-text-decoration-thickness-active` and `--navbar-item-text-underline-offset-active` can underline it (default: no underline). Its link carries `aria-current="page"` on the page it points to, and `aria-current="true"` when a dropdown child or an `activePaths` entry lights it. `BBLink` takes a new `ariaCurrent` prop for this.
- **No stray `undefined` class on buttons, and no empty `target` or `rel` on links.** Every enabled `BBButton` carried a literal `undefined` class, and every internal `BBLink` rendered `target="" rel=""`. Both are gone, and a disabled button lists its disabled class once. The `hover` and `focus` props are still accepted and still change nothing.
- **The navbar logo's hover takes tokens.** `--navbar-brand-border-radius` (default `0.5rem`), `--navbar-brand-bg-color-hover` (default: the bar's colour mixed 10% toward white) and `--navbar-brand-transform-hover` (default `translateY(-1px)`). Set the last two to `transparent` and `none` for a logo that stays still.
- **The README's Sass sample uses `color.adjust` and `color.scale`.** `darken()` and `lighten()` print a deprecation warning under current Dart Sass. The sample now starts with `@use 'sass:color';`, which has to move to the top of the file you paste it into.
- **`BBButton`'s hover lift and shadow take tokens.** `--button-hover-transform` (default `translateY(-1px)`) and `--button-hover-shadow` (default `0 2px 8px rgba(0, 0, 0, 0.12)`). Set both to `none` once in your globals for buttons that stay flat.
- **A button's hover helper text stays under the button.** It used to hang off the hover lift, so on a disabled button, or with the lift turned off, it landed far from the button.
- **Link buttons follow `--button-base-padding`.** A `BBButton` with an `href` had its own fixed `0.6rem` of padding and ignored the token. It now reads the token like every other button. The default is still `0.6rem`.
- A host sees a change if it sets `--button-base-padding` to anything but `0.6rem` (every link button inside that scope now takes the token's size, a lone one included; a rule like `a.yourClass { padding: 0.6rem }` keeps the old size), or if its page has a `<base target>` (internal `BBLink`s now follow it, like any plain link). In a navbar, a hovered link inside the current section's open dropdown now shows the hover colour. A host that registers its own `Link` through `configureBaseBlocks` must pass `aria-current` on to its anchor for the nav marker to reach the page.

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2026 © Daniel Nazarian.
