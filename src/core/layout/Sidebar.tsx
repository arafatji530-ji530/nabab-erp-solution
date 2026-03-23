import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import {
  Home20Regular,
  Home20Filled,
  Box20Regular,
  Box20Filled,
  ShoppingBag20Regular,
  ShoppingBag20Filled,
  Cart20Regular,
  Cart20Filled,
  People20Regular,
  People20Filled,
  ChartMultiple20Regular,
  ChartMultiple20Filled,
  Settings20Regular,
  Settings20Filled,
  BoxMultiple20Regular,
  BoxMultiple20Filled,
  Receipt20Regular,
  Receipt20Filled,
  PeopleTeam20Regular,
  PeopleTeam20Filled,
  Calculator20Regular,
  Calculator20Filled,
  ContactCard20Regular,
  ContactCard20Filled,
  Building20Regular,
  Building20Filled,
  Money20Regular,
  Money20Filled,
  ChevronDown20Regular,
  ChevronRight20Regular,
  bundleIcon,
} from '@fluentui/react-icons';

const HomeIcon = bundleIcon(Home20Filled, Home20Regular);
const ProductIcon = bundleIcon(Box20Filled, Box20Regular);
const SalesIcon = bundleIcon(ShoppingBag20Filled, ShoppingBag20Regular);
const POSIcon = bundleIcon(Cart20Filled, Cart20Regular);
const CustomersIcon = bundleIcon(People20Filled, People20Regular);
const ReportsIcon = bundleIcon(ChartMultiple20Filled, ChartMultiple20Regular);
const SettingsIcon = bundleIcon(Settings20Filled, Settings20Regular);
const InventoryIcon = bundleIcon(BoxMultiple20Filled, BoxMultiple20Regular);
const PurchaseIcon = bundleIcon(Receipt20Filled, Receipt20Regular);
const HRIcon = bundleIcon(PeopleTeam20Filled, PeopleTeam20Regular);
const AccountingIcon = bundleIcon(Calculator20Filled, Calculator20Regular);
const CRMIcon = bundleIcon(ContactCard20Filled, ContactCard20Regular);
const WarehouseIcon = bundleIcon(Building20Filled, Building20Regular);
const SubscriptionIcon = bundleIcon(Money20Filled, Money20Regular);
const ChevronDownIcon = ChevronDown20Regular;
const ChevronRightIcon = ChevronRight20Regular;

const useStyles = makeStyles({
  sidebar: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('auto'),
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.margin('0', tokens.spacingHorizontalS),
    cursor: 'pointer',
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    textDecoration: 'none',
    ...shorthands.transition('all', '150ms', 'ease'),
    
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground2Selected,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  navItemCollapsed: {
    justifyContent: 'center',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalS),
  },
  navLabel: {
    whiteSpace: 'nowrap',
    ...shorthands.overflow('hidden'),
    textOverflow: 'ellipsis',
    flex: 1,
  },
  subMenu: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.margin('0', tokens.spacingHorizontalS),
  },
  subMenuItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL, tokens.spacingVerticalS, tokens.spacingHorizontalXXXL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    cursor: 'pointer',
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    textDecoration: 'none',
    ...shorthands.transition('all', '150ms', 'ease'),
    
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  subMenuItemActive: {
    backgroundColor: tokens.colorNeutralBackground2Pressed,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  chevron: {
    ...shorthands.transition('transform', '150ms', 'ease'),
  },
  chevronExpanded: {
    transform: 'rotate(0deg)',
  },
  chevronCollapsed: {
    transform: 'rotate(-90deg)',
  },
});

interface SidebarProps {
  isCollapsed: boolean;
}

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: typeof HomeIcon;
  children?: SubMenuItem[];
}

const navItems: NavItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    path: '/dashboard', 
    icon: HomeIcon 
  },
  { 
    id: 'products', 
    label: 'Products', 
    path: '/products', 
    icon: ProductIcon,
    children: [
      { id: 'product-list', label: 'Product List', path: '/products' },
      { id: 'product-new', label: 'Add Product', path: '/products/new' },
      { id: 'product-categories', label: 'Categories', path: '/products/categories' },
      { id: 'product-variants', label: 'Product Variants', path: '/products/variants' },
      { id: 'product-bundles', label: 'Product Bundles', path: '/products/bundles' },
      { id: 'product-reviews', label: 'Product Reviews', path: '/products/reviews' },
      { id: 'product-price-history', label: 'Price History', path: '/products/price-history' },
      { id: 'product-comparison', label: 'Product Comparison', path: '/products/comparison' },
      { id: 'barcode-generator', label: 'Barcode Generator', path: '/products/barcode-generator' },
      { id: 'product-import-export', label: 'Import/Export', path: '/products/import-export' },
      { id: 'bulk-price-update', label: 'Bulk Price Update', path: '/products/bulk-price-update' },
    ]
  },
  { 
    id: 'inventory', 
    label: 'Inventory', 
    path: '/inventory', 
    icon: InventoryIcon,
    children: [
      { id: 'stock-levels', label: 'Stock Levels', path: '/inventory/stock-levels' },
      { id: 'stock-adjustment', label: 'Stock Adjustment', path: '/inventory/stock-adjustment' },
      { id: 'stock-transfer', label: 'Stock Transfer', path: '/inventory/stock-transfer' },
      { id: 'stock-movement', label: 'Stock Movement History', path: '/inventory/stock-movement-history' },
      { id: 'stock-count', label: 'Stock Count', path: '/inventory/stock-count' },
      { id: 'bin-location', label: 'Bin Location Management', path: '/inventory/bin-location' },
      { id: 'reorder-alerts', label: 'Reorder Alerts', path: '/inventory/reorder-alerts' },
      { id: 'inventory-valuation', label: 'Inventory Valuation Report', path: '/inventory/valuation-report' },
      { id: 'dead-stock', label: 'Dead Stock Analysis', path: '/inventory/dead-stock-analysis' },
    ]
  },
  { 
    id: 'purchase', 
    label: 'Purchase', 
    path: '/purchase', 
    icon: PurchaseIcon,
    children: [
      { id: 'purchase-orders', label: 'Purchase Orders', path: '/purchase/orders' },
      { id: 'purchase-requisitions', label: 'Purchase Requisitions', path: '/purchase/requisitions' },
      { id: 'supplier-management', label: 'Supplier Management', path: '/purchase/suppliers' },
      { id: 'purchase-returns', label: 'Purchase Returns', path: '/purchase/returns' },
      { id: 'supplier-payments', label: 'Supplier Payments', path: '/purchase/payments' },
      { id: 'supplier-performance', label: 'Supplier Performance', path: '/purchase/supplier-performance' },
      { id: 'purchase-analytics', label: 'Purchase Analytics', path: '/purchase/analytics' },
      { id: 'rfq-management', label: 'RFQ Management', path: '/purchase/rfq' },
      { id: 'supplier-contracts', label: 'Supplier Contracts', path: '/purchase/contracts' },
      { id: 'purchase-forecasting', label: 'Purchase Forecasting', path: '/purchase/forecasting' },
      { id: 'receiving-management', label: 'Receiving Management', path: '/purchase/receiving' },
    ]
  },
  { 
    id: 'sales', 
    label: 'Sales', 
    path: '/sales', 
    icon: SalesIcon,
    children: [
      { id: 'sales-orders', label: 'Sales Orders', path: '/sales/orders' },
      { id: 'quotation-management', label: 'Quotation Management', path: '/sales/quotations' },
      { id: 'sales-returns', label: 'Sales Returns', path: '/sales/returns' },
      { id: 'commission-tracking', label: 'Commission Tracking', path: '/sales/commissions' },
      { id: 'customer-payments', label: 'Customer Payments', path: '/sales/payments' },
      { id: 'territory-management', label: 'Territory Management', path: '/sales/territories' },
      { id: 'delivery-management', label: 'Delivery Management', path: '/sales/delivery' },
    ]
  },
  { 
    id: 'pos', 
    label: 'POS', 
    path: '/pos', 
    icon: POSIcon,
    children: [
      { id: 'pos-terminal', label: 'POS Terminal', path: '/pos/terminal' },
      { id: 'pos-sessions', label: 'POS Sessions', path: '/pos/sessions' },
      { id: 'cash-management', label: 'Cash Management', path: '/pos/cash-management' },
      { id: 'receipt-history', label: 'Receipt History', path: '/pos/receipt-history' },
      { id: 'returns-exchanges', label: 'Returns & Exchanges', path: '/pos/returns-exchanges' },
      { id: 'customer-display', label: 'Customer Display', path: '/pos/customer-display' },
      { id: 'pos-reports', label: 'POS Reports & Analytics', path: '/pos/reports' },
      { id: 'shift-management', label: 'Shift Management', path: '/pos/shift-management' },
      { id: 'pos-configuration', label: 'POS Configuration', path: '/pos/configuration' },
    ]
  },
  { 
    id: 'customers', 
    label: 'Customers', 
    path: '/customers', 
    icon: CustomersIcon 
  },
  { 
    id: 'crm', 
    label: 'CRM', 
    path: '/crm', 
    icon: CRMIcon,
    children: [
      { id: 'lead-management', label: 'Lead Management', path: '/crm/leads' },
      { id: 'opportunity-management', label: 'Opportunity Management', path: '/crm/opportunities' },
      { id: 'contact-management', label: 'Contact Management', path: '/crm/contacts' },
      { id: 'activity-timeline', label: 'Activity Timeline', path: '/crm/activity-timeline' },
      { id: 'customer-segmentation', label: 'Customer Segmentation', path: '/crm/segmentation' },
      { id: 'customer-portal', label: 'Customer Portal', path: '/crm/portal' },
      { id: 'support-tickets', label: 'Support Tickets', path: '/crm/support-tickets' },
      { id: 'loyalty-program', label: 'Loyalty Program', path: '/crm/loyalty' },
      { id: 'email-campaigns', label: 'Email Campaigns', path: '/crm/email-campaigns' },
      { id: 'crm-analytics', label: 'CRM Analytics', path: '/crm/analytics' },
    ]
  },
  { 
    id: 'warehouses', 
    label: 'Warehouses', 
    path: '/warehouses', 
    icon: WarehouseIcon 
  },
  { 
    id: 'hr', 
    label: 'Human Resources', 
    path: '/hr', 
    icon: HRIcon,
    children: [
      { id: 'employee-list', label: 'Employee List', path: '/hr/employees' },
      { id: 'attendance-management', label: 'Attendance Management', path: '/hr/attendance' },
      { id: 'payroll-processing', label: 'Payroll Processing', path: '/hr/payroll' },
      { id: 'leave-management', label: 'Leave Management', path: '/hr/leave' },
      { id: 'performance-reviews', label: 'Performance Reviews', path: '/hr/performance' },
      { id: 'recruitment-pipeline', label: 'Recruitment Pipeline', path: '/hr/recruitment' },
      { id: 'expense-claims', label: 'Expense Claims', path: '/hr/expenses' },
      { id: 'shift-scheduling', label: 'Shift Scheduling', path: '/hr/shifts' },
      { id: 'employee-self-service', label: 'Employee Self-Service', path: '/hr/self-service' },
      { id: 'benefits-management', label: 'Benefits Management', path: '/hr/benefits' },
      { id: 'exit-management', label: 'Exit Management', path: '/hr/exit' },
      { id: 'organization-chart', label: 'Organization Chart', path: '/hr/org-chart' },
      { id: 'document-management', label: 'Document Management', path: '/hr/documents' },
      { id: 'announcements', label: 'Announcements', path: '/hr/announcements' },
      { id: 'hr-analytics', label: 'HR Analytics', path: '/hr/analytics' },
    ]
  },
  { 
    id: 'accounting', 
    label: 'Accounting', 
    path: '/accounting', 
    icon: AccountingIcon,
    children: [
      { id: 'chart-of-accounts', label: 'Chart of Accounts', path: '/accounting/chart-of-accounts' },
      { id: 'journal-entries', label: 'Journal Entries', path: '/accounting/journal-entries' },
      { id: 'general-ledger', label: 'General Ledger', path: '/accounting/general-ledger' },
      { id: 'bank-reconciliation', label: 'Bank Reconciliation', path: '/accounting/bank-reconciliation' },
      { id: 'accounts-receivable', label: 'Accounts Receivable', path: '/accounting/accounts-receivable' },
      { id: 'accounts-payable', label: 'Accounts Payable', path: '/accounting/accounts-payable' },
      { id: 'budget-planning', label: 'Budget Planning', path: '/accounting/budget-planning' },
      { id: 'cost-centers', label: 'Cost Centers', path: '/accounting/cost-centers' },
      { id: 'fixed-assets', label: 'Fixed Assets', path: '/accounting/fixed-assets' },
      { id: 'depreciation', label: 'Depreciation Calculator', path: '/accounting/depreciation' },
      { id: 'financial-statements', label: 'Financial Statements', path: '/accounting/financial-statements' },
      { id: 'cash-flow', label: 'Cash Flow Management', path: '/accounting/cash-flow' },
      { id: 'audit-trail', label: 'Audit Trail', path: '/accounting/audit-trail' },
      { id: 'multi-currency', label: 'Multi-Currency', path: '/accounting/multi-currency' },
    ]
  },
  { 
    id: 'reports', 
    label: 'Reports', 
    path: '/reports', 
    icon: ReportsIcon,
    children: [
      { id: 'executive-dashboard', label: 'Executive Dashboard', path: '/reports/executive-dashboard' },
      { id: 'sales-report', label: 'Sales Report', path: '/reports/sales' },
      { id: 'sales-analytics', label: 'Sales Analytics', path: '/reports/sales-analytics' },
      { id: 'inventory-report', label: 'Inventory Report', path: '/reports/inventory' },
      { id: 'financial-report', label: 'Financial Report', path: '/reports/financial' },
      { id: 'aged-receivables', label: 'Aged Receivables', path: '/reports/aged-receivables' },
      { id: 'aged-payables', label: 'Aged Payables', path: '/reports/aged-payables' },
      { id: 'profitability-analysis', label: 'Profitability Analysis', path: '/reports/profitability' },
      { id: 'customer-analysis', label: 'Customer Analysis', path: '/reports/customer-analysis' },
      { id: 'product-performance', label: 'Product Performance', path: '/reports/product-performance' },
      { id: 'supplier-analysis', label: 'Supplier Analysis', path: '/reports/supplier-analysis' },
      { id: 'variance-reports', label: 'Variance Reports', path: '/reports/variance' },
      { id: 'trend-analysis', label: 'Trend Analysis', path: '/reports/trend-analysis' },
      { id: 'scheduled-reports', label: 'Scheduled Reports', path: '/reports/scheduled' },
      { id: 'custom-report-builder', label: 'Custom Report Builder', path: '/reports/custom-builder' },
    ]
  },
  { 
    id: 'subscription', 
    label: 'Subscription', 
    path: '/subscription', 
    icon: SubscriptionIcon 
  },
  { 
    id: 'settings', 
    label: 'Settings', 
    path: '/settings', 
    icon: SettingsIcon,
    children: [
      { id: 'company-settings', label: 'Company Settings', path: '/settings/company' },
      { id: 'user-management', label: 'User Management', path: '/settings/users' },
      { id: 'tax-configuration', label: 'Tax Configuration', path: '/settings/tax' },
      { id: 'payment-methods', label: 'Payment Methods', path: '/settings/payment-methods' },
      { id: 'email-templates', label: 'Email Templates', path: '/settings/email-templates' },
      { id: 'sms-configuration', label: 'SMS Configuration', path: '/settings/sms' },
      { id: 'api-keys', label: 'API Keys Management', path: '/settings/api-keys' },
      { id: 'webhooks', label: 'Webhooks', path: '/settings/webhooks' },
      { id: 'custom-fields', label: 'Custom Fields Builder', path: '/settings/custom-fields' },
      { id: 'workflow-automation', label: 'Workflow Automation', path: '/settings/workflow' },
      { id: 'number-sequences', label: 'Number Sequences', path: '/settings/number-sequences' },
      { id: 'system-health', label: 'System Health Monitor', path: '/settings/system-health' },
      { id: 'database-maintenance', label: 'Database Maintenance', path: '/settings/database' },
      { id: 'backup-restore', label: 'Backup & Restore', path: '/settings/backup' },
      { id: 'localization', label: 'Localization', path: '/settings/localization' },
      { id: 'security-settings', label: 'Security Settings', path: '/settings/security' },
    ]
  },
];

export const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.children && item.children.length > 0 && !isCollapsed) {
      toggleExpanded(item.id);
    } else {
      navigate(item.path);
    }
  };

  return (
    <nav className={classes.sidebar}>
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        const isExpanded = expandedItems.includes(item.id);
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div key={item.id}>
            <div
              className={`${classes.navItem} ${
                active ? classes.navItemActive : ''
              } ${isCollapsed ? classes.navItemCollapsed : ''}`}
              onClick={() => handleNavItemClick(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNavItemClick(item);
                }
              }}
            >
              <Icon fontSize={20} />
              {!isCollapsed && (
                <>
                  <span className={classes.navLabel}>{item.label}</span>
                  {hasChildren && (
                    <span className={`${classes.chevron} ${isExpanded ? classes.chevronExpanded : classes.chevronCollapsed}`}>
                      {isExpanded ? <ChevronDownIcon fontSize={16} /> : <ChevronRightIcon fontSize={16} />}
                    </span>
                  )}
                </>
              )}
            </div>
            
            {!isCollapsed && hasChildren && isExpanded && (
              <div className={classes.subMenu}>
                {item.children!.map((subItem) => {
                  const subActive = location.pathname === subItem.path;
                  return (
                    <div
                      key={subItem.id}
                      className={`${classes.subMenuItem} ${
                        subActive ? classes.subMenuItemActive : ''
                      }`}
                      onClick={() => navigate(subItem.path)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          navigate(subItem.path);
                        }
                      }}
                    >
                      {subItem.label}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
