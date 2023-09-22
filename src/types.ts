


/**
 * Base props for all Base Blocks components
 * 
 * @prop {string=} className - CSS class names to add
 * @prop {React.MouseEventHandler<HTMLElement>=} onClick - Click handler
 */
export interface IBBBaseProps {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

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
export interface IBBBaseFormProps extends IBBBaseProps {
    register: Object;
    fieldName: string;
    type?: TBBFieldBaseTypes;
    label?: string;
    value?: any;
    onChange?: (value: any) => void;
    required?: boolean;
}

export type TBBFieldBaseTypes = 'file' | 'checkbox'
