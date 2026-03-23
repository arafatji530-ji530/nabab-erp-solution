/**
 * CRM - Activity Timeline
 * EXPERT: UI/UX Designer (Activity Tracking)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Title3,
  Text,
  Card,
  Avatar,
  Badge,
} from '@fluentui/react-components';
import { Call20Regular, Mail20Regular, MeetNow20Regular, Document20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  timelineItem: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderLeft('3px', 'solid', tokens.colorBrandForeground1),
    paddingLeft: tokens.spacingHorizontalL,
  },
});

const ACTIVITIES = [
  { id: '1', type: 'Meeting', title: 'Client Meeting - ABC Corp', user: 'John Doe', date: '2026-03-20 14:30', notes: 'Discussed project requirements' },
  { id: '2', type: 'Call', title: 'Follow-up call with XYZ Ltd', user: 'Jane Smith', date: '2026-03-20 11:00', notes: 'Confirmed delivery schedule' },
  { id: '3', type: 'Email', title: 'Proposal sent to Tech Solutions', user: 'Mike Johnson', date: '2026-03-19 16:45', notes: 'Sent detailed proposal' },
  { id: '4', type: 'Document', title: 'Contract signed - Retail Store', user: 'Sarah Lee', date: '2026-03-18 10:00', notes: '1-year maintenance contract' },
];

export const ActivityTimeline = () => {
  const classes = useStyles();

  const getIcon = (type: string) => {
    switch (type) {
      case 'Call':
        return <Call20Regular style={{ color: tokens.colorPaletteGreenForeground1 }} />;
      case 'Email':
        return <Mail20Regular style={{ color: tokens.colorPaletteBlueForeground2 }} />;
      case 'Meeting':
        return <MeetNow20Regular style={{ color: tokens.colorPaletteDarkOrangeForeground1 }} />;
      case 'Document':
        return <Document20Regular style={{ color: tokens.colorPaletteRedForeground1 }} />;
      default:
        return null;
    }
  };

  return (
    <div className={classes.container}>
      <div>
        <Title3>Activity Timeline</Title3>
        <Text>Chronological view of customer interactions and activities</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div className={classes.timeline}>
          {ACTIVITIES.map((activity) => (
            <div key={activity.id} className={classes.timelineItem}>
              <div style={{ marginTop: tokens.spacingVerticalXS }}>{getIcon(activity.type)}</div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalXS }}>
                  <Badge appearance="tint">{activity.type}</Badge>
                  <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
                    {activity.date}
                  </Text>
                </div>

                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                  {activity.title}
                </Text>

                <Text size={300} block style={{ marginBottom: tokens.spacingVerticalS, color: tokens.colorNeutralForeground3 }}>
                  {activity.notes}
                </Text>

                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                  <Avatar name={activity.user} size={20} />
                  <Text size={200}>{activity.user}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
