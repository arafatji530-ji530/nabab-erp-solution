/**
 * Purchase - Purchase Forecasting
 * EXPERT: SaaS Platform Architect (Predictive Analytics)
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
} from '@fluentui/react-components';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const FORECAST = [
  { id: '1', category: 'Raw Materials', lastMonth: 1200000, thisMonth: 1350000, nextMonth: 1400000, trend: 'Increasing' },
  { id: '2', category: 'Finished Goods', lastMonth: 950000, thisMonth: 880000, nextMonth: 920000, trend: 'Stable' },
  { id: '3', category: 'Office Supplies', lastMonth: 85000, thisMonth: 92000, nextMonth: 95000, trend: 'Increasing' },
];

export const PurchaseForecasting = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Purchase Forecasting</Title3>
        <Text>Predict future purchase requirements based on historical trends</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Purchase Forecast by Category</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Last Month</TableHeaderCell>
              <TableHeaderCell>This Month</TableHeaderCell>
              <TableHeaderCell>Next Month (Forecast)</TableHeaderCell>
              <TableHeaderCell>Growth Trend</TableHeaderCell>
              <TableHeaderCell>Forecast Accuracy</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {FORECAST.map((item) => {
              const growth = ((item.nextMonth - item.thisMonth) / item.thisMonth) * 100;
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.category}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.lastMonth)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(item.thisMonth)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold" style={{ color: tokens.colorPaletteBlueForeground2 }}>
                      {formatCurrency(item.nextMonth)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.trend}</Text>
                  </TableCell>
                  <TableCell>
                    <ProgressBar value={92} max={100} color="success" thickness="medium" />
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
