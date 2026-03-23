/**
 * CRM - Email Marketing Campaigns
 * EXPERT: DevOps & Marketing Automation Engineer
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
  Input,
  Label,
  Textarea,
  Dropdown,
  Option,
  ProgressBar,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components';
import { Add20Regular, Send20Regular, Eye20Regular, DataLine20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
  },
  formCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalM,
  },
});

const CAMPAIGNS = [
  {
    id: '1',
    name: 'Spring Sale 2026',
    subject: '30% Off All Products!',
    sent: 5000,
    opened: 2250,
    clicked: 450,
    status: 'Sent',
    date: '2026-03-20',
  },
  {
    id: '2',
    name: 'New Product Launch',
    subject: 'Introducing Our Latest Innovation',
    sent: 3500,
    opened: 1800,
    clicked: 320,
    status: 'Sent',
    date: '2026-03-18',
  },
  {
    id: '3',
    name: 'Customer Appreciation',
    subject: 'Thank You for Your Loyalty',
    sent: 0,
    opened: 0,
    clicked: 0,
    status: 'Draft',
    date: '2026-03-25',
  },
  {
    id: '4',
    name: 'Weekly Newsletter',
    subject: 'This Week in Industry News',
    sent: 8000,
    opened: 3200,
    clicked: 640,
    status: 'Scheduled',
    date: '2026-03-27',
  },
];

export const EmailCampaigns = () => {
  const classes = useStyles();

  const totalSent = CAMPAIGNS.filter((c) => c.status === 'Sent').reduce((sum, c) => sum + c.sent, 0);
  const totalOpened = CAMPAIGNS.filter((c) => c.status === 'Sent').reduce((sum, c) => sum + c.opened, 0);
  const totalClicked = CAMPAIGNS.filter((c) => c.status === 'Sent').reduce((sum, c) => sum + c.clicked, 0);
  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0;
  const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : 0;

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Email Marketing Campaigns</Title3>
          <Text>Create and manage email marketing campaigns</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Campaign
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Sent
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalSent.toLocaleString()}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Open Rate
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {openRate}%
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Click Rate
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {clickRate}%
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Active Campaigns
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {CAMPAIGNS.filter((c) => c.status === 'Scheduled').length}
          </Text>
        </Card>
      </div>

      <Card className={classes.formCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Create New Campaign</Title3>

        <div className={classes.formGroup}>
          <Label required>Campaign Name</Label>
          <Input placeholder="e.g., Summer Sale 2026" />
        </div>

        <div className={classes.formGroup}>
          <Label required>Email Subject</Label>
          <Input placeholder="Write a compelling subject line..." />
        </div>

        <div className={classes.formGroup}>
          <Label required>Recipient Segment</Label>
          <Dropdown placeholder="Select customer segment">
            <Option value="all">All Customers</Option>
            <Option value="active">Active Customers</Option>
            <Option value="inactive">Inactive Customers</Option>
            <Option value="vip">VIP Customers</Option>
            <Option value="recent">Recent Purchasers</Option>
          </Dropdown>
        </div>

        <div className={classes.formGroup}>
          <Label required>Email Template</Label>
          <Dropdown placeholder="Select template">
            <Option value="promo">Promotional</Option>
            <Option value="newsletter">Newsletter</Option>
            <Option value="product">Product Announcement</Option>
            <Option value="event">Event Invitation</Option>
          </Dropdown>
        </div>

        <div className={classes.formGroup}>
          <Label required>Email Content</Label>
          <Textarea rows={6} placeholder="Compose your email message..." />
        </div>

        <div className={classes.formGroup}>
          <Label>Schedule Date & Time</Label>
          <Input type="datetime-local" />
        </div>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalL }}>
          <Button appearance="secondary" icon={<Eye20Regular />}>
            Preview
          </Button>
          <Button appearance="secondary">Save Draft</Button>
          <Button appearance="primary" icon={<Send20Regular />}>
            Send Now
          </Button>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Campaign Performance</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Campaign</TableHeaderCell>
              <TableHeaderCell>Subject</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Sent</TableHeaderCell>
              <TableHeaderCell>Opened</TableHeaderCell>
              <TableHeaderCell>Clicked</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CAMPAIGNS.map((campaign) => {
              const openRate = campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : 0;
              const clickRate = campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : 0;

              return (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <Text weight="semibold">{campaign.name}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{campaign.subject}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{formatDate(campaign.date)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{campaign.sent.toLocaleString()}</Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text block>{campaign.opened.toLocaleString()}</Text>
                      {campaign.sent > 0 && (
                        <Text size={200} style={{ color: tokens.colorPaletteGreenForeground1 }}>
                          {openRate}%
                        </Text>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text block>{campaign.clicked.toLocaleString()}</Text>
                      {campaign.sent > 0 && (
                        <Text size={200} style={{ color: tokens.colorPaletteBlueForeground2 }}>
                          {clickRate}%
                        </Text>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={
                        campaign.status === 'Sent'
                          ? 'success'
                          : campaign.status === 'Scheduled'
                            ? 'brand'
                            : 'subtle'
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                      <Button appearance="subtle" size="small" icon={<DataLine20Regular />}>
                        Analytics
                      </Button>
                      {campaign.status === 'Draft' && (
                        <Button appearance="primary" size="small" icon={<Send20Regular />}>
                          Send
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
