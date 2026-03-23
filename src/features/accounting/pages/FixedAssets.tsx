/**
 * Accounting - Fixed Assets Register
 * EXPERT: Senior React Engineer (Asset Management)
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
import { Add20Regular, VehicleTruck20Regular, Desktop20Regular, BuildingBank20Regular } from '@fluentui/react-icons';
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

const ASSETS = [
  {
    id: '1',
    assetNo: 'FA-001',
    name: 'Office Building',
    category: 'Property',
    purchaseDate: '2020-01-15',
    cost: 15000000,
    accumulatedDepreciation: 1500000,
    netBookValue: 13500000,
    lifespan: 30,
    usedYears: 6,
  },
  {
    id: '2',
    assetNo: 'FA-002',
    name: 'Delivery Truck',
    category: 'Vehicle',
    purchaseDate: '2024-06-01',
    cost: 3500000,
    accumulatedDepreciation: 583333,
    netBookValue: 2916667,
    lifespan: 10,
    usedYears: 1.8,
  },
  {
    id: '3',
    assetNo: 'FA-003',
    name: 'Computer Servers',
    category: 'IT Equipment',
    purchaseDate: '2025-03-10',
    cost: 800000,
    accumulatedDepreciation: 80000,
    netBookValue: 720000,
    lifespan: 5,
    usedYears: 1,
  },
];

export const FixedAssets = () => {
  const classes = useStyles();

  const totalCost = ASSETS.reduce((sum, a) => sum + a.cost, 0);
  const totalDepreciation = ASSETS.reduce((sum, a) => sum + a.accumulatedDepreciation, 0);
  const totalNetValue = ASSETS.reduce((sum, a) => sum + a.netBookValue, 0);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Fixed Assets Register</Title3>
          <Text>Track capital assets and depreciation</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Register Asset
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Asset Cost
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {formatCurrency(totalCost)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Accumulated Depreciation
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteRedForeground1 }}>
            {formatCurrency(totalDepreciation)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Net Book Value
          </Text>
          <Text size={500} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {formatCurrency(totalNetValue)}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
            Total Assets
          </Text>
          <Text size={500} weight="bold" block>
            {ASSETS.length}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Asset List</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Asset #</TableHeaderCell>
              <TableHeaderCell>Asset Name</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Purchase Date</TableHeaderCell>
              <TableHeaderCell>Original Cost</TableHeaderCell>
              <TableHeaderCell>Depreciation</TableHeaderCell>
              <TableHeaderCell>Net Book Value</TableHeaderCell>
              <TableHeaderCell>Asset Life</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ASSETS.map((asset) => {
              const assetLifePercent = (asset.usedYears / asset.lifespan) * 100;
              return (
                <TableRow key={asset.id}>
                  <TableCell>
                    <Text weight="semibold">{asset.assetNo}</Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      {asset.category === 'Property' && <BuildingBank20Regular />}
                      {asset.category === 'Vehicle' && <VehicleTruck20Regular />}
                      {asset.category === 'IT Equipment' && <Desktop20Regular />}
                      <Text weight="semibold">{asset.name}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{asset.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{formatDate(asset.purchaseDate)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{formatCurrency(asset.cost)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text style={{ color: tokens.colorPaletteRedForeground1 }}>{formatCurrency(asset.accumulatedDepreciation)}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {formatCurrency(asset.netBookValue)}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXXS }}>
                        {asset.usedYears.toFixed(1)} / {asset.lifespan} years
                      </Text>
                      <ProgressBar value={assetLifePercent} max={100} color="brand" thickness="medium" />
                    </div>
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
