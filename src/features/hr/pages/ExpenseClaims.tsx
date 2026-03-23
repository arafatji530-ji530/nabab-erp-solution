/**
 * HR - Expense Claims Management
 * EXPERT: Senior React Engineer (Approval Workflow)
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
  Avatar,
  Input,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { Add20Regular, Receipt20Regular, Checkmark20Regular, Dismiss20Regular } from '@fluentui/react-icons';
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

const EXPENSES = [
  {
    id: '1',
    claimNumber: 'EXP-2026-001',
    employee: 'Ahmed Hassan',
    category: 'Travel',
    amount: 15000,
    date: '2026-03-25',
    status: 'Pending',
  },
  {
    id: '2',
    claimNumber: 'EXP-2026-002',
    employee: 'Fatima Rahman',
    category: 'Meals',
    amount: 3500,
    date: '2026-03-24',
    status: 'Approved',
  },
  {
    id: '3',
    claimNumber: 'EXP-2026-003',
    employee: 'Karim Ali',
    category: 'Accommodation',
    amount: 8500,
    date: '2026-03-23',
    status: 'Paid',
  },
];

export const ExpenseClaims = () => {
  const classes = useStyles();

  const totalClaims = EXPENSES.length;
  const pendingAmount = EXPENSES.filter((e) => e.status === 'Pending').reduce((sum, e) => sum + e.amount, 0);
  const approvedAmount = EXPENSES.filter((e) => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);
  const paidAmount = EXPENSES.filter((e) => e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Approved':
        return 'brand';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'subtle';
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Expense Claims Management</Title3>
          <Text>Process and approve employee expense reimbursements</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Claim
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Claims
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalClaims}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(pendingAmount)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Approved
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {formatCurrency(approvedAmount)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Paid
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(paidAmount)}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Input placeholder="Search claims..." style={{ flexGrow: 1, maxWidth: '400px' }} />
          <Dropdown placeholder="All Categories">
            <Option value="all">All Categories</Option>
            <Option value="travel">Travel</Option>
            <Option value="meals">Meals</Option>
            <Option value="accommodation">Accommodation</Option>
            <Option value="supplies">Office Supplies</Option>
          </Dropdown>
          <Dropdown placeholder="All Status">
            <Option value="all">All Status</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="paid">Paid</Option>
            <Option value="rejected">Rejected</Option>
          </Dropdown>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Claim #</TableHeaderCell>
              <TableHeaderCell>Employee</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EXPENSES.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Receipt20Regular />
                    <Text weight="semibold">{expense.claimNumber}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={expense.employee} size={24} />
                    <Text size={300}>{expense.employee}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{expense.category}</Badge>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(expense.amount)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(expense.date)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getStatusColor(expense.status)}>
                    {expense.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small">
                      View
                    </Button>
                    {expense.status === 'Pending' && (
                      <>
                        <Button appearance="primary" size="small" icon={<Checkmark20Regular />} />
                        <Button appearance="secondary" size="small" icon={<Dismiss20Regular />} />
                      </>
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
