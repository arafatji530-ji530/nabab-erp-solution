import {
  makeStyles,
  shorthands,
  tokens,
  Title3,
  Text,
  Card,
  SelectTabData,
  TabList,
  Tab,
} from '@fluentui/react-components';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useAppSelector } from '@/store/hooks';
import { selectUsageMetrics } from '@/features/subscription/slices/subscriptionSlice';
import { useState } from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  chartCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    minHeight: '450px',
  },
  chartContainer: {
    width: '100%',
    height: '350px',
    marginTop: tokens.spacingVerticalL,
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginTop: tokens.spacingVerticalL,
  },
  metricItem: {
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    textAlign: 'center',
  },
});

const usageData = [
  { date: 'Mar 18', users: 20, storage: 45, api: 12000 },
  { date: 'Mar 19', users: 25, storage: 52, api: 18000 },
  { date: 'Mar 20', users: 30, storage: 60, api: 22000 },
  { date: 'Mar 21', users: 32, storage: 75, api: 28000 },
  { date: 'Mar 22', users: 35, storage: 90, api: 35000 },
  { date: 'Mar 23', users: 35, storage: 120, api: 42000 },
  { date: 'Mar 24', users: 35, storage: 145, api: 52000 },
];

const storageData = [
  { name: 'Documents', value: 45 },
  { name: 'Media', value: 65 },
  { name: 'Backups', value: 35 },
];

export const UsageAnalytics = () => {
  const classes = useStyles();
  const usageMetrics = useAppSelector(selectUsageMetrics);
  const [selectedTab, setSelectedTab] = useState<string>('overview');

  return (
    <div className={classes.container}>
      <div>
        <Title3>Usage Analytics</Title3>
        <Text>Monitor your usage patterns and resource consumption</Text>
      </div>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={(_, data) => setSelectedTab(String(data.value))}
      >
        <Tab value="overview">Overview</Tab>
        <Tab value="users">Users</Tab>
        <Tab value="storage">Storage</Tab>
        <Tab value="api">API Calls</Tab>
      </TabList>

      {selectedTab === 'overview' && (
        <>
          <Card className={classes.chartCard}>
            <Title3>Usage Trends (Last 7 Days)</Title3>
            <div className={classes.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0078D4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#0078D4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="users"
                    fill="url(#userGradient)"
                    stroke="#0078D4"
                    name="Users"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className={classes.metricsGrid}>
            {usageMetrics && (
              <>
                <div className={classes.metricItem}>
                  <Text size={200}>Users</Text>
                  <Title3 style={{ marginTop: tokens.spacingVerticalS }}>
                    {usageMetrics.users.used}/{usageMetrics.users.limit}
                  </Title3>
                  <Text size={200}>70% used</Text>
                </div>
                <div className={classes.metricItem}>
                  <Text size={200}>Storage</Text>
                  <Title3 style={{ marginTop: tokens.spacingVerticalS }}>
                    {usageMetrics.storage.used} GB
                  </Title3>
                  <Text size={200}>29% of {usageMetrics.storage.limit} GB</Text>
                </div>
                <div className={classes.metricItem}>
                  <Text size={200}>API Calls</Text>
                  <Title3 style={{ marginTop: tokens.spacingVerticalS }}>
                    {usageMetrics.apiCalls.used.toLocaleString()}
                  </Title3>
                  <Text size={200}>5.2% of monthly limit</Text>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {selectedTab === 'users' && (
        <Card className={classes.chartCard}>
          <Title3>Active Users Over Time</Title3>
          <div className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#0078D4"
                  strokeWidth={2}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {selectedTab === 'storage' && (
        <Card className={classes.chartCard}>
          <Title3>Storage Usage by Type</Title3>
          <div className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={storageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(v) => `${v} GB`} />
                <Bar dataKey="value" fill="#107C10" name="Storage (GB)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {selectedTab === 'api' && (
        <Card className={classes.chartCard}>
          <Title3>API Calls Trend</Title3>
          <div className={classes.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(v) => v?.toLocaleString()} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="api"
                  stroke="#F7630C"
                  strokeWidth={2}
                  name="API Calls"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};
