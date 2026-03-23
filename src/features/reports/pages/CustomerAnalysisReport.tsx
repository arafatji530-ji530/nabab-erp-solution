/**
 * Reports - Customer Analysis Report
 * EXPERT: Senior React Engineer (Customer Intelligence)
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
  Avatar,
} from '@fluentui/react-components';
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

const CUSTOMERS = [
  {
    id: '1',
    name: 'ABC Corp',
    totalOrders: 45,
    totalRevenue: 2250000,
    avgOrderValue: 50000,
    lastOrder: '2026-03-18',
    tier: 'Platinum',
    lifetimeValue: 8500000,
  },
  {
    id: '2',
    name: 'XYZ Ltd',
    totalOrders: 32,
    totalRevenue: 1600000,
    avgOrderValue: 50000,
    lastOrder: '2026-03-15',
    tier: 'Gold',
    lifetimeValue: 5200000,
  },
  {
    id: '3',
    name: 'Tech Solutions',
    totalOrders: 18,
    totalRevenue: 900000,
    avgOrderValue: 50000,
    lastOrder: '2026-03-10',
    tier: 'Silver',
    lifetimeValue: 2800000,
  },
];

export const CustomerAnalysisReport = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Customer Analysis Report</Title3>
        <Text>Analyze customer behavior, lifetime value, and segmentation</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Customers
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {CUSTOMERS.length}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Avg Lifetime Value
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(5500000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Avg Order Value
          </Text>
          <Text size={500} weight="bold" block>
            {formatCurrency(50000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Orders
          </Text>
          <Text size={500} weight="bold" block>
            95
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Top Customers</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Total Orders</TableHeaderCell>
              <TableHeaderCell>Total Revenue</TableHeaderCell>
              <TableHeaderCell>Avg Order Value</TableHeaderCell>
              <TableHeaderCell>Lifetime Value</TableHeaderCell>
              <TableHeaderCell>Tier</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CUSTOMERS.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={customer.name} size={28} />
                    <Text weight="semibold">{customer.name}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{customer.totalOrders}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(customer.totalRevenue)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>{formatCurrency(customer.avgOrderValue)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold">{formatCurrency(customer.lifetimeValue)}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={customer.tier === 'Platinum' ? 'important' : customer.tier === 'Gold' ? 'warning' : 'success'}
                  >
                    {customer.tier}
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
