/**
 * HR - Leave Management System
 * EXPERT: UI/UX Designer (Calendar & Approvals)
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
  Avatar,
  Label,
  Input,
  Dropdown,
  Option,
  Textarea,
} from '@fluentui/react-components';
import { Add20Regular, CalendarLtr20Regular, Checkmark20Regular, Dismiss20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

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
  formCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalM,
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
});

const LEAVE_REQUESTS = [
  {
    id: '1',
    employee: 'Ahmed Hassan',
    empId: 'EMP-001',
    leaveType: 'Annual Leave',
    startDate: '2026-04-01',
    endDate: '2026-04-05',
    days: 5,
    reason: 'Family vacation',
    status: 'Pending',
  },
  {
    id: '2',
    employee: 'Fatima Rahman',
    empId: 'EMP-002',
    leaveType: 'Sick Leave',
    startDate: '2026-03-25',
    endDate: '2026-03-26',
    days: 2,
    reason: 'Medical appointment',
    status: 'Approved',
  },
  {
    id: '3',
    employee: 'Karim Ali',
    empId: 'EMP-003',
    leaveType: 'Casual Leave',
    startDate: '2026-03-28',
    endDate: '2026-03-28',
    days: 1,
    reason: 'Personal work',
    status: 'Rejected',
  },
  {
    id: '4',
    employee: 'Nusrat Jahan',
    empId: 'EMP-004',
    leaveType: 'Annual Leave',
    startDate: '2026-04-10',
    endDate: '2026-04-17',
    days: 8,
    reason: 'Educational tour',
    status: 'Pending',
  },
];

export const LeaveManagement = () => {
  const classes = useStyles();

  const totalRequests = LEAVE_REQUESTS.length;
  const approvedCount = LEAVE_REQUESTS.filter((r) => r.status === 'Approved').length;
  const pendingCount = LEAVE_REQUESTS.filter((r) => r.status === 'Pending').length;
  const totalDays = LEAVE_REQUESTS.filter((r) => r.status === 'Approved').reduce((sum, r) => sum + r.days, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'danger';
      default:
        return 'subtle';
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Leave Management</Title3>
          <Text>Manage employee leave requests and balances</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Apply for Leave
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Requests
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalRequests}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Approved
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {approvedCount}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending Approval
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {pendingCount}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Days Approved
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {totalDays}
          </Text>
        </Card>
      </div>

      <Card className={classes.formCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Apply for Leave</Title3>

        <div className={classes.formRow}>
          <div className={classes.formGroup}>
            <Label required>Employee</Label>
            <Dropdown placeholder="Select employee">
              <Option value="1">Ahmed Hassan (EMP-001)</Option>
              <Option value="2">Fatima Rahman (EMP-002)</Option>
              <Option value="3">Karim Ali (EMP-003)</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Leave Type</Label>
            <Dropdown placeholder="Select leave type">
              <Option value="annual">Annual Leave</Option>
              <Option value="sick">Sick Leave</Option>
              <Option value="casual">Casual Leave</Option>
              <Option value="maternity">Maternity Leave</Option>
              <Option value="paternity">Paternity Leave</Option>
              <Option value="unpaid">Unpaid Leave</Option>
            </Dropdown>
          </div>
        </div>

        <div className={classes.formRow}>
          <div className={classes.formGroup}>
            <Label required>Start Date</Label>
            <Input type="date" />
          </div>

          <div className={classes.formGroup}>
            <Label required>End Date</Label>
            <Input type="date" />
          </div>
        </div>

        <div className={classes.formGroup}>
          <Label required>Reason for Leave</Label>
          <Textarea rows={3} placeholder="Provide a detailed reason..." />
        </div>

        <div className={classes.formGroup}>
          <Label>Emergency Contact</Label>
          <Input placeholder="Phone number or email" />
        </div>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalM }}>
          <Button appearance="secondary">Cancel</Button>
          <Button appearance="primary" icon={<CalendarLtr20Regular />}>
            Submit Request
          </Button>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Leave Requests</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Employee</TableHeaderCell>
              <TableHeaderCell>Leave Type</TableHeaderCell>
              <TableHeaderCell>Start Date</TableHeaderCell>
              <TableHeaderCell>End Date</TableHeaderCell>
              <TableHeaderCell>Days</TableHeaderCell>
              <TableHeaderCell>Reason</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LEAVE_REQUESTS.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <Avatar name={request.employee} size={32} />
                    <div>
                      <Text weight="semibold" block>
                        {request.employee}
                      </Text>
                      <Text size={200}>{request.empId}</Text>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{request.leaveType}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(request.startDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(request.endDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{request.days} days</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{request.reason}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {request.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                      <Button appearance="primary" size="small" icon={<Checkmark20Regular />}>
                        Approve
                      </Button>
                      <Button appearance="secondary" size="small" icon={<Dismiss20Regular />}>
                        Reject
                      </Button>
                    </div>
                  )}
                  {request.status !== 'Pending' && (
                    <Button appearance="subtle" size="small">
                      View Details
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
