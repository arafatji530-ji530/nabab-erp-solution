import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Title3,
  Text,
  Card,
  RadioGroup,
  Radio,
  Textarea,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  Checkbox,
} from '@fluentui/react-components';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCurrentSubscription, cancelSubscription } from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  warningBanner: {
    backgroundColor: '#FEE5E5',
    color: '#C50F1F',
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    borderLeft: '4px solid #C50F1F',
  },
  benefitsCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  alternativeCard: {
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.padding(tokens.spacingVerticalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  reasonsSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
});

const CANCELLATION_REASONS = [
  { id: 'cost', label: "It's too expensive", value: 'cost' },
  { id: 'features', label: "Missing features I need", value: 'features' },
  { id: 'switching', label: 'Switching to another service', value: 'switching' },
  { id: 'poor-support', label: 'Poor customer support', value: 'poor-support' },
  { id: 'performance', label: 'Performance issues', value: 'performance' },
  { id: 'other', label: 'Other reason', value: 'other' },
];

export const CancelSubscription = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const currentSubscription = useAppSelector(selectCurrentSubscription);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [feedback, setFeedback] = useState('');
  const [confirmCheckbox, setConfirmCheckbox] = useState(false);
  const [effectiveDate, setEffectiveDate] = useState<'immediate' | 'next_billing'>('next_billing');

  const handleCancelSubscription = async () => {
    if (confirmCheckbox && selectedReason) {
      await dispatch(
        cancelSubscription({
          reason: selectedReason,
          feedback: feedback,
        }) as any
      );
      setDialogOpen(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.warningBanner}>
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalS }}>
          ⚠️ Cancel Your Subscription
        </Title3>
        <Text>
          Cancelling your subscription will remove access to all features. Your data will be retained for 30 days before permanent deletion.
        </Text>
      </div>

      <Card className={classes.benefitsCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>We Value Your Feedback</Title3>
        <Text style={{ marginBottom: tokens.spacingVerticalM }}>
          Before you go, we'd like to understand how we can improve our service. Your feedback helps us serve you better.
        </Text>
        <Text size={200}>
          If you're having issues or have concerns, please reach out to our support team at support@nabab.com. We may be able to help!
        </Text>
      </Card>

      <Card className={classes.alternativeCard} style={{ marginTop: tokens.spacingVerticalL }}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Consider These Alternatives</Title3>
        <ul style={{ margin: 0, paddingLeft: tokens.spacingHorizontalL }}>
          <li style={{ marginBottom: tokens.spacingVerticalS }}>
            <Text>Downgrade to a lower plan to reduce costs</Text>
          </li>
          <li style={{ marginBottom: tokens.spacingVerticalS }}>
            <Text>Pause your subscription for up to 3 months</Text>
          </li>
          <li style={{ marginBottom: tokens.spacingVerticalS }}>
            <Text>Contact us for a custom plan or discount</Text>
          </li>
        </ul>
      </Card>

      <Card className={classes.benefitsCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>What You'll Lose</Title3>
        <ul style={{ margin: 0, paddingLeft: tokens.spacingHorizontalL }}>
          <li style={{ marginBottom: tokens.spacingVerticalS }}>
            <Text>Access to all features and integrations</Text>
          </li>
          <li style={{ marginBottom: tokens.spacingVerticalS }}>
            <Text>Priority support and technical assistance</Text>
          </li>
          <li style={{ marginBottom: tokens.spacingVerticalS }}>
            <Text>Data will be deleted permanently after 30 days</Text>
          </li>
          <li>
            <Text>API access and webhooks</Text>
          </li>
        </ul>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
        <DialogContent>
          <DialogTitle>Confirm Subscription Cancellation</DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
              <div>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
                  Why are you cancelling?
                </Text>
                <div className={classes.reasonsSection}>
                  <RadioGroup value={selectedReason} onChange={(_, data) => setSelectedReason(data.value)}>
                    {CANCELLATION_REASONS.map((reason) => (
                      <Radio key={reason.id} value={reason.value} label={reason.label} />
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {selectedReason && (
                <div>
                  <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                    Please share your feedback (optional)
                  </Text>
                  <Textarea
                    placeholder="Your feedback helps us improve..."
                    value={feedback}
                    onChange={(_, data) => setFeedback(data.value)}
                    rows={4}
                  />
                </div>
              )}

              <div>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
                  When should we cancel your subscription?
                </Text>
                <RadioGroup value={effectiveDate} onChange={(_, data) => setEffectiveDate(data.value as any)}>
                  <Radio
                    value="immediate"
                    label="Immediately (lose access today)"
                  />
                  <Radio
                    value="next_billing"
                    label={`At end of billing cycle (${currentSubscription?.renewalDate})`}
                  />
                </RadioGroup>
              </div>

              <div>
                <Checkbox
                  label="I understand that my data will be deleted permanently after 30 days of cancellation"
                  checked={confirmCheckbox}
                  onChange={(_, data) => setConfirmCheckbox(!!data.checked)}
                />
              </div>

              {confirmCheckbox && (
                <div style={{
                  backgroundColor: '#FEE5E5',
                  padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
                  borderRadius: tokens.borderRadiusMedium,
                }}>
                  <Text weight="semibold" style={{ color: '#C50F1F' }}>
                    ⚠️ This action cannot be undone
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setDialogOpen(false)}>
              Keep My Subscription
            </Button>
            <Button
              appearance="primary"
              onClick={handleCancelSubscription}
              disabled={!confirmCheckbox || !selectedReason}
              style={{ backgroundColor: '#C50F1F' }}
            >
              Confirm Cancellation
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      <div style={{ marginTop: tokens.spacingVerticalXL }}>
        <DialogTrigger>
          <Button
            appearance="subtle"
            onClick={() => setDialogOpen(true)}
            style={{ color: '#C50F1F' }}
          >
            Cancel My Subscription
          </Button>
        </DialogTrigger>
      </div>
    </div>
  );
};
