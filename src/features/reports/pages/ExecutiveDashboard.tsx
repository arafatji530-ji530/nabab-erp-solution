/**
 * Reports - Executive Dashboard
 * EXPERT: UI/UX Designer (Data Visualization)
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
  Badge,
  ProgressBar,
} from '@fluentui/react-components';
import { ArrowTrendingLines20Regular, ArrowDownload20Regular, CalendarLtr20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  kpiCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  chartCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    minHeight: '300px',
  },
});

export const ExecutiveDashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Executive Dashboard</Title3>
          <Text>Real-time business intelligence and KPIs</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<CalendarLtr20Regular />}>
            March 2026
          </Button>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export Report
          </Button>
        </div>
      </div>

      <div className={classes.kpiGrid}>
        <Card className={classes.kpiCard}>
          <Text size={200} block>
            Total Revenue
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1, marginTop: tokens.spacingVerticalS }}>
            {formatCurrency(12500000)}
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, marginTop: tokens.spacingVerticalXS }}>
            <Badge appearance="tint" color="success" size="small">
              ↑ 15.3%
            </Badge>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              vs last month
            </Text>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <Text size={200} block>
            Net Profit
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1, marginTop: tokens.spacingVerticalS }}>
            {formatCurrency(3200000)}
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, marginTop: tokens.spacingVerticalXS }}>
            <Badge appearance="tint" color="success" size="small">
              ↑ 8.7%
            </Badge>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              25.6% margin
            </Text>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <Text size={200} block>
            Cash Flow
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2, marginTop: tokens.spacingVerticalS }}>
            {formatCurrency(1850000)}
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, marginTop: tokens.spacingVerticalXS }}>
            <Badge appearance="tint" color="warning" size="small">
              ↓ 3.2%
            </Badge>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              vs last month
            </Text>
          </div>
        </Card>

        <Card className={classes.kpiCard}>
          <Text size={200} block>
            Active Customers
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1, marginTop: tokens.spacingVerticalS }}>
            2,456
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, marginTop: tokens.spacingVerticalXS }}>
            <Badge appearance="tint" color="success" size="small">
              ↑ 12.5%
            </Badge>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              vs last month
            </Text>
          </div>
        </Card>
      </div>

      <div className={classes.chartGrid}>
        <Card className={classes.chartCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
            <div>
              <Title3>Revenue Trend</Title3>
              <Text size={300}>Monthly performance</Text>
            </div>
            <ArrowTrendingLines20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {['January', 'February', 'March'].map((month, idx) => {
              const value = [10500000, 11200000, 12500000][idx];
              const percentage = ((value / 15000000) * 100).toFixed(1);
              return (
                <div key={month}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                    <Text size={300}>{month}</Text>
                    <Text size={300} weight="semibold">
                      {formatCurrency(value)}
                    </Text>
                  </div>
                  <ProgressBar value={parseFloat(percentage)} max={100} color="brand" thickness="large" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className={classes.chartCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
            <div>
              <Title3>Top Products</Title3>
              <Text size={300}>By revenue contribution</Text>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { name: 'Industrial Drill DX-500', value: 2800000, percentage: 22.4 },
              { name: 'Safety Equipment Kit', value: 2100000, percentage: 16.8 },
              { name: 'Power Generator PG-3000', value: 1850000, percentage: 14.8 },
              { name: 'Welding Machine WM-200', value: 1520000, percentage: 12.2 },
            ].map((product) => (
              <div key={product.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={300}>{product.name}</Text>
                  <Text size={300} weight="semibold">
                    {product.percentage}%
                  </Text>
                </div>
                <ProgressBar
                  value={product.percentage}
                  max={100}
                  color={product.percentage > 20 ? 'success' : product.percentage > 15 ? 'brand' : 'warning'}
                  thickness="large"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className={classes.chartGrid}>
        <Card className={classes.chartCard}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Department Performance</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { dept: 'Sales', target: 5000000, achieved: 5450000 },
              { dept: 'Marketing', target: 2000000, achieved: 1850000 },
              { dept: 'Operations', target: 3000000, achieved: 3200000 },
            ].map((item) => {
              const achievement = ((item.achieved / item.target) * 100).toFixed(1);
              return (
                <div key={item.dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                    <Text size={300} weight="semibold">
                      {item.dept}
                    </Text>
                    <Text size={300}>
                      {formatCurrency(item.achieved)} / {formatCurrency(item.target)}
                    </Text>
                  </div>
                  <ProgressBar
                    value={parseFloat(achievement)}
                    max={100}
                    color={parseFloat(achievement) >= 100 ? 'success' : parseFloat(achievement) >= 90 ? 'brand' : 'warning'}
                    thickness="large"
                  />
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3, marginTop: tokens.spacingVerticalXS }}>
                    {achievement}% of target
                  </Text>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className={classes.chartCard}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Quick Stats</Title3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalM }}>
            {[
              { label: 'Open Orders', value: '156', color: tokens.colorPaletteBlueForeground2 },
              { label: 'Pending Invoices', value: '42', color: tokens.colorPaletteYellowForeground1 },
              { label: 'Low Stock Items', value: '18', color: tokens.colorPaletteRedForeground1 },
              { label: 'New Customers', value: '89', color: tokens.colorPaletteGreenForeground1 },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  ...shorthands.padding(tokens.spacingVerticalL),
                  ...shorthands.borderRadius(tokens.borderRadiusMedium),
                  backgroundColor: tokens.colorNeutralBackground3,
                  textAlign: 'center',
                } as React.CSSProperties}
              >
                <Text size={600} weight="bold" block style={{ color: stat.color }}>
                  {stat.value}
                </Text>
                <Text size={200}>{stat.label}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
