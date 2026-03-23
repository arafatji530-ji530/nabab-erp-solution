/**
 * HR - Document Management
 * EXPERT: DevOps & Compliance Engineer (Document Storage)
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
} from '@fluentui/react-components';
import { Add20Regular, DocumentPdf20Regular, ArrowDownload20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

const DOCUMENTS = [
  { id: '1', name: 'Employee Handbook 2026', category: 'Policy', uploadDate: '2026-01-05', size: '2.4 MB' },
  { id: '2', name: 'Leave Policy', category: 'Policy', uploadDate: '2026-02-10', size: '850 KB' },
  { id: '3', name: 'Payroll Guidelines', category: 'Finance', uploadDate: '2026-03-01', size: '1.2 MB' },
];

export const DocumentManagement = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>HR Document Management</Title3>
          <Text>Store and manage HR documents and policies</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Upload Document
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Document Name</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Upload Date</TableHeaderCell>
              <TableHeaderCell>Size</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DOCUMENTS.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <DocumentPdf20Regular />
                    <Text weight="semibold">{doc.name}</Text>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{doc.category}</Badge>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(doc.uploadDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{doc.size}</Text>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small" icon={<ArrowDownload20Regular />}>
                    Download
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
