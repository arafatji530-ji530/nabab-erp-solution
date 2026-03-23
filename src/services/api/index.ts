/**
 * API Service Layer
 * Centralized API calls using consistent patterns
 */

import { api } from './apiClient';
import { buildQueryString } from '@/shared/utils/formatters';
import type {
  PaginatedResponse,
  PaginationParams,
  Product,
  Category,
  Brand,
  Unit,
  Customer,
  Supplier,
  Warehouse,
  StockLevel,
  Employee,
  Department,
  SalesOrder,
  PurchaseOrder,
  User,
} from '@/types/domain';
import type * as API from '@/types/api';

// ============= Authentication Service =============
export const authService = {
  login: (data: API.AuthAPI.LoginRequest) =>
    api.post<API.AuthAPI.LoginResponse>('/auth/login', data),

  logout: () => api.post<void>('/auth/logout'),

  getCurrentUser: () => api.get<User>('/auth/me'),

  forgotPassword: (data: API.AuthAPI.ForgotPasswordRequest) =>
    api.post<void>('/auth/forgot-password', data),

  resetPassword: (data: API.AuthAPI.ResetPasswordRequest) =>
    api.post<void>('/auth/reset-password', data),

  changePassword: (data: API.AuthAPI.ChangePasswordRequest) =>
    api.post<void>('/auth/change-password', data),
};

// ============= Product Service =============
export const productService = {
  list: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<PaginatedResponse<Product>>(`/products${query}`);
  },

  get: (id: string) => api.get<Product>(`/products/${id}`),

  create: (data: API.ProductAPI.CreateRequest) =>
    api.post<Product>('/products', data),

  update: (id: string, data: API.ProductAPI.UpdateRequest) =>
    api.put<Product>(`/products/${id}`, data),

  delete: (id: string) => api.delete<void>(`/products/${id}`),

  bulkImport: (data: API.ProductAPI.BulkImportRequest) =>
    api.post<API.ProductAPI.BulkImportResponse>('/products/bulk-import', data),
};

// ============= Category Service =============
export const categoryService = {
  list: () => api.get<Category[]>('/categories'),

  get: (id: string) => api.get<Category>(`/categories/${id}`),

  create: (data: API.CategoryAPI.CreateRequest) =>
    api.post<Category>('/categories', data),

  update: (id: string, data: API.CategoryAPI.UpdateRequest) =>
    api.put<Category>(`/categories/${id}`, data),

  delete: (id: string) => api.delete<void>(`/categories/${id}`),
};

// ============= Brand Service =============
export const brandService = {
  list: () => api.get<Brand[]>('/brands'),

  get: (id: string) => api.get<Brand>(`/brands/${id}`),

  create: (data: Partial<Brand>) => api.post<Brand>('/brands', data),

  update: (id: string, data: Partial<Brand>) =>
    api.put<Brand>(`/brands/${id}`, data),

  delete: (id: string) => api.delete<void>(`/brands/${id}`),
};

// ============= Unit Service =============
export const unitService = {
  list: () => api.get<Unit[]>('/units'),

  get: (id: string) => api.get<Unit>(`/units/${id}`),

  create: (data: Partial<Unit>) => api.post<Unit>('/units', data),

  update: (id: string, data: Partial<Unit>) => api.put<Unit>(`/units/${id}`, data),

  delete: (id: string) => api.delete<void>(`/units/${id}`),
};

// ============= Customer Service =============
export const customerService = {
  list: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<PaginatedResponse<Customer>>(`/customers${query}`);
  },

  get: (id: string) => api.get<Customer>(`/customers/${id}`),

  create: (data: API.CustomerAPI.CreateRequest) =>
    api.post<Customer>('/customers', data),

  update: (id: string, data: API.CustomerAPI.UpdateRequest) =>
    api.put<Customer>(`/customers/${id}`, data),

  delete: (id: string) => api.delete<void>(`/customers/${id}`),

  getStatement360: (id: string, params?: Record<string, string>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<API.CustomerAPI.Statement360Response>(
      `/customers/${id}/statement${query}`
    );
  },
};

// ============= Supplier Service =============
export const supplierService = {
  list: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<PaginatedResponse<Supplier>>(`/suppliers${query}`);
  },

  get: (id: string) => api.get<Supplier>(`/suppliers/${id}`),

  create: (data: API.SupplierAPI.CreateRequest) =>
    api.post<Supplier>('/suppliers', data),

  update: (id: string, data: API.SupplierAPI.UpdateRequest) =>
    api.put<Supplier>(`/suppliers/${id}`, data),

  delete: (id: string) => api.delete<void>(`/suppliers/${id}`),
};

// ============= Warehouse Service =============
export const warehouseService = {
  list: () => api.get<Warehouse[]>('/warehouses'),

  get: (id: string) => api.get<Warehouse>(`/warehouses/${id}`),

  create: (data: Partial<Warehouse>) => api.post<Warehouse>('/warehouses', data),

  update: (id: string, data: Partial<Warehouse>) =>
    api.put<Warehouse>(`/warehouses/${id}`, data),

  delete: (id: string) => api.delete<void>(`/warehouses/${id}`),
};

// ============= Inventory Service =============
export const inventoryService = {
  getStockLevels: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<PaginatedResponse<StockLevel>>(`/inventory/stock-levels${query}`);
  },

  adjustStock: (data: API.InventoryAPI.StockAdjustmentRequest) =>
    api.post<void>('/inventory/adjustment', data),

  transferStock: (data: API.InventoryAPI.TransferRequest) =>
    api.post<void>('/inventory/transfer', data),

  getTransfers: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<API.InventoryAPI.TransferListResponse>(
      `/inventory/transfers${query}`
    );
  },
};

// ============= Sales Service =============
export const salesService = {
  listOrders: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<PaginatedResponse<SalesOrder>>(`/sales/orders${query}`);
  },

  getOrder: (id: string) => api.get<SalesOrder>(`/sales/orders/${id}`),

  createOrder: (data: API.SalesAPI.CreateOrderRequest) =>
    api.post<SalesOrder>('/sales/orders', data),

  updateOrder: (id: string, data: API.SalesAPI.UpdateOrderRequest) =>
    api.put<SalesOrder>(`/sales/orders/${id}`, data),

  deleteOrder: (id: string) => api.delete<void>(`/sales/orders/${id}`),
};

// ============= Purchase Service =============
export const purchaseService = {
  listOrders: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<PaginatedResponse<PurchaseOrder>>(`/purchase/orders${query}`);
  },

  getOrder: (id: string) => api.get<PurchaseOrder>(`/purchase/orders/${id}`),

  createOrder: (data: API.PurchaseAPI.CreatePORequest) =>
    api.post<PurchaseOrder>('/purchase/orders', data),

  updateOrder: (id: string, data: API.PurchaseAPI.UpdatePORequest) =>
    api.put<PurchaseOrder>(`/purchase/orders/${id}`, data),

  deleteOrder: (id: string) => api.delete<void>(`/purchase/orders/${id}`),

  receiveGoods: (data: API.PurchaseAPI.ReceiveGoodsRequest) =>
    api.post<void>('/purchase/receive', data),
};

// ============= Employee Service =============
export const employeeService = {
  list: (params?: PaginationParams & Record<string, unknown>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<PaginatedResponse<Employee>>(`/employees${query}`);
  },

  get: (id: string) => api.get<Employee>(`/employees/${id}`),

  create: (data: API.HRAPI.CreateEmployeeRequest) =>
    api.post<Employee>('/employees', data),

  update: (id: string, data: API.HRAPI.UpdateEmployeeRequest) =>
    api.put<Employee>(`/employees/${id}`, data),

  delete: (id: string) => api.delete<void>(`/employees/${id}`),
};

// ============= Department Service =============
export const departmentService = {
  list: () => api.get<Department[]>('/departments'),

  get: (id: string) => api.get<Department>(`/departments/${id}`),

  create: (data: Partial<Department>) =>
    api.post<Department>('/departments', data),

  update: (id: string, data: Partial<Department>) =>
    api.put<Department>(`/departments/${id}`, data),

  delete: (id: string) => api.delete<void>(`/departments/${id}`),
};

// ============= Dashboard Service =============
export const dashboardService = {
  getKPIs: () => api.get<API.DashboardAPI.KPIResponse>('/dashboard/kpis'),

  getSalesChart: (params?: Record<string, string>) => {
    const query = params ? `?${buildQueryString(params)}` : '';
    return api.get<API.DashboardAPI.SalesChartResponse>(`/dashboard/sales-chart${query}`);
  },

  getTopProducts: () =>
    api.get<API.DashboardAPI.TopProductsResponse>('/dashboard/top-products'),

  getRecentActivities: () =>
    api.get<API.DashboardAPI.RecentActivitiesResponse>('/dashboard/recent-activities'),
};

// Export all services
export const apiService = {
  auth: authService,
  products: productService,
  categories: categoryService,
  brands: brandService,
  units: unitService,
  customers: customerService,
  suppliers: supplierService,
  warehouses: warehouseService,
  inventory: inventoryService,
  sales: salesService,
  purchase: purchaseService,
  employees: employeeService,
  departments: departmentService,
  dashboard: dashboardService,
};
