/**
 * CRM - Contact Management
 * EXPERT: Senior React Engineer (Contact Database)
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
  Avatar,
  Badge,
} from '@fluentui/react-components';
import { Add20Regular, Mail20Regular, Call20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const CONTACTS = [
  { id: '1', name: 'John Doe', company: 'ABC Corp', title: 'CEO', email: 'john@abc.com', phone: '+880 1711-123456', type: 'Lead' },
  { id: '2', name: 'Jane Smith', company: 'XYZ Ltd', title: 'CFO', email: 'jane@xyz.com', phone: '+880 1712-234567', type: 'Customer' },
  { id: '3', name: 'Mike Johnson', company: 'Tech Solutions', title: 'CTO', email: 'mike@tech.com', phone: '+880 1713-345678', type: 'Lead' },
];

export const ContactManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Contact Management</Title3>
          <Text>Manage customer and lead contacts</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Contact
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Contact Name</TableHeaderCell>
              <TableHeaderCell>Company</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CONTACTS.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Avatar name={contact.name} size={28} />
                    <Text weight="semibold">{contact.name}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Text>{contact.company}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{contact.title}</Text>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXXS }}>
                    <Mail20Regular />
                    <Text size={300}>{contact.email}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXXS }}>
                    <Call20Regular />
                    <Text size={300}>{contact.phone}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={contact.type === 'Customer' ? 'success' : 'brand'}>
                    {contact.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    View
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
