import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Title3,
  Text,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Button,
  Checkbox,
  Input,
  Dropdown,
  Option,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
} from '@fluentui/react-components';
import { ArrowDownload20Regular, DocumentPdf20Regular, Archive20Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectInvoices } from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  headerCard: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  filterCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  filterRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  invoiceTable: {
    marginTop: tokens.spacingVerticalM,
  },
  statusBadge: {
    display: 'inline-block',
    ...shorthands.padding(tokens.spacingVerticalXS, tokens.spacingHorizontalS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  statusPaid: {
    backgroundColor: '#D4F1E4',
    color: '#107C10',
  },
  statusPending: {
    backgroundColor: '#FFF4CE',
    color: '#FFB900',
  },
  statusOverdue: {
    backgroundColor: '#FEE5E5',
    color: '#C50F1F',
  },
  bulkActionCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalL),
    alignItems: 'flex-end',
  },
  invoicePreviewDialog: {
    minWidth: '600px',
  },
  previewContent: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding(tokens.spacingVerticalXL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontFamily: 'monospace',
    fontSize: tokens.fontSizeBase200,
  },
});

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  items: Array<{ description: string; quantity: number; unitPrice: number }>;
  tax: number;
}

const SAMPLE_INVOICES: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    date: '2024-01-01',
    dueDate: '2024-01-31',
    amount: 99.99,
    status: 'paid',
    items: [
      { description: 'Pro Plan - Monthly', quantity: 1, unitPrice: 99.99 },
    ],
    tax: 0,
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    date: '2023-12-01',
    dueDate: '2023-12-31',
    amount: 99.99,
    status: 'paid',
    items: [
      { description: 'Pro Plan - Monthly', quantity: 1, unitPrice: 99.99 },
    ],
    tax: 0,
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    date: '2023-11-01',
    dueDate: '2023-11-30',
    amount: 99.99,
    status: 'pending',
    items: [
      { description: 'Pro Plan - Monthly', quantity: 1, unitPrice: 99.99 },
    ],
    tax: 0,
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    date: '2023-10-01',
    dueDate: '2023-10-31',
    amount: 99.99,
    status: 'overdue',
    items: [
      { description: 'Pro Plan - Monthly', quantity: 1, unitPrice: 99.99 },
    ],
    tax: 0,
  },
];

export const DownloadInvoice = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(SAMPLE_INVOICES);
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRangeFrom, setDateRangeFrom] = useState('');
  const [dateRangeTo, setDateRangeTo] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedInvoicePreview, setSelectedInvoicePreview] = useState<Invoice | null>(null);

  const handleStatusFilterChange = (value?: string) => {
    setStatusFilter(value || 'all');
    applyFilters(searchTerm, value || 'all', dateRangeFrom, dateRangeTo);
  };

  const applyFilters = (search: string, status: string, fromDate: string, toDate: string) => {
    let filtered = SAMPLE_INVOICES;

    if (search) {
      filtered = filtered.filter(
        (inv) =>
          inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
          inv.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter((inv) => inv.status === status);
    }

    if (fromDate) {
      filtered = filtered.filter((inv) => new Date(inv.date) >= new Date(fromDate));
    }

    if (toDate) {
      filtered = filtered.filter((inv) => new Date(inv.date) <= new Date(toDate));
    }

    setFilteredInvoices(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, statusFilter, dateRangeFrom, dateRangeTo);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(filteredInvoices.map((inv) => inv.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleSelectInvoice = (invoiceId: string) => {
    setSelectedInvoices((prev) =>
      prev.includes(invoiceId) ? prev.filter((id) => id !== invoiceId) : [...prev, invoiceId]
    );
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    // In a real app, this would trigger a PDF download
    console.log('Downloading invoice:', invoice.invoiceNumber);
  };

  const handleBulkDownload = () => {
    if (selectedInvoices.length === 0) return;
    // In a real app, this would create a zip file with multiple PDFs
    console.log('Bulk downloading invoices:', selectedInvoices);
  };

  const handlePreviewInvoice = (invoice: Invoice) => {
    setSelectedInvoicePreview(invoice);
    setPreviewOpen(true);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return classes.statusPaid;
      case 'pending':
        return classes.statusPending;
      case 'overdue':
        return classes.statusOverdue;
      default:
        return '';
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerCard}>
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalS }}>
          Download Invoices
        </Title3>
        <Text style={{ color: 'inherit' }}>
          Access and download all your invoices for accounting and tax purposes
        </Text>
      </div>

      <Card className={classes.filterCard}>
        <Title3>Search & Filter</Title3>
        <div className={classes.filterRow}>
          <Input
            placeholder="Search by invoice number or ID..."
            value={searchTerm}
            onChange={(_, data) => handleSearchChange(data.value || '')}
            style={{ flex: 1 }}
          />
          <Dropdown
            value={statusFilter}
            onOptionSelect={(_, data) => handleStatusFilterChange(data.optionValue)}
          >
            <Option value="all">All Statuses</Option>
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="overdue">Overdue</Option>
          </Dropdown>
        </div>

        <div className={classes.filterRow}>
          <Input
            type="date"
            placeholder="From Date"
            value={dateRangeFrom}
            onChange={(_, data) => {
              setDateRangeFrom(data.value || '');
              applyFilters(searchTerm, statusFilter, data.value || '', dateRangeTo);
            }}
          />
          <Input
            type="date"
            placeholder="To Date"
            value={dateRangeTo}
            onChange={(_, data) => {
              setDateRangeTo(data.value || '');
              applyFilters(searchTerm, statusFilter, dateRangeFrom, data.value || '');
            }}
          />
        </div>

        <Text size={200}>
          Found {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? 's' : ''}
        </Text>
      </Card>

      {selectedInvoices.length > 0 && (
        <Card className={classes.bulkActionCard}>
          <Text weight="semibold">{selectedInvoices.length} invoice(s) selected</Text>
          <Button
            icon={<Archive20Regular />}
            onClick={handleBulkDownload}
            appearance="primary"
          >
            Download as ZIP
          </Button>
          <Button
            appearance="secondary"
            onClick={() => setSelectedInvoices([])}
          >
            Clear Selection
          </Button>
        </Card>
      )}

      <Card style={{ padding: tokens.spacingVerticalL }}>
        <div style={{ overflowX: 'auto' }}>
          <Table className={classes.invoiceTable}>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>
                  <Checkbox
                    checked={
                      selectedInvoices.length === filteredInvoices.length &&
                      filteredInvoices.length > 0
                    }
                    onChange={(_, data) => handleSelectAll(!!data.checked)}
                  />
                </TableHeaderCell>
                <TableHeaderCell>Invoice Number</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Due Date</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => handleSelectInvoice(invoice.id)}
                    />
                  </TableCell>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={`${classes.statusBadge} ${getStatusClass(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
                      <Button
                        icon={<DocumentPdf20Regular />}
                        appearance="subtle"
                        title="Preview"
                        onClick={() => handlePreviewInvoice(invoice)}
                      />
                      <Button
                        icon={<ArrowDownload20Regular />}
                        appearance="subtle"
                        title="Download"
                        onClick={() => handleDownloadInvoice(invoice)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredInvoices.length === 0 && (
          <div style={{ textAlign: 'center', padding: tokens.spacingVerticalXL }}>
            <Text>No invoices found matching your filters</Text>
          </div>
        )}
      </Card>

      <Dialog open={previewOpen} onOpenChange={(_, data) => setPreviewOpen(data.open)}>
        <DialogContent className={classes.invoicePreviewDialog}>
          <DialogTitle>Invoice Preview: {selectedInvoicePreview?.invoiceNumber}</DialogTitle>
          <DialogBody>
            {selectedInvoicePreview && (
              <div className={classes.previewContent}>
                <div style={{ marginBottom: tokens.spacingVerticalL }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: tokens.spacingVerticalM }}>
                    INVOICE
                  </div>
                  <div style={{ marginBottom: tokens.spacingVerticalM }}>
                    Invoice #: {selectedInvoicePreview.invoiceNumber}
                    <br />
                    Date: {new Date(selectedInvoicePreview.date).toLocaleDateString()}
                    <br />
                    Due Date: {new Date(selectedInvoicePreview.dueDate).toLocaleDateString()}
                  </div>
                </div>

                <div style={{ borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: '#ccc', paddingTop: tokens.spacingVerticalM, marginBottom: tokens.spacingVerticalM }}>
                  <div style={{ marginBottom: tokens.spacingVerticalM }}>
                    <strong>Bill To:</strong>
                    <br />
                    Your Company Name
                    <br />
                    Email: user@example.com
                  </div>
                </div>

                <table style={{ width: '100%', marginBottom: tokens.spacingVerticalL }}>
                  <thead>
                    <tr style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#ccc' }}>
                      <th style={{ textAlign: 'left', paddingBottom: tokens.spacingVerticalS }}>Description</th>
                      <th style={{ textAlign: 'center', paddingBottom: tokens.spacingVerticalS }}>Qty</th>
                      <th style={{ textAlign: 'right', paddingBottom: tokens.spacingVerticalS }}>Unit Price</th>
                      <th style={{ textAlign: 'right', paddingBottom: tokens.spacingVerticalS }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoicePreview.items.map((item, idx) => (
                      <tr key={idx} style={{ borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: '#eee' }}>
                        <td style={{ paddingTop: tokens.spacingVerticalS, paddingBottom: tokens.spacingVerticalS }}>
                          {item.description}
                        </td>
                        <td style={{ paddingTop: tokens.spacingVerticalS, paddingBottom: tokens.spacingVerticalS, textAlign: 'center' }}>
                          {item.quantity}
                        </td>
                        <td style={{ paddingTop: tokens.spacingVerticalS, paddingBottom: tokens.spacingVerticalS, textAlign: 'right' }}>
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td style={{ paddingTop: tokens.spacingVerticalS, paddingBottom: tokens.spacingVerticalS, textAlign: 'right' }}>
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ marginBottom: tokens.spacingVerticalM }}>
                    Subtotal: ${selectedInvoicePreview.amount.toFixed(2)}
                    <br />
                    Tax: ${selectedInvoicePreview.tax.toFixed(2)}
                    <br />
                    <strong style={{ fontSize: '16px' }}>
                      Total: ${(selectedInvoicePreview.amount + selectedInvoicePreview.tax).toFixed(2)}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </DialogBody>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => {
                if (selectedInvoicePreview) {
                  handleDownloadInvoice(selectedInvoicePreview);
                }
              }}
              icon={<Download20Regular />}
            >
              Download PDF
            </Button>
            <Button appearance="secondary" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
