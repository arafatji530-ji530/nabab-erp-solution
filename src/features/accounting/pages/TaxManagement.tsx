/**
 * Accounting - Tax Management & Filing
 * EXPERT: Enterprise Solution Architect (Compliance & Regulations)
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
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { DocumentPdf20Regular, Send20Regular, Calculator20Regular } from '@fluentui/react-icons';
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
});

const TAX_RETURNS = [
  {
    id: '1',
    period: 'Q1 2026',
    taxType: 'VAT',
    dueDate: '2026-04-30',
    salesAmount: 5000000,
    taxAmount: 750000,
    status: 'Filed',
    filedDate: '2026-04-15',
  },
  {
    id: '2',
    period: 'March 2026',
    taxType: 'Income Tax',
    dueDate: '2026-04-15',
    salesAmount: 1500000,
    taxAmount: 225000,
    status: 'Pending',
    filedDate: null,
  },
  {
    id: '3',
    period: 'Q4 2025',
    taxType: 'VAT',
    dueDate: '2026-01-31',
    salesAmount: 4800000,
    taxAmount: 720000,
    status: 'Filed',
    filedDate: '2026-01-25',
  },
];

export const TaxManagement = () => {
  const classes = useStyles();

  const totalTaxLiability = TAX_RETURNS.reduce((sum, t) => sum + t.taxAmount, 0);
  const paidTax = TAX_RETURNS.filter((t) => t.status === 'Filed').reduce((sum, t) => sum + t.taxAmount, 0);
  const pendingTax = TAX_RETURNS.filter((t) => t.status === 'Pending').reduce((sum, t) => sum + t.taxAmount, 0);
  const overdueCount = TAX_RETURNS.filter((t) => t.status === 'Overdue').length;

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Tax Management & Filing</Title3>
          <Text>Manage tax calculations, returns, and filings</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<Calculator20Regular />}>
            Calculate Tax
          </Button>
          <Button appearance="primary" icon={<Send20Regular />}>
            File Return
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Tax Liability
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalTaxLiability)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Paid
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(paidTax)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(pendingTax)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Overdue Returns
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {overdueCount}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Dropdown placeholder="All Tax Types">
            <Option value="all">All Tax Types</Option>
            <Option value="vat">VAT (Value Added Tax)</Option>
            <Option value="income">Income Tax</Option>
            <Option value="withholding">Withholding Tax</Option>
            <Option value="customs">Customs Duty</Option>
          </Dropdown>
          <Dropdown placeholder="All Status">
            <Option value="all">All Status</Option>
            <Option value="filed">Filed</Option>
            <Option value="pending">Pending</Option>
            <Option value="overdue">Overdue</Option>
          </Dropdown>
          <Dropdown placeholder="This Year">
            <Option value="2026">2026</Option>
            <Option value="2025">2025</Option>
            <Option value="2024">2024</Option>
          </Dropdown>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Period</TableHeaderCell>
              <TableHeaderCell>Tax Type</TableHeaderCell>
              <TableHeaderCell>Due Date</TableHeaderCell>
              <TableHeaderCell>Sales/Income</TableHeaderCell>
              <TableHeaderCell>Tax Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Filed Date</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TAX_RETURNS.map((taxReturn) => (
              <TableRow key={taxReturn.id}>
                <TableCell>
                  <Text weight="semibold">{taxReturn.period}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{taxReturn.taxType}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(taxReturn.dueDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatCurrency(taxReturn.salesAmount)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                    {formatCurrency(taxReturn.taxAmount)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={
                      taxReturn.status === 'Filed'
                        ? 'success'
                        : taxReturn.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {taxReturn.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{taxReturn.filedDate ? formatDate(taxReturn.filedDate) : '-'}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<DocumentPdf20Regular />}>
                      Report
                    </Button>
                    {taxReturn.status === 'Pending' && (
                      <Button appearance="primary" size="small" icon={<Send20Regular />}>
                        File
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Tax Compliance Status</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                <Text>VAT Returns</Text>
                <Text weight="semibold">100%</Text>
              </div>
              <ProgressBar value={100} max={100} color="success" thickness="medium" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                <Text>Income Tax</Text>
                <Text weight="semibold">75%</Text>
              </div>
              <ProgressBar value={75} max={100} color="warning" thickness="medium" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                <Text>Withholding Tax</Text>
                <Text weight="semibold">100%</Text>
              </div>
              <ProgressBar value={100} max={100} color="success" thickness="medium" />
            </div>
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Upcoming Deadlines</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
                backgroundColor: tokens.colorPaletteYellowBackground2,
              } as React.CSSProperties}
            >
              <Text weight="semibold" block>
                VAT Return - Q2 2026
              </Text>
              <Text size={200}>Due: April 30, 2026 (2 days remaining)</Text>
            </div>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
                backgroundColor: tokens.colorNeutralBackground3,
              } as React.CSSProperties}
            >
              <Text weight="semibold" block>
                Income Tax - March 2026
              </Text>
              <Text size={200}>Due: April 15, 2026 (17 days remaining)</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
