/**
 * CRM - Lead Management Page
 * Sales pipeline and lead tracking
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Title3,
  Text,
  Card,
  Badge,
  Avatar,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  Phone20Regular,
  Mail20Regular,
  ArrowRight20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  pipelineContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  pipelineColumn: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding(tokens.spacingVerticalM),
    minHeight: '600px',
  },
  columnHeader: {
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  leadCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
    marginBottom: tokens.spacingVerticalM,
    cursor: 'pointer',
    ...shorthands.transition('all', '150ms'),
    
    ':hover': {
      boxShadow: tokens.shadow4,
      transform: 'scale(1.02)',
    },
  },
  leadHeader: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginBottom: tokens.spacingVerticalS,
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    marginTop: tokens.spacingVerticalS,
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

const MOCK_LEADS = {
  new: [
    {
      id: '1',
      name: 'Acme Corporation',
      contact: 'John Doe',
      email: 'john@acme.com',
      phone: '+880-1711-123456',
      value: 250000,
      source: 'Website',
      date: '2026-03-20',
    },
    {
      id: '2',
      name: 'Tech Solutions',
      contact: 'Jane Smith',
      email: 'jane@tech.com',
      phone: '+880-1722-234567',
      value: 180000,
      source: 'Referral',
      date: '2026-03-21',
    },
  ],
  contacted: [
    {
      id: '3',
      name: 'Build Masters',
      contact: 'Mike Johnson',
      email: 'mike@build.com',
      phone: '+880-1733-345678',
      value: 420000,
      source: 'Cold Call',
      date: '2026-03-18',
    },
  ],
  qualified: [
    {
      id: '4',
      name: 'Industrial Hub',
      contact: 'Sarah Lee',
      email: 'sarah@hub.com',
      phone: '+880-1744-456789',
      value: 350000,
      source: 'Trade Show',
      date: '2026-03-15',
    },
  ],
  proposal: [
    {
      id: '5',
      name: 'Global Traders',
      contact: 'Ahmed Khan',
      email: 'ahmed@global.com',
      phone: '+880-1755-567890',
      value: 580000,
      source: 'LinkedIn',
      date: '2026-03-10',
    },
  ],
};

const STAGES = [
  { key: 'new', label: 'New Leads', color: tokens.colorPaletteBlueForeground2 },
  { key: 'contacted', label: 'Contacted', color: tokens.colorPaletteYellowForeground1 },
  { key: 'qualified', label: 'Qualified', color: tokens.colorPaletteDarkOrangeForeground1 },
  { key: 'proposal', label: 'Proposal Sent', color: tokens.colorPaletteGreenForeground1 },
];

export const LeadManagement = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Lead Management</Title3>
          <Text>Track and manage sales pipeline</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Lead
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search leads..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Dropdown placeholder="All Sources">
          <Option value="all">All Sources</Option>
          <Option value="website">Website</Option>
          <Option value="referral">Referral</Option>
          <Option value="coldcall">Cold Call</Option>
        </Dropdown>
        <Dropdown placeholder="All Users">
          <Option value="all">All Sales Reps</Option>
        </Dropdown>
      </Card>

      <div className={classes.pipelineContainer}>
        {STAGES.map((stage) => {
          const leads = MOCK_LEADS[stage.key as keyof typeof MOCK_LEADS] || [];
          const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);

          return (
            <div key={stage.key} className={classes.pipelineColumn}>
              <div className={classes.columnHeader}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text weight="semibold">{stage.label}</Text>
                  <Badge
                    appearance="filled"
                    style={{ backgroundColor: stage.color }}
                  >
                    {leads.length}
                  </Badge>
                </div>
                <Text size={200} style={{ color: stage.color }}>
                  {formatCurrency(totalValue)}
                </Text>
              </div>

              {leads.map((lead) => (
                <Card
                  key={lead.id}
                  className={classes.leadCard}
                  onClick={() => navigate(`/crm/leads/${lead.id}`)}
                >
                  <div className={classes.leadHeader}>
                    <Avatar name={lead.contact} size={32} color="brand" />
                    <div style={{ flex: 1 }}>
                      <Text weight="semibold" block size={300}>
                        {lead.name}
                      </Text>
                      <Text size={200}>{lead.contact}</Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: tokens.spacingVerticalS,
                    }}
                  >
                    <Text size={400} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                      {formatCurrency(lead.value)}
                    </Text>
                    <Badge appearance="tint" size="small">
                      {lead.source}
                    </Badge>
                  </div>

                  <div className={classes.contactInfo}>
                    <div className={classes.contactRow}>
                      <Mail20Regular style={{ fontSize: '14px' }} />
                      <Text size={200} truncate>
                        {lead.email}
                      </Text>
                    </div>
                    <div className={classes.contactRow}>
                      <Phone20Regular style={{ fontSize: '14px' }} />
                      <Text size={200}>{lead.phone}</Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
                  >
                    <Text size={200}>{formatDate(lead.date)}</Text>
                    <Button appearance="subtle" icon={<ArrowRight20Regular />} size="small">
                      Move
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
