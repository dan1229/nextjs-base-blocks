# CHANGELOG for TypeScript API Services
#### By: [Daniel Nazarian](https://danielnazarian) 🐧👹
##### Contact me at <dnaz@danielnazarian.com>

-------------------------------------------------------

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


-------------------------------------------------------

## [Released]

### [0.1.4] - 2023-08-21
- Border radius SCSS variable support
- BBCard styling and fixes


### [0.1.3] - 2023.08-20
- Get twenty base blocks updates
- Card style options
- Fixed dependencies a bit
  - NPM audit fix as well

  
### [0.1.1] - 2023-05-22
- BBNavbar prop updates


### [0.1.0] - 2023-05-22
- Initial release!
- Base Blocks components system
- Documentation updates
- Basic CI/CD setup
  - Workflow badges in `README.md`
  - Added `lint` and `build`` workflows
- Basic linting setup
- Added Prettier for code formatting



-------------------------------------------------------

## [Unreleased]

-------------------------------------------------------
### TODO

#### code cov
- hook up code cov and coverage


#### cypress tests?
- add cypress component testing?


#### how to handle custom fonts?
- set global variable that takes precedence then good common defaults


#### add more variables
- add for things like `button-border-radius` to allow for easy customization

----
### 0.2.0



#### add support for color variables
- i.e.,
  - `--color-background-navbar` or something


#### bbcard options
- add option to remove border?
- how to do 'bool' values in scss


#### bbfield text
- add autocomplete as optional prop?
  - default to field name?
- add id as optional prop
  - default to field name?


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


### [0.2.0] - 2023-MM-DD
#### TODO

----
### 0.1.5


TODO


### [0.1.5] - 2023-MM-DD
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2022 © Daniel Nazarian.
