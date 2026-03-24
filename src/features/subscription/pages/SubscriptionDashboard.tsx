import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Title3,
  Title2,
  Text,
  ProgressBar,
  Button,
} from '@fluentui/react-components';
import {
  ChevronRight20Regular,
  CheckmarkCircle20Regular,
  AlertCircle20Regular,
  TrendingUp20Regular,
  People20Regular,
  DocumentTable20Regular,
  Payment20Regular,
  Settings20Regular,
} from '@fluentui/react-icons';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentSubscription, selectUsageMetrics } from '@/features/subscription/slices/subscriptionSlice';

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
  statusGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statusCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    alignItems: 'flex-start',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontSize: '24px',
  },
  usageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  usageCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  actionCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  chartContainer: {
    ...shorthands.padding(tokens.spacingVerticalL),
    minHeight: '400px',
  },
});

interface UsageMetric {
  date: string;
  users: number;
  storage: number;
  apiCalls: number;
}

export const SubscriptionDashboard = () => {
  const classes = useStyles();
  const currentSubscription = useAppSelector(selectCurrentSubscription);
  const usageMetrics = useAppSelector(selectUsageMetrics);

  // Mock usage data
  const usageData: UsageMetric[] = [
    { date: 'Jan 1', users: 5, storage: 2400, apiCalls: 4000 },
    { date: 'Jan 8', users: 8, storage: 2210, apiCalls: 3800 },
    { date: 'Jan 15', users: 12, storage: 2290, apiCalls: 4300 },
    { date: 'Jan 22', users: 18, storage: 2000, apiCalls: 3908 },
    { date: 'Jan 29', users: 25, storage: 2181, apiCalls: 4800 },
    { date: 'Feb 5', users: 32, storage: 2500, apiCalls: 3800 },
    { date: 'Feb 12', users: 42, storage: 2100, apiCalls: 4300 },
  ];

  const costBreakdown = [
    { name: 'Base Plan', value: 99, fill: tokens.colorBrandBackground },
    { name: 'Add-ons', value: 45, fill: '#107C10' },
    { name: 'Overages', value: 12, fill: '#FFB900' },
  ];

  const revenueImpact = [
    { month: 'Jan', potential: 50000, current: 42000 },
    { month: 'Feb', potential: 65000, current: 58000 },
    { month: 'Mar', potential: 75000, current: 72000 },
    { month: 'Apr', potential: 85000, current: 81000 },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.headerCard}>
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalS }}>
          Subscription Dashboard
        </Title3>
        <Text style={{ color: 'inherit' }}>
          Overview of your subscription status, usage, and performance metrics
        </Text>
      </div>

      {/* Status Summary */}
      <div className={classes.statusGrid}>
        <Card className={classes.statusCard}>
          <div className={classes.iconBox} style={{ backgroundColor: '#107C10' }}>
            <CheckmarkCircle20Regular />
          </div>
          <div style={{ flex: 1 }}>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Active Subscription
            </Text>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalM }}>
              {currentSubscription?.plan?.name} Plan
            </Text>
            <Text size={200} style={{ color: '#107C10' }}>
              ✓ Payment verified
            </Text>
          </div>
        </Card>

        <Card className={classes.statusCard}>
          <div className={classes.iconBox} style={{ backgroundColor: '#FFB900' }}>
            <TrendingUp20Regular />
          </div>
          <div style={{ flex: 1 }}>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Monthly Spend
            </Text>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalM }}>
              ${(currentSubscription?.plan?.price || 0).toFixed(2)}
            </Text>
            <Text size={200}>Renews {currentSubscription?.renewalDate}</Text>
          </div>
        </Card>

        <Card className={classes.statusCard}>
          <div className={classes.iconBox}>
            <AlertCircle20Regular />
          </div>
          <div style={{ flex: 1 }}>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Usage Status
            </Text>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalM }}>
              Within Limits
            </Text>
            <Text size={200}>45% of quota used</Text>
          </div>
        </Card>
      </div>

      {/* Usage Metrics */}
      <Card className={classes.usageCard}>
        <Title2 style={{ marginBottom: tokens.spacingVerticalL }}>Resource Usage</Title2>
        <div className={classes.usageGrid}>
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Active Users
            </Text>
            <Text size={600} weight="bold" block style={{ marginBottom: tokens.spacingVerticalXS, color: tokens.colorBrandBackground }}>
              42 / 100
            </Text>
            <ProgressBar value={42 / 100} style={{ marginBottom: tokens.spacingVerticalM }} />
            <Text size={200}>42% of limit</Text>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Storage Used
            </Text>
            <Text size={600} weight="bold" block style={{ marginBottom: tokens.spacingVerticalXS, color: tokens.colorBrandBackground }}>
              45 GB / 500 GB
            </Text>
            <ProgressBar value={45 / 500} style={{ marginBottom: tokens.spacingVerticalM }} />
            <Text size={200}>9% of limit</Text>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              API Calls / Month
            </Text>
            <Text size={600} weight="bold" block style={{ marginBottom: tokens.spacingVerticalXS, color: tokens.colorBrandBackground }}>
              2.3M / 10M
            </Text>
            <ProgressBar value={2.3 / 10} style={{ marginBottom: tokens.spacingVerticalM }} />
            <Text size={200}>23% of limit</Text>
          </div>
        </div>
      </Card>

      {/* Usage Trends */}
      <Card className={classes.chartContainer}>
        <Title2 style={{ marginBottom: tokens.spacingVerticalL }}>Usage Trends (Last 30 Days)</Title2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={usageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="users" stackId="1" stroke="#8884d8" fill="#8884d8" name="Active Users" />
            <Area type="monotone" dataKey="storage" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Storage (GB)" />
            <Area type="monotone" dataKey="apiCalls" stackId="1" stroke="#ffc658" fill="#ffc658" name="API Calls (x1000)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: tokens.spacingVerticalL }}>
        <Card className={classes.chartContainer}>
          <Title2 style={{ marginBottom: tokens.spacingVerticalL }}>Monthly Cost Breakdown</Title2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[{ name: 'Cost', 'Base Plan': 99, 'Add-ons': 45, 'Overages': 12 }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Base Plan" stackId="a" fill={tokens.colorBrandBackground} />
              <Bar dataKey="Add-ons" stackId="a" fill="#107C10" />
              <Bar dataKey="Overages" stackId="a" fill="#FFB900" />
            </BarChart>
          </ResponsiveContainer>
          <Text size={200} style={{ marginTop: tokens.spacingVerticalM }}>
            Total: ${(99 + 45 + 12).toFixed(2)}/month
          </Text>
        </Card>

        <Card className={classes.chartContainer}>
          <Title2 style={{ marginBottom: tokens.spacingVerticalL }}>Revenue Impact</Title2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueImpact}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="potential" stroke="#8884d8" name="Potential Revenue" strokeWidth={2} />
              <Line type="monotone" dataKey="current" stroke="#82ca9d" name="Current Revenue" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) }}>
        <Title2 style={{ marginBottom: tokens.spacingVerticalL }}>Quick Actions</Title2>
        <div className={classes.actionGrid}>
          <Card className={classes.actionCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <People20Regular style={{ fontSize: '24px', color: tokens.colorBrandBackground }} />
              <div>
                <Text weight="semibold" block>View Team Members</Text>
                <Text size={200}>Manage your team</Text>
              </div>
            </div>
            <ChevronRight20Regular />
          </Card>

          <Card className={classes.actionCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <DocumentTable20Regular style={{ fontSize: '24px', color: tokens.colorBrandBackground }} />
              <div>
                <Text weight="semibold" block>View Invoices</Text>
                <Text size={200}>Billing history</Text>
              </div>
            </div>
            <ChevronRight20Regular />
          </Card>

          <Card className={classes.actionCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Payment20Regular style={{ fontSize: '24px', color: tokens.colorBrandBackground }} />
              <div>
                <Text weight="semibold" block>Manage Payments</Text>
                <Text size={200}>Payment methods</Text>
              </div>
            </div>
            <ChevronRight20Regular />
          </Card>

          <Card className={classes.actionCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Settings20Regular style={{ fontSize: '24px', color: tokens.colorBrandBackground }} />
              <div>
                <Text weight="semibold" block>Preferences</Text>
                <Text size={200}>Account settings</Text>
              </div>
            </div>
            <ChevronRight20Regular />
          </Card>
        </div>
      </Card>

      {/* Recommendations */}
      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL), backgroundColor: '#F0F9FF', borderLeft: `4px solid ${tokens.colorBrandBackground}` }}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>💡 Recommendations</Title3>
        <ul style={{ margin: 0, paddingLeft: tokens.spacingHorizontalL, display: 'flex', flexDirection: 'column', ...shorthands.gap(tokens.spacingVerticalM) }}>
          <li>
            <Text>
              <strong>Optimize Storage:</strong> You're using 9% of your storage allowance. No action needed.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Team Collaboration:</strong> Consider adding Priority Support add-on for faster response times.
            </Text>
          </li>
          <li>
            <Text>
              <strong>Cost Savings:</strong> Annual billing could save you 15% on your subscription costs.
            </Text>
          </li>
        </ul>
      </Card>
    </div>
  );
};
