/**
 * POS - Shift Management
 * EXPERT: Enterprise Solution Architect (Workforce Scheduling)
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
import { Add20Regular, Clock20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const SHIFTS = [
  { id: '1', name: 'Morning Shift', startTime: '08:00', endTime: '14:00', cashier: 'John Doe', terminal: 'Terminal 1', status: 'Active' },
  { id: '2', name: 'Afternoon Shift', startTime: '14:00', endTime: '20:00', cashier: 'Jane Smith', terminal: 'Terminal 2', status: 'Active' },
  { id: '3', name: 'Evening Shift', startTime: '20:00', endTime: '23:00', cashier: 'Not Assigned', terminal: '-', status: 'Scheduled' },
];

export const POSShiftManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>POS Shift Management</Title3>
          <Text>Manage cashier shifts and terminal assignments</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Shift
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Today's Shifts</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Shift Name</TableHeaderCell>
              <TableHeaderCell>Start Time</TableHeaderCell>
              <TableHeaderCell>End Time</TableHeaderCell>
              <TableHeaderCell>Duration</TableHeaderCell>
              <TableHeaderCell>Cashier</TableHeaderCell>
              <TableHeaderCell>Terminal</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SHIFTS.map((shift) => {
              const duration = `${parseInt(shift.endTime) - parseInt(shift.startTime)} hours`;
              return (
                <TableRow key={shift.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <Clock20Regular />
                      <Text weight="semibold">{shift.name}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text>{shift.startTime}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{shift.endTime}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{duration}</Text>
                  </TableCell>
                  <TableCell>
                    {shift.cashier !== 'Not Assigned' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                        <Avatar name={shift.cashier} size={24} />
                        <Text>{shift.cashier}</Text>
                      </div>
                    ) : (
                      <Text style={{ color: tokens.colorNeutralForeground3 }}>{shift.cashier}</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    <Text>{shift.terminal}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={shift.status === 'Active' ? 'success' : shift.status === 'Scheduled' ? 'brand' : 'subtle'}>
                      {shift.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button appearance="subtle" size="small">
                      {shift.status === 'Scheduled' ? 'Assign Cashier' : 'View Details'}
                    </Button>
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
