/**
 * Accounting - Accounts Receivable
 * EXPERT: Senior React Engineer (Financial UX)
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
  ProgressBar,
} from '@fluentui/react-components';
import { Money20Regular } from '@fluentui/react-icons';
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

const INVOICES = [
  { id: '1', invoiceNo: 'INV-1001', customer: 'ABC Corp', amount: 250000, paid: 200000, due: '2026-03-25', status: 'Partial' },
  { id: '2', invoiceNo: 'INV-1002', customer: 'XYZ Ltd', amount: 180000, paid: 0, due: '2026-04-01', status: 'Unpaid' },
  { id: '3', invoiceNo: 'INV-1003', customer: 'Tech Solutions', amount: 320000, paid: 320000, due: '2026-03-20', status: 'Paid' },
];

export const AccountsReceivable = () => {
  const classes = useStyles();

  const totalReceivable = 750000;
  const received = 520000;
  const overdue = 150000;

  return (
    <div className={classes.container}>
      <div>
        <Title3>Accounts Receivable</Title3>
        <Text>Manage customer invoices and payments</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Receivable
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalReceivable)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Received
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(received)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Outstanding
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(totalReceivable - received)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Overdue
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(overdue)}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Outstanding Invoices</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Invoice #</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Paid</TableHeaderCell>
              <TableHeaderCell>Due Date</TableHeaderCell>
              <TableHeaderCell>Payment Progress</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((inv) => {
              const progress = (inv.paid / inv.amount) * 100;
              return (
                <TableRow key={inv.id}>
                  <TableCell>
                    <Text weight="semibold">{inv.invoiceNo}</Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <Avatar name={inv.customer} size={24} />
                      <Text>{inv.customer}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(inv.amount)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: tokens.colorPaletteGreenForeground1 }}>{formatCurrency(inv.paid)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{formatDate(inv.due)}</Text>
                  </TableCell>
                  <TableCell>
                    <ProgressBar value={progress} max={100} thickness="medium" color={progress === 100 ? 'success' : 'brand'} />
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={inv.status === 'Paid' ? 'success' : inv.status === 'Partial' ? 'warning' : 'danger'}
                    >
                      {inv.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
