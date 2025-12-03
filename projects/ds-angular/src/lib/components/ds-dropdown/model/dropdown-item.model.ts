import {IconDefinition} from '@fortawesome/angular-fontawesome';
import {SortCriteriaConfig} from '../../../../../core/constant/planner/planner-sort-criteria';

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
export function mapSortCriteriaConfigToDropDownItem(dto: SortCriteriaConfig): DropdownItem {
  return {
    code: dto.key,
    label: dto.label,
    startIcon: dto.icon
  };
}
