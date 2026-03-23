/**
 * UI-specific types for Nabab ERP POS Solution
 */

import { ReactNode } from 'react';

// ============= Theme & Layout =============
export type ThemeMode = 'light' | 'dark';

export interface AppTheme {
  mode: ThemeMode;
  primaryColor: string;
  fontFamily: string;
}

export interface LayoutConfig {
  isSidebarCollapsed: boolean;
  sidebarWidth: number;
  headerHeight: number;
  footerHeight: number;
}

// ============= Navigation =============
export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  path?: string;
  children?: NavItem[];
  badge?: string | number;
  requiredPermission?: string;
  requiredPlan?: string[];
}

export interface Breadcrumb {
  label: string;
  path?: string;
}

// ============= Data Grid =============
export interface Column<T = unknown> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => ReactNode;
  format?: (value: unknown) => string;
  filterType?: 'text' | 'select' | 'dateRange' | 'number';
  filterOptions?: { value: string; label: string }[];
}

export interface DataGridProps<T = unknown> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  selectionMode?: 'none' | 'single' | 'multiple';
  selectedRows?: Set<string>;
  onSelectionChange?: (selected: Set<string>) => void;
  onRowClick?: (row: T, index: number) => void;
  pagination?: PaginationConfig;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  onFilterChange?: (filters: Record<string, unknown>) => void;
  actions?: DataGridAction<T>[];
  emptyMessage?: string;
  height?: number | string;
  virtualized?: boolean;
}

export interface DataGridAction<T = unknown> {
  icon: ReactNode;
  label: string;
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
  color?: 'default' | 'primary' | 'danger';
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
}

// ============= Forms =============
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'multiSelect' | 'date' | 'dateRange' | 'checkbox' | 'radio' | 'file' | 'image';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: unknown;
  options?: { value: string | number; label: string }[];
  validation?: FormValidation;
  hint?: string;
  rows?: number; // for textarea
  accept?: string; // for file input
  multiple?: boolean; // for select/file
  grid?: { xs?: number; sm?: number; md?: number; lg?: number }; // grid column span
}

export interface FormValidation {
  required?: string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  validate?: (value: unknown) => string | boolean;
}

export interface FormDialog {
  isOpen: boolean;
  title: string;
  fields: FormField[];
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// ============= Commands & Actions =============
export interface Command {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  hidden?: boolean;
  variant?: 'default' | 'primary' | 'danger';
  shortcut?: string;
  requiredPermission?: string;
}

export interface CommandBar {
  primaryCommands: Command[];
  secondaryCommands?: Command[];
  farCommands?: Command[];
}

// ============= Filters & Search =============
export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'multiSelect' | 'dateRange' | 'numberRange' | 'boolean';
  options?: { value: string; label: string }[];
  defaultValue?: unknown;
  placeholder?: string;
}

export interface SearchConfig {
  placeholder?: string;
  fields: string[]; // fields to search in
  debounceMs?: number;
}

// ============= Dashboard & Widgets =============
export interface DashboardWidget {
  id: string;
  title: string;
  type: 'kpi' | 'chart' | 'table' | 'list' | 'custom';
  size: { cols: number; rows: number };
  position: { x: number; y: number };
  data?: unknown;
  config?: Record<string, unknown>;
  requiredPermission?: string;
}

export interface KPICard {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    isPositive: boolean;
  };
  color?: string;
  onClick?: () => void;
}

export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'donut';
  data: unknown[];
  xAxis?: string;
  yAxis?: string | string[];
  colors?: string[];
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
}

// ============= Notifications & Messages =============
export type MessageBarType = 'info' | 'success' | 'warning' | 'error';

export interface Toast {
  id: string;
  type: MessageBarType;
  title: string;
  message?: string;
  duration?: number; // ms
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface MessageBarConfig {
  type: MessageBarType;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

// ============= Modals & Dialogs =============
export interface DialogConfig {
  isOpen: boolean;
  title: string;
  content: ReactNode;
  onDismiss: () => void;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  blocking?: boolean;
}

export interface ConfirmDialogConfig {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'default' | 'danger' | 'warning';
  loading?: boolean;
}

// ============= File Upload =============
export interface FileUploadConfig {
  accept: string;
  multiple?: boolean;
  maxSize?: number; // bytes
  maxFiles?: number;
  onUpload: (files: File[]) => Promise<string[]>; // returns URLs
  onError?: (error: Error) => void;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// ============= Export =============
export interface ExportConfig {
  filename: string;
  format: 'csv' | 'xlsx' | 'pdf';
  data: unknown[];
  columns?: { key: string; label: string }[];
  options?: {
    includeHeaders?: boolean;
    dateFormat?: string;
    pageOrientation?: 'portrait' | 'landscape';
  };
}

// ============= Permission & Access Control =============
export interface PermissionGuardProps {
  permission: string | string[];
  fallback?: ReactNode;
  children: ReactNode;
}

export interface SubscriptionGuardProps {
  requiredPlan: string | string[];
  fallback?: ReactNode;
  children: ReactNode;
}

// ============= Loading & Empty States =============
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface EmptyState {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
}

// ============= Wizard & Stepper =============
export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  component: ReactNode;
  validate?: () => boolean | Promise<boolean>;
  canSkip?: boolean;
}

export interface WizardConfig {
  steps: WizardStep[];
  currentStep: number;
  onStepChange: (step: number) => void;
  onComplete: () => void;
  onCancel: () => void;
}

// ============= Context Menu =============
export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  divider?: boolean;
  children?: ContextMenuItem[];
}

// ============= Keyboard Shortcuts =============
export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  description: string;
  action: () => void;
  global?: boolean;
}
