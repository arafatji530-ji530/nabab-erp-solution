/**
 * Warehouses - Warehouse Management Page
 * Manage warehouse locations and configurations
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
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  Location20Regular,
  Box20Regular,
  People20Regular,
} from '@fluentui/react-icons';
import { apiService } from '@/services/api';
import type { Warehouse } from '@/types/domain';

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  warehouseCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    cursor: 'pointer',
    ...shorthands.transition('all', '150ms'),
    
    ':hover': {
      boxShadow: tokens.shadow8,
      transform: 'translateY(-2px)',
    },
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacingVerticalM,
  },
  iconCircle: {
    width: '48px',
    height: '48px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: tokens.colorBrandBackground2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalL),
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    marginTop: tokens.spacingVerticalM,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
  addressRow: {
    display: 'flex',
    alignItems: 'flex-start',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginTop: tokens.spacingVerticalM,
  },
});

export const WarehouseList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    setLoading(true);
    try {
      const data = await apiService.warehouses.list();
      setWarehouses(data);
    } catch (error) {
      console.error('Failed to fetch warehouses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalXXXL }}>
        <Spinner size="large" label="Loading warehouses..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Warehouses</Title3>
          <Text>Manage warehouse locations and inventory</Text>
        </div>
        <Button
          appearance="primary"
          icon={<Add20Regular />}
          onClick={() => navigate('/warehouses/create')}
        >
          Add Warehouse
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search warehouses..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button appearance="secondary">Filter</Button>
      </Card>

      <div className={classes.grid}>
        {warehouses.map((warehouse) => (
          <Card
            key={warehouse.id}
            className={classes.warehouseCard}
            onClick={() => navigate(`/warehouses/${warehouse.id}`)}
          >
            <div className={classes.cardHeader}>
              <div>
                <Text weight="semibold" size={400} block>
                  {warehouse.name}
                </Text>
                <Text size={200}>{warehouse.code}</Text>
              </div>
              <div className={classes.iconCircle}>
                <Location20Regular style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />
              </div>
            </div>

            <Badge appearance="filled" color={warehouse.isActive ? 'success' : 'danger'}>
              {warehouse.isActive ? 'Active' : 'Inactive'}
            </Badge>

            <div className={classes.addressRow}>
              <Location20Regular style={{ fontSize: '16px', marginTop: '2px' }} />
              <Text size={300}>
                {warehouse.address}, {warehouse.city}, {warehouse.district}
              </Text>
            </div>

            <div className={classes.statsRow}>
              <div className={classes.statItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                  <Box20Regular style={{ fontSize: '16px' }} />
                  <Text size={200}>Capacity</Text>
                </div>
                <Text weight="semibold">
                  {/* Mock data - would come from actual capacity tracking */}
                  2,500 m²
                </Text>
              </div>
              <div className={classes.statItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                  <People20Regular style={{ fontSize: '16px' }} />
                  <Text size={200}>Staff</Text>
                </div>
                <Text weight="semibold">
                  {/* Mock data - would come from employee assignments */}
                  12
                </Text>
              </div>
            </div>

            {warehouse.managerName && (
              <div style={{ marginTop: tokens.spacingVerticalM }}>
                <Text size={200}>Manager</Text>
                <Text weight="semibold" block>
                  {warehouse.managerName}
                </Text>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
