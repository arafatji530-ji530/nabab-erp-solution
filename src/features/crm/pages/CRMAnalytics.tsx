/**
 * CRM - CRM Analytics
 * EXPERT: Enterprise Solution Architect (CRM Intelligence)
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

export const CRMAnalytics = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>CRM Analytics</Title3>
        <Text>Insights into customer relationships and sales performance</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Pipeline Value
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(10850000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Win Rate
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            68.5%
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Avg Deal Size
          </Text>
          <Text size={500} weight="bold" block>
            {formatCurrency(2712500)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Sales Cycle (avg)
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            32 days
          </Text>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Lead Sources</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { source: 'Website', count: 125, percentage: 42.4 },
              { source: 'Referrals', count: 85, percentage: 28.8 },
              { source: 'Social Media', count: 52, percentage: 17.6 },
              { source: 'Events', count: 33, percentage: 11.2 },
            ].map((item) => (
              <div key={item.source}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text>{item.source}</Text>
                  <Text weight="semibold">
                    {item.count} ({item.percentage}%)
                  </Text>
                </div>
                <ProgressBar value={item.percentage} max={100} color="brand" thickness="medium" />
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Pipeline by Stage</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { stage: 'Qualification', value: 850000 },
              { stage: 'Proposal', value: 5000000 },
              { stage: 'Negotiation', value: 3200000 },
              { stage: 'Closing', value: 1800000 },
            ].map((item) => (
              <div key={item.stage}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text>{item.stage}</Text>
                  <Text weight="semibold">{formatCurrency(item.value)}</Text>
                </div>
                <ProgressBar value={(item.value / 6000000) * 100} max={100} color="success" thickness="medium" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
