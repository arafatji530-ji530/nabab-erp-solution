/**
 * Purchase - Supplier Management Page
 * Manage supplier relationships and vendor information
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
  Avatar,
  Spinner,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  Mail20Regular,
  Phone20Regular,
  Location20Regular,
  Star20Filled,
} from '@fluentui/react-icons';
import { apiService } from '@/services/api';
import { formatCurrency } from '@/shared/utils/formatters';
import type { Supplier } from '@/types/domain';

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
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  supplierCard: {
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
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalM,
  },
  supplierInfo: {
    flex: 1,
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
    marginTop: tokens.spacingVerticalXS,
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    marginTop: tokens.spacingVerticalM,
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalM,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
});

export const SupplierList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = await apiService.suppliers.list({ page: 1, pageSize: 20 });
      setSuppliers(data.data);
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star20Filled
        key={i}
        style={{
          fontSize: '14px',
          color: i < rating ? tokens.colorPaletteYellowForeground1 : tokens.colorNeutralForeground4,
        }}
      />
    ));
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalXXXL }}>
        <Spinner size="large" label="Loading suppliers..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Suppliers</Title3>
          <Text>Manage supplier relationships and vendor information</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Supplier
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search suppliers..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button appearance="secondary">Filter by Category</Button>
        <Button appearance="secondary">Export</Button>
      </Card>

      <div className={classes.grid}>
        {suppliers.map((supplier) => (
          <Card
            key={supplier.id}
            className={classes.supplierCard}
            onClick={() => navigate(`/purchase/suppliers/${supplier.id}`)}
          >
            <div className={classes.cardHeader}>
              <Avatar name={supplier.name} size={48} color="brand" />
              <div className={classes.supplierInfo}>
                <Text weight="semibold" size={400} block>
                  {supplier.name}
                </Text>
                <Text size={200}>{supplier.code}</Text>
                <div className={classes.ratingContainer}>
                  {renderRating(supplier.rating || 4)}
                  <Text size={200}>({supplier.rating || 4}.0)</Text>
                </div>
              </div>
            </div>

            <Badge appearance="tint" color={supplier.isActive ? 'success' : 'danger'}>
              {supplier.isActive ? 'Active' : 'Inactive'}
            </Badge>

            <div className={classes.contactInfo}>
              <div className={classes.contactRow}>
                <Mail20Regular />
                <Text size={300} truncate>
                  {supplier.email || 'No email'}
                </Text>
              </div>
              <div className={classes.contactRow}>
                <Phone20Regular />
                <Text size={300}>{supplier.phone}</Text>
              </div>
              <div className={classes.contactRow}>
                <Location20Regular />
                <Text size={300} truncate>
                  {supplier.city}, {supplier.country}
                </Text>
              </div>
            </div>

            <div className={classes.statsRow}>
              <div className={classes.statItem}>
                <Text size={200}>Payment Terms</Text>
                <Text weight="semibold">{supplier.paymentTerms || 'Net 30'}</Text>
              </div>
              <div className={classes.statItem}>
                <Text size={200}>Total Orders</Text>
                <Text weight="semibold">{/* Mock data */}24</Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
