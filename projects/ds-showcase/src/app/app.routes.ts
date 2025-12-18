import { Routes } from '@angular/router';
import { DocLayout } from './shared/layout/doc-layout';

export const routes: Routes = [
  {
    path: '',
    component: DocLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.page').then(m => m.HomePage),
      },
      // ==========================================================================
      // Components
      // ==========================================================================
      {
        path: 'components/actions/ds-button',
        loadComponent: () =>
          import('./features/components/button/button.page').then(m => m.ButtonPage),
      },
      {
        path: 'components/overlays/ds-modal',
        loadComponent: () =>
          import('./features/components/modal/modal.page').then(m => m.ModalPage),
      },
      {
        path: 'components/navigation/ds-tabs',
        loadComponent: () =>
          import('./features/components/tabs/tabs.page').then(m => m.TabsPage),
      },
      // ==========================================================================
      // Forms > Text Inputs
      // ==========================================================================
      {
        path: 'components/forms/text-inputs/ds-input-field',
        loadComponent: () =>
          import('./features/components/input-field/input-field.page').then(m => m.InputFieldPage),
      },
      {
        path: 'components/forms/text-inputs/ds-input-number',
        loadComponent: () =>
          import('./features/components/input-number/input-number.page').then(m => m.InputNumberPage),
      },
      {
        path: 'components/forms/text-inputs/ds-input-textarea',
        loadComponent: () =>
          import('./features/components/input-textarea/input-textarea.page').then(m => m.InputTextareaPage),
      },
      {
        path: 'components/forms/text-inputs/ds-search-input',
        loadComponent: () =>
          import('./features/components/search-input/search-input.page').then(m => m.SearchInputPage),
      },
      {
        path: 'components/forms/text-inputs/ds-password-strength',
        loadComponent: () =>
          import('./features/components/password-strength/password-strength.page').then(m => m.PasswordStrengthPage),
      },
      // ==========================================================================
      // Forms > Selection
      // ==========================================================================
      {
        path: 'components/forms/selection/ds-checkbox',
        loadComponent: () =>
          import('./features/components/checkbox/checkbox.page').then(m => m.CheckboxPage),
      },
      {
        path: 'components/forms/selection/ds-checkbox-list',
        loadComponent: () =>
          import('./features/components/checkbox-list/checkbox-list.page').then(m => m.CheckboxListPage),
      },
      {
        path: 'components/forms/selection/ds-radio-group',
        loadComponent: () =>
          import('./features/components/radio-group/radio-group.page').then(m => m.RadioGroupPage),
      },
      {
        path: 'components/forms/selection/ds-toggle',
        loadComponent: () =>
          import('./features/components/toggle/toggle.page').then(m => m.TogglePage),
      },
      {
        path: 'components/forms/selection/ds-segmented-control',
        loadComponent: () =>
          import('./features/components/segmented-control/segmented-control.page').then(m => m.SegmentedControlPage),
      },
      // ==========================================================================
      // Forms > Pickers
      // ==========================================================================
      {
        path: 'components/forms/pickers/ds-select',
        loadComponent: () =>
          import('./features/components/select/select.page').then(m => m.SelectPage),
      },
      {
        path: 'components/forms/pickers/ds-combobox',
        loadComponent: () =>
          import('./features/components/combobox/combobox.page').then(m => m.ComboboxPage),
      },
      {
        path: 'components/forms/pickers/ds-date-picker',
        loadComponent: () =>
          import('./features/components/date-picker/date-picker.page').then(m => m.DatePickerPage),
      },
      {
        path: 'components/forms/pickers/ds-time-picker',
        loadComponent: () =>
          import('./features/components/time-picker/time-picker.page').then(m => m.TimePickerPage),
      },
      {
        path: 'components/forms/pickers/ds-color-picker',
        loadComponent: () =>
          import('./features/components/color-picker/color-picker.page').then(m => m.ColorPickerPage),
      },
      // ==========================================================================
      // Forms > Advanced
      // ==========================================================================
      {
        path: 'components/forms/advanced/ds-file-upload',
        loadComponent: () =>
          import('./features/components/file-upload/file-upload.page').then(m => m.FileUploadPage),
      },
      {
        path: 'components/forms/advanced/ds-slider',
        loadComponent: () =>
          import('./features/components/slider/slider.page').then(m => m.SliderPage),
      },
      // ==========================================================================
      // Data Display
      // ==========================================================================
      {
        path: 'components/data-display/ds-avatar',
        loadComponent: () =>
          import('./features/components/avatar/avatar.page').then(m => m.AvatarPage),
      },
      {
        path: 'components/data-display/ds-badge',
        loadComponent: () =>
          import('./features/components/badge/badge.page').then(m => m.BadgePage),
      },
      {
        path: 'components/data-display/ds-card',
        loadComponent: () =>
          import('./features/components/card/card.page').then(m => m.CardPage),
      },
      {
        path: 'components/data-display/ds-carousel',
        loadComponent: () =>
          import('./features/components/carousel/carousel.page').then(m => m.CarouselPage),
      },
      {
        path: 'components/data-display/ds-chip',
        loadComponent: () =>
          import('./features/components/chip/chip.page').then(m => m.ChipPage),
      },
      {
        path: 'components/data-display/ds-empty',
        loadComponent: () =>
          import('./features/components/empty/empty.page').then(m => m.EmptyPage),
      },
      {
        path: 'components/data-display/ds-list',
        loadComponent: () =>
          import('./features/components/list/list.page').then(m => m.ListPage),
      },
      {
        path: 'components/data-display/ds-list-group',
        loadComponent: () =>
          import('./features/components/list-group/list-group.page').then(m => m.ListGroupPage),
      },
      {
        path: 'components/data-display/ds-list-item',
        loadComponent: () =>
          import('./features/components/list-item/list-item.page').then(m => m.ListItemPage),
      },
      {
        path: 'components/data-display/ds-table',
        loadComponent: () =>
          import('./features/components/table/table.page').then(m => m.TablePage),
      },
      {
        path: 'components/data-display/ds-timeline',
        loadComponent: () =>
          import('./features/components/timeline/timeline.page').then(m => m.TimelinePage),
      },
      {
        path: 'components/data-display/ds-tree',
        loadComponent: () =>
          import('./features/components/tree/tree.page').then(m => m.TreePage),
      },
      // ==========================================================================
      // Feedback
      // ==========================================================================
      {
        path: 'components/feedback/ds-alert',
        loadComponent: () =>
          import('./features/components/alert/alert.page').then(m => m.AlertPage),
      },
      {
        path: 'components/feedback/ds-notification',
        loadComponent: () =>
          import('./features/components/notification/notification.page').then(m => m.NotificationPage),
      },
      {
        path: 'components/feedback/ds-progress-bar',
        loadComponent: () =>
          import('./features/components/progress-bar/progress-bar.page').then(m => m.ProgressBarPage),
      },
      {
        path: 'components/feedback/ds-skeleton',
        loadComponent: () =>
          import('./features/components/skeleton/skeleton.page').then(m => m.SkeletonPage),
      },
      {
        path: 'components/feedback/ds-toast',
        loadComponent: () =>
          import('./features/components/toast/toast.page').then(m => m.ToastPage),
      },
      // ==========================================================================
      // Navigation
      // ==========================================================================
      {
        path: 'components/navigation/ds-accordion',
        loadComponent: () =>
          import('./features/components/accordion/accordion.page').then(m => m.AccordionPage),
      },
      {
        path: 'components/navigation/ds-breadcrumb',
        loadComponent: () =>
          import('./features/components/breadcrumb/breadcrumb.page').then(m => m.BreadcrumbPage),
      },
      {
        path: 'components/navigation/ds-menu',
        loadComponent: () =>
          import('./features/components/menu/menu.page').then(m => m.MenuPage),
      },
      {
        path: 'components/navigation/ds-nav-list',
        loadComponent: () =>
          import('./features/components/nav-list/nav-list.page').then(m => m.NavListPage),
      },
      {
        path: 'components/navigation/ds-pagination',
        loadComponent: () =>
          import('./features/components/pagination/pagination.page').then(m => m.PaginationPage),
      },
      {
        path: 'components/navigation/ds-sidebar',
        loadComponent: () =>
          import('./features/components/sidebar/sidebar.page').then(m => m.SidebarPage),
      },
      {
        path: 'components/navigation/ds-stepper',
        loadComponent: () =>
          import('./features/components/stepper/stepper.page').then(m => m.StepperPage),
      },
      // ==========================================================================
      // Overlays
      // ==========================================================================
      {
        path: 'components/overlays/ds-drawer',
        loadComponent: () =>
          import('./features/components/drawer/drawer.page').then(m => m.DrawerPage),
      },
      {
        path: 'components/overlays/ds-dropdown',
        loadComponent: () =>
          import('./features/components/dropdown/dropdown.page').then(m => m.DropdownPage),
      },
      {
        path: 'components/overlays/ds-popover',
        loadComponent: () =>
          import('./features/components/popover/popover.page').then(m => m.PopoverPage),
      },
      {
        path: 'components/overlays/ds-tooltip',
        loadComponent: () =>
          import('./features/components/tooltip/tooltip.page').then(m => m.TooltipPage),
      },
      // ==========================================================================
      // Layout
      // ==========================================================================
      {
        path: 'components/layout/ds-container',
        loadComponent: () =>
          import('./features/components/container/container.page').then(m => m.ContainerPage),
      },
      {
        path: 'components/layout/ds-divider',
        loadComponent: () =>
          import('./features/components/divider/divider.page').then(m => m.DividerPage),
      },
      // ==========================================================================
      // Data Display (nouveaux)
      // ==========================================================================
      {
        path: 'components/data-display/ds-calendar',
        loadComponent: () =>
          import('./features/components/calendar/calendar.page').then(m => m.CalendarPage),
      },
      {
        path: 'components/data-display/ds-rating',
        loadComponent: () =>
          import('./features/components/rating/rating.page').then(m => m.RatingPage),
      },
      // ==========================================================================
      // Forms > Advanced (nouveaux)
      // ==========================================================================
      {
        path: 'components/forms/advanced/ds-transfer',
        loadComponent: () =>
          import('./features/components/transfer/transfer.page').then(m => m.TransferPage),
      },
      // ==========================================================================
      // Fallback pour les autres composants (placeholder)
      // ==========================================================================
      {
        path: 'components/:category/:subcategory/:componentId',
        loadComponent: () =>
          import('./features/components/component.page').then(m => m.ComponentPage),
      },
      {
        path: 'components/:category/:componentId',
        loadComponent: () =>
          import('./features/components/component.page').then(m => m.ComponentPage),
      },
    ],
  },
];
