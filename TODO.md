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



#### variables - add support for color
- i.e.,
  - `--color-background-navbar` or something


#### variables - bbcard options
- add option to remove border?
- how to do 'bool' values in scss


#### variables - bbfield text
- add autocomplete as optional prop?
  - default to field name?
- add id as optional prop
  - default to field name?



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


#### fonts
- fonts - what's the main fonts? is this the right one?
- we currently have `--font-family-main` maybe we need a `--font-family-headers` or something?
    - current main is Montserrat
- default fonts should be better too
    - remove 'Josefin Sans' from base blocks - not a default


----

#### bbmodal - close/cancel
- add support for outside clicks
  - should close automatically
  - add prop for close confirmation in such a case
- add cancel buttons?
- add to base blocks
- **add to bootstrapper*


#### bbfield number
- create number component
    - replace in building form
    - replace in currency component
    

#### BBFieldCustom?
- add for custom fields like primary phone?
- use some shared label component?


### [0.2.0] - 2023-MM-DD
- Base props added for components and form components
    - Some breaking changes :/ i.e., `fieldLabel` is now `label` for all components
- `InputWrapper` component for `BBFormComponents`
#### TODO


-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2023 © Daniel Nazarian.
