import { makeStyles, shorthands, tokens, Button, Title3, Text, Card, Badge } from '@fluentui/react-components';
import { Add20Regular, CheckmarkCircle20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  addOnsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  addOnCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  benefits: {
    listStyle: 'none',
    ...shorthands.padding('0'),
    ...shorthands.margin(tokens.spacingVerticalM, '0'),
  },
  benefit: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalXS, '0'),
  },
});

const ADD_ONS = [
  {
    id: 'extra-storage',
    name: 'Extra Storage',
    description: 'Additional 100GB of storage space',
    price: 5000,
    period: 'month',
    benefits: ['100GB cloud storage', 'Unlimited file versions', 'Advanced backup'],
    active: false,
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics',
    description: 'In-depth business insights and reporting',
    price: 15000,
    period: 'month',
    benefits: ['Custom dashboards', 'Predictive analytics', 'Export reports (PDF/Excel)'],
    active: true,
  },
  {
    id: 'api-access',
    name: 'API Access',
    description: 'Full REST API with 1M requests/month',
    price: 25000,
    period: 'month',
    benefits: ['Full REST API', '1M API calls', 'Webhook support'],
    active: true,
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    description: '24/7 phone & chat support',
    price: 20000,
    period: 'month',
    benefits: ['24/7 support', 'Phone support', '1-hour response time'],
    active: false,
  },
  {
    id: 'sso',
    name: 'Single Sign-On (SSO)',
    description: 'SAML 2.0 and OAuth 2.0 integration',
    price: 35000,
    period: 'month',
    benefits: ['SAML 2.0', 'OAuth 2.0', 'Centralized user management'],
    active: false,
  },
  {
    id: 'white-label',
    name: 'White Label',
    description: 'Customize interface with your branding',
    price: 50000,
    period: 'month',
    benefits: ['Custom logo & colors', 'Custom domain', 'Branded email'],
    active: false,
  },
];

export const AddOns = () => {
  const classes = useStyles();

  const handleAddOn = (addOnId: string) => {
    // In real app, add to cart or trigger checkout
    console.log('Add to subscription:', addOnId);
  };

  const moveToActive = (addOns: typeof ADD_ONS) => {
    return (
      <>
        {addOns
          .filter((a) => a.active)
          .map((addOn) => (
            <Card key={addOn.id} className={classes.addOnCard}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <Title3 style={{ marginBottom: tokens.spacingVerticalXS }}>{addOn.name}</Title3>
                    <Text size={300}>{addOn.description}</Text>
                  </div>
                  <Badge appearance="filled" color="success">
                    ACTIVE
                  </Badge>
                </div>

                <ul className={classes.benefits}>
                  {addOn.benefits.map((benefit, idx) => (
                    <li key={idx} className={classes.benefit}>
                      <CheckmarkCircle20Regular style={{ color: '#107C10', fontSize: '16px' }} />
                      <Text size={200}>{benefit}</Text>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: tokens.spacingVerticalL }}>
                  <Button appearance="primary" disabled style={{ width: '100%' }}>
                    Managing
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </>
    );
  };

  const moveToAvailable = (addOns: typeof ADD_ONS) => {
    return (
      <>
        {addOns
          .filter((a) => !a.active)
          .map((addOn) => (
            <Card key={addOn.id} className={classes.addOnCard}>
              <div style={{ flex: 1 }}>
                <div>
                  <Title3 style={{ marginBottom: tokens.spacingVerticalXS }}>{addOn.name}</Title3>
                  <Text size={300}>{addOn.description}</Text>
                </div>

                <ul className={classes.benefits}>
                  {addOn.benefits.map((benefit, idx) => (
                    <li key={idx} className={classes.benefit}>
                      <CheckmarkCircle20Regular style={{ color: '#107C10', fontSize: '16px' }} />
                      <Text size={200}>{benefit}</Text>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: tokens.spacingVerticalL }}>
                  <Text weight="semibold" size={500}>
                    {formatCurrency(addOn.price)} / {addOn.period}
                  </Text>
                </div>
              </div>
              <Button
                appearance="primary"
                icon={<Add20Regular />}
                onClick={() => handleAddOn(addOn.id)}
                style={{ width: '100%', marginTop: tokens.spacingVerticalM }}
              >
                Add to Subscription
              </Button>
            </Card>
          ))}
      </>
    );
  };

  return (
    <div className={classes.container}>
      <div>
        <Title3>Add-ons & Extras</Title3>
        <Text>Enhance your subscription with additional features and services</Text>
      </div>

      <div>
        <Title3 style={{ fontSize: '16px', marginBottom: tokens.spacingVerticalL }}>
          Your Active Add-ons
        </Title3>
        <div className={classes.addOnsGrid}>{moveToActive(ADD_ONS)}</div>
      </div>

      <div>
        <Title3 style={{ fontSize: '16px', marginBottom: tokens.spacingVerticalL }}>
          Available Add-ons
        </Title3>
        <div className={classes.addOnsGrid}>{moveToAvailable(ADD_ONS)}</div>
      </div>
    </div>
  );
};
