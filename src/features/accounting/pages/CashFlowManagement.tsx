/**
 * Accounting - Cash Flow Management
 * EXPERT: UI/UX Designer (Financial Dashboards)
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
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

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

const CASH_FLOWS = [
  { id: '1', date: '2026-03-20', description: 'Sales Revenue', category: 'Operating', amount: 450000, balance: 1850000 },
  { id: '2', date: '2026-03-21', description: 'Supplier Payment', category: 'Operating', amount: -280000, balance: 1570000 },
  { id: '3', date: '2026-03-22', description: 'Equipment Purchase', category: 'Investing', amount: -150000, balance: 1420000 },
  { id: '4', date: '2026-03-23', description: 'Loan Repayment', category: 'Financing', amount: -50000, balance: 1370000 },
];

export const CashFlowManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Cash Flow Management</Title3>
        <Text>Track cash inflows and outflows</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Opening Balance
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(1400000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Inflows
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(450000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Outflows
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(-480000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Closing Balance
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(1370000)}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Cash Flow Transactions</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Running Balance</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CASH_FLOWS.map((cf) => (
              <TableRow key={cf.id}>
                <TableCell>
                  <Text size={300}>{formatDate(cf.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{cf.description}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="outline"
                    color={cf.category === 'Operating' ? 'brand' : cf.category === 'Investing' ? 'warning' : 'success'}
                  >
                    {cf.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text
                    weight="semibold"
                    style={{
                      color: cf.amount > 0 ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1,
                    }}
                  >
                    {cf.amount > 0 ? '+' : ''}
                    {formatCurrency(cf.amount)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(cf.balance)}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
