/**
 * Reports - Scheduled Reports
 * EXPERT: SaaS Platform Architect (Report Automation)
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
  Switch,
} from '@fluentui/react-components';
import { Add20Regular, Clock20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const SCHEDULES = [
  { id: '1', name: 'Daily Sales Report', frequency: 'Daily', time: '08:00 AM', recipients: 'sales@company.com', enabled: true, lastRun: '2026-03-20' },
  { id: '2', name: 'Weekly Inventory Report', frequency: 'Weekly', time: 'Monday 09:00 AM', recipients: 'ops@company.com', enabled: true, lastRun: '2026-03-17' },
  { id: '3', name: 'Monthly Financial Statement', frequency: 'Monthly', time: '1st 10:00 AM', recipients: 'finance@company.com', enabled: false, lastRun: '2026-02-01' },
];

export const ScheduledReports = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Scheduled Reports</Title3>
          <Text>Automate report generation and delivery</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Schedule
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Report Name</TableHeaderCell>
              <TableHeaderCell>Frequency</TableHeaderCell>
              <TableHeaderCell>Schedule Time</TableHeaderCell>
              <TableHeaderCell>Recipients</TableHeaderCell>
              <TableHeaderCell>Last Run</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SCHEDULES.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Clock20Regular />
                    <Text weight="semibold">{schedule.name}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{schedule.frequency}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{schedule.time}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{schedule.recipients}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(schedule.lastRun)}</Text>
                </TableCell>
                <TableCell>
                  <Switch checked={schedule.enabled} />
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
