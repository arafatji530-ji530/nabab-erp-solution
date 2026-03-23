/**
 * Settings - Database Maintenance
 * EXPERT: DevOps & Compliance Engineer (Database Administration)
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
import { Database20Regular, ArrowSync20Regular, Broom20Regular, Archive20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const DB_TABLES = [
  { name: 'orders', records: 125840, size: '2.4 GB', lastOptimized: '2026-03-20', fragmentation: 12 },
  { name: 'products', records: 8920, size: '145 MB', lastOptimized: '2026-03-22', fragmentation: 3 },
  { name: 'customers', records: 45200, size: '890 MB', lastOptimized: '2026-03-19', fragmentation: 18 },
  { name: 'invoices', records: 98450, size: '1.8 GB', lastOptimized: '2026-03-21', fragmentation: 8 },
  { name: 'inventory', records: 15680, size: '320 MB', lastOptimized: '2026-03-22', fragmentation: 5 },
];

export const DatabaseMaintenance = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <Database20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
        <div>
          <Title3>Database Maintenance</Title3>
          <Text>Optimize database performance and manage storage</Text>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Database Overview</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: tokens.spacingHorizontalL, marginBottom: tokens.spacingVerticalL }}>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Total Size
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
              12.8 GB
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Total Records
            </Text>
            <Text size={500} weight="bold">
              2.4M
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Tables
            </Text>
            <Text size={500} weight="bold">
              87
            </Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Avg Query Time
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              18ms
            </Text>
          </div>
        </div>

        <div style={{ marginBottom: tokens.spacingVerticalS }}>
          <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Storage Capacity
          </Text>
          <ProgressBar value={0.64} thickness="large" color="brand" />
          <Text size={300}>12.8 GB / 20 GB (64% used)</Text>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Table Statistics</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Table Name</TableHeaderCell>
              <TableHeaderCell>Records</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Last Optimized</TableHeaderCell>
              <TableHeaderCell>Fragmentation</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DB_TABLES.map((table) => (
              <TableRow key={table.name}>
                <TableCell>
                  <Text weight="semibold" style={{ fontFamily: 'monospace' }}>
                    {table.name}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text>{table.records.toLocaleString()}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{table.size}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(table.lastOptimized)}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={table.fragmentation > 15 ? 'warning' : 'success'}>
                    {table.fragmentation}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small" icon={<ArrowSync20Regular />}>
                    Optimize
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Maintenance Tasks</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Optimize All Tables
              </Text>
              <Text size={300} block style={{ marginBottom: tokens.spacingVerticalS }}>
                Rebuild indexes and optimize table structures for better performance
              </Text>
              <Button icon={<ArrowSync20Regular />}>Run Optimization</Button>
            </div>

            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Clean Up Old Data
              </Text>
              <Text size={300} block style={{ marginBottom: tokens.spacingVerticalS }}>
                Archive or delete records older than retention period
              </Text>
              <Button icon={<Broom20Regular />}>Clean Database</Button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Vacuum Database
              </Text>
              <Text size={300} block style={{ marginBottom: tokens.spacingVerticalS }}>
                Reclaim storage from deleted records (16 hours)
              </Text>
              <Button icon={<Archive20Regular />}>Run Vacuum</Button>
            </div>

            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Rebuild Indexes
              </Text>
              <Text size={300} block style={{ marginBottom: tokens.spacingVerticalS }}>
                Rebuild all database indexes to improve query performance
              </Text>
              <Button icon={<ArrowSync20Regular />}>Rebuild Indexes</Button>
            </div>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Scheduled Maintenance</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Auto-Optimize Tables
              </Text>
              <Text size={300}>Run every Sunday at 2:00 AM</Text>
            </div>
            <Badge appearance="tint" color="success">
              Enabled
            </Badge>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Database Backup
              </Text>
              <Text size={300}>Daily at 11:00 PM</Text>
            </div>
            <Badge appearance="tint" color="success">
              Enabled
            </Badge>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Archive Old Records
              </Text>
              <Text size={300}>Monthly on 1st at 3:00 AM</Text>
            </div>
            <Badge appearance="tint" color="success">
              Enabled
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
