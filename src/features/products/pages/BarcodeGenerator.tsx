/**
 * Products - Barcode Generator & Printer
 * EXPERT: DevOps Engineer (Print & Export Optimization)
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
  Dropdown,
  Option,
  Input,
  Label,
  Checkbox,
  Radio,
  RadioGroup,
} from '@fluentui/react-components';
import {
  Print20Regular,
  ArrowDownload20Regular,
  ScanDash20Regular,
  Grid20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '350px 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  settingsPanel: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  previewPanel: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalM,
  },
  barcodeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  barcodeCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
    textAlign: 'center',
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'dashed', tokens.colorNeutralStroke2),
  },
  barcodeImage: {
    width: '100%',
    height: '80px',
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.margin(tokens.spacingVerticalS, '0'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
  },
});

export const BarcodeGenerator = () => {
  const classes = useStyles();
  const [format, setFormat] = useState('CODE128');
  const [includePrice, setIncludePrice] = useState(true);
  const [includeProductName, setIncludeProductName] = useState(true);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Barcode Generator</Title3>
          <Text>Generate and print product barcodes in bulk</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<ArrowDownload20Regular />}>
            Export PDF
          </Button>
          <Button appearance="primary" icon={<Print20Regular />}>
            Print Labels
          </Button>
        </div>
      </div>

      <div className={classes.grid}>
        <Card className={classes.settingsPanel}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Label Settings</Title3>

          <div className={classes.formGroup}>
            <Label required>Barcode Format</Label>
            <Dropdown value={format} onOptionSelect={(_, data) => setFormat(data.optionValue as string)}>
              <Option value="CODE128">CODE 128</Option>
              <Option value="EAN13">EAN-13</Option>
              <Option value="UPC">UPC-A</Option>
              <Option value="QR">QR Code</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Label Size</Label>
            <RadioGroup defaultValue="50x25">
              <Radio value="50x25" label="50mm x 25mm (Standard)" />
              <Radio value="75x38" label="75mm x 38mm (Large)" />
              <Radio value="100x50" label="100mm x 50mm (Extra Large)" />
            </RadioGroup>
          </div>

          <div className={classes.formGroup}>
            <Label required>Products to Generate</Label>
            <Dropdown placeholder="Select products">
              <Option value="all">All Products (1,234)</Option>
              <Option value="category">By Category</Option>
              <Option value="selected">Selected Products</Option>
              <Option value="low-stock">Low Stock Items</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Copies per Product</Label>
            <Input type="number" defaultValue="1" />
          </div>

          <div className={classes.formGroup}>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Include on Label
            </Text>
            <Checkbox
              checked={includeProductName}
              onChange={(_, data) => setIncludeProductName(data.checked as boolean)}
              label="Product Name"
            />
            <Checkbox
              checked={includePrice}
              onChange={(_, data) => setIncludePrice(data.checked as boolean)}
              label="Price"
            />
            <Checkbox label="SKU" />
            <Checkbox label="Company Logo" />
          </div>

          <div className={classes.formGroup}>
            <Label>Font Size</Label>
            <Dropdown defaultValue="medium">
              <Option value="small">Small (8pt)</Option>
              <Option value="medium">Medium (10pt)</Option>
              <Option value="large">Large (12pt)</Option>
            </Dropdown>
          </div>

          <Button appearance="primary" icon={<ScanDash20Regular />} style={{ width: '100%' }}>
            Generate Barcodes
          </Button>
        </Card>

        <Card className={classes.previewPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalL }}>
            <Title3>Preview (9 of 1,234)</Title3>
            <Button appearance="subtle" icon={<Grid20Regular />}>
              Layout: 3x3
            </Button>
          </div>

          <div className={classes.barcodeGrid}>
            {Array.from({ length: 9 }).map((_, idx) => (
              <div key={idx} className={classes.barcodeCard}>
                <div className={classes.barcodeImage}>
                  <ScanDash20Regular style={{ fontSize: '48px', color: tokens.colorNeutralForeground3 }} />
                </div>
                {includeProductName && (
                  <Text size={200} block truncate>
                    Industrial Drill DX-500
                  </Text>
                )}
                <Text size={300} weight="bold" block style={{ fontFamily: 'monospace' }}>
                  |||| |||| ||||
                </Text>
                <Text size={200} block>
                  8901234567890
                </Text>
                {includePrice && (
                  <Text size={300} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
                    ৳4,500.00
                  </Text>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: tokens.spacingHorizontalM,
              marginTop: tokens.spacingVerticalXL,
              ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
          >
            <Text>Page 1 of 137</Text>
            <Button appearance="subtle" size="small">
              Previous
            </Button>
            <Button appearance="subtle" size="small">
              Next
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
