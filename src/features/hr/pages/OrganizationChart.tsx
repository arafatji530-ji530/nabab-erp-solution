/**
 * HR - Organization Chart
 * EXPERT: UI/UX Designer (Hierarchical Visualization)
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
import { Organization20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  orgChart: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  level: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXL),
    justifyContent: 'center',
  },
  employeeCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
    minWidth: '180px',
  },
});

export const OrganizationChart = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Organization Chart</Title3>
        <Text>Visual hierarchy of company structure</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalXXL) } as React.CSSProperties}>
        <div className={classes.orgChart}>
          {/* CEO Level */}
          <Card className={classes.employeeCard}>
            <Avatar name="CEO Name" size={64} />
            <Text weight="bold" block style={{ marginTop: tokens.spacingVerticalM }}>
              CEO Name
            </Text>
            <Text size={300}>Chief Executive Officer</Text>
            <Badge appearance="tint" color="important" style={{ marginTop: tokens.spacingVerticalS }}>
              Executive
            </Badge>
          </Card>

          {/* Department Heads */}
          <div className={classes.level}>
            {['Sales Manager', 'Finance Manager', 'HR Manager'].map((title) => (
              <Card key={title} className={classes.employeeCard}>
                <Avatar name={title} size={48} />
                <Text weight="semibold" block style={{ marginTop: tokens.spacingVerticalS }}>
                  {title}
                </Text>
                <Badge appearance="tint" color="brand" size="small">
                  Manager
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
