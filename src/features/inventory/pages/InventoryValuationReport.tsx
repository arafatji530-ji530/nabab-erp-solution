/**
 * Inventory - Inventory Valuation Report
 * EXPERT: Senior React Engineer (Inventory Valuation)
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
import { formatCurrency } from '@/shared/utils/formatters';

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

const INVENTORY = [
  { id: '1', category: 'Electronics', quantity: 245, avgCost: 35000, totalValue: 8575000, method: 'FIFO' },
  { id: '2', category: 'Clothing', quantity: 1250, avgCost: 1500, totalValue: 1875000, method: 'Weighted Average' },
  { id: '3', category: 'Furniture', quantity: 85, avgCost: 12000, totalValue: 1020000, method: 'FIFO' },
];

export const InventoryValuationReport = () => {
  const classes = useStyles();

  const totalValue = INVENTORY.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className={classes.container}>
      <div>
        <Title3>Inventory Valuation Report</Title3>
        <Text>Current inventory value by category and valuation method</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Inventory Value
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalValue)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Units
          </Text>
          <Text size={500} weight="bold" block>
            1,580
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Categories
          </Text>
          <Text size={500} weight="bold" block>
            3
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Valuation Method
          </Text>
          <Text size={500} weight="bold" block>
            FIFO
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Valuation by Category</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Avg Unit Cost</TableHeaderCell>
              <TableHeaderCell>Total Value</TableHeaderCell>
              <TableHeaderCell>Valuation Method</TableHeaderCell>
              <TableHeaderCell>% of Total</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVENTORY.map((item) => {
              const percentage = ((item.totalValue / totalValue) * 100).toFixed(1);
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.category}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.quantity}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.avgCost)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(item.totalValue)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{item.method}</Badge>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{percentage}%</Text>
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
