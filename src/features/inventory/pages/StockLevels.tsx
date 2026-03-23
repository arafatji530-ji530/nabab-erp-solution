/**
 * Inventory - Stock Levels Page
 * Enterprise-grade stock management with real-time updates
 */

import { useEffect, useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Title3,
  Text,
  Card,
  Spinner,
  Badge,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import {
  ArrowSync20Regular,
  Filter20Regular,
  ArrowDownload20Regular,
  Document20Regular,
} from '@fluentui/react-icons';
import { apiService } from '@/services/api';
import { formatNumber } from '@/shared/utils/formatters';
import type { StockLevel, Warehouse } from '@/types/domain';

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
    marginBottom: tokens.spacingVerticalM,
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
    ...shorthands.overflow('hidden'),
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    alignItems: 'center',
    ...shorthands.transition('background', '150ms'),
    
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },
  stockCell: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
  progressBar: {
    width: '100%',
    height: '4px',
    backgroundColor: tokens.colorNeutralBackground5,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.overflow('hidden'),
    marginTop: tokens.spacingVerticalXS,
  },
  progressFill: {
    height: '100%',
    ...shorthands.transition('width', '300ms'),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalXXL),
  },
});

export const StockLevels = () => {
  const classes = useStyles();
  const [stockLevels, setStockLevels] = useState<StockLevel[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');

  useEffect(() => {
    fetchData();
  }, [selectedWarehouse]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [stockData, warehousesData] = await Promise.all([
        apiService.inventory.getStockLevels({
          page: 1,
          pageSize: 100,
          warehouseId: selectedWarehouse === 'all' ? undefined : selectedWarehouse,
        }),
        apiService.warehouses.list(),
      ]);
      setStockLevels(stockData.data);
      setWarehouses(warehousesData);
    } catch (error) {
      console.error('Failed to fetch stock levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (available: number, total: number): { color: string; label: string } => {
    const percentage = (available / total) * 100;
    if (percentage === 0) return { color: tokens.colorPaletteRedForeground1, label: 'Out of Stock' };
    if (percentage < 20) return { color: tokens.colorPaletteRedForeground1, label: 'Critical' };
    if (percentage < 50) return { color: tokens.colorPaletteYellowForeground1, label: 'Low' };
    return { color: tokens.colorPaletteGreenForeground1, label: 'Healthy' };
  };

  if (loading) {
    return (
      <div className={classes.loading}>
        <Spinner size="large" label="Loading stock levels..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Stock Levels</Title3>
          <Text>Real-time inventory across all warehouses</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowSync20Regular />} onClick={fetchData}>
            Refresh
          </Button>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export
          </Button>
        </div>
      </div>

      <Card className={classes.toolbar}>
        <Input className={classes.searchBox} placeholder="Search products..." />
        <Dropdown
          placeholder="All Warehouses"
          value={selectedWarehouse}
          onOptionSelect={(_, data) => setSelectedWarehouse(data.optionValue as string)}
        >
          <Option value="all">All Warehouses</Option>
          {warehouses.map((wh) => (
            <Option key={wh.id} value={wh.id}>
              {wh.name}
            </Option>
          ))}
        </Dropdown>
        <Button appearance="subtle" icon={<Filter20Regular />}>
          Filters
        </Button>
      </Card>

      <Card className={classes.table}>
        <div className={classes.tableHeader}>
          <div>Product</div>
          <div>Warehouse</div>
          <div>Total</div>
          <div>Reserved</div>
          <div>Available</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {stockLevels.map((stock) => {
          const status = getStockStatus(stock.availableQuantity, stock.quantity);
          const percentage = (stock.availableQuantity / stock.quantity) * 100;

          return (
            <div key={stock.id} className={classes.tableRow}>
              <div className={classes.stockCell}>
                <Text weight="semibold">Product #{stock.productId.slice(0, 8)}</Text>
                <div className={classes.progressBar}>
                  <div
                    className={classes.progressFill}
                    style={{ width: `${percentage}%`, backgroundColor: status.color }}
                  />
                </div>
              </div>
              <Text size={300}>WH-{stock.warehouseId.slice(0, 6)}</Text>
              <Text weight="semibold">{formatNumber(stock.quantity, 0)}</Text>
              <Text size={300}>{formatNumber(stock.reservedQuantity, 0)}</Text>
              <Text weight="semibold" style={{ color: status.color }}>
                {formatNumber(stock.availableQuantity, 0)}
              </Text>
              <Badge appearance="tint" color={status.color as any}>
                {status.label}
              </Badge>
              <Button appearance="subtle" icon={<Document20Regular />} size="small">
                Details
              </Button>
            </div>
          );
        })}
      </Card>
    </div>
  );
};
