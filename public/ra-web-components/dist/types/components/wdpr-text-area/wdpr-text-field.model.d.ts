export type FormInternalsHost = HTMLElement & {
    attachInternals(): ElementInternals;
};
export type TextFieldRequirementIndicator = 'required' | 'optional' | 'none';
export type TextFieldVariants = 'error' | 'noError';
export type TextFieldType = 'text' | 'number';
export type StringBoolean = 'true' | 'false';
export type Role = 'button' | 'checkbox' | 'combobox' | 'listbox' | 'menu' | 'menubar' | 'option' | 'radio' | 'searchbox' | 'textbox' | 'switch' | 'tab' | 'tree' | 'treeitem';
export type HasPopup = 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
export type AutoComplete = 'none' | 'inline' | 'list' | 'both';
