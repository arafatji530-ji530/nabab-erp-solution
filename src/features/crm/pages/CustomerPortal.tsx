/**
 * CRM - Customer Portal & Self-Service
 * EXPERT: UI/UX Designer (Customer Experience)
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
  Badge,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from '@fluentui/react-components';
import {
  DocumentText20Regular,
  Payment20Regular,
  BoxCheckmark20Regular,
  QuestionCircle20Regular,
} from '@fluentui/react-icons';
import { formatCurrency, formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  quickActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  actionCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    textAlign: 'center',
    cursor: 'pointer',
    ':hover': {
      boxShadow: tokens.shadow8,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
  sectionCard: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
});

const INVOICES = [
  { id: '1', number: 'INV-2026-001', date: '2026-03-15', amount: 125000, status: 'Paid' },
  { id: '2', number: 'INV-2026-002', date: '2026-03-20', amount: 89500, status: 'Pending' },
  { id: '3', number: 'INV-2026-003', date: '2026-03-25', amount: 45000, status: 'Overdue' },
];

const ORDERS = [
  { id: '1', number: 'ORD-2026-001', date: '2026-03-18', status: 'Delivered', items: 5 },
  { id: '2', number: 'ORD-2026-002', date: '2026-03-22', status: 'In Transit', items: 3 },
  { id: '3', number: 'ORD-2026-003', date: '2026-03-26', status: 'Processing', items: 8 },
];

export const CustomerPortal = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Title3>Customer Portal</Title3>
        <Text>Self-service portal for customer access</Text>
      </div>

      <div className={classes.quickActions}>
        <Card className={classes.actionCard}>
          <DocumentText20Regular style={{ fontSize: '48px', color: tokens.colorBrandForeground1 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            View Invoices
          </Text>
        </Card>

        <Card className={classes.actionCard}>
          <Payment20Regular style={{ fontSize: '48px', color: tokens.colorPaletteGreenForeground1 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            Make Payment
          </Text>
        </Card>

        <Card className={classes.actionCard}>
          <BoxCheckmark20Regular style={{ fontSize: '48px', color: tokens.colorPaletteBlueForeground2 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            Track Orders
          </Text>
        </Card>

        <Card className={classes.actionCard}>
          <QuestionCircle20Regular style={{ fontSize: '48px', color: tokens.colorPaletteYellowForeground1 }} />
          <Text weight="semibold" size={400} block style={{ marginTop: tokens.spacingVerticalM }}>
            Support Tickets
          </Text>
        </Card>
      </div>

      <Card className={classes.sectionCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Recent Invoices</Title3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Invoice #</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICES.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Text weight="semibold">{invoice.number}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatDate(invoice.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="semibold">{formatCurrency(invoice.amount)}</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={
                      invoice.status === 'Paid' ? 'success' : invoice.status === 'Overdue' ? 'danger' : 'warning'
                    }
                  >
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small">
                      View
                    </Button>
                    <Button appearance="subtle" size="small">
Download
                    </Button>
                    {invoice.status !== 'Paid' && (
                      <Button appearance="primary" size="small">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className={classes.sectionCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Order Tracking</Title3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Order #</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Items</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ORDERS.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Text weight="semibold">{order.number}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatDate(order.date)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{order.items} items</Text>
                </TableCell>
                <TableCell>
                  <Badge
                    appearance="tint"
                    color={
                      order.status === 'Delivered'
                        ? 'success'
                        : order.status === 'In Transit'
                          ? 'brand'
                          : 'warning'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    Track
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className={classes.sectionCard}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Knowledge Base & FAQ</Title3>
        <Accordion collapsible>
          <AccordionItem value="1">
            <AccordionHeader>How do I track my order?</AccordionHeader>
            <AccordionPanel>
              <Text>
                You can track your order by clicking on the "Track Orders" button above or by navigating to the Order
                Tracking section and entering your order number.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="2">
            <AccordionHeader>What payment methods do you accept?</AccordionHeader>
            <AccordionPanel>
              <Text>
                We accept credit cards, bank transfers, mobile banking, and cash on delivery for eligible orders.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="3">
            <AccordionHeader>How do I request a return or exchange?</AccordionHeader>
            <AccordionPanel>
              <Text>
                Returns and exchanges can be requested by contacting our support team or by submitting a ticket through
                the Support Tickets section.
              </Text>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem value="4">
            <AccordionHeader>Can I update my billing information?</AccordionHeader>
            <AccordionPanel>
              <Text>
                Yes, you can update your billing information by navigating to Account Settings and selecting the Billing
                tab.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};
