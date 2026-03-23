/**
 * Accounting - Multi-Currency Support
 * EXPERT: Enterprise Solution Architect (Global Finance)
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
} from '@fluentui/react-components';
import { Add20Regular, CurrencyDollarEuro20Regular } from '@fluentui/react-icons';
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
  },
});

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', rate: 110.50, lastUpdated: '2026-03-20 10:00:00', isBase: false },
  { code: 'EUR', name: 'Euro', symbol: '€', rate: 120.25, lastUpdated: '2026-03-20 10:00:00', isBase: false },
  { code: 'GBP', name: 'British Pound', symbol: '£', rate: 138.75, lastUpdated: '2026-03-20 10:00:00', isBase: false },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', rate: 1.0, lastUpdated: '2026-03-20 10:00:00', isBase: true },
];

export const MultiCurrency = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
          <CurrencyDollarEuro20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
          <div>
            <Title3>Multi-Currency Support</Title3>
            <Text>Manage exchange rates and foreign currencies</Text>
          </div>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Currency
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Active Currencies
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {CURRENCIES.length}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Base Currency
          </Text>
          <Text size={500} weight="bold" block>
            BDT
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Last Rate Update
          </Text>
          <Text size={300}>Today, 10:00 AM</Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Auto Update
          </Text>
          <Badge appearance="tint" color="success">
            Enabled
          </Badge>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Exchange Rates</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Currency Code</TableHeaderCell>
              <TableHeaderCell>Currency Name</TableHeaderCell>
              <TableHeaderCell>Symbol</TableHeaderCell>
              <TableHeaderCell>Exchange Rate (to BDT)</TableHeaderCell>
              <TableHeaderCell>Last Updated</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CURRENCIES.map((currency) => (
              <TableRow key={currency.code}>
                <TableCell>
                  <Text weight="bold">{currency.code}</Text>
                </TableCell>
                <TableCell>
                  <Text>{currency.name}</Text>
                </TableCell>
                <TableCell>
                  <Text size={400}>{currency.symbol}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <Input
                      type="number"
                      value={currency.rate.toString()}
                      size="small"
                      style={{ width: '120px' }}
                      disabled={currency.isBase}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{currency.lastUpdated}</Text>
                </TableCell>
                <TableCell>
                  {currency.isBase ? (
                    <Badge appearance="tint" color="important">
                      Base Currency
                    </Badge>
                  ) : (
                    <Badge appearance="tint" color="success">
                      Active
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {!currency.isBase && (
                    <Button appearance="subtle" size="small">
                      Update Rate
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Currency Converter</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: tokens.spacingHorizontalL, alignItems: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            <Text weight="semibold">Amount</Text>
            <Input placeholder="Enter amount" type="number" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            <Text weight="semibold">From</Text>
            <Input placeholder="USD" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
            <Text weight="semibold">To</Text>
            <Input placeholder="BDT" />
          </div>
        </div>

        <Button appearance="primary" style={{ marginTop: tokens.spacingVerticalL }}>
          Convert
        </Button>

        <div
          style={{
            marginTop: tokens.spacingVerticalL,
            ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
        >
          <Text size={200} block>
            Converted Amount
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            ৳ 0.00
          </Text>
        </div>
      </Card>
    </div>
  );
};
