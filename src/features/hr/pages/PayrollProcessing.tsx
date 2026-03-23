/**
 * HR - Payroll Processing System
 * EXPERT: Enterprise Solution Architect (Compensation Management)
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
  Dropdown,
  Option,
  ProgressBar,
} from '@fluentui/react-components';
import {
  Money20Regular,
  DocumentPdf20Regular,
  Send20Regular,
  Calculator20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

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
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
  },
});

const EMPLOYEES = [
  {
    id: '1',
    empId: 'EMP-001',
    name: 'Ahmed Hassan',
    department: 'Sales',
    basicSalary: 50000,
    allowances: 15000,
    deductions: 5000,
    netSalary: 60000,
    status: 'Pending',
  },
  {
    id: '2',
    empId: 'EMP-002',
    name: 'Fatima Rahman',
    department: 'Marketing',
    basicSalary: 55000,
    allowances: 18000,
    deductions: 6000,
    netSalary: 67000,
    status: 'Approved',
  },
  {
    id: '3',
    empId: 'EMP-003',
    name: 'Karim Ali',
    department: 'IT',
    basicSalary: 60000,
    allowances: 20000,
    deductions: 7000,
    netSalary: 73000,
    status: 'Paid',
  },
  {
    id: '4',
    empId: 'EMP-004',
    name: 'Nusrat Jahan',
    department: 'HR',
    basicSalary: 48000,
    allowances: 14000,
    deductions: 4500,
    netSalary: 57500,
    status: 'Pending',
  },
];

export const PayrollProcessing = () => {
  const classes = useStyles();

  const totalGross = EMPLOYEES.reduce((sum, emp) => sum + emp.basicSalary + emp.allowances, 0);
  const totalDeductions = EMPLOYEES.reduce((sum, emp) => sum + emp.deductions, 0);
  const totalNet = EMPLOYEES.reduce((sum, emp) => sum + emp.netSalary, 0);
  const pendingCount = EMPLOYEES.filter((e) => e.status === 'Pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Approved':
        return 'brand';
      case 'Pending':
        return 'warning';
      default:
        return 'subtle';
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Payroll Processing</Title3>
          <Text>Process and manage employee payroll</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<Calculator20Regular />}>
            Calculate Payroll
          </Button>
          <Button appearance="primary" icon={<Money20Regular />}>
            Process Payment
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Gross Salary
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalGross)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Deductions
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(totalDeductions)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Net Payable
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalNet)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending Approval
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {pendingCount}
          </Text>
        </Card>
      </div>

      <Card className={classes.toolbar}>
        <Label>Pay Period:</Label>
        <Dropdown defaultValue="current">
          <Option value="current">Current Month (March 2026)</Option>
          <Option value="last">Last Month (February 2026)</Option>
          <Option value="custom">Custom Range</Option>
        </Dropdown>

        <Label>Department:</Label>
        <Dropdown placeholder="All Departments">
          <Option value="all">All Departments</Option>
          <Option value="sales">Sales</Option>
          <Option value="marketing">Marketing</Option>
          <Option value="it">IT</Option>
          <Option value="hr">HR</Option>
          <Option value="finance">Finance</Option>
        </Dropdown>

        <Input placeholder="Search employee..." style={{ flexGrow: 1, maxWidth: '300px' }} />
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
          <Title3>Payroll Summary</Title3>
          <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
            <Button appearance="secondary" size="small" icon={<DocumentPdf20Regular />}>
              Export PDF
            </Button>
            <Button appearance="secondary" size="small" icon={<Send20Regular />}>
              Send Payslips
            </Button>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Employee ID</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Basic Salary</TableHeaderCell>
              <TableHeaderCell>Allowances</TableHeaderCell>
              <TableHeaderCell>Deductions</TableHeaderCell>
              <TableHeaderCell>Net Salary</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EMPLOYEES.map((emp) => (
              <TableRow key={emp.id}>
                <TableCell>
                  <Text weight="semibold">{emp.empId}</Text>
                </TableCell>
                <TableCell>
                  <Text>{emp.name}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{emp.department}</Badge>
                </TableCell>
                <TableCell>
                  <Text>{formatCurrency(emp.basicSalary)}</Text>
                </TableCell>
                <TableCell>
                  <Text style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    +{formatCurrency(emp.allowances)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text style={{ color: tokens.colorPaletteRedForeground1 }}>
                    -{formatCurrency(emp.deductions)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                    {formatCurrency(emp.netSalary)}
                  </Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getStatusColor(emp.status)}>
                    {emp.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small">
                      View
                    </Button>
                    {emp.status === 'Pending' && (
                      <Button appearance="primary" size="small">
                        Approve
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
        >
          <div style={{ display: 'flex', gap: tokens.spacingHorizontalXL }}>
            <div>
              <Text size={300} block>
                Total Gross
              </Text>
              <Text size={400} weight="bold">
                {formatCurrency(totalGross)}
              </Text>
            </div>
            <div>
              <Text size={300} block>
                Total Deductions
              </Text>
              <Text size={400} weight="bold" style={{ color: tokens.colorPaletteRedForeground1 }}>
                -{formatCurrency(totalDeductions)}
              </Text>
            </div>
            <div>
              <Text size={300} block>
                Net Payable
              </Text>
              <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
                {formatCurrency(totalNet)}
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
