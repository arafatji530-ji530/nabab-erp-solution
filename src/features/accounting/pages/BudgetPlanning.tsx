/**
 * Accounting - Budget Planning & Variance Analysis
 * EXPERT: SaaS Platform Architect (Financial Planning)
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

const BUDGET_ITEMS = [
  { id: '1', department: 'Sales', category: 'Marketing', budgeted: 500000, actual: 425000, variance: -75000 },
  { id: '2', department: 'IT', category: 'Infrastructure', budgeted: 800000, actual: 850000, variance: 50000 },
  { id: '3', department: 'HR', category: 'Recruitment', budgeted: 300000, actual: 280000, variance: -20000 },
  { id: '4', department: 'Operations', category: 'Facilities', budgeted: 400000, actual: 410000, variance: 10000 },
];

export const BudgetPlanning = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Budget Planning & Variance Analysis</Title3>
        <Text>Track budget allocation and spending variances</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Budget vs Actual</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Budgeted</TableHeaderCell>
              <TableHeaderCell>Actual</TableHeaderCell>
              <TableHeaderCell>Variance</TableHeaderCell>
              <TableHeaderCell>Utilization</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUDGET_ITEMS.map((item) => {
              const utilization = (item.actual / item.budgeted) * 100;
              const isOverBudget = item.variance > 0;

              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.department}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.category}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(item.budgeted)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: isOverBudget ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(item.actual)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: isOverBudget ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteGreenForeground1 }}>
                      {item.variance > 0 ? '+' : ''}
                      {formatCurrency(item.variance)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXXS }}>
                        {utilization.toFixed(1)}%
                      </Text>
                      <ProgressBar value={utilization} max={100} color={utilization > 100 ? 'error' : 'success'} thickness="medium" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={isOverBudget ? 'danger' : 'success'}>
                      {isOverBudget ? 'Over Budget' : 'Under Budget'}
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
