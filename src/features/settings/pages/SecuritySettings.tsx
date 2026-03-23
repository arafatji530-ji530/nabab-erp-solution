/**
 * Settings - Security Settings
 * EXPERT: DevOps & Compliance Engineer (Security & Compliance)
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
  Switch,
  Input,
  Dropdown,
  Option,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from '@fluentui/react-components';
import { Shield20Regular, LockClosed20Regular, Save20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
});

const SECURITY_LOGS = [
  { id: '1', event: 'Failed Login Attempt', user: 'admin@nabab.com', ip: '192.168.1.105', time: '2026-03-22 14:25:00', severity: 'Warning' },
  { id: '2', event: 'Password Changed', user: 'manager@nabab.com', ip: '192.168.1.88', time: '2026-03-22 10:15:00', severity: 'Info' },
  { id: '3', event: 'Multiple Failed Attempts', user: 'unknown@email.com', ip: '45.123.67.89', time: '2026-03-22 03:45:00', severity: 'Critical' },
  { id: '4', event: 'API Key Created', user: 'dev@nabab.com', ip: '192.168.1.92', time: '2026-03-21 16:30:00', severity: 'Info' },
];

export const SecuritySettings = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <Shield20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
        <div>
          <Title3>Security Settings</Title3>
          <Text>Configure security policies and authentication settings</Text>
        </div>
      </div>

      <Card
        style={{
          ...shorthands.padding(tokens.spacingVerticalL),
          backgroundColor: tokens.colorPaletteGreenBackground2,
          ...shorthands.border('1px', 'solid', tokens.colorPaletteGreenBorder2),
        } as React.CSSProperties}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
          <Shield20Regular style={{ fontSize: '32px', color: tokens.colorPaletteGreenForeground1 }} />
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Security Status: Protected
            </Text>
            <Text size={300}>
              2FA enabled • SSL active • Firewall configured • Last security audit: March 15, 2026
            </Text>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Authentication Settings</Title3>

        <div className={classes.formSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Two-Factor Authentication (2FA)
              </Text>
              <Text size={300}>Require 2FA for all users</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Single Sign-On (SSO)
              </Text>
              <Text size={300}>Enable login via Google/Microsoft</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Session Timeout</Text>
            <Dropdown placeholder="Select timeout" defaultValue="30 minutes">
              <Option>15 minutes</Option>
              <Option>30 minutes</Option>
              <Option>1 hour</Option>
              <Option>2 hours</Option>
              <Option>4 hours</Option>
              <Option>Never</Option>
            </Dropdown>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Auto logout users after inactivity
            </Text>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Maximum Login Attempts</Text>
            <Input placeholder="Enter max attempts" type="number" value="5" />
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Lock account after failed attempts
            </Text>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Account Lockout Duration</Text>
            <Input placeholder="Enter duration (minutes)" type="number" value="30" />
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Minutes to lock account after max failed attempts
            </Text>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Password Policy</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Minimum Password Length</Text>
            <Input placeholder="Enter minimum length" type="number" value="8" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Require Uppercase Letters
              </Text>
              <Text size={300}>Password must contain A-Z</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Require Numbers
              </Text>
              <Text size={300}>Password must contain 0-9</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Require Special Characters
              </Text>
              <Text size={300}>Password must contain !@#$%^&*</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Password Expiration</Text>
            <Dropdown placeholder="Select expiration" defaultValue="90 days">
              <Option>30 days</Option>
              <Option>60 days</Option>
              <Option>90 days</Option>
              <Option>180 days</Option>
              <Option>Never expire</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Password History</Text>
            <Input placeholder="Prevent reuse of last N passwords" type="number" value="5" />
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Users cannot reuse their last 5 passwords
            </Text>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>IP Restrictions</Title3>

        <div className={classes.formSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Enable IP Whitelisting
              </Text>
              <Text size={300}>Allow access only from specific IPs</Text>
            </div>
            <Switch />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Allowed IP Addresses</Text>
            <Input placeholder="Enter IP address (e.g., 192.168.1.0/24)" value="192.168.1.0/24" />
            <Button appearance="subtle" size="small">
              Add IP Range
            </Button>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Security Logs</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Event</TableHeaderCell>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>IP Address</TableHeaderCell>
              <TableHeaderCell>Time</TableHeaderCell>
              <TableHeaderCell>Severity</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SECURITY_LOGS.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Text weight="semibold">{log.event}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{log.user}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300} style={{ fontFamily: 'monospace' }}>
                    {log.ip}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{log.time}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={log.severity === 'Critical' ? 'danger' : log.severity === 'Warning' ? 'warning' : 'brand'}
                  >
                    {log.severity}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Button appearance="primary" icon={<Save20Regular />}>
        Save Security Settings
      </Button>
    </div>
  );
};
