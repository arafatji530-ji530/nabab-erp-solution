/**
 * Products - Product Detail Page
 * Comprehensive product information with tabs
 */

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Title3,
  Text,
  Card,
  Badge,
  Spinner,
  Tab,
  TabList,
  Image,
  Divider,
} from '@fluentui/react-components';
import {
  Edit20Regular,
  Delete20Regular,
  ArrowLeft20Regular,
  Box20Regular,
  Tag20Regular,
  Info20Regular,
} from '@fluentui/react-icons';
import { apiService } from '@/services/api';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';
import type { Product } from '@/types/domain';

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
  backButton: {
    marginBottom: tokens.spacingVerticalM,
  },
  mainCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  productHeader: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    ...shorthands.gap(tokens.spacingHorizontalXL),
    marginBottom: tokens.spacingVerticalXL,
  },
  imageContainer: {
    width: '100%',
    height: '300px',
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL, tokens.spacingVerticalM),
    marginTop: tokens.spacingVerticalL,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
  tabContent: {
    ...shorthands.padding(tokens.spacingVerticalL, '0'),
    minHeight: '300px',
  },
  specGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL, tokens.spacingVerticalM),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
  },
});

export const ProductDetail = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  const fetchProduct = async (productId: string) => {
    setLoading(true);
    try {
      const data = await apiService.products.get(productId);
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={classes.loading}>
        <Spinner size="large" label="Loading product..." />
      </div>
    );
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <div className={classes.container}>
      <Button
        appearance="subtle"
        icon={<ArrowLeft20Regular />}
        onClick={() => navigate('/products')}
        className={classes.backButton}
      >
        Back to Products
      </Button>

      <div className={classes.header}>
        <Title3>Product Details</Title3>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<Edit20Regular />}>
            Edit
          </Button>
          <Button appearance="secondary" icon={<Delete20Regular />}>
            Delete
          </Button>
        </div>
      </div>

      <Card className={classes.mainCard}>
        <div className={classes.productHeader}>
          <div className={classes.imageContainer}>
            <Box20Regular style={{ fontSize: '64px', color: tokens.colorNeutralForeground3 }} />
          </div>

          <div className={classes.productInfo}>
            <div>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                {product.sku}
              </Text>
              <Title3 style={{ marginTop: tokens.spacingVerticalXS }}>{product.name}</Title3>
              <Badge
                appearance="tint"
                color={product.status === 'Active' ? 'success' : 'danger'}
                style={{ marginTop: tokens.spacingVerticalS }}
              >
                {product.status}
              </Badge>
            </div>

            <Divider />

            <div className={classes.infoGrid}>
              <div className={classes.infoItem}>
                <Text size={200}>Category</Text>
                <Text weight="semibold">{product.category}</Text>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>Brand</Text>
                <Text weight="semibold">{product.brand}</Text>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>Unit Price</Text>
                <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                  {formatCurrency(product.unitPrice || 0)}
                </Text>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>Purchase Price</Text>
                <Text weight="semibold">{formatCurrency(product.purchasePrice || 0)}</Text>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>Tax Rate</Text>
                <Text weight="semibold">{product.taxRate}%</Text>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>Barcode</Text>
                <Text weight="semibold">{product.barcode || 'N/A'}</Text>
              </div>
            </div>
          </div>
        </div>

        <Divider />

        <TabList
          selectedValue={selectedTab}
          onTabSelect={(_, data) => setSelectedTab(data.value as string)}
          style={{ marginTop: tokens.spacingVerticalL }}
        >
          <Tab value="overview" icon={<Info20Regular />}>
            Overview
          </Tab>
          <Tab value="specifications" icon={<Tag20Regular />}>
            Specifications
          </Tab>
          <Tab value="inventory" icon={<Box20Regular />}>
            Inventory
          </Tab>
        </TabList>

        <div className={classes.tabContent}>
          {selectedTab === 'overview' && (
            <div>
              <Text size={300} weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
                Description
              </Text>
              <Text>{product.description || 'No description available'}</Text>

              <div className={classes.infoGrid} style={{ marginTop: tokens.spacingVerticalXL }}>
                <div className={classes.infoItem}>
                  <Text size={200}>Created Date</Text>
                  <Text>{formatDate(product.createdAt)}</Text>
                </div>
                <div className={classes.infoItem}>
                  <Text size={200}>Last Updated</Text>
                  <Text>{formatDate(product.updatedAt)}</Text>
                </div>
                <div className={classes.infoItem}>
                  <Text size={200}>Reorder Level</Text>
                  <Text>{product.reorderLevel} units</Text>
                </div>
                <div className={classes.infoItem}>
                  <Text size={200}>Lead Time</Text>
                  <Text>{product.leadTimeDays} days</Text>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'specifications' && (
            <div className={classes.specGrid}>
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className={classes.infoItem}>
                  <Text size={200}>{key}</Text>
                  <Text weight="semibold">{String(value)}</Text>
                </div>
              ))}
              {(!product.specifications || Object.keys(product.specifications).length === 0) && (
                <Text style={{ gridColumn: '1 / -1', textAlign: 'center', color: tokens.colorNeutralForeground3 }}>
                  No specifications available
                </Text>
              )}
            </div>
          )}

          {selectedTab === 'inventory' && (
            <div className={classes.infoGrid}>
              <div className={classes.infoItem}>
                <Text size={200}>Stock Status</Text>
                <Badge appearance="filled" color="success">
                  In Stock
                </Badge>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>Available Quantity</Text>
                <Text size={400} weight="bold">
                  {/* This would come from inventory data */}
                  245 units
                </Text>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>Reserved</Text>
                <Text>15 units</Text>
              </div>
              <div className={classes.infoItem}>
                <Text size={200}>On Order</Text>
                <Text>50 units</Text>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
