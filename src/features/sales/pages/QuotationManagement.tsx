/**
 * Sales - Quotation Management
 * EXPERT: UI/UX Designer (Document Workflow Pattern)
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
  Dropdown,
  Option,
} from '@fluentui/react-components';
import {
  Add20Regular,
  DocumentPdf20Regular,
  Mail20Regular,
  Edit20Regular,
  ArrowTrendingCheckmark20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
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
  table: {
    width: '100%',
  },
});

const QUOTATIONS = [
  {
    id: '1',
    quoteNumber: 'QT-2026-001',
    customer: 'ABC Industries Ltd',
    date: '2026-03-20',
    validUntil: '2026-04-19',
    amount: 125000,
    status: 'Sent',
    probability: 75,
  },
  {
    id: '2',
    quoteNumber: 'QT-2026-002',
    customer: 'XYZ Electronics',
    date: '2026-03-21',
    validUntil: '2026-04-20',
    amount: 89500,
    status: 'Draft',
    probability: 50,
  },
  {
    id: '3',
    quoteNumber: 'QT-2026-003',
    customer: 'Tech Solutions',
    date: '2026-03-18',
    validUntil: '2026-04-17',
    amount: 245000,
    status: 'Accepted',
    probability: 100,
  },
  {
    id: '4',
    quoteNumber: 'QT-2026-004',
    customer: 'Build Masters',
    date: '2026-03-15',
    validUntil: '2026-03-30',
    amount: 67000,
    status: 'Expired',
    probability: 0,
  },
];

export const QuotationManagement = () => {
  const classes = useStyles();

  const totalValue = QUOTATIONS.reduce((sum, q) => sum + q.amount, 0);
  const avgValue = totalValue / QUOTATIONS.length;
  const acceptedCount = QUOTATIONS.filter((q) => q.status === 'Accepted').length;
  const pendingCount = QUOTATIONS.filter((q) => q.status === 'Sent').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return tokens.colorPaletteGreenForeground1;
      case 'Sent':
        return tokens.colorPaletteBlueForeground2;
      case 'Draft':
        return tokens.colorNeutralForeground3;
      case 'Expired':
        return tokens.colorPaletteRedForeground1;
      case 'Rejected':
        return tokens.colorPaletteRedForeground1;
      default:
        return tokens.colorNeutralForeground2;
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Sales Quotations</Title3>
          <Text>Create and manage sales quotes and proposals</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Quotation
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Quote Value
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalValue)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Average Quote
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {formatCurrency(avgValue)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Accepted
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {acceptedCount}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending Response
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {pendingCount}
          </Text>
        </Card>
      </div>

      <Card className={classes.toolbar}>
        <Input placeholder="Search quotations..." style={{ flexGrow: 1, maxWidth: '400px' }} />
        <Dropdown placeholder="All Status">
          <Option value="all">All Status</Option>
          <Option value="draft">Draft</Option>
          <Option value="sent">Sent</Option>
          <Option value="accepted">Accepted</Option>
          <Option value="rejected">Rejected</Option>
          <Option value="expired">Expired</Option>
        </Dropdown>
        <Button appearance="secondary">Export</Button>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Quote #</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Valid Until</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Probability</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {QUOTATIONS.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell>
                  <Text weight="semibold">{quote.quoteNumber}</Text>
                </TableCell>
                <TableCell>
                  <Text>{quote.customer}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(quote.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(quote.validUntil)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(quote.amount)}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={quote.probability > 70 ? 'success' : quote.probability > 40 ? 'warning' : 'danger'}
                  >
                    {quote.probability}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    style={{
                      backgroundColor: getStatusColor(quote.status) + '20',
                      color: getStatusColor(quote.status),
                    }}
                  >
                    {quote.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" icon={<Edit20Regular />} size="small" />
                    <Button appearance="subtle" icon={<DocumentPdf20Regular />} size="small" />
                    <Button appearance="subtle" icon={<Mail20Regular />} size="small" />
                    {quote.status === 'Accepted' && (
                      <Button appearance="primary" icon={<ArrowTrendingCheckmark20Regular />} size="small">
                        Convert
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
