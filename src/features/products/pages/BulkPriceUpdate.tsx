/**
 * Products - Bulk Price Update
 * EXPERT: Enterprise Solution Architect (Batch Operations)
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
  Label,
  Dropdown,
  Option,
  Radio,
  RadioGroup,
  Checkbox,
  ProgressBar,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import {
  ArrowUpload20Regular,
  ArrowDownload20Regular,
  Calculator20Regular,
  Checkmark20Regular,
} from '@fluentui/react-icons';
import { formatCurrency } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    maxWidth: '1200px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  card: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalM,
  },
  previewSection: {
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    marginTop: tokens.spacingVerticalL,
  },
  previewRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  previewHeader: {
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    ...shorthands.borderBottom('2px', 'solid', tokens.colorNeutralStroke2),
  },
});

const PREVIEW_DATA = [
  { name: 'Industrial Drill DX-500', current: 4500, new: 4950, change: '+10%' },
  { name: 'Circuit Breaker 220V', current: 850, new: 935, change: '+10%' },
  { name: 'Safety Helmet Pro', current: 450, new: 495, change: '+10%' },
  { name: 'Wire Cable 100m', current: 1200, new: 1320, change: '+10%' },
];

export const BulkPriceUpdate = () => {
  const classes = useStyles();
  const [updateType, setUpdateType] = useState<'percentage' | 'fixed'>('percentage');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleApplyChanges = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Bulk Price Update</Title3>
          <Text>Update prices for multiple products simultaneously</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export Template
          </Button>
          <Button appearance="secondary" icon={<ArrowUpload20Regular />}>
            Import from CSV
          </Button>
        </div>
      </div>

      {success && (
        <MessageBar intent="success">
          <MessageBarBody>
            Successfully updated prices for 1,234 products!
          </MessageBarBody>
        </MessageBar>
      )}

      <div className={classes.grid}>
        <Card className={classes.card}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Update Criteria</Title3>

          <div className={classes.formGroup}>
            <Label required>Select Products</Label>
            <Dropdown placeholder="Choose products to update">
              <Option value="all">All Products (1,234)</Option>
              <Option value="category">By Category</Option>
              <Option value="brand">By Brand</Option>
              <Option value="supplier">By Supplier</Option>
              <Option value="selected">Specific Products</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Update Type</Label>
            <RadioGroup
              value={updateType}
              onChange={(_, data) => setUpdateType(data.value as 'percentage' | 'fixed')}
            >
              <Radio value="percentage" label="Percentage Change" />
              <Radio value="fixed" label="Fixed Amount" />
            </RadioGroup>
          </div>

          {updateType === 'percentage' ? (
            <div className={classes.formGroup}>
              <Label required>Percentage Change (%)</Label>
              <Input
                type="number"
                placeholder="e.g., 10 for 10% increase, -5 for 5% decrease"
                contentBefore={<Calculator20Regular />}
              />
            </div>
          ) : (
            <div className={classes.formGroup}>
              <Label required>Amount Change (BDT)</Label>
              <Input
                type="number"
                placeholder="e.g., 100 for ৳100 increase"
                contentBefore={<Calculator20Regular />}
              />
            </div>
          )}

          <div className={classes.formGroup}>
            <Label>Price Rounding</Label>
            <Dropdown defaultValue="none">
              <Option value="none">No Rounding</Option>
              <Option value="nearest5">Round to Nearest 5</Option>
              <Option value="nearest10">Round to Nearest 10</Option>
              <Option value="nearest50">Round to Nearest 50</Option>
              <Option value="nearest100">Round to Nearest 100</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Additional Options
            </Text>
            <Checkbox label="Update Purchase Price Automatically" />
            <Checkbox label="Maintain Profit Margin" />
            <Checkbox label="Apply to Variants" defaultChecked />
            <Checkbox label="Update Tax Calculation" />
          </div>

          <div className={classes.formGroup}>
            <Label>Effective Date</Label>
            <Input type="date" />
          </div>

          <Button
            appearance="primary"
            icon={<Calculator20Regular />}
            style={{ width: '100%' }}
            onClick={() => {}}
          >
            Calculate Preview
          </Button>
        </Card>

        <Card className={classes.card}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Update Summary</Title3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                backgroundColor: tokens.colorNeutralBackground2,
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
                textAlign: 'center',
              } as React.CSSProperties}
            >
              <Text size={200} block>
                Products Affected
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
                1,234
              </Text>
            </div>
            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalM),
                backgroundColor: tokens.colorNeutralBackground2,
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
                textAlign: 'center',
              } as React.CSSProperties}
            >
              <Text size={200} block>
                Avg Price Change
              </Text>
              <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
                +10%
              </Text>
            </div>
          </div>

          <div className={classes.previewSection}>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalM }}>
              Preview (First 4 of 1,234)
            </Text>

            <div className={classes.previewRow} style={{ ...shorthands.padding(tokens.spacingVerticalS, '0') } as React.CSSProperties}>
              <Text className={classes.previewHeader}>Product</Text>
              <Text className={classes.previewHeader}>Current</Text>
              <Text className={classes.previewHeader}>New Price</Text>
              <Text className={classes.previewHeader}>Change</Text>
            </div>

            {PREVIEW_DATA.map((item, idx) => (
              <div key={idx} className={classes.previewRow}>
                <Text size={300} truncate>
                  {item.name}
                </Text>
                <Text size={300}>{formatCurrency(item.current)}</Text>
                <Text size={300} weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                  {formatCurrency(item.new)}
                </Text>
                <Text size={300} style={{ color: tokens.colorPaletteGreenForeground1 }}>
                  {item.change}
                </Text>
              </div>
            ))}
          </div>

          {processing && (
            <div style={{ marginTop: tokens.spacingVerticalL }}>
              <Text block style={{ marginBottom: tokens.spacingVerticalS }}>
                Updating prices... 823 of 1,234
              </Text>
              <ProgressBar value={0.67} />
            </div>
          )}

          <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalL }}>
            <Button appearance="secondary" style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              appearance="primary"
              icon={<Checkmark20Regular />}
              style={{ flex: 1 }}
              onClick={handleApplyChanges}
              disabled={processing}
            >
              {processing ? 'Applying...' : 'Apply Changes'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
