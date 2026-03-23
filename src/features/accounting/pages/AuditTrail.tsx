/**
 * Accounting - Audit Trail & Logs
 * EXPERT: DevOps & Compliance Engineer (Audit Logging)
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
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
import { Shield20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const AUDIT_LOGS = [
  {
    id: '1',
    timestamp: '2026-03-20 14:32:15',
    user: 'John Doe',
    action: 'Created',
    entity: 'Journal Entry',
    entityId: 'JE-1025',
    ipAddress: '192.168.1.45',
  },
  {
    id: '2',
    timestamp: '2026-03-20 14:28:10',
    user: 'Jane Smith',
    action: 'Updated',
    entity: 'Invoice',
    entityId: 'INV-2045',
    ipAddress: '192.168.1.52',
  },
  {
    id: '3',
    timestamp: '2026-03-20 14:15:22',
    user: 'Admin User',
    action: 'Deleted',
    entity: 'Payment',
    entityId: 'PAY-3012',
    ipAddress: '192.168.1.10',
  },
  {
    id: '4',
    timestamp: '2026-03-20 13:45:08',
    user: 'Finance Manager',
    action: 'Approved',
    entity: 'Bank Reconciliation',
    entityId: 'BR-445',
    ipAddress: '192.168.1.30',
  },
];

export const AuditTrail = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <Shield20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
        <div>
          <Title3>Audit Trail & Logs</Title3>
          <Text>Complete activity log for compliance and security</Text>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Recent Activities</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Timestamp</TableHeaderCell>
              <TableHeaderCell>User</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
              <TableHeaderCell>Entity Type</TableHeaderCell>
              <TableHeaderCell>Entity ID</TableHeaderCell>
              <TableHeaderCell>IP Address</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AUDIT_LOGS.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Text size={300}>{log.timestamp}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={log.user} size={24} />
                    <Text>{log.user}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={
                      log.action === 'Created'
                        ? 'success'
                        : log.action === 'Deleted'
                          ? 'danger'
                          : log.action === 'Approved'
                            ? 'brand'
                            : 'warning'
                    }
                  >
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{log.entity}</Text>
                </TableCell>
                <TableCell>
                  <Text>{log.entityId}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300} style={{ fontFamily: 'monospace' }}>
                    {log.ipAddress}
                  </Text>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
