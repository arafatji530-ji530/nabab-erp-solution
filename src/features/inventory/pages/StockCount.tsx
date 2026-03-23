/**
 * Inventory - Stock Count & Physical Audit
 * EXPERT: Enterprise Solution Architect (Audit Trail Pattern)
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
  Input,
  Badge,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import {
  Add20Regular,
  DocumentCheckmark20Regular,
  Warning20Regular,
  Checkmark20Regular,
} from '@fluentui/react-icons';
import { formatNumber, formatDate } from '@/shared/utils/formatters';

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
  table: {
    width: '100%',
  },
  varianceCell: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

const STOCK_COUNT_DATA = [
  {
    id: '1',
    product: 'Industrial Drill DX-500',
    systemQty: 145,
    countedQty: 143,
    variance: -2,
    location: 'A-12-05',
    status: 'Discrepancy',
  },
  {
    id: '2',
    product: 'Circuit Breaker 220V',
    systemQty: 320,
    countedQty: 320,
    variance: 0,
    location: 'B-08-12',
    status: 'Matched',
  },
  {
    id: '3',
    product: 'Safety Helmet Pro',
    systemQty: 45,
    countedQty: 48,
    variance: +3,
    location: 'C-15-03',
    status: 'Discrepancy',
  },
  {
    id: '4',
    product: 'Wire Cable 100m',
    systemQty: 89,
    countedQty: null,
    variance: null,
    location: 'A-20-08',
    status: 'Pending',
  },
];

export const StockCount = () => {
  const classes = useStyles();

  const matched = STOCK_COUNT_DATA.filter((item) => item.status === 'Matched').length;
  const discrepancies = STOCK_COUNT_DATA.filter((item) => item.status === 'Discrepancy').length;
  const pending = STOCK_COUNT_DATA.filter((item) => item.status === 'Pending').length;
  const totalVariance = STOCK_COUNT_DATA.reduce((sum, item) => sum + (item.variance || 0), 0);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Stock Count & Physical Audit</Title3>
          <Text>Perform cycle counts and reconcile physical inventory</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<DocumentCheckmark20Regular />}>
            Finalize Count
          </Button>
          <Button appearance="primary" icon={<Add20Regular />}>
            New Count Session
          </Button>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalM }}>
          <div>
            <Text weight="semibold" size={400}>
              Count Session: SC-2026-003
            </Text>
            <Text size={300} block>
              Started: {formatDate(new Date().toISOString())} • Dhaka Warehouse
            </Text>
          </div>
          <Dropdown placeholder="Filter by Status" defaultValue="all">
            <Option value="all">All Items</Option>
            <Option value="pending">Pending</Option>
            <Option value="matched">Matched</Option>
            <Option value="discrepancy">Discrepancies</Option>
          </Dropdown>
        </div>
      </Card>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Checkmark20Regular
            style={{
              fontSize: '32px',
              color: tokens.colorPaletteGreenForeground1,
              marginBottom: tokens.spacingVerticalS,
            }}
          />
          <Text size={200} block>
            Matched
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {matched}
          </Text>
        </Card>

        <Card className={classes.statCard}>
          <Warning20Regular
            style={{
              fontSize: '32px',
              color: tokens.colorPaletteRedForeground1,
              marginBottom: tokens.spacingVerticalS,
            }}
          />
          <Text size={200} block>
            Discrepancies
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {discrepancies}
          </Text>
        </Card>

        <Card className={classes.statCard}>
          <DocumentCheckmark20Regular
            style={{
              fontSize: '32px',
              color: tokens.colorPaletteYellowForeground1,
              marginBottom: tokens.spacingVerticalS,
            }}
          />
          <Text size={200} block>
            Pending Count
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {pending}
          </Text>
        </Card>

        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Variance
          </Text>
          <Text
            size={600}
            weight="bold"
            block
            style={{
              color:
                totalVariance > 0
                  ? tokens.colorPaletteGreenForeground1
                  : totalVariance < 0
                  ? tokens.colorPaletteRedForeground1
                  : tokens.colorNeutralForeground1,
            }}
          >
            {totalVariance > 0 ? '+' : ''}
            {totalVariance}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>System Qty</TableHeaderCell>
              <TableHeaderCell>Counted Qty</TableHeaderCell>
              <TableHeaderCell>Variance</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STOCK_COUNT_DATA.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Text weight="semibold">{item.product}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{item.location}</Badge>
                </TableCell>
                <TableCell>
                  <Text>{formatNumber(item.systemQty, 0)}</Text>
                </TableCell>
                <TableCell>
                  {item.countedQty !== null ? (
                    <Text weight="semibold">{formatNumber(item.countedQty, 0)}</Text>
                  ) : (
                    <Input type="number" size="small" placeholder="Enter count" style={{ width: '100px' }} />
                  )}
                </TableCell>
                <TableCell>
                  {item.variance !== null && (
                    <div className={classes.varianceCell}>
                      {item.variance !== 0 && <Warning20Regular style={{ fontSize: '16px', color: tokens.colorPaletteRedForeground1 }} />}
                      <Text
                        weight="bold"
                        style={{
                          color:
                            item.variance > 0
                              ? tokens.colorPaletteGreenForeground1
                              : item.variance < 0
                              ? tokens.colorPaletteRedForeground1
                              : tokens.colorNeutralForeground1,
                        }}
                      >
                        {item.variance > 0 ? '+' : ''}
                        {item.variance}
                      </Text>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={
                      item.status === 'Matched'
                        ? 'success'
                        : item.status === 'Discrepancy'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    {item.countedQty === null ? 'Record Count' : 'Recount'}
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
