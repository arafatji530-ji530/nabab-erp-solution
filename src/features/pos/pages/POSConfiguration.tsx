/**
 * POS - Configuration
 * EXPERT: Senior React Engineer (System Configuration)
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
  Dropdown,
  Option,
  Switch,
  Checkbox,
} from '@fluentui/react-components';
import { Settings20Regular, Save20Regular } from '@fluentui/react-icons';

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

export const POSConfiguration = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <Settings20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
        <div>
          <Title3>POS Configuration</Title3>
          <Text>Configure POS terminal settings and preferences</Text>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Terminal Settings</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Terminal ID</Text>
            <Input placeholder="Enter terminal ID" value="TERM-001" />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Terminal Name</Text>
            <Input placeholder="Enter terminal name" value="Cashier 1 - Main Counter" />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Default Warehouse</Text>
            <Dropdown placeholder="Select warehouse" defaultValue="Main Warehouse">
              <Option>Main Warehouse</Option>
              <Option>Branch Warehouse</Option>
              <Option>Regional Warehouse</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Receipt Printer</Text>
            <Dropdown placeholder="Select printer" defaultValue="Epson TM-T88">
              <Option>Epson TM-T88</Option>
              <Option>Star TSP143</Option>
              <Option>HP Thermal Printer</Option>
            </Dropdown>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Receipt Settings</Title3>

        <div className={classes.formSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Auto Print Receipt
              </Text>
              <Text size={300}>Automatically print receipt after payment</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Show Customer Copy
              </Text>
              <Text size={300}>Print customer copy of receipt</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Email Receipt Option
              </Text>
              <Text size={300}>Allow customers to receive receipt via email</Text>
            </div>
            <Switch />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Receipt Footer Text</Text>
            <Input placeholder="Enter footer text" value="Thank you for shopping with us!" />
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Payment Options</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
          <Checkbox label="Accept Cash Payments" defaultChecked />
          <Checkbox label="Accept Card Payments" defaultChecked />
          <Checkbox label="Accept Mobile Payments (bKash, Nagad, Rocket)" defaultChecked />
          <Checkbox label="Accept Store Credit" />
          <Checkbox label="Allow Split Payments" defaultChecked />
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Security Settings</Title3>

        <div className={classes.formSection}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Require PIN for Returns
              </Text>
              <Text size={300}>Manager PIN required for processing returns</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Require PIN for Discounts
              </Text>
              <Text size={300}>Manager PIN required for applying discounts</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Auto Logout
              </Text>
              <Text size={300}>Automatically logout after inactivity</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Inactivity Timeout (minutes)</Text>
            <Input placeholder="Enter timeout" type="number" value="15" />
          </div>
        </div>
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
