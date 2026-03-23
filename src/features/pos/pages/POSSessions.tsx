/**
 * POS - Sessions Management
 * EXPERT: SaaS Platform Architect (Session Control)
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
import { LockClosed20Regular, LockOpen20Regular } from '@fluentui/react-icons';
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
  },
});

const SESSIONS = [
  {
    id: '1',
    sessionNo: 'SES-001',
    cashier: 'John Doe',
    terminal: 'Terminal 1',
    openedAt: '2026-03-20 08:00:00',
    closedAt: null,
    openingBalance: 50000,
    sales: 285000,
    closingBalance: null,
    status: 'Open',
  },
  {
    id: '2',
    sessionNo: 'SES-000',
    cashier: 'Jane Smith',
    terminal: 'Terminal 2',
    openedAt: '2026-03-19 08:00:00',
    closedAt: '2026-03-19 20:00:00',
    openingBalance: 50000,
    sales: 420000,
    closingBalance: 470000,
    status: 'Closed',
  },
];

export const POSSessions = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>POS Sessions Management</Title3>
          <Text>Track cashier sessions and shift operations</Text>
        </div>
        <Button appearance="primary" icon={<LockOpen20Regular />}>
          Open New Session
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Active Sessions
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            1
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Today's Sales
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(285000)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Closed Sessions
          </Text>
          <Text size={500} weight="bold" block>
            1
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Revenue
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(705000)}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>POS Sessions</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Session #</TableHeaderCell>
              <TableHeaderCell>Cashier</TableHeaderCell>
              <TableHeaderCell>Terminal</TableHeaderCell>
              <TableHeaderCell>Opened At</TableHeaderCell>
              <TableHeaderCell>Closed At</TableHeaderCell>
              <TableHeaderCell>Opening Balance</TableHeaderCell>
              <TableHeaderCell>Sales</TableHeaderCell>
              <TableHeaderCell>Expected</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SESSIONS.map((session) => {
              const expected = session.openingBalance + session.sales;
              return (
                <TableRow key={session.id}>
                  <TableCell>
                    <Text weight="semibold">{session.sessionNo}</Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <Avatar name={session.cashier} size={24} />
                      <Text>{session.cashier}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text>{session.terminal}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{session.openedAt}</Text>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{session.closedAt || '-'}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{formatCurrency(session.openingBalance)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(session.sales)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="bold">{formatCurrency(expected)}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={session.status === 'Open' ? 'success' : 'subtle'}
                      icon={session.status === 'Open' ? <LockOpen20Regular /> : <LockClosed20Regular />}
                    >
                      {session.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {session.status === 'Open' ? (
                      <Button appearance="primary" size="small" icon={<LockClosed20Regular />}>
                        Close Session
                      </Button>
                    ) : (
                      <Button appearance="subtle" size="small">
                        View Details
                      </Button>
                    )}
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
