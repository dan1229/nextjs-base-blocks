
/**
 * ALL TYPES
 */

/**
 * Base props for all Base Blocks components
 * 
 * @prop {string=} className - CSS class names to add
 * @prop {React.MouseEventHandler<HTMLElement>=} onClick - Click handler
 */
export interface IPropsBBBase {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * FORM TYPES
 */

/**
 * Base props for all Base Blocks FORM components
 * 
 * @prop {Object} register - React Hook Form register object
 * @prop {string} fieldName - Name of the field, used for ID for form submission
 * @param {TBBFieldBaseTypes=} type - Type of input to use
 * @prop {string=} label - Label for the component
 * @prop {any=} value - Value of the component
 * @prop {(value: any) => void} onChange - Change handler
 * @prop {boolean=} required - Whether the field is required
 */
export interface IPropsBBBaseForm extends IPropsBBBase {
    register: Object;
    fieldName: string;
    label?: string;
    value?: any;
    onChange?: (value: any) => void;
    required?: boolean;
}

// types of input for TBBFieldBase
export type TBBFieldBaseTypes = 'file' | 'checkbox'

// types of input for TBBFieldText
export type TBBFieldTextType = 'text' | 'textarea' | 'number' | 'password'

// option format for TBBFieldDropdown
export interface IBBFieldDropdownOptions {
    value: string
    label: string
}
  
// option format for TBBFieldSelectMultiple
export interface IBBFieldSelectMultipleOptions {
    value: string
    label: string
}
  