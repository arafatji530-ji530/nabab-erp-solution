/**
 * Dashboard - Analytics Dashboard Page
 * Advanced analytics with charts and metrics
 */

import { makeStyles, shorthands, tokens, Title3, Text, Card, Button, Dropdown, Option } from '@fluentui/react-components';
import { ChartMultiple20Regular, ArrowTrending20Regular, People20Regular, ShoppingBag20Regular, Calendar20Regular } from '@fluentui/react-icons';
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
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  metricHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  chartCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  chartPlaceholder: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

export const AnalyticsDashboard = () => {
  const classes = useStyles();

  const metrics = [
    {
      title: 'Total Revenue',
      value: formatCurrency(15780000),
      change: '+12.5%',
      trend: 'up',
      icon: <ChartMultiple20Regular style={{ fontSize: '24px', color: tokens.colorPaletteGreenForeground1 }} />,
      color: tokens.colorPaletteGreenForeground1,
    },
    {
      title: 'Active Customers',
      value: formatNumber(1248, 0),
      change: '+8.2%',
      trend: 'up',
      icon: <People20Regular style={{ fontSize: '24px', color: tokens.colorPaletteBlueForeground2 }} />,
      color: tokens.colorPaletteBlueForeground2,
    },
    {
      title: 'Products Sold',
      value: formatNumber(3567, 0),
      change: '+15.3%',
      trend: 'up',
      icon: <ShoppingBag20Regular style={{ fontSize: '24px', color: tokens.colorPaletteYellowForeground1 }} />,
      color: tokens.colorPaletteYellowForeground1,
    },
    {
      title: 'Orders This Month',
      value: formatNumber(892, 0),
      change: '-3.1%',
      trend: 'down',
      icon: <Calendar20Regular style={{ fontSize: '24px', color: tokens.colorPaletteRedForeground1 }} />,
      color: tokens.colorPaletteRedForeground1,
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Analytics Dashboard</Title3>
          <Text>Real-time business intelligence and insights</Text>
        </div>
        <Button appearance="primary">Generate Report</Button>
      </div>

      <Card className={classes.toolbar}>
        <Dropdown placeholder="Last 30 Days" defaultValue="30days">
          <Option value="7days">Last 7 Days</Option>
          <Option value="30days">Last 30 Days</Option>
          <Option value="90days">Last 90 Days</Option>
          <Option value="year">This Year</Option>
        </Dropdown>
        <Dropdown placeholder="All Regions">
          <Option value="all">All Regions</Option>
          <Option value="dhaka">Dhaka</Option>
          <Option value="chittagong">Chittagong</Option>
        </Dropdown>
      </Card>

      <div className={classes.metricsGrid}>
        {metrics.map((metric, index) => (
          <Card key={index} className={classes.metricCard}>
            <div className={classes.metricHeader}>
              <div>
                <Text size={300} block>
                  {metric.title}
                </Text>
                <Text size={600} weight="bold" block style={{ color: metric.color, marginTop: tokens.spacingVerticalXS }}>
                  {metric.value}
                </Text>
              </div>
              {metric.icon}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
              <ArrowTrending20Regular
                style={{
                  fontSize: '16px',
                  color: metric.trend === 'up' ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1,
                  transform: metric.trend === 'down' ? 'rotate(180deg)' : 'none',
                }}
              />
              <Text
                size={200}
                style={{
                  color: metric.trend === 'up' ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1,
                }}
              >
                {metric.change} from last period
              </Text>
            </div>
          </Card>
        ))}
      </div>

      <div className={classes.chartGrid}>
        <Card className={classes.chartCard}>
          <Title3>Revenue Trend</Title3>
          <div className={classes.chartPlaceholder}>
            <div style={{ textAlign: 'center' }}>
              <ChartMultiple20Regular style={{ fontSize: '64px', color: tokens.colorNeutralForeground3 }} />
              <Text block style={{ color: tokens.colorNeutralForeground3, marginTop: tokens.spacingVerticalM }}>
                Chart visualization placeholder
              </Text>
            </div>
          </div>
        </Card>

        <Card className={classes.chartCard}>
          <Title3>Top Categories</Title3>
          <div className={classes.chartPlaceholder}>
            <div style={{ textAlign: 'center' }}>
              <ChartMultiple20Regular style={{ fontSize: '64px', color: tokens.colorNeutralForeground3 }} />
              <Text block style={{ color: tokens.colorNeutralForeground3, marginTop: tokens.spacingVerticalM }}>
                Chart visualization placeholder
              </Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
