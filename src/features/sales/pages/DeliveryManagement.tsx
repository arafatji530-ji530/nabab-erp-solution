/**
 * Sales - Delivery Management
 * EXPERT: Senior React Engineer (Logistics Tracking)
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
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { VehicleTruck20Regular, Location20Regular, Navigation20Regular } from '@fluentui/react-icons';
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
});

const DELIVERIES = [
  {
    id: '1',
    deliveryNumber: 'DEL-2026-001',
    orderNumber: 'ORD-2026-045',
    customer: 'ABC Industries Ltd',
    destination: 'Dhaka, Bangladesh',
    driver: 'Mohammad Rahman',
    vehicle: 'DHL-1234',
    status: 'In Transit',
    scheduledDate: '2026-03-28',
    progress: 65,
  },
  {
    id: '2',
    deliveryNumber: 'DEL-2026-002',
    orderNumber: 'ORD-2026-046',
    customer: 'Tech Solutions',
    destination: 'Chittagong, Bangladesh',
    driver: 'Karim Ali',
    vehicle: 'DHL-1235',
    status: 'Delivered',
    scheduledDate: '2026-03-27',
    progress: 100,
  },
  {
    id: '3',
    deliveryNumber: 'DEL-2026-003',
    orderNumber: 'ORD-2026-047',
    customer: 'Build Masters',
    destination: 'Sylhet, Bangladesh',
    driver: 'Fatima Hasan',
    vehicle: 'DHL-1236',
    status: 'Pending',
    scheduledDate: '2026-03-29',
    progress: 0,
  },
];

export const DeliveryManagement = () => {
  const classes = useStyles();

  const totalDeliveries = DELIVERIES.length;
  const inTransit = DELIVERIES.filter((d) => d.status === 'In Transit').length;
  const delivered = DELIVERIES.filter((d) => d.status === 'Delivered').length;
  const pending = DELIVERIES.filter((d) => d.status === 'Pending').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'In Transit':
        return 'brand';
      case 'Pending':
        return 'warning';
      case 'Delayed':
        return 'danger';
      default:
        return 'subtle';
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Delivery Management</Title3>
          <Text>Track and manage order deliveries</Text>
        </div>
        <Button appearance="primary" icon={<VehicleTruck20Regular />}>
          Schedule Delivery
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Deliveries
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalDeliveries}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            In Transit
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {inTransit}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Delivered
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {delivered}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {pending}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Input placeholder="Search deliveries..." style={{ flexGrow: 1, maxWidth: '400px' }} />
          <Dropdown placeholder="All Status">
            <Option value="all">All Status</Option>
            <Option value="pending">Pending</Option>
            <Option value="transit">In Transit</Option>
            <Option value="delivered">Delivered</Option>
            <Option value="delayed">Delayed</Option>
          </Dropdown>
          <Dropdown placeholder="All Drivers">
            <Option value="all">All Drivers</Option>
            <Option value="driver1">Mohammad Rahman</Option>
            <Option value="driver2">Karim Ali</Option>
            <Option value="driver3">Fatima Hasan</Option>
          </Dropdown>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Delivery #</TableHeaderCell>
              <TableHeaderCell>Order #</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Destination</TableHeaderCell>
              <TableHeaderCell>Driver</TableHeaderCell>
              <TableHeaderCell>Vehicle</TableHeaderCell>
              <TableHeaderCell>Scheduled Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DELIVERIES.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>
                  <Text weight="semibold">{delivery.deliveryNumber}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{delivery.orderNumber}</Text>
                </TableCell>
                <TableCell>
                  <Text>{delivery.customer}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Location20Regular />
                    <Text size={300}>{delivery.destination}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{delivery.driver}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <VehicleTruck20Regular />
                    <Text size={300}>{delivery.vehicle}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(delivery.scheduledDate)}</Text>
                </TableCell>
                <TableCell>
                  <div>
                    <Badge appearance="tint" color={getStatusColor(delivery.status)}>
                      {delivery.status}
                    </Badge>
                    {delivery.status === 'In Transit' && (
                      <Text size={200} block style={{ color: tokens.colorNeutralForeground3 }}>
                        {delivery.progress}% complete
                      </Text>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<Navigation20Regular />}>
                      Track
                    </Button>
                    {delivery.status === 'Pending' && (
                      <Button appearance="primary" size="small">
                        Dispatch
                      </Button>
                    )}
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
