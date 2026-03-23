/**
 * Global domain types for Nabab ERP POS Solution
 */

// ============= Authentication & Authorization =============
export type UserRole =
  | 'Admin'
  | 'Manager'
  | 'Sales'
  | 'Warehouse'
  | 'Accountant'
  | 'POSOperator'
  | 'HR'
  | 'Viewer';

export type SubscriptionPlan = 'Free' | 'Basic' | 'Pro' | 'Enterprise';

export interface User {
  id: string;
  tenantId: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  subscriptionPlan: SubscriptionPlan;
  permissions: string[];
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ============= Common Domain Types =============
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterParams {
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  categoryId?: string;
  [key: string]: string | number | boolean | undefined;
}

// ============= Product & Catalog =============
export type ProductType = 'Hardware' | 'Electrical' | 'Tool' | 'Machinery' | 'Spare Part';
export type ProductStatus = 'Active' | 'Inactive' | 'Discontinued';

export interface Product extends BaseEntity {
  code: string;
  name: string;
  description?: string;
  type: ProductType;
  categoryId: string;
  category?: Category;
  brandId?: string;
  brand?: Brand;
  unitId: string;
  unit?: Unit;
  barcode?: string;
  sku: string;
  variants?: ProductVariant[];
  specifications: Record<string, string>;
  images: string[];
  costPrice: number;
  sellingPrice: number;
  unitPrice?: number;
  purchasePrice?: number;
  minPrice?: number;
  taxRate: number;
  isTrackInventory: boolean;
  isBatchTracked: boolean;
  isSerialTracked: boolean;
  reorderLevel?: number;
  reorderQuantity?: number;
  leadTimeDays?: number;
  status: ProductStatus;
  supplierId?: string;
  warrantyMonths?: number;
  weight?: number;
  dimensions?: { length: number; width: number; height: number };
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  attributes: Record<string, string>; // e.g., { voltage: "220V", color: "Red" }
  sku: string;
  barcode?: string;
  costPrice: number;
  sellingPrice: number;
  image?: string;
}

export interface Category extends BaseEntity {
  name: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  description?: string;
  image?: string;
  isActive: boolean;
}

export interface Brand extends BaseEntity {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  isActive: boolean;
}

export interface Unit extends BaseEntity {
  name: string;
  symbol: string;
  description?: string;
  baseUnit?: string;
  conversionFactor?: number;
}

// ============= Inventory & Warehouse =============
export type StockTransactionType =
  | 'Purchase'
  | 'Sale'
  | 'Adjustment'
  | 'Transfer'
  | 'Return'
  | 'Damage'
  | 'Production';

export interface Warehouse extends BaseEntity {
  code: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  managerId?: string;
  managerName?: string;
  isActive: boolean;
}

export interface StockLevel {
  id: string;
  productId: string;
  product?: Product;
  warehouseId: string;
  warehouse?: Warehouse;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lastUpdated: string;
}

export interface StockTransaction extends BaseEntity {
  warehouseId: string;
  warehouse?: Warehouse;
  productId: string;
  product?: Product;
  type: StockTransactionType;
  quantity: number;
  referenceType?: string; // 'SalesOrder', 'PurchaseOrder', etc.
  referenceId?: string;
  notes?: string;
  batchNumber?: string;
  serialNumbers?: string[];
}

export interface StockTransfer extends BaseEntity {
  transferNumber: string;
  fromWarehouseId: string;
  fromWarehouse?: Warehouse;
  toWarehouseId: string;
  toWarehouse?: Warehouse;
  items: StockTransferItem[];
  status: 'Draft' | 'InTransit' | 'Completed' | 'Cancelled';
  transferDate: string;
  receivedDate?: string;
  notes?: string;
}

export interface StockTransferItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  receivedQuantity?: number;
  batchNumber?: string;
  serialNumbers?: string[];
}

// ============= Sales & Orders =============
export type SalesOrderStatus = 'Draft' | 'Confirmed' | 'InProgress' | 'Delivered' | 'Cancelled';
export type PaymentStatus = 'Unpaid' | 'Partial' | 'Paid' | 'Refunded';
export type PaymentMethod = 'Cash' | 'Card' | 'BankTransfer' | 'MobileBanking' | 'Cheque';

export interface Customer extends BaseEntity {
  code: string;
  name: string;
  email?: string;
  phone: string;
  companyName?: string;
  taxId?: string;
  address?: string;
  city?: string;
  district?: string;
  zipCode?: string;
  customerType: 'Retail' | 'Wholesale' | 'B2B';
  creditLimit?: number;
  creditUsed: number;
  paymentTerms?: string;
  discountPercentage?: number;
  loyaltyPoints: number;
  isActive: boolean;
  notes?: string;
}

export interface SalesOrder extends BaseEntity {
  orderNumber: string;
  customerId: string;
  customer?: Customer;
  orderDate: string;
  deliveryDate?: string;
  warehouseId: string;
  warehouse?: Warehouse;
  items: SalesOrderItem[];
  subtotal: number;
  discountAmount: number;
  discountPercentage?: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  status: SalesOrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  salesPersonId?: string;
  notes?: string;
  shippingAddress?: string;
  billingAddress?: string;
}

export interface SalesOrderItem {
  id: string;
  productId: string;
  product?: Product;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  discountAmount: number;
  taxPercentage: number;
  taxAmount: number;
  lineTotal: number;
  notes?: string;
}

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  salesOrderId?: string;
  salesOrder?: SalesOrder;
  customerId: string;
  customer?: Customer;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentStatus: PaymentStatus;
  notes?: string;
  termsAndConditions?: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  product?: Product;
  description: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  taxAmount: number;
  lineTotal: number;
}

// ============= Purchase & Procurement =============
export type PurchaseOrderStatus = 'Draft' | 'Sent' | 'Confirmed' | 'Received' | 'Cancelled';

export interface Supplier extends BaseEntity {
  code: string;
  name: string;
  companyName: string;
  email?: string;
  phone: string;
  taxId?: string;
  address?: string;
  city?: string;
  district?: string;
  country?: string;
  paymentTerms?: string;
  leadTimeDays: number;
  rating?: number;
  isActive: boolean;
  notes?: string;
}

export interface PurchaseOrder extends BaseEntity {
  poNumber: string;
  supplierId: string;
  supplier?: Supplier;
  orderDate: string;
  expectedDeliveryDate?: string;
  warehouseId: string;
  warehouse?: Warehouse;
  items: PurchaseOrderItem[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  status: PurchaseOrderStatus;
  paymentStatus: PaymentStatus;
  notes?: string;
}

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  product?: Product;
  quantity: number;
  receivedQuantity: number;
  unitPrice: number;
  taxPercentage: number;
  taxAmount: number;
  lineTotal: number;
  notes?: string;
}

// ============= POS =============
export interface POSSession extends BaseEntity {
  sessionNumber: string;
  warehouseId: string;
  warehouse?: Warehouse;
  userId: string;
  user?: User;
  openingTime: string;
  closingTime?: string;
  openingCash: number;
  closingCash?: number;
  expectedCash?: number;
  cashDifference?: number;
  totalSales: number;
  totalTransactions: number;
  status: 'Open' | 'Closed';
  notes?: string;
}

export interface POSTransaction extends BaseEntity {
  transactionNumber: string;
  sessionId: string;
  session?: POSSession;
  customerId?: string;
  customer?: Customer;
  items: POSTransactionItem[];
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  changeAmount: number;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  status: 'Completed' | 'Cancelled' | 'Refunded';
  transactionDate: string;
  notes?: string;
}

export interface POSTransactionItem {
  id: string;
  productId: string;
  product?: Product;
  variantId?: string;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  discountAmount: number;
  taxPercentage: number;
  taxAmount: number;
  lineTotal: number;
}

// ============= Accounting & Finance =============
export interface ChartOfAccount extends BaseEntity {
  accountCode: string;
  accountName: string;
  accountType: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  parentId?: string;
  parent?: ChartOfAccount;
  level: number;
  isActive: boolean;
  balance: number;
}

export interface JournalEntry extends BaseEntity {
  entryNumber: string;
  entryDate: string;
  description: string;
  referenceType?: string;
  referenceId?: string;
  lines: JournalEntryLine[];
  totalDebit: number;
  totalCredit: number;
  status: 'Draft' | 'Posted' | 'Cancelled';
}

export interface JournalEntryLine {
  id: string;
  accountId: string;
  account?: ChartOfAccount;
  debit: number;
  credit: number;
  description?: string;
}

// ============= HR & Payroll =============
export interface Employee extends BaseEntity{
  employeeCode: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address?: string;
  city?: string;
  joinDate: string;
  departmentId?: string;
  department?: Department;
  designationId?: string;
  designation?: Designation;
  position?: string;
  employmentType: 'FullTime' | 'PartTime' | 'Contract';
  salary: number;
  bankAccount?: string;
  taxId?: string;
  profilePicture?: string;
  isActive: boolean;
}

export interface Department extends BaseEntity {
  name: string;
  code: string;
  managerId?: string;
  description?: string;
  isActive: boolean;
}

export interface Designation extends BaseEntity {
  name: string;
  code: string;
  level: number;
  description?: string;
  isActive: boolean;
}

export interface Attendance extends BaseEntity {
  employeeId: string;
  employee?: Employee;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave' | 'Holiday';
  workHours?: number;
  overtimeHours?: number;
  notes?: string;
}

// ============= Subscription & Billing =============
export interface SubscriptionPlanDetails {
  id: string;
  name: SubscriptionPlan;
  displayName: string;
  description: string;
  price: number;
  billingCycle: 'Monthly' | 'Yearly';
  features: SubscriptionFeature[];
  limits: SubscriptionLimits;
  isPopular: boolean;
  isActive: boolean;
}

export interface SubscriptionFeature {
  name: string;
  description: string;
  isIncluded: boolean;
}

export interface SubscriptionLimits {
  maxUsers: number;
  maxProducts: number;
  maxWarehouses: number;
  maxPOSTerminals: number;
  maxMonthlyOrders: number;
  storageGB: number;
  apiCallsPerDay: number;
}

export interface TenantSubscription extends BaseEntity {
  tenantId: string;
  planId: string;
  plan?: SubscriptionPlanDetails;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Cancelled' | 'Suspended';
  autoRenew: boolean;
  nextBillingDate?: string;
  usageMetrics: UsageMetrics;
}

export interface UsageMetrics {
  usersCount: number;
  productsCount: number;
  warehousesCount: number;
  posTerminalsCount: number;
  monthlyOrdersCount: number;
  storageUsedGB: number;
  apiCallsToday: number;
}

// ============= Reports =============
export interface Report {
  id: string;
  name: string;
  category: string;
  description: string;
  parameters: ReportParameter[];
  requiredPermission?: string;
}

export interface ReportParameter {
  name: string;
  label: string;
  type: 'text' | 'date' | 'dateRange' | 'select' | 'multiSelect';
  required: boolean;
  options?: { value: string; label: string }[];
}

// ============= Settings & Configuration =============
export interface CompanySettings extends BaseEntity {
  tenantId: string;
  companyName: string;
  companyLegalName: string;
  taxId: string;
  registrationNumber?: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  currency: string;
  fiscalYearStart: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
}

export interface TaxConfiguration extends BaseEntity {
  name: string;
  taxType: 'VAT' | 'Sales Tax' | 'GST' | 'Custom';
  rate: number;
  isDefault: boolean;
  isActive: boolean;
  applicableFrom?: string;
  applicableTo?: string;
}

// ============= Notifications & Activity =============
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'Info' | 'Success' | 'Warning' | 'Error';
  category: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface ActivityLog extends BaseEntity {
  userId: string;
  user?: User;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ipAddress?: string;
  userAgent?: string;
}

// ============= API Response Types =============
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}
