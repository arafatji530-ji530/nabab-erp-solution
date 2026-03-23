/**
 * Reports - Financial Report Page
 * Profit & loss, balance sheet, and financial analytics
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
  Dropdown,
  Option,
  Tab,
  TabList,
} from '@fluentui/react-components';
import {
  ArrowDownload20Regular,
  Money20Regular,
  ChartMultiple20Regular,
} from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

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
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  summaryCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
  },
  table: {
    width: '100%',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  sectionHeader: {
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    fontWeight: tokens.fontWeightSemibold,
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.margin(tokens.spacingVerticalM, '0'),
  },
  totalRow: {
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    ...shorthands.borderTop('2px', 'solid', tokens.colorNeutralStroke2),
    fontWeight: tokens.fontWeightBold,
  },
});

const PL_DATA = {
  revenue: [
    { item: 'Product Sales', amount: 12500000 },
    { item: 'Service Revenue', amount: 850000 },
  ],
  expenses: [
    { item: 'Cost of Goods Sold', amount: 7800000 },
    { item: 'Operating Expenses', amount: 2100000 },
    { item: 'Salaries & Wages', amount: 1800000 },
    { item: 'Rent & Utilities', amount: 450000 },
    { item: 'Marketing', amount: 380000 },
  ],
};

const BALANCE_SHEET = {
  assets: [
    { item: 'Cash & Bank', amount: 2500000 },
    { item: 'Accounts Receivable', amount: 1850000 },
    { item: 'Inventory', amount: 3200000 },
    { item: 'Fixed Assets', amount: 5500000 },
  ],
  liabilities: [
    { item: 'Accounts Payable', amount: 1200000 },
    { item: 'Short-term Loans', amount: 800000 },
    { item: 'Long-term Debt', amount: 2500000 },
  ],
};

export const FinancialReport = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('pl');

  const totalRevenue = PL_DATA.revenue.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = PL_DATA.expenses.reduce((sum, item) => sum + item.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const totalAssets = BALANCE_SHEET.assets.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = BALANCE_SHEET.liabilities.reduce((sum, item) => sum + item.amount, 0);
  const equity = totalAssets - totalLiabilities;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Financial Reports</Title3>
          <Text>Comprehensive financial analysis and statements</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export PDF
          </Button>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export Excel
          </Button>
        </div>
      </div>

      <Card className={classes.toolbar}>
        <Dropdown placeholder="This Month" defaultValue="month">
          <Option value="month">This Month</Option>
          <Option value="quarter">This Quarter</Option>
          <Option value="year">This Year</Option>
          <Option value="custom">Custom Range</Option>
        </Dropdown>
        <Dropdown placeholder="All Departments">
          <Option value="all">All Departments</Option>
        </Dropdown>
      </Card>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(data.value as string)}
      >
        <Tab value="pl">Profit & Loss</Tab>
        <Tab value="balance">Balance Sheet</Tab>
        <Tab value="cashflow">Cash Flow</Tab>
      </TabList>

      {selectedTab === 'pl' && (
        <>
          <div className={classes.summaryGrid}>
            <Card className={classes.summaryCard}>
              <Money20Regular
                style={{
                  fontSize: '32px',
                  color: tokens.colorPaletteGreenForeground1,
                  marginBottom: tokens.spacingVerticalS,
                }}
              />
              <Text size={200} block>
                Total Revenue
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
                {formatCurrency(totalRevenue)}
              </Text>
            </Card>

            <Card className={classes.summaryCard}>
              <Money20Regular
                style={{
                  fontSize: '32px',
                  color: tokens.colorPaletteRedForeground1,
                  marginBottom: tokens.spacingVerticalS,
                }}
              />
              <Text size={200} block>
                Total Expenses
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
                {formatCurrency(totalExpenses)}
              </Text>
            </Card>

            <Card className={classes.summaryCard}>
              <ChartMultiple20Regular
                style={{
                  fontSize: '32px',
                  color: tokens.colorBrandForeground1,
                  marginBottom: tokens.spacingVerticalS,
                }}
              />
              <Text size={200} block>
                Net Profit
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
                {formatCurrency(netProfit)}
              </Text>
              <Text size={200} style={{ color: tokens.colorPaletteGreenForeground1 }}>
                {((netProfit / totalRevenue) * 100).toFixed(1)}% margin
              </Text>
            </Card>
          </div>

          <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
            <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Profit & Loss Statement</Title3>
            <div className={classes.table}>
              <div className={classes.sectionHeader}>
                <Text weight="semibold">Revenue</Text>
              </div>
              {PL_DATA.revenue.map((item, index) => (
                <div key={index} className={classes.tableRow}>
                  <Text>{item.item}</Text>
                  <div />
                  <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(item.amount)}
                  </Text>
                </div>
              ))}
              <div className={`${classes.tableRow} ${classes.totalRow}`}>
                <Text>Total Revenue</Text>
                <div />
                <Text style={{ color: tokens.colorPaletteGreenForeground1 }}>
                  {formatCurrency(totalRevenue)}
                </Text>
              </div>

              <div className={classes.sectionHeader} style={{ marginTop: tokens.spacingVerticalL }}>
                <Text weight="semibold">Expenses</Text>
              </div>
              {PL_DATA.expenses.map((item, index) => (
                <div key={index} className={classes.tableRow}>
                  <Text>{item.item}</Text>
                  <div />
                  <Text weight="semibold" style={{ color: tokens.colorPaletteRedForeground1 }}>
                    {formatCurrency(item.amount)}
                  </Text>
                </div>
              ))}
              <div className={`${classes.tableRow} ${classes.totalRow}`}>
                <Text>Total Expenses</Text>
                <div />
                <Text style={{ color: tokens.colorPaletteRedForeground1 }}>
                  {formatCurrency(totalExpenses)}
                </Text>
              </div>

              <div
                className={classes.tableRow}
                style={{
                  ...shorthands.borderTop('3px', 'double', tokens.colorNeutralStroke2),
                  marginTop: tokens.spacingVerticalL,
                } as React.CSSProperties}
              >
                <Text size={500} weight="bold">
                  Net Profit
                </Text>
                <div />
                <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                  {formatCurrency(netProfit)}
                </Text>
              </div>
            </div>
          </Card>
        </>
      )}

      {selectedTab === 'balance' && (
        <>
          <div className={classes.summaryGrid}>
            <Card className={classes.summaryCard}>
              <Text size={200} block>
                Total Assets
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
                {formatCurrency(totalAssets)}
              </Text>
            </Card>

            <Card className={classes.summaryCard}>
              <Text size={200} block>
                Total Liabilities
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
                {formatCurrency(totalLiabilities)}
              </Text>
            </Card>

            <Card className={classes.summaryCard}>
              <Text size={200} block>
                Equity
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
                {formatCurrency(equity)}
              </Text>
            </Card>
          </div>

          <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
            <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Balance Sheet</Title3>
            <div className={classes.table}>
              <div className={classes.sectionHeader}>
                <Text weight="semibold">Assets</Text>
              </div>
              {BALANCE_SHEET.assets.map((item, index) => (
                <div key={index} className={classes.tableRow}>
                  <Text>{item.item}</Text>
                  <div />
                  <Text weight="semibold">{formatCurrency(item.amount)}</Text>
                </div>
              ))}
              <div className={`${classes.tableRow} ${classes.totalRow}`}>
                <Text>Total Assets</Text>
                <div />
                <Text>{formatCurrency(totalAssets)}</Text>
              </div>

              <div className={classes.sectionHeader} style={{ marginTop: tokens.spacingVerticalL }}>
                <Text weight="semibold">Liabilities</Text>
              </div>
              {BALANCE_SHEET.liabilities.map((item, index) => (
                <div key={index} className={classes.tableRow}>
                  <Text>{item.item}</Text>
                  <div />
                  <Text weight="semibold">{formatCurrency(item.amount)}</Text>
                </div>
              ))}
              <div className={`${classes.tableRow} ${classes.totalRow}`}>
                <Text>Total Liabilities</Text>
                <div />
                <Text>{formatCurrency(totalLiabilities)}</Text>
              </div>

              <div
                className={classes.tableRow}
                style={{
                  ...shorthands.borderTop('3px', 'double', tokens.colorNeutralStroke2),
                  marginTop: tokens.spacingVerticalL,
                } as React.CSSProperties}
              >
                <Text size={500} weight="bold">
                  Equity
                </Text>
                <div />
                <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                  {formatCurrency(equity)}
                </Text>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
