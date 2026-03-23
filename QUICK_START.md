# 🚀 Quick Start Guide - Nabab ERP POS Solution

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** version 18.0.0 or higher
- **npm** version 9.0.0 or higher
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- Code editor (VS Code recommended)

Check your versions:
```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

---

## 🎯 3-Step Installation

### Step 1: Navigate to Project Directory
```bash
cd "f:\jisan\nabab-erp-pos-deep"
```

### Step 2: Install Dependencies
```bash
npm install
```

**⏱️ This will take 2-3 minutes**. The installation will download:
- React 18.2.0 and React DOM
- Fluent UI v9 components and icons
- Redux Toolkit for state management
- React Router for navigation
- MSW for API mocking
- Faker.js for mock data generation
- Axios for HTTP requests
- Zod for validation
- TypeScript and build tools

### Step 3: Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.1.4  ready in 1234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help

🔶 Mock Service Worker started
```

The application will automatically open in your default browser at `http://localhost:3000`

---

## 🔐 Login to the Application

You'll see a beautiful Azure-style login page.

**Login Credentials** (Demo Mode):
- **Email**: Any email (e.g., `admin@nabab.com`)
- **Password**: Any password (e.g., `password`)

> **Note**: Since this is a demo with mock authentication, any email/password combination will work!

Click **"Sign In"** and you'll be redirected to the dashboard.

---

## 🎨 What You'll See

### 1. **Login Page** (`/login`)
- Beautiful gradient background (Azure blue)
- Centered login card
- Email and password fields
- "Remember me" checkbox
- Demo mode hint

### 2. **Dashboard After Login** (`/dashboard`)
- **Header Bar** (top):
  - Nabab ERP POS logo
  - Global search box
  - Notification bell (with badge)
  - User avatar menu
  - Theme toggle
  
- **Sidebar** (left):
  - Collapsible navigation
  - Dashboard, Products, Sales, POS, Customers, Reports, Settings
  - Active route highlighting
  
- **Main Content**:
  - Executive Dashboard with 4 KPI cards:
    - Total Revenue (with trend)
    - Total Orders (with trend)
    - Total Customers (with trend)
    - Low Stock Products (with trend)
  - Sales chart section
  - Quick stats panel

### 3. **Product Catalog** (`/products`)
- Click "Products" in sidebar
- Grid view of products:
  - Product images
  - Product names and codes
  - Status badges
  - Price information
  - Action menu (View/Edit/Delete)
- Search bar with real-time filtering (debounced)
- Pagination controls
- "Add Product" button

---

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start development server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier

# Testing (when implemented)
npm test                 # Run unit tests
npm run test:ui          # Open Vitest UI
npm run e2e              # Run Playwright E2E tests
```

---

## 🔍 Exploring the Application

### Try These Features:

1. **Navigation**
   - Click sidebar items to navigate
   - Click the hamburger icon to collapse/expand sidebar
   - Watch the active route highlight change

2. **Dashboard**
   - View real-time KPI metrics
   - Check trend indicators (up/down arrows)
   - See color-coded values (green for positive, red for negative)

3. **Products**
   - Search for products using the search box
   - Navigate between pages
   - Click product cards to view details (not yet implemented)
   - Click the three-dot menu for actions

4. **Mock API**
   - Open browser DevTools (F12)
   - Go to Network tab
   - See API requests being intercepted by MSW
   - Notice the 300ms simulated delay

5. **User Menu**
   - Click your avatar in the top-right
   - See user info and settings
   - Try the logout button

---

## 📂 Project Structure at a Glance

```
nabab-erp-pos-deep/
├── src/
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Root component
│   │
│   ├── features/                # Feature modules
│   │   ├── auth/                # Login, logout
│   │   ├── dashboard/           # Executive dashboard
│   │   └── products/            # Product catalog
│   │
│   ├── core/                    # Core infrastructure
│   │   ├── layout/              # Header, Sidebar, Footer
│   │   └── theme/               # Fluent UI theme
│   │
│   ├── shared/                  # Shared code
│   │   ├── components/          # Reusable components
│   │   ├── hooks/               # Custom React hooks
│   │   └── utils/               # Utility functions
│   │
│   ├── services/                # API services
│   │   ├── api/                 # Axios client
│   │   └── mock/                # MSW mock handlers
│   │
│   ├── store/                   # Redux store
│   └── types/                   # TypeScript types
│
├── package.json                 # Dependencies
├── vite.config.ts               # Build config
└── tsconfig.json                # TypeScript config
```

---

## 🎯 Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Library | 18.2.0 |
| TypeScript | Type Safety | 5.3.3 |
| Fluent UI | Component Library | 9.54.0 |
| Redux Toolkit | State Management | 2.2.1 |
| React Router | Navigation | 6.22.0 |
| MSW | API Mocking | 2.1.5 |
| Vite | Build Tool | 5.1.4 |
| Faker.js | Mock Data | 8.4.1 |

---

## 📊 Mock Data Available

The application comes with pre-generated mock data:
- **1,000+ products** (hardware machinery tools & electrical)
- **500+ customers** with Bangladesh-specific data
- **100+ suppliers**
- **50+ employees**
- **5 warehouses**
- **5,000+ stock level records**
- Categories, brands, units, departments

All data is realistic and relational!

---

## 🐛 Troubleshooting

### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- --port 3001
```

### Issue: Dependencies not installing
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript errors
**Solution:**
```bash
# Run type check to see specific errors
npm run type-check

# Most errors should be fixed by ensuring all imports are correct
```

### Issue: MSW not intercepting requests
**Solution:**
- Ensure you're using a modern browser
- Check browser console for MSW initialization message
- Try clearing browser cache and hard reload (Ctrl+Shift+R)

### Issue: White screen after login
**Solution:**
- Open browser DevTools console (F12)
- Check for any React errors
- Ensure all required files are present
- Try clearing localStorage: `localStorage.clear()`

---

## 🎓 Learning Path

### For Beginners:
1. Start with `src/main.tsx` - see how the app initializes
2. Check `src/App.tsx` - understand routing setup
3. Look at `features/auth/pages/Login.tsx` - see a simple page
4. Explore `services/mock/mockData.ts` - see how data is generated

### For Intermediate:
1. Study Redux setup in `store/index.ts`
2. Examine API service in `services/api/index.ts`
3. Check theme configuration in `core/theme/theme.ts`
4. Look at custom hooks in `shared/hooks/index.ts`

### For Advanced:
1. Analyze the MSW setup in `services/mock/mockHandlers.ts`
2. Review type definitions in `types/` folder
3. Study the layout architecture in `core/layout/`
4. Examine utility functions in `shared/utils/`

---

## 📝 Next Steps

Now that you have the application running:

1. **Explore the existing pages**: Login, Dashboard, Products
2. **Check the mock data**: Open DevTools → Application → IndexedDB
3. **View API calls**: DevTools → Network tab
4. **Experiment with the code**: Try modifying colors in `theme.ts`
5. **Read the documentation**: See `IMPLEMENTATION_GUIDE.md` for details

---

## 🤝 Need Help?

- **Documentation**: Read `README.md` and `IMPLEMENTATION_GUIDE.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`
- **Code Comments**: Most files have detailed comments
- **Type Definitions**: Check `types/` folder for interfaces

---

## 🎉 You're All Set!

Your Nabab ERP POS Solution is now running. Enjoy exploring the application!

**What's Working:**
- ✅ User authentication (mock)
- ✅ Dashboard with KPIs
- ✅ Product catalog with search
- ✅ Mock API with realistic data
- ✅ Navigation and routing
- ✅ Azure Portal UI theme

**Coming Soon:**
- ⏳ 117 more pages across 17 modules
- ⏳ Complete CRUD operations
- ⏳ Advanced filtering and sorting
- ⏳ Reports with charts
- ⏳ POS terminal
- ⏳ And much more...

---

**Happy Coding!** 🚀

**Version**: 1.0.0  
**Last Updated**: March 22, 2026
