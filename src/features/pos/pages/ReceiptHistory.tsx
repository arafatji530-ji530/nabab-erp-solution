/**
 * POS - Receipt History
 * EXPERT: Senior React Engineer (Transaction History)
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
  Button,
} from '@fluentui/react-components';
import { Receipt20Regular, Print20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const RECEIPTS = [
  { id: '1', receiptNo: 'REC-1245', date: '2026-03-20 14:32:15', customer: 'Walk-in', items: 3, total: 12500, payment: 'Cash', cashier: 'John Doe' },
  { id: '2', receiptNo: 'REC-1244', date: '2026-03-20 14:15:22', customer: 'ABC Corp', items: 5, total: 45000, payment: 'Card', cashier: 'John Doe' },
  { id: '3', receiptNo: 'REC-1243', date: '2026-03-20 13:48:10', customer: 'Walk-in', items: 2, total: 8500, payment: 'Mobile', cashier: 'John Doe' },
  { id: '4', receiptNo: 'REC-1242', date: '2026-03-20 13:22:45', customer: 'XYZ Ltd', items: 8, total: 125000, payment: 'Card', cashier: 'Jane Smith' },
];

export const ReceiptHistory = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Receipt History</Title3>
        <Text>View and reprint past receipts</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Receipt #</TableHeaderCell>
              <TableHeaderCell>Date & Time</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
              <TableHeaderCell>Total Amount</TableHeaderCell>
              <TableHeaderCell>Payment Method</TableHeaderCell>
              <TableHeaderCell>Cashier</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECEIPTS.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Receipt20Regular />
                    <Text weight="semibold">{receipt.receiptNo}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{receipt.date}</Text>
                </TableCell>
                <TableCell>
                  <Text>{receipt.customer}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{receipt.items} items</Badge>
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(receipt.total)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={receipt.payment === 'Cash' ? 'success' : receipt.payment === 'Card' ? 'brand' : 'warning'}>
                    {receipt.payment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{receipt.cashier}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
                    <Button appearance="subtle" size="small">
                      View
                    </Button>
                    <Button appearance="subtle" size="small" icon={<Print20Regular />}>
                      Print
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
