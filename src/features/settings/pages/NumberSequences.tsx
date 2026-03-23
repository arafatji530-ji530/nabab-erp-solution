/**
 * Settings - Number Sequences
 * EXPERT: Enterprise Solution Architect (Document Numbering)
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
import { Save20Regular, NumberSymbol20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
});

const SEQUENCES = [
  { id: '1', entity: 'Sales Order', prefix: 'SO-', format: '{YYYY}-{###}', nextNumber: 1245, example: 'SO-2026-1245' },
  { id: '2', entity: 'Invoice', prefix: 'INV-', format: '{####}', nextNumber: 5678, example: 'INV-5678' },
  { id: '3', entity: 'Purchase Order', prefix: 'PO-', format: '{YYYY}{MM}{####}', nextNumber: 342, example: 'PO-202603-0342' },
  { id: '4', entity: 'Customer', prefix: 'CUST-', format: '{#####}', nextNumber: 10024, example: 'CUST-10024' },
  { id: '5', entity: 'Product', prefix: 'PRD-', format: '{CATCODE}-{####}', nextNumber: 892, example: 'PRD-ELEC-0892' },
  { id: '6', entity: 'Employee', prefix: 'EMP-', format: '{YYYY}-{####}', nextNumber: 156, example: 'EMP-2026-0156' },
];

export const NumberSequences = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <NumberSymbol20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
        <div>
          <Title3>Number Sequences</Title3>
          <Text>Configure automatic number generation for documents</Text>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Document Number Sequences</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Entity</TableHeaderCell>
              <TableHeaderCell>Prefix</TableHeaderCell>
              <TableHeaderCell>Format</TableHeaderCell>
              <TableHeaderCell>Next Number</TableHeaderCell>
              <TableHeaderCell>Example</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SEQUENCES.map((seq) => (
              <TableRow key={seq.id}>
                <TableCell>
                  <Text weight="semibold">{seq.entity}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="brand">
                    {seq.prefix}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Text size={300} style={{ fontFamily: 'monospace' }}>
                    {seq.format}
                  </Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold">{seq.nextNumber}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300} style={{ fontFamily: 'monospace', color: tokens.colorPaletteGreenForeground1 }}>
                    {seq.example}
                  </Text>
                </TableCell>
                <TableCell>
                  <Button appearance="subtle" size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Format Tokens</Title3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Date Tokens
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{YYYY}'} - Full year (2026)
              </Text>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{YY}'} - Short year (26)
              </Text>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{MM}'} - Month (01-12)
              </Text>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{DD}'} - Day (01-31)
              </Text>
            </div>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Number Tokens
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS }}>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{#}'} - 1 digit (1, 2, 3...)
              </Text>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{###}'} - 3 digits (001, 002, 003...)
              </Text>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{#####}'} - 5 digits (00001, 00002...)
              </Text>
              <Text size={300} style={{ fontFamily: 'monospace' }}>
                {'{CATCODE}'} - Dynamic category code
              </Text>
            </div>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Reset Options</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
          <div className={classes.field}>
            <Text weight="semibold">Reset Frequency</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS }}>
              <Text size={300}>• Never (continuous numbering)</Text>
              <Text size={300}>• Yearly (reset on January 1st)</Text>
              <Text size={300}>• Monthly (reset on 1st of each month)</Text>
              <Text size={300}>• Daily (reset every day)</Text>
            </div>
          </div>

          <div
            style={{
              ...shorthands.padding(tokens.spacingVerticalM),
              backgroundColor: tokens.colorPaletteYellowBackground2,
              ...shorthands.borderRadius(tokens.borderRadiusMedium),
            } as React.CSSProperties}
          >
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
              ⚠️ Important
            </Text>
            <Text size={300}>
              Changing number sequences may cause gaps in numbering. Ensure compliance with local regulations before modifying.
            </Text>
          </div>
        </div>
      </Card>

      <Button appearance="primary" icon={<Save20Regular />}>
        Save All Sequences
      </Button>
    </div>
  );
};
