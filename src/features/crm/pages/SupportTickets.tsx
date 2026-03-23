/**
 * CRM - Support Ticket System
 * EXPERT: UI/UX Designer (Customer Support Interface)
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
  Input,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { Add20Regular, Chat20Regular, DocumentText20Regular } from '@fluentui/react-icons';
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

const TICKETS = [
  {
    id: '1',
    ticketNumber: 'TKT-2026-001',
    subject: 'Product not working',
    customer: 'ABC Industries',
    priority: 'High',
    status: 'Open',
    assignedTo: 'Support Agent 1',
    createdDate: '2026-03-28T09:30:00',
  },
  {
    id: '2',
    ticketNumber: 'TKT-2026-002',
    subject: 'Billing inquiry',
    customer: 'Tech Solutions',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Support Agent 2',
    createdDate: '2026-03-27T14:15:00',
  },
  {
    id: '3',
    ticketNumber: 'TKT-2026-003',
    subject: 'Installation assistance',
    customer: 'Build Masters',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Support Agent 1',
    createdDate: '2026-03-26T11:00:00',
  },
];

export const SupportTickets = () => {
  const classes = useStyles();

  const totalTickets = TICKETS.length;
  const openTickets = TICKETS.filter((t) => t.status === 'Open').length;
  const inProgress = TICKETS.filter((t) => t.status === 'In Progress').length;
  const resolved = TICKETS.filter((t) => t.status === 'Resolved').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
        return 'success';
      case 'In Progress':
        return 'brand';
      case 'Open':
        return 'warning';
      case 'Closed':
        return 'subtle';
      default:
        return 'subtle';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'brand';
      default:
        return 'subtle';
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Support Ticket System</Title3>
          <Text>Manage customer support requests and inquiries</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Ticket
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Tickets
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalTickets}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Open
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {openTickets}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            In Progress
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {inProgress}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Resolved
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {resolved}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Input placeholder="Search tickets..." style={{ flexGrow: 1, maxWidth: '400px' }} />
          <Dropdown placeholder="All Status">
            <Option value="all">All Status</Option>
            <Option value="open">Open</Option>
            <Option value="progress">In Progress</Option>
            <Option value="resolved">Resolved</Option>
            <Option value="closed">Closed</Option>
          </Dropdown>
          <Dropdown placeholder="All Priorities">
            <Option value="all">All Priorities</Option>
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Dropdown>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Ticket #</TableHeaderCell>
              <TableHeaderCell>Subject</TableHeaderCell>
              <TableHeaderCell>Customer</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Assigned To</TableHeaderCell>
              <TableHeaderCell>Created Date</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TICKETS.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <Text weight="semibold">{ticket.ticketNumber}</Text>
                </TableCell>
                <TableCell>
                  <Text>{ticket.subject}</Text>
                </TableCell>
                <TableCell>
                  <Text>{ticket.customer}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={ticket.assignedTo} size={24} />
                    <Text size={300}>{ticket.assignedTo}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(ticket.createdDate)}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small" icon={<Chat20Regular />}>
                      Reply
                    </Button>
                    <Button appearance="subtle" size="small" icon={<DocumentText20Regular />}>
                      View
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
