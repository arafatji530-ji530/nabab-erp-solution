/**
 * POS - Cash Management & Reconciliation
 * EXPERT: Enterprise Solution Architect (Cash Flow Control)
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
  Input,
  Label,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { Money20Regular, DocumentPdf20Regular, Calculator20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
  },
  formCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
});

const DENOMINATIONS = [
  { label: '1000 BDT', value: 1000, count: 150, total: 150000 },
  { label: '500 BDT', value: 500, count: 80, total: 40000 },
  { label: '100 BDT', value: 100, count: 200, total: 20000 },
  { label: '50 BDT', value: 50, count: 100, total: 5000 },
  { label: '20 BDT', value: 20, count: 50, total: 1000 },
  { label: '10 BDT', value: 10, count: 100, total: 1000 },
  { label: '5 BDT', value: 5, count: 200, total: 1000 },
  { label: '2 BDT', value: 2, count: 100, total: 200 },
  { label: '1 BDT', value: 1, count: 100, total: 100 },
];

export const CashManagement = () => {
  const classes = useStyles();

  const totalCash = DENOMINATIONS.reduce((sum, d) => sum + d.total, 0);
  const expectedCash = 225000;
  const variance = totalCash - expectedCash;

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Cash Management & Reconciliation</Title3>
          <Text>Track and reconcile cash registers</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<DocumentPdf20Regular />}>
            Print Report
          </Button>
          <Button appearance="primary" icon={<Money20Regular />}>
            Close Shift
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Opening Balance
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(50000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Expected Cash
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {formatCurrency(expectedCash)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Actual Cash
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalCash)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Variance
          </Text>
          <Text
            size={600}
            weight="bold"
            block
            style={{
              color: variance >= 0 ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1,
            }}
          >
            {formatCurrency(Math.abs(variance))}
            {variance < 0 && ' Short'}
            {variance > 0 && ' Over'}
          </Text>
        </Card>
      </div>

      <Card className={classes.formCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Cash Count by Denomination</Title3>

        <div className={classes.formGrid}>
          <div className={classes.formGroup}>
            <Label>Register / Cashier</Label>
            <Dropdown defaultValue="Register 1 - Ahmed Hassan">
              <Option value="reg-1">Register 1 - Ahmed Hassan</Option>
              <Option value="reg-2">Register 2 - Fatima Rahman</Option>
              <Option value="reg-3">Register 3 - Karim Ali</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Shift Date & Time</Label>
            <Input type="datetime-local" defaultValue="2026-03-28T18:00" />
          </div>
        </div>

        <Table style={{ marginTop: tokens.spacingVerticalL }}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Denomination</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Total Value</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DENOMINATIONS.map((denom, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Text weight="semibold">{denom.label}</Text>
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={denom.count.toString()} style={{ width: '120px' }} />
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                    {formatCurrency(denom.total)}
                  </Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
        >
          <Text size={400} weight="bold">
            Total Cash Counted
          </Text>
          <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalCash)}
          </Text>
        </div>

        <div style={{ marginTop: tokens.spacingVerticalL }}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Reconciliation Summary</Title3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
            >
              <Text>Cash Sales</Text>
              <Text weight="semibold">{formatCurrency(180000)}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
            >
              <Text>Card Payments</Text>
              <Text weight="semibold">{formatCurrency(95000)}</Text>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
            >
              <Text>Cash Withdrawals</Text>
              <Text weight="semibold" style={{ color: tokens.colorPaletteRedForeground1 }}>
                -{formatCurrency(5000)}
              </Text>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
            >
              <Text weight="bold">Variance</Text>
              <Badge
                appearance="tint"
                color={variance >= 0 ? 'success' : 'danger'}
                size="large"
              >
                {variance >= 0 ? '+' : ''}{formatCurrency(variance)}
              </Badge>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL }}>
          <Button appearance="secondary">Save Draft</Button>
          <Button appearance="primary" icon={<Calculator20Regular />}>
            Complete Reconciliation
          </Button>
        </div>
      </Card>
    </div>
  );
};
