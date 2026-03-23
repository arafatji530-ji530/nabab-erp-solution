/**
 * Purchase - Supplier Performance Analytics
 * EXPERT: SaaS Platform Architect (Supplier Intelligence)
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

const SUPPLIER_PERFORMANCE = [
  {
    id: '1',
    name: 'Office Supplies Ltd',
    totalOrders: 38,
    onTimeDelivery: 95.5,
    qualityScore: 4.7,
    avgLeadTime: 3.2,
    defectRate: 1.2,
    totalSpend: 1850000,
  },
  {
    id: '2',
    name: 'Tech Hardware Inc',
    totalOrders: 22,
    onTimeDelivery: 88.2,
    qualityScore: 4.3,
    avgLeadTime: 5.8,
    defectRate: 3.5,
    totalSpend: 3200000,
  },
  {
    id: '3',
    name: 'Raw Materials Co',
    totalOrders: 52,
    onTimeDelivery: 92.0,
    qualityScore: 4.5,
    avgLeadTime: 4.1,
    defectRate: 2.0,
    totalSpend: 2600000,
  },
];

export const SupplierPerformanceAnalytics = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Supplier Performance Analytics</Title3>
        <Text>Analyze supplier reliability, quality, and cost efficiency</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Performance Metrics</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Total Orders</TableHeaderCell>
              <TableHeaderCell>On-Time Delivery</TableHeaderCell>
              <TableHeaderCell>Quality Score</TableHeaderCell>
              <TableHeaderCell>Avg Lead Time (days)</TableHeaderCell>
              <TableHeaderCell>Defect Rate %</TableHeaderCell>
              <TableHeaderCell>Total Spend</TableHeaderCell>
              <TableHeaderCell>Overall Rating</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUPPLIER_PERFORMANCE.map((supplier) => {
              const rating =
                supplier.onTimeDelivery > 90 && supplier.qualityScore > 4.5 ? 'Excellent' : supplier.onTimeDelivery > 85 ? 'Good' : 'Average';
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
                    <div>
                      <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXXS }}>
                        {supplier.onTimeDelivery}%
                      </Text>
                      <ProgressBar
                        value={supplier.onTimeDelivery}
                        max={100}
                        color={supplier.onTimeDelivery > 90 ? 'success' : supplier.onTimeDelivery > 85 ? 'brand' : 'warning'}
                        thickness="medium"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">⭐ {supplier.qualityScore.toFixed(1)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{supplier.avgLeadTime.toFixed(1)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: supplier.defectRate > 3 ? tokens.colorPaletteRedForeground1 : tokens.colorPaletteGreenForeground1 }}>
                      {supplier.defectRate}%
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(supplier.totalSpend)}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={rating === 'Excellent' ? 'success' : rating === 'Good' ? 'brand' : 'warning'}>
                      {rating}
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
