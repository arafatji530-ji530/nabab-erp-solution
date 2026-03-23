/**
 * Accounting - Invoice Management Page
 * Manage customer invoices and billing
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  DocumentPdf20Regular,
  Mail20Regular,
  Checkmark20Regular,
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
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '140px 1.5fr 1fr 1fr 1fr 120px 120px 140px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1.5fr 1fr 1fr 1fr 120px 120px 140px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    alignItems: 'center',
    cursor: 'pointer',
    ...shorthands.transition('background', '150ms'),
    
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },
  actions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

const MOCK_INVOICES = [
  {
    id: '1',
    invoiceNumber: 'INV-2026-001',
    customer: 'ABC Industries Ltd',
    issueDate: '2026-03-15',
    dueDate: '2026-04-14',
    amount: 125000,
    paid: 125000,
    status: 'Paid',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2026-002',
    customer: 'XYZ Electronics',
    issueDate: '2026-03-18',
    dueDate: '2026-04-17',
    amount: 89500,
    paid: 50000,
    status: 'Partial',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2026-003',
    customer: 'Mega Hardware Store',
    issueDate: '2026-03-20',
    dueDate: '2026-04-19',
    amount: 245000,
    paid: 0,
    status: 'Unpaid',
  },
  {
    id: '4',
    invoiceNumber: 'INV-2026-004',
    customer: 'Tech Solutions Group',
    issueDate: '2026-03-10',
    dueDate: '2026-04-09',
    amount: 67000,
    paid: 0,
    status: 'Overdue',
  },
];

export const InvoiceManagement = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [invoices] = useState(MOCK_INVOICES);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalPending = totalInvoiced - totalPaid;
  const overdueCount = invoices.filter((inv) => inv.status === 'Overdue').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return tokens.colorPaletteGreenForeground1;
      case 'Partial':
        return tokens.colorPaletteYellowForeground1;
      case 'Unpaid':
        return tokens.colorPaletteBlueForeground2;
      case 'Overdue':
        return tokens.colorPaletteRedForeground1;
      default:
        return tokens.colorNeutralForeground3;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Invoices</Title3>
          <Text>Manage customer invoices and billing</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Invoice
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Invoiced
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalInvoiced)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Paid
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalPaid)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending Payment
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {formatCurrency(totalPending)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Overdue Invoices
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {overdueCount}
          </Text>
        </Card>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search invoices..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Dropdown placeholder="All Status">
          <Option value="all">All Status</Option>
          <Option value="paid">Paid</Option>
          <Option value="unpaid">Unpaid</Option>
          <Option value="overdue">Overdue</Option>
        </Dropdown>
        <Button appearance="secondary">Export</Button>
      </Card>

      <Card className={classes.table}>
        <div className={classes.tableHeader}>
          <div>Invoice #</div>
          <div>Customer</div>
          <div>Issue Date</div>
          <div>Due Date</div>
          <div>Amount</div>
          <div>Paid</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {invoices.map((invoice) => (
          <div key={invoice.id} className={classes.tableRow} onClick={() => navigate(`/accounting/invoices/${invoice.id}`)}>
            <Text weight="semibold">{invoice.invoiceNumber}</Text>
            <Text truncate>{invoice.customer}</Text>
            <Text size={300}>{formatDate(invoice.issueDate)}</Text>
            <Text size={300}>{formatDate(invoice.dueDate)}</Text>
            <Text weight="semibold">{formatCurrency(invoice.amount)}</Text>
            <Text style={{ color: invoice.paid > 0 ? tokens.colorPaletteGreenForeground1 : 'inherit' }}>
              {formatCurrency(invoice.paid)}
            </Text>
            <Badge
              appearance="tint"
              style={{
                backgroundColor: getStatusColor(invoice.status) + '20',
                color: getStatusColor(invoice.status),
              }}
            >
              {invoice.status}
            </Badge>
            <div className={classes.actions} onClick={(e) => e.stopPropagation()}>
              <Button appearance="subtle" icon={<DocumentPdf20Regular />} size="small" title="Download PDF" />
              <Button appearance="subtle" icon={<Mail20Regular />} size="small" title="Send Email" />
              <Button
                appearance="subtle"
                icon={<Checkmark20Regular />}
                size="small"
                title="Mark as Paid"
                disabled={invoice.status === 'Paid'}
              />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};
