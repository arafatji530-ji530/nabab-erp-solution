/**
 * Purchase - Supplier Contracts
 * EXPERT: Senior React Engineer (Contract Management)
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
import { Add20Regular, DocumentOnePage20Regular } from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const CONTRACTS = [
  {
    id: '1',
    contractNo: 'CNT-2026-001',
    supplier: 'Office Supplies Ltd',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    value: 1500000,
    terms: 'Net 30',
    status: 'Active',
  },
  {
    id: '2',
    contractNo: 'CNT-2026-002',
    supplier: 'Tech Hardware Inc',
    startDate: '2026-02-01',
    endDate: '2027-01-31',
    value: 5000000,
    terms: 'Net 45',
    status: 'Active',
  },
  {
    id: '3',
    contractNo: 'CNT-2025-045',
    supplier: 'Raw Materials Co',
    startDate: '2025-06-01',
    endDate: '2026-05-31',
    value: 3200000,
    terms: 'Net 30',
    status: 'Expiring Soon',
  },
];

export const SupplierContracts = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Supplier Contracts</Title3>
          <Text>Manage long-term supplier agreements and terms</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          New Contract
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Contract #</TableHeaderCell>
              <TableHeaderCell>Supplier</TableHeaderCell>
              <TableHeaderCell>Start Date</TableHeaderCell>
              <TableHeaderCell>End Date</TableHeaderCell>
              <TableHeaderCell>Contract Value</TableHeaderCell>
              <TableHeaderCell>Payment Terms</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CONTRACTS.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <DocumentOnePage20Regular />
                    <Text weight="semibold">{contract.contractNo}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={contract.supplier} size={24} />
                    <Text>{contract.supplier}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(contract.startDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(contract.endDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(contract.value)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{contract.terms}</Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={contract.status === 'Active' ? 'success' : 'warning'}>
                    {contract.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    View Details
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
