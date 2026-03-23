/**
 * Reports - Aged Receivables Report
 * EXPERT: Senior React Engineer (Financial Reporting)
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
});

const RECEIVABLES = [
  { id: '1', customer: 'ABC Corp', current: 150000, days30: 80000, days60: 0, days90: 0, over90: 0, total: 230000 },
  { id: '2', customer: 'XYZ Ltd', current: 0, days30: 120000, days60: 50000, days90: 0, over90: 0, total: 170000 },
  { id: '3', customer: 'Tech Solutions', current: 200000, days30: 0, days60: 0, days90: 30000, over90: 0, total: 230000 },
  { id: '4', customer: 'Retail Store', current: 0, days30: 0, days60: 0, days90: 0, over90: 45000, total: 45000 },
];

export const AgedReceivablesReport = () => {
  const classes = useStyles();

  const totals = RECEIVABLES.reduce(
    (acc, r) => ({
      current: acc.current + r.current,
      days30: acc.days30 + r.days30,
      days60: acc.days60 + r.days60,
      days90: acc.days90 + r.days90,
      over90: acc.over90 + r.over90,
      total: acc.total + r.total,
    }),
    { current: 0, days30: 0, days60: 0, days90: 0, over90: 0, total: 0 }
  );

  return (
    <div className={classes.container}>
      <div>
        <Title3>Aged Receivables Report</Title3>
        <Text>Track overdue customer payments by aging buckets</Text>
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
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Customer Aging Details</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Current</TableHeaderCell>
              <TableHeaderCell>1-30 Days</TableHeaderCell>
              <TableHeaderCell>31-60 Days</TableHeaderCell>
              <TableHeaderCell>61-90 Days</TableHeaderCell>
              <TableHeaderCell>Over 90 Days</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Risk</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECEIVABLES.map((item) => {
              const riskScore = item.over90 > 0 ? 'High' : item.days90 > 0 ? 'Medium' : item.days60 > 0 ? 'Low' : 'None';
              return (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.customer}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.current)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.days30)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.days60)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.days90)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: item.over90 > 0 ? tokens.colorPaletteRedForeground1 : undefined }}>
                      {formatCurrency(item.over90)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold">{formatCurrency(item.total)}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={riskScore === 'High' ? 'danger' : riskScore === 'Medium' ? 'warning' : riskScore === 'Low' ? 'success' : 'subtle'}
                    >
                      {riskScore}
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
