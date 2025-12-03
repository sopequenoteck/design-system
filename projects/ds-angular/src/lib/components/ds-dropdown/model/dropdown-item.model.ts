import {IconDefinition} from '@fortawesome/angular-fontawesome';

// MODELS
export interface DropdownItem {
  code: string;
  label: string;
  startIcon?: IconDefinition;
  endIcon?: IconDefinition;
  iconColor?: string;
}
export interface DropdownItemDTO {
  code: string;
  label: string;
  startIcon: string;
  endIcon: string;
}
