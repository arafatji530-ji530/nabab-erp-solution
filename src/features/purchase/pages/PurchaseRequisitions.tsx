/**
 * Purchase - Purchase Requisitions
 * EXPERT: UI/UX Designer (Approval Workflow)
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
  Input,
  Label,
  Dropdown,
  Option,
  Textarea,
} from '@fluentui/react-components';
import { Add20Regular, Checkmark20Regular, Dismiss20Regular, DocumentText20Regular } from '@fluentui/react-icons';
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
  formCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalM,
  },
});

const REQUISITIONS = [
  {
    id: '1',
    prNumber: 'PR-2026-001',
    requestedBy: 'Ahmed Hassan',
    department: 'IT',
    date: '2026-03-25',
    estimatedAmount: 125000,
    status: 'Pending Approval',
    approver: 'Manager A',
    priority: 'High',
  },
  {
    id: '2',
    prNumber: 'PR-2026-002',
    requestedBy: 'Fatima Rahman',
    department: 'Marketing',
    date: '2026-03-26',
    estimatedAmount: 45000,
    status: 'Approved',
    approver: 'Manager B',
    priority: 'Medium',
  },
  {
    id: '3',
    prNumber: 'PR-2026-003',
    requestedBy: 'Karim Ali',
    department: 'Operations',
    date: '2026-03-24',
    estimatedAmount: 250000,
    status: 'Rejected',
    approver: 'Manager C',
    priority: 'Low',
  },
  {
    id: '4',
    prNumber: 'PR-2026-004',
    requestedBy: 'Nusrat Jahan',
    department: 'Sales',
    date: '2026-03-27',
    estimatedAmount: 89000,
    status: 'Converted to PO',
    approver: 'Manager D',
    priority: 'High',
  },
];

export const PurchaseRequisitions = () => {
  const classes = useStyles();

  const totalRequisitions = REQUISITIONS.length;
  const pendingCount = REQUISITIONS.filter((r) => r.status === 'Pending Approval').length;
  const approvedCount = REQUISITIONS.filter((r) => r.status === 'Approved').length;
  const totalEstimated = REQUISITIONS.reduce((sum, r) => sum + r.estimatedAmount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending Approval':
        return 'warning';
      case 'Rejected':
        return 'danger';
      case 'Converted to PO':
        return 'brand';
      default:
        return 'subtle';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'brand';
      default:
        return 'subtle';
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Purchase Requisitions</Title3>
          <Text>Create and manage purchase requests for approval</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Requisition
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Requisitions
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalRequisitions}
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
        <Card className={classes.statCard}>
          <Text size={200} block>
            Approved
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {approvedCount}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Estimated Total
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {formatCurrency(totalEstimated)}
          </Text>
        </Card>
      </div>

      <Card className={classes.formCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Create Purchase Requisition</Title3>

        <div className={classes.formGrid}>
          <div className={classes.formGroup}>
            <Label required>Requisition Number</Label>
            <Input placeholder="Auto-generated" disabled />
          </div>

          <div className={classes.formGroup}>
            <Label required>Request Date</Label>
            <Input type="date" defaultValue="2026-03-28" />
          </div>

          <div className={classes.formGroup}>
            <Label required>Department</Label>
            <Dropdown placeholder="Select department">
              <Option value="it">IT</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="sales">Sales</Option>
              <Option value="operations">Operations</Option>
              <Option value="finance">Finance</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Priority</Label>
            <Dropdown placeholder="Select priority">
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Dropdown>
          </div>
        </div>

        <div className={classes.formGroup}>
          <Label required>Purpose/Justification</Label>
          <Textarea rows={3} placeholder="Explain the need for this purchase..." />
        </div>

        <div className={classes.formGrid}>
          <div className={classes.formGroup}>
            <Label>Estimated Budget</Label>
            <Input type="number" placeholder="0.00" />
          </div>

          <div className={classes.formGroup}>
            <Label required>Required By Date</Label>
            <Input type="date" />
          </div>

          <div className={classes.formGroup}>
            <Label>Approver</Label>
            <Dropdown placeholder="Select approver">
              <Option value="manager-a">Manager A</Option>
              <Option value="manager-b">Manager B</Option>
              <Option value="manager-c">Manager C</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Supplier Suggestion</Label>
            <Dropdown placeholder="Optional">
              <Option value="1">Global Electronics Ltd</Option>
              <Option value="2">Tech Supply Co</Option>
              <Option value="3">Industrial Parts Inc</Option>
            </Dropdown>
          </div>
        </div>

        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalL }}>
          <Button appearance="secondary">Save as Draft</Button>
          <Button appearance="primary">Submit for Approval</Button>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Recent Requisitions</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>PR Number</TableHeaderCell>
              <TableHeaderCell>Requested By</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Estimated Amount</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Approver</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {REQUISITIONS.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  <Text weight="semibold">{req.prNumber}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <Avatar name={req.requestedBy} size={28} />
                    <Text size={300}>{req.requestedBy}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{req.department}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(req.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(req.estimatedAmount)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getPriorityColor(req.priority)}>
                    {req.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getStatusColor(req.status)}>
                    {req.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{req.approver}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<DocumentText20Regular />}>
                      View
                    </Button>
                    {req.status === 'Pending Approval' && (
                      <>
                        <Button appearance="primary" size="small" icon={<Checkmark20Regular />} />
                        <Button appearance="secondary" size="small" icon={<Dismiss20Regular />} />
                      </>
                    )}
                    {req.status === 'Approved' && (
                      <Button appearance="primary" size="small">
                        Create PO
                      </Button>
                    )}
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
