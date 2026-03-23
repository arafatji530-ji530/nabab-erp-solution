import { useEffect, useState } from 'react';
import { makeStyles, shorthands, tokens, Card, Title3, Text, Spinner } from '@fluentui/react-components';
import {
  ArrowTrending20Regular,
  ArrowDown20Regular,
  ArrowUp20Regular,
} from '@fluentui/react-icons';
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  kpiCard: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    height: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  kpiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  kpiValue: {
    fontSize: tokens.fontSizeHero900,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightHero900,
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
  chartSection: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  chartCard: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    minHeight: '400px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
});

export const Dashboard = () => {
  const classes = useStyles();
  const [kpis, setKpis] = useState<DashboardAPI.KPIResponse | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={classes.dashboard}>
      <div className={classes.header}>
        <Title3>Executive Dashboard</Title3>
        <Text>Welcome back! Here's what's happening with your business today.</Text>
      </div>

      <div className={classes.kpiGrid}>
        <Card className={classes.kpiCard}>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Total Revenue
              </Text>
              <ArrowTrending20Regular />
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
            <span>
              {Math.abs(kpis.totalRevenue.trend)}% vs last month
            </span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Total Orders
              </Text>
              <ArrowTrending20Regular />
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
            <span>
              {Math.abs(kpis.totalOrders.trend)}% vs last month
            </span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Total Customers
              </Text>
              <ArrowTrending20Regular />
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
            <span>
              {Math.abs(kpis.totalCustomers.trend)}% vs last month
            </span>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <div>
            <div className={classes.kpiHeader}>
              <Text weight="semibold" size={400}>
                Low Stock Products
              </Text>
              <ArrowTrending20Regular />
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
            <span>
              {Math.abs(kpis.lowStockProducts.trend)}% vs last month
            </span>
          </div>
        </Card>
      </div>

      <div className={classes.chartSection}>
        <Card className={classes.chartCard}>
          <Title3>Sales Trend</Title3>
          <Text>Sales chart visualization will be implemented with Recharts</Text>
        </Card>

        <Card className={classes.chartCard}>
          <Title3>Quick Stats</Title3>
          <div style={{ marginTop: tokens.spacingVerticalL }}>
            <Text>
              <strong>Pending Orders:</strong> {kpis.pendingOrders}
            </Text>
            <br />
            <Text>
              <strong>Pending Payments:</strong> {kpis.pendingPayments}
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Alias export for routing
export const ExecutiveDashboard = Dashboard;
