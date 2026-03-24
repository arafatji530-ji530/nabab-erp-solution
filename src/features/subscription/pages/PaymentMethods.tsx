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
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  Spinner,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Checkmark20Regular,
  Delete20Regular,
  Edit20Regular,
} from '@fluentui/react-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchPaymentMethods,
  setDefaultPaymentMethod,
  selectPaymentMethods,
  selectLoading,
  selectOperationInProgress,
} from '@/features/subscription/slices/subscriptionSlice';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  methodsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  methodCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  methodHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  methodDetails: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  actions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginTop: tokens.spacingVerticalM,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '300px',
  },
  emptyState: {
    textAlign: 'center',
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
});

export const PaymentMethods = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const paymentMethods = useAppSelector(selectPaymentMethods);
  const loading = useAppSelector(selectLoading);
  const operationInProgress = useAppSelector(selectOperationInProgress);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [setAsDefault, setSetAsDefault] = useState(false);

  useEffect(() => {
    dispatch(fetchPaymentMethods() as any);
  }, [dispatch]);

  const handleAddPaymentMethod = async () => {
    // In real app, tokenize with payment provider (Stripe, SSLCommerz, etc.)
    // await dispatch(addPaymentMethod({ type: 'card', tokenId: token, setDefault: setAsDefault }));
    setDialogOpen(false);
    setCardNumber('');
    setExpiryDate('');
    setCvc('');
    setSetAsDefault(false);
  };

  const handleSetDefault = (methodId: string) => {
    dispatch(setDefaultPaymentMethod(methodId) as any);
  };

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <Spinner size="large" label="Loading payment methods..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Payment Methods</Title3>
          <Text>Manage your payment methods and billing information</Text>
        </div>
        <DialogTrigger>
          <Button
            appearance="primary"
            icon={<Add20Regular />}
            onClick={() => setDialogOpen(true)}
          >
            Add Payment Method
          </Button>
        </DialogTrigger>
      </div>

      {paymentMethods.length === 0 ? (
        <Card className={classes.emptyState}>
          <Text size={500} weight="semibold">
            No payment methods added
          </Text>
          <Text size={300} style={{ marginTop: tokens.spacingVerticalM }}>
            Add a payment method to proceed with subscription renewal
          </Text>
        </Card>
      ) : (
        <div className={classes.methodsGrid}>
          {paymentMethods.map((method) => (
            <Card key={method.id} className={classes.methodCard}>
              <div className={classes.methodHeader}>
                <Text weight="semibold">{method.type === 'card' ? 'Credit Card' : 'Bank Account'}</Text>
                {method.isDefault && (
                  <Badge appearance="filled" color="success" icon={<Checkmark20Regular />}>
                    DEFAULT
                  </Badge>
                )}
              </div>

              <div className={classes.methodDetails}>
                <Text size={500} weight="semibold">
                  •••• •••• •••• {method.last4}
                </Text>
                {method.expiryMonth && method.expiryYear && (
                  <Text size={300}>
                    Expires: {String(method.expiryMonth).padStart(2, '0')}/{String(method.expiryYear).slice(-2)}
                  </Text>
                )}
                {method.bankName && (
                  <Text size={300}>Bank: {method.bankName}</Text>
                )}
              </div>

              <div className={classes.actions}>
                {!method.isDefault && (
                  <Button
                    appearance="subtle"
                    size="small"
                    onClick={() => handleSetDefault(method.id)}
                    disabled={operationInProgress === 'setDefault'}
                  >
                    Set as Default
                  </Button>
                )}
                <Button appearance="subtle" size="small" icon={<Edit20Regular />} />
                <Button
                  appearance="subtle"
                  size="small"
                  icon={<Delete20Regular />}
                  disabled={method.isDefault}
                />
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
        <DialogContent>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
              <Input
                placeholder="Card Number"
                value={cardNumber}
                onChange={(_, data) => setCardNumber(data.value)}
              />
              <Input
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(_, data) => setExpiryDate(data.value)}
              />
              <Input
                placeholder="CVC"
                type="password"
                value={cvc}
                onChange={(_, data) => setCvc(data.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={setAsDefault}
                  onChange={(e) => setSetAsDefault(e.target.checked)}
                />
                Set as default payment method
              </label>
              <Text size={200}> Your payment information is secure and encrypted</Text>
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handleAddPaymentMethod}>
              Add Method
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
