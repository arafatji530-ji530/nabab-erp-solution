/**
 * Accounting - Accounts Payable
 * EXPERT: UI/UX Designer (Financial Workflows)
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
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Avatar,
} from '@fluentui/react-components';
import { Payment20Regular } from '@fluentui/react-icons';
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

const BILLS = [
  { id: '1', billNo: 'BILL-501', supplier: 'Office Supplies Ltd', amount: 85000, due: '2026-04-05', status: 'Pending' },
  { id: '2', billNo: 'BILL-502', supplier: 'Tech Hardware Inc', amount: 420000, due: '2026-03-28', status: 'Overdue' },
  { id: '3', billNo: 'BILL-503', supplier: 'Utilities Company', amount: 12000, due: '2026-04-10', status: 'Scheduled' },
];

export const AccountsPayable = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Accounts Payable</Title3>
        <Text>Manage supplier bills and payments</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Payable
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(517000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Due This Month
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(505000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Overdue
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(420000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Scheduled Payments
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(12000)}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Pending Bills</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Bill #</TableHeaderCell>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Due Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BILLS.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>
                  <Text weight="semibold">{bill.billNo}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={bill.supplier} size={24} />
                    <Text>{bill.supplier}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(bill.amount)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(bill.due)}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={bill.status === 'Overdue' ? 'danger' : bill.status === 'Scheduled' ? 'success' : 'warning'}
                  >
                    {bill.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="primary" size="small" icon={<Payment20Regular />}>
                    Pay Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
