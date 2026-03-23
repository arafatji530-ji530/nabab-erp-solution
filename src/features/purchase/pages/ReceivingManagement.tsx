/**
 * Purchase - Receiving Management (Goods Receipt)
 * EXPERT: UI/UX Designer (Warehouse Receipt)
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
import { BoxCheckmark20Regular, Add20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const RECEIPTS = [
  { id: '1', grNo: 'GR-1245', poNo: 'PO-1280', supplier: 'Office Supplies Ltd', date: '2026-03-20', items: 12, received: 12, status: 'Complete' },
  { id: '2', grNo: 'GR-1244', poNo: 'PO-1275', supplier: 'Tech Hardware Inc', date: '2026-03-19', items: 8, received: 6, status: 'Partial' },
  { id: '3', grNo: 'GR-1243', poNo: 'PO-1268', supplier: 'Raw Materials Co', date: '2026-03-18', items: 25, received: 25, status: 'Complete' },
];

export const ReceivingManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Receiving Management (Goods Receipt)</Title3>
          <Text>Record and verify incoming shipments from suppliers</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Receipt
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>GR #</TableHeaderCell>
              <TableHeaderCell>Purchase Order</TableHeaderCell>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Receipt Date</TableHeaderCell>
              <TableHeaderCell>Items Expected</TableHeaderCell>
              <TableHeaderCell>Items Received</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECEIPTS.map((receipt) => (
              <TableRow key={receipt.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <BoxCheckmark20Regular />
                    <Text weight="semibold">{receipt.grNo}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{receipt.poNo}</Text>
                </TableCell>
                <TableCell>
                  <Text>{receipt.supplier}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(receipt.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{receipt.items}</Text>
                </TableCell>
                <TableCell>
                  <Text
                    weight="semibold"
                    style={{
                      color: receipt.received === receipt.items ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteYellowForeground1,
                    }}
                  >
                    {receipt.received}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={receipt.status === 'Complete' ? 'success' : 'warning'}>
                    {receipt.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    {receipt.status === 'Partial' ? 'Continue Receiving' : 'View Details'}
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
