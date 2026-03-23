/**
 * Reports - Inventory Report Page
 * Stock valuation and inventory analytics
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
  Dropdown,
  Option,
  Badge,
} from '@fluentui/react-components';
import {
  ArrowDownload20Regular,
  Box20Regular,
  ChartMultiple20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatNumber } from '@/shared/utils/formatters';

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
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  metricCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    ...shorthands.borderBottom('2px', 'solid', tokens.colorNeutralStroke2),
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalM,
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    alignItems: 'center',
  },
});

const MOCK_INVENTORY_DATA = [
  {
    product: 'Industrial Drill Machine DX-500',
    category: 'Power Tools',
    quantity: 145,
    avgCost: 3800,
    totalValue: 551000,
    status: 'Healthy',
  },
  {
    product: 'Circuit Breaker 220V 50A',
    category: 'Electrical',
    quantity: 320,
    avgCost: 650,
    totalValue: 208000,
    status: 'Healthy',
  },
  {
    product: 'Safety Helmet Industrial Grade',
    category: 'Safety',
    quantity: 45,
    avgCost: 420,
    totalValue: 18900,
    status: 'Low',
  },
  {
    product: 'Wire Cable 2.5mm 100m',
    category: 'Electrical',
    quantity: 8,
    avgCost: 1150,
    totalValue: 9200,
    status: 'Critical',
  },
  {
    product: 'LED Bulb 15W E27',
    category: 'Lighting',
    quantity: 0,
    avgCost: 165,
    totalValue: 0,
    status: 'Out of Stock',
  },
];

export const InventoryReport = () => {
  const classes = useStyles();

  const totalValue = MOCK_INVENTORY_DATA.reduce((sum, item) => sum + item.totalValue, 0);
  const totalItems = MOCK_INVENTORY_DATA.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = MOCK_INVENTORY_DATA.filter((item) => item.status === 'Low' || item.status === 'Critical').length;
  const outOfStockItems = MOCK_INVENTORY_DATA.filter((item) => item.status === 'Out of Stock').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return tokens.colorPaletteGreenForeground1;
      case 'Low':
        return tokens.colorPaletteYellowForeground1;
      case 'Critical':
        return tokens.colorPaletteDarkOrangeForeground1;
      case 'Out of Stock':
        return tokens.colorPaletteRedForeground1;
      default:
        return tokens.colorNeutralForeground3;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Inventory Report</Title3>
          <Text>Stock valuation and inventory analytics</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export PDF
          </Button>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export Excel
          </Button>
        </div>
      </div>

      <Card className={classes.toolbar}>
        <Dropdown placeholder="All Warehouses" defaultValue="all">
          <Option value="all">All Warehouses</Option>
          <Option value="dhaka">Dhaka Warehouse</Option>
          <Option value="chittagong">Chittagong Warehouse</Option>
        </Dropdown>
        <Dropdown placeholder="All Categories">
          <Option value="all">All Categories</Option>
          <Option value="power">Power Tools</Option>
          <Option value="electrical">Electrical</Option>
          <Option value="safety">Safety Equipment</Option>
        </Dropdown>
        <Dropdown placeholder="All Status">
          <Option value="all">All Status</Option>
          <Option value="healthy">Healthy</Option>
          <Option value="low">Low Stock</Option>
          <Option value="out">Out of Stock</Option>
        </Dropdown>
      </Card>

      <div className={classes.metricsGrid}>
        <Card className={classes.metricCard}>
          <Box20Regular
            style={{
              fontSize: '32px',
              color: tokens.colorBrandForeground1,
              marginBottom: tokens.spacingVerticalS,
            }}
          />
          <Text size={200} block>
            Total Inventory Value
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalValue)}
          </Text>
        </Card>

        <Card className={classes.metricCard}>
          <ChartMultiple20Regular
            style={{
              fontSize: '32px',
              color: tokens.colorPaletteGreenForeground1,
              marginBottom: tokens.spacingVerticalS,
            }}
          />
          <Text size={200} block>
            Total Items
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatNumber(totalItems, 0)}
          </Text>
        </Card>

        <Card className={classes.metricCard}>
          <Box20Regular
            style={{
              fontSize: '32px',
              color: tokens.colorPaletteYellowForeground1,
              marginBottom: tokens.spacingVerticalS,
            }}
          />
          <Text size={200} block>
            Low Stock Items
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {lowStockItems}
          </Text>
        </Card>

        <Card className={classes.metricCard}>
          <Box20Regular
            style={{
              fontSize: '32px',
              color: tokens.colorPaletteRedForeground1,
              marginBottom: tokens.spacingVerticalS,
            }}
          />
          <Text size={200} block>
            Out of Stock
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {outOfStockItems}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Inventory Details</Title3>
        <div className={classes.table}>
          <div className={classes.tableHeader}>
            <div>Product</div>
            <div>Category</div>
            <div>Quantity</div>
            <div>Avg Cost</div>
            <div>Total Value</div>
            <div>Status</div>
          </div>
          {MOCK_INVENTORY_DATA.map((item, index) => (
            <div key={index} className={classes.tableRow}>
              <div>
                <Text weight="semibold" block>
                  {item.product}
                </Text>
              </div>
              <Text size={300}>{item.category}</Text>
              <Text weight="semibold">{formatNumber(item.quantity, 0)}</Text>
              <Text>{formatCurrency(item.avgCost)}</Text>
              <Text weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                {formatCurrency(item.totalValue)}
              </Text>
              <Badge
                appearance="tint"
                style={{
                  backgroundColor: getStatusColor(item.status) + '20',
                  color: getStatusColor(item.status),
                }}
              >
                {item.status}
              </Badge>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
        >
          <Text size={400} weight="bold">
            Total Inventory Value
          </Text>
          <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalValue)}
          </Text>
        </div>
      </Card>
    </div>
  );
};
