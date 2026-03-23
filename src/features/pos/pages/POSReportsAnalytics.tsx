/**
 * POS - Reports & Analytics
 * EXPERT: SaaS Platform Architect (POS Analytics)
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

export const POSReportsAnalytics = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>POS Reports & Analytics</Title3>
        <Text>Sales performance and terminal metrics</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Today's Sales
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(705000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Transactions
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            48
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Avg Transaction
          </Text>
          <Text size={500} weight="bold" block>
            {formatCurrency(14687)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Active Terminals
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            2
          </Text>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Payment Methods Distribution</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { method: 'Cash', amount: 285000, percentage: 40.4 },
              { method: 'Card', amount: 350000, percentage: 49.6 },
              { method: 'Mobile Payment', amount: 70000, percentage: 10.0 },
            ].map((item) => (
              <div key={item.method}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text>{item.method}</Text>
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
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Terminal Performance</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { terminal: 'Terminal 1', sales: 285000, transactions: 22 },
              { terminal: 'Terminal 2', sales: 420000, transactions: 26 },
            ].map((item) => (
              <div key={item.terminal}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text weight="semibold">{item.terminal}</Text>
                  <div>
                    <Text weight="semibold">{formatCurrency(item.sales)}</Text>
                    <Text size={200} style={{ marginLeft: tokens.spacingHorizontalS }}>
                      ({item.transactions} txn)
                    </Text>
                  </div>
                </div>
                <ProgressBar value={(item.sales / 500000) * 100} max={100} color="success" thickness="medium" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Hourly Sales Distribution</Title3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
          {[
            { hour: '08:00 - 12:00', sales: 165000 },
            { hour: '12:00 - 16:00', sales: 285000 },
            { hour: '16:00 - 20:00', sales: 255000 },
          ].map((item) => (
            <div key={item.hour}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXXS }}>
                <Text>{item.hour}</Text>
                <Text weight="semibold">{formatCurrency(item.sales)}</Text>
              </div>
              <ProgressBar value={(item.sales / 300000) * 100} max={100} color="brand" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
