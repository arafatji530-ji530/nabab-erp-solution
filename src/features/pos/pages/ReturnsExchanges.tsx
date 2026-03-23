/**
 * POS - Returns & Exchanges
 * EXPERT: UI/UX Designer (Return Workflow)
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
} from '@fluentui/react-components';
import { ArrowUndo20Regular, ArrowSwap20Regular } from '@fluentui/react-icons';
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

const RETURNS = [
  {
    id: '1',
    returnNo: 'RET-045',
    originalReceipt: 'REC-1180',
    date: '2026-03-20',
    customer: 'Walk-in',
    product: 'Samsung TV',
    reason: 'Defective',
    amount: 40000,
    type: 'Return',
    status: 'Completed',
  },
  {
    id: '2',
    returnNo: 'EXC-012',
    originalReceipt: 'REC-1165',
    date: '2026-03-19',
    customer: 'ABC Corp',
    product: 'Laptop',
    reason: 'Wrong Item',
    amount: 55000,
    type: 'Exchange',
    status: 'Completed',
  },
  {
    id: '3',
    returnNo: 'RET-044',
    originalReceipt: 'REC-1150',
    date: '2026-03-18',
    customer: 'Walk-in',
    product: 'Shirt',
    reason: 'Size Issue',
    amount: 1500,
    type: 'Return',
    status: 'Pending',
  },
];

export const ReturnsExchanges = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Returns & Exchanges</Title3>
          <Text>Process product returns and exchanges</Text>
        </div>
        <Button appearance="primary" icon={<ArrowUndo20Regular />}>
          Process Return
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Returns
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            2
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Exchanges
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            1
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Return Amount
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(41500)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Return Rate
          </Text>
          <Text size={500} weight="bold" block>
            2.1%
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Return & Exchange History</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Return/Exchange #</TableHeaderCell>
              <TableHeaderCell>Original Receipt</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Reason</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RETURNS.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Text weight="semibold">{item.returnNo}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{item.originalReceipt}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(item.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.customer}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{item.product}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.reason}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(item.amount)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={item.type === 'Return' ? 'danger' : 'warning'}>
                    {item.type === 'Return' ? <ArrowUndo20Regular /> : <ArrowSwap20Regular />}
                    {item.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={item.status === 'Completed' ? 'success' : 'warning'}>
                    {item.status}
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
