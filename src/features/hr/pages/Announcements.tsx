/**
 * HR - Announcements & Communications
 * EXPERT: UI/UX Designer (Internal Communications)
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
import { Add20Regular, Megaphone20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'Company Holiday - Eid ul-Fitr',
    content: 'Office will be closed from April 10-12, 2026',
    author: 'HR Manager',
    date: '2026-03-20',
    priority: 'High',
  },
  {
    id: '2',
    title: 'New Health Insurance Policy',
    content: 'Updated health insurance benefits are now available',
    author: 'HR Team',
    date: '2026-03-18',
    priority: 'Medium',
  },
];

export const Announcements = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Announcements & Communications</Title3>
          <Text>Company-wide announcements and updates</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Announcement
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
        {ANNOUNCEMENTS.map((announcement) => (
          <Card key={announcement.id} style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalM }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                <Megaphone20Regular style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />
                <Title3>{announcement.title}</Title3>
              </div>
              <Badge appearance="tint" color={announcement.priority === 'High' ? 'danger' : 'warning'}>
                {announcement.priority}
              </Badge>
            </div>

            <Text block style={{ marginBottom: tokens.spacingVerticalM }}>
              {announcement.content}
            </Text>

            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Avatar name={announcement.author} size={24} />
              <Text size={300}>{announcement.author}</Text>
              <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
                • {formatDate(announcement.date)}
              </Text>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
