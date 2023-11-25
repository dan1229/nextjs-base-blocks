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


#### demo page - children props
- what to do about them?
- React.ReactNode ones render weird
- most are useless anyway


#### demo page - bbcard 'composite' components
- what to do with header, body and footer?


#### demo pages - navbar component
- fix links
- add image src
- bbnavbar item - improve component and add children
  - i.e., multiple bbnavbar items


#### demo page - do boolean fields work
- test and if not fix
- some dont
  - bb text - italics field

----
### 0.4.0



#### demo page - bbmodal demo doesnt work great
- need way to hide modal
- onCancel and onConfirm need to update showComponent state in DemoComponent


#### demo page - show options for props
- props that have options or types should show them
- i.e., bbtext size - show the size 'choices'


#### demo page - rehydration error
- idk fix it


#### demo page - form components
- just add them
- probably in a different page
- make sections expandable

---

#### loading spinner variants
- add more css and variants for loading spinner


#### bb field dropdown styling
- add arrow or something
  - add to global styling
- wait until form css is figured out


#### form css
- convert to module.scss
  - will have to change a lot of the form scss
- maybe just make scss shared module for form components?
  - in forms dir
  - will likely have to rewrite a lot of the form scss


#### remove next theme?
- do we need the next-theme package?


#### bbnavbar item - bugs
- hover not really workings?


#### bbbutton - bugs
- disabled
  - outline color is wrong
  - hover should be disabled not pointer
  - shouldnt be clickable when disableds
- inverse-info
  - focus could use better background color
- inverses in general
  - backgrounds odnt work great on dark mode
  - thicker backgrounds
  - add 'transparent' option for background color?


#### bb select multiple field bug
- still not really the best solution - only says field is requied not what field

```
TypeError: ref.name is undefined
Source

base_blocks/src/form_components/helpers/alerts/alerts_field_errors/index.tsx (39:32) @ AlertsFieldErrors/<.children<

  37 | const finalMessage = message
  38 |   ? message.toString()
> 39 |   : `Error - ${type} '${(ref as Ref).name.replace(/_/g, ' ').replace(/-/g, ' ')}'
```


### [0.4.0] - 2023-11-DD
#### TODO

-------------------------------------------------------

##### [https://danielnazarian.com](https://danielnazarian.com)
##### Copyright 2023 © Daniel Nazarian.
