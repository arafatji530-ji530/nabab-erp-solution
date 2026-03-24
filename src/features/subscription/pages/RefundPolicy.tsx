import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Title3,
  Text,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  Textarea,
  RadioGroup,
  Radio,
} from '@fluentui/react-components';
import { CheckmarkCircle20Regular, DismissCircle20Regular, DocumentPdf20Regular } from '@fluentui/react-icons';
import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentSubscription } from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  headerCard: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  policyCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  policySection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    marginBottom: tokens.spacingVerticalL,
  },
  returnPolicyTable: {
    marginTop: tokens.spacingVerticalM,
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase200,
  },
  statusApproved: {
    backgroundColor: '#D4F1E4',
    color: '#107C10',
  },
  statusDenied: {
    backgroundColor: '#FEE5E5',
    color: '#C50F1F',
  },
  refundRequestDialog: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

interface RefundRequest {
  id: string;
  date: string;
  amount: number;
  reason: string;
  status: 'approved' | 'denied' | 'pending';
  processedDate?: string;
}

const POLICY_SECTIONS = [
  {
    title: '30-Day Money Back Guarantee',
    content:
      'We offer a full refund within 30 days of your initial subscription purchase, no questions asked. This applies to your first month subscription.',
  },
  {
    title: 'Pro-Rated Refunds',
    content:
      'If you upgrade or downgrade your plan mid-cycle, any overpayment will be credited to your account automatically.',
  },
  {
    title: 'Refund Processing Time',
    content:
      'Approved refunds are processed within 5-7 business days. Your bank may take an additional 1-3 business days to display the credit.',
  },
  {
    title: 'Non-Refundable Items',
    content:
      'Add-on purchases and custom service fees are non-refundable unless the service was not delivered as promised.',
  },
  {
    title: 'Special Circumstances',
    content:
      'Annual subscriptions: Refunds available within the first 30 days. Enterprise plans: Governed by your service agreement.',
  },
];

const SAMPLE_REFUND_REQUESTS: RefundRequest[] = [
  {
    id: 'REF-001',
    date: '2024-01-15',
    amount: 29.99,
    reason: 'Duplicate charge',
    status: 'approved',
    processedDate: '2024-01-17',
  },
  {
    id: 'REF-002',
    date: '2024-01-10',
    amount: 99.99,
    reason: 'Changed plans',
    status: 'pending',
  },
  {
    id: 'REF-003',
    date: '2024-01-01',
    amount: 49.99,
    reason: 'Service issues',
    status: 'denied',
    processedDate: '2024-01-03',
  },
];

export const RefundPolicy = () => {
  const classes = useStyles();
  const currentSubscription = useAppSelector(selectCurrentSubscription);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [details, setDetails] = useState('');
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>(SAMPLE_REFUND_REQUESTS);

  const handleRequestRefund = () => {
    if (selectedReason && details) {
      const newRequest: RefundRequest = {
        id: `REF-${String(refundRequests.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        amount: currentSubscription?.plan.price || 0,
        reason: selectedReason,
        status: 'pending',
      };
      setRefundRequests([newRequest, ...refundRequests]);
      setRefundDialogOpen(false);
      setSelectedReason('');
      setDetails('');
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerCard}>
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalS }}>
          Refund Policy & Guarantees
        </Title3>
        <Text style={{ color: 'inherit' }}>
          We stand behind our service with industry-leading refund protections and guarantees you can trust.
        </Text>
      </div>

      <Card className={classes.policyCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Our Refund Promise</Title3>
        <div className={classes.policySection}>
          {POLICY_SECTIONS.map((section, idx) => (
            <div key={idx}>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                {section.title}
              </Text>
              <Text block>{section.content}</Text>
            </div>
          ))}
        </div>
        <Button
          appearance="secondary"
          icon={<DocumentPdf20Regular />}
          style={{ marginTop: tokens.spacingVerticalL }}
        >
          Download Full Policy (PDF)
        </Button>
      </Card>

      <Card className={classes.policyCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalL }}>
          <Title3>Return Window by Plan Type</Title3>
        </div>
        <Table className={classes.returnPolicyTable}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Plan Type</TableHeaderCell>
              <TableHeaderCell>Refund Window</TableHeaderCell>
              <TableHeaderCell>Conditions</TableHeaderCell>
              <TableHeaderCell>Pro-Rated</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Monthly Plans</TableCell>
              <TableCell>30 Days</TableCell>
              <TableCell>Full refund for first month</TableCell>
              <TableCell>✓ Yes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Annual Plans</TableCell>
              <TableCell>30 Days</TableCell>
              <TableCell>Full refund within 30 days</TableCell>
              <TableCell>✓ Yes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enterprise Plans</TableCell>
              <TableCell>As per contract</TableCell>
              <TableCell>Governed by service agreement</TableCell>
              <TableCell>✓ Yes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Add-Ons</TableCell>
              <TableCell>14 Days</TableCell>
              <TableCell>Service must be unused</TableCell>
              <TableCell>✓ Yes</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <Card className={classes.policyCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalL }}>
          <Title3>Your Refund Requests</Title3>
          <Dialog open={refundDialogOpen} onOpenChange={(_, data) => setRefundDialogOpen(data.open)}>
            <DialogTrigger>
              <Button appearance="primary">Request Refund</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Request a Refund</DialogTitle>
              <DialogBody>
                <div className={classes.refundRequestDialog}>
                  <div>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                      Current Plan: {currentSubscription?.plan?.name}
                    </Text>
                    <Text block>
                      Amount: ${currentSubscription ? currentSubscription.plan.price.toFixed(2) : '0.00'}
                    </Text>
                  </div>

                  <div>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
                      Reason for refund request
                    </Text>
                    <RadioGroup value={selectedReason} onChange={(_, data) => setSelectedReason(data.value)}>
                      <Radio value="duplicate" label="Duplicate charge" />
                      <Radio value="changed-plans" label="Changed plans" />
                      <Radio value="service-issues" label="Service issues" />
                      <Radio value="not-satisfied" label="Not satisfied" />
                      <Radio value="other" label="Other reason" />
                    </RadioGroup>
                  </div>

                  <div>
                    <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                      Additional details
                    </Text>
                    <Textarea
                      placeholder="Please provide as much detail as possible..."
                      value={details}
                      onChange={(_, data) => setDetails(data.value)}
                      rows={4}
                    />
                  </div>

                  <div style={{
                    backgroundColor: '#FEE5E5',
                    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
                    borderRadius: tokens.borderRadiusMedium,
                  }}>
                    <Text size={200}>
                      💡 <strong>Tip:</strong> Our support team may be able to resolve issues without a refund. Please describe the problem in detail so we can help.
                    </Text>
                  </div>
                </div>
              </DialogBody>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setRefundDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  appearance="primary"
                  onClick={handleRequestRefund}
                  disabled={!selectedReason || !details}
                >
                  Submit Request
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>

        {refundRequests.length === 0 ? (
          <Text>No refund requests yet.</Text>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Request ID</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Amount</TableHeaderCell>
                <TableHeaderCell>Reason</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refundRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{new Date(request.date).toLocaleDateString()}</TableCell>
                  <TableCell>${request.amount.toFixed(2)}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <div
                      className={`${classes.statusBadge} ${
                        request.status === 'approved'
                          ? classes.statusApproved
                          : request.status === 'denied'
                            ? classes.statusDenied
                            : ''
                      }`}
                    >
                      {request.status === 'approved' && <CheckmarkCircle20Regular />}
                      {request.status === 'denied' && <DismissCircle20Regular />}
                      <span style={{ textTransform: 'capitalize' }}>{request.status}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <Card
        className={classes.policyCard}
        style={{ backgroundColor: tokens.colorNeutralBackgroundInverted, color: tokens.colorNeutralForegroundInverted }}
      >
        <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Have Questions?</Title3>
        <Text style={{ marginBottom: tokens.spacingVerticalM }}>
          Our support team is here to help with any refund-related questions or concerns.
        </Text>
        <Button appearance="primary">Contact Support</Button>
      </Card>
    </div>
  );
};
