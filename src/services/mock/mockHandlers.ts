/**
 * Mock API Service using MSW (Mock Service Worker)
 * Simulates REST API endpoints with realistic delays
 */

import { http, HttpResponse, delay } from 'msw';
import { setupWorker } from 'msw/browser';
import { nanoid } from 'nanoid';
import { initializeMockData } from './mockData';
import { MOCK_DELAY, API_BASE_URL } from '@/shared/utils/constants';
import type {
  PaginatedResponse,
  PaginationParams,
  FilterParams,
} from '@/types/domain';
import type { ApiResponse } from '@/types/domain';

// Initialize mock database
let mockDB = initializeMockData();

// Reset mock data (useful for testing)
export const resetMockData = () => {
  mockDB = initializeMockData();
};

// ============= Helper Functions =============
const applyPagination = <T>(
  data: T[],
  params: PaginationParams
): PaginatedResponse<T> => {
  const { page = 1, pageSize = 20 } = params;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    total: data.length,
    page,
    pageSize,
    totalPages: Math.ceil(data.length / pageSize),
  };
};

const applyFilters = <T extends Record<string, any>>(
  data: T[],
  filters: FilterParams
): T[] => {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      
      // Search across multiple fields
      if (key === 'search' && typeof value === 'string') {
        const searchLower = value.toLowerCase();
        return Object.values(item).some((itemValue) =>
          String(itemValue).toLowerCase().includes(searchLower)
        );
      }

      // Exact match for other filters
      return String(item[key]) === String(value);
    });
  });
};

const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

const errorResponse = (message: string, code?: string): ApiResponse => ({
  success: false,
  message,
  errors: code ? { _error: [message] } : undefined,
});

// ============= Authentication Handlers =============
const authHandlers = [
  // Login
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const body = await request.json() as { email: string; password: string };

    // Mock authentication - accept any email/password for demo
    const user = mockDB.users.find((u) => u.email === body.email) || mockDB.users[0];

    return HttpResponse.json(
      successResponse({
        token: 'mock-jwt-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now(),
        user,
        expiresIn: 3600,
      })
    );
  }),

  // Get current user
  http.get(`${API_BASE_URL}/auth/me`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(successResponse(mockDB.users[0]));
  }),

  // Logout
  http.post(`${API_BASE_URL}/auth/logout`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(successResponse({ message: 'Logged out successfully' }));
  }),
];

// ============= Product Handlers =============
const productHandlers = [
  // List products
  http.get(`${API_BASE_URL}/products`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    const search = url.searchParams.get('search') || '';
    
    let filtered = mockDB.products;
    if (search) {
      filtered = applyFilters(filtered, { search });
    }

    const result = applyPagination(filtered, { page, pageSize });
    return HttpResponse.json(successResponse(result));
  }),

  // Get product by ID
  http.get(`${API_BASE_URL}/products/:id`, async ({ params }) => {
    await delay(MOCK_DELAY);
    const product = mockDB.products.find((p) => p.id === params.id);
    if (!product) {
      return HttpResponse.json(errorResponse('Product not found'), { status: 404 });
    }
    return HttpResponse.json(successResponse(product));
  }),

  // Create product
  http.post(`${API_BASE_URL}/products`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const body = await request.json() as Partial<typeof mockDB.products[0]>;
    const newProduct = {
      ...body,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
    } as typeof mockDB.products[0];
    
    mockDB.products.push(newProduct);
    return HttpResponse.json(successResponse(newProduct), { status: 201 });
  }),

  // Update product
  http.put(`${API_BASE_URL}/products/:id`, async ({ params, request }) => {
    await delay(MOCK_DELAY);
    const body = await request.json() as Partial<typeof mockDB.products[0]>;
    const index = mockDB.products.findIndex((p) => p.id === params.id);
    
    if (index === -1) {
      return HttpResponse.json(errorResponse('Product not found'), { status: 404 });
    }

    mockDB.products[index] = {
      ...mockDB.products[index],
      ...body,
      updatedAt: new Date().toISOString(),
      updatedBy: 'current-user',
    };

    return HttpResponse.json(successResponse(mockDB.products[index]));
  }),

  // Delete product
  http.delete(`${API_BASE_URL}/products/:id`, async ({ params }) => {
    await delay(MOCK_DELAY);
    const index = mockDB.products.findIndex((p) => p.id === params.id);
    
    if (index === -1) {
      return HttpResponse.json(errorResponse('Product not found'), { status: 404 });
    }

    mockDB.products.splice(index, 1);
    return HttpResponse.json(successResponse({ message: 'Product deleted' }));
  }),
];

// ============= Category Handlers =============
const categoryHandlers = [
  http.get(`${API_BASE_URL}/categories`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(successResponse(mockDB.categories));
  }),

  http.post(`${API_BASE_URL}/categories`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const body = await request.json() as Partial<typeof mockDB.categories[0]>;
    const newCategory = {
      ...body,
      id: `cat-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
    } as typeof mockDB.categories[0];
    
    mockDB.categories.push(newCategory);
    return HttpResponse.json(successResponse(newCategory), { status: 201 });
  }),
];

// ============= Customer Handlers =============
const customerHandlers = [
  http.get(`${API_BASE_URL}/customers`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    const search = url.searchParams.get('search') || '';
    
    let filtered = mockDB.customers;
    if (search) {
      filtered = applyFilters(filtered, { search });
    }

    const result = applyPagination(filtered, { page, pageSize });
    return HttpResponse.json(successResponse(result));
  }),

  http.get(`${API_BASE_URL}/customers/:id`, async ({ params }) => {
    await delay(MOCK_DELAY);
    const customer = mockDB.customers.find((c) => c.id === params.id);
    if (!customer) {
      return HttpResponse.json(errorResponse('Customer not found'), { status: 404 });
    }
    return HttpResponse.json(successResponse(customer));
  }),

  http.post(`${API_BASE_URL}/customers`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const body = await request.json() as Partial<typeof mockDB.customers[0]>;
    const newCustomer = {
      ...body,
      id: `cust-${Date.now()}`,
      creditUsed: 0,
      loyaltyPoints: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
    } as typeof mockDB.customers[0];
    
    mockDB.customers.push(newCustomer);
    return HttpResponse.json(successResponse(newCustomer), { status: 201 });
  }),
];

// ============= Inventory Handlers =============
const inventoryHandlers = [
  http.get(`${API_BASE_URL}/inventory/stock-levels`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    const warehouseId = url.searchParams.get('warehouseId');
    
    let filtered = mockDB.stockLevels;
    if (warehouseId) {
      filtered = filtered.filter((s) => s.warehouseId === warehouseId);
    }

    const result = applyPagination(filtered, { page, pageSize });
    return HttpResponse.json(successResponse(result));
  }),
];

// ============= Dashboard Handlers =============
const dashboardHandlers = [
  http.get(`${API_BASE_URL}/dashboard/kpis`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(
      successResponse({
        totalRevenue: { value: 1250000, trend: 12.5, comparison: 'lastMonth' },
        totalOrders: { value: 342, trend: 8.3, comparison: 'lastMonth' },
        totalCustomers: { value: mockDB.customers.length, trend: 15.2, comparison: 'lastMonth' },
        lowStockProducts: { value: 23, trend: -5.1, comparison: 'lastMonth' },
        pendingOrders: 45,
        pendingPayments: 23,
      })
    );
  }),

  http.get(`${API_BASE_URL}/dashboard/sales-chart`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(
      successResponse({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: [120000, 135000, 148000, 142000, 165000, 178000, 192000, 185000, 198000, 210000, 225000, 240000],
          },
        ],
      })
    );
  }),
];

// ============= Warehouse Handlers =============
const warehouseHandlers = [
  http.get(`${API_BASE_URL}/warehouses`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(successResponse(mockDB.warehouses));
  }),
];

// ============= Supplier Handlers =============
const supplierHandlers = [
  http.get(`${API_BASE_URL}/suppliers`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    
    const result = applyPagination(mockDB.suppliers, { page, pageSize });
    return HttpResponse.json(successResponse(result));
  }),
];

// ============= Employee Handlers =============
const employeeHandlers = [
  http.get(`${API_BASE_URL}/employees`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    
    const result = applyPagination(mockDB.employees, { page, pageSize });
    return HttpResponse.json(successResponse(result));
  }),
];

// ============= Department Handlers =============
const departmentHandlers = [
  http.get(`${API_BASE_URL}/departments`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(successResponse(mockDB.departments));
  }),
];

// ============= Sales Handlers =============
const salesHandlers = [
  http.get(`${API_BASE_URL}/sales/orders`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = parseInt(url.searchParams.get('pageSize') || '20');
    
    // Generate mock sales orders
    const salesOrders = Array.from({ length: 50 }, (_, i) => ({
      id: `SO-${String(i + 1).padStart(4, '0')}`,
      orderNumber: `SO-2026-${String(i + 1).padStart(4, '0')}`,
      customerId: mockDB.customers[i % mockDB.customers.length]?.id || 'customer-1',
      customer: mockDB.customers[i % mockDB.customers.length],
      orderDate: new Date(2026, 2, Math.floor(Math.random() * 23) + 1).toISOString(),
      status: ['Draft', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'][Math.floor(Math.random() * 6)],
      paymentStatus: ['Pending', 'Partial', 'Paid'][Math.floor(Math.random() * 3)],
      subtotal: 50000 + Math.random() * 200000,
      tax: 5000 + Math.random() * 20000,
      discount: Math.random() * 10000,
      total: 55000 + Math.random() * 220000,
      items: [],
      notes: 'Mock sales order',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    
    const result = applyPagination(salesOrders, { page, pageSize });
    return HttpResponse.json(successResponse(result));
  }),

  http.get(`${API_BASE_URL}/sales/orders/:id`, async ({ params }) => {
    await delay(MOCK_DELAY);
    const order = {
      id: params.id,
      orderNumber: `SO-2026-0001`,
      customerId: mockDB.customers[0]?.id,
      customer: mockDB.customers[0],
      orderDate: new Date().toISOString(),
      status: 'Confirmed',
      paymentStatus: 'Paid',
      subtotal: 150000,
      tax: 15000,
      discount: 5000,
      total: 160000,
      items: mockDB.products.slice(0, 3).map(p => ({
        productId: p.id,
        product: p,
        quantity: Math.floor(Math.random() * 10) + 1,
        unitPrice: p.sellingPrice,
        total: p.sellingPrice * (Math.floor(Math.random() * 10) + 1),
      })),
      notes: 'Mock sales order',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(successResponse(order));
  }),
];

// ============= POS Handlers =============
const posHandlers = [
  http.get(`${API_BASE_URL}/pos/sessions`, async () => {
    await delay(MOCK_DELAY);
    const sessions = Array.from({ length: 10 }, (_, i) => ({
      id: `session-${i + 1}`,
      sessionNumber: `POS-${String(i + 1).padStart(4, '0')}`,
      warehouseId: mockDB.warehouses[0]?.id,
      warehouse: mockDB.warehouses[0],
      userId: mockDB.users[0]?.id,
      user: mockDB.users[0],
      openedAt: new Date(2026, 2, 23, 9, 0).toISOString(),
      closedAt: i < 5 ? new Date(2026, 2, 23, 18, 0).toISOString() : null,
      status: i < 5 ? 'Closed' : 'Open',
      openingCash: 10000,
      closingCash: i < 5 ? 50000 : null,
      totalSales: i < 5 ? 45000 : 25000,
      cashSales: i < 5 ? 30000 : 15000,
      cardSales: i < 5 ? 15000 : 10000,
      returns: i < 5 ? 2000 : 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    return HttpResponse.json(successResponse(sessions));
  }),

  http.post(`${API_BASE_URL}/pos/sessions/open`, async () => {
    await delay(MOCK_DELAY);
    const session = {
      id: `session-new`,
      sessionNumber: `POS-NEW`,
      status: 'Open',
      openedAt: new Date().toISOString(),
      openingCash: 10000,
    };
    return HttpResponse.json(successResponse(session), { status: 201 });
  }),

  http.post(`${API_BASE_URL}/pos/sales`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(successResponse({ 
      id: 'sale-new',
      receiptNumber: 'RCP-' + Date.now(),
      total: 5000,
      status: 'Completed' 
    }), { status: 201 });
  }),
];

// ============= Report Handlers =============
const reportHandlers = [
  http.get(`${API_BASE_URL}/reports/sales`, async () => {
    await delay(MOCK_DELAY);
    const report = {
      totalSales: 5850000,
      totalOrders: 245,
      averageOrderValue: 23877,
      topProducts: mockDB.products.slice(0, 10).map(p => ({
        productId: p.id,
        productName: p.name,
        quantity: Math.floor(Math.random() * 100) + 50,
        revenue: p.sellingPrice * (Math.floor(Math.random() * 100) + 50),
      })),
      salesByCategory: mockDB.categories.slice(0, 5).map(c => ({
        categoryId: c.id,
        categoryName: c.name,
        sales: Math.floor(Math.random() * 500000) + 100000,
      })),
      salesTrend: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(2026, 2, i + 1).toISOString().split('T')[0],
        sales: Math.floor(Math.random() * 50000) + 100000,
      })),
    };
    return HttpResponse.json(successResponse(report));
  }),

  http.get(`${API_BASE_URL}/reports/inventory`, async () => {
    await delay(MOCK_DELAY);
    const report = {
      totalValue: 12500000,
      lowStockItems: 15,
      outOfStockItems: 3,
      stockByWarehouse: mockDB.warehouses.map(w => ({
        warehouseId: w.id,
        warehouseName: w.name,
        stockValue: Math.floor(Math.random() * 2000000) + 500000,
        itemCount: Math.floor(Math.random() * 200) + 50,
      })),
      topMovingItems: mockDB.products.slice(0, 10).map(p => ({
        productId: p.id,
        productName: p.name,
        movementCount: Math.floor(Math.random() * 500) + 100,
      })),
    };
    return HttpResponse.json(successResponse(report));
  }),

  http.get(`${API_BASE_URL}/reports/financial`, async () => {
    await delay(MOCK_DELAY);
    const report = {
      revenue: 5850000,
      expenses: 3200000,
      profit: 2650000,
      profitMargin: 45.3,
      revenueByMonth: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2026, i, 1).toISOString().split('T')[0],
        revenue: Math.floor(Math.random() * 500000) + 300000,
        expenses: Math.floor(Math.random() * 300000) + 150000,
      })),
    };
    return HttpResponse.json(successResponse(report));
  }),
];

// ============= Settings Handlers =============
const settingsHandlers = [
  http.get(`${API_BASE_URL}/settings/company`, async () => {
    await delay(MOCK_DELAY);
    const settings = {
      id: 'company-1',
      name: 'Nabab ERP POS Solution',
      legalName: 'Nabab Technologies Ltd.',
      email: 'info@nabab.com',
      phone: '+880 1712-345678',
      website: 'https://nabab.com',
      address: 'House 123, Road 45, Gulshan-2',
      city: 'Dhaka',
      country: 'Bangladesh',
      taxId: '123456789012',
      businessType: 'Limited Company',
      fiscalYearStart: '01-07',
      currency: 'BDT',
      timezone: 'Asia/Dhaka',
      logo: null,
    };
    return HttpResponse.json(successResponse(settings));
  }),

  http.put(`${API_BASE_URL}/settings/company`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const body = await request.json();
    return HttpResponse.json(successResponse(body));
  }),

  http.get(`${API_BASE_URL}/settings/tax`, async () => {
    await delay(MOCK_DELAY);
    const taxRates = [
      { id: '1', name: 'VAT 15%', rate: 15, isDefault: true, isActive: true },
      { id: '2', name: 'VAT 5%', rate: 5, isDefault: false, isActive: true },
      { id: '3', name: 'No Tax', rate: 0, isDefault: false, isActive: true },
    ];
    return HttpResponse.json(successResponse(taxRates));
  }),

  http.get(`${API_BASE_URL}/settings/users`, async () => {
    await delay(MOCK_DELAY);
    return HttpResponse.json(successResponse(mockDB.users));
  }),

  http.post(`${API_BASE_URL}/settings/users`, async ({ request }) => {
    await delay(MOCK_DELAY);
    const body = await request.json() as any;
    const newUser = {
      id: nanoid(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    mockDB.users.push(newUser);
    return HttpResponse.json(successResponse(newUser), { status: 201 });
  }),
];

// ============= Combine all handlers =============
export const handlers = [
  ...authHandlers,
  ...productHandlers,
  ...categoryHandlers,
  ...customerHandlers,
  ...inventoryHandlers,
  ...dashboardHandlers,
  ...warehouseHandlers,
  ...supplierHandlers,
  ...employeeHandlers,
  ...departmentHandlers,
  ...salesHandlers,
  ...posHandlers,
  ...reportHandlers,
  ...settingsHandlers,
];

// Create MSW worker
export const worker = setupWorker(...handlers);

// Start mock service worker
export const startMockServiceWorker = async () => {
  if (typeof window !== 'undefined') {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    console.log('🔶 Mock Service Worker started');
  }
};
