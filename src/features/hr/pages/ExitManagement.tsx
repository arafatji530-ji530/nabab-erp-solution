/**
 * HR - Exit Management & Offboarding
 * EXPERT: Senior React Engineer (Process Automation)
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
  Checkbox,
} from '@fluentui/react-components';
import { PersonDelete20Regular, Checkmark20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const EXITS = [
  {
    id: '1',
    employee: 'John Doe',
    empId: 'EMP-105',
    department: 'IT',
    lastWorkingDay: '2026-03-31',
    reason: 'Resignation',
    status: 'In Progress',
    clearanceProgress: 60,
  },
];

const CHECKLIST = [
  { id: '1', task: 'Exit Interview Completed', completed: true },
  { id: '2', task: 'Company Assets Returned', completed: true },
  { id: '3', task: 'Access Revoked', completed: false },
  { id: '4', task: 'Final Settlement Processed', completed: false },
];

export const ExitManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Exit Management & Offboarding</Title3>
          <Text>Manage employee exit process and clearances</Text>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Active Exit Processes</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Employee</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Last Working Day</TableHeaderCell>
              <TableHeaderCell>Reason</TableHeaderCell>
              <TableHeaderCell>Clearance Progress</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EXITS.map((exit) => (
              <TableRow key={exit.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={exit.employee} size={28} />
                    <div>
                      <Text weight="semibold" block>
                        {exit.employee}
                      </Text>
                      <Text size={200}>{exit.empId}</Text>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{exit.department}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(exit.lastWorkingDay)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{exit.reason}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{exit.clearanceProgress}%</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="warning">
                    {exit.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Offboarding Checklist</Title3>

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
