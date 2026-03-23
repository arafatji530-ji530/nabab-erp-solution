/**
 * Sales - Commission Tracking
 * EXPERT: Senior React Engineer (Performance-based Compensation)
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
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Input,
  Dropdown,
  Option,
  ProgressBar,
} from '@fluentui/react-components';
import { DocumentPdf20Regular, Money20Regular, DataLine20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
  },
  targetBar: {
    marginTop: tokens.spacingVerticalS,
  },
});

const SALES_REPS = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    salesTarget: 500000,
    salesAchieved: 425000,
    commissionRate: 3.5,
    earnedCommission: 14875,
    status: 'Pending',
  },
  {
    id: '2',
    name: 'Fatima Rahman',
    salesTarget: 450000,
    salesAchieved: 512000,
    commissionRate: 4.0,
    earnedCommission: 20480,
    status: 'Paid',
  },
  {
    id: '3',
    name: 'Karim Ali',
    salesTarget: 600000,
    salesAchieved: 380000,
    commissionRate: 3.0,
    earnedCommission: 11400,
    status: 'Pending',
  },
  {
    id: '4',
    name: 'Nusrat Jahan',
    salesTarget: 400000,
    salesAchieved: 445000,
    commissionRate: 3.5,
    earnedCommission: 15575,
    status: 'Approved',
  },
];

export const CommissionTracking = () => {
  const classes = useStyles();

  const totalEarned = SALES_REPS.reduce((sum, rep) => sum + rep.earnedCommission, 0);
  const totalSales = SALES_REPS.reduce((sum, rep) => sum + rep.salesAchieved, 0);
  const totalTarget = SALES_REPS.reduce((sum, rep) => sum + rep.salesTarget, 0);
  const pendingCount = SALES_REPS.filter((r) => r.status === 'Pending').length;

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Commission Tracking</Title3>
          <Text>Track and manage sales team commissions</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<DocumentPdf20Regular />}>
            Export Report
          </Button>
          <Button appearance="primary" icon={<Money20Regular />}>
            Process Payments
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Commission
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalEarned)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Sales
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalSales)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Target Achievement
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {Math.round((totalSales / totalTarget) * 100)}%
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending Approvals
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {pendingCount}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Dropdown placeholder="All Status">
            <Option value="all">All Status</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="paid">Paid</Option>
          </Dropdown>
          <Dropdown placeholder="This Month">
            <Option value="this-month">This Month</Option>
            <Option value="last-month">Last Month</Option>
            <Option value="this-quarter">This Quarter</Option>
          </Dropdown>
          <Input placeholder="Search sales rep..." style={{ flexGrow: 1, maxWidth: '300px' }} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Sales Rep</TableHeaderCell>
              <TableHeaderCell>Sales Target</TableHeaderCell>
              <TableHeaderCell>Sales Achieved</TableHeaderCell>
              <TableHeaderCell>Achievement %</TableHeaderCell>
              <TableHeaderCell>Rate</TableHeaderCell>
              <TableHeaderCell>Commission</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SALES_REPS.map((rep) => {
              const achievement = (rep.salesAchieved / rep.salesTarget) * 100;
              return (
                <TableRow key={rep.id}>
                  <TableCell>
                    <Text weight="semibold">{rep.name}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(rep.salesTarget)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(rep.salesAchieved)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text size={300} weight="bold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
                        {achievement.toFixed(1)}%
                      </Text>
                      <ProgressBar
                        value={achievement}
                        max={100}
                        color={achievement >= 100 ? 'success' : achievement >= 75 ? 'brand' : 'warning'}
                        thickness="large"
                        className={classes.targetBar}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color="informative">
                      {rep.commissionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                      {formatCurrency(rep.earnedCommission)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={rep.status === 'Paid' ? 'success' : rep.status === 'Approved' ? 'brand' : 'warning'}
                    >
                      {rep.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                      <Button appearance="subtle" size="small" icon={<DataLine20Regular />}>
                        Details
                      </Button>
                      {rep.status === 'Pending' && (
                        <Button appearance="primary" size="small">
                          Approve
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
