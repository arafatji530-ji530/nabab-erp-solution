/**
 * Settings - Workflow Automation
 * EXPERT: SaaS Platform Architect (Business Process Automation)
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
import { Add20Regular, Flowchart20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const WORKFLOWS = [
  {
    id: '1',
    name: 'Auto-approve orders under $500',
    trigger: 'Order Created',
    condition: 'Amount < $500',
    action: 'Auto-approve & notify',
    enabled: true,
    executions: 1245,
  },
  {
    id: '2',
    name: 'Send low stock alerts',
    trigger: 'Stock Level Changed',
    condition: 'Quantity < Reorder Point',
    action: 'Email + SMS to manager',
    enabled: true,
    executions: 87,
  },
  {
    id: '3',
    name: 'Customer payment reminder',
    trigger: 'Invoice Due Date - 3 days',
    condition: 'Invoice Unpaid',
    action: 'Send reminder email',
    enabled: true,
    executions: 342,
  },
  {
    id: '4',
    name: 'New employee onboarding',
    trigger: 'Employee Created',
    condition: 'Status = Active',
    action: 'Send welcome email + assign tasks',
    enabled: false,
    executions: 12,
  },
];

export const WorkflowAutomation = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
          <Flowchart20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          <div>
            <Title3>Workflow Automation</Title3>
            <Text>Automate business processes with triggers and actions</Text>
          </div>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Workflow
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Active Workflows</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Workflow Name</TableHeaderCell>
              <TableHeaderCell>Trigger</TableHeaderCell>
              <TableHeaderCell>Condition</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
              <TableHeaderCell>Executions</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WORKFLOWS.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell>
                  <Text weight="semibold">{workflow.name}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{workflow.trigger}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300} style={{ fontFamily: 'monospace' }}>
                    {workflow.condition}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{workflow.action}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{workflow.executions.toLocaleString()}</Text>
                </TableCell>
                <TableCell>
                  <Switch checked={workflow.enabled} />
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Available Triggers</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Sales Triggers
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• Order Created</Text>
              <Text size={300}>• Order Shipped</Text>
              <Text size={300}>• Payment Received</Text>
              <Text size={300}>• Invoice Overdue</Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Inventory Triggers
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• Stock Level Changed</Text>
              <Text size={300}>• Low Stock Alert</Text>
              <Text size={300}>• Product Created</Text>
              <Text size={300}>• Stock Transfer</Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              HR Triggers
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• Employee Created</Text>
              <Text size={300}>• Leave Requested</Text>
              <Text size={300}>• Attendance Marked</Text>
              <Text size={300}>• Performance Review</Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Time Triggers
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300}>• Daily at Time</Text>
              <Text size={300}>• Weekly on Day</Text>
              <Text size={300}>• Monthly on Date</Text>
              <Text size={300}>• Before/After Event</Text>
            </div>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Automation Statistics</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Active Workflows
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
              3
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Total Executions (Today)
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              142
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Success Rate
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              99.3%
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Time Saved (Hours)
            </Text>
            <Text size={500} weight="bold">
              38.5
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};
