/**
 * HR - Benefits Management
 * EXPERT: Enterprise Solution Architect (Compensation & Benefits)
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
  Avatar,
} from '@fluentui/react-components';
import { Add20Regular, Shield20Regular, Heart20Regular, Money20Regular } from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  benefitCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
});

const BENEFITS = [
  {
    id: '1',
    name: 'Health Insurance',
    provider: 'ABC Insurance Co',
    enrolledEmployees: 45,
    monthlyCost: 150000,
    icon: Heart20Regular,
    color: tokens.colorPaletteRedForeground1,
  },
  {
    id: '2',
    name: 'Life Insurance',
    provider: 'Secure Life Insurance',
    enrolledEmployees: 42,
    monthlyCost: 85000,
    icon: Shield20Regular,
    color: tokens.colorPaletteGreenForeground1,
  },
  {
    id: '3',
    name: 'Provident Fund',
    provider: 'National Provident Fund',
    enrolledEmployees: 50,
    monthlyCost: 250000,
    icon: Money20Regular,
    color: tokens.colorPaletteBlueForeground2,
  },
];

const ENROLLMENTS = [
  {
    id: '1',
    employee: 'Ahmed Hassan',
    benefit: 'Health Insurance',
    coverage: 'Family',
    monthlyCost: 3500,
    status: 'Active',
  },
  {
    id: '2',
    employee: 'Fatima Rahman',
    benefit: 'Life Insurance',
    coverage: 'Individual',
    monthlyCost: 2000,
    status: 'Active',
  },
];

export const BenefitsManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Benefits Management</Title3>
          <Text>Manage employee benefits and insurance programs</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Benefit
        </Button>
      </div>

      <div className={classes.benefitsGrid}>
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <Card key={benefit.id} className={classes.benefitCard}>
              <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginBottom: tokens.spacingVerticalM }}>
                <Icon style={{ fontSize: '32px', color: benefit.color }} />
                <Text weight="semibold" size={400}>
                  {benefit.name}
                </Text>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
                <div>
                  <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>
                    Provider
                  </Text>
                  <Text size={300}>{benefit.provider}</Text>
                </div>
                <div>
                  <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>
                    Enrolled Employees
                  </Text>
                  <Text size={400} weight="semibold">
                    {benefit.enrolledEmployees}
                  </Text>
                </div>
                <div>
                  <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>
                    Monthly Cost
                  </Text>
                  <Text size={400} weight="semibold" style={{ color: tokens.colorBrandForeground1 }}>
                    {formatCurrency(benefit.monthlyCost)}
                  </Text>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Employee Enrollments</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Employee</TableHeaderCell>
              <TableHeaderCell>Benefit</TableHeaderCell>
              <TableHeaderCell>Coverage Type</TableHeaderCell>
              <TableHeaderCell>Monthly Cost</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ENROLLMENTS.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={enrollment.employee} size={28} />
                    <Text size={300}>{enrollment.employee}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{enrollment.benefit}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{enrollment.coverage}</Badge>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(enrollment.monthlyCost)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="success">
                    {enrollment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
