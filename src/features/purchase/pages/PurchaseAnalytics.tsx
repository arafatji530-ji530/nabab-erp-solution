/**
 * Purchase - Purchase Analytics
 * EXPERT: UI/UX Designer (Purchase Intelligence)
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

export const PurchaseAnalytics = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Purchase Analytics</Title3>
        <Text>Insights into purchasing patterns and cost trends</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Purchase Value
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(7650000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Purchase Orders
          </Text>
          <Text size={500} weight="bold" block>
            112
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Avg Order Value
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(68303)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Cost Savings
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(385000)}
          </Text>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Purchase by Category</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { category: 'Raw Materials', amount: 3200000, percentage: 41.8 },
              { category: 'Finished Goods', amount: 2500000, percentage: 32.7 },
              { category: 'Office Supplies', amount: 1200000, percentage: 15.7 },
              { category: 'Equipment', amount: 750000, percentage: 9.8 },
            ].map((item) => (
              <div key={item.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text>{item.category}</Text>
                  <Text weight="semibold">
                    {formatCurrency(item.amount)} ({item.percentage}%)
                  </Text>
                </div>
                <ProgressBar value={item.percentage} max={100} color="brand" thickness="medium" />
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Monthly Trends</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { month: 'January', amount: 2400000 },
              { month: 'February', amount: 2650000 },
              { month: 'March', amount: 2600000 },
            ].map((item) => (
              <div key={item.month}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text>{item.month}</Text>
                  <Text weight="semibold">{formatCurrency(item.amount)}</Text>
                </div>
                <ProgressBar value={(item.amount / 3000000) * 100} max={100} color="success" thickness="medium" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
