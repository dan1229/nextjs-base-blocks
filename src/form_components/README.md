# README - Form Components

These components are intended to be used in a form.

Like the normal `Base Blocks`/`BBComponents` components, you can build off of these components to create your own custom components.

They are intended to be used with [react-hook-form](https://react-hook-form.com/).

## Required Field Indicator

All form components now display a visual indicator (an asterisk `*`) for required fields. The indicator appears automatically when:

1. The `required` prop is set to `true`
2. The field is registered with react-hook-form with a required validation rule (e.g., `register('fieldName', { required: true })`)

The asterisk color can be customized using the CSS variable `--form-required-indicator-color`. By default, it uses the danger color defined in your theme.
