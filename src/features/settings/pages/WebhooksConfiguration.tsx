/**
 * Settings - Webhooks Configuration
 * EXPERT: DevOps & Compliance Engineer (Event-Driven Architecture)
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
} from '@fluentui/react-components';
import { Add20Regular, Checkmark20Regular, Dismiss20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const WEBHOOKS = [
  {
    id: '1',
    url: 'https://api.example.com/webhooks/orders',
    events: ['order.created', 'order.updated'],
    status: 'Active',
    lastTriggered: '2026-03-22 14:25:00',
    successRate: 99.5,
  },
  {
    id: '2',
    url: 'https://inventory.example.com/stock-updates',
    events: ['inventory.low_stock', 'inventory.out_of_stock'],
    status: 'Active',
    lastTriggered: '2026-03-22 10:15:00',
    successRate: 98.2,
  },
  {
    id: '3',
    url: 'https://payments.example.com/notifications',
    events: ['payment.received', 'payment.failed'],
    status: 'Paused',
    lastTriggered: '2026-03-20 16:30:00',
    successRate: 95.8,
  },
];

export const WebhooksConfiguration = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Webhooks Configuration</Title3>
          <Text>Configure webhooks for real-time event notifications</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Webhook
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Configured Webhooks</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Endpoint URL</TableHeaderCell>
              <TableHeaderCell>Events</TableHeaderCell>
              <TableHeaderCell>Last Triggered</TableHeaderCell>
              <TableHeaderCell>Success Rate</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WEBHOOKS.map((webhook) => (
              <TableRow key={webhook.id}>
                <TableCell>
                  <Text size={300} style={{ fontFamily: 'monospace' }}>
                    {webhook.url}
                  </Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
                    {webhook.events.map((event) => (
                      <Badge key={event} appearance="outline" size="small">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{webhook.lastTriggered}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    {webhook.successRate >= 98 ? (
                      <Checkmark20Regular style={{ color: tokens.colorPaletteGreenForeground1 }} />
                    ) : (
                      <Dismiss20Regular style={{ color: tokens.colorPaletteRedForeground1 }} />
                    )}
                    <Text weight="semibold">{webhook.successRate}%</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Switch checked={webhook.status === 'Active'} />
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small">
                      Edit
                    </Button>
                    <Button appearance="subtle" size="small">
                      Test
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Available Events</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Order Events
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• order.created</Text>
              <Text size={300}>• order.updated</Text>
              <Text size={300}>• order.cancelled</Text>
              <Text size={300}>• order.shipped</Text>
              <Text size={300}>• order.delivered</Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Payment Events
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• payment.received</Text>
              <Text size={300}>• payment.failed</Text>
              <Text size={300}>• payment.refunded</Text>
              <Text size={300}>• invoice.paid</Text>
              <Text size={300}>• invoice.overdue</Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Inventory Events
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• inventory.low_stock</Text>
              <Text size={300}>• inventory.out_of_stock</Text>
              <Text size={300}>• inventory.restocked</Text>
              <Text size={300}>• product.created</Text>
              <Text size={300}>• product.updated</Text>
            </div>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Webhook Logs</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Total Deliveries (Today)
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
              1,842
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Successful
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              1,826
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Failed
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteRedForeground1 }}>
              16
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Avg Response Time
            </Text>
            <Text size={500} weight="bold">
              245ms
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};
