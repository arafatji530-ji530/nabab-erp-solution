/**
 * Application-wide constants
 */

// ============= App Configuration =============
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Nabab ERP POS Solution';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';
export const APP_ENVIRONMENT = import.meta.env.VITE_APP_ENVIRONMENT || 'development';

// ============= API Configuration =============
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000');
export const ENABLE_MOCK = import.meta.env.VITE_ENABLE_MOCK === 'true';
export const MOCK_DELAY = parseInt(import.meta.env.VITE_MOCK_DELAY || '300');

// ============= Feature Flags =============
export const ENABLE_SUBSCRIPTION = import.meta.env.VITE_ENABLE_SUBSCRIPTION === 'true';
export const ENABLE_MULTI_TENANT = import.meta.env.VITE_ENABLE_MULTI_TENANT === 'true';
export const ENABLE_OFFLINE_MODE = import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true';

// ============= Pagination =============
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export const MAX_PAGE_SIZE = 100;

// ============= Date & Time =============
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATE_TIME_FORMAT = 'MMM dd, yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';
export const DATE_INPUT_FORMAT = 'yyyy-MM-dd';

// ============= Currency =============
export const DEFAULT_CURRENCY = 'BDT';
export const CURRENCY_SYMBOL = '৳';
export const DECIMAL_PLACES = 2;

// ============= Permissions =============
export const PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'dashboard.view',

  // Products
  PRODUCTS_VIEW: 'products.view',
  PRODUCTS_CREATE: 'products.create',
  PRODUCTS_EDIT: 'products.edit',
  PRODUCTS_DELETE: 'products.delete',
  PRODUCTS_IMPORT: 'products.import',
  PRODUCTS_EXPORT: 'products.export',

  // Inventory
  INVENTORY_VIEW: 'inventory.view',
  INVENTORY_ADJUST: 'inventory.adjust',
  INVENTORY_TRANSFER: 'inventory.transfer',

  // Sales
  SALES_VIEW: 'sales.view',
  SALES_CREATE: 'sales.create',
  SALES_EDIT: 'sales.edit',
  SALES_DELETE: 'sales.delete',
  SALES_APPROVE: 'sales.approve',

  // Purchase
  PURCHASE_VIEW: 'purchase.view',
  PURCHASE_CREATE: 'purchase.create',
  PURCHASE_EDIT: 'purchase.edit',
  PURCHASE_DELETE: 'purchase.delete',
  PURCHASE_APPROVE: 'purchase.approve',

  // POS
  POS_ACCESS: 'pos.access',
  POS_OPEN_SESSION: 'pos.openSession',
  POS_CLOSE_SESSION: 'pos.closeSession',
  POS_REFUND: 'pos.refund',

  // Customers
  CUSTOMERS_VIEW: 'customers.view',
  CUSTOMERS_CREATE: 'customers.create',
  CUSTOMERS_EDIT: 'customers.edit',
  CUSTOMERS_DELETE: 'customers.delete',

  // Suppliers
  SUPPLIERS_VIEW: 'suppliers.view',
  SUPPLIERS_CREATE: 'suppliers.create',
  SUPPLIERS_EDIT: 'suppliers.edit',
  SUPPLIERS_DELETE: 'suppliers.delete',

  // Accounting
  ACCOUNTING_VIEW: 'accounting.view',
  ACCOUNTING_JOURNAL_ENTRY: 'accounting.journalEntry',
  ACCOUNTING_REPORTS: 'accounting.reports',

  // HR
  HR_VIEW: 'hr.view',
  HR_MANAGE_EMPLOYEES: 'hr.manageEmployees',
  HR_ATTENDANCE: 'hr.attendance',
  HR_PAYROLL: 'hr.payroll',

  // Reports
  REPORTS_VIEW: 'reports.view',
  REPORTS_EXPORT: 'reports.export',
  REPORTS_SCHEDULE: 'reports.schedule',

  // Settings
  SETTINGS_VIEW: 'settings.view',
  SETTINGS_COMPANY: 'settings.company',
  SETTINGS_USERS: 'settings.users',
  SETTINGS_PERMISSIONS: 'settings.permissions',
  SETTINGS_TAX: 'settings.tax',

  // Subscription
  SUBSCRIPTION_VIEW: 'subscription.view',
  SUBSCRIPTION_MANAGE: 'subscription.manage',

  // Admin
  ADMIN_FULL_ACCESS: 'admin.fullAccess',
} as const;

// Extract Permission type from PERMISSIONS values
export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

// ============= User Roles & Default Permissions =============
export const ROLE_PERMISSIONS = {
  Admin: Object.values(PERMISSIONS),
  Manager: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.PRODUCTS_CREATE,
    PERMISSIONS.PRODUCTS_EDIT,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.INVENTORY_ADJUST,
    PERMISSIONS.INVENTORY_TRANSFER,
    PERMISSIONS.SALES_VIEW,
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_EDIT,
    PERMISSIONS.SALES_APPROVE,
    PERMISSIONS.PURCHASE_VIEW,
    PERMISSIONS.PURCHASE_CREATE,
    PERMISSIONS.PURCHASE_EDIT,
    PERMISSIONS.PURCHASE_APPROVE,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_CREATE,
    PERMISSIONS.CUSTOMERS_EDIT,
    PERMISSIONS.SUPPLIERS_VIEW,
    PERMISSIONS.SUPPLIERS_CREATE,
    PERMISSIONS.SUPPLIERS_EDIT,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
  ] as Permission[],
  Sales: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.SALES_VIEW,
    PERMISSIONS.SALES_CREATE,
    PERMISSIONS.SALES_EDIT,
    PERMISSIONS.CUSTOMERS_VIEW,
    PERMISSIONS.CUSTOMERS_CREATE,
    PERMISSIONS.CUSTOMERS_EDIT,
  ] as Permission[],
  Warehouse: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.INVENTORY_VIEW,
    PERMISSIONS.INVENTORY_ADJUST,
    PERMISSIONS.INVENTORY_TRANSFER,
    PERMISSIONS.PURCHASE_VIEW,
  ] as Permission[],
  Accountant: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.ACCOUNTING_VIEW,
    PERMISSIONS.ACCOUNTING_JOURNAL_ENTRY,
    PERMISSIONS.ACCOUNTING_REPORTS,
    PERMISSIONS.REPORTS_VIEW,
    PERMISSIONS.REPORTS_EXPORT,
  ] as Permission[],
  POSOperator: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.PRODUCTS_VIEW,
    PERMISSIONS.POS_ACCESS,
    PERMISSIONS.POS_OPEN_SESSION,
    PERMISSIONS.POS_CLOSE_SESSION,
    PERMISSIONS.CUSTOMERS_VIEW,
  ] as Permission[],
  HR: [
    PERMISSIONS.DASHBOARD_VIEW,
    PERMISSIONS.HR_VIEW,
    PERMISSIONS.HR_MANAGE_EMPLOYEES,
    PERMISSIONS.HR_ATTENDANCE,
    PERMISSIONS.HR_PAYROLL,
  ],
  Viewer: [PERMISSIONS.DASHBOARD_VIEW, PERMISSIONS.REPORTS_VIEW],
} as const;

// ============= Subscription Plans & Limits =============
export const SUBSCRIPTION_PLANS = {
  Free: {
    maxUsers: 2,
    maxProducts: 100,
    maxWarehouses: 1,
    maxPOSTerminals: 1,
    maxMonthlyOrders: 50,
    storageGB: 1,
    apiCallsPerDay: 1000,
  },
  Basic: {
    maxUsers: 5,
    maxProducts: 1000,
    maxWarehouses: 2,
    maxPOSTerminals: 2,
    maxMonthlyOrders: 500,
    storageGB: 5,
    apiCallsPerDay: 10000,
  },
  Pro: {
    maxUsers: 20,
    maxProducts: 10000,
    maxWarehouses: 5,
    maxPOSTerminals: 5,
    maxMonthlyOrders: 5000,
    storageGB: 50,
    apiCallsPerDay: 50000,
  },
  Enterprise: {
    maxUsers: -1, // unlimited
    maxProducts: -1,
    maxWarehouses: -1,
    maxPOSTerminals: -1,
    maxMonthlyOrders: -1,
    storageGB: 500,
    apiCallsPerDay: -1,
  },
} as const;

// ============= Product Types =============
export const PRODUCT_TYPES = [
  { value: 'Hardware', label: 'Hardware' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Tool', label: 'Tool' },
  { value: 'Machinery', label: 'Machinery' },
  { value: 'Spare Part', label: 'Spare Part' },
] as const;

// ============= Order Statuses =============
export const SALES_ORDER_STATUSES = [
  { value: 'Draft', label: 'Draft', color: '#605e5c' },
  { value: 'Confirmed', label: 'Confirmed', color: '#0078d4' },
  { value: 'InProgress', label: 'In Progress', color: '#ffaa44' },
  { value: 'Delivered', label: 'Delivered', color: '#107c10' },
  { value: 'Cancelled', label: 'Cancelled', color: '#a4262c' },
] as const;

export const PURCHASE_ORDER_STATUSES = [
  { value: 'Draft', label: 'Draft', color: '#605e5c' },
  { value: 'Sent', label: 'Sent', color: '#0078d4' },
  { value: 'Confirmed', label: 'Confirmed', color: '#ffaa44' },
  { value: 'Received', label: 'Received', color: '#107c10' },
  { value: 'Cancelled', label: 'Cancelled', color: '#a4262c' },
] as const;

export const PAYMENT_STATUSES = [
  { value: 'Unpaid', label: 'Unpaid', color: '#a4262c' },
  { value: 'Partial', label: 'Partial', color: '#ffaa44' },
  { value: 'Paid', label: 'Paid', color: '#107c10' },
  { value: 'Refunded', label: 'Refunded', color: '#605e5c' },
] as const;

// ============= Payment Methods =============
export const PAYMENT_METHODS = [
  { value: 'Cash', label: 'Cash' },
  { value: 'Card', label: 'Card' },
  { value: 'BankTransfer', label: 'Bank Transfer' },
  { value: 'MobileBanking', label: 'Mobile Banking (bKash/Nagad)' },
  { value: 'Cheque', label: 'Cheque' },
] as const;

// ============= Tax Types =============
export const TAX_TYPES = [
  { value: 'VAT', label: 'VAT' },
  { value: 'Sales Tax', label: 'Sales Tax' },
  { value: 'GST', label: 'GST' },
  { value: 'Custom', label: 'Custom' },
] as const;

// ============= Bangladesh Districts =============
export const BD_DISTRICTS = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
  'Comilla',
  'Narayanganj',
  'Gazipur',
  'Tangail',
  'Jamalpur',
  'Sherpur',
  'Netrokona',
  'Kishoreganj',
  'Narsingdi',
  'Manikganj',
  'Munshiganj',
  'Faridpur',
  'Madaripur',
  'Gopalganj',
  'Shariatpur',
  'Rajbari',
  'Cox\'s Bazar',
  'Feni',
  'Lakshmipur',
  'Noakhali',
  'Chandpur',
  'Brahmanbaria',
  'Rangamati',
  'Bandarban',
  'Khagrachhari',
] as const;

// ============= File Upload =============
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
];

// ============= Regex Patterns =============
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_BD: /^01[0-9]{9}$/,
  TAX_ID_BD: /^\d{12}$/,
  POSTAL_CODE_BD: /^\d{4}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  BARCODE: /^[0-9]{8,13}$/,
  URL: /^https?:\/\/.+/,
} as const;

// ============= Notification Types =============
export const NOTIFICATION_CATEGORIES = {
  SYSTEM: 'System',
  ORDER: 'Order',
  INVENTORY: 'Inventory',
  PAYMENT: 'Payment',
  USER: 'User',
  SUBSCRIPTION: 'Subscription',
} as const;

// ============= Report Categories =============
export const REPORT_CATEGORIES = {
  SALES: 'Sales',
  INVENTORY: 'Inventory',
  PURCHASE: 'Purchase',
  FINANCIAL: 'Financial',
  HR: 'HR',
  CUSTOM: 'Custom',
} as const;

// ============= Chart Colors (Fluent UI inspired) =============
export const CHART_COLORS = [
  '#0078d4', // blue
  '#107c10', // green
  '#ffaa44', // orange
  '#8764b8', // purple
  '#e3008c', // magenta
  '#00b7c3', // teal
  '#498205', // lime
  '#d13438', // red
] as const;

// ============= Toast Duration =============
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
} as const;

// ============= Modal Sizes =============
export const MODAL_SIZES = {
  XS: '400px',
  SM: '600px',
  MD: '800px',
  LG: '1000px',
  XL: '1200px',
} as const;

// ============= Keyboard Shortcuts =============
export const KEYBOARD_SHORTCUTS = {
  SEARCH: { key: 'k', ctrlKey: true },
  NEW_ORDER: { key: 'n', ctrlKey: true },
  SAVE: { key: 's', ctrlKey: true },
  CANCEL: { key: 'Escape' },
  HELP: { key: 'F1' },
} as const;

// ============= Local Storage Keys =============
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'nabab_auth_token',
  REFRESH_TOKEN: 'nabab_refresh_token',
  USER: 'nabab_user',
  THEME: 'nabab_theme',
  SIDEBAR_COLLAPSED: 'nabab_sidebar_collapsed',
  LANGUAGE: 'nabab_language',
  POS_CART: 'nabab_pos_cart',
  OFFLINE_QUEUE: 'nabab_offline_queue',
} as const;

// ============= Routes =============
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  
  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  PRODUCT_CREATE: '/products/create',
  PRODUCT_EDIT: '/products/:id/edit',
  CATEGORIES: '/products/categories',
  BRANDS: '/products/brands',
  UNITS: '/products/units',
  
  // Inventory
  INVENTORY: '/inventory',
  STOCK_LEVELS: '/inventory/stock-levels',
  STOCK_ADJUSTMENT: '/inventory/adjustment',
  STOCK_TRANSFER: '/inventory/transfer',
  BATCH_TRACKING: '/inventory/batch-tracking',
  SERIAL_TRACKING: '/inventory/serial-tracking',
  
  // Sales
  SALES_ORDERS: '/sales/orders',
  SALES_ORDER_DETAIL: '/sales/orders/:id',
  SALES_ORDER_CREATE: '/sales/orders/create',
  QUOTATIONS: '/sales/quotations',
  INVOICES: '/sales/invoices',
  DELIVERY_NOTES: '/sales/delivery-notes',
  SALES_RETURNS: '/sales/returns',
  
  // Purchase
  PURCHASE_ORDERS: '/purchase/orders',
  PURCHASE_ORDER_DETAIL: '/purchase/orders/:id',
  PURCHASE_ORDER_CREATE: '/purchase/orders/create',
  PURCHASE_RECEIPTS: '/purchase/receipts',
  PURCHASE_RETURNS: '/purchase/returns',
  
  // POS
  POS_TERMINAL: '/pos/terminal',
  POS_SESSIONS: '/pos/sessions',
  POS_TRANSACTIONS: '/pos/transactions',
  POS_REPORTS: '/pos/reports',
  
  // Customers
  CUSTOMERS: '/customers',
  CUSTOMER_DETAIL: '/customers/:id',
  CUSTOMER_GROUPS: '/customers/groups',
  
  // Suppliers
  SUPPLIERS: '/suppliers',
  SUPPLIER_DETAIL: '/suppliers/:id',
  
  // Accounting
  ACCOUNTING: '/accounting',
  CHART_OF_ACCOUNTS: '/accounting/chart-of-accounts',
  JOURNAL_ENTRIES: '/accounting/journal-entries',
  GENERAL_LEDGER: '/accounting/general-ledger',
  TRIAL_BALANCE: '/accounting/trial-balance',
  PROFIT_LOSS: '/accounting/profit-loss',
  BALANCE_SHEET: '/accounting/balance-sheet',
  
  // HR
  HR: '/hr',
  EMPLOYEES: '/hr/employees',
  ATTENDANCE: '/hr/attendance',
  PAYROLL: '/hr/payroll',
  DEPARTMENTS: '/hr/departments',
  
  // Reports
  REPORTS: '/reports',
  SALES_REPORTS: '/reports/sales',
  INVENTORY_REPORTS: '/reports/inventory',
  FINANCIAL_REPORTS: '/reports/financial',
  CUSTOM_REPORTS: '/reports/custom',
  
  // Subscription
  SUBSCRIPTION: '/subscription',
  SUBSCRIPTION_PLANS: '/subscription/plans',
  SUBSCRIPTION_BILLING: '/subscription/billing',
  SUBSCRIPTION_USAGE: '/subscription/usage',
  
  // Settings
  SETTINGS: '/settings',
  COMPANY_SETTINGS: '/settings/company',
  USER_MANAGEMENT: '/settings/users',
  ROLES_PERMISSIONS: '/settings/roles-permissions',
  TAX_SETTINGS: '/settings/tax',
  EMAIL_SETTINGS: '/settings/email',
  
  // Profile
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/profile/change-password',
} as const;
