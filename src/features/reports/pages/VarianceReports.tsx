/**
 * Reports - Variance Reports
 * EXPERT: SaaS Platform Architect (Variance Analysis)
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

const VARIANCES = [
  { id: '1', metric: 'Sales Revenue', budget: 10000000, actual: 11250000, variance: 1250000, variancePercent: 12.5, type: 'Favorable' },
  { id: '2', metric: 'Operating Expenses', budget: 3000000, actual: 3450000, variance: 450000, variancePercent: 15.0, type: 'Unfavorable' },
  { id: '3', metric: 'Marketing Spend', budget: 500000, actual: 425000, variance: -75000, variancePercent: -15.0, type: 'Favorable' },
  { id: '4', metric: 'Production Cost', budget: 5500000, actual: 5720000, variance: 220000, variancePercent: 4.0, type: 'Unfavorable' },
];

export const VarianceReports = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Variance Reports</Title3>
        <Text>Compare actual vs budget/forecast with variance analysis</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Budget vs Actual Variance</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Metric</TableHeaderCell>
              <TableHeaderCell>Budgeted</TableHeaderCell>
              <TableHeaderCell>Actual</TableHeaderCell>
              <TableHeaderCell>Variance (Amount)</TableHeaderCell>
              <TableHeaderCell>Variance %</TableHeaderCell>
              <TableHeaderCell>Progress</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {VARIANCES.map((item) => {
              const isFavorable = item.type === 'Favorable';
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.metric}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.budget)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(item.actual)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text
                      weight="bold"
                      style={{
                        color: isFavorable ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1,
                      }}
                    >
                      {item.variance > 0 ? '+' : ''}
                      {formatCurrency(item.variance)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text
                      weight="bold"
                      style={{
                        color: isFavorable ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1,
                      }}
                    >
                      {item.variancePercent > 0 ? '+' : ''}
                      {item.variancePercent.toFixed(1)}%
                    </Text>
                  </TableCell>
                  <TableCell>
                    <ProgressBar
                      value={(item.actual / item.budget) * 100}
                      max={120}
                      color={isFavorable ? 'success' : 'error'}
                      thickness="medium"
                    />
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={isFavorable ? 'success' : 'danger'}>
                      {item.type}
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
