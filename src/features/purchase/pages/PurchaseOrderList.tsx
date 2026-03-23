/**
 * Purchase - Purchase Order List Page
 * Supplier order management and procurement tracking
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
  ArrowDownload20Regular,
  CheckmarkCircle20Regular,
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
  table: {
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '140px 1.5fr 1fr 1fr 1fr 120px 120px 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1.5fr 1fr 1fr 1fr 120px 120px 100px',
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

const MOCK_PO_DATA = [
  {
    id: '1',
    poNumber: 'PO-2026-001',
    supplier: 'Industrial Supply Co.',
    orderDate: '2026-03-10',
    expectedDate: '2026-03-25',
    amount: 345000,
    status: 'Confirmed',
    receiveStatus: 'Pending',
  },
  {
    id: '2',
    poNumber: 'PO-2026-002',
    supplier: 'Electric Parts Ltd',
    orderDate: '2026-03-12',
    expectedDate: '2026-03-27',
    amount: 189000,
    status: 'Draft',
    receiveStatus: 'NA',
  },
  {
    id: '3',
    poNumber: 'PO-2026-003',
    supplier: 'Hardware Wholesalers',
    orderDate: '2026-03-14',
    expectedDate: '2026-03-29',
    amount: 567000,
    status: 'Approved',
    receiveStatus: 'Partial',
  },
];

export const PurchaseOrderList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [orders] = useState(MOCK_PO_DATA);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return tokens.colorPaletteGreenForeground1;
      case 'Approved': return tokens.colorPaletteBlueForeground2;
      case 'Draft': return tokens.colorNeutralForeground3;
      default: return tokens.colorNeutralForeground2;
    }
  };

  const getReceiveStatusColor = (status: string) => {
    switch (status) {
      case 'Received': return tokens.colorPaletteGreenForeground1;
      case 'Partial': return tokens.colorPaletteYellowForeground1;
      case 'Pending': return tokens.colorPaletteRedForeground1;
      default: return tokens.colorNeutralForeground3;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Purchase Orders</Title3>
          <Text>Manage supplier orders and procurement</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export
          </Button>
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={() => navigate('/purchase/orders/create')}
          >
            New Purchase Order
          </Button>
        </div>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search purchase orders..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Dropdown placeholder="All Status">
          <Option value="all">All Status</Option>
          <Option value="draft">Draft</Option>
          <Option value="approved">Approved</Option>
          <Option value="confirmed">Confirmed</Option>
        </Dropdown>
        <Dropdown placeholder="All Suppliers">
          <Option value="all">All Suppliers</Option>
        </Dropdown>
      </Card>

      <Card className={classes.table}>
        <div className={classes.tableHeader}>
          <div>PO Number</div>
          <div>Supplier</div>
          <div>Order Date</div>
          <div>Expected Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Received</div>
          <div>Actions</div>
        </div>

        {orders.map((order) => (
          <div key={order.id} className={classes.tableRow} onClick={() => navigate(`/purchase/orders/${order.id}`)}>
            <Text weight="semibold">{order.poNumber}</Text>
            <Text truncate>{order.supplier}</Text>
            <Text size={300}>{formatDate(order.orderDate)}</Text>
            <Text size={300}>{formatDate(order.expectedDate)}</Text>
            <Text weight="semibold">{formatCurrency(order.amount)}</Text>
            <Badge
              appearance="tint"
              style={{
                backgroundColor: getStatusColor(order.status) + '20',
                color: getStatusColor(order.status),
              }}
            >
              {order.status}
            </Badge>
            <Badge
              appearance="tint"
              style={{
                backgroundColor: getReceiveStatusColor(order.receiveStatus) + '20',
                color: getReceiveStatusColor(order.receiveStatus),
              }}
            >
              {order.receiveStatus}
            </Badge>
            <Button appearance="subtle" icon={<CheckmarkCircle20Regular />} size="small">
              Receive
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
};
