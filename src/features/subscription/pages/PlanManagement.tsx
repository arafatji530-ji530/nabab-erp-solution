import { useEffect, useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Title3,
  Text,
  Card,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  RadioGroup,
  Radio,
  Spinner,
} from '@fluentui/react-components';
import {
  Checkmark20Regular,
  Dismiss20Regular,
  Star20Filled,
  ArrowUpload20Regular,
  Dismiss12Regular,
  CheckmarkCircle20Regular,
} from '@fluentui/react-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { formatCurrency } from '@/shared/utils/formatters';
import {
  fetchPlans,
  fetchCurrentSubscription,
  fetchUsageMetrics,
  upgradePlan,
  selectPlans,
  selectCurrentSubscription,
  selectUsageMetrics,
  selectLoading,
  selectError,
  selectOperationInProgress,
  clearError,
} from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  currentPlan: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalXL),
    alignItems: 'start',
  },
  planInfo: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  renewalInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginTop: tokens.spacingVerticalL,
  },
  renewalItem: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
  planGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
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
  usageWarning: {
    backgroundColor: '#FFF4CE',
    color: '#8F7C1D',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
  errorBanner: {
    backgroundColor: '#FEE5E5',
    color: '#C50F1F',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const PlanManagement = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  
  const plans = useAppSelector(selectPlans);
  const currentSubscription = useAppSelector(selectCurrentSubscription);
  const usageMetrics = useAppSelector(selectUsageMetrics);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const operationInProgress = useAppSelector(selectOperationInProgress);
  
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<'month' | 'year'>('month');
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPlans() as any);
    dispatch(fetchCurrentSubscription() as any);
    dispatch(fetchUsageMetrics() as any);
  }, [dispatch]);

  const handleUpgradeClick = (planId: string) => {
    setSelectedPlanForUpgrade(planId);
    setUpgradeDialogOpen(true);
  };

  const handleConfirmUpgrade = async () => {
    if (selectedPlanForUpgrade) {
      await dispatch(
        upgradePlan({
          planId: selectedPlanForUpgrade,
          billingCycle: selectedBillingCycle,
        }) as any
      );
      setUpgradeDialogOpen(false);
      setSelectedPlanForUpgrade(null);
    }
  };

  const getUsagePercentage = (used: number, limit: number | null) => {
    if (limit === null) return 0;
    return (used / limit) * 100;
  };

  const isUsageWarning = (used: number, limit: number | null) => {
    if (limit === null) return false;
    return (used / limit) * 100 > 80;
  };

  if (loading && !currentSubscription) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner size="large" label="Loading subscription details..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {error && (
        <div className={classes.errorBanner}>
          <Text>{error}</Text>
          <Button
            appearance="subtle"
            icon={<Dismiss12Regular />}
            onClick={() => dispatch(clearError())}
          />
        </div>
      )}

      <div>
        <Title3>Subscription Plans</Title3>
        <Text>Manage your subscription and view available plans</Text>
      </div>

      {currentSubscription && (
        <Card className={classes.currentPlan}>
          <div className={classes.planInfo}>
            <div>
              <Text size={200}>Current Plan</Text>
              <Title3 style={{ marginTop: tokens.spacingVerticalXS }}>
                {currentSubscription.plan.name}
              </Title3>
              <Text size={300} style={{ marginTop: tokens.spacingVerticalXS }}>
                {formatCurrency(currentSubscription.plan.price)} / {currentSubscription.billingCycle}
              </Text>
            </div>

            <div className={classes.renewalInfo}>
              <div className={classes.renewalItem}>
                <Text size={200} weight="semibold">
                  Billing Cycle
                </Text>
                <Text>{currentSubscription.billingCycle === 'month' ? 'Monthly' : 'Yearly'}</Text>
              </div>
              <div className={classes.renewalItem}>
                <Text size={200} weight="semibold">
                  Renewal Date
                </Text>
                <Text>{new Date(currentSubscription.renewalDate).toLocaleDateString()}</Text>
              </div>
              <div className={classes.renewalItem}>
                <Text size={200} weight="semibold">
                  Auto-renewal
                </Text>
                <Text>{currentSubscription.autoRenew ? 'Enabled' : 'Disabled'}</Text>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <Badge appearance="filled" color="success" size="extra-large">
              {currentSubscription.status.toUpperCase()}
            </Badge>
          </div>
        </Card>
      )}

      {usageMetrics && (
        <Card className={classes.usageCard}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Current Usage</Title3>

          {currentSubscription?.plan.limits.users && (
            <div style={{ marginBottom: tokens.spacingVerticalL }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text weight="semibold">Users</Text>
                <Text>
                  {usageMetrics.users.used} / {usageMetrics.users.limit}
                </Text>
              </div>
              <div
                className={`${classes.usageBar} ${
                  isUsageWarning(usageMetrics.users.used, usageMetrics.users.limit)
                    ? classes.usageWarning
                    : ''
                }`}
              >
                <div
                  className={classes.usageFill}
                  style={{
                    width: `${getUsagePercentage(usageMetrics.users.used, usageMetrics.users.limit)}%`,
                    backgroundColor: isUsageWarning(usageMetrics.users.used, usageMetrics.users.limit)
                      ? '#F7630C'
                      : tokens.colorBrandForeground1,
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: tokens.spacingVerticalL }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text weight="semibold">Storage</Text>
              <Text>
                {usageMetrics.storage.used} GB / {usageMetrics.storage.limit} GB
              </Text>
            </div>
            <div
              className={`${classes.usageBar} ${
                isUsageWarning(usageMetrics.storage.used, usageMetrics.storage.limit)
                  ? classes.usageWarning
                  : ''
              }`}
            >
              <div
                className={classes.usageFill}
                style={{
                  width: `${getUsagePercentage(usageMetrics.storage.used, usageMetrics.storage.limit)}%`,
                  backgroundColor: isUsageWarning(usageMetrics.storage.used, usageMetrics.storage.limit)
                    ? '#F7630C'
                    : tokens.colorBrandForeground1,
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text weight="semibold">API Calls</Text>
              <Text>
                {usageMetrics.apiCalls.used.toLocaleString()} / {usageMetrics.apiCalls.limit.toLocaleString()}
              </Text>
            </div>
            <div className={classes.usageBar}>
              <div
                className={classes.usageFill}
                style={{
                  width: `${getUsagePercentage(usageMetrics.apiCalls.used, usageMetrics.apiCalls.limit)}%`,
                }}
              />
            </div>
          </div>
        </Card>
      )}

      <div>
        <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Available Plans</Title3>
        <div className={classes.planGrid}>
          {plans.map((plan) => (
            <Card key={plan.id} className={classes.planCard}>
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
              <Text size={300}>{plan.description}</Text>

              <div className={classes.priceContainer}>
                <Text size={800} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                  {formatCurrency(plan.price)}
                </Text>
                <Text size={300} block>
                  per {plan.period}
                </Text>
              </div>

              <ul className={classes.featureList}>
                {plan.features.slice(0, 6).map((feature) => (
                  <li key={feature.id} className={classes.featureItem}>
                    {feature.included ? (
                      <CheckmarkCircle20Regular style={{ color: '#107C10', fontSize: '16px' }} />
                    ) : (
                      <Dismiss20Regular style={{ color: tokens.colorNeutralForeground4, fontSize: '16px' }} />
                    )}
                    <Text
                      size={200}
                      style={{
                        color: feature.included
                          ? tokens.colorNeutralForeground1
                          : tokens.colorNeutralForeground3,
                      }}
                    >
                      {feature.name}
                    </Text>
                  </li>
                ))}
              </ul>

              {currentSubscription?.planId === plan.id ? (
                <Button appearance="secondary" disabled style={{ width: '100%' }}>
                  Current Plan
                </Button>
              ) : (
                <DialogTrigger>
                  <Button
                    appearance="primary"
                    icon={<ArrowUpload20Regular />}
                    style={{ width: '100%' }}
                    onClick={() => handleUpgradeClick(plan.id)}
                  >
                    {plans.find((p) => p.id === currentSubscription?.planId)?.price! < plan.price
                      ? 'Upgrade'
                      : 'Switch'}
                  </Button>
                </DialogTrigger>
              )}
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={upgradeDialogOpen} onOpenChange={(_, data) => setUpgradeDialogOpen(data.open)}>
        <DialogContent>
          <DialogTitle>
            Confirm Plan {selectedPlanForUpgrade ? 'Change' : 'Selection'}
          </DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
              <Text>Select your preferred billing cycle:</Text>
              <RadioGroup
                value={selectedBillingCycle}
                onChange={(_, data) => setSelectedBillingCycle(data.value as 'month' | 'year')}
              >
                <Radio value="month" label="Monthly Billing " />
                <Radio value="year" label="Yearly Billing (Save 16%)" />
              </RadioGroup>
              <Text size={300}>
                The change will be effective immediately and prorated to your current billing cycle.
              </Text>
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              appearance="primary"
              onClick={handleConfirmUpgrade}
              disabled={operationInProgress === 'upgrade'}
            >
              {operationInProgress === 'upgrade' ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const SubscriptionManagement = PlanManagement;
