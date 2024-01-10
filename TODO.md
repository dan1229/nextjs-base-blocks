# TODO for NextJS Base Blocks
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹

-------------------------------------------------------
## [Unreleased]
------

### TODO

#### code cov
- hook up code cov and coverage


#### cypress tests
- add cypress component testing


#### more color variables?
- which ones?


----
### demo page improvements


#### demo page - `children` props
- what to do about them?
- React.ReactNode ones render weird
- most are useless anyway


#### how to display all props automatically?
- currently they're hardcoded


#### demo page - bbcard 'composite' components
- what to do with header, body and footer?


#### demo pages - navbar component
- fix links
- add image src
- bbnavbar item - improve component and add children
  - i.e., multiple bbnavbar items


#### demo page - do boolean fields work at all?
- test and if not fix
- some dont
  - bb text - italics field
  - bb card - noborder field


#### demo page - bbmodal demo doesn't work great
- need way to hide modal
- onCancel and onConfirm need to update showComponent state in DemoComponent



#### demo page - show options for props
- props that have options or types should show them
- i.e., bbtext size - show the size 'choices'


#### demo page - rehydration error
- idk fix it



----
### 1.1.0


#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out


#### demo page - form components
- just add them
- probably in a different page
- make sections expandable


#### bbcard - footer and header styling
- find a way to offer customization for these?
- `sameColor` prop or something?
- could allow them to pass colors directly?



#### bbnavbar item - bugs
- hover not really workings?
  - what does this mean? can't reproduce



----
### 1.0.0


#### TEST BEFORE RELEASE
- TODO - which project to test on?



----

#### tertiary color
- add support for it?
  - could default to the secondary color if required
- add to docs
-
- add as color option for:
  - button
  - bbcard background?
  - link?
  - anywhere we offer 'primary' adn 'secondary' as color options


#### loading spinner variants
- add more css and variants for loading spinner



---

#### bb select multiple field bug
- still not really the best solution - only says field is required not what field

```
TypeError: ref.name is undefined
Source

base_blocks/src/form_components/helpers/alerts/alerts_field_errors/index.tsx (39:32) @ AlertsFieldErrors/<.children<

  37 | const finalMessage = message
  38 |   ? message.toString()
> 39 |   : `Error - ${type} '${(ref as Ref).name.replace(/_/g, ' ').replace(/-/g, ' ')}'
```

---

#### bbalert 'heirarchy' issues
- putting bbtext or something as children will cause issues cause there's a p tag in there?
- not sure


#### form css
- convert to module.scss
  - will have to change a lot of the form scss
- maybe just make scss shared module for form components?
  - in forms dir
  - will likely have to rewrite a lot of the form scss


#### bbnavbar hover
- bbnavbar - brand doesnt have pointer on hover
  - add pointer on hover IF onClick
- bbnavbar item - no pointer on hover
  - just add a pointer cursor on hover


#### bbbutton - hover cursors not working
- if disabled -> hover state should not show pointer
  - still not working for some reason?
  - maybe cursor css not in 'hover' block?
- if onClick && hovering -> should show pointer


#### bbcard - elevation customization
- make the elevation level values variables to customize



### [1.0.0] - 2024-01-DD
#### Features
- Added options for `BBNavbar` and `BBNavbarItem` padding and margins
- `BBCard` - new background color options and border option added
  - Also just cleaned up color organization and theming support
#### Bugs
- Cleaned up primary and secondary color variables
  - Cleaned up usages of all color variables
  - `text-primary` variable renamed `text-color-primary`
  - Lots of other refactoring and clean up of colors and color variables
- Updated other NPM package requirements
- Removed `next-theme` package
- `BBButton` bugs
  - Disabled state improved
  - Added `transparent` prop for background color
  - Secondary and inverse color variant fixes
  - Focus and hover states improved
- `InputWrapper` rerendering bugs fixed
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2024 © Daniel Nazarian.
