/**
 * HR - Employee Self-Service Portal
 * EXPERT: UI/UX Designer (Employee Experience)
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
  Avatar,
  Badge,
} from '@fluentui/react-components';
import {
  DocumentText20Regular,
  Calendar20Regular,
  Money20Regular,
  Person20Regular,
  DocumentPdf20Regular,
  Mail20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  actionCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    textAlign: 'center',
    cursor: 'pointer',
    ':hover': {
      boxShadow: tokens.shadow8,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
});

export const EmployeeSelfService = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Employee Self-Service Portal</Title3>
        <Text>Access your personal information and submit requests</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalXL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalL, alignItems: 'center' }}>
          <Avatar name="Ahmed Hassan" size={96} />
          <div>
            <Title3>Ahmed Hassan</Title3>
            <Text size={400}>Senior Sales Executive</Text>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalM }}>
              <Badge appearance="tint" color="brand">
                EMP-001
              </Badge>
              <Badge appearance="tint" color="success">
                Sales Department
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className={classes.quickActionsGrid}>
        <Card className={classes.actionCard}>
          <Calendar20Regular style={{ fontSize: '48px', color: tokens.colorBrandForeground1 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            Apply for Leave
          </Text>
        </Card>

        <Card className={classes.actionCard}>
          <DocumentText20Regular style={{ fontSize: '48px', color: tokens.colorPaletteGreenForeground1 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            Submit Expense
          </Text>
        </Card>

        <Card className={classes.actionCard}>
          <Money20Regular style={{ fontSize: '48px', color: tokens.colorPaletteBlueForeground2 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            View Payslips
          </Text>
        </Card>

        <Card className={classes.actionCard}>
          <Person20Regular style={{ fontSize: '48px', color: tokens.colorPaletteYellowForeground1 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            Update Profile
          </Text>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Leave Balance</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { type: 'Annual Leave', available: 12, used: 8 },
              { type: 'Sick Leave', available: 7, used: 2 },
              { type: 'Casual Leave', available: 5, used: 3 },
            ].map((leave) => (
              <div
                key={leave.type}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
              >
                <Text>{leave.type}</Text>
                <Text weight="semibold">
                  {leave.available - leave.used} / {leave.available}
                </Text>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Documents</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            {['Employment Contract', 'ID Card', 'Tax Certificate', 'Last Payslip'].map((doc) => (
              <div
                key={doc}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                  <DocumentPdf20Regular />
                  <Text size={300}>{doc}</Text>
                </div>
                <Button appearance="subtle" size="small">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
