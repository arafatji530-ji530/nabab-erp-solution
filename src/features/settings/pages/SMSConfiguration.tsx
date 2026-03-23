/**
 * Settings - SMS Configuration
 * EXPERT: DevOps & Compliance Engineer (Notification Services)
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
  Input,
  Dropdown,
  Option,
  Switch,
  Checkbox,
  Textarea,
} from '@fluentui/react-components';
import { Save20Regular, Send20Regular } from '@fluentui/react-icons';

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

export const SMSConfiguration = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>SMS Configuration</Title3>
        <Text>Configure SMS gateway and notification settings</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>SMS Gateway Settings</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">SMS Provider</Text>
            <Dropdown placeholder="Select provider" defaultValue="Twilio">
              <Option>Twilio</Option>
              <Option>Clickatell</Option>
              <Option>Plivo</Option>
              <Option>MessageBird</Option>
              <Option>Custom Gateway</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">API Key / Account SID</Text>
            <Input placeholder="Enter API key" type="password" />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Auth Token</Text>
            <Input placeholder="Enter auth token" type="password" />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Sender ID / Phone Number</Text>
            <Input placeholder="+880 1XXX-XXXXXX or SENDER_ID" value="+880 1711-123456" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Enable SMS Notifications
              </Text>
              <Text size={300}>Send automated SMS notifications</Text>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Notification Triggers</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
          <Text weight="semibold">Send SMS for:</Text>

          <Checkbox label="Order Confirmation" defaultChecked />
          <Checkbox label="Payment Received" defaultChecked />
          <Checkbox label="Shipment Updates" defaultChecked />
          <Checkbox label="Delivery Confirmation" />
          <Checkbox label="Low Stock Alerts" defaultChecked />
          <Checkbox label="Password Reset" defaultChecked />
          <Checkbox label="Account Verification" defaultChecked />
          <Checkbox label="Appointment Reminders" />
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>SMS Templates</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Order Confirmation Template</Text>
            <Textarea
              placeholder="Enter SMS template"
              rows={3}
              value="Dear {customer_name}, your order #{order_id} has been confirmed. Total: {amount}. Track: {tracking_link}"
            />
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Available variables: {'{customer_name}'}, {'{order_id}'}, {'{amount}'}, {'{tracking_link}'}
            </Text>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Payment Confirmation Template</Text>
            <Textarea
              placeholder="Enter SMS template"
              rows={3}
              value="Payment of {amount} received for invoice #{invoice_id}. Thank you for your business!"
            />
          </div>

          <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
            <Button appearance="subtle" icon={<Send20Regular />} size="small">
              Send Test SMS
            </Button>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Usage Limits</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Daily SMS Limit</Text>
            <Input placeholder="Enter limit" type="number" value="500" />
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Maximum SMS messages per day
            </Text>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Monthly Budget (BDT)</Text>
            <Input placeholder="Enter budget" type="number" value="50000" />
          </div>

          <div
            style={{
              ...shorthands.padding(tokens.spacingVerticalM),
              backgroundColor: tokens.colorNeutralBackground3,
              ...shorthands.borderRadius(tokens.borderRadiusMedium),
            } as React.CSSProperties}
          >
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Current Usage (March 2026)
            </Text>
            <Text>SMS Sent: 1,245 / 15,000 monthly limit</Text>
            <Text block>Cost: ৳12,450 / ৳50,000 budget</Text>
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
        <Button appearance="primary" icon={<Save20Regular />}>
          Save Configuration
        </Button>
        <Button appearance="subtle">Test Connection</Button>
      </div>
    </div>
  );
};
