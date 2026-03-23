/**
 * HR - Shift Scheduling
 * EXPERT: SaaS Platform Architect (Workforce Management)
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
  Avatar,
} from '@fluentui/react-components';
import { Add20Regular, CalendarLtr20Regular, People20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  scheduleGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto repeat(7, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
  headerCell: {
    ...shorthands.padding(tokens.spacingVerticalM),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  shiftCell: {
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground3,
    minHeight: '80px',
  },
});

export const ShiftScheduling = () => {
  const classes = useStyles();

  const SHIFTS = [
    { id: '1', name: 'Morning Shift', time: '9:00 AM - 5:00 PM', color: tokens.colorPaletteGreenBackground2 },
    { id: '2', name: 'Evening Shift', time: '2:00 PM - 10:00 PM', color: tokens.colorPaletteBlueBackground2 },
    { id: '3', name: 'Night Shift', time: '10:00 PM - 6:00 AM', color: tokens.colorPalettePurpleBackground2 },
  ];

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Shift Scheduling</Title3>
          <Text>Manage employee work schedules and shifts</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<People20Regular />}>
            Manage Shifts
          </Button>
          <Button appearance="primary" icon={<Add20Regular />}>
            Create Schedule
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacingHorizontalL }}>
        {SHIFTS.map((shift) => (
          <Card key={shift.id} style={{ ...shorthands.padding(tokens.spacingVerticalL), backgroundColor: shift.color } as React.CSSProperties}>
            <Text weight="semibold" size={400} block>
              {shift.name}
            </Text>
            <Text size={300}>{shift.time}</Text>
            <div style={{ marginTop: tokens.spacingVerticalM }}>
              <Text size={200}>Assigned: 12 employees</Text>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
          <Title3>Weekly Schedule</Title3>
          <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
            <Button appearance="subtle" size="small">
              Previous Week
            </Button>
            <Button appearance="subtle" size="small">
              Next Week
            </Button>
          </div>
        </div>

        <div className={classes.scheduleGrid}>
          <div className={classes.headerCell}>Employee</div>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className={classes.headerCell}>
              {day}
            </div>
          ))}

          {['Ahmed Hassan', 'Fatima Rahman', 'Karim Ali'].map((emp, idx) => (
            <>
              <div key={emp} style={{ ...shorthands.padding(tokens.spacingVerticalM), display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS } as React.CSSProperties}>
                <Avatar name={emp} size={24} />
                <Text size={300}>{emp}</Text>
              </div>
              {[...Array(7)].map((_, dayIdx) => (
                <div key={`${idx}-${dayIdx}`} className={classes.shiftCell} style={{ backgroundColor: SHIFTS[idx % 3].color }}>
                  <Text size={200} weight="semibold" block>
                    {SHIFTS[idx % 3].name}
                  </Text>
                  <Text size={200}>{SHIFTS[idx % 3].time}</Text>
                </div>
              ))}
            </>
          ))}
        </div>
      </Card>
    </div>
  );
};
