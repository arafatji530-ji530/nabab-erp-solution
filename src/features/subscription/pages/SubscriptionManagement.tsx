/**
 * Subscription - Subscription Management Page
 * Manage subscription plans and billing
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
} from '@fluentui/react-components';
import {
  Checkmark20Regular,
  Dismiss20Regular,
  Star20Filled,
  ArrowUpload20Regular,
} from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  currentPlan: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  planGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginTop: tokens.spacingVerticalL,
  },
  planCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    textAlign: 'center',
    ...shorthands.transition('all', '200ms'),
    position: 'relative',

    ':hover': {
      boxShadow: tokens.shadow16,
      transform: 'translateY(-4px)',
    },
  },
  popularBadge: {
    position: 'absolute',
    top: tokens.spacingVerticalM,
    right: tokens.spacingHorizontalM,
  },
  priceContainer: {
    ...shorthands.margin(tokens.spacingVerticalL, '0'),
  },
  featureList: {
    listStyle: 'none',
    ...shorthands.padding('0'),
    ...shorthands.margin(tokens.spacingVerticalL, '0'),
    textAlign: 'left',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
  },
  usageCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  usageBar: {
    width: '100%',
    height: '8px',
    backgroundColor: tokens.colorNeutralBackground5,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    ...shorthands.overflow('hidden'),
    marginTop: tokens.spacingVerticalS,
  },
  usageFill: {
    height: '100%',
    backgroundColor: tokens.colorBrandForeground1,
    ...shorthands.transition('width', '300ms'),
  },
});

const PLANS = [
  {
    name: 'Starter',
    price: 29000,
    period: 'month',
    features: [
      { text: 'Up to 10 users', included: true },
      { text: '5 warehouses', included: true },
      { text: 'Basic reporting', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false },
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: 79000,
    period: 'month',
    features: [
      { text: 'Up to 50 users', included: true },
      { text: 'Unlimited warehouses', included: true },
      { text: 'Advanced reporting', included: true },
      { text: 'Priority email & chat support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'API access', included: true },
      { text: 'Custom integrations', included: false },
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 199000,
    period: 'month',
    features: [
      { text: 'Unlimited users', included: true },
      { text: 'Unlimited warehouses', included: true },
      { text: 'Custom reporting', included: true },
      { text: '24/7 premium support', included: true },
      { text: 'Advanced analytics & AI', included: true },
      { text: 'Full API access', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'Dedicated account manager', included: true },
    ],
    popular: false,
  },
];

export const SubscriptionManagement = () => {
  const classes = useStyles();
  const [currentPlan] = useState('Professional');

  const usageData = {
    users: { current: 35, limit: 50 },
    warehouses: { current: 8, limit: Infinity },
    storage: { current: 145, limit: 500 }, // GB
  };

  return (
    <div className={classes.container}>
      <div>
        <Title3>Subscription Management</Title3>
        <Text>Manage your subscription plan and billing</Text>
      </div>

      <Card className={classes.currentPlan}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Text size={200}>Current Plan</Text>
            <Title3 style={{ marginTop: tokens.spacingVerticalXS }}>{currentPlan}</Title3>
            <Text size={300} style={{ marginTop: tokens.spacingVerticalXS }}>
              Active until April 22, 2026
            </Text>
          </div>
          <Badge appearance="filled" color="success" size="extra-large">
            Active
          </Badge>
        </div>
      </Card>

      <Card className={classes.usageCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Current Usage</Title3>
        
        <div style={{ marginBottom: tokens.spacingVerticalL }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Users</Text>
            <Text weight="semibold">
              {usageData.users.current} / {usageData.users.limit}
            </Text>
          </div>
          <div className={classes.usageBar}>
            <div
              className={classes.usageFill}
              style={{ width: `${(usageData.users.current / usageData.users.limit) * 100}%` }}
            />
          </div>
        </div>

        <div style={{ marginBottom: tokens.spacingVerticalL }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Warehouses</Text>
            <Text weight="semibold">{usageData.warehouses.current} / Unlimited</Text>
          </div>
          <div className={classes.usageBar}>
            <div className={classes.usageFill} style={{ width: '20%' }} />
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text>Storage</Text>
            <Text weight="semibold">
              {usageData.storage.current} GB / {usageData.storage.limit} GB
            </Text>
          </div>
          <div className={classes.usageBar}>
            <div
              className={classes.usageFill}
              style={{ width: `${(usageData.storage.current / usageData.storage.limit) * 100}%` }}
            />
          </div>
        </div>
      </Card>

      <div>
        <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Available Plans</Title3>
        <div className={classes.planGrid}>
          {PLANS.map((plan) => (
            <Card key={plan.name} className={classes.planCard}>
              {plan.popular && (
                <Badge
                  className={classes.popularBadge}
                  appearance="filled"
                  color="important"
                  icon={<Star20Filled />}
                >
                  Most Popular
                </Badge>
              )}

              <Title3>{plan.name}</Title3>

              <div className={classes.priceContainer}>
                <Text size={800} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                  {formatCurrency(plan.price)}
                </Text>
                <Text size={300} block>
                  per {plan.period}
                </Text>
              </div>

              <ul className={classes.featureList}>
                {plan.features.map((feature, index) => (
                  <li key={index} className={classes.featureItem}>
                    {feature.included ? (
                      <Checkmark20Regular style={{ color: tokens.colorPaletteGreenForeground1 }} />
                    ) : (
                      <Dismiss20Regular style={{ color: tokens.colorNeutralForeground4 }} />
                    )}
                    <Text
                      size={300}
                      style={{
                        color: feature.included
                          ? tokens.colorNeutralForeground1
                          : tokens.colorNeutralForeground3,
                      }}
                    >
                      {feature.text}
                    </Text>
                  </li>
                ))}
              </ul>

              {currentPlan === plan.name ? (
                <Button appearance="secondary" disabled style={{ width: '100%' }}>
                  Current Plan
                </Button>
              ) : (
                <Button
                  appearance="primary"
                  icon={<ArrowUpload20Regular />}
                  style={{ width: '100%' }}
                >
                  {PLANS.findIndex((p) => p.name === currentPlan) <
                  PLANS.findIndex((p) => p.name === plan.name)
                    ? 'Upgrade'
                    : 'Downgrade'}
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
