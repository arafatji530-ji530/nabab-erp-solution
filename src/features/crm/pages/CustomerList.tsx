/**
 * CRM - Customer List Page
 * Customer relationship management with 360° view
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
  Avatar,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  Mail20Regular,
  Phone20Regular,
  Location20Regular,
} from '@fluentui/react-icons';
import { apiService } from '@/services/api';
import { formatCurrency } from '@/shared/utils/formatters';
import { useDebounce } from '@/shared/hooks';
import type { Customer, PaginatedResponse } from '@/types/domain';

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
  customerCard: {
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
  customerInfo: {
    flex: 1,
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
  stats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalM,
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const CustomerList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<PaginatedResponse<Customer> | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    fetchCustomers();
  }, [debouncedSearch]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await apiService.customers.list({
        page: 1,
        pageSize: 12,
        search: debouncedSearch,
      });
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'B2B': return 'brand';
      case 'Wholesale': return 'success';
      default: return 'informative';
    }
  };

  if (loading && !customers) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalXXXL }}>
        <Spinner size="large" label="Loading customers..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Customers</Title3>
          <Text>Manage customer relationships and profiles</Text>
        </div>
        <Button
          appearance="primary"
          icon={<Add20Regular />}
          onClick={() => navigate('/customers/create')}
        >
          Add Customer
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search customers..."
          contentBefore={<Search20Regular />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button appearance="secondary">Filter</Button>
        <Button appearance="secondary">Export</Button>
      </Card>

      <div className={classes.grid}>
        {customers?.data.map((customer) => (
          <Card
            key={customer.id}
            className={classes.customerCard}
            onClick={() => navigate(`/customers/${customer.id}`)}
          >
            <div className={classes.cardHeader}>
              <Avatar
                name={customer.name}
                size={48}
                color="brand"
              />
              <div className={classes.customerInfo}>
                <Text weight="semibold" size={400} block>
                  {customer.name}
                </Text>
                <Text size={200}>{customer.code}</Text>
                <Badge appearance="tint" color={getTypeColor(customer.customerType)} style={{ marginTop: tokens.spacingVerticalXS }}>
                  {customer.customerType}
                </Badge>
              </div>
            </div>

            <div className={classes.contactInfo}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                <Mail20Regular />
                <Text size={300} truncate>{customer.email || 'No email'}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                <Phone20Regular />
                <Text size={300}>{customer.phone}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                <Location20Regular />
                <Text size={300} truncate>{customer.district || 'No location'}</Text>
              </div>
            </div>

            <div className={classes.stats}>
              <div className={classes.statItem}>
                <Text size={200}>Loyalty Points</Text>
                <Text weight="semibold" size={400}>{customer.loyaltyPoints.toLocaleString()}</Text>
              </div>
              <div className={classes.statItem}>
                <Text size={200}>Status</Text>
                <Badge appearance="filled" color={customer.isActive ? 'success' : 'danger'}>
                  {customer.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
