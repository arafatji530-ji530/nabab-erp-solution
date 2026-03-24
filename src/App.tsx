import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { makeStyles, shorthands, Spinner } from '@fluentui/react-components';
import { AppLayout } from './core/layout/AppLayout';
import { useAppSelector } from './store/hooks';
import { selectIsAuthenticated } from './features/auth/slices/authSlice';

// Lazy load pages for code splitting
const Login = lazy(() => import('./features/auth/pages/Login').then(m => ({ default: m.Login })));
const ExecutiveDashboard = lazy(() => import('./features/dashboard/pages/ExecutiveDashboard').then(m => ({ default: m.ExecutiveDashboard })));

// Products
const ProductList = lazy(() => import('./features/products/pages/ProductList').then(m => ({ default: m.ProductList })));
const ProductDetail = lazy(() => import('./features/products/pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const ProductForm = lazy(() => import('./features/products/pages/ProductForm').then(m => ({ default: m.ProductForm })));
const CategoryManagement = lazy(() => import('./features/products/pages/CategoryManagement').then(m => ({ default: m.CategoryManagement })));
const ProductVariants = lazy(() => import('./features/products/pages/ProductVariants').then(m => ({ default: m.ProductVariants })));
const ProductBundles = lazy(() => import('./features/products/pages/ProductBundles').then(m => ({ default: m.ProductBundles })));
const ProductReviews = lazy(() => import('./features/products/pages/ProductReviews').then(m => ({ default: m.ProductReviews })));
const ProductPriceHistory = lazy(() => import('./features/products/pages/ProductPriceHistory').then(m => ({ default: m.ProductPriceHistory })));
const ProductComparison = lazy(() => import('./features/products/pages/ProductComparison').then(m => ({ default: m.ProductComparison })));
const BarcodeGenerator = lazy(() => import('./features/products/pages/BarcodeGenerator').then(m => ({ default: m.BarcodeGenerator })));
const ProductImportExport = lazy(() => import('./features/products/pages/ProductImportExport').then(m => ({ default: m.ProductImportExport })));
const BulkPriceUpdate = lazy(() => import('./features/products/pages/BulkPriceUpdate').then(m => ({ default: m.BulkPriceUpdate })));

// Inventory
const StockLevels = lazy(() => import('./features/inventory/pages/StockLevels').then(m => ({ default: m.StockLevels })));
const StockAdjustment = lazy(() => import('./features/inventory/pages/StockAdjustment').then(m => ({ default: m.StockAdjustment })));
const StockTransfer = lazy(() => import('./features/inventory/pages/StockTransfer').then(m => ({ default: m.StockTransfer })));
const StockMovementHistory = lazy(() => import('./features/inventory/pages/StockMovementHistory').then(m => ({ default: m.StockMovementHistory })));
const StockCount = lazy(() => import('./features/inventory/pages/StockCount').then(m => ({ default: m.StockCount })));
const BinLocationManagement = lazy(() => import('./features/inventory/pages/BinLocationManagement').then(m => ({ default: m.BinLocationManagement })));
const ReorderAlerts = lazy(() => import('./features/inventory/pages/ReorderAlerts').then(m => ({ default: m.ReorderAlerts })));
const InventoryValuationReport = lazy(() => import('./features/inventory/pages/InventoryValuationReport').then(m => ({ default: m.InventoryValuationReport })));
const DeadStockAnalysis = lazy(() => import('./features/inventory/pages/DeadStockAnalysis').then(m => ({ default: m.DeadStockAnalysis })));

// POS
const POSTerminal = lazy(() => import('./features/pos/pages/POSTerminal').then(m => ({ default: m.POSTerminal })));
const POSSessions = lazy(() => import('./features/pos/pages/POSSessions').then(m => ({ default: m.POSSessions })));
const CashManagement = lazy(() => import('./features/pos/pages/CashManagement').then(m => ({ default: m.CashManagement })));
const ReceiptHistory = lazy(() => import('./features/pos/pages/ReceiptHistory').then(m => ({ default: m.ReceiptHistory })));
const ReturnsExchanges = lazy(() => import('./features/pos/pages/ReturnsExchanges').then(m => ({ default: m.ReturnsExchanges })));
const CustomerDisplay = lazy(() => import('./features/pos/pages/CustomerDisplay').then(m => ({ default: m.CustomerDisplay })));
const POSReportsAnalytics = lazy(() => import('./features/pos/pages/POSReportsAnalytics').then(m => ({ default: m.POSReportsAnalytics })));
const POSShiftManagement = lazy(() => import('./features/pos/pages/POSShiftManagement').then(m => ({ default: m.POSShiftManagement })));
const POSConfiguration = lazy(() => import('./features/pos/pages/POSConfiguration').then(m => ({ default: m.POSConfiguration })));

// Sales
const SalesOrderList = lazy(() => import('./features/sales/pages/SalesOrderList').then(m => ({ default: m.SalesOrderList })));
const QuotationManagement = lazy(() => import('./features/sales/pages/QuotationManagement').then(m => ({ default: m.QuotationManagement })));
const SalesReturns = lazy(() => import('./features/sales/pages/SalesReturns').then(m => ({ default: m.SalesReturns })));
const CommissionTracking = lazy(() => import('./features/sales/pages/CommissionTracking').then(m => ({ default: m.CommissionTracking })));
const CustomerPayments = lazy(() => import('./features/sales/pages/CustomerPayments').then(m => ({ default: m.CustomerPayments })));
const TerritoryManagement = lazy(() => import('./features/sales/pages/TerritoryManagement').then(m => ({ default: m.TerritoryManagement })));
const DeliveryManagement = lazy(() => import('./features/sales/pages/DeliveryManagement').then(m => ({ default: m.DeliveryManagement })));

// Purchase
const PurchaseOrderList = lazy(() => import('./features/purchase/pages/PurchaseOrderList').then(m => ({ default: m.PurchaseOrderList })));
const PurchaseRequisitions = lazy(() => import('./features/purchase/pages/PurchaseRequisitions').then(m => ({ default: m.PurchaseRequisitions })));
const SupplierManagement = lazy(() => import('./features/purchase/pages/SupplierManagement').then(m => ({ default: m.SupplierManagement })));
const PurchaseReturns = lazy(() => import('./features/purchase/pages/PurchaseReturns').then(m => ({ default: m.PurchaseReturns })));
const SupplierPayments = lazy(() => import('./features/purchase/pages/SupplierPayments').then(m => ({ default: m.SupplierPayments })));
const SupplierPerformanceAnalytics = lazy(() => import('./features/purchase/pages/SupplierPerformanceAnalytics').then(m => ({ default: m.SupplierPerformanceAnalytics })));
const PurchaseAnalytics = lazy(() => import('./features/purchase/pages/PurchaseAnalytics').then(m => ({ default: m.PurchaseAnalytics })));
const RFQManagement = lazy(() => import('./features/purchase/pages/RFQManagement').then(m => ({ default: m.RFQManagement })));
const SupplierContracts = lazy(() => import('./features/purchase/pages/SupplierContracts').then(m => ({ default: m.SupplierContracts })));
const PurchaseForecasting = lazy(() => import('./features/purchase/pages/PurchaseForecasting').then(m => ({ default: m.PurchaseForecasting })));
const ReceivingManagement = lazy(() => import('./features/purchase/pages/ReceivingManagement').then(m => ({ default: m.ReceivingManagement })));

// CRM
const CustomerList = lazy(() => import('./features/crm/pages/CustomerList').then(m => ({ default: m.CustomerList })));
const LeadManagement = lazy(() => import('./features/crm/pages/LeadManagement').then(m => ({ default: m.LeadManagement })));
const OpportunityManagement = lazy(() => import('./features/crm/pages/OpportunityManagement').then(m => ({ default: m.OpportunityManagement })));
const ContactManagement = lazy(() => import('./features/crm/pages/ContactManagement').then(m => ({ default: m.ContactManagement })));
const ActivityTimeline = lazy(() => import('./features/crm/pages/ActivityTimeline').then(m => ({ default: m.ActivityTimeline })));
const CustomerSegmentation = lazy(() => import('./features/crm/pages/CustomerSegmentation').then(m => ({ default: m.CustomerSegmentation })));
const CustomerPortal = lazy(() => import('./features/crm/pages/CustomerPortal').then(m => ({ default: m.CustomerPortal })));
const SupportTickets = lazy(() => import('./features/crm/pages/SupportTickets').then(m => ({ default: m.SupportTickets })));
const LoyaltyProgram = lazy(() => import('./features/crm/pages/LoyaltyProgram').then(m => ({ default: m.LoyaltyProgram })));
const EmailCampaigns = lazy(() => import('./features/crm/pages/EmailCampaigns').then(m => ({ default: m.EmailCampaigns })));
const CRMAnalytics = lazy(() => import('./features/crm/pages/CRMAnalytics').then(m => ({ default: m.CRMAnalytics })));

// HR
const EmployeeList = lazy(() => import('./features/hr/pages/EmployeeList').then(m => ({ default: m.EmployeeList })));
const AttendanceManagement = lazy(() => import('./features/hr/pages/AttendanceManagement').then(m => ({ default: m.AttendanceManagement })));
const PayrollProcessing = lazy(() => import('./features/hr/pages/PayrollProcessing').then(m => ({ default: m.PayrollProcessing })));
const LeaveManagement = lazy(() => import('./features/hr/pages/LeaveManagement').then(m => ({ default: m.LeaveManagement })));
const PerformanceReviews = lazy(() => import('./features/hr/pages/PerformanceReviews').then(m => ({ default: m.PerformanceReviews })));
const RecruitmentPipeline = lazy(() => import('./features/hr/pages/RecruitmentPipeline').then(m => ({ default: m.RecruitmentPipeline })));
const ExpenseClaims = lazy(() => import('./features/hr/pages/ExpenseClaims').then(m => ({ default: m.ExpenseClaims })));
const ShiftScheduling = lazy(() => import('./features/hr/pages/ShiftScheduling').then(m => ({ default: m.ShiftScheduling })));
const EmployeeSelfService = lazy(() => import('./features/hr/pages/EmployeeSelfService').then(m => ({ default: m.EmployeeSelfService })));
const BenefitsManagement = lazy(() => import('./features/hr/pages/BenefitsManagement').then(m => ({ default: m.BenefitsManagement })));
const ExitManagement = lazy(() => import('./features/hr/pages/ExitManagement').then(m => ({ default: m.ExitManagement })));
const OrganizationChart = lazy(() => import('./features/hr/pages/OrganizationChart').then(m => ({ default: m.OrganizationChart })));
const DocumentManagement = lazy(() => import('./features/hr/pages/DocumentManagement').then(m => ({ default: m.DocumentManagement })));
const Announcements = lazy(() => import('./features/hr/pages/Announcements').then(m => ({ default: m.Announcements })));
const HRAnalytics = lazy(() => import('./features/hr/pages/HRAnalytics').then(m => ({ default: m.HRAnalytics })));

// Accounting
const ChartOfAccounts = lazy(() => import('./features/accounting/pages/ChartOfAccounts').then(m => ({ default: m.ChartOfAccounts })));
const JournalEntries = lazy(() => import('./features/accounting/pages/JournalEntries').then(m => ({ default: m.JournalEntries })));
const GeneralLedger = lazy(() => import('./features/accounting/pages/GeneralLedger').then(m => ({ default: m.GeneralLedger })));
const BankReconciliation = lazy(() => import('./features/accounting/pages/BankReconciliation').then(m => ({ default: m.BankReconciliation })));
const AccountsReceivable = lazy(() => import('./features/accounting/pages/AccountsReceivable').then(m => ({ default: m.AccountsReceivable })));
const AccountsPayable = lazy(() => import('./features/accounting/pages/AccountsPayable').then(m => ({ default: m.AccountsPayable })));
const BudgetPlanning = lazy(() => import('./features/accounting/pages/BudgetPlanning').then(m => ({ default: m.BudgetPlanning })));
const CostCenters = lazy(() => import('./features/accounting/pages/CostCenters').then(m => ({ default: m.CostCenters })));
const FixedAssets = lazy(() => import('./features/accounting/pages/FixedAssets').then(m => ({ default: m.FixedAssets })));
const DepreciationCalculator = lazy(() => import('./features/accounting/pages/DepreciationCalculator').then(m => ({ default: m.DepreciationCalculator })));
const FinancialStatements = lazy(() => import('./features/accounting/pages/FinancialStatements').then(m => ({ default: m.FinancialStatements })));
const CashFlowManagement = lazy(() => import('./features/accounting/pages/CashFlowManagement').then(m => ({ default: m.CashFlowManagement })));
const AuditTrail = lazy(() => import('./features/accounting/pages/AuditTrail').then(m => ({ default: m.AuditTrail })));
const MultiCurrency = lazy(() => import('./features/accounting/pages/MultiCurrency').then(m => ({ default: m.MultiCurrency })));

// Reports
const ExecutiveDashboardReport = lazy(() => import('./features/reports/pages/ExecutiveDashboard').then(m => ({ default: m.ExecutiveDashboard })));
const SalesReport = lazy(() => import('./features/reports/pages/SalesReport').then(m => ({ default: m.SalesReport })));
const SalesAnalytics = lazy(() => import('./features/reports/pages/SalesAnalytics').then(m => ({ default: m.SalesAnalytics })));
const InventoryReport = lazy(() => import('./features/reports/pages/InventoryReport').then(m => ({ default: m.InventoryReport })));
const FinancialReport = lazy(() => import('./features/reports/pages/FinancialReport').then(m => ({ default: m.FinancialReport })));
const AgedReceivablesReport = lazy(() => import('./features/reports/pages/AgedReceivablesReport').then(m => ({ default: m.AgedReceivablesReport })));
const AgedPayablesReport = lazy(() => import('./features/reports/pages/AgedPayablesReport').then(m => ({ default: m.AgedPayablesReport })));
const ProfitabilityAnalysis = lazy(() => import('./features/reports/pages/ProfitabilityAnalysis').then(m => ({ default: m.ProfitabilityAnalysis })));
const CustomerAnalysisReport = lazy(() => import('./features/reports/pages/CustomerAnalysisReport').then(m => ({ default: m.CustomerAnalysisReport })));
const ProductPerformanceReport = lazy(() => import('./features/reports/pages/ProductPerformanceReport').then(m => ({ default: m.ProductPerformanceReport })));
const SupplierAnalysisReport = lazy(() => import('./features/reports/pages/SupplierAnalysisReport').then(m => ({ default: m.SupplierAnalysisReport })));
const VarianceReports = lazy(() => import('./features/reports/pages/VarianceReports').then(m => ({ default: m.VarianceReports })));
const TrendAnalysis = lazy(() => import('./features/reports/pages/TrendAnalysis').then(m => ({ default: m.TrendAnalysis })));
const ScheduledReports = lazy(() => import('./features/reports/pages/ScheduledReports').then(m => ({ default: m.ScheduledReports })));
const CustomReportBuilder = lazy(() => import('./features/reports/pages/CustomReportBuilder').then(m => ({ default: m.CustomReportBuilder })));

// Warehouses
const WarehouseList = lazy(() => import('./features/warehouses/pages/WarehouseList').then(m => ({ default: m.WarehouseList })));

// Settings
const CompanySettings = lazy(() => import('./features/settings/pages/CompanySettings').then(m => ({ default: m.CompanySettings })));
const UserManagement = lazy(() => import('./features/settings/pages/UserManagement').then(m => ({ default: m.UserManagement })));
const TaxConfiguration = lazy(() => import('./features/settings/pages/TaxConfiguration').then(m => ({ default: m.TaxConfiguration })));
const PaymentMethodsSetup = lazy(() => import('./features/settings/pages/PaymentMethodsSetup').then(m => ({ default: m.PaymentMethodsSetup })));
const EmailTemplates = lazy(() => import('./features/settings/pages/EmailTemplates').then(m => ({ default: m.EmailTemplates })));
const SMSConfiguration = lazy(() => import('./features/settings/pages/SMSConfiguration').then(m => ({ default: m.SMSConfiguration })));
const APIKeysManagement = lazy(() => import('./features/settings/pages/APIKeysManagement').then(m => ({ default: m.APIKeysManagement })));
const WebhooksConfiguration = lazy(() => import('./features/settings/pages/WebhooksConfiguration').then(m => ({ default: m.WebhooksConfiguration })));
const CustomFieldsBuilder = lazy(() => import('./features/settings/pages/CustomFieldsBuilder').then(m => ({ default: m.CustomFieldsBuilder })));
const WorkflowAutomation = lazy(() => import('./features/settings/pages/WorkflowAutomation').then(m => ({ default: m.WorkflowAutomation })));
const NumberSequences = lazy(() => import('./features/settings/pages/NumberSequences').then(m => ({ default: m.NumberSequences })));
const SystemHealthMonitor = lazy(() => import('./features/settings/pages/SystemHealthMonitor').then(m => ({ default: m.SystemHealthMonitor })));
const DatabaseMaintenance = lazy(() => import('./features/settings/pages/DatabaseMaintenance').then(m => ({ default: m.DatabaseMaintenance })));
const BackupRestore = lazy(() => import('./features/settings/pages/BackupRestore').then(m => ({ default: m.BackupRestore })));
const LocalizationSettings = lazy(() => import('./features/settings/pages/LocalizationSettings').then(m => ({ default: m.LocalizationSettings })));
const SecuritySettings = lazy(() => import('./features/settings/pages/SecuritySettings').then(m => ({ default: m.SecuritySettings })));

// Subscription
const SubscriptionDashboard = lazy(() => import('./features/subscription/pages/SubscriptionDashboard').then(m => ({ default: m.SubscriptionDashboard })));
const PlanManagement = lazy(() => import('./features/subscription/pages/PlanManagement').then(m => ({ default: m.PlanManagement })));
const BillingHistory = lazy(() => import('./features/subscription/pages/BillingHistory').then(m => ({ default: m.BillingHistory })));
const PaymentMethods = lazy(() => import('./features/subscription/pages/PaymentMethods').then(m => ({ default: m.PaymentMethods })));
const AddOns = lazy(() => import('./features/subscription/pages/AddOns').then(m => ({ default: m.AddOns })));
const UsageAnalytics = lazy(() => import('./features/subscription/pages/UsageAnalytics').then(m => ({ default: m.UsageAnalytics })));
const TeamMembers = lazy(() => import('./features/subscription/pages/TeamMembers').then(m => ({ default: m.TeamMembers })));
const SubscriptionSettings = lazy(() => import('./features/subscription/pages/SubscriptionSettings').then(m => ({ default: m.SubscriptionSettings })));
const CancelSubscription = lazy(() => import('./features/subscription/pages/CancelSubscription').then(m => ({ default: m.CancelSubscription })));
const RefundPolicy = lazy(() => import('./features/subscription/pages/RefundPolicy').then(m => ({ default: m.RefundPolicy })));
const DownloadInvoice = lazy(() => import('./features/subscription/pages/DownloadInvoice').then(m => ({ default: m.DownloadInvoice })));
const TaxDocuments = lazy(() => import('./features/subscription/pages/TaxDocuments').then(m => ({ default: m.TaxDocuments })));
const NotificationPreferences = lazy(() => import('./features/subscription/pages/NotificationPreferences').then(m => ({ default: m.NotificationPreferences })));

const useStyles = makeStyles({
  app: {
    width: '100%',
    height: '100vh',
    ...shorthands.overflow('hidden'),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    width: '100%',
  },
});

const LoadingFallback = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingContainer}>
      <Spinner size="large" label="Loading..." />
    </div>
  );
};

function App() {
  const classes = useStyles();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return (
    <div className={classes.app}>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<ExecutiveDashboard />} />

                      {/* Products */}
                      <Route path="/products">
                        <Route index element={<ProductList />} />
                        <Route path="new" element={<ProductForm />} />
                        <Route path=":id" element={<ProductDetail />} />
                        <Route path="edit/:id" element={<ProductForm />} />
                        <Route path="categories" element={<CategoryManagement />} />
                        <Route path="variants" element={<ProductVariants />} />
                        <Route path="bundles" element={<ProductBundles />} />
                        <Route path="reviews" element={<ProductReviews />} />
                        <Route path="price-history" element={<ProductPriceHistory />} />
                        <Route path="comparison" element={<ProductComparison />} />
                        <Route path="barcode-generator" element={<BarcodeGenerator />} />
                        <Route path="import-export" element={<ProductImportExport />} />
                        <Route path="bulk-price-update" element={<BulkPriceUpdate />} />
                      </Route>

                      {/* Inventory */}
                      <Route path="/inventory">
                        <Route path="stock-levels" element={<StockLevels />} />
                        <Route path="stock-adjustment" element={<StockAdjustment />} />
                        <Route path="stock-transfer" element={<StockTransfer />} />
                        <Route path="stock-movement-history" element={<StockMovementHistory />} />
                        <Route path="stock-count" element={<StockCount />} />
                        <Route path="bin-location" element={<BinLocationManagement />} />
                        <Route path="reorder-alerts" element={<ReorderAlerts />} />
                        <Route path="valuation-report" element={<InventoryValuationReport />} />
                        <Route path="dead-stock-analysis" element={<DeadStockAnalysis />} />
                      </Route>

                      {/* POS */}
                      <Route path="/pos">
                        <Route path="terminal" element={<POSTerminal />} />
                        <Route path="sessions" element={<POSSessions />} />
                        <Route path="cash-management" element={<CashManagement />} />
                        <Route path="receipt-history" element={<ReceiptHistory />} />
                        <Route path="returns-exchanges" element={<ReturnsExchanges />} />
                        <Route path="customer-display" element={<CustomerDisplay />} />
                        <Route path="reports" element={<POSReportsAnalytics />} />
                        <Route path="shift-management" element={<POSShiftManagement />} />
                        <Route path="configuration" element={<POSConfiguration />} />
                      </Route>

                      {/* Sales */}
                      <Route path="/sales">
                        <Route path="orders" element={<SalesOrderList />} />
                        <Route path="quotations" element={<QuotationManagement />} />
                        <Route path="returns" element={<SalesReturns />} />
                        <Route path="commissions" element={<CommissionTracking />} />
                        <Route path="payments" element={<CustomerPayments />} />
                        <Route path="territories" element={<TerritoryManagement />} />
                        <Route path="delivery" element={<DeliveryManagement />} />
                      </Route>

                      {/* Purchase */}
                      <Route path="/purchase">
                        <Route path="orders" element={<PurchaseOrderList />} />
                        <Route path="requisitions" element={<PurchaseRequisitions />} />
                        <Route path="suppliers" element={<SupplierManagement />} />
                        <Route path="returns" element={<PurchaseReturns />} />
                        <Route path="payments" element={<SupplierPayments />} />
                        <Route path="supplier-performance" element={<SupplierPerformanceAnalytics />} />
                        <Route path="analytics" element={<PurchaseAnalytics />} />
                        <Route path="rfq" element={<RFQManagement />} />
                        <Route path="contracts" element={<SupplierContracts />} />
                        <Route path="forecasting" element={<PurchaseForecasting />} />
                        <Route path="receiving" element={<ReceivingManagement />} />
                      </Route>

                      {/* Customers (redirect to CRM) */}
                      <Route path="/customers" element={<CustomerList />} />

                      {/* CRM */}
                      <Route path="/crm">
                        <Route path="leads" element={<LeadManagement />} />
                        <Route path="opportunities" element={<OpportunityManagement />} />
                        <Route path="contacts" element={<ContactManagement />} />
                        <Route path="activity-timeline" element={<ActivityTimeline />} />
                        <Route path="segmentation" element={<CustomerSegmentation />} />
                        <Route path="portal" element={<CustomerPortal />} />
                        <Route path="support-tickets" element={<SupportTickets />} />
                        <Route path="loyalty" element={<LoyaltyProgram />} />
                        <Route path="email-campaigns" element={<EmailCampaigns />} />
                        <Route path="analytics" element={<CRMAnalytics />} />
                      </Route>

                      {/* Warehouses */}
                      <Route path="/warehouses" element={<WarehouseList />} />

                      {/* HR */}
                      <Route path="/hr">
                        <Route path="employees" element={<EmployeeList />} />
                        <Route path="attendance" element={<AttendanceManagement />} />
                        <Route path="payroll" element={<PayrollProcessing />} />
                        <Route path="leave" element={<LeaveManagement />} />
                        <Route path="performance" element={<PerformanceReviews />} />
                        <Route path="recruitment" element={<RecruitmentPipeline />} />
                        <Route path="expenses" element={<ExpenseClaims />} />
                        <Route path="shifts" element={<ShiftScheduling />} />
                        <Route path="self-service" element={<EmployeeSelfService />} />
                        <Route path="benefits" element={<BenefitsManagement />} />
                        <Route path="exit" element={<ExitManagement />} />
                        <Route path="org-chart" element={<OrganizationChart />} />
                        <Route path="documents" element={<DocumentManagement />} />
                        <Route path="announcements" element={<Announcements />} />
                        <Route path="analytics" element={<HRAnalytics />} />
                      </Route>

                      {/* Accounting */}
                      <Route path="/accounting">
                        <Route path="chart-of-accounts" element={<ChartOfAccounts />} />
                        <Route path="journal-entries" element={<JournalEntries />} />
                        <Route path="general-ledger" element={<GeneralLedger />} />
                        <Route path="bank-reconciliation" element={<BankReconciliation />} />
                        <Route path="accounts-receivable" element={<AccountsReceivable />} />
                        <Route path="accounts-payable" element={<AccountsPayable />} />
                        <Route path="budget-planning" element={<BudgetPlanning />} />
                        <Route path="cost-centers" element={<CostCenters />} />
                        <Route path="fixed-assets" element={<FixedAssets />} />
                        <Route path="depreciation" element={<DepreciationCalculator />} />
                        <Route path="financial-statements" element={<FinancialStatements />} />
                        <Route path="cash-flow" element={<CashFlowManagement />} />
                        <Route path="audit-trail" element={<AuditTrail />} />
                        <Route path="multi-currency" element={<MultiCurrency />} />
                      </Route>

                      {/* Reports */}
                      <Route path="/reports">
                        <Route path="executive-dashboard" element={<ExecutiveDashboardReport />} />
                        <Route path="sales" element={<SalesReport />} />
                        <Route path="sales-analytics" element={<SalesAnalytics />} />
                        <Route path="inventory" element={<InventoryReport />} />
                        <Route path="financial" element={<FinancialReport />} />
                        <Route path="aged-receivables" element={<AgedReceivablesReport />} />
                        <Route path="aged-payables" element={<AgedPayablesReport />} />
                        <Route path="profitability" element={<ProfitabilityAnalysis />} />
                        <Route path="customer-analysis" element={<CustomerAnalysisReport />} />
                        <Route path="product-performance" element={<ProductPerformanceReport />} />
                        <Route path="supplier-analysis" element={<SupplierAnalysisReport />} />
                        <Route path="variance" element={<VarianceReports />} />
                        <Route path="trend-analysis" element={<TrendAnalysis />} />
                        <Route path="scheduled" element={<ScheduledReports />} />
                        <Route path="custom-builder" element={<CustomReportBuilder />} />
                      </Route>

                      {/* Subscription */}
                      <Route path="/subscription">
                        <Route index element={<SubscriptionDashboard />} />
                        <Route path="plans" element={<PlanManagement />} />
                        <Route path="billing" element={<BillingHistory />} />
                        <Route path="invoices" element={<DownloadInvoice />} />
                        <Route path="payment-methods" element={<PaymentMethods />} />
                        <Route path="add-ons" element={<AddOns />} />
                        <Route path="usage" element={<UsageAnalytics />} />
                        <Route path="team" element={<TeamMembers />} />
                        <Route path="settings" element={<SubscriptionSettings />} />
                        <Route path="notifications" element={<NotificationPreferences />} />
                        <Route path="tax-documents" element={<TaxDocuments />} />
                        <Route path="refund-policy" element={<RefundPolicy />} />
                        <Route path="cancel" element={<CancelSubscription />} />
                      </Route>

                      {/* Settings */}
                      <Route path="/settings">
                        <Route path="company" element={<CompanySettings />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="tax" element={<TaxConfiguration />} />
                        <Route path="payment-methods" element={<PaymentMethodsSetup />} />
                        <Route path="email-templates" element={<EmailTemplates />} />
                        <Route path="sms" element={<SMSConfiguration />} />
                        <Route path="api-keys" element={<APIKeysManagement />} />
                        <Route path="webhooks" element={<WebhooksConfiguration />} />
                        <Route path="custom-fields" element={<CustomFieldsBuilder />} />
                        <Route path="workflow" element={<WorkflowAutomation />} />
                        <Route path="number-sequences" element={<NumberSequences />} />
                        <Route path="system-health" element={<SystemHealthMonitor />} />
                        <Route path="database" element={<DatabaseMaintenance />} />
                        <Route path="backup" element={<BackupRestore />} />
                        <Route path="localization" element={<LocalizationSettings />} />
                        <Route path="security" element={<SecuritySettings />} />
                      </Route>

                      {/* 404 - Default redirect */}
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </AppLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
