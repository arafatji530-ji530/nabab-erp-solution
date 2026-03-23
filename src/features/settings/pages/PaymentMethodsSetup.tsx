/**
 * Settings - Payment Methods Setup
 * EXPERT: DevOps & Compliance Engineer (Payment Integration)
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
  Switch,
  Input,
} from '@fluentui/react-components';
import { Add20Regular, Payment20Regular, Save20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const PAYMENT_METHODS = [
  { id: '1', name: 'Cash', icon: '💵', enabled: true, feePercent: 0, processingTime: 'Instant' },
  { id: '2', name: 'Credit/Debit Card', icon: '💳', enabled: true, feePercent: 2.5, processingTime: 'Instant' },
  { id: '3', name: 'Bank Transfer', icon: '🏦', enabled: true, feePercent: 0.5, processingTime: '1-2 days' },
  { id: '4', name: 'bKash', icon: '📱', enabled: true, feePercent: 1.85, processingTime: 'Instant' },
  { id: '5', name: 'Nagad', icon: '📱', enabled: true, feePercent: 1.5, processingTime: 'Instant' },
  { id: '6', name: 'Rocket', icon: '🚀', enabled: false, feePercent: 1.8, processingTime: 'Instant' },
];

export const PaymentMethodsSetup = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
          <Payment20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          <div>
            <Title3>Payment Methods Setup</Title3>
            <Text>Configure available payment methods and gateway settings</Text>
          </div>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Payment Method
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Available Payment Methods</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Payment Method</TableHeaderCell>
              <TableHeaderCell>Transaction Fee</TableHeaderCell>
              <TableHeaderCell>Processing Time</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PAYMENT_METHODS.map((method) => (
              <TableRow key={method.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <span style={{ fontSize: '24px' }}>{method.icon}</span>
                    <Text weight="semibold">{method.name}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{method.feePercent}%</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{method.processingTime}</Text>
                </TableCell>
                <TableCell>
                  <Switch checked={method.enabled} />
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    Configure
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Payment Gateway Configuration</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            <Text weight="semibold">Merchant ID</Text>
            <Input placeholder="Enter merchant ID" type="password" value="merchant_123456" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            <Text weight="semibold">API Key</Text>
            <Input placeholder="Enter API key" type="password" value="sk_live_xxxxxxxxxxxxx" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            <Text weight="semibold">Webhook Secret</Text>
            <Input placeholder="Enter webhook secret" type="password" value="whsec_xxxxxxxxxxxxx" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Test Mode
              </Text>
              <Text size={300}>Enable sandbox/test environment</Text>
            </div>
            <Switch />
          </div>

          <Button appearance="primary" icon={<Save20Regular />}>
            Save Gateway Settings
          </Button>
        </div>
      </Card>
    </div>
  );
};
