/**
 * HR - Time Tracking & Attendance
 * EXPERT: UI/UX Designer (Calendar & Time Management)
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
} from '@fluentui/react-components';
import { Clock20Regular, CalendarLtr20Regular, DocumentPdf20Regular } from '@fluentui/react-icons';
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
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalXS),
    marginTop: tokens.spacingVerticalM,
  },
  dayCell: {
    aspectRatio: '1',
    ...shorthands.padding(tokens.spacingVerticalS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ATTENDANCE = [
  {
    id: '1',
    employee: 'Ahmed Hassan',
    date: '2026-03-22',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    hoursWorked: 8.0,
    status: 'Present',
  },
  {
    id: '2',
    employee: 'Fatima Rahman',
    date: '2026-03-22',
    checkIn: '08:45 AM',
    checkOut: '05:30 PM',
    hoursWorked: 8.75,
    status: 'Present',
  },
  {
    id: '3',
    employee: 'Karim Ali',
    date: '2026-03-22',
    checkIn: '09:15 AM',
    checkOut: '06:15 PM',
    hoursWorked: 8.0,
    status: 'Late',
  },
];

export const TimeTracking = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Time Tracking & Attendance</Title3>
          <Text>Monitor employee working hours and attendance</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<CalendarLtr20Regular />}>
            View Calendar
          </Button>
          <Button appearance="secondary" icon={<DocumentPdf20Regular />}>
            Export Report
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Present Today
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            45
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            On Leave
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            3
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Late Arrivals
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteDarkOrangeForeground1 }}>
            2
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Avg Hours/Day
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            8.2
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Today's Attendance</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Employee</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Check In</TableHeaderCell>
              <TableHeaderCell>Check Out</TableHeaderCell>
              <TableHeaderCell>Hours Worked</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ATTENDANCE.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={record.employee} size={28} />
                    <Text size={300}>{record.employee}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(record.date)}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Clock20Regular style={{ fontSize: '16px' }} />
                    <Text size={300}>{record.checkIn}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Clock20Regular style={{ fontSize: '16px' }} />
                    <Text size={300}>{record.checkOut}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{record.hoursWorked.toFixed(2)} hrs</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={record.status === 'Present' ? 'success' : record.status === 'Late' ? 'warning' : 'danger'}
                  >
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
