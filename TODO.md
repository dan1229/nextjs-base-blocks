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


#### more color variables?
- which ones?


----
### 0.3.0


#### form css
- how to apply global css to a git submodule?
  - just add a styles/global.scss file and import it in the main app?
  - may have to start directly styling the components in the submodule
    - i.e., `BBFormComponents`
- maybe just make scss shared module for form components if that doesnt work?
  - in forms dir
- add the `*` css rules as well

----


#### scss variable defaults
- html variables
  - how to get a default value for those calls to make them all optional?
- can do this:
```
var(--variable, default-value));
```
- play with how we can define `default-value`

----

#### new variables
- text variables - text size
  - add scss vars to edit text size
      - i.e., `--text-size-s` or something corresponding to the types
  - NOTE: this must be after defaults are figured out
-
- navbar variables - add support for color
  - i.e.,
    - `--color-background-navbar` or something
      - maybe variants for navbar?
    - add something for text colors as well
  - navbar items min width - 'dashboard' looks weird
    - remove 'min_width: 10%'


#### bb field dropdown styling
- add arrow or something
    - add to global styling


#### bbbutton - vertical alignment
- text and icons dont look always vertically aligned
- particularly when icons are larger than text


#### bbcard
- add onclick and other props to header/body/footer



#### make page to view all components
- [ ] Make page displaying different components and capabilities
- [ ] How to change props by user input? wrap component with said props as state?



### [0.3.0] - 2023-10-DD
#### Features
- `BBAlert` - added `onClick` functionality/prop
#### Fixes
- TODO
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2023 © Daniel Nazarian.
