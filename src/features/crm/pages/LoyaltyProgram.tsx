/**
 * CRM - Loyalty Program Management
 * EXPERT: DevOps & Gamification Engineer (Customer Retention)
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
  ProgressBar,
} from '@fluentui/react-components';
import { Star20Regular, Trophy20Regular, Gift20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

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
});

const MEMBERS = [
  {
    id: '1',
    customer: 'ABC Industries Ltd',
    tier: 'Platinum',
    points: 8500,
    totalSpent: 2500000,
    rewardsRedeemed: 12,
  },
  {
    id: '2',
    customer: 'Tech Solutions',
    tier: 'Gold',
    points: 4200,
    totalSpent: 1800000,
    rewardsRedeemed: 6,
  },
  {
    id: '3',
    customer: 'Build Masters',
    tier: 'Silver',
    points: 1850,
    totalSpent: 850000,
    rewardsRedeemed: 3,
  },
];

export const LoyaltyProgram = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Loyalty Program Management</Title3>
          <Text>Reward and retain your best customers</Text>
        </div>
        <Button appearance="primary" icon={<Gift20Regular />}>
          Configure Rewards
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Active Members
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            2,456
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Points Issued
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            125,000
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Points Redeemed
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            45,000
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Rewards Given
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            342
          </Text>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Membership Tiers</Title3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {[
              { tier: 'Platinum', min: 5000, members: 125, color: tokens.colorPalettePurpleForeground2 },
              { tier: 'Gold', min: 2000, members: 450, color: tokens.colorPaletteYellowForeground1 },
              { tier: 'Silver', min: 500, members: 890, color: tokens.colorNeutralForeground3 },
              { tier: 'Bronze', min: 0, members: 991, color: tokens.colorPaletteDarkOrangeForeground1 },
            ].map((tier) => (
              <div key={tier.tier}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Trophy20Regular style={{ color: tier.color }} />
                    <Text weight="semibold">{tier.tier}</Text>
                  </div>
                  <Text size={300}>{tier.members} members</Text>
                </div>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  {tier.min}+ points required
                </Text>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Available Rewards</Title3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            {[
              { reward: '10% Discount Voucher', points: 500 },
              { reward: '20% Discount Voucher', points: 1000 },
              { reward: 'Free Shipping', points: 200 },
              { reward: 'Gift Hamper', points: 2000 },
            ].map((reward, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                  <Gift20Regular style={{ color: tokens.colorBrandForeground1 }} />
                  <Text>{reward.reward}</Text>
                </div>
                <Badge appearance="tint" color="brand">
                  <Star20Regular style={{ fontSize: '12px' }} />
                  {reward.points}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Top Loyalty Members</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Tier</TableHeaderCell>
              <TableHeaderCell>Points Balance</TableHeaderCell>
              <TableHeaderCell>Total Spent</TableHeaderCell>
              <TableHeaderCell>Rewards Redeemed</TableHeaderCell>
              <TableHeaderCell>Progress to Next Tier</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MEMBERS.map((member) => {
              const nextTierPoints = member.tier === 'Platinum' ? 10000 : member.tier === 'Gold' ? 5000 : 2000;
              const progress = ((member.points / nextTierPoints) * 100).toFixed(1);
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <Text weight="semibold">{member.customer}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={
                        member.tier === 'Platinum' ? 'important' :
                        member.tier === 'Gold' ? 'warning' :
                        'brand'
                      }
                    >
                      <Trophy20Regular style={{ fontSize: '12px' }} />
                      {member.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                      {member.points} points
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(member.totalSpent)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{member.rewardsRedeemed}</Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ minWidth: '150px' }}>
                      <ProgressBar
                        value={parseFloat(progress)}
                        max={100}
                        color="brand"
                        thickness="medium"
                      />
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                        {member.points} / {nextTierPoints}
                      </Text>
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
