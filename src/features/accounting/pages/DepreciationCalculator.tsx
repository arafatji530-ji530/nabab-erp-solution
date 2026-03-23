/**
 * Accounting - Depreciation Calculator
 * EXPERT: SaaS Platform Architect (Asset Depreciation)
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
  Input,
  Dropdown,
  Option,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';
import { Calculator20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
});

const DEPRECIATION_SCHEDULE = [
  { year: 1, opening: 500000, depreciation: 100000, accumulated: 100000, closing: 400000 },
  { year: 2, opening: 400000, depreciation: 100000, accumulated: 200000, closing: 300000 },
  { year: 3, opening: 300000, depreciation: 100000, accumulated: 300000, closing: 200000 },
  { year: 4, opening: 200000, depreciation: 100000, accumulated: 400000, closing: 100000 },
  { year: 5, opening: 100000, depreciation: 100000, accumulated: 500000, closing: 0 },
];

export const DepreciationCalculator = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Depreciation Calculator</Title3>
        <Text>Calculate asset depreciation schedules</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Asset Information</Title3>

        <div className={classes.formGrid}>
          <div className={classes.field}>
            <Text weight="semibold">Asset Cost</Text>
            <Input placeholder="Enter cost" type="number" />
          </div>
          <div className={classes.field}>
            <Text weight="semibold">Salvage Value</Text>
            <Input placeholder="Enter salvage value" type="number" />
          </div>
          <div className={classes.field}>
            <Text weight="semibold">Useful Life (Years)</Text>
            <Input placeholder="Enter years" type="number" />
          </div>
          <div className={classes.field}>
            <Text weight="semibold">Depreciation Method</Text>
            <Dropdown placeholder="Select method">
              <Option>Straight Line</Option>
              <Option>Declining Balance</Option>
              <Option>Sum of Years Digits</Option>
              <Option>Units of Production</Option>
            </Dropdown>
          </div>
        </div>

        <Button appearance="primary" icon={<Calculator20Regular />} style={{ marginTop: tokens.spacingVerticalL }}>
          Calculate Depreciation
        </Button>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Depreciation Schedule</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Year</TableHeaderCell>
              <TableHeaderCell>Opening Balance</TableHeaderCell>
              <TableHeaderCell>Depreciation Expense</TableHeaderCell>
              <TableHeaderCell>Accumulated Depreciation</TableHeaderCell>
              <TableHeaderCell>Closing Balance</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEPRECIATION_SCHEDULE.map((row) => (
              <TableRow key={row.year}>
                <TableCell>
                  <Text weight="semibold">Year {row.year}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatCurrency(row.opening)}</Text>
                </TableCell>
                <TableCell>
                  <Text style={{ color: tokens.colorPaletteRedForeground1 }}>{formatCurrency(row.depreciation)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(row.accumulated)}</Text>
                </TableCell>
                <TableCell>
                  <Text style={{ color: tokens.colorPaletteGreenForeground1 }}>{formatCurrency(row.closing)}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
