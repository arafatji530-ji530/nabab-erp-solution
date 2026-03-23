/**
 * Reports - Product Performance Report
 * EXPERT: Enterprise Solution Architect (Product Analytics)
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
  ProgressBar,
} from '@fluentui/react-components';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const PRODUCTS = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    unitsSold: 245,
    revenue: 6125000,
    avgPrice: 25000,
    stockTurnover: 8.5,
    returnRate: 2.1,
  },
  {
    id: '2',
    name: 'Samsung TV 55"',
    category: 'Electronics',
    unitsSold: 120,
    revenue: 4800000,
    avgPrice: 40000,
    stockTurnover: 6.2,
    returnRate: 3.5,
  },
  {
    id: '3',
    name: 'Casual Shirt',
    category: 'Clothing',
    unitsSold: 850,
    revenue: 1275000,
    avgPrice: 1500,
    stockTurnover: 12.3,
    returnRate: 5.8,
  },
];

export const ProductPerformanceReport = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Product Performance Report</Title3>
        <Text>Analyze sales performance, turnover, and profitability by product</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Product Metrics</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product Name</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Units Sold</TableHeaderCell>
              <TableHeaderCell>Total Revenue</TableHeaderCell>
              <TableHeaderCell>Avg Price</TableHeaderCell>
              <TableHeaderCell>Stock Turnover</TableHeaderCell>
              <TableHeaderCell>Return Rate %</TableHeaderCell>
              <TableHeaderCell>Performance</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PRODUCTS.map((product) => {
              const performanceScore =
                product.stockTurnover > 10 ? 'Excellent' : product.stockTurnover > 7 ? 'Good' : product.stockTurnover > 4 ? 'Average' : 'Poor';
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <Text weight="semibold">{product.name}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Text>{product.unitsSold}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(product.revenue)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(product.avgPrice)}</Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXXS }}>
                        {product.stockTurnover.toFixed(1)}
                      </Text>
                      <ProgressBar
                        value={product.stockTurnover}
                        max={15}
                        color={product.stockTurnover > 10 ? 'success' : product.stockTurnover > 7 ? 'brand' : 'warning'}
                        thickness="medium"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: product.returnRate > 5 ? tokens.colorPaletteRedForeground1 : undefined }}>
                      {product.returnRate}%
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={
                        performanceScore === 'Excellent'
                          ? 'success'
                          : performanceScore === 'Good'
                            ? 'brand'
                            : performanceScore === 'Average'
                              ? 'warning'
                              : 'danger'
                      }
                    >
                      {performanceScore}
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
