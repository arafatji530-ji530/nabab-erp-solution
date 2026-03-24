import { useEffect, useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Title3,
  Text,
  Card,
  Badge,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  SelectTabData,
  TabList,
  Tab,
} from '@fluentui/react-components';
import { ArrowDownload20Regular } from '@fluentui/react-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';
import {
  fetchInvoices,
  selectInvoices,
  selectLoading,
} from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  table: {
    width: '100%',
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
});

export const BillingHistory = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const invoices = useAppSelector(selectInvoices);
  const loading = useAppSelector(selectLoading);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchInvoices({ page: currentPage, pageSize: 10 }) as any);
  }, [dispatch, currentPage]);

  const filteredInvoices = invoices.filter((inv) => {
    if (selectedTab === 'all') return true;
    return inv.status === selectedTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'past_due':
        return 'error';
      case 'draft':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner size="large" label="Loading billing history..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div>
        <Title3>Billing History</Title3>
        <Text>View and download your invoices</Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => {
          setSelectedTab(String(data.value));
          setCurrentPage(1);
        }}
      >
        <Tab value="all">All Invoices</Tab>
        <Tab value="paid">Paid</Tab>
        <Tab value="past_due">Past Due</Tab>
        <Tab value="draft">Draft</Tab>
      </TabList>

      <Card>
        <Table arial-label="Invoices table" className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Invoice #</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Tax</TableHeaderCell>
              <TableHeaderCell>Total</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} style={{ textAlign: 'center', paddingTop: tokens.spacingVerticalXL }}>
                  <Text>No invoices found</Text>
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{formatDate(invoice.issueDate)}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>{formatCurrency(invoice.tax)}</TableCell>
                  <TableCell style={{ fontWeight: 600 }}>{formatCurrency(invoice.total)}</TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={getStatusColor(invoice.status) as any}
                    >
                      {invoice.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<ArrowDownload20Regular />}
                      title="Download PDF"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
