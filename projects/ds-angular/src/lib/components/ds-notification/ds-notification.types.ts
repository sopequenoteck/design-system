import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface NotificationAction {
  label: string;
  handler: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface NotificationConfig {
  id?: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;        // 0 = persistent, default 4500ms
  closable?: boolean;
  icon?: IconDefinition;
  actions?: NotificationAction[];
}

export type NotificationPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface NotificationItem extends NotificationConfig {
  id: string;
  timestamp: number;
}
