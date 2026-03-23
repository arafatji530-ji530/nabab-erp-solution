/**
 * Inventory - Bin Location Management
 * EXPERT: UI/UX Designer (Warehouse Visualization)
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
  ProgressBar,
} from '@fluentui/react-components';
import { Add20Regular, Location20Regular, BoxMultiple20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  warehouseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  warehouseCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  binGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginTop: tokens.spacingVerticalM,
  },
  binCell: {
    aspectRatio: '1',
    ...shorthands.padding(tokens.spacingVerticalS),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('2px', 'solid', tokens.colorNeutralStroke2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ':hover': {
      ...shorthands.border('2px', 'solid', tokens.colorBrandForeground1),
      boxShadow: tokens.shadow4,
    },
  },
});

const WAREHOUSES = [
  { id: '1', name: 'Dhaka Warehouse', bins: 250, occupied: 185, utilization: 74 },
  { id: '2', name: 'Chittagong Warehouse', bins: 180, occupied: 145, utilization: 81 },
  { id: '3', name: 'Sylhet Warehouse', bins: 120, occupied: 78, utilization: 65 },
];

const BIN_LOCATIONS = [
  { code: 'A-01-01', status: 'Occupied', product: 'Industrial Drill', quantity: 45, capacity: 50 },
  { code: 'A-01-02', status: 'Occupied', product: 'Safety Helmets', quantity: 200, capacity: 250 },
  { code: 'A-01-03', status: 'Empty', product: null, quantity: 0, capacity: 100 },
  { code: 'A-01-04', status: 'Occupied', product: 'Welding Machine', quantity: 15, capacity: 20 },
  { code: 'A-01-05', status: 'Reserved', product: null, quantity: 0, capacity: 75 },
];

export const BinLocationManagement = () => {
  const classes = useStyles();

  const getBinColor = (status: string) => {
    switch (status) {
      case 'Occupied':
        return tokens.colorPaletteGreenBackground2;
      case 'Empty':
        return tokens.colorNeutralBackground3;
      case 'Reserved':
        return tokens.colorPaletteYellowBackground2;
      default:
        return tokens.colorNeutralBackground2;
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Bin Location Management</Title3>
          <Text>Organize and optimize warehouse storage locations</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Bin Location
        </Button>
      </div>

      <div className={classes.warehouseGrid}>
        {WAREHOUSES.map((warehouse) => (
          <Card key={warehouse.id} className={classes.warehouseCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginBottom: tokens.spacingVerticalM }}>
              <Location20Regular style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />
              <Text weight="semibold" size={400}>
                {warehouse.name}
              </Text>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size={300}>Total Bins</Text>
                <Text weight="semibold">{warehouse.bins}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size={300}>Occupied</Text>
                <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                  {warehouse.occupied}
                </Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text size={300}>Available</Text>
                <Text weight="semibold" style={{ color: tokens.colorPaletteBlueForeground2 }}>
                  {warehouse.bins - warehouse.occupied}
                </Text>
              </div>

              <div style={{ marginTop: tokens.spacingVerticalS }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={200}>Utilization</Text>
                  <Text size={200} weight="bold">
                    {warehouse.utilization}%
                  </Text>
                </div>
                <ProgressBar
                  value={warehouse.utilization}
                  max={100}
                  color={warehouse.utilization > 80 ? 'warning' : warehouse.utilization > 60 ? 'brand' : 'success'}
                  thickness="large"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalXL) } as React.CSSProperties}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
          <div>
            <Title3>Warehouse Layout - Aisle A, Row 01</Title3>
            <Text size={300}>Visual bin location map</Text>
          </div>
          <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: tokens.colorPaletteGreenBackground2, ...shorthands.borderRadius('4px') } as React.CSSProperties} />
              <Text size={200}>Occupied</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: tokens.colorNeutralBackground3, ...shorthands.borderRadius('4px') } as React.CSSProperties} />
              <Text size={200}>Empty</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
              <div style={{ width: '16px', height: '16px', backgroundColor: tokens.colorPaletteYellowBackground2, ...shorthands.borderRadius('4px') } as React.CSSProperties} />
              <Text size={200}>Reserved</Text>
            </div>
          </div>
        </div>

        <div className={classes.binGrid}>
          {BIN_LOCATIONS.map((bin) => (
            <div
              key={bin.code}
              className={classes.binCell}
              style={{ backgroundColor: getBinColor(bin.status) }}
            >
              <Text size={200} weight="bold">
                {bin.code}
              </Text>
              <Badge appearance="tint" size="small" color={
                bin.status === 'Occupied' ? 'success' :
                bin.status === 'Reserved' ? 'warning' :
                'subtle'
              }>
                {bin.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
          <Title3>Bin Details - Dhaka Warehouse</Title3>
          <Input placeholder="Search bin location..." style={{ maxWidth: '300px' }} />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Bin Code</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Product</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Capacity</TableHeaderCell>
              <TableHeaderCell>Utilization</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {BIN_LOCATIONS.map((bin) => {
              const utilization = bin.capacity > 0 ? ((bin.quantity / bin.capacity) * 100).toFixed(1) : 0;
              return (
                <TableRow key={bin.code}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <BoxMultiple20Regular />
                      <Text weight="semibold">{bin.code}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      appearance="tint"
                      color={
                        bin.status === 'Occupied' ? 'success' :
                        bin.status === 'Reserved' ? 'warning' :
                        'subtle'
                      }
                    >
                      {bin.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Text>{bin.product || '-'}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{bin.quantity}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{bin.capacity}</Text>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Text size={300} weight="bold" block>
                        {utilization}%
                      </Text>
                      <ProgressBar
                        value={parseFloat(utilization as string)}
                        max={100}
                        color={parseFloat(utilization as string) > 90 ? 'error' : parseFloat(utilization as string) > 70 ? 'warning' : 'success'}
                        thickness="medium"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button appearance="subtle" size="small">
                      Edit
                    </Button>
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
