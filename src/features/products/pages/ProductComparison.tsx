/**
 * Products - Product Comparison Tool
 * EXPERT: UI/UX Designer (Comparison Interface)
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
import { Scales20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const PRODUCTS = [
  { name: 'iPhone 15 Pro', price: 125000, stock: 25, category: 'Electronics', rating: 4.8, warranty: '1 Year' },
  { name: 'Samsung Galaxy S24', price: 115000, stock: 18, category: 'Electronics', rating: 4.6, warranty: '1 Year' },
  { name: 'Google Pixel 8', price: 95000, stock: 12, category: 'Electronics', rating: 4.4, warranty: '1 Year' },
];

export const ProductComparison = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <Scales20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
        <div>
          <Title3>Product Comparison Tool</Title3>
          <Text>Compare multiple products side-by-side</Text>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Feature</TableHeaderCell>
              {PRODUCTS.map((product) => (
                <TableHeaderCell key={product.name}>
                  <Text weight="bold">{product.name}</Text>
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Text weight="semibold">Price</Text>
              </TableCell>
              {PRODUCTS.map((product) => (
                <TableCell key={product.name}>
                  <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(product.price)}
                  </Text>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>
                <Text weight="semibold">Stock Available</Text>
              </TableCell>
              {PRODUCTS.map((product) => (
                <TableCell key={product.name}>
                  <Badge appearance="tint" color={product.stock > 20 ? 'success' : product.stock > 10 ? 'warning' : 'danger'}>
                    {product.stock} units
                  </Badge>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>
                <Text weight="semibold">Customer Rating</Text>
              </TableCell>
              {PRODUCTS.map((product) => (
                <TableCell key={product.name}>
                  <Text weight="semibold">⭐ {product.rating}</Text>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>
                <Text weight="semibold">Warranty</Text>
              </TableCell>
              {PRODUCTS.map((product) => (
                <TableCell key={product.name}>
                  <Text>{product.warranty}</Text>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
