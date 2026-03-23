/**
 * POS - Customer Display Interface
 * EXPERT: UI/UX Designer (Customer-Facing Display)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Title1,
  Title2,
  Title3,
  Text,
  Card,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';
import { ShoppingBag20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXXL),
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding(tokens.spacingVerticalXXL),
  },
  header: {
    textAlign: 'center',
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  },
  totalCard: {
    ...shorthands.padding(tokens.spacingVerticalXXL),
    textAlign: 'center',
    backgroundColor: tokens.colorBrandBackground2,
  },
});

const CART_ITEMS = [
  { id: '1', name: 'iPhone 15 Pro', quantity: 1, price: 125000 },
  { id: '2', name: 'AirPods Pro', quantity: 2, price: 28000 },
  { id: '3', name: 'Apple Watch', quantity: 1, price: 42000 },
];

export const CustomerDisplay = () => {
  const classes = useStyles();

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Title1 style={{ color: tokens.colorNeutralForegroundInverted }}>Welcome!</Title1>
        <Text size={500} style={{ color: tokens.colorNeutralForegroundInverted }}>
          Thank you for shopping with us
        </Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <ShoppingBag20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          <Title2>Your Items</Title2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>
                <Text size={500} weight="bold">
                  Item
                </Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text size={500} weight="bold">
                  Qty
                </Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text size={500} weight="bold">
                  Price
                </Text>
              </TableHeaderCell>
              <TableHeaderCell>
                <Text size={500} weight="bold">
                  Total
                </Text>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CART_ITEMS.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Text size={400}>{item.name}</Text>
                </TableCell>
                <TableCell>
                  <Text size={400}>{item.quantity}</Text>
                </TableCell>
                <TableCell>
                  <Text size={400}>{formatCurrency(item.price)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={400} weight="semibold">
                    {formatCurrency(item.quantity * item.price)}
                  </Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className={classes.totalCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalM }}>
          <Text size={500}>Subtotal:</Text>
          <Text size={500} weight="semibold">
            {formatCurrency(subtotal)}
          </Text>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
          <Text size={500}>Tax (5%):</Text>
          <Text size={500} weight="semibold">
            {formatCurrency(tax)}
          </Text>
        </div>
        <div style={{ ...shorthands.borderTop('2px', 'solid', tokens.colorNeutralStroke1), paddingTop: tokens.spacingVerticalL } as React.CSSProperties}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title1>TOTAL:</Title1>
            <Title1 style={{ color: tokens.colorBrandForeground1 }}>{formatCurrency(total)}</Title1>
          </div>
        </div>
      </Card>
    </div>
  );
};
