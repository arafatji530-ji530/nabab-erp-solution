/**
 * Products - Product Bundles
 * EXPERT: Senior React Engineer (Bundle Management)
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
} from '@fluentui/react-components';
import { Add20Regular, BoxMultiple20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const BUNDLES = [
  { id: '1', name: 'iPhone Starter Pack', items: 3, individualPrice: 160000, bundlePrice: 145000, savings: 15000, status: 'Active' },
  { id: '2', name: 'Gaming Setup Bundle', items: 4, individualPrice: 185000, bundlePrice: 165000, savings: 20000, status: 'Active' },
  { id: '3', name: 'Home Office Kit', items: 5, individualPrice: 95000, bundlePrice: 85000, savings: 10000, status: 'Inactive' },
];

export const ProductBundles = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Product Bundles & Kits</Title3>
          <Text>Create product bundles with special pricing</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Bundle
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Bundle Name</TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
              <TableHeaderCell>Individual Price</TableHeaderCell>
              <TableHeaderCell>Bundle Price</TableHeaderCell>
              <TableHeaderCell>Savings</TableHeaderCell>
              <TableHeaderCell>Discount %</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BUNDLES.map((bundle) => {
              const discountPercent = ((bundle.savings / bundle.individualPrice) * 100).toFixed(1);
              return (
                <TableRow key={bundle.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <BoxMultiple20Regular />
                      <Text weight="semibold">{bundle.name}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{bundle.items} products</Badge>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(bundle.individualPrice)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(bundle.bundlePrice)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(bundle.savings)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{discountPercent}%</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={bundle.status === 'Active' ? 'success' : 'subtle'}>
                      {bundle.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
