/**
 * Accounting - Chart of Accounts Management
 * EXPERT: Enterprise Solution Architect (Financial Structure)
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
  Tree,
  TreeItem,
  TreeItemLayout,
} from '@fluentui/react-components';
import { Add20Regular, Edit20Regular, Delete20Regular, Folder20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  splitView: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  treePanel: {
    ...shorthands.padding(tokens.spacingVerticalL),
    height: '600px',
    ...shorthands.overflow('auto'),
  },
  detailsPanel: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginBottom: tokens.spacingVerticalL,
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
    textAlign: 'center',
  },
});

const ACCOUNT_TYPES = [
  { type: 'Assets', count: 24, balance: 15500000, color: tokens.colorPaletteGreenForeground1 },
  { type: 'Liabilities', count: 18, balance: 8200000, color: tokens.colorPaletteRedForeground1 },
  { type: 'Equity', count: 12, balance: 7300000, color: tokens.colorPaletteBlueForeground2 },
  { type: 'Revenue', count: 15, balance: 12500000, color: tokens.colorPaletteGreenForeground1 },
  { type: 'Expenses', count: 22, balance: 4200000, color: tokens.colorPaletteDarkOrangeForeground1 },
];

const ACCOUNTS = [
  { id: '1', code: '1000', name: 'Cash in Hand', type: 'Assets', parent: '', balance: 450000 },
  { id: '2', code: '1100', name: 'Bank Accounts', type: 'Assets', parent: '', balance: 2500000 },
  { id: '3', code: '2000', name: 'Accounts Payable', type: 'Liabilities', parent: '', balance: 850000 },
  { id: '4', code: '4000', name: 'Sales Revenue', type: 'Revenue', parent: '', balance: 5600000 },
  { id: '5', code: '5000', name: 'Operating Expenses', type: 'Expenses', parent: '', balance: 1200000 },
];

export const ChartOfAccounts = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Chart of Accounts</Title3>
          <Text>Manage your financial account structure</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Account
        </Button>
      </div>

      <div className={classes.statsGrid}>
        {ACCOUNT_TYPES.map((type, idx) => (
          <Card key={idx} className={classes.statCard}>
            <Text size={200} block>
              {type.type}
            </Text>
            <Text size={500} weight="bold" block style={{ color: type.color }}>
              {formatCurrency(type.balance)}
            </Text>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              {type.count} accounts
            </Text>
          </Card>
        ))}
      </div>

      <div className={classes.splitView}>
        <Card className={classes.treePanel}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Account Structure</Title3>

          <Tree>
            <TreeItem itemType="branch">
              <TreeItemLayout iconBefore={<Folder20Regular />}>Assets</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>1000 - Cash in Hand</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>1100 - Bank Accounts</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>1200 - Accounts Receivable</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>

            <TreeItem itemType="branch">
              <TreeItemLayout iconBefore={<Folder20Regular />}>Liabilities</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>2000 - Accounts Payable</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>2100 - Short-term Loans</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>

            <TreeItem itemType="branch">
              <TreeItemLayout iconBefore={<Folder20Regular />}>Equity</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>3000 - Owner's Equity</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>3100 - Retained Earnings</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>

            <TreeItem itemType="branch">
              <TreeItemLayout iconBefore={<Folder20Regular />}>Revenue</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>4000 - Sales Revenue</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>4100 - Service Revenue</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>

            <TreeItem itemType="branch">
              <TreeItemLayout iconBefore={<Folder20Regular />}>Expenses</TreeItemLayout>
              <Tree>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>5000 - Operating Expenses</TreeItemLayout>
                </TreeItem>
                <TreeItem itemType="leaf">
                  <TreeItemLayout>5100 - Salary Expenses</TreeItemLayout>
                </TreeItem>
              </Tree>
            </TreeItem>
          </Tree>
        </Card>

        <Card className={classes.detailsPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
            <Title3>Account List</Title3>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
              <Dropdown placeholder="All Types">
                <Option value="all">All Types</Option>
                <Option value="assets">Assets</Option>
                <Option value="liabilities">Liabilities</Option>
                <Option value="equity">Equity</Option>
                <Option value="revenue">Revenue</Option>
                <Option value="expenses">Expenses</Option>
              </Dropdown>
              <Input placeholder="Search accounts..." />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Code</TableHeaderCell>
                <TableHeaderCell>Account Name</TableHeaderCell>
                <TableHeaderCell>Type</TableHeaderCell>
                <TableHeaderCell>Balance</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ACCOUNTS.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>
                    <Text weight="semibold">{account.code}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{account.name}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{account.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>
                      {formatCurrency(account.balance)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                      <Button appearance="subtle" size="small" icon={<Edit20Regular />} />
                      <Button appearance="subtle" size="small" icon={<Delete20Regular />} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
