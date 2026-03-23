/**
 * Validation schemas using Zod
 */

import { z } from 'zod';
import { REGEX } from './constants';

// ============= Common Validators =============
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(100, 'Email must be less than 100 characters');

export const phoneSchema = z
  .string()
  .min(1, 'Phone is required')
  .regex(REGEX.PHONE_BD, 'Invalid phone number. Use format: 01XXXXXXXXX');

export const taxIdSchema = z
  .string()
  .regex(REGEX.TAX_ID_BD, 'Invalid Tax ID. Must be 12 digits');

export const urlSchema = z
  .string()
  .url('Invalid URL')
  .or(z.literal(''));

export const positiveNumber = z
  .number()
  .positive('Must be a positive number');

export const nonNegativeNumber = z
  .number()
  .nonnegative('Must be zero or positive');

// ============= Authentication =============
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// ============= Product =============
export const productSchema = z.object({
  code: z.string().min(1, 'Product code is required').max(50),
  name: z.string().min(1, 'Product name is required').max(200),
  description: z.string().max(1000).optional(),
  type: z.enum(['Hardware', 'Electrical', 'Tool', 'Machinery', 'Spare Part']),
  categoryId: z.string().min(1, 'Category is required'),
  brandId: z.string().optional(),
  unitId: z.string().min(1, 'Unit is required'),
  barcode: z.string().max(50).optional(),
  sku: z.string().min(1, 'SKU is required').max(50),
  costPrice: positiveNumber,
  sellingPrice: positiveNumber,
  minPrice: positiveNumber.optional(),
  taxRate: nonNegativeNumber.max(100, 'Tax rate cannot exceed 100%'),
  isTrackInventory: z.boolean(),
  isBatchTracked: z.boolean(),
  isSerialTracked: z.boolean(),
  reorderLevel: positiveNumber.optional(),
  reorderQuantity: positiveNumber.optional(),
  supplierId: z.string().optional(),
  warrantyMonths: positiveNumber.optional(),
}).refine((data) => data.sellingPrice >= data.costPrice, {
  message: 'Selling price must be greater than or equal to cost price',
  path: ['sellingPrice'],
});

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(100),
  parentId: z.string().optional(),
  description: z.string().max(500).optional(),
  isActive: z.boolean(),
});

export const brandSchema = z.object({
  name: z.string().min(1, 'Brand name is required').max(100),
  description: z.string().max(500).optional(),
  website: urlSchema.optional(),
  isActive: z.boolean(),
});

// ============= Customer =============
export const customerSchema = z.object({
  code: z.string().min(1, 'Customer code is required').max(50),
  name: z.string().min(1, 'Customer name is required').max(200),
  email: emailSchema.optional().or(z.literal('')),
  phone: phoneSchema,
  companyName: z.string().max(200).optional(),
  taxId: z.string().max(50).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  zipCode: z.string().max(10).optional(),
  customerType: z.enum(['Retail', 'Wholesale', 'B2B']),
  creditLimit: positiveNumber.optional(),
  paymentTerms: z.string().max(200).optional(),
  discountPercentage: nonNegativeNumber.max(100).optional(),
  notes: z.string().max(1000).optional(),
});

// ============= Supplier =============
export const supplierSchema = z.object({
  code: z.string().min(1, 'Supplier code is required').max(50),
  name: z.string().min(1, 'Supplier name is required').max(200),
  companyName: z.string().min(1, 'Company name is required').max(200),
  email: emailSchema.optional().or(z.literal('')),
  phone: phoneSchema,
  taxId: z.string().max(50).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  district: z.string().max(100).optional(),
  paymentTerms: z.string().max(200).optional(),
  leadTimeDays: nonNegativeNumber,
  notes: z.string().max(1000).optional(),
});

// ============= Sales Order =============
export const salesOrderItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  variantId: z.string().optional(),
  quantity: positiveNumber,
  unitPrice: positiveNumber,
  discountPercentage: nonNegativeNumber.max(100).optional(),
  taxPercentage: nonNegativeNumber.max(100).optional(),
});

export const salesOrderSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  orderDate: z.string().min(1, 'Order date is required'),
  deliveryDate: z.string().optional(),
  warehouseId: z.string().min(1, 'Warehouse is required'),
  items: z.array(salesOrderItemSchema).min(1, 'At least one item is required'),
  discountPercentage: nonNegativeNumber.max(100).optional(),
  shippingAmount: nonNegativeNumber.optional(),
  notes: z.string().max(1000).optional(),
  shippingAddress: z.string().max(500).optional(),
  billingAddress: z.string().max(500).optional(),
});

// ============= Purchase Order =============
export const purchaseOrderItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  quantity: positiveNumber,
  unitPrice: positiveNumber,
  taxPercentage: nonNegativeNumber.max(100).optional(),
});

export const purchaseOrderSchema = z.object({
  supplierId: z.string().min(1, 'Supplier is required'),
  orderDate: z.string().min(1, 'Order date is required'),
  expectedDeliveryDate: z.string().optional(),
  warehouseId: z.string().min(1, 'Warehouse is required'),
  items: z.array(purchaseOrderItemSchema).min(1, 'At least one item is required'),
  shippingAmount: nonNegativeNumber.optional(),
  notes: z.string().max(1000).optional(),
});

// ============= Stock Adjustment =============
export const stockAdjustmentSchema = z.object({
  warehouseId: z.string().min(1, 'Warehouse is required'),
  productId: z.string().min(1, 'Product is required'),
  quantity: z.number().refine((val) => val !== 0, 'Quantity cannot be zero'),
  type: z.enum(['Add', 'Remove']),
  reason: z.string().min(1, 'Reason is required').max(500),
  batchNumber: z.string().max(50).optional(),
  serialNumbers: z.array(z.string()).optional(),
});

// ============= Stock Transfer =============
export const stockTransferItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  quantity: positiveNumber,
  batchNumber: z.string().max(50).optional(),
  serialNumbers: z.array(z.string()).optional(),
});

export const stockTransferSchema = z.object({
  fromWarehouseId: z.string().min(1, 'Source warehouse is required'),
  toWarehouseId: z.string().min(1, 'Destination warehouse is required'),
  items: z.array(stockTransferItemSchema).min(1, 'At least one item is required'),
  notes: z.string().max(1000).optional(),
}).refine((data) => data.fromWarehouseId !== data.toWarehouseId, {
  message: 'Source and destination warehouses must be different',
  path: ['toWarehouseId'],
});

// ============= Employee =============
export const employeeSchema = z.object({
  employeeCode: z.string().min(1, 'Employee code is required').max(50),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: emailSchema,
  phone: phoneSchema,
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  joinDate: z.string().min(1, 'Join date is required'),
  departmentId: z.string().optional(),
  designationId: z.string().optional(),
  employmentType: z.enum(['FullTime', 'PartTime', 'Contract']),
  salary: positiveNumber,
  bankAccount: z.string().max(50).optional(),
  taxId: z.string().max(50).optional(),
});

// ============= Department =============
export const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required').max(100),
  code: z.string().min(1, 'Department code is required').max(50),
  managerId: z.string().optional(),
  description: z.string().max(500).optional(),
  isActive: z.boolean(),
});

// ============= Journal Entry =============
export const journalEntryLineSchema = z.object({
  accountId: z.string().min(1, 'Account is required'),
  debit: nonNegativeNumber,
  credit: nonNegativeNumber,
  description: z.string().max(500).optional(),
}).refine((data) => data.debit > 0 || data.credit > 0, {
  message: 'Either debit or credit must be greater than zero',
  path: ['debit'],
}).refine((data) => !(data.debit > 0 && data.credit > 0), {
  message: 'Cannot have both debit and credit',
  path: ['credit'],
});

export const journalEntrySchema = z.object({
  entryDate: z.string().min(1, 'Entry date is required'),
  description: z.string().min(1, 'Description is required').max(500),
  referenceType: z.string().optional(),
  referenceId: z.string().optional(),
  lines: z.array(journalEntryLineSchema).min(2, 'At least two lines are required'),
}).refine((data) => {
  const totalDebit = data.lines.reduce((sum, line) => sum + line.debit, 0);
  const totalCredit = data.lines.reduce((sum, line) => sum + line.credit, 0);
  return Math.abs(totalDebit - totalCredit) < 0.01; // Allow small rounding errors
}, {
  message: 'Total debits must equal total credits',
  path: ['lines'],
});

// ============= Company Settings =============
export const companySettingsSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(200),
  companyLegalName: z.string().min(1, 'Legal name is required').max(200),
  taxId: taxIdSchema,
  registrationNumber: z.string().max(50).optional(),
  address: z.string().min(1, 'Address is required').max(500),
  city: z.string().min(1, 'City is required').max(100),
  country: z.string().min(1, 'Country is required').max(100),
  phone: phoneSchema,
  email: emailSchema,
  website: urlSchema.optional(),
  currency: z.string().min(1, 'Currency is required').max(10),
  fiscalYearStart: z.string().min(1, 'Fiscal year start is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  dateFormat: z.string().min(1, 'Date format is required'),
  timeFormat: z.string().min(1, 'Time format is required'),
});

// ============= Tax Configuration =============
export const taxConfigurationSchema = z.object({
  name: z.string().min(1, 'Tax name is required').max(100),
  taxType: z.enum(['VAT', 'Sales Tax', 'GST', 'Custom']),
  rate: nonNegativeNumber.max(100, 'Tax rate cannot exceed 100%'),
  isDefault: z.boolean(),
  applicableFrom: z.string().optional(),
  applicableTo: z.string().optional(),
});

// ============= Helper Functions =============
export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _error: 'Validation failed' } };
  }
};
