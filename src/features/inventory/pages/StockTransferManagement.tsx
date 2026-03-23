/**
 * Inventory - Stock Transfer Management
 * EXPERT: SaaS Platform Architect (Inter-Warehouse Transfer)
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
import { Add20Regular, ArrowSwap20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const TRANSFERS = [
  { id: '1', transferNo: 'TRF-245', from: 'Main Warehouse', to: 'Branch WH-01', items: 12, date: '2026-03-20', status: 'In Transit' },
  { id: '2', transferNo: 'TRF-244', from: 'Branch WH-02', to: 'Main Warehouse', items: 8, date: '2026-03-19', status: 'Completed' },
  { id: '3', transferNo: 'TRF-243', from: 'Main Warehouse', to: 'Branch WH-03', items: 15, date: '2026-03-18', status: 'Pending' },
];

export const StockTransferManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Stock Transfer Management</Title3>
          <Text>Transfer inventory between warehouses</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Transfer
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Transfer #</TableHeaderCell>
              <TableHeaderCell>From Warehouse</TableHeaderCell>
              <TableHeaderCell>To Warehouse</TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
              <TableHeaderCell>Transfer Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSFERS.map((transfer) => (
              <TableRow key={transfer.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <ArrowSwap20Regular />
                    <Text weight="semibold">{transfer.transferNo}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{transfer.from}</Text>
                </TableCell>
                <TableCell>
                  <Text>{transfer.to}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{transfer.items} items</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(transfer.date)}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={transfer.status === 'Completed' ? 'success' : transfer.status === 'In Transit' ? 'warning' : 'brand'}
                  >
                    {transfer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    View Details
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
