/**
 * Purchase - Purchase Returns
 * EXPERT: Enterprise Solution Architect (Reverse Purchase Flow)
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
import { Add20Regular, ArrowUndo20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const PURCHASE_RETURNS = [
  {
    id: '1',
    returnNo: 'PR-045',
    purchaseOrder: 'PO-1245',
    supplier: 'Office Supplies Ltd',
    date: '2026-03-20',
    items: 3,
    totalAmount: 15000,
    reason: 'Damaged',
    status: 'Approved',
  },
  {
    id: '2',
    returnNo: 'PR-044',
    purchaseOrder: 'PO-1230',
    supplier: 'Tech Hardware Inc',
    date: '2026-03-18',
    items: 5,
    totalAmount: 85000,
    reason: 'Wrong Items',
    status: 'Pending',
  },
];

export const PurchaseReturns = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Purchase Returns</Title3>
          <Text>Return defective or incorrect items to suppliers</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Return
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Return #</TableHeaderCell>
              <TableHeaderCell>Purchase Order</TableHeaderCell>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
              <TableHeaderCell>Total Amount</TableHeaderCell>
              <TableHeaderCell>Reason</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PURCHASE_RETURNS.map((ret) => (
              <TableRow key={ret.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <ArrowUndo20Regular />
                    <Text weight="semibold">{ret.returnNo}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{ret.purchaseOrder}</Text>
                </TableCell>
                <TableCell>
                  <Text>{ret.supplier}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(ret.date)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{ret.items} items</Badge>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(ret.totalAmount)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{ret.reason}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={ret.status === 'Approved' ? 'success' : 'warning'}>
                    {ret.status}
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
