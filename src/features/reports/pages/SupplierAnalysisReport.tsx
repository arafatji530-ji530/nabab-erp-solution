/**
 * Reports - Supplier Analysis Report
 * EXPERT: UI/UX Designer (Vendor Intelligence)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
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
  ProgressBar,
} from '@fluentui/react-components';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const SUPPLIERS = [
  {
    id: '1',
    name: 'Office Supplies Ltd',
    totalOrders: 38,
    totalSpend: 1850000,
    avgOrderValue: 48684,
    onTimeDelivery: 95.5,
    qualityRating: 4.7,
    paymentTerms: 'Net 30',
  },
  {
    id: '2',
    name: 'Tech Hardware Inc',
    totalOrders: 22,
    totalSpend: 3200000,
    avgOrderValue: 145454,
    onTimeDelivery: 88.2,
    qualityRating: 4.3,
    paymentTerms: 'Net 45',
  },
  {
    id: '3',
    name: 'Raw Materials Co',
    totalOrders: 52,
    totalSpend: 2600000,
    avgOrderValue: 50000,
    onTimeDelivery: 92.0,
    qualityRating: 4.5,
    paymentTerms: 'Net 30',
  },
];

export const SupplierAnalysisReport = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Supplier Analysis Report</Title3>
        <Text>Analyze supplier performance, reliability, and cost efficiency</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Supplier Performance</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Total Orders</TableHeaderCell>
              <TableHeaderCell>Total Spend</TableHeaderCell>
              <TableHeaderCell>Avg Order Value</TableHeaderCell>
              <TableHeaderCell>On-Time Delivery %</TableHeaderCell>
              <TableHeaderCell>Quality Rating</TableHeaderCell>
              <TableHeaderCell>Payment Terms</TableHeaderCell>
              <TableHeaderCell>Overall Score</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUPPLIERS.map((supplier) => {
              const score = ((supplier.onTimeDelivery / 100) * 50 + (supplier.qualityRating / 5) * 50).toFixed(1);
              return (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <Avatar name={supplier.name} size={28} />
                      <Text weight="semibold">{supplier.name}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text>{supplier.totalOrders}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteRedForeground1 }}>
                      {formatCurrency(supplier.totalSpend)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(supplier.avgOrderValue)}</Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXXS }}>
                        {supplier.onTimeDelivery}%
                      </Text>
                      <ProgressBar
                        value={supplier.onTimeDelivery}
                        max={100}
                        color={supplier.onTimeDelivery > 90 ? 'success' : supplier.onTimeDelivery > 80 ? 'brand' : 'warning'}
                        thickness="medium"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">
                      ⭐ {supplier.qualityRating.toFixed(1)} / 5.0
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{supplier.paymentTerms}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={Number(score) > 90 ? 'success' : Number(score) > 80 ? 'brand' : 'warning'}>
                      {score}%
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
