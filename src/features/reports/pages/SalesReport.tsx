/**
 * Reports - Sales Report Page
 * Comprehensive sales analytics and reporting
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Title3,
  Text,
  Card,
  Dropdown,
  Option,
  Tab,
  TabList,
} from '@fluentui/react-components';
import {
  ArrowDownload20Regular,
  ChartMultiple20Regular,
  Document20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatNumber } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  metricCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  chartCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    minHeight: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    ...shorthands.borderBottom('2px', 'solid', tokens.colorNeutralStroke2),
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalM,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
});

const MOCK_SALES_DATA = [
  { product: 'Drill Machine', units: 45, revenue: 202500, profit: 45000, margin: 22.2 },
  { product: 'Circuit Breaker', units: 120, revenue: 102000, profit: 25500, margin: 25.0 },
  { product: 'Safety Helmet', units: 200, revenue: 90000, profit: 18000, margin: 20.0 },
  { product: 'Wire Cable', units: 85, revenue: 102000, profit: 20400, margin: 20.0 },
];

export const SalesReport = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('overview');

  const totalRevenue = MOCK_SALES_DATA.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = MOCK_SALES_DATA.reduce((sum, item) => sum + item.profit, 0);
  const totalUnits = MOCK_SALES_DATA.reduce((sum, item) => sum + item.units, 0);
  const avgMargin = (totalProfit / totalRevenue) * 100;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Sales Reports</Title3>
          <Text>Analyze sales performance and trends</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<Document20Regular />}>
            PDF Report
          </Button>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export Data
          </Button>
        </div>
      </div>

      <Card className={classes.toolbar}>
        <Dropdown placeholder="This Month" defaultValue="month">
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
          <Option value="quarter">This Quarter</Option>
          <Option value="year">This Year</Option>
        </Dropdown>
        <Dropdown placeholder="All Products">
          <Option value="all">All Products</Option>
          <Option value="category">By Category</Option>
        </Dropdown>
        <Dropdown placeholder="All Regions">
          <Option value="all">All Regions</Option>
          <Option value="dhaka">Dhaka</Option>
          <Option value="chittagong">Chittagong</Option>
        </Dropdown>
      </Card>

      <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value as string)}>
        <Tab value="overview">Overview</Tab>
        <Tab value="products">By Product</Tab>
        <Tab value="customers">By Customer</Tab>
        <Tab value="regions">By Region</Tab>
      </TabList>

      <div className={classes.metricsGrid}>
        <Card className={classes.metricCard}>
          <ChartMultiple20Regular
            style={{ fontSize: '28px', color: tokens.colorPaletteGreenForeground1, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={200} block>
            Total Revenue
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalRevenue)}
          </Text>
          <Text size={200} style={{ color: tokens.colorPaletteGreenForeground1 }}>
            +12.5% vs last month
          </Text>
        </Card>

        <Card className={classes.metricCard}>
          <ChartMultiple20Regular
            style={{ fontSize: '28px', color: tokens.colorBrandForeground1, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={200} block>
            Gross Profit
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalProfit)}
          </Text>
          <Text size={200} style={{ color: tokens.colorBrandForeground1 }}>
            {avgMargin.toFixed(1)}% margin
          </Text>
        </Card>

        <Card className={classes.metricCard}>
          <ChartMultiple20Regular
            style={{ fontSize: '28px', color: tokens.colorPaletteBlueForeground2, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={200} block>
            Units Sold
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {formatNumber(totalUnits, 0)}
          </Text>
          <Text size={200} style={{ color: tokens.colorPaletteBlueForeground2 }}>
            +8.3% growth
          </Text>
        </Card>

        <Card className={classes.metricCard}>
          <ChartMultiple20Regular
            style={{ fontSize: '28px', color: tokens.colorPaletteYellowForeground1, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={200} block>
            Avg Order Value
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(totalRevenue / 120)}
          </Text>
          <Text size={200} style={{ color: tokens.colorPaletteYellowForeground1 }}>
            120 orders
          </Text>
        </Card>
      </div>

      <Card className={classes.chartCard}>
        <div style={{ textAlign: 'center' }}>
          <ChartMultiple20Regular style={{ fontSize: '64px', color: tokens.colorNeutralForeground3 }} />
          <Text size={400} block style={{ marginTop: tokens.spacingVerticalM, color: tokens.colorNeutralForeground3 }}>
            Sales chart visualization will be rendered here
          </Text>
          <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
            Integration with Recharts or similar library
          </Text>
        </div>
      </Card>

      <Card className={classes.tableCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Top Products</Title3>
        <div className={classes.table}>
          <div className={classes.tableHeader}>
            <div>Product</div>
            <div>Units Sold</div>
            <div>Revenue</div>
            <div>Profit</div>
            <div>Margin</div>
          </div>
          {MOCK_SALES_DATA.map((item, index) => (
            <div key={index} className={classes.tableRow}>
              <Text weight="semibold">{item.product}</Text>
              <Text>{formatNumber(item.units, 0)}</Text>
              <Text weight="semibold">{formatCurrency(item.revenue)}</Text>
              <Text style={{ color: tokens.colorPaletteGreenForeground1 }}>{formatCurrency(item.profit)}</Text>
              <Text>{item.margin.toFixed(1)}%</Text>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
