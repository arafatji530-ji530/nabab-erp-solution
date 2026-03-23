/**
 * Sales - Customer Payments
 * EXPERT: Enterprise Solution Architect (Payment Processing)
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
  { id: '1', paymentNo: 'PAY-1245', customer: 'ABC Corp', invoice: 'INV-1001', amount: 250000, date: '2026-03-20', method: 'Bank Transfer', status: 'Completed' },
  { id: '2', paymentNo: 'PAY-1244', customer: 'XYZ Ltd', invoice: 'INV-1002', amount: 180000, date: '2026-03-19', method: 'Check', status: 'Pending' },
  { id: '3', paymentNo: 'PAY-1243', customer: 'Tech Solutions', invoice: 'INV-1003', amount: 320000, date: '2026-03-18', method: 'Cash', status: 'Completed' },
];

export const CustomerPayments = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Customer Payments</Title3>
          <Text>Track and process customer payments</Text>
        </div>
        <Button appearance="primary" icon={<Payment20Regular />}>
          Record Payment
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Received
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(750000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Pending
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(180000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Payment Count
          </Text>
          <Text size={500} weight="bold" block>
            3
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            This Monthmemb
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(750000)}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Recent Payments</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Payment #</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
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
                    <Avatar name={payment.customer} size={24} />
                    <Text>{payment.customer}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{payment.invoice}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(payment.amount)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(payment.date)}</Text>
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
