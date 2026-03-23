/**
 * Products - Product Price History
 * EXPERT: SaaS Platform Architect (Price Analytics)
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
import { ArrowTrending20Filled, ArrowTrendingDown20Filled } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const PRICE_HISTORY = [
  { id: '1', product: 'iPhone 15 Pro', date: '2026-03-01', oldPrice: 120000, newPrice: 125000, change: 5000, reason: 'Price Increase' },
  { id: '2', product: 'Samsung TV', date: '2026-02-15', oldPrice: 45000, newPrice: 40000, change: -5000, reason: 'Promotion' },
  { id: '3', product: 'Laptop', date: '2026-02-01', oldPrice: 85000, newPrice: 80000, change: -5000, reason: 'Clearance' },
];

export const ProductPriceHistory = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Product Price History</Title3>
        <Text>Track historical price changes</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Old Price</TableHeaderCell>
              <TableHeaderCell>New Price</TableHeaderCell>
              <TableHeaderCell>Change</TableHeaderCell>
              <TableHeaderCell>Change %</TableHeaderCell>
              <TableHeaderCell>Reason</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRICE_HISTORY.map((item) => {
              const changePercent = ((item.change / item.oldPrice) * 100).toFixed(1);
              const isIncrease = item.change > 0;
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.product}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{formatDate(item.date)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.oldPrice)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(item.newPrice)}</Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      {isIncrease ? (
                        <ArrowTrending20Filled style={{ color: tokens.colorPaletteRedForeground1 }} />
                      ) : (
                        <ArrowTrendingDown20Filled style={{ color: tokens.colorPaletteGreenForeground1 }} />
                      )}
                      <Text weight="bold" style={{ color: isIncrease ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteGreenForeground1 }}>
                        {item.change > 0 ? '+' : ''}
                        {formatCurrency(item.change)}
                      </Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{changePercent}%</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{item.reason}</Badge>
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
