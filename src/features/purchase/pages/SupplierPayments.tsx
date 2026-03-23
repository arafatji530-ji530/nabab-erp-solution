/**
 * Purchase - Supplier Payments
 * EXPERT: Senior React Engineer (Payment Processing)
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

const PAYMENTS = [
  {
    id: '1',
    paymentNo: 'PAY-580',
    supplier: 'Office Supplies Ltd',
    invoiceNo: 'INV-SP-125',
    amount: 85000,
    paymentDate: '2026-03-20',
    method: 'Bank Transfer',
    status: 'Completed',
  },
  {
    id: '2',
    paymentNo: 'PAY-579',
    supplier: 'Tech Hardware Inc',
    invoiceNo: 'INV-SP-118',
    amount: 420000,
    paymentDate: '2026-03-19',
    method: 'Check',
    status: 'Pending',
  },
];

export const SupplierPayments = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Supplier Payments</Title3>
          <Text>Process and track payments to suppliers</Text>
        </div>
        <Button appearance="primary" icon={<Payment20Regular />}>
          Make Payment
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Paid
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(505000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Pending Payments
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(420000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            This Month
          </Text>
          <Text size={500} weight="bold" block>
            {formatCurrency(925000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Payment Count
          </Text>
          <Text size={500} weight="bold" block>
            2
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Recent Payments</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Payment #</TableHeaderCell>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Invoice #</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Payment Date</TableHeaderCell>
              <TableHeaderCell>Method</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYMENTS.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Text weight="semibold">{payment.paymentNo}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={payment.supplier} size={24} />
                    <Text>{payment.supplier}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{payment.invoiceNo}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(payment.amount)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(payment.paymentDate)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{payment.method}</Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={payment.status === 'Completed' ? 'success' : 'warning'}>
                    {payment.status}
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
