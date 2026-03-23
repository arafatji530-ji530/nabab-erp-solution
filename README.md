# Nabab ERP POS Solution

Enterprise-grade ERP + Point of Sale system for Hardware Machinery Tools & Electrical Products distribution.

## 🎯 Features

- **100+ Pages** across 15+ functional modules
- **Azure Portal UI/UX** using Microsoft Fluent UI v9
- **Multi-tenant** architecture with subscription management
- **Mock Service Layer** ready for backend integration
- **TypeScript** strict mode with comprehensive type safety
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Role-Based Access Control** with granular permissions
- **Real-time Updates** simulation for POS and inventory
- **Offline Mode** capability for POS terminal
- **Comprehensive Reporting** with 50+ pre-built reports

## 🏗️ Architecture

```
src/
├── features/          # 15+ business modules
│   ├── auth/         # Authentication & authorization
│   ├── dashboard/    # Executive dashboards
│   ├── products/     # Product catalog management
│   ├── inventory/    # Multi-warehouse inventory
│   ├── pos/          # Point of Sale terminal
│   ├── sales/        # Sales orders & invoicing
│   ├── purchase/     # Procurement & suppliers
│   ├── crm/          # Customer relationship management
│   ├── accounting/   # Finance & accounting
│   ├── subscription/ # SaaS billing & metering
│   ├── hr/           # Human resources & payroll
│   ├── reports/      # Analytics & reporting
│   ├── settings/     # Configuration & admin
│   └── ...
├── shared/           # Reusable components & utilities
├── core/             # App shell, layout, routing
├── services/         # API clients & mock layer
└── types/            # TypeScript definitions
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm test` - Run unit tests
- `npm run e2e` - Run end-to-end tests

## 📦 Technology Stack

### Frontend
- **React 18** with TypeScript (strict mode)
- **Vite** for blazing fast development
- **Fluent UI v9** for Azure-style components
- **Redux Toolkit** for state management
- **React Router v6** with lazy loading
- **React Hook Form** + **Zod** for form validation

### API & Data
- **Axios** for HTTP client
- **MSW** for API mocking
- **Faker.js** for realistic mock data

### Charts & Visualization
- **Recharts** for analytics dashboards
- **Fluent UI Charting** for KPI cards

## 🎨 UI/UX Design

Follows **Azure Portal** and **Office 365** design language:

- Fluent UI v9 components exclusively
- Azure-style header with global search
- Collapsible sidebar navigation
- Command bars for contextual actions
- Data grids with filtering & sorting
- Light/Dark theme support
- WCAG 2.1 AA accessibility compliant

## 🔐 Authentication

Mock JWT-based authentication with role-based access:

- **Roles:** Admin, Manager, Sales, Warehouse, Accountant, POS Operator
- **Permissions:** 200+ granular permission flags
- **Session Management:** Configurable timeout and forced logout

## 📊 Modules Overview

| Module | Pages | Key Features |
|--------|-------|--------------|
| **Products** | 11 | Catalog, variants, categories, pricing, barcode |
| **Inventory** | 12 | Multi-warehouse, stock transfers, batch tracking |
| **POS** | 8 | Fast checkout, offline mode, multiple payments |
| **Sales** | 10 | Quotations, orders, invoices, returns |
| **Purchase** | 8 | PO workflow, supplier management, GRN |
| **CRM** | 10 | Customer 360°, leads, campaigns, loyalty |
| **Accounting** | 12 | GL, journal entries, financial reports, tax |
| **Subscription** | 10 | Plans, billing, usage metering, upgrades |
| **HR** | 8 | Employees, attendance, payroll, documents |
| **Reports** | 10 | 50+ pre-built reports, custom builder |
| **Settings** | 8 | Company, users, permissions, integrations |
| **Support** | 4 | Tickets, knowledge base, chat |
| **+Others** | 9+ | Marketing, warehouse, project management |

**Total: 100+ pages**

## 🧪 Testing

- **Unit Tests:** Vitest + React Testing Library
- **E2E Tests:** Playwright for critical user journeys
- **Coverage Target:** 80% minimum

## 🌐 Internationalization

- **react-i18next** integration
- **Languages:** English (default), Bengali (future)
- **Currency:** BDT (Bangladeshi Taka)
- **Date Format:** Localized with date-fns

## 🔧 Configuration

Environment variables in `.env`:

```bash
VITE_APP_NAME="Nabab ERP POS Solution"
VITE_ENABLE_MOCK="true"          # Enable mock API
VITE_MOCK_DELAY=300              # Mock response delay (ms)
VITE_ENABLE_SUBSCRIPTION="true"  # Enable subscription module
```

## 📱 Responsive Breakpoints

- **Desktop:** 1366px+ (primary target)
- **Tablet:** 768px - 1365px
- **Mobile:** < 768px (minimal support)

## 🚢 Deployment

### Docker

```bash
# Build image
docker build -t nabab-erp-pos .

# Run container
docker run -p 3000:3000 nabab-erp-pos
```

### Azure Static Web Apps (Future)

Ready for deployment to Azure with:
- Azure AD B2C integration hooks
- Application Insights telemetry
- CDN configuration

## 🤝 Contributing

Follow clean architecture principles:

1. Each feature module is self-contained
2. Shared components in `shared/` folder
3. Mock services in `services/mock/`
4. Type definitions in module `types/` folders
5. Use Fluent UI components exclusively

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For support, contact: support@nabab-erp.com

---

**Version:** 1.0.0  
**Last Updated:** March 2026
