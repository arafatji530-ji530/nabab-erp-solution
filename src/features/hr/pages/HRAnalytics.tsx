/**
 * HR - Analytics & Insights
 * EXPERT: SaaS Platform Architect (Data Analytics)
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

export const HRAnalytics = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>HR Analytics & Insights</Title3>
        <Text>Workforce metrics and analytics</Text>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Headcount
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            156
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Attrition Rate
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            8.5%
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Avg Tenure
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            3.2 years
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Training Hours
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            1,248
          </Text>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Department Distribution</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { dept: 'Sales', count: 45, percentage: 28.8 },
              { dept: 'Operations', count: 38, percentage: 24.4 },
              { dept: 'IT', count: 32, percentage: 20.5 },
              { dept: 'Finance', count: 22, percentage: 14.1 },
              { dept: 'HR', count: 19, percentage: 12.2 },
            ].map((item) => (
              <div key={item.dept}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text>{item.dept}</Text>
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
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Performance Distribution</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { rating: 'Exceeds Expectations', count: 45, percentage: 28.8, color: 'success' },
              { rating: 'Meets Expectations', count: 89, percentage: 57.1, color: 'brand' },
              { rating: 'Needs Improvement', count: 22, percentage: 14.1, color: 'warning' },
            ].map((item) => (
              <div key={item.rating}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text>{item.rating}</Text>
                  <Text weight="semibold">
                    {item.count} ({item.percentage}%)
                  </Text>
                </div>
                <ProgressBar value={item.percentage} max={100} color={item.color as any} thickness="medium" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
