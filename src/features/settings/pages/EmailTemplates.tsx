/**
 * Settings - Email Template Builder
 * EXPERT: UI/UX Designer (Communication Templates)
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
  Input,
  Label,
  Textarea,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { Add20Regular, Edit20Regular, Delete20Regular, Eye20Regular, Save20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  editorGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  editorPanel: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  previewPanel: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    backgroundColor: tokens.colorNeutralBackground2,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalM,
  },
});

const TEMPLATES = [
  {
    id: '1',
    name: 'Invoice Email',
    subject: 'Your Invoice #{invoice_number}',
    category: 'Sales',
    status: 'Active',
    lastModified: '2026-03-20',
  },
  {
    id: '2',
    name: 'Welcome Email',
    subject: 'Welcome to Nabab ERP',
    category: 'Customer',
    status: 'Active',
    lastModified: '2026-03-18',
  },
  {
    id: '3',
    name: 'Password Reset',
    subject: 'Reset Your Password',
    category: 'System',
    status: 'Active',
    lastModified: '2026-03-15',
  },
  {
    id: '4',
    name: 'Payment Reminder',
    subject: 'Payment Due Reminder',
    category: 'Finance',
    status: 'Draft',
    lastModified: '2026-03-25',
  },
];

export const EmailTemplates = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Email Template Builder</Title3>
          <Text>Create and customize email templates</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Template
        </Button>
      </div>

      <div className={classes.editorGrid}>
        <Card className={classes.editorPanel}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Template Editor</Title3>

          <div className={classes.formGroup}>
            <Label required>Template Name</Label>
            <Input placeholder="e.g., Invoice Email" />
          </div>

          <div className={classes.formGroup}>
            <Label required>Category</Label>
            <Dropdown placeholder="Select category">
              <Option value="sales">Sales</Option>
              <Option value="customer">Customer</Option>
              <Option value="hr">Human Resources</Option>
              <Option value="finance">Finance</Option>
              <Option value="system">System</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Email Subject</Label>
            <Input placeholder="Subject line with variables" />
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Use variables: {'{'}customer_name{'}'}, {'{'}invoice_number{'}'}, {'{'}date{'}'}
            </Text>
          </div>

          <div className={classes.formGroup}>
            <Label required>Email Body</Label>
            <Textarea rows={12} placeholder="Compose your email template..." />
          </div>

          <div className={classes.formGroup}>
            <Label>Available Variables</Label>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                backgroundColor: tokens.colorNeutralBackground3,
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
              } as React.CSSProperties}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXS }}>
                {[
                  '{customer_name}',
                  '{company_name}',
                  '{invoice_number}',
                  '{amount}',
                  '{date}',
                  '{due_date}',
                ].map((variable, idx) => (
                  <Badge key={idx} appearance="tint" color="informative" size="small">
                    {variable}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalL }}>
            <Button appearance="secondary">Cancel</Button>
            <Button appearance="secondary" icon={<Eye20Regular />}>
              Preview
            </Button>
            <Button appearance="primary" icon={<Save20Regular />}>
              Save Template
            </Button>
          </div>
        </Card>

        <Card className={classes.previewPanel}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Preview</Title3>

          <div
            style={{
              ...shorthands.padding(tokens.spacingVerticalXL),
              backgroundColor: tokens.colorNeutralBackground1,
              ...shorthands.borderRadius(tokens.borderRadiusMedium),
              ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
            } as React.CSSProperties}
          >
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                ...shorthands.borderBottom('2px', 'solid', tokens.colorNeutralStroke2),
                marginBottom: tokens.spacingVerticalL,
              } as React.CSSProperties}
            >
              <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>
                From: no-reply@nababerp.com
              </Text>
              <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>
                To: customer@example.com
              </Text>
              <Text size={400} weight="bold" block style={{ marginTop: tokens.spacingVerticalM }}>
                Subject: Your Invoice #INV-2026-001
              </Text>
            </div>

            <div style={{ lineHeight: '1.6' }}>
              <Text block>Dear [Customer Name],</Text>
              <br />
              <Text block>Thank you for your business. Please find your invoice attached.</Text>
              <br />
              <Text block>Invoice Number: INV-2026-001</Text>
              <Text block>Amount: BDT 125,000</Text>
              <Text block>Due Date: April 15, 2026</Text>
              <br />
              <Text block>Please make payment by the due date to avoid any late fees.</Text>
              <br />
              <Text block>Best regards,</Text>
              <Text block>Nabab ERP Team</Text>
            </div>
          </div>

          <div style={{ marginTop: tokens.spacingVerticalXL }}>
            <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Template Options</Title3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
              <div className={classes.formGroup}>
                <Label>Attach PDF</Label>
                <Dropdown defaultValue="yes">
                  <Option value="yes">Yes, automatically attach PDF</Option>
                  <Option value="no">No attachment</Option>
                </Dropdown>
              </div>

              <div className={classes.formGroup}>
                <Label>Send Copy To</Label>
                <Input placeholder="email@example.com (optional)" />
              </div>

              <div className={classes.formGroup}>
                <Label>Reply-To Email</Label>
                <Input placeholder="support@nababerp.com" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Saved Templates</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Template Name</TableHeaderCell>
              <TableHeaderCell>Subject</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Last Modified</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEMPLATES.map((template) => (
              <TableRow key={template.id}>
                <TableCell>
                  <Text weight="semibold">{template.name}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{template.subject}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{template.category}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(template.lastModified)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={template.status === 'Active' ? 'success' : 'warning'}>
                    {template.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<Edit20Regular />} />
                    <Button appearance="subtle" size="small" icon={<Eye20Regular />} />
                    <Button appearance="subtle" size="small" icon={<Delete20Regular />} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
