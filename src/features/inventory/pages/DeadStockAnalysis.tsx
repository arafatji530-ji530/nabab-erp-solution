/**
 * Inventory - Dead Stock Analysis
 * EXPERT: UI/UX Designer (Inventory Optimization)
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
import { Warning20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const DEAD_STOCK = [
  { id: '1', product: 'Old Model TV', sku: 'TV-2022-001', quantity: 12, value: 360000, lastSale: '2025-08-15', daysIdle: 218 },
  { id: '2', product: 'Discontinued Phone', sku: 'PH-2023-045', quantity: 8, value: 200000, lastSale: '2025-09-20', daysIdle: 182 },
  { id: '3', product: 'Old Laptop Model', sku: 'LP-2022-088', quantity: 5, value: 250000, lastSale: '2025-07-10', daysIdle: 254 },
];

export const DeadStockAnalysis = () => {
  const classes = useStyles();

  const totalValue = DEAD_STOCK.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <Warning20Regular style={{ fontSize: '32px', color: tokens.colorPaletteRedForeground1 }} />
        <div>
          <Title3>Dead Stock Analysis</Title3>
          <Text>Identify slow-moving and obsolete inventory</Text>
        </div>
      </div>

      <Card
        style={{
          ...shorthands.padding(tokens.spacingVerticalL),
          backgroundColor: tokens.colorPaletteRedBackground2,
          ...shorthands.border('1px', 'solid', tokens.colorPaletteRedBorder2),
        } as React.CSSProperties}
      >
        <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
          Dead Stock Alert
        </Text>
        <Text>
          You have {DEAD_STOCK.length} products with no sales in the last 180 days, totaling {formatCurrency(totalValue)} in inventory value.
        </Text>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Dead Stock Items</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>SKU</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Inventory Value</TableHeaderCell>
              <TableHeaderCell>Last Sale Date</TableHeaderCell>
              <TableHeaderCell>Days Idle</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEAD_STOCK.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Text weight="semibold">{item.product}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{item.sku}</Text>
                </TableCell>
                <TableCell>
                  <Text>{item.quantity}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorPaletteRedForeground1 }}>
                    {formatCurrency(item.value)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(item.lastSale)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={item.daysIdle > 200 ? 'danger' : 'warning'}>
                    {item.daysIdle} days
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="danger">
                    Dead Stock
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
