/**
 * Settings - Tax Configuration
 * EXPERT: DevOps & Compliance Engineer (Tax Management)
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
  Input,
  Switch,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
} from '@fluentui/react-components';
import { Add20Regular, Save20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
});

const TAX_RATES = [
  { id: '1', name: 'VAT Standard', rate: 15.0, type: 'VAT', applicable: 'Goods', status: 'Active' },
  { id: '2', name: 'Service Tax', rate: 5.0, type: 'Service Tax', applicable: 'Services', status: 'Active' },
  { id: '3', name: 'Import Duty', rate: 25.0, type: 'Customs', applicable: 'Imports', status: 'Active' },
];

export const TaxConfiguration = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Tax Configuration</Title3>
          <Text>Configure tax rates and rules</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Tax Rate
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Default Tax Settings</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Tax Identification Number (TIN)</Text>
            <Input placeholder="Enter TIN" value="123456789012" />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Tax Registration Name</Text>
            <Input placeholder="Enter registered business name" value="Nabab Corporation Ltd" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Enable Tax Calculation
              </Text>
              <Text size={300}>Automatically calculate taxes on transactions</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Include Tax in Price
              </Text>
              <Text size={300}>Display prices including tax</Text>
            </div>
            <Switch />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Generate Tax Reports
              </Text>
              <Text size={300}>Automatic monthly tax report generation</Text>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Tax Rates</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Tax Name</TableHeaderCell>
              <TableHeaderCell>Rate (%)</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Applicable To</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TAX_RATES.map((tax) => (
              <TableRow key={tax.id}>
                <TableCell>
                  <Text weight="semibold">{tax.name}</Text>
                </TableCell>
                <TableCell>
                  <Text weight="bold">{tax.rate}%</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{tax.type}</Badge>
                </TableCell>
                <TableCell>
                  <Text>{tax.applicable}</Text>
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color="success">
                    {tax.status}
                  </Badge>
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

      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
        <Button appearance="primary" icon={<Save20Regular />}>
          Save Configuration
        </Button>
        <Button appearance="subtle">Reset to Defaults</Button>
      </div>
    </div>
  );
};
