/**
 * Sales - Sales Returns & Refunds
 * EXPERT: Enterprise Solution Architect (Reverse Logistics)
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
  Input,
  Label,
  Dropdown,
  Option,
  Textarea,
  Badge,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';
import {
  Add20Regular,
  ArrowUndo20Regular,
  Money20Regular,
  DocumentCheckmark20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  itemsTable: {
    ...shorthands.padding(tokens.spacingVerticalL),
    marginTop: tokens.spacingVerticalL,
  },
});

const RETURN_ITEMS = [
  { id: '1', product: 'Industrial Drill DX-500', qty: 2, unitPrice: 4500, total: 9000, reason: 'Defective' },
  { id: '2', product: 'Safety Helmet', qty: 5, unitPrice: 450, total: 2250, reason: 'Wrong Item' },
];

export const SalesReturns = () => {
  const classes = useStyles();
  const [refundMethod, setRefundMethod] = useState('original');

  const totalRefund = RETURN_ITEMS.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Sales Returns & Refunds</Title3>
          <Text>Process customer returns and issue refunds</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Return
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalXL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Return Request Form</Title3>

        <div className={classes.formGrid}>
          <div className={classes.formGroup}>
            <Label required>Customer</Label>
            <Dropdown placeholder="Select customer">
              <Option value="1">ABC Industries Ltd</Option>
              <Option value="2">XYZ Electronics</Option>
              <Option value="3">Tech Solutions</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Original Invoice</Label>
            <Dropdown placeholder="Select invoice">
              <Option value="1">INV-2026-001</Option>
              <Option value="2">INV-2026-002</Option>
              <Option value="3">INV-2026-003</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Return Date</Label>
            <Input type="date" />
          </div>

          <div className={classes.formGroup}>
            <Label required>Return Type</Label>
            <Dropdown defaultValue="full">
              <Option value="full">Full Return</Option>
              <Option value="partial">Partial Return</Option>
              <Option value="exchange">Exchange</Option>
            </Dropdown>
          </div>
        </div>

        <div className={classes.formGroup} style={{ marginTop: tokens.spacingVerticalL }}>
          <Label required>Return Reason</Label>
          <Textarea rows={3} placeholder="Detailed reason for return..." />
        </div>

        <Card className={classes.itemsTable}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Returned Items</Title3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Product</TableHeaderCell>
                <TableHeaderCell>Quantity</TableHeaderCell>
                <TableHeaderCell>Unit Price</TableHeaderCell>
                <TableHeaderCell>Total</TableHeaderCell>
                <TableHeaderCell>Reason</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RETURN_ITEMS.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Text weight="semibold">{item.product}</Text>
                  </TableCell>
                  <TableCell>
                    <Input type="number" defaultValue={item.qty.toString()} size="small" style={{ width: '80px' }} />
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(item.unitPrice)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(item.total)}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={item.reason === 'Defective' ? 'danger' : 'warning'}>
                      {item.reason}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
          >
            <Text size={400} weight="bold">
              Total Refund Amount
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
              {formatCurrency(totalRefund)}
            </Text>
          </div>
        </Card>

        <div className={classes.formGrid} style={{ marginTop: tokens.spacingVerticalL }}>
          <div className={classes.formGroup}>
            <Label required>Refund Method</Label>
            <Dropdown value={refundMethod} onOptionSelect={(_, data) => setRefundMethod(data.optionValue as string)}>
              <Option value="original">Original Payment Method</Option>
              <Option value="credit">Store Credit</Option>
              <Option value="bank">Bank Transfer</Option>
              <Option value="cash">Cash</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Restocking Fee (%)</Label>
            <Input type="number" defaultValue="0" />
          </div>

          <div className={classes.formGroup}>
            <Label>Quality Check Status</Label>
            <Dropdown defaultValue="pending">
              <Option value="pending">Pending Inspection</Option>
              <Option value="passed">Passed</Option>
              <Option value="failed">Failed</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Warehouse Return Location</Label>
            <Dropdown placeholder="Select warehouse">
              <Option value="wh-1">Dhaka Warehouse</Option>
              <Option value="wh-2">Chittagong Warehouse</Option>
            </Dropdown>
          </div>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL }}>
          <Button appearance="secondary">Save as Draft</Button>
          <Button appearance="primary" icon={<ArrowUndo20Regular />}>
            Process Return
          </Button>
          <Button appearance="primary" icon={<Money20Regular />}>
            Issue Refund
          </Button>
        </div>
      </Card>
    </div>
  );
};
