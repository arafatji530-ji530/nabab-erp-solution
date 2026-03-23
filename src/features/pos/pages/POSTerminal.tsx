/**
 * POS - Terminal Page
 * Enterprise-grade Point of Sale terminal with real-time cart
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Card,
  Title3,
  Text,
  Divider,
  Badge,
} from '@fluentui/react-components';
import {
  ShoppingBag20Regular,
  Delete20Regular,
  Payment20Regular,
  Person20Regular,
  ScanDash20Regular,
} from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
    height: 'calc(100vh - 200px)',
  },
  productsSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  searchBar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.overflow('auto'),
  },
  productCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
    cursor: 'pointer',
    textAlign: 'center',
    ...shorthands.transition('all', '150ms'),
    height: '140px',
    
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2,
      transform: 'scale(1.02)',
    },
  },
  cartSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding(tokens.spacingVerticalL),
    height: '100%',
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItems: {
    flex: 1,
    ...shorthands.overflow('auto'),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  cartSummary: {
    ...shorthands.padding(tokens.spacingVerticalM, '0'),
    ...shorthands.borderTop('2px', 'solid', tokens.colorNeutralStroke2),
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
  },
  paymentButton: {
    width: '100%',
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    height: '48px',
  },
});

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const MOCK_PRODUCTS = [
  { id: '1', name: 'Drill Machine', price: 4500 },
  { id: '2', name: 'Circuit Breaker', price: 850 },
  { id: '3', name: 'Safety Helmet', price: 450 },
  { id: '4', name: 'Wire 100m', price: 1200 },
  { id: '5', name: 'LED Bulb 15W', price: 180 },
  { id: '6', name: 'Power Cable', price: 320 },
];

export const POSTerminal = () => {
  const classes = useStyles();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [barcode, setBarcode] = useState('');

  const addToCart = (product: typeof MOCK_PRODUCTS[0]) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;

  return (
    <div className={classes.container}>
      <div className={classes.productsSection}>
        <div className={classes.searchBar}>
          <Input
            placeholder="Scan or enter barcode..."
            contentBefore={<ScanDash20Regular />}
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button appearance="secondary" icon={<Person20Regular />}>
            Customer
          </Button>
        </div>

        <div className={classes.productGrid}>
          {MOCK_PRODUCTS.map((product) => (
            <Card key={product.id} className={classes.productCard} onClick={() => addToCart(product)}>
              <ShoppingBag20Regular style={{ fontSize: '32px', marginBottom: tokens.spacingVerticalS }} />
              <Text size={300} weight="semibold" block truncate>
                {product.name}
              </Text>
              <Text size={400} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
                {formatCurrency(product.price)}
              </Text>
            </Card>
          ))}
        </div>
      </div>

      <Card className={classes.cartSection}>
        <div className={classes.cartHeader}>
          <Title3>Cart</Title3>
          <Badge appearance="filled" color="brand">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items
          </Badge>
        </div>

        <Divider />

        <div className={classes.cartItems}>
          {cart.length === 0 ? (
            <Text style={{ textAlign: 'center', color: tokens.colorNeutralForeground3 }}>
              Cart is empty
            </Text>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={classes.cartItem}>
                <div style={{ flex: 1 }}>
                  <Text weight="semibold" block>
                    {item.name}
                  </Text>
                  <Text size={200}>
                    {formatCurrency(item.price)} × {item.quantity}
                  </Text>
                </div>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, alignItems: 'center' }}>
                  <Button size="small" onClick={() => updateQuantity(item.id, -1)}>
                    -
                  </Button>
                  <Text weight="bold">{item.quantity}</Text>
                  <Button size="small" onClick={() => updateQuantity(item.id, 1)}>
                    +
                  </Button>
                  <Button
                    appearance="subtle"
                    icon={<Delete20Regular />}
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
                <Text weight="bold" style={{ minWidth: '80px', textAlign: 'right' }}>
                  {formatCurrency(item.price * item.quantity)}
                </Text>
              </div>
            ))
          )}
        </div>

        <div className={classes.cartSummary}>
          <div className={classes.totalRow}>
            <Text>Subtotal</Text>
            <Text>{formatCurrency(subtotal)}</Text>
          </div>
          <div className={classes.totalRow}>
            <Text>Tax (15%)</Text>
            <Text>{formatCurrency(tax)}</Text>
          </div>
          <Divider style={{ margin: `${tokens.spacingVerticalS} 0` }} />
          <div className={classes.totalRow}>
            <Title3>Total</Title3>
            <Title3>{formatCurrency(total)}</Title3>
          </div>
        </div>

        <Button
          appearance="primary"
          className={classes.paymentButton}
          icon={<Payment20Regular />}
          disabled={cart.length === 0}
        >
          Process Payment
        </Button>
      </Card>
    </div>
  );
};
