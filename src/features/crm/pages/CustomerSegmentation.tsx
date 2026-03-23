/**
 * CRM - Customer Segmentation
 * EXPERT: SaaS Platform Architect (Customer Intelligence)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Title3,
  Text,
  Card,
  ProgressBar,
  Badge,
} from '@fluentui/react-components';
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
  },
});

const SEGMENTS = [
  { name: 'VIP Customers', count: 45, revenue: 8500000, percentage: 15.2, color: 'important' },
  { name: 'Regular Customers', count: 182, revenue: 12200000, percentage: 61.5, color: 'success' },
  { name: 'New Customers', count: 58, revenue: 2800000, percentage: 19.6, color: 'brand' },
  { name: 'Inactive', count: 11, revenue: 500000, percentage: 3.7, color: 'danger' },
];

export const CustomerSegmentation = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Customer Segmentation</Title3>
        <Text>Analyze customer groups and behavior patterns</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Customers
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            296
           </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Revenue
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(24000000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Avg Customer Value
          </Text>
          <Text size={500} weight="bold" block>
            {formatCurrency(81081)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Retention Rate
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            96.3%
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Segment Distribution</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
          {SEGMENTS.map((segment) => (
            <div key={segment.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
                  <Text weight="semibold">{segment.name}</Text>
                  <Badge appearance="tint" color={segment.color as any}>
                    {segment.count} customers
                  </Badge>
                </div>
                <div>
                  <Text weight="semibold">{formatCurrency(segment.revenue)}</Text>
                  <Text size={200} style={{ marginLeft: tokens.spacingHorizontalS }}>
                    ({segment.percentage}%)
                  </Text>
                </div>
              </div>
              <ProgressBar value={segment.percentage} max={100} color={segment.color as any} thickness="large" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
