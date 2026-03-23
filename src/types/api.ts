/**
 * API contract types generated from OpenAPI specification
 * This file would normally be auto-generated from OpenAPI spec
 */

import type {
  User,
  Product,
  Category,
  Brand,
  Unit,
  Warehouse,
  StockLevel,
  StockTransaction,
  StockTransfer,
  Customer,
  SalesOrder,
  Invoice,
  Supplier,
  PurchaseOrder,
  POSSession,
  POSTransaction,
  ChartOfAccount,
  JournalEntry,
  Employee,
  Department,
  Designation,
  Attendance,
  SubscriptionPlanDetails,
  TenantSubscription,
  CompanySettings,
  TaxConfiguration,
  Notification,
  ActivityLog,
  PaginatedResponse,
  PaginationParams,
  FilterParams,
} from './domain';

// ============= Authentication Endpoints =============
export namespace AuthAPI {
  export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
  }

  export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
    expiresIn: number;
  }

  export interface RefreshTokenRequest {
    refreshToken: string;
  }

  export interface ForgotPasswordRequest {
    email: string;
  }

  export interface ResetPasswordRequest {
    token: string;
    password: string;
    confirmPassword: string;
  }

  export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
}

// ============= Product Endpoints =============
export namespace ProductAPI {
  export interface ListRequest extends PaginationParams, FilterParams {
    type?: string;
    categoryId?: string;
    brandId?: string;
    status?: string;
    priceMin?: number;
    priceMax?: number;
  }

  export type ListResponse = PaginatedResponse<Product>;

  export interface CreateRequest {
    code: string;
    name: string;
    description?: string;
    type: string;
    categoryId: string;
    brandId?: string;
    unitId: string;
    barcode?: string;
    sku: string;
    specifications?: Record<string, string>;
    costPrice: number;
    sellingPrice: number;
    minPrice?: number;
    taxRate: number;
    isTrackInventory: boolean;
    isBatchTracked: boolean;
    isSerialTracked: boolean;
    reorderLevel?: number;
    reorderQuantity?: number;
    supplierId?: string;
    warrantyMonths?: number;
  }

  export interface UpdateRequest extends Partial<CreateRequest> {
    id: string;
  }

  export interface BulkImportRequest {
    file: File;
    overwriteExisting: boolean;
  }

  export interface BulkImportResponse {
    success: number;
    failed: number;
    errors: Array<{ row: number; error: string }>;
  }
}

// ============= Category Endpoints =============
export namespace CategoryAPI {
  export type ListResponse = Category[];

  export interface CreateRequest {
    name: string;
    parentId?: string;
    description?: string;
    isActive: boolean;
  }

  export interface UpdateRequest extends Partial<CreateRequest> {
    id: string;
  }
}

// ============= Inventory Endpoints =============
export namespace InventoryAPI {
  export interface StockLevelRequest extends PaginationParams, FilterParams {
    warehouseId?: string;
    productId?: string;
    lowStockOnly?: boolean;
  }

  export type StockLevelResponse = PaginatedResponse<StockLevel>;

  export interface StockAdjustmentRequest {
    warehouseId: string;
    productId: string;
    quantity: number;
    type: 'Add' | 'Remove';
    reason: string;
    batchNumber?: string;
    serialNumbers?: string[];
  }

  export interface TransferRequest {
    fromWarehouseId: string;
    toWarehouseId: string;
    items: Array<{
      productId: string;
      quantity: number;
      batchNumber?: string;
      serialNumbers?: string[];
    }>;
    notes?: string;
  }

  export interface TransferListRequest extends PaginationParams, FilterParams {
    status?: string;
    fromWarehouseId?: string;
    toWarehouseId?: string;
  }

  export type TransferListResponse = PaginatedResponse<StockTransfer>;
}

// ============= Sales Endpoints =============
export namespace SalesAPI {
  export interface OrderListRequest extends PaginationParams, FilterParams {
    customerId?: string;
    status?: string;
    paymentStatus?: string;
    dateFrom?: string;
    dateTo?: string;
  }

  export type OrderListResponse = PaginatedResponse<SalesOrder>;

  export interface CreateOrderRequest {
    customerId: string;
    orderDate: string;
    deliveryDate?: string;
    warehouseId: string;
    items: Array<{
      productId: string;
      variantId?: string;
      quantity: number;
      unitPrice: number;
      discountPercentage?: number;
      taxPercentage?: number;
    }>;
    discountPercentage?: number;
    shippingAmount?: number;
    notes?: string;
    shippingAddress?: string;
    billingAddress?: string;
  }

  export interface UpdateOrderRequest extends Partial<CreateOrderRequest> {
    id: string;
  }

  export interface CreateInvoiceRequest {
    salesOrderId?: string;
    customerId: string;
    invoiceDate: string;
    dueDate: string;
    items: Array<{
      productId: string;
      description: string;
      quantity: number;
      unitPrice: number;
      discountAmount?: number;
      taxAmount?: number;
    }>;
    notes?: string;
    termsAndConditions?: string;
  }
}

// ============= Purchase Endpoints =============
export namespace PurchaseAPI {
  export interface POListRequest extends PaginationParams, FilterParams {
    supplierId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }

  export type POListResponse = PaginatedResponse<PurchaseOrder>;

  export interface CreatePORequest {
    supplierId: string;
    orderDate: string;
    expectedDeliveryDate?: string;
    warehouseId: string;
    items: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
      taxPercentage?: number;
    }>;
    shippingAmount?: number;
    notes?: string;
  }

  export interface UpdatePORequest extends Partial<CreatePORequest> {
    id: string;
  }

  export interface ReceiveGoodsRequest {
    purchaseOrderId: string;
    receivedDate: string;
    items: Array<{
      id: string; // PO item ID
      receivedQuantity: number;
      batchNumber?: string;
      serialNumbers?: string[];
    }>;
    notes?: string;
  }
}

// ============= Customer Endpoints =============
export namespace CustomerAPI {
  export interface ListRequest extends PaginationParams, FilterParams {
    customerType?: string;
    city?: string;
    isActive?: boolean;
  }

  export type ListResponse = PaginatedResponse<Customer>;

  export interface CreateRequest {
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
    paymentTerms?: string;
    discountPercentage?: number;
    notes?: string;
  }

  export interface UpdateRequest extends Partial<CreateRequest> {
    id: string;
  }

  export interface Statement360Request {
    customerId: string;
    dateFrom?: string;
    dateTo?: string;
  }

  export interface Statement360Response {
    customer: Customer;
    orders: SalesOrder[];
    invoices: Invoice[];
    payments: unknown[];
    totalOrders: number;
    totalRevenue: number;
    outstandingBalance: number;
    loyaltyPoints: number;
  }
}

// ============= Supplier Endpoints =============
export namespace SupplierAPI {
  export interface ListRequest extends PaginationParams, FilterParams {
    city?: string;
    isActive?: boolean;
  }

  export type ListResponse = PaginatedResponse<Supplier>;

  export interface CreateRequest {
    code: string;
    name: string;
    companyName: string;
    email?: string;
    phone: string;
    taxId?: string;
    address?: string;
    city?: string;
    district?: string;
    paymentTerms?: string;
    leadTimeDays: number;
    notes?: string;
  }

  export interface UpdateRequest extends Partial<CreateRequest> {
    id: string;
  }
}

// ============= POS Endpoints =============
export namespace POSAPI {
  export interface OpenSessionRequest {
    warehouseId: string;
    openingCash: number;
    notes?: string;
  }

  export interface CloseSessionRequest {
    sessionId: string;
    closingCash: number;
    notes?: string;
  }

  export interface CreateTransactionRequest {
    sessionId: string;
    customerId?: string;
    items: Array<{
      productId: string;
      variantId?: string;
      quantity: number;
      unitPrice: number;
      discountPercentage?: number;
      taxPercentage?: number;
    }>;
    paymentMethod: string;
    paidAmount: number;
    paymentReference?: string;
    notes?: string;
  }

  export interface TransactionListRequest extends PaginationParams, FilterParams {
    sessionId?: string;
    customerId?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }

  export type TransactionListResponse = PaginatedResponse<POSTransaction>;
}

// ============= Accounting Endpoints =============
export namespace AccountingAPI {
  export type ChartOfAccountsResponse = ChartOfAccount[];

  export interface CreateJournalEntryRequest {
    entryDate: string;
    description: string;
    referenceType?: string;
    referenceId?: string;
    lines: Array<{
      accountId: string;
      debit: number;
      credit: number;
      description?: string;
    }>;
  }

  export interface FinancialReportRequest {
    reportType: 'TrialBalance' | 'ProfitAndLoss' | 'BalanceSheet' | 'CashFlow';
    dateFrom: string;
    dateTo: string;
    consolidate?: boolean;
  }

  export interface FinancialReportResponse {
    reportType: string;
    period: { from: string; to: string };
    data: unknown[];
    summary: Record<string, number>;
  }
}

// ============= HR Endpoints =============
export namespace HRAPI {
  export interface EmployeeListRequest extends PaginationParams, FilterParams {
    departmentId?: string;
    designationId?: string;
    employmentType?: string;
    isActive?: boolean;
  }

  export type EmployeeListResponse = PaginatedResponse<Employee>;

  export interface CreateEmployeeRequest {
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    address?: string;
    city?: string;
    joinDate: string;
    departmentId?: string;
    designationId?: string;
    employmentType: 'FullTime' | 'PartTime' | 'Contract';
    salary: number;
    bankAccount?: string;
    taxId?: string;
  }

  export interface UpdateEmployeeRequest extends Partial<CreateEmployeeRequest> {
    id: string;
  }

  export interface AttendanceRequest {
    employeeId: string;
    date: string;
    checkIn?: string;
    checkOut?: string;
    status: string;
    notes?: string;
  }

  export interface PayrollRequest {
    month: string; // YYYY-MM
    departmentId?: string;
  }

  export interface PayrollResponse {
    month: string;
    employees: Array<{
      employeeId: string;
      employee: Employee;
      basicSalary: number;
      allowances: number;
      deductions: number;
      netSalary: number;
      workDays: number;
      absentDays: number;
      overtimeHours: number;
    }>;
    totalGross: number;
    totalNet: number;
  }
}

// ============= Subscription Endpoints =============
export namespace SubscriptionAPI {
  export type PlansResponse = SubscriptionPlanDetails[];

  export interface GetCurrentSubscriptionResponse {
    subscription: TenantSubscription;
    plan: SubscriptionPlanDetails;
    usage: {
      usersCount: number;
      productsCount: number;
      warehousesCount: number;
      posTerminalsCount: number;
      monthlyOrdersCount: number;
      storageUsedGB: number;
      apiCallsToday: number;
    };
  }

  export interface UpgradeRequest {
    planId: string;
    billingCycle: 'Monthly' | 'Yearly';
    paymentMethodId?: string;
  }

  export interface InvoiceListRequest extends PaginationParams {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  }

  export interface SubscriptionInvoice {
    id: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Unpaid' | 'Overdue';
    pdfUrl?: string;
  }

  export type InvoiceListResponse = PaginatedResponse<SubscriptionInvoice>;
}

// ============= Report Endpoints =============
export namespace ReportAPI {
  export interface GenerateReportRequest {
    reportId: string;
    parameters: Record<string, unknown>;
    format?: 'json' | 'pdf' | 'excel';
  }

  export interface GenerateReportResponse {
    reportId: string;
    generatedAt: string;
    format: string;
    data?: unknown;
    downloadUrl?: string;
  }

  export interface ScheduleReportRequest {
    reportId: string;
    parameters: Record<string, unknown>;
    schedule: {
      frequency: 'Daily' | 'Weekly' | 'Monthly';
      time: string;
      recipients: string[];
    };
    format: 'pdf' | 'excel';
  }
}

// ============= Settings Endpoints =============
export namespace SettingsAPI {
  export type GetCompanySettingsResponse = CompanySettings;

  export interface UpdateCompanySettingsRequest extends Partial<CompanySettings> {}

  export type GetTaxConfigurationsResponse = TaxConfiguration[];

  export interface CreateTaxConfigRequest {
    name: string;
    taxType: 'VAT' | 'Sales Tax' | 'GST' | 'Custom';
    rate: number;
    isDefault: boolean;
    applicableFrom?: string;
    applicableTo?: string;
  }

  export interface UpdateTaxConfigRequest extends Partial<CreateTaxConfigRequest> {
    id: string;
  }

  export interface UserPermissionRequest {
    userId: string;
    permissions: string[];
  }
}

// ============= Notification Endpoints =============
export namespace NotificationAPI {
  export interface ListRequest extends PaginationParams {
    isRead?: boolean;
    category?: string;
    dateFrom?: string;
    dateTo?: string;
  }

  export type ListResponse = PaginatedResponse<Notification>;

  export interface MarkAsReadRequest {
    notificationIds: string[];
  }

  export interface MarkAllAsReadRequest {
    before?: string; // date
  }
}

// ============= Activity Log Endpoints =============
export namespace ActivityLogAPI {
  export interface ListRequest extends PaginationParams, FilterParams {
    userId?: string;
    entityType?: string;
    entityId?: string;
    action?: string;
    dateFrom?: string;
    dateTo?: string;
  }

  export type ListResponse = PaginatedResponse<ActivityLog>;
}

// ============= Dashboard Endpoints =============
export namespace DashboardAPI {
  export interface KPIResponse {
    totalRevenue: {
      value: number;
      trend: number;
      comparison: 'lastMonth' | 'lastYear';
    };
    totalOrders: {
      value: number;
      trend: number;
      comparison: 'lastMonth' | 'lastYear';
    };
    totalCustomers: {
      value: number;
      trend: number;
      comparison: 'lastMonth' | 'lastYear';
    };
    lowStockProducts: {
      value: number;
      trend: number;
      comparison: 'lastMonth' | 'lastYear';
    };
    pendingOrders: number;
    pendingPayments: number;
  }

  export interface SalesChartRequest {
    period: 'day' | 'week' | 'month' | 'year';
    dateFrom?: string;
    dateTo?: string;
  }

  export interface SalesChartResponse {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
    }>;
  }

  export interface TopProductsResponse {
    products: Array<{
      productId: string;
      product: Product;
      quantity: number;
      revenue: number;
    }>;
  }

  export interface RecentActivitiesResponse {
    activities: Array<{
      id: string;
      type: string;
      description: string;
      timestamp: string;
      user: string;
    }>;
  }
}
