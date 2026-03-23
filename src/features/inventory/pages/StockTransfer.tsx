/**
 * Inventory - Stock Transfer Page
 * Transfer stock between warehouses
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Label,
  Title3,
  Text,
  Card,
  Dropdown,
  Option,
  MessageBar,
  MessageBarBody,
  Textarea,
} from '@fluentui/react-components';
import {
  ArrowSwap20Regular,
  Save20Regular,
  Dismiss20Regular,
} from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  transferDirection: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  warehouseBox: {
    flex: 1,
    ...shorthands.padding(tokens.spacingVerticalM),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    justifyContent: 'flex-end',
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.padding(tokens.spacingVerticalL, '0'),
    marginTop: tokens.spacingVerticalL,
  },
});

export const StockTransfer = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [fromWarehouse, setFromWarehouse] = useState('');
  const [toWarehouse, setToWarehouse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className={classes.container}>
      <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Stock Transfer</Title3>

      {success && (
        <MessageBar intent="success" style={{ marginBottom: tokens.spacingVerticalL }}>
          <MessageBarBody>Stock transfer initiated successfully!</MessageBarBody>
        </MessageBar>
      )}

      <Card>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.transferDirection}>
            <div className={classes.warehouseBox}>
              <Text size={200} block style={{ marginBottom: tokens.spacingVerticalS }}>
                From Warehouse
              </Text>
              <Dropdown
                placeholder="Select source warehouse"
                value={fromWarehouse}
                onOptionSelect={(_, data) => setFromWarehouse(data.optionValue as string)}
              >
                <Option value="wh-dhaka">Dhaka Warehouse</Option>
                <Option value="wh-chittagong">Chittagong Warehouse</Option>
                <Option value="wh-sylhet">Sylhet Warehouse</Option>
              </Dropdown>
            </div>

            <ArrowSwap20Regular style={{ fontSize: '24px', color: tokens.colorBrandForeground1 }} />

            <div className={classes.warehouseBox}>
              <Text size={200} block style={{ marginBottom: tokens.spacingVerticalS }}>
                To Warehouse
              </Text>
              <Dropdown
                placeholder="Select destination warehouse"
                value={toWarehouse}
                onOptionSelect={(_, data) => setToWarehouse(data.optionValue as string)}
              >
                <Option value="wh-dhaka">Dhaka Warehouse</Option>
                <Option value="wh-chittagong">Chittagong Warehouse</Option>
                <Option value="wh-sylhet">Sylhet Warehouse</Option>
              </Dropdown>
            </div>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <Label required>Product</Label>
              <Dropdown placeholder="Select product">
                <Option value="prod-1">Industrial Drill Machine</Option>
                <Option value="prod-2">Circuit Breaker 220V</Option>
                <Option value="prod-3">Safety Helmet</Option>
              </Dropdown>
            </div>

            <div className={classes.formGroup}>
              <Label required>Quantity</Label>
              <Input type="number" placeholder="Enter quantity" />
            </div>
          </div>

          <div className={classes.formRow}>
            <div className={classes.formGroup}>
              <Label required>Transfer Date</Label>
              <Input type="date" defaultValue={formatDate(new Date().toISOString()).split('/').reverse().join('-')} />
            </div>

            <div className={classes.formGroup}>
              <Label>Reference Number</Label>
              <Input placeholder="Auto-generated" disabled />
            </div>
          </div>

          <div className={classes.formGroup}>
            <Label>Notes</Label>
            <Textarea rows={3} placeholder="Additional notes..." />
          </div>

          <div className={classes.actions}>
            <Button appearance="secondary" icon={<Dismiss20Regular />} type="button">
              Cancel
            </Button>
            <Button appearance="primary" icon={<Save20Regular />} type="submit">
              Initiate Transfer
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
