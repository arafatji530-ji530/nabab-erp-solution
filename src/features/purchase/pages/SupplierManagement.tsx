/**
 * Purchase - Supplier Management
 * EXPERT: Senior React Engineer (Vendor Relationship Management)
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
  Avatar,
  Input,
  Dropdown,
  Option,
  Rating,
} from '@fluentui/react-components';
import { Add20Regular, Mail20Regular, Call20Regular, DocumentText20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
  },
});

const SUPPLIERS = [
  {
    id: '1',
    name: 'Global Electronics Ltd',
    contact: 'Mr. Rahman',
    email: 'info@globalelectronics.com',
    phone: '+880-1234-567890',
    category: 'Electronics',
    totalPurchases: 2500000,
    outstandingBalance: 450000,
    rating: 4.5,
    status: 'Active',
    paymentTerms: 'Net 30',
  },
  {
    id: '2',
    name: 'Tech Supply Co',
    contact: 'Ms. Fatima',
    email: 'sales@techsupply.com',
    phone: '+880-1234-567891',
    category: 'Technology',
    totalPurchases: 1800000,
    outstandingBalance: 0,
    rating: 4.8,
    status: 'Active',
    paymentTerms: 'Net 45',
  },
  {
    id: '3',
    name: 'Industrial Parts Inc',
    contact: 'Mr. Karim',
    email: 'contact@industrialparts.com',
    phone: '+880-1234-567892',
    category: 'Industrial',
    totalPurchases: 3200000,
    outstandingBalance: 850000,
    rating: 4.2,
    status: 'Active',
    paymentTerms: 'Net 60',
  },
  {
    id: '4',
    name: 'Office Essentials',
    contact: 'Ms. Nusrat',
    email: 'info@officeessentials.com',
    phone: '+880-1234-567893',
    category: 'Office Supplies',
    totalPurchases: 450000,
    outstandingBalance: 0,
    rating: 4.0,
    status: 'Inactive',
    paymentTerms: 'Net 15',
  },
];

export const SupplierManagement = () => {
  const classes = useStyles();

  const totalSuppliers = SUPPLIERS.length;
  const activeSuppliers = SUPPLIERS.filter((s) => s.status === 'Active').length;
  const totalPurchases = SUPPLIERS.reduce((sum, s) => sum + s.totalPurchases, 0);
  const totalOutstanding = SUPPLIERS.reduce((sum, s) => sum + s.outstandingBalance, 0);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Supplier Management</Title3>
          <Text>Manage vendor relationships and procurement</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Supplier
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Suppliers
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalSuppliers}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            {activeSuppliers} active
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Purchases
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalPurchases)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Outstanding Balance
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(totalOutstanding)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Avg Rating
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {(SUPPLIERS.reduce((sum, s) => sum + s.rating, 0) / SUPPLIERS.length).toFixed(1)}
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            out of 5.0
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Input placeholder="Search suppliers..." style={{ flexGrow: 1, maxWidth: '400px' }} />
          <Dropdown placeholder="All Categories">
            <Option value="all">All Categories</Option>
            <Option value="electronics">Electronics</Option>
            <Option value="tech">Technology</Option>
            <Option value="industrial">Industrial</Option>
            <Option value="office">Office Supplies</Option>
          </Dropdown>
          <Dropdown placeholder="All Status">
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="inactive">Inactive</Option>
          </Dropdown>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Contact</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Total Purchases</TableHeaderCell>
              <TableHeaderCell>Outstanding</TableHeaderCell>
              <TableHeaderCell>Payment Terms</TableHeaderCell>
              <TableHeaderCell>Rating</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUPPLIERS.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <Avatar name={supplier.name} size={32} />
                    <div>
                      <Text weight="semibold" block>
                        {supplier.name}
                      </Text>
                      <Text size={200}>{supplier.email}</Text>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Text block size={300}>
                      {supplier.contact}
                    </Text>
                    <Text size={200}>{supplier.phone}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{supplier.category}</Badge>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(supplier.totalPurchases)}</Text>
                </TableCell>
                <TableCell>
                  <Text
                    weight="semibold"
                    style={{
                      color:
                        supplier.outstandingBalance > 0
                          ? tokens.colorPaletteRedForeground1
                          : tokens.colorPaletteGreenForeground1,
                    }}
                  >
                    {formatCurrency(supplier.outstandingBalance)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="informative">
                    {supplier.paymentTerms}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <Rating value={supplier.rating} max={5} size="small" />
                    <Text size={200}>{supplier.rating.toFixed(1)}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={supplier.status === 'Active' ? 'success' : 'subtle'}>
                    {supplier.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<Mail20Regular />} />
                    <Button appearance="subtle" size="small" icon={<Call20Regular />} />
                    <Button appearance="subtle" size="small" icon={<DocumentText20Regular />}>
                      Details
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
