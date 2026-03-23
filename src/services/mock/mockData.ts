/**
 * Mock Data Generator using Faker.js
 * Generates realistic Bangladesh-specific data for all entities
 */

import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import type {
  User,
  Product,
  Category,
  Brand,
  Unit,
  Warehouse,
  StockLevel,
  Customer,
  Supplier,
  SalesOrder,
  PurchaseOrder,
  POSSession,
  Employee,
  Department,
  Designation,
  ChartOfAccount,
  SubscriptionPlanDetails,
} from '@/types/domain';
import { BD_DISTRICTS } from '@/shared/utils/constants';

// Seed faker for consistent data
faker.seed(12345);

// ============= Helper Functions =============
const randomElement = <T,>(array: readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)]!;
};

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomFloat = (min: number, max: number, decimals = 2): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
};

const pastDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - randomInt(0, days));
  return date.toISOString();
};

const futureDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + randomInt(0, days));
  return date.toISOString();
};

// ============= Users =============
export const generateUser = (overrides?: Partial<User>): User => {
  const roles = ['Admin', 'Manager', 'Sales', 'Warehouse', 'Accountant', 'POSOperator', 'HR', 'Viewer'] as const;
  const plans = ['Free', 'Basic', 'Pro', 'Enterprise'] as const;
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: nanoid(),
    tenantId: 'tenant-1',
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    fullName: `${firstName} ${lastName}`,
    role: randomElement(roles),
    avatar: faker.image.avatar(),
    phone: `01${faker.string.numeric(9)}`,
    isActive: Math.random() > 0.1,
    subscriptionPlan: randomElement(plans),
    permissions: [],
    createdAt: pastDate(365),
    lastLogin: pastDate(7),
    ...overrides,
  };
};

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => generateUser());
};

// ============= Categories =============
const categoryNames = [
  'Power Tools',
  'Hand Tools',
  'Electrical Wiring',
  'Circuit Breakers',
  'Switchgear',
  'Generators',
  'Transformers',
  'Motors',
  'Cables & Wires',
  'Light Fixtures',
  'Safety Equipment',
  'Measuring Instruments',
  'Hardware Machinery',
  'Industrial Equipment',
  'Spare Parts',
];

export const generateCategory = (overrides?: Partial<Category>): Category => {
  return {
    id: nanoid(),
    name: randomElement(categoryNames),
    parentId: undefined,
    description: faker.commerce.productDescription(),
    image: faker.image.urlLoremFlickr({ category: 'tools' }),
    isActive: true,
    createdAt: pastDate(365),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateCategories = (count: number): Category[] => {
  return Array.from({ length: count }, () => generateCategory());
};

// ============= Brands =============
const brandNames = [
  'Bosch',
  'DeWalt',
  'Makita',
  'Siemens',
  'ABB',
  'Schneider Electric',
  'Legrand',
  'GE',
  'Mitsubishi',
  'Havells',
  'Philips',
  'Osram',
  'Panasonic',
  'Hitachi',
  'Stanley',
];

export const generateBrand = (overrides?: Partial<Brand>): Brand => {
  return {
    id: nanoid(),
    name: randomElement(brandNames),
    logo: faker.image.urlLoremFlickr({ category: 'logo', width: 200, height: 200 }),
    description: faker.company.catchPhrase(),
    website: faker.internet.url(),
    isActive: true,
    createdAt: pastDate(365),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateBrands = (count: number): Brand[] => {
  return Array.from({ length: count }, () => generateBrand());
};

// ============= Units =============
const units = [
  { name: 'Piece', symbol: 'pcs' },
  { name: 'Box', symbol: 'box' },
  { name: 'Meter', symbol: 'm' },
  { name: 'Kilogram', symbol: 'kg' },
  { name: 'Liter', symbol: 'L' },
  { name: 'Set', symbol: 'set' },
  { name: 'Packet', symbol: 'pkt' },
  { name: 'Carton', symbol: 'ctn' },
  { name: 'Roll', symbol: 'roll' },
  { name: 'Coil', symbol: 'coil' },
];

export const generateUnit = (overrides?: Partial<Unit>): Unit => {
  const unit = randomElement(units);
  return {
    id: nanoid(),
    name: unit.name,
    symbol: unit.symbol,
    description: `Unit of measurement: ${unit.name}`,
    createdAt: pastDate(365),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateUnits = (): Unit[] => {
  return units.map((unit) => generateUnit(unit));
};

// ============= Products =============
const productTypes = ['Hardware', 'Electrical', 'Tool', 'Machinery', 'Spare Part'] as const;
const productPrefixes = [
  'Industrial',
  'Professional',
  'Heavy Duty',
  'Premium',
  'Standard',
  'Electronic',
  'Digital',
  'Manual',
  'Automatic',
  'Portable',
];

export const generateProduct = (
  categories: Category[],
  brands: Brand[],
  units: Unit[],
  overrides?: Partial<Product>
): Product => {
  const type = randomElement(productTypes);
  const prefix = randomElement(productPrefixes);
  const costPrice = randomFloat(10, 5000);
  const margin = randomFloat(1.2, 2.5);

  return {
    id: nanoid(),
    code: `PRD-${faker.string.alphanumeric(8).toUpperCase()}`,
    name: `${prefix} ${faker.commerce.productName()}`,
    description: faker.commerce.productDescription(),
    type,
    categoryId: randomElement(categories).id,
    brandId: randomElement(brands).id,
    unitId: randomElement(units).id,
    barcode: faker.string.numeric(13),
    sku: faker.string.alphanumeric(12).toUpperCase(),
    specifications: {
      voltage: randomElement(['110V', '220V', '380V', 'N/A']),
      power: `${randomInt(50, 5000)}W`,
      material: randomElement(['Steel', 'Aluminum', 'Plastic', 'Copper', 'Mixed']),
      warranty: `${randomInt(6, 36)} months`,
    },
    images: [
      faker.image.urlLoremFlickr({ category: 'tools', width: 400, height: 400 }),
      faker.image.urlLoremFlickr({ category: 'industrial', width: 400, height: 400 }),
    ],
    costPrice,
    sellingPrice: parseFloat((costPrice * margin).toFixed(2)),
    minPrice: parseFloat((costPrice * 1.1).toFixed(2)),
    taxRate: 15,
    isTrackInventory: true,
    isBatchTracked: Math.random() > 0.7,
    isSerialTracked: Math.random() > 0.8,
    reorderLevel: randomInt(10, 50),
    reorderQuantity: randomInt(20, 100),
    status: Math.random() > 0.1 ? 'Active' : 'Inactive',
    warrantyMonths: randomInt(6, 36),
    weight: randomFloat(0.1, 50),
    dimensions: {
      length: randomFloat(5, 100),
      width: randomFloat(5, 100),
      height: randomFloat(5, 100),
    },
    createdAt: pastDate(365),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateProducts = (
  count: number,
  categories: Category[],
  brands: Brand[],
  units: Unit[]
): Product[] => {
  return Array.from({ length: count }, () => generateProduct(categories, brands, units));
};

// ============= Warehouses =============
export const generateWarehouse = (overrides?: Partial<Warehouse>): Warehouse => {
  const district = randomElement(BD_DISTRICTS);
  return {
    id: nanoid(),
    code: `WH-${faker.string.alphanumeric(4).toUpperCase()}`,
    name: `${district} Warehouse`,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    district,
    phone: `01${faker.string.numeric(9)}`,
    isActive: true,
    createdAt: pastDate(365),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateWarehouses = (count: number): Warehouse[] => {
  return Array.from({ length: count }, () => generateWarehouse());
};

// ============= Stock Levels =============
export const generateStockLevel = (
  productId: string,
  warehouseId: string
): StockLevel => {
  const quantity = randomInt(0, 500);
  const reserved = randomInt(0, Math.min(quantity, 50));

  return {
    id: nanoid(),
    productId,
    warehouseId,
    quantity,
    reservedQuantity: reserved,
    availableQuantity: quantity - reserved,
    lastUpdated: pastDate(30),
  };
};

// ============= Customers =============
const customerTypes = ['Retail', 'Wholesale', 'B2B'] as const;

export const generateCustomer = (overrides?: Partial<Customer>): Customer => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const customerType = randomElement(customerTypes);
  
  return {
    id: nanoid(),
    code: `CUST-${faker.string.alphanumeric(6).toUpperCase()}`,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: `01${faker.string.numeric(9)}`,
    companyName: customerType !== 'Retail' ? faker.company.name() : undefined,
    taxId: customerType === 'B2B' ? faker.string.numeric(12) : undefined,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    district: randomElement(BD_DISTRICTS),
    zipCode: faker.string.numeric(4),
    customerType,
    creditLimit: customerType === 'B2B' ? randomFloat(50000, 500000, 0) : undefined,
    creditUsed: 0,
    paymentTerms: customerType === 'B2B' ? `Net ${randomInt(15, 60)} days` : undefined,
    discountPercentage: randomFloat(0, 10),
    loyaltyPoints: randomInt(0, 5000),
    isActive: Math.random() > 0.05,
    notes: faker.lorem.sentence(),
    createdAt: pastDate(730),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateCustomers = (count: number): Customer[] => {
  return Array.from({ length: count }, () => generateCustomer());
};

// ============= Suppliers =============
export const generateSupplier = (overrides?: Partial<Supplier>): Supplier => {
  return {
    id: nanoid(),
    code: `SUP-${faker.string.alphanumeric(6).toUpperCase()}`,
    name: faker.person.fullName(),
    companyName: faker.company.name(),
    email: faker.internet.email().toLowerCase(),
    phone: `01${faker.string.numeric(9)}`,
    taxId: faker.string.numeric(12),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    district: randomElement(BD_DISTRICTS),
    paymentTerms: `Net ${randomInt(15, 90)} days`,
    leadTimeDays: randomInt(3, 30),
    rating: randomFloat(3, 5, 1),
    isActive: Math.random() > 0.05,
    notes: faker.lorem.sentence(),
    createdAt: pastDate(730),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateSuppliers = (count: number): Supplier[] => {
  return Array.from({ length: count }, () => generateSupplier());
};

// ============= Employees =============
export const generateEmployee = (
  departments: Department[],
  designations: Designation[],
  overrides?: Partial<Employee>
): Employee => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  return {
    id: nanoid(),
    employeeCode: `EMP-${faker.string.alphanumeric(5).toUpperCase()}`,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: `01${faker.string.numeric(9)}`,
    dateOfBirth: faker.date.birthdate({ min: 22, max: 60, mode: 'age' }).toISOString().split('T')[0],
    gender: randomElement(['Male', 'Female', 'Other'] as const),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    joinDate: pastDate(1825).split('T')[0],
    departmentId: randomElement(departments).id,
    designationId: randomElement(designations).id,
    employmentType: randomElement(['FullTime', 'PartTime', 'Contract'] as const),
    salary: randomFloat(20000, 150000, 0),
    bankAccount: faker.finance.accountNumber(16),
    taxId: faker.string.numeric(12),
    profilePicture: faker.image.avatar(),
    isActive: Math.random() > 0.05,
    createdAt: pastDate(1825),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

// ============= Departments =============
const departmentNames = [
  'Administration',
  'Sales',
  'Operations',
  'Warehouse',
  'Finance',
  'HR',
  'IT',
  'Customer Service',
];

export const generateDepartment = (overrides?: Partial<Department>): Department => {
  const name = randomElement(departmentNames);
  return {
    id: nanoid(),
    name,
    code: name.substring(0, 3).toUpperCase(),
    description: `${name} Department`,
    isActive: true,
    createdAt: pastDate(730),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateDepartments = (): Department[] => {
  return departmentNames.map((name) => generateDepartment({ name }));
};

// ============= Designations =============
const designationNames = [
  { name: 'CEO', level: 1 },
  { name: 'Manager', level: 2 },
  { name: 'Assistant Manager', level: 3 },
  { name: 'Supervisor', level: 4 },
  { name: 'Senior Executive', level: 5 },
  { name: 'Executive', level: 6 },
  { name: 'Junior Executive', level: 7 },
  { name: 'Officer', level: 8 },
];

export const generateDesignation = (overrides?: Partial<Designation>): Designation => {
  const designation = randomElement(designationNames);
  return {
    id: nanoid(),
    name: designation.name,
    code: designation.name.substring(0, 3).toUpperCase(),
    level: designation.level,
    description: `${designation.name} position`,
    isActive: true,
    createdAt: pastDate(730),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

export const generateDesignations = (): Designation[] => {
  return designationNames.map((d) => generateDesignation(d));
};

// ============= Chart of Accounts =============
const accountTypes = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'] as const;

export const generateChartOfAccount = (overrides?: Partial<ChartOfAccount>): ChartOfAccount => {
  return {
    id: nanoid(),
    accountCode: `${randomInt(1000, 9999)}`,
    accountName: faker.finance.accountName(),
    accountType: randomElement(accountTypes),
    level: 1,
    isActive: true,
    balance: randomFloat(-100000, 100000),
    createdAt: pastDate(730),
    updatedAt: pastDate(30),
    createdBy: 'system',
    ...overrides,
  };
};

// ============= Export Mock Database =============
export const initializeMockData = () => {
  // Generate base data
  const categories = generateCategories(15);
  const brands = generateBrands(15);
  const units = generateUnits();
  const products = generateProducts(1000, categories, brands, units);
  const warehouses = generateWarehouses(5);
  const customers = generateCustomers(500);
  const suppliers = generateSuppliers(100);
  const departments = generateDepartments();
  const designations = generateDesignations();
  const employees = Array.from({ length: 50 }, () =>
    generateEmployee(departments, designations)
  );

  // Generate stock levels for all products in all warehouses
  const stockLevels: StockLevel[] = [];
  products.forEach((product) => {
    warehouses.forEach((warehouse) => {
      stockLevels.push(generateStockLevel(product.id, warehouse.id));
    });
  });

  return {
    categories,
    brands,
    units,
    products,
    warehouses,
    stockLevels,
    customers,
    suppliers,
    departments,
    designations,
    employees,
    users: generateUsers(20),
  };
};
