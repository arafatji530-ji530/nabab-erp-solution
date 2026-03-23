/**
 * Inventory - Stock Movement History
 * EXPERT: Enterprise Solution Architect (Audit Trail)
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
} from '@fluentui/react-components';
import { ArrowSyncCircle20Regular, DocumentPdf20Regular, Filter20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

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

const MOVEMENTS = [
  {
    id: '1',
    product: 'Industrial Drill DX-500',
    sku: 'DRL-500',
    type: 'Sale',
    quantity: -5,
    location: 'Dhaka Warehouse',
    reference: 'INV-2026-001',
    date: '2026-03-28T10:30:00',
    user: 'Ahmed Hassan',
  },
  {
    id: '2',
    product: 'Safety Helmet',
    sku: 'SFT-HLM-001',
    type: 'Purchase',
    quantity: 100,
    location: 'Chittagong Warehouse',
    reference: 'PO-2026-045',
    date: '2026-03-27T14:20:00',
    user: 'Fatima Rahman',
  },
  {
    id: '3',
    product: 'Power Generator PG-3000',
    sku: 'PG-3000',
    type: 'Transfer',
    quantity: -2,
    location: 'Dhaka Warehouse → Sylhet',
    reference: 'TRF-2026-012',
    date: '2026-03-26T09:15:00',
    user: 'Karim Ali',
  },
  {
    id: '4',
    product: 'Welding Machine WM-200',
    sku: 'WLD-200',
    type: 'Adjustment',
    quantity: 3,
    location: 'Rajshahi Warehouse',
    reference: 'ADJ-2026-008',
    date: '2026-03-25T16:45:00',
    user: 'Nusrat Jahan',
  },
];

export const StockMovementHistory = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Stock Movement History</Title3>
          <Text>Complete audit trail of inventory transactions</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<Filter20Regular />}>
            Advanced Filter
          </Button>
          <Button appearance="secondary" icon={<DocumentPdf20Regular />}>
            Export Report
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Movements
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            1,245
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            This month
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Stock In
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            8,450
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Units added
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Stock Out
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            6,820
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Units removed
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Net Change
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            +1,630
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Units
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Input placeholder="Search by product, SKU, or reference..." style={{ flexGrow: 1, maxWidth: '400px' }} />
          <Dropdown placeholder="All Movement Types">
            <Option value="all">All Movement Types</Option>
            <Option value="sale">Sales</Option>
            <Option value="purchase">Purchases</Option>
            <Option value="transfer">Transfers</Option>
            <Option value="adjustment">Adjustments</Option>
            <Option value="return">Returns</Option>
          </Dropdown>
          <Dropdown placeholder="All Locations">
            <Option value="all">All Locations</Option>
            <Option value="dhaka">Dhaka Warehouse</Option>
            <Option value="chittagong">Chittagong Warehouse</Option>
            <Option value="sylhet">Sylhet Warehouse</Option>
          </Dropdown>
          <Input type="date" placeholder="From Date" />
          <Input type="date" placeholder="To Date" />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Date & Time</TableHeaderCell>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>SKU</TableHeaderCell>
              <TableHeaderCell>Movement Type</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Reference</TableHeaderCell>
              <TableHeaderCell>User</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOVEMENTS.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell>
                  <Text size={300}>{formatDate(movement.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{movement.product}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{movement.sku}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={
                      movement.type === 'Sale' ? 'danger' :
                      movement.type === 'Purchase' ? 'success' :
                      movement.type === 'Transfer' ? 'brand' :
                      'warning'
                    }
                  >
                    {movement.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text
                    weight="bold"
                    style={{
                      color: movement.quantity > 0 ? tokens.colorPaletteGreenForeground1 : tokens.colorPaletteRedForeground1,
                    }}
                  >
                    {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{movement.location}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300} weight="semibold">
                    {movement.reference}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{movement.user}</Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
