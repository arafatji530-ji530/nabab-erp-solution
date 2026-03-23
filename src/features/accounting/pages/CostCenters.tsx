/**
 * Accounting - Cost Centers Management
 * EXPERT: Enterprise Solution Architect (Cost Accounting)
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
  ProgressBar,
} from '@fluentui/react-components';
import { Add20Regular, BuildingMultiple20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const COST_CENTERS = [
  { id: '1', code: 'CC-001', name: 'Head Office', type: 'Administrative', budget: 1200000, spent: 950000, manager: 'Admin Manager' },
  { id: '2', code: 'CC-002', name: 'Manufacturing Unit', type: 'Production', budget: 2500000, spent: 2100000, manager: 'Production Head' },
  { id: '3', code: 'CC-003', name: 'R&D Department', type: 'Development', budget: 800000, spent: 620000, manager: 'CTO' },
  { id: '4', code: 'CC-004', name: 'Sales Branch - Dhaka', type: 'Sales', budget: 600000, spent: 480000, manager: 'Regional Manager' },
];

export const CostCenters = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Cost Centers Management</Title3>
          <Text>Track costs by organizational units</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Cost Center
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Code</TableHeaderCell>
              <TableHeaderCell>Cost Center</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Manager</TableHeaderCell>
              <TableHeaderCell>Budget</TableHeaderCell>
              <TableHeaderCell>Spent</TableHeaderCell>
              <TableHeaderCell>Budget Utilization</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COST_CENTERS.map((cc) => {
              const utilization = (cc.spent / cc.budget) * 100;
              return (
                <TableRow key={cc.id}>
                  <TableCell>
                    <Text weight="semibold">{cc.code}</Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <BuildingMultiple20Regular />
                      <Text weight="semibold">{cc.name}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{cc.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{cc.manager}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(cc.budget)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: tokens.colorPaletteGreenForeground1 }}>{formatCurrency(cc.spent)}</Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXXS }}>
                        {utilization.toFixed(1)}%
                      </Text>
                      <ProgressBar value={utilization} max={100} color="brand" thickness="medium" />
                    </div>
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
