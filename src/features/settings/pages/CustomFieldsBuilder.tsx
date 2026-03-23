/**
 * Settings - Custom Fields Builder
 * EXPERT: Enterprise Solution Architect (Data Model Customization)
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
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { Add20Regular, Edit20Regular, Delete20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const CUSTOM_FIELDS = [
  { id: '1', name: 'Customer Loyalty Tier', entity: 'Customer', type: 'Dropdown', values: 'Bronze,Silver,Gold,Platinum', required: false },
  { id: '2', name: 'Product Warranty Period', entity: 'Product', type: 'Number', values: 'Months', required: true },
  { id: '3', name: 'Supplier Credit Rating', entity: 'Supplier', type: 'Text', values: 'A+, A, B+, B, C', required: false },
  { id: '4', name: 'Employee Department Code', entity: 'Employee', type: 'Text', values: 'Max 10 chars', required: true },
  { id: '5', name: 'Order Delivery Instructions', entity: 'Order', type: 'Textarea', values: 'Max 500 chars', required: false },
];

export const CustomFieldsBuilder = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Custom Fields Builder</Title3>
          <Text>Extend system entities with custom fields</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Custom Field
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div style={{ marginBottom: tokens.spacingVerticalL }}>
          <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
            Select Entity to Customize
          </Text>
          <Dropdown placeholder="Select entity" defaultValue="All Entities">
            <Option>All Entities</Option>
            <Option>Customer</Option>
            <Option>Product</Option>
            <Option>Supplier</Option>
            <Option>Employee</Option>
            <Option>Order</Option>
            <Option>Invoice</Option>
            <Option>Purchase Order</Option>
          </Dropdown>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Field Name</TableHeaderCell>
              <TableHeaderCell>Entity</TableHeaderCell>
              <TableHeaderCell>Field Type</TableHeaderCell>
              <TableHeaderCell>Values/Options</TableHeaderCell>
              <TableHeaderCell>Required</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CUSTOM_FIELDS.map((field) => (
              <TableRow key={field.id}>
                <TableCell>
                  <Text weight="semibold">{field.name}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="brand">
                    {field.entity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{field.type}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{field.values}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={field.required ? 'danger' : 'subtle'}>
                    {field.required ? 'Yes' : 'No'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<Edit20Regular />}>
                      Edit
                    </Button>
                    <Button appearance="subtle" size="small" icon={<Delete20Regular />}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Field Type Reference</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Text Types
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• Text (single line)</Text>
              <Text size={300}>• Textarea (multi-line)</Text>
              <Text size={300}>• Email</Text>
              <Text size={300}>• URL</Text>
              <Text size={300}>• Phone</Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Numeric Types
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• Number</Text>
              <Text size={300}>• Currency</Text>
              <Text size={300}>• Percentage</Text>
              <Text size={300}>• Decimal</Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Selection Types
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• Dropdown</Text>
              <Text size={300}>• Radio</Text>
              <Text size={300}>• Checkbox</Text>
              <Text size={300}>• Date</Text>
              <Text size={300}>• Boolean (Yes/No)</Text>
            </div>
          </div>
        </div>
      </Card>

      <Card
        style={{
          ...shorthands.padding(tokens.spacingVerticalM),
          backgroundColor: tokens.colorNeutralBackground3,
        } as React.CSSProperties}
      >
        <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
          💡 <strong>Tip:</strong> Custom fields are automatically added to forms, reports, and API responses for the selected entity.
        </Text>
      </Card>
    </div>
  );
};
