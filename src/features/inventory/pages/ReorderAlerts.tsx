/**
 * Inventory - Reorder Alerts & Automated Procurement
 * EXPERT: Senior React Engineer (Real-time Notifications)
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
  Badge,
  Switch,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';
import {
  Alert20Regular,
  ShoppingBag20Regular,
  Settings20Regular,
  Checkmark20Regular,
} from '@fluentui/react-icons';
import { formatNumber, formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  alertsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  alertCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  criticalAlert: {
    ...shorthands.border('2px', 'solid', tokens.colorPaletteRedBorder1),
    backgroundColor: tokens.colorPaletteRedBackground1,
  },
  warningAlert: {
    ...shorthands.border('2px', 'solid', tokens.colorPaletteYellowBorder1),
    backgroundColor: tokens.colorPaletteYellowBackground1,
  },
  table: {
    width: '100%',
  },
});

const REORDER_ALERTS = [
  {
    id: '1',
    product: 'Industrial Drill DX-500',
    currentStock: 8,
    reorderLevel: 10,
    reorderQty: 50,
    supplier: 'Industrial Supply Co.',
    estimatedCost: 190000,
    leadTime: 7,
    priority: 'Critical',
  },
  {
    id: '2',
    product: 'Circuit Breaker 220V',
    currentStock: 45,
    reorderLevel: 50,
    reorderQty: 200,
    supplier: 'Electric Parts Ltd',
    estimatedCost: 130000,
    leadTime: 5,
    priority: 'High',
  },
  {
    id: '3',
    product: 'Safety Helmet Pro',
    currentStock: 12,
    reorderLevel: 15,
    reorderQty: 100,
    supplier: 'Safety Equipment Inc',
    estimatedCost: 42000,
    leadTime: 3,
    priority: 'Medium',
  },
];

export const ReorderAlerts = () => {
  const classes = useStyles();
  const [autoReorder, setAutoReorder] = useState(false);

  const criticalCount = REORDER_ALERTS.filter((a) => a.priority === 'Critical').length;
  const highCount = REORDER_ALERTS.filter((a) => a.priority === 'High').length;
  const totalCost = REORDER_ALERTS.reduce((sum, a) => sum + a.estimatedCost, 0);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Reorder Alerts & Auto-Procurement</Title3>
          <Text>Monitor stock levels and automate purchase orders</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalL }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
            <Text>Auto-Reorder</Text>
            <Switch checked={autoReorder} onChange={(_, data) => setAutoReorder(data.checked)} />
          </div>
          <Button appearance="secondary" icon={<Settings20Regular />}>
            Configure Rules
          </Button>
          <Button appearance="primary" icon={<ShoppingBag20Regular />}>
            Create PO for All
          </Button>
        </div>
      </div>

      <div className={classes.alertsGrid}>
        <Card className={`${classes.alertCard} ${classes.criticalAlert}`}>
          <Alert20Regular style={{ fontSize: '32px', color: tokens.colorPaletteRedForeground1 }} />
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1, marginTop: tokens.spacingVerticalS }}>
            {criticalCount}
          </Text>
          <Text size={300}>Critical Alerts</Text>
          <Text size={200} block>
            Stock below minimum level
          </Text>
        </Card>

        <Card className={`${classes.alertCard} ${classes.warningAlert}`}>
          <Alert20Regular style={{ fontSize: '32px', color: tokens.colorPaletteYellowForeground1 }} />
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1, marginTop: tokens.spacingVerticalS }}>
            {highCount}
          </Text>
          <Text size={300}>High Priority</Text>
          <Text size={200} block>
            Approaching reorder level
          </Text>
        </Card>

        <Card className={classes.alertCard} style={{ borderColor: tokens.colorBrandStroke1 }}>
          <ShoppingBag20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
<Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1, marginTop: tokens.spacingVerticalS }}>
            {formatCurrency(totalCost)}
          </Text>
          <Text size={300}>Estimated Cost</Text>
          <Text size={200} block>
            To replenish all items
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Active Reorder Alerts ({REORDER_ALERTS.length})</Title3>

        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Current Stock</TableHeaderCell>
              <TableHeaderCell>Reorder Level</TableHeaderCell>
              <TableHeaderCell>Reorder Qty</TableHeaderCell>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Est. Cost</TableHeaderCell>
              <TableHeaderCell>Lead Time</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {REORDER_ALERTS.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>
                  <Text weight="semibold">{alert.product}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="filled"
                    color={alert.currentStock < alert.reorderLevel ? 'danger' : 'warning'}
                  >
                    {formatNumber(alert.currentStock, 0)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text>{formatNumber(alert.reorderLevel, 0)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatNumber(alert.reorderQty, 0)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{alert.supplier}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(alert.estimatedCost)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{alert.leadTime} days</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={
                      alert.priority === 'Critical'
                        ? 'danger'
                        : alert.priority === 'High'
                        ? 'warning'
                        : 'informative'
                    }
                  >
                    {alert.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="primary" size="small" icon={<ShoppingBag20Regular />}>
                      Create PO
                    </Button>
                    <Button appearance="subtle" size="small" icon={<Checkmark20Regular />}>
                      Ignore
                    </Button>
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
