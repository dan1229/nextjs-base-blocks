# TODO for TypeScript API Services
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹

-------------------------------------------------------
## [Unreleased]
------

### TODO

#### code cov
- hook up code cov and coverage


#### cypress tests
- add cypress component testing


#### fonts
- add good defaults, currently mostly relies on input

----
### 0.3.0


#### more color variables?


#### navbar variables - add support for color
- i.e.,
  - `--color-background-navbar` or something




----


#### bb field dropdown styling
- add arrow or something
    - add to global styling


#### variables - text size?
- add scss vars to edit text size?


#### form css
- how to apply global css to a git submodule?
  - just add a styles/global.scss file and import it in the main app
- add the `*` css rule from get twenty or something as well


#### scss variable defaults
- html variables
  - how to get a default value for those calls to make them all optional?
- can do this:
```
var(--variable, default-value));
```
- play with how we can define `default-value`


----
### 0.2.0


#### bbbutton updates
- colors
  - inverse primary
  - inverse secondary
  - inverse info text color not working
- double icon?
- what other props?


#### bbcard styling
- transparent not working?
  - see "see more meetings" card on decision maker dashboard
- add option to remove border?
    - how to do 'bool' values in scss


#### fonts
- fonts - what's the main fonts? is this the right one?
- we currently have `--font-family-main` maybe we need a `--font-family-headers` or something?
    - current main is Montserrat
- default fonts should be better too
    - remove 'Josefin Sans' from base blocks - not a default



### [0.2.0] - 2023-MM-DD
- Base props added for components and form components
    - Some breaking changes :/ i.e., `fieldLabel` is now `label` for all components
- `InputWrapper` component for `BBFormComponents`
- Added `BBFieldNumber` component
- `BBModal` improvements
    - `confirmCancel` functionality
    - Outside click functionality
    - Loading state
    - Lots of customization
    - Prop clean up
- Package imports and aliases improved
- `BBLoadingSpinner` component added
#### TODO


-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2023 © Daniel Nazarian.
