/**
 * Accounting - Journal Entry Management
 * EXPERT: Senior React Engineer (Double-Entry Bookkeeping)
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
  Textarea,
} from '@fluentui/react-components';
import { Add20Regular, Save20Regular, DocumentPdf20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  formCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginBottom: tokens.spacingVerticalM,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  entryTable: {
    marginTop: tokens.spacingVerticalL,
  },
  totalsRow: {
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    ...shorthands.borderTop('2px', 'solid', tokens.colorNeutralStroke2),
    marginTop: tokens.spacingVerticalM,
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const JOURNAL_LINES = [
  { id: '1', account: '1100 - Bank Account', debit: '50000', credit: '0' },
  { id: '2', account: '4000 - Sales Revenue', debit: '0', credit: '50000' },
];

const RECENT_JOURNALS = [
  {
    id: '1',
    number: 'JE-2026-001',
    date: '2026-03-25',
    description: 'Sales transaction',
    debitTotal: 50000,
    creditTotal: 50000,
    status: 'Posted',
  },
  {
    id: '2',
    number: 'JE-2026-002',
    date: '2026-03-26',
    description: 'Purchase of equipment',
    debitTotal: 125000,
    creditTotal: 125000,
    status: 'Posted',
  },
  {
    id: '3',
    number: 'JE-2026-003',
    date: '2026-03-27',
    description: 'Salary payment',
    debitTotal: 85000,
    creditTotal: 85000,
    status: 'Draft',
  },
];

export const JournalEntries = () => {
  const classes = useStyles();

  const totalDebit = JOURNAL_LINES.reduce((sum, line) => sum + Number(line.debit), 0);
  const totalCredit = JOURNAL_LINES.reduce((sum, line) => sum + Number(line.credit), 0);
  const isBalanced = totalDebit === totalCredit;

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Journal Entries</Title3>
          <Text>Create and manage accounting journal entries</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Journal Entry
        </Button>
      </div>

      <Card className={classes.formCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Create Journal Entry</Title3>

        <div className={classes.formGrid}>
          <div className={classes.formGroup}>
            <Label required>Entry Number</Label>
            <Input placeholder="Auto-generated" disabled />
          </div>

          <div className={classes.formGroup}>
            <Label required>Entry Date</Label>
            <Input type="date" defaultValue="2026-03-28" />
          </div>

          <div className={classes.formGroup}>
            <Label required>Source</Label>
            <Dropdown placeholder="Select source">
              <Option value="manual">Manual Entry</Option>
              <Option value="sales">Sales</Option>
              <Option value="purchase">Purchase</Option>
              <Option value="payroll">Payroll</Option>
              <Option value="adjustment">Adjustment</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Reference Number</Label>
            <Input placeholder="Optional reference" />
          </div>
        </div>

        <div className={classes.formGroup}>
          <Label required>Description</Label>
          <Textarea rows={2} placeholder="Describe this journal entry..." />
        </div>

        <div className={classes.entryTable}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Journal Lines</Title3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Account</TableHeaderCell>
                <TableHeaderCell>Debit</TableHeaderCell>
                <TableHeaderCell>Credit</TableHeaderCell>
                <TableHeaderCell>Memo</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {JOURNAL_LINES.map((line) => (
                <TableRow key={line.id}>
                  <TableCell>
                    <Dropdown placeholder="Select account" defaultValue={line.account} style={{ width: '100%' }}>
                      <Option value={line.account}>{line.account}</Option>
                      <Option value="1000 - Cash">1000 - Cash</Option>
                      <Option value="2000 - Accounts Payable">2000 - Accounts Payable</Option>
                    </Dropdown>
                  </TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={line.debit || ''} style={{ width: '120px' }} />
                  </TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={line.credit || ''} style={{ width: '120px' }} />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Optional memo" size="small" />
                  </TableCell>
                  <TableCell>
                    <Button appearance="subtle" size="small">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            appearance="subtle"
            icon={<Add20Regular />}
            style={{ marginTop: tokens.spacingVerticalM }}
          >
            Add Line
          </Button>

          <div className={classes.totalsRow}>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalXL }}>
              <div>
                <Text size={300} block>
                  Total Debit
                </Text>
                <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                  {formatCurrency(totalDebit)}
                </Text>
              </div>
              <div>
                <Text size={300} block>
                  Total Credit
                </Text>
                <Text size={500} weight="bold" style={{ color: tokens.colorPaletteRedForeground1 }}>
                  {formatCurrency(totalCredit)}
                </Text>
              </div>
              <div>
                <Text size={300} block>
                  Difference
                </Text>
                <Text size={500} weight="bold" style={{ color: isBalanced ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1 }}>
                  {formatCurrency(Math.abs(totalDebit - totalCredit))}
                </Text>
              </div>
            </div>

            {isBalanced && (
              <Badge appearance="tint" color="success" size="large">
                ✓ Balanced
              </Badge>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL }}>
          <Button appearance="secondary">Save as Draft</Button>
          <Button appearance="primary" icon={<Save20Regular />} disabled={!isBalanced}>
            Post Entry
          </Button>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
          <Title3>Recent Journal Entries</Title3>
          <Button appearance="secondary" size="small" icon={<DocumentPdf20Regular />}>
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Entry #</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Debit Total</TableHeaderCell>
              <TableHeaderCell>Credit Total</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RECENT_JOURNALS.map((journal) => (
              <TableRow key={journal.id}>
                <TableCell>
                  <Text weight="semibold">{journal.number}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(journal.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{journal.description}</Text>
                </TableCell>
                <TableCell>
                  <Text style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(journal.debitTotal)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text style={{ color: tokens.colorPaletteRedForeground1 }}>
                    {formatCurrency(journal.creditTotal)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={journal.status === 'Posted' ? 'success' : 'warning'}>
                    {journal.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small">
                      View
                    </Button>
                    {journal.status === 'Draft' && (
                      <>
                        <Button appearance="subtle" size="small">
                          Edit
                        </Button>
                        <Button appearance="primary" size="small">
                          Post
                        </Button>
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
