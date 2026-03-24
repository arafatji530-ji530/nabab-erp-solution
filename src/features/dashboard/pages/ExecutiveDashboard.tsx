import { useEffect, useState } from 'react';
import { makeStyles, shorthands, tokens, Card, Title3, Text, Spinner, ProgressBar, Badge } from '@fluentui/react-components';
import {
  ArrowTrending20Regular,
  ArrowDown20Regular,
  ArrowUp20Regular,
  TrendingUp20Regular,
  Person20Regular,
  ShoppingCart20Regular,
  Home20Regular,
  Target20Regular,
} from '@fluentui/react-icons';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { apiService } from '@/services/api';
import { formatCurrency, formatNumber } from '@/shared/utils/formatters';
import type { DashboardAPI } from '@/types/api';

const useStyles = makeStyles({
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  header: {
    marginBottom: tokens.spacingVerticalL,
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  kpiCard: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  kpiIconWrapper: {
    position: 'absolute',
    top: tokens.spacingVerticalM,
    right: tokens.spacingHorizontalM,
    fontSize: '32px',
    opacity: 0.1,
  },
  kpiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  kpiValue: {
    fontSize: '28px',
    fontWeight: tokens.fontWeightBold,
    lineHeight: '36px',
    marginTop: tokens.spacingVerticalM,
  },
  kpiTrend: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalS,
  },
  trendUp: {
    color: '#107C10',
  },
  trendDown: {
    color: '#D13438',
  },
  chartsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  chartCard: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    minHeight: '450px',
  },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '350px',
    marginTop: tokens.spacingVerticalL,
  },
  tablesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  tableCard: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    minHeight: '500px',
  },
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  tableRowHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    fontWeight: tokens.fontWeightSemibold,
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `2px solid ${tokens.colorNeutralStroke2}`,
  },
  badge: {
    marginLeft: tokens.spacingHorizontalS,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
  progressSection: {
    marginTop: tokens.spacingVerticalL,
  },
  progressItem: {
    marginBottom: tokens.spacingVerticalM,
  },
});

// Mock chart data generators
const generateSalesTrendData = () => [
  { date: 'Mar 18', sales: 45000, target: 50000 },
  { date: 'Mar 19', sales: 52000, target: 50000 },
  { date: 'Mar 20', sales: 48000, target: 50000 },
  { date: 'Mar 21', sales: 61000, target: 55000 },
  { date: 'Mar 22', sales: 58000, target: 55000 },
  { date: 'Mar 23', sales: 75000, target: 60000 },
  { date: 'Mar 24', sales: 82000, target: 60000 },
];

const generateCategoryData = () => [
  { name: 'Electronics', value: 35, fill: '#0078D4' },
  { name: 'Hardware', value: 25, fill: '#107C10' },
  { name: 'Tools', value: 20, fill: '#FFB900' },
  { name: 'Lighting', value: 15, fill: '#D83B01' },
  { name: 'Other', value: 5, fill: '#8764B8' },
];

const generateTopProductsData = () => [
  { name: 'Impact Drill', sales: 24500, qty: 145 },
  { name: 'Power Saw', sales: 21200, qty: 98 },
  { name: 'LED Panel', sales: 19800, qty: 220 },
  { name: 'Angle Grinder', sales: 18900, qty: 68 },
  { name: 'Circular Saw', sales: 16700, qty: 52 },
];

const generateRecentOrders = () => [
  { id: '101', customer: 'ABC Trading', amount: 45000, status: 'Delivered', date: '2026-03-24' },
  { id: '102', customer: 'XYZ Motors', amount: 28500, status: 'Processing', date: '2026-03-24' },
  { id: '103', customer: 'Tech Solutions', amount: 62000, status: 'Pending', date: '2026-03-23' },
  { id: '104', customer: 'Build Co.', amount: 35200, status: 'Shipped', date: '2026-03-23' },
  { id: '105', customer: 'Industrial Ltd', amount: 51800, status: 'Delivered', date: '2026-03-22' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return '#107C10';
    case 'Shipped':
      return '#0078D4';
    case 'Processing':
      return '#FFB900';
    case 'Pending':
      return '#D13438';
    default:
      return '#8A8886';
  }
};

export const Dashboard = () => {
  const classes = useStyles();
  const [kpis, setKpis] = useState<DashboardAPI.KPIResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample data for charts
  const salesTrendData = generateSalesTrendData();
  const categoryData = generateCategoryData();
  const topProductsData = generateTopProductsData();
  const recentOrders = generateRecentOrders();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.dashboard.getKPIs();
        setKpis(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={classes.loading}>
        <Spinner size="large" label="Loading dashboard..." />
      </div>
    );
  }

  if (!kpis) {
    return <Text>Failed to load dashboard data</Text>;
  }

  const avgOrderValue = kpis.totalRevenue.value / Math.max(kpis.totalOrders.value, 1);
  const profitMargin = 22.5; // Mock data
  const conversionRate = 3.8; // Mock data
  const customerSatisfaction = 94; // Mock data

  return (
    <div className={classes.dashboard}>
      {/* Header Section */}
      <div className={classes.header}>
        <Title3>Executive Dashboard</Title3>
        <Text>Welcome back! Here's what's happening with your business today.</Text>
      </div>

      {/* Primary KPIs Grid */}
      <div className={classes.kpiGrid}>
        <Card className={classes.kpiCard}>
          <div className={classes.kpiIconWrapper}><ShoppingCart20Regular /></div>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Total Revenue
              </Text>
            </div>
            <div className={classes.kpiValue}>
              {formatCurrency(kpis.totalRevenue.value)}
            </div>
          </div>
          <div
            className={`${classes.kpiTrend} ${
              kpis.totalRevenue.trend > 0 ? classes.trendUp : classes.trendDown
            }`}
          >
            {kpis.totalRevenue.trend > 0 ? (
              <ArrowUp20Regular />
            ) : (
              <ArrowDown20Regular />
            )}
            <span>{Math.abs(kpis.totalRevenue.trend)}% this month</span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div className={classes.kpiIconWrapper}><TrendingUp20Regular /></div>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Avg Order Value
              </Text>
            </div>
            <div className={classes.kpiValue}>
              {formatCurrency(avgOrderValue)}
            </div>
          </div>
          <div className={`${classes.kpiTrend} ${classes.trendUp}`}>
            <ArrowUp20Regular />
            <span>8.2% increase</span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div className={classes.kpiIconWrapper}><ShoppingCart20Regular /></div>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Total Orders
              </Text>
            </div>
            <div className={classes.kpiValue}>
              {formatNumber(kpis.totalOrders.value, 0)}
            </div>
          </div>
          <div
            className={`${classes.kpiTrend} ${
              kpis.totalOrders.trend > 0 ? classes.trendUp : classes.trendDown
            }`}
          >
            {kpis.totalOrders.trend > 0 ? (
              <ArrowUp20Regular />
            ) : (
              <ArrowDown20Regular />
            )}
            <span>{Math.abs(kpis.totalOrders.trend)}% vs last month</span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div className={classes.kpiIconWrapper}><Person20Regular /></div>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Total Customers
              </Text>
            </div>
            <div className={classes.kpiValue}>
              {formatNumber(kpis.totalCustomers.value, 0)}
            </div>
          </div>
          <div
            className={`${classes.kpiTrend} ${
              kpis.totalCustomers.trend > 0 ? classes.trendUp : classes.trendDown
            }`}
          >
            {kpis.totalCustomers.trend > 0 ? (
              <ArrowUp20Regular />
            ) : (
              <ArrowDown20Regular />
            )}
            <span>{Math.abs(kpis.totalCustomers.trend)}% growth</span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div className={classes.kpiIconWrapper}><Target20Regular /></div>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Profit Margin
              </Text>
            </div>
            <div className={classes.kpiValue}>{profitMargin.toFixed(1)}%</div>
          </div>
          <div className={`${classes.kpiTrend} ${classes.trendUp}`}>
            <ArrowUp20Regular />
            <span>1.5% improvement</span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div className={classes.kpiIconWrapper}><Home20Regular /></div>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Low Stock Items
              </Text>
            </div>
            <div className={classes.kpiValue}>
              {formatNumber(kpis.lowStockProducts.value, 0)}
            </div>
          </div>
          <div
            className={`${classes.kpiTrend} ${
              kpis.lowStockProducts.trend < 0 ? classes.trendUp : classes.trendDown
            }`}
          >
            {kpis.lowStockProducts.trend < 0 ? (
              <ArrowDown20Regular />
            ) : (
              <ArrowUp20Regular />
            )}
            <span>{Math.abs(kpis.lowStockProducts.trend)}% vs last week</span>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className={classes.chartsGrid}>
        {/* Sales Trend Chart */}
        <Card className={classes.chartCard}>
          <Title3>Sales Trend (Last 7 Days)</Title3>
          <div className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#0078D4"
                  strokeWidth={2}
                  dot={{ fill: '#0078D4' }}
                  name="Actual Sales"
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#FFB900"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Distribution */}
        <Card className={classes.chartCard}>
          <Title3>Sales by Category</Title3>
          <div className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Products Section */}
      <Card className={classes.chartCard}>
        <Title3>Top Selling Products (This Month)</Title3>
        <div className={classes.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip formatter={(value) => value} />
              <Legend />
              <Bar yAxisId="left" dataKey="sales" fill="#0078D4" name="Sales (৳)" />
              <Bar yAxisId="right" dataKey="qty" fill="#107C10" name="Quantity Sold" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Tables Section */}
      <div className={classes.tablesGrid}>
        {/* Recent Orders */}
        <Card className={classes.tableCard}>
          <Title3>Recent Orders</Title3>
          <div>
            <div className={classes.tableRowHeader}>
              <Text style={{ flex: '0.8' }}>Order ID</Text>
              <Text style={{ flex: '1.5' }}>Customer</Text>
              <Text style={{ flex: '1' }}>Amount</Text>
              <Text style={{ flex: '1' }}>Status</Text>
            </div>
            {recentOrders.map((order) => (
              <div key={order.id} className={classes.tableRow}>
                <Text style={{ flex: '0.8', fontWeight: 'bold' }}>{order.id}</Text>
                <Text style={{ flex: '1.5' }}>{order.customer}</Text>
                <Text style={{ flex: '1' }}>{formatCurrency(order.amount)}</Text>
                <div style={{ flex: '1' }}>
                  <Badge
                    appearance="tint"
                    color={getStatusColor(order.status) === '#107C10' ? 'success' : 'warning'}
                    className={classes.badge}
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className={classes.tableCard}>
          <Title3>Key Performance Indicators</Title3>
          <div className={classes.progressSection}>
            <div className={classes.progressItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
                <Text weight="semibold">Conversion Rate</Text>
                <Text>{conversionRate}%</Text>
              </div>
              <ProgressBar value={conversionRate / 10} color="success" />
            </div>

            <div className={classes.progressItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
                <Text weight="semibold">Customer Satisfaction</Text>
                <Text>{customerSatisfaction}%</Text>
              </div>
              <ProgressBar value={customerSatisfaction / 100} color="success" />
            </div>

            <div className={classes.progressItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
                <Text weight="semibold">Inventory Turnover</Text>
                <Text>87%</Text>
              </div>
              <ProgressBar value={0.87} color="success" />
            </div>

            <div className={classes.progressItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
                <Text weight="semibold">Resource Utilization</Text>
                <Text>76%</Text>
              </div>
              <ProgressBar value={0.76} color="warning" />
            </div>

            {/* Summary Stats */}
            <div style={{ marginTop: tokens.spacingVerticalL, paddingTop: tokens.spacingVerticalL, borderTop: `1px solid ${tokens.colorNeutralStroke2}` }}>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Pending Tasks
              </Text>
              <Text>Orders: {kpis.pendingOrders}</Text>
              <Text>Payments: {kpis.pendingPayments}</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

// Alias export for routing
export const ExecutiveDashboard = Dashboard;
