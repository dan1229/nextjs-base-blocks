# Migration Guide: BBFieldDropdown to BBFieldSelect

This guide helps you migrate from `BBFieldDropdown` to `BBFieldSelect` in version 2.1.0.

## Overview

The `BBFieldDropdown` component has been renamed to `BBFieldSelect` to better align with common naming conventions and to prepare for future consolidation with `BBFieldSelectMultiple`.

## Breaking Changes

### 1. Component Name
```typescript
// Before
import BBFieldDropdown from 'nextjs-base-blocks/form_components/bbfield_dropdown';

// After
import BBFieldSelect from 'nextjs-base-blocks/form_components/bbfield_select';
```

### 2. Interface Names
```typescript
// Before
import type { IPropsBBFieldDropdown, IBBFieldDropdownOptions } from 'nextjs-base-blocks/types';

// After
import type { IPropsBBFieldSelect, IBBFieldSelectOptions } from 'nextjs-base-blocks/types';
```

### 3. Component Usage
```tsx
// Before
<BBFieldDropdown
  options={dropdownOptions}
  fieldName="myDropdown"
  label="Select an option"
/>

// After
<BBFieldSelect
  options={selectOptions}
  fieldName="mySelect"
  label="Select an option"
/>
```

### 4. Type Definitions
```typescript
// Before
const options: IBBFieldDropdownOptions[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' }
];

const props: IPropsBBFieldDropdown = {
  options: options,
  value: '1'
};

// After
const options: IBBFieldSelectOptions[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' }
];

const props: IPropsBBFieldSelect = {
  options: options,
  value: '1'
};
```

### 5. CSS Classes (if using custom styles)
```scss
// Before
.dropdown_wrapper {
  /* your styles */
}

// After
.select_wrapper {
  /* your styles */
}
```

## Quick Find & Replace

You can use these find & replace patterns in your codebase:

1. `BBFieldDropdown` → `BBFieldSelect`
2. `IPropsBBFieldDropdown` → `IPropsBBFieldSelect`
3. `IBBFieldDropdownOptions` → `IBBFieldSelectOptions`
4. `bbfield_dropdown` → `bbfield_select`
5. `dropdown_wrapper` → `select_wrapper` (only if you have custom CSS)

## Notes

- The functionality remains exactly the same, only the naming has changed
- This change prepares for future consolidation with `BBFieldSelectMultiple`
- The navbar dropdown functionality (`BBNavbarItem` dropdowns) is NOT affected by this change