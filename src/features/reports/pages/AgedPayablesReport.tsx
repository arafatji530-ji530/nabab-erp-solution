/**
 * Reports - Aged Payables Report
 * EXPERT: UI/UX Designer (Vendor Analytics)
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
    gridTemplateColumns: 'repeat(5, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
});

const PAYABLES = [
  { id: '1', supplier: 'Office Supplies Ltd', current: 85000, days30: 0, days60: 0, days90: 0, over90: 0, total: 85000 },
  { id: '2', supplier: 'Tech Hardware Inc', current: 0, days30: 420000, days60: 0, days90: 0, over90: 0, total: 420000 },
  { id: '3', supplier: 'Raw Materials Co', current: 150000, days30: 80000, days60: 0, days90: 0, over90: 0, total: 230000 },
];

export const AgedPayablesReport = () => {
  const classes = useStyles();

  const totals = PAYABLES.reduce(
    (acc, p) => ({
      current: acc.current + p.current,
      days30: acc.days30 + p.days30,
      days60: acc.days60 + p.days60,
      days90: acc.days90 + p.days90,
      over90: acc.over90 + p.over90,
      total: acc.total + p.total,
    }),
    { current: 0, days30: 0, days60: 0, days90: 0, over90: 0, total: 0 }
  );

  return (
    <div className={classes.container}>
      <div>
        <Title3>Aged Payables Report</Title3>
        <Text>Track supplier payments by aging buckets</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Current
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totals.current)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            1-30 Days
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(totals.days30)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            31-60 Days
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteDarkOrangeForeground1 }}>
            {formatCurrency(totals.days60)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            61-90 Days
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(totals.days90)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Over 90 Days
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteDarkRedForeground2 }}>
            {formatCurrency(totals.over90)}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Supplier Aging Details</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Current</TableHeaderCell>
              <TableHeaderCell>1-30 Days</TableHeaderCell>
              <TableHeaderCell>31-60 Days</TableHeaderCell>
              <TableHeaderCell>61-90 Days</TableHeaderCell>
              <TableHeaderCell>Over 90 Days</TableHeaderCell>
              <TableHeaderCell>Total Payable</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYABLES.map((item) => {
              const priority = item.days30 > 300000 ? 'Urgent' : item.days30 > 0 ? 'High' : 'Normal';
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.supplier}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.current)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: item.days30 > 0 ? tokens.colorPaletteYellowForeground1 : undefined }}>
                      {formatCurrency(item.days30)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.days60)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.days90)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.over90)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold">{formatCurrency(item.total)}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={priority === 'Urgent' ? 'danger' : priority === 'High' ? 'warning' : 'success'}>
                      {priority}
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
