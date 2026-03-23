/**
 * Purchase - RFQ (Request for Quotation) Management
 * EXPERT: Enterprise Solution Architect (RFQ Workflow)
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
} from '@fluentui/react-components';
import { Add20Regular, Document20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const RFQS = [
  {
    id: '1',
    rfqNo: 'RFQ-145',
    title: 'Office Furniture Purchase',
    suppliers: 3,
    quotationsReceived: 2,
    dueDate: '2026-03-25',
    status: 'Open',
  },
  {
    id: '2',
    rfqNo: 'RFQ-144',
    title: 'IT Equipment Procurement',
    suppliers: 5,
    quotationsReceived: 5,
    dueDate: '2026-03-20',
    status: 'Closed',
  },
  {
    id: '3',
    rfqNo: 'RFQ-143',
    title: 'Raw Materials - Q2',
    suppliers: 4,
    quotationsReceived: 1,
    dueDate: '2026-03-30',
    status: 'Open',
  },
];

export const RFQManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>RFQ (Request for Quotation) Management</Title3>
          <Text>Collect and compare supplier quotations</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create RFQ
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>RFQ #</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Suppliers Invited</TableHeaderCell>
              <TableHeaderCell>Quotations Received</TableHeaderCell>
              <TableHeaderCell>Due Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {RFQS.map((rfq) => (
              <TableRow key={rfq.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Document20Regular />
                    <Text weight="semibold">{rfq.rfqNo}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{rfq.title}</Text>
                </TableCell>
                <TableCell>
                  <Text>{rfq.suppliers}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                    {rfq.quotationsReceived} / {rfq.suppliers}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(rfq.dueDate)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={rfq.status === 'Open' ? 'success' : 'subtle'}>
                    {rfq.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    View Quotations
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
