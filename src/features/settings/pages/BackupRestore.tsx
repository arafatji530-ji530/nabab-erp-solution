/**
 * Settings - Backup & Restore System
 * EXPERT: DevOps & Infrastructure Engineer (Data Protection)
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
  Dropdown,
  Option,
  Checkbox,
} from '@fluentui/react-components';
import {
  ArrowDownload20Regular,
  ArrowUpload20Regular,
  CloudSync20Regular,
  DocumentCheckmark20Regular,
} from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

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
  actionCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginTop: tokens.spacingVerticalM,
  },
});

const BACKUPS = [
  {
    id: '1',
    name: 'Full Backup - March 28',
    type: 'Full',
    size: '2.4 GB',
    date: '2026-03-28T02:00:00',
    status: 'Completed',
    location: 'Cloud Storage',
  },
  {
    id: '2',
    name: 'Incremental - March 27',
    type: 'Incremental',
    size: '245 MB',
    date: '2026-03-27T02:00:00',
    status: 'Completed',
    location: 'Cloud Storage',
  },
  {
    id: '3',
    name: 'Full Backup - March 21',
    type: 'Full',
    size: '2.3 GB',
    date: '2026-03-21T02:00:00',
    status: 'Completed',
    location: 'Local Server',
  },
  {
    id: '4',
    name: 'Incremental - March 26',
    type: 'Incremental',
    size: '320 MB',
    date: '2026-03-26T02:00:00',
    status: 'Completed',
    location: 'Cloud Storage',
  },
];

export const BackupRestore = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Backup & Restore System</Title3>
          <Text>Manage database backups and disaster recovery</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowUpload20Regular />}>
            Restore Backup
          </Button>
          <Button appearance="primary" icon={<CloudSync20Regular />}>
            Create Backup Now
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Backups
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {BACKUPS.length}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Last Backup
          </Text>
          <Text size={400} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            March 28, 02:00
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            2 hours ago
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Size
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            5.27 GB
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Success Rate
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            100%
          </Text>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card className={classes.actionCard}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Create New Backup</Title3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Backup Type
              </Text>
              <Dropdown defaultValue="full" style={{ width: '100%' }}>
                <Option value="full">Full Backup (All Data)</Option>
                <Option value="incremental">Incremental (Changes Only)</Option>
                <Option value="differential">Differential</Option>
              </Dropdown>
            </div>

            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Select Data to Backup
              </Text>
              <div className={classes.checkboxGroup}>
                <Checkbox label="Database" defaultChecked />
                <Checkbox label="User Files & Uploads" defaultChecked />
                <Checkbox label="Configuration Files" defaultChecked />
                <Checkbox label="Logs & Reports" />
              </div>
            </div>

            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Backup Location
              </Text>
              <Dropdown defaultValue="cloud" style={{ width: '100%' }}>
                <Option value="cloud">Cloud Storage (AWS S3)</Option>
                <Option value="local">Local Server</Option>
                <Option value="ftp">FTP Server</Option>
                <Option value="both">Both Cloud & Local</Option>
              </Dropdown>
            </div>

            <Button appearance="primary" icon={<CloudSync20Regular />} style={{ marginTop: tokens.spacingVerticalM }}>
              Start Backup
            </Button>
          </div>
        </Card>

        <Card className={classes.actionCard}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Automatic Backup Schedule</Title3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Schedule Frequency
              </Text>
              <Dropdown defaultValue="daily" style={{ width: '100%' }}>
                <Option value="hourly">Every Hour</Option>
                <Option value="daily">Daily</Option>
                <Option value="weekly">Weekly</Option>
                <Option value="monthly">Monthly</Option>
              </Dropdown>
            </div>

            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Backup Time
              </Text>
              <Dropdown defaultValue="02:00" style={{ width: '100%' }}>
                <Option value="00:00">12:00 AM</Option>
                <Option value="02:00">02:00 AM</Option>
                <Option value="04:00">04:00 AM</Option>
                <Option value="22:00">10:00 PM</Option>
              </Dropdown>
            </div>

            <div>
              <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                Retention Policy
              </Text>
              <Dropdown defaultValue="30" style={{ width: '100%' }}>
                <Option value="7">Keep for 7 days</Option>
                <Option value="30">Keep for 30 days</Option>
                <Option value="90">Keep for 90 days</Option>
                <Option value="365">Keep for 1 year</Option>
                <Option value="forever">Keep forever</Option>
              </Dropdown>
            </div>

            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                backgroundColor: tokens.colorPaletteGreenBackground2,
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
                marginTop: tokens.spacingVerticalM,
              } as React.CSSProperties}
            >
              <Text weight="semibold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
                ✓ Automatic backups enabled
              </Text>
              <Text size={200}>Next backup: Tomorrow at 02:00 AM</Text>
            </div>

            <Button appearance="secondary" icon={<DocumentCheckmark20Regular />}>
              Update Schedule
            </Button>
          </div>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Backup History</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Backup Name</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Date & Time</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BACKUPS.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell>
                  <Text weight="semibold">{backup.name}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={backup.type === 'Full' ? 'brand' : 'informative'}>
                    {backup.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text>{backup.size}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(backup.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{backup.location}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="success">
                    {backup.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<ArrowDownload20Regular />}>
                      Download
                    </Button>
                    <Button appearance="primary" size="small" icon={<ArrowUpload20Regular />}>
                      Restore
                    </Button>
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
