/**
 * Sales - Sales Order List Page
 * Enterprise order management with advanced filtering
 */

import { useEffect, useState } from 'react';
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
  Spinner,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  MoreVertical20Regular,
  Eye20Regular,
  Edit20Regular,
  Delete20Regular,
  DocumentPdf20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';
import { SALES_ORDER_STATUSES, PAYMENT_STATUSES } from '@/shared/utils/constants';

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
  searchBox: {
    flexGrow: 1,
    maxWidth: '400px',
  },
  table: {
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '150px 1.5fr 1fr 1fr 120px 120px 100px 60px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '150px 1.5fr 1fr 1fr 120px 120px 100px 60px',
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
});

const MOCK_ORDERS = [
  {
    id: '1',
    orderNumber: 'SO-2026-001',
    customer: 'ABC Industries Ltd',
    date: '2026-03-15',
    amount: 125000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
  },
  {
    id: '2',
    orderNumber: 'SO-2026-002',
    customer: 'XYZ Electronics',
    date: '2026-03-18',
    amount: 89500,
    status: 'InProgress',
    paymentStatus: 'Partial',
  },
  {
    id: '3',
    orderNumber: 'SO-2026-003',
    customer: 'Mega Hardware Store',
    date: '2026-03-20',
    amount: 245000,
    status: 'Draft',
    paymentStatus: 'Unpaid',
  },
];

export const SalesOrderList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [orders] = useState(MOCK_ORDERS);
  const [loading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    const statusConfig = SALES_ORDER_STATUSES.find((s) => s.value === status);
    return statusConfig?.color || tokens.colorNeutralForeground3;
  };

  const getPaymentColor = (status: string) => {
    const statusConfig = PAYMENT_STATUSES.find((s) => s.value === status);
    return statusConfig?.color || tokens.colorNeutralForeground3;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalXXXL }}>
        <Spinner size="large" label="Loading orders..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Sales Orders</Title3>
          <Text>Manage customer orders and quotations</Text>
        </div>
        <Button
          appearance="primary"
          icon={<Add20Regular />}
          onClick={() => navigate('/sales/orders/create')}
        >
          New Order
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Input
          className={classes.searchBox}
          placeholder="Search orders..."
          contentBefore={<Search20Regular />}
        />
        <Dropdown
          placeholder="Status"
          value={statusFilter}
          onOptionSelect={(_, data) => setStatusFilter(data.optionValue as string)}
        >
          <Option value="all">All Status</Option>
          {SALES_ORDER_STATUSES.map((status) => (
            <Option key={status.value} value={status.value}>
              {status.label}
            </Option>
          ))}
        </Dropdown>
        <Button appearance="secondary">Filter</Button>
        <Button appearance="secondary">Export</Button>
      </Card>

      <Card className={classes.table}>
        <div className={classes.tableHeader}>
          <div>Order Number</div>
          <div>Customer</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Payment</div>
          <div>Documents</div>
          <div>Actions</div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className={classes.tableRow} onClick={() => navigate(`/sales/orders/${order.id}`)}>
            <Text weight="semibold">{order.orderNumber}</Text>
            <Text truncate>{order.customer}</Text>
            <Text size={300}>{formatDate(order.date)}</Text>
            <Text weight="semibold">{formatCurrency(order.amount)}</Text>
            <Badge
              appearance="tint"
              style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}
            >
              {order.status}
            </Badge>
            <Badge
              appearance="tint"
              style={{ backgroundColor: getPaymentColor(order.paymentStatus) + '20', color: getPaymentColor(order.paymentStatus) }}
            >
              {order.paymentStatus}
            </Badge>
            <Button appearance="subtle" icon={<DocumentPdf20Regular />} size="small" />
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button
                  appearance="subtle"
                  icon={<MoreVertical20Regular />}
                  size="small"
                  onClick={(e) => e.stopPropagation()}
                />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<Eye20Regular />}>View</MenuItem>
                  <MenuItem icon={<Edit20Regular />}>Edit</MenuItem>
                  <MenuItem icon={<DocumentPdf20Regular />}>Print</MenuItem>
                  <MenuItem icon={<Delete20Regular />}>Delete</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        ))}
      </Card>
    </div>
  );
};
