/**
 * Sales - Territory Management
 * EXPERT: Enterprise Solution Architect (Geographic Sales Strategy)
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
  Avatar,
} from '@fluentui/react-components';
import { Add20Regular, Location20Regular, People20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  territoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  territoryCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
});

const TERRITORIES = [
  {
    id: '1',
    name: 'Dhaka Division',
    manager: 'Ahmed Hassan',
    salesReps: 8,
    customers: 450,
    target: 5000000,
    achieved: 4250000,
    growth: 15.3,
  },
  {
    id: '2',
    name: 'Chittagong Division',
    manager: 'Fatima Rahman',
    salesReps: 5,
    customers: 280,
    target: 3000000,
    achieved: 2850000,
    growth: 12.8,
  },
  {
    id: '3',
    name: 'Sylhet Division',
    manager: 'Karim Ali',
    salesReps: 3,
    customers: 120,
    target: 1500000,
    achieved: 1275000,
    growth: 8.5,
  },
];

export const TerritoryManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Territory Management</Title3>
          <Text>Manage sales territories and regional performance</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Territory
        </Button>
      </div>

      <div className={classes.territoriesGrid}>
        {TERRITORIES.map((territory) => {
          const achievement = ((territory.achieved / territory.target) * 100).toFixed(1);
          return (
            <Card key={territory.id} className={classes.territoryCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginBottom: tokens.spacingVerticalM }}>
                <Location20Regular style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />
                <Text weight="semibold" size={400}>
                  {territory.name}
                </Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginBottom: tokens.spacingVerticalM }}>
                <Avatar name={territory.manager} size={32} />
                <div>
                  <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>
                    Territory Manager
                  </Text>
                  <Text weight="semibold">{territory.manager}</Text>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS, marginBottom: tokens.spacingVerticalM }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text size={300}>Sales Reps</Text>
                  <Badge appearance="tint" color="brand">{territory.salesReps}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text size={300}>Customers</Text>
                  <Badge appearance="tint" color="informative">{territory.customers}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text size={300}>Growth Rate</Text>
                  <Badge appearance="tint" color={territory.growth > 10 ? 'success' : 'warning'}>
                    ↑ {territory.growth}%
                  </Badge>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={300}>Target Achievement</Text>
                  <Text size={300} weight="bold">
                    {achievement}%
                  </Text>
                </div>
                <ProgressBar
                  value={parseFloat(achievement)}
                  max={100}
                  color={parseFloat(achievement) >= 90 ? 'success' : parseFloat(achievement) >= 70 ? 'brand' : 'warning'}
                  thickness="large"
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: tokens.spacingVerticalXS }}>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                    {formatCurrency(territory.achieved)}
                  </Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                    / {formatCurrency(territory.target)}
                  </Text>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Territory Performance Comparison</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Territory</TableHeaderCell>
              <TableHeaderCell>Manager</TableHeaderCell>
              <TableHeaderCell>Sales Team</TableHeaderCell>
              <TableHeaderCell>Customers</TableHeaderCell>
              <TableHeaderCell>Target</TableHeaderCell>
              <TableHeaderCell>Achieved</TableHeaderCell>
              <TableHeaderCell>Achievement %</TableHeaderCell>
              <TableHeaderCell>Growth Rate</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TERRITORIES.map((territory) => {
              const achievement = ((territory.achieved / territory.target) * 100).toFixed(1);
              return (
                <TableRow key={territory.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <Location20Regular />
                      <Text weight="semibold">{territory.name}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <Avatar name={territory.manager} size={24} />
                      <Text size={300}>{territory.manager}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <People20Regular />
                      <Text>{territory.salesReps} reps</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text>{territory.customers}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(territory.target)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(territory.achieved)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text weight="bold" block>
                        {achievement}%
                      </Text>
                      <ProgressBar
                        value={parseFloat(achievement)}
                        max={100}
                        color={parseFloat(achievement) >= 90 ? 'success' : parseFloat(achievement) >= 70 ? 'brand' : 'warning'}
                        thickness="medium"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="tint" color={territory.growth > 10 ? 'success' : 'warning'}>
                      ↑ {territory.growth}%
                    </Badge>
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
