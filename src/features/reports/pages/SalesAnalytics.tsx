/**
 * Reports - Sales Analytics & Forecasting
 * EXPERT: Senior React Engineer (Predictive Analytics)
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
  Badge,
  Dropdown,
  Option,
  ProgressBar,
} from '@fluentui/react-components';
import { ArrowTrendingLines20Regular, CalendarLtr20Regular, DocumentPdf20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  metricCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
});

export const SalesAnalytics = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Sales Analytics & Forecasting</Title3>
          <Text>Analyze sales trends and predict future performance</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Dropdown placeholder="Q1 2026">
            <Option value="q1">Q1 2026</Option>
            <Option value="q4">Q4 2025</Option>
            <Option value="q3">Q3 2025</Option>
          </Dropdown>
          <Button appearance="secondary" icon={<DocumentPdf20Regular />}>
            Export
          </Button>
        </div>
      </div>

      <div className={classes.metricsGrid}>
        <Card className={classes.metricCard}>
          <Text size={200} block>
            Total Sales
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(8500000)}
          </Text>
          <Badge appearance="tint" color="success" size="small" style={{ marginTop: tokens.spacingVerticalXS }}>
            ↑ 18.5%
          </Badge>
        </Card>

        <Card className={classes.metricCard}>
          <Text size={200} block>
            Avg Deal Size
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(125000)}
          </Text>
          <Badge appearance="tint" color="success" size="small" style={{ marginTop: tokens.spacingVerticalXS }}>
            ↑ 5.2%
          </Badge>
        </Card>

        <Card className={classes.metricCard}>
          <Text size={200} block>
            Conversion Rate
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            24.8%
          </Text>
          <Badge appearance="tint" color="warning" size="small" style={{ marginTop: tokens.spacingVerticalXS }}>
            ↓ 1.3%
          </Badge>
        </Card>

        <Card className={classes.metricCard}>
          <Text size={200} block>
            Sales Cycle
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            18 days
          </Text>
          <Badge appearance="tint" color="success" size="small" style={{ marginTop: tokens.spacingVerticalXS }}>
            ↓ 3 days
          </Badge>
        </Card>
      </div>

      <div className={classes.chartGrid}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalXL) } as React.CSSProperties}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
            <div>
              <Title3>Revenue Forecast vs Actual</Title3>
              <Text size={300}>Next 6 months projection</Text>
            </div>
            <ArrowTrendingLines20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { month: 'January', forecast: 2800000, actual: 2650000 },
              { month: 'February', forecast: 2900000, actual: 2850000 },
              { month: 'March', forecast: 3000000, actual: 3000000 },
              { month: 'April', forecast: 3200000, actual: 0 },
              { month: 'May', forecast: 3400000, actual: 0 },
              { month: 'June', forecast: 3600000, actual: 0 },
            ].map((data) => (
              <div key={data.month}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={300} weight="semibold">
                    {data.month}
                  </Text>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
                    <Text size={300}>
                      Forecast: {formatCurrency(data.forecast)}
                    </Text>
                    {data.actual > 0 && (
                      <Text size={300} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                        Actual: {formatCurrency(data.actual)}
                      </Text>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                  <div style={{ flex: 1 }}>
                    <ProgressBar
                      value={((data.forecast / 4000000) * 100)}
                      max={100}
                      color="brand"
                      thickness="large"
                    />
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      Forecast
                    </Text>
                  </div>
                  {data.actual > 0 && (
                    <div style={{ flex: 1 }}>
                      <ProgressBar
                        value={((data.actual / 4000000) * 100)}
                        max={100}
                        color={data.actual >= data.forecast ? 'success' : 'warning'}
                        thickness="large"
                      />
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        Actual
                      </Text>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalXL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Sales by Region</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { region: 'Dhaka', sales: 4250000, percentage: 50 },
              { region: 'Chittagong', sales: 2550000, percentage: 30 },
              { region: 'Sylhet', sales: 1275000, percentage: 15 },
              { region: 'Rajshahi', sales: 425000, percentage: 5 },
            ].map((data) => (
              <div key={data.region}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text weight="semibold">{data.region}</Text>
                  <Text size={300}>{data.percentage}%</Text>
                </div>
                <ProgressBar
                  value={data.percentage}
                  max={100}
                  color={data.percentage > 40 ? 'success' : data.percentage > 20 ? 'brand' : 'warning'}
                  thickness="large"
                />
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  {formatCurrency(data.sales)}
                </Text>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Top Sales Reps</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            {[
              { name: 'Ahmed Hassan', sales: 1250000 },
              { name: 'Fatima Rahman', sales: 980000 },
              { name: 'Karim Ali', sales: 850000 },
            ].map((rep, idx) => (
              <div
                key={rep.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                  <Badge appearance="tint" color={idx === 0 ? 'success' : 'brand'}>
                    #{idx + 1}
                  </Badge>
                  <Text size={300}>{rep.name}</Text>
                </div>
                <Text size={300} weight="semibold">
                  {formatCurrency(rep.sales)}
                </Text>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Product Categories</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            {[
              { category: 'Industrial Equipment', sales: 3400000 },
              { category: 'Safety & Tools', sales: 2550000 },
              { category: 'Electronics', sales: 2550000 },
            ].map((cat) => (
              <div
                key={cat.category}
                style={{
                  ...shorthands.padding(tokens.spacingVerticalS),
                  backgroundColor: tokens.colorNeutralBackground3,
                  ...shorthands.borderRadius(tokens.borderRadiusMedium),
                } as React.CSSProperties}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={300}>{cat.category}</Text>
                  <Text size={300} weight="semibold">
                    {formatCurrency(cat.sales)}
                  </Text>
                </div>
                <ProgressBar
                  value={((cat.sales / 4000000) * 100)}
                  max={100}
                  color="brand"
                  thickness="medium"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Sales Trends</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                backgroundColor: tokens.colorPaletteGreenBackground2,
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
              } as React.CSSProperties}
            >
              <Text weight="semibold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
                ↑ Growing Markets
              </Text>
              <Text size={300}>Dhaka, Chittagong +25%</Text>
            </div>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                backgroundColor: tokens.colorPaletteYellowBackground2,
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
              } as React.CSSProperties}
            >
              <Text weight="semibold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
                → Stable Performance
              </Text>
              <Text size={300}>Industrial products +5%</Text>
            </div>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                backgroundColor: tokens.colorPaletteRedBackground2,
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
              } as React.CSSProperties}
            >
              <Text weight="semibold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
                ↓ Needs Attention
              </Text>
              <Text size={300}>Conversion rate -1.3%</Text>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
