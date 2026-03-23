/**
 * Accounting - General Ledger Page
 * Financial accounting and ledger management
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Title3,
  Text,
  Card,
  Badge,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  ArrowDownload20Regular,
  Book20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  balanceCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  balanceItem: {
    textAlign: 'center',
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke2),
    
    ':last-child': {
      ...shorthands.borderRight('none'),
    },
  },
  table: {
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '120px 1.5fr 1fr 120px 1fr 1fr 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '120px 1.5fr 1fr 120px 1fr 1fr 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    alignItems: 'center',
  },
});

const MOCK_LEDGER_ENTRIES = [
  {
    id: '1',
    date: '2026-03-15',
    account: 'Cash',
    description: 'Sales revenue - Invoice #1234',
    reference: 'INV-1234',
    debit: 125000,
    credit: 0,
    type: 'Revenue',
  },
  {
    id: '2',
    date: '2026-03-16',
    account: 'Accounts Payable',
    description: 'Purchase from supplier',
    reference: 'PO-5678',
    debit: 0,
    credit: 89000,
    type: 'Expense',
  },
  {
    id: '3',
    date: '2026-03-18',
    account: 'Salary Expense',
    description: 'Monthly salary payment',
    reference: 'SAL-03-2026',
    debit: 0,
    credit: 450000,
    type: 'Expense',
  },
];

export const GeneralLedger = () => {
  const classes = useStyles();
  const [entries] = useState(MOCK_LEDGER_ENTRIES);

  const totalDebit = entries.reduce((sum, entry) => sum + entry.debit, 0);
  const totalCredit = entries.reduce((sum, entry) => sum + entry.credit, 0);
  const balance = totalDebit - totalCredit;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>General Ledger</Title3>
          <Text>Track all financial transactions and accounts</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export
          </Button>
          <Button appearance="primary" icon={<Add20Regular />}>
            New Entry
          </Button>
        </div>
      </div>

      <Card className={classes.balanceCard}>
        <div className={classes.balanceItem}>
          <Book20Regular style={{ fontSize: '32px', color: tokens.colorPaletteGreenForeground1 }} />
          <Text size={200} block style={{ marginTop: tokens.spacingVerticalS }}>
            Total Debit
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalDebit)}
          </Text>
        </div>
        <div className={classes.balanceItem}>
          <Book20Regular style={{ fontSize: '32px', color: tokens.colorPaletteRedForeground1 }} />
          <Text size={200} block style={{ marginTop: tokens.spacingVerticalS }}>
            Total Credit
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(totalCredit)}
          </Text>
        </div>
        <div className={classes.balanceItem}>
          <Book20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          <Text size={200} block style={{ marginTop: tokens.spacingVerticalS }}>
            Balance
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(balance)}
          </Text>
        </div>
      </Card>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search entries..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Dropdown placeholder="All Accounts">
          <Option value="all">All Accounts</Option>
          <Option value="cash">Cash</Option>
          <Option value="revenue">Revenue</Option>
          <Option value="expenses">Expenses</Option>
        </Dropdown>
        <Dropdown placeholder="This Month">
          <Option value="month">This Month</Option>
          <Option value="quarter">This Quarter</Option>
          <Option value="year">This Year</Option>
        </Dropdown>
      </Card>

      <Card className={classes.table}>
        <div className={classes.tableHeader}>
          <div>Date</div>
          <div>Account</div>
          <div>Description</div>
          <div>Reference</div>
          <div>Debit</div>
          <div>Credit</div>
          <div>Type</div>
        </div>

        {entries.map((entry) => (
          <div key={entry.id} className={classes.tableRow}>
            <Text size={300}>{formatDate(entry.date)}</Text>
            <Text weight="semibold">{entry.account}</Text>
            <Text size={300} truncate>
              {entry.description}
            </Text>
            <Text size={300}>{entry.reference}</Text>
            <Text
              weight="semibold"
              style={{ color: entry.debit > 0 ? tokens.colorPaletteGreenForeground1 : tokens.colorNeutralForeground3 }}
            >
              {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
            </Text>
            <Text
              weight="semibold"
              style={{ color: entry.credit > 0 ? tokens.colorPaletteRedForeground1 : tokens.colorNeutralForeground3 }}
            >
              {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
            </Text>
            <Badge appearance="tint" color={entry.type === 'Revenue' ? 'success' : 'danger'}>
              {entry.type}
            </Badge>
          </div>
        ))}
      </Card>
    </div>
  );
};
