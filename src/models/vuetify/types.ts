import {
  VBtn,
  VCheckboxTypes,
  VFormInputTypes,
  VFormSelectTypes
} from "./vuetify-components";

export interface IToggleButtons {
  label?: string;
  divided?: boolean;
  tabs?: FormBtn[];
  modelValue?: any;
  color?: string;
}

export interface FormBtn extends VBtn {
  label?: string;
  icon?: string;
}


export interface CheckboxTypes extends VCheckboxTypes {
  required?: boolean;
  type?: "checkbox" | "radio";
  group?: boolean;
  returnBoolean?: boolean
}

export interface FormInputTypes extends VFormInputTypes {
  required?: boolean;
}

export interface FormSelectTypes extends VFormSelectTypes {
  required?: boolean;
}
