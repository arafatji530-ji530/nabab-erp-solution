/**
 * HR - Attendance Management Page
 * Track employee attendance with calendar view
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
  Badge,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import {
  Calendar20Regular,
  Clock20Regular,
  CheckmarkCircle20Regular,
  DismissCircle20Regular,
} from '@fluentui/react-icons';
import { formatDate, formatTime } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
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
  table: {
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr 120px 120px 120px 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr 120px 120px 120px 100px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    alignItems: 'center',
  },
});

const MOCK_ATTENDANCE = [
  {
    id: '1',
    name: 'John Doe',
    department: 'Sales',
    date: '2026-03-22',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    status: 'Present',
  },
  {
    id: '2',
    name: 'Jane Smith',
    department: 'IT',
    date: '2026-03-22',
    checkIn: '09:15 AM',
    checkOut: '06:30 PM',
    status: 'Present',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    department: 'HR',
    date: '2026-03-22',
    checkIn: '-',
    checkOut: '-',
    status: 'Absent',
  },
];

export const AttendanceManagement = () => {
  const classes = useStyles();
  const [selectedDate] = useState('2026-03-22');

  const stats = {
    present: 42,
    absent: 3,
    late: 5,
    leave: 2,
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Attendance Management</Title3>
          <Text>Track employee attendance and working hours</Text>
        </div>
        <Button appearance="primary" icon={<Calendar20Regular />}>
          Mark Attendance
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Dropdown placeholder="Select Date" defaultValue={selectedDate}>
          <Option value="2026-03-22">Today - March 22, 2026</Option>
          <Option value="2026-03-21">Yesterday - March 21, 2026</Option>
        </Dropdown>
        <Dropdown placeholder="All Departments">
          <Option value="all">All Departments</Option>
          <Option value="sales">Sales</Option>
          <Option value="it">IT</Option>
          <Option value="hr">HR</Option>
        </Dropdown>
        <Button appearance="secondary">Export Report</Button>
      </Card>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <CheckmarkCircle20Regular
            style={{ fontSize: '32px', color: tokens.colorPaletteGreenForeground1, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={600} weight="bold" block>
            {stats.present}
          </Text>
          <Text size={300}>Present</Text>
        </Card>
        <Card className={classes.statCard}>
          <DismissCircle20Regular
            style={{ fontSize: '32px', color: tokens.colorPaletteRedForeground1, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={600} weight="bold" block>
            {stats.absent}
          </Text>
          <Text size={300}>Absent</Text>
        </Card>
        <Card className={classes.statCard}>
          <Clock20Regular
            style={{ fontSize: '32px', color: tokens.colorPaletteYellowForeground1, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={600} weight="bold" block>
            {stats.late}
          </Text>
          <Text size={300}>Late</Text>
        </Card>
        <Card className={classes.statCard}>
          <Calendar20Regular
            style={{ fontSize: '32px', color: tokens.colorPaletteBlueForeground2, marginBottom: tokens.spacingVerticalS }}
          />
          <Text size={600} weight="bold" block>
            {stats.leave}
          </Text>
          <Text size={300}>On Leave</Text>
        </Card>
      </div>

      <Card className={classes.table}>
        <div className={classes.tableHeader}>
          <div>Employee</div>
          <div>Department</div>
          <div>Check In</div>
          <div>Check Out</div>
          <div>Hours</div>
          <div>Status</div>
        </div>

        {MOCK_ATTENDANCE.map((record) => {
          const getStatusColor = (status: string) => {
            switch (status) {
              case 'Present':
                return tokens.colorPaletteGreenForeground1;
              case 'Absent':
                return tokens.colorPaletteRedForeground1;
              case 'Late':
                return tokens.colorPaletteYellowForeground1;
              default:
                return tokens.colorNeutralForeground3;
            }
          };

          return (
            <div key={record.id} className={classes.tableRow}>
              <Text weight="semibold">{record.name}</Text>
              <Text size={300}>{record.department}</Text>
              <Text size={300}>{record.checkIn}</Text>
              <Text size={300}>{record.checkOut}</Text>
              <Text size={300}>{record.checkIn !== '-' ? '9h 0m' : '-'}</Text>
              <Badge
                appearance="tint"
                style={{
                  backgroundColor: getStatusColor(record.status) + '20',
                  color: getStatusColor(record.status),
                }}
              >
                {record.status}
              </Badge>
            </div>
          );
        })}
      </Card>
    </div>
  );
};
