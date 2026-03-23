/**
 * Reports - Trend Analysis
 * EXPERT: Enterprise Solution Architect (Time Series Analytics)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Title3,
  Text,
  Card,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from '@fluentui/react-components';
import { DataTrending20Regular, ArrowTrendingDown20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
});

const TREND_DATA = [
  { month: 'Jan 2026', revenue: 8500000, orders: 245, customers: 128, avgOrderValue: 34693, growth: 8.5 },
  { month: 'Feb 2026', revenue: 9200000, orders: 268, customers: 142, avgOrderValue: 34328, growth: 8.2 },
  { month: 'Mar 2026', revenue: 10100000, orders: 295, customers: 158, avgOrderValue: 34237, growth: 9.8 },
];

export const TrendAnalysis = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Trend Analysis</Title3>
        <Text>Analyze historical trends and patterns across key metrics</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Revenue Growth (MoM)
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
            <DataTrending20Regular style={{ color: tokens.colorPaletteGreenForeground1, fontSize: '24px' }} />
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              +9.8%
            </Text>
          </div>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Order Volume Trend
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
            <DataTrending20Regular style={{ color: tokens.colorPaletteGreenForeground1, fontSize: '24px' }} />
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              +20.4%
            </Text>
          </div>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Customer Acquisition
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
            <DataTrending20Regular style={{ color: tokens.colorPaletteGreenForeground1, fontSize: '24px' }} />
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              +23.4%
            </Text>
          </div>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Avg Order Value Trend
          </Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
            <ArrowTrendingDown20Regular style={{ color: tokens.colorPaletteRedForeground1, fontSize: '24px' }} />
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteRedForeground1 }}>
              -1.3%
            </Text>
          </div>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Monthly Trends (Q1 2026)</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Month</TableHeaderCell>
              <TableHeaderCell>Revenue</TableHeaderCell>
              <TableHeaderCell>Total Orders</TableHeaderCell>
              <TableHeaderCell>New Customers</TableHeaderCell>
              <TableHeaderCell>Avg Order Value</TableHeaderCell>
              <TableHeaderCell>Growth Rate</TableHeaderCell>
              <TableHeaderCell>Trend</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TREND_DATA.map((item) => (
              <TableRow key={item.month}>
                <TableCell>
                  <Text weight="semibold">{item.month}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(item.revenue)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>{item.orders}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.customers}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatCurrency(item.avgOrderValue)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    +{item.growth}%
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={item.growth > 9 ? 'success' : item.growth > 7 ? 'brand' : 'warning'}>
                    <DataTrending20Regular style={{ marginRight: tokens.spacingHorizontalXXS }} />
                    {item.growth > 9 ? 'Strong' : item.growth > 7 ? 'Moderate' : 'Slow'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
