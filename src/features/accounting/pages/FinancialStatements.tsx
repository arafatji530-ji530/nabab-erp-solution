/**
 * Accounting - Financial Statements
 * EXPERT: Enterprise Solution Architect (Financial Reporting)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Title3,
  Text,
  Card,
  TabList,
  Tab,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const INCOME_STATEMENT = [
  { item: 'Revenue', amount: 8500000, isHeader: true },
  { item: 'Cost of Goods Sold', amount: -5200000, isHeader: false },
  { item: 'Gross Profit', amount: 3300000, isHeader: true },
  { item: 'Operating Expenses', amount: -1800000, isHeader: false },
  { item: 'Operating Income', amount: 1500000, isHeader: true },
  { item: 'Tax Expense', amount: -225000, isHeader: false },
  { item: 'Net Income', amount: 1275000, isHeader: true, isFinal: true },
];

const BALANCE_SHEET = [
  { item: 'ASSETS', amount: null, isSection: true },
  { item: 'Current Assets', amount: 4500000, isHeader: true },
  { item: 'Fixed Assets', amount: 15800000, isHeader: true },
  { item: 'Total Assets', amount: 20300000, isFinal: true },
  { item: 'LIABILITIES', amount: null, isSection: true },
  { item: 'Current Liabilities', amount: 2800000, isHeader: true },
  { item: 'Long-term Liabilities', amount: 8500000, isHeader: true },
  { item: 'Total Liabilities', amount: 11300000, isFinal: true },
  { item: 'EQUITY', amount: null, isSection: true },
  { item: "Shareholders' Equity", amount: 9000000, isHeader: true },
  { item: 'Total Equity', amount: 9000000, isFinal: true },
];

export const FinancialStatements = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState<string>('income');

  return (
    <div className={classes.container}>
      <div>
        <Title3>Financial Statements</Title3>
        <Text>View income statement, balance sheet, and cash flow</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <TabList selectedValue={selectedTab} onTabSelect={(_, data) => setSelectedTab(data.value as string)}>
          <Tab value="income">Income Statement</Tab>
          <Tab value="balance">Balance Sheet</Tab>
          <Tab value="cashflow">Cash Flow</Tab>
        </TabList>

        {selectedTab === 'income' && (
          <div style={{ marginTop: tokens.spacingVerticalL }}>
            <Table>
              <TableBody>
                {INCOME_STATEMENT.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Text weight={row.isHeader || row.isFinal ? 'bold' : 'regular'}>{row.item}</Text>
                    </TableCell>
                    <TableCell>
                      <Text
                        weight={row.isHeader || row.isFinal ? 'bold' : 'regular'}
                        style={{
                          color: row.isFinal
                            ? tokens.colorPaletteGreenForeground1
                            : row.amount && row.amount < 0
                              ? tokens.colorPaletteRedForeground1
                              : undefined,
                        }}
                      >
                        {row.amount ? formatCurrency(row.amount) : ''}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {selectedTab === 'balance' && (
          <div style={{ marginTop: tokens.spacingVerticalL }}>
            <Table>
              <TableBody>
                {BALANCE_SHEET.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Text weight={row.isSection || row.isFinal ? 'bold' : row.isHeader ? 'semibold' : 'regular'}>{row.item}</Text>
                    </TableCell>
                    <TableCell>
                      <Text
                        weight={row.isSection || row.isFinal ? 'bold' : row.isHeader ? 'semibold' : 'regular'}
                        style={{ color: row.isFinal ? tokens.colorBrandForeground1 : undefined }}
                      >
                        {row.amount ? formatCurrency(row.amount) : ''}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {selectedTab === 'cashflow' && (
          <div style={{ marginTop: tokens.spacingVerticalL }}>
            <Text>Cash Flow Statement - Coming Soon</Text>
          </div>
        )}
      </Card>
    </div>
  );
};
