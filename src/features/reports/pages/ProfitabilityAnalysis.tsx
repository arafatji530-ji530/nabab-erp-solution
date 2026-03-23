/**
 * Reports - Profitability Analysis
 * EXPERT: SaaS Platform Architect (Business Intelligence)
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
  ProgressBar,
  Badge,
} from '@fluentui/react-components';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const PROFITABILITY = [
  { id: '1', category: 'Electronics', revenue: 5200000, cogs: 3500000, expenses: 800000, profit: 900000, margin: 17.3 },
  { id: '2', category: 'Clothing', revenue: 3800000, cogs: 2200000, expenses: 600000, profit: 1000000, margin: 26.3 },
  { id: '3', category: 'Home & Living', revenue: 2500000, cogs: 1600000, expenses: 400000, profit: 500000, margin: 20.0 },
  { id: '4', category: 'Books', revenue: 1200000, cogs: 800000, expenses: 300000, profit: 100000, margin: 8.3 },
];

export const ProfitabilityAnalysis = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Profitability Analysis</Title3>
        <Text>Analyze profit margins by product category, department, or customer</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Category Profitability</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Revenue</TableHeaderCell>
              <TableHeaderCell>COGS</TableHeaderCell>
              <TableHeaderCell>Operating Expenses</TableHeaderCell>
              <TableHeaderCell>Net Profit</TableHeaderCell>
              <TableHeaderCell>Profit Margin %</TableHeaderCell>
              <TableHeaderCell>Performance</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PROFITABILITY.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Text weight="semibold">{item.category}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(item.revenue)}</Text>
                </TableCell>
                <TableCell>
                  <Text style={{ color: tokens.colorPaletteRedForeground1 }}>{formatCurrency(item.cogs)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatCurrency(item.expenses)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(item.profit)}
                  </Text>
                </TableCell>
                <TableCell>
                  <div>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXXS }}>
                      {item.margin.toFixed(1)}%
                    </Text>
                    <ProgressBar
                      value={item.margin}
                      max={30}
                      color={item.margin > 20 ? 'success' : item.margin > 15 ? 'brand' : 'warning'}
                      thickness="medium"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={item.margin > 20 ? 'success' : item.margin > 15 ? 'brand' : 'warning'}>
                    {item.margin > 20 ? 'Excellent' : item.margin > 15 ? 'Good' : 'Need Improvement'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Top Profitable Categories</Title3>
          {[
            { name: 'Clothing', profit: 1000000, margin: 26.3 },
            { name: 'Electronics', profit: 900000, margin: 17.3 },
          ].map((item) => (
            <div key={item.name} style={{ marginBottom: tokens.spacingVerticalM }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                <Text weight="semibold">{item.name}</Text>
                <Text>{formatCurrency(item.profit)}</Text>
              </div>
              <ProgressBar value={item.margin} max={30} color="success" />
            </div>
          ))}
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Least Profitable Categories</Title3>
          {[
            { name: 'Books', profit: 100000, margin: 8.3 },
            { name: 'Home & Living', profit: 500000, margin: 20.0 },
          ].map((item) => (
            <div key={item.name} style={{ marginBottom: tokens.spacingVerticalM }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                <Text weight="semibold">{item.name}</Text>
                <Text>{formatCurrency(item.profit)}</Text>
              </div>
              <ProgressBar value={item.margin} max={30} color="warning" />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};
