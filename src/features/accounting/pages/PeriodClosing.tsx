/**
 * Accounting - Period Closing
 * EXPERT: SaaS Platform Architect (Financial Year-End)
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
  Checkbox,
  ProgressBar,
} from '@fluentui/react-components';
import { LockClosed20Regular, Checkmark20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const PERIODS = [
  { id: '1', period: 'March 2026', startDate: '2026-03-01', endDate: '2026-03-31', status: 'Open', transactions: 156 },
  { id: '2', period: 'February 2026', startDate: '2026-02-01', endDate: '2026-02-28', status: 'Closing', transactions: 142 },
  { id: '3', period: 'January 2026', startDate: '2026-01-01', endDate: '2026-01-31', status: 'Closed', transactions: 135 },
];

const CHECKLIST = [
  { id: '1', task: 'Reconcile all bank accounts', completed: true },
  { id: '2', task: 'Review all journal entries', completed: true },
  { id: '3', task: 'Process depreciation', completed: false },
  { id: '4', task: 'Run financial reports', completed: false },
  { id: '5', task: 'Review variance analysis', completed: false },
];

export const PeriodClosing = () => {
  const classes = useStyles();

  const completedTasks = CHECKLIST.filter((t) => t.completed).length;
  const progress = (completedTasks / CHECKLIST.length) * 100;

  return (
    <div className={classes.container}>
      <div>
        <Title3>Period Closing</Title3>
        <Text>Manage accounting period close process</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Accounting Periods</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Period</TableHeaderCell>
              <TableHeaderCell>Start Date</TableHeaderCell>
              <TableHeaderCell>End Date</TableHeaderCell>
              <TableHeaderCell>Transactions</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PERIODS.map((period) => (
              <TableRow key={period.id}>
                <TableCell>
                  <Text weight="semibold">{period.period}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(period.startDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(period.endDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{period.transactions}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={period.status === 'Closed' ? 'danger' : period.status === 'Closing' ? 'warning' : 'success'}
                    icon={period.status === 'Closed' ? <LockClosed20Regular /> : undefined}
                  >
                    {period.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {period.status === 'Open' && (
                    <Button appearance="primary" size="small">
                      Close Period
                    </Button>
                  )}
                  {period.status === 'Closed' && (
                    <Button appearance="subtle" size="small" disabled>
                      Locked
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Period Close Checklist</Title3>

        <div style={{ marginBottom: tokens.spacingVerticalL }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
            <Text>
              Completion: {completedTasks} of {CHECKLIST.length} tasks
            </Text>
            <Text weight="semibold">{progress.toFixed(0)}%</Text>
          </div>
          <ProgressBar value={progress} max={100} color="brand" thickness="large" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
          {CHECKLIST.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: tokens.spacingHorizontalM,
                ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
            >
              <Checkbox checked={item.completed} />
              <Text weight="semibold">{item.task}</Text>
              {item.completed && <Checkmark20Regular style={{ marginLeft: 'auto', color: tokens.colorPaletteGreenForeground1 }} />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
