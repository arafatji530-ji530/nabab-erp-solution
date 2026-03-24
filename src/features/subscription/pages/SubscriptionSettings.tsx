import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Title3,
  Text,
  Card,
  Switch,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  RadioGroup,
  Radio,
} from '@fluentui/react-components';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentSubscription, pauseSubscription } from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  setting: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  settingLabel: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
  },
  warningBanner: {
    backgroundColor: '#FFF4CE',
    color: '#8F7C1D',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

export const SubscriptionSettings = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const currentSubscription = useAppSelector(selectCurrentSubscription);
  
  const [autoRenew, setAutoRenew] = useState(currentSubscription?.autoRenew ?? true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [pauseMonths, setPauseMonths] = useState('1');

  const handlePauseSubscription = async () => {
    await dispatch(pauseSubscription(parseInt(pauseMonths)) as any);
    setPauseDialogOpen(false);
  };

  return (
    <div className={classes.container}>
      <div>
        <Title3>Subscription Settings</Title3>
        <Text>Configure your subscription preferences and notifications</Text>
      </div>

      <Card>
        <Title3 style={{ padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}` }}>
          Billing & Renewal
        </Title3>
        
        <div className={classes.setting}>
          <div className={classes.settingLabel}>
            <Text weight="semibold">Auto-Renewal</Text>
            <Text size={300}>
              Automatically renew your subscription on the renewal date
            </Text>
          </div>
          <Switch
            checked={autoRenew}
            onChange={(_, data) => setAutoRenew(!!data.checked)}
            label={autoRenew ? 'Enabled' : 'Disabled'}
          />
        </div>

        <div className={classes.setting}>
          <div className={classes.settingLabel}>
            <Text weight="semibold">Billing Notifications</Text>
            <Text size={300}>
              Receive email notifications about upcoming invoices and payments
            </Text>
          </div>
          <Switch
            checked={emailNotifications}
            onChange={(_, data) => setEmailNotifications(!!data.checked)}
            label={emailNotifications ? 'Enabled' : 'Disabled'}
          />
        </div>
      </Card>

      <Card>
        <Title3 style={{ padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}` }}>
          Subscription Management
        </Title3>

        <div className={classes.setting} style={{ borderBottom: 'none' }}>
          <div className={classes.settingLabel}>
            <Text weight="semibold">Pause Subscription</Text>
            <Text size={300}>
              Pause your subscription for up to 3 months and resume later without cancelling
            </Text>
          </div>
          <DialogTrigger>
            <Button appearance="secondary" onClick={() => setPauseDialogOpen(true)}>
              Pause
            </Button>
          </DialogTrigger>
        </div>
      </Card>

      <div className={classes.warningBanner}>
        <Text weight="semibold" block>
          ⚠️ Caution
        </Text>
        <Text size={300} style={{ marginTop: tokens.spacingVerticalS }}>
          Pausing your subscription will temporary suspend access to all features. You can resume at any time within 3 months without losing data.
        </Text>
      </div>

      <Dialog open={pauseDialogOpen} onOpenChange={(_, data) => setPauseDialogOpen(data.open)}>
        <DialogContent>
          <DialogTitle>Pause Your Subscription</DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
              <Text>
                How many months would you like to pause your subscription?
              </Text>
              <RadioGroup
                value={pauseMonths}
                onChange={(_, data) => setPauseMonths(data.value)}
              >
                <Radio value="1" label="1 Month" />
                <Radio value="2" label="2 Months" />
                <Radio value="3" label="3 Months" />
              </RadioGroup>
              <Text size={200}>
                You will not be charged during the pause period and will keep all your data. You can resume your subscription anytime.
              </Text>
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setPauseDialogOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handlePauseSubscription}>
              Confirm Pause
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
