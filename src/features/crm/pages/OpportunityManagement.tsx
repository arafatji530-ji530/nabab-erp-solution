/**
 * CRM - Opportunity Management
 * EXPERT: Enterprise Solution Architect (Sales Pipeline)
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
  ProgressBar,
} from '@fluentui/react-components';
import { Add20Regular, Trophy20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  kanban: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  opportunityCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
  },
});

const OPPORTUNITIES = [
  { id: '1', name: 'Enterprise Deal - ABC Corp', amount: 5000000, probability: 75, stage: 'Proposal', owner: 'John Doe', closeDate: '2026-04-15' },
  { id: '2', name: 'New Partnership - XYZ Ltd', amount: 3200000, probability: 50, stage: 'Negotiation', owner: 'Jane Smith', closeDate: '2026-05-01' },
  { id: '3', name: 'Renewal - Tech Solutions', amount: 1800000, probability: 90, stage: 'Closing', owner: 'Mike Johnson', closeDate: '2026-03-30' },
  { id: '4', name: 'Expansion - Retail Store', amount: 850000, probability: 25, stage: 'Qualification', owner: 'Sarah Lee', closeDate: '2026-06-15' },
];

export const OpportunityManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Opportunity Management</Title3>
          <Text>Track sales opportunities through the pipeline</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Opportunity
        </Button>
      </div>

      <div className={classes.kanban}>
        {['Qualification', 'Proposal', 'Negotiation', 'Closing'].map((stage) => (
          <div key={stage} className={classes.column}>
            <Card style={{ ...shorthands.padding(tokens.spacingVerticalM), backgroundColor: tokens.colorBrandBackground2 } as React.CSSProperties}>
              <Text weight="bold">{stage}</Text>
            </Card>

            {OPPORTUNITIES.filter((opp) => opp.stage === stage).map((opp) => (
              <Card key={opp.id} className={classes.opportunityCard}>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                  {opp.name}
                </Text>

                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, marginBottom: tokens.spacingVerticalS }}>
                  <Trophy20Regular style={{ fontSize: '16px', color: tokens.colorPaletteGreenForeground1 }} />
                  <Text weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {formatCurrency(opp.amount)}
                  </Text>
                </div>

                <div style={{ marginBottom: tokens.spacingVerticalS }}>
                  <Text size={200} block>
                    Probability: {opp.probability}%
                  </Text>
                  <ProgressBar value={opp.probability} max={100} color={opp.probability > 70 ? 'success' : opp.probability > 40 ? 'brand' : 'warning'} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, marginBottom: tokens.spacingVerticalS }}>
                  <Avatar name={opp.owner} size={20} />
                  <Text size={200}>{opp.owner}</Text>
                </div>

                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  Close: {formatDate(opp.closeDate)}
                </Text>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
