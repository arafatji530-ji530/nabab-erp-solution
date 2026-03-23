/**
 * Settings - API Keys Management
 * EXPERT: DevOps & Compliance Engineer (API Security)
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
import { Add20Regular, Key20Regular, Copy20Regular, Delete20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const API_KEYS = [
  { id: '1', name: 'Production API', key: 'pk_live_abc123...xyz789', created: '2026-01-15', lastUsed: '2026-03-22', permissions: 'Full Access', status: 'Active' },
  { id: '2', name: 'Mobile App', key: 'pk_live_def456...uvw012', created: '2026-02-10', lastUsed: '2026-03-21', permissions: 'Read Only', status: 'Active' },
  { id: '3', name: 'Testing Key', key: 'pk_test_ghi789...rst345', created: '2026-03-01', lastUsed: '2026-03-15', permissions: 'Limited', status: 'Active' },
  { id: '4', name: 'Old Integration', key: 'pk_live_jkl012...opq678', created: '2025-11-20', lastUsed: '2025-12-30', permissions: 'Full Access', status: 'Revoked' },
];

export const APIKeysManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
          <Key20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          <div>
            <Title3>API Keys Management</Title3>
            <Text>Manage API keys for integrations and external access</Text>
          </div>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Generate New Key
        </Button>
      </div>

      <Card
        style={{
          ...shorthands.padding(tokens.spacingVerticalL),
          backgroundColor: tokens.colorPaletteYellowBackground2,
          ...shorthands.border('1px', 'solid', tokens.colorPaletteYellowBorder2),
        } as React.CSSProperties}
      >
        <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
          ⚠️ Security Warning
        </Text>
        <Text>
          Keep your API keys secure. Never share them in public repositories or client-side code. Revoke any compromised keys immediately.
        </Text>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Active API Keys</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Key Name</TableHeaderCell>
              <TableHeaderCell>API Key</TableHeaderCell>
              <TableHeaderCell>Created</TableHeaderCell>
              <TableHeaderCell>Last Used</TableHeaderCell>
              <TableHeaderCell>Permissions</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {API_KEYS.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell>
                  <Text weight="semibold">{apiKey.name}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <Text size={300} style={{ fontFamily: 'monospace' }}>
                      {apiKey.key}
                    </Text>
                    <Button appearance="subtle" size="small" icon={<Copy20Regular />} />
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(apiKey.created)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(apiKey.lastUsed)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{apiKey.permissions}</Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={apiKey.status === 'Active' ? 'success' : 'danger'}>
                    {apiKey.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    {apiKey.status === 'Active' && (
                      <>
                        <Button appearance="subtle" size="small">
                          Edit
                        </Button>
                        <Button appearance="subtle" size="small" icon={<Delete20Regular />}>
                          Revoke
                        </Button>
                      </>
                    )}
                    {apiKey.status === 'Revoked' && (
                      <Button appearance="subtle" size="small" disabled>
                        Revoked
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>API Usage Statistics</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Total Requests (Today)
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
              1,245
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Success Rate
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              99.8%
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Avg Response Time
            </Text>
            <Text size={500} weight="bold">
              45ms
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Active Keys
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              3
            </Text>
          </div>
        </div>
      </Card>
    </div>
  );
};
