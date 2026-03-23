/**
 * Accounting - Bank Reconciliation
 * EXPERT: Enterprise Solution Architect (Financial Systems)
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
  Checkbox,
} from '@fluentui/react-components';
import { Checkmark20Regular, Dismiss20Regular } from '@fluentui/react-icons';
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
  },
});

const TRANSACTIONS = [
  { id: '1', date: '2026-03-20', description: 'Customer Payment - INV-001', bank: 250000, book: 250000, matched: true },
  { id: '2', date: '2026-03-21', description: 'Supplier Payment', bank: -150000, book: -150000, matched: true },
  { id: '3', date: '2026-03-22', description: 'Bank Charges', bank: -500, book: null, matched: false },
  { id: '4', date: '2026-03-23', description: 'Pending Check Deposit', bank: null, book: 75000, matched: false },
];

export const BankReconciliation = () => {
  const classes = useStyles();

  const bankBalance = 1850000;
  const bookBalance = 1924500;
  const unreconciled = bookBalance - bankBalance;

  return (
    <div className={classes.container}>
      <div>
        <Title3>Bank Reconciliation</Title3>
        <Text>Reconcile bank statements with book balances</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Bank Balance
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(bankBalance)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Book Balance
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(bookBalance)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Unreconciled Amount
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(unreconciled)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Matched Transactions
          </Text>
          <Text size={500} weight="bold" block>
            2 / 4
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Transactions</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Match</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Bank Amount</TableHeaderCell>
              <TableHeaderCell>Book Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TRANSACTIONS.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>
                  <Checkbox checked={txn.matched} />
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(txn.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{txn.description}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold" style={{ color: txn.bank && txn.bank < 0 ? tokens.colorPaletteRedForeground1 : undefined }}>
                    {txn.bank ? formatCurrency(txn.bank) : '-'}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold" style={{ color: txn.book && txn.book < 0 ? tokens.colorPaletteRedForeground1 : undefined }}>
                    {txn.book ? formatCurrency(txn.book) : '-'}
                  </Text>
                </TableCell>
                <TableCell>
                  {txn.matched ? (
                    <Badge appearance="tint" color="success" icon={<Checkmark20Regular />}>
                      Matched
                    </Badge>
                  ) : (
                    <Badge appearance="tint" color="warning" icon={<Dismiss20Regular />}>
                      Unmatched
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
