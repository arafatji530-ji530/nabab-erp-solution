/**
 * Products - Product Import/Export
 * EXPERT: Enterprise Solution Architect (Data Migration)
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
  RadioGroup,
  Radio,
  Checkbox,
} from '@fluentui/react-components';
import { ArrowUpload20Regular, ArrowDownload20Regular, DocumentTable20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
});

export const ProductImportExport = () => {
  const classes = useStyles();
  const [mode, setMode] = useState('import');

  return (
    <div className={classes.container}>
      <div>
        <Title3>Product Import/Export</Title3>
        <Text>Bulk import or export product data</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Select Operation</Title3>

        <RadioGroup value={mode} onChange={(_, data) => setMode(data.value)}>
          <Radio value="import" label="Import Products" />
          <Radio value="export" label="Export Products" />
        </RadioGroup>
      </Card>

      {mode === 'import' && (
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>
            <ArrowUpload20Regular style={{ marginRight: tokens.spacingHorizontalS }} />
            Import Products
          </Title3>

          <Text block style={{ marginBottom: tokens.spacingVerticalM }}>
            Upload a CSV or Excel file containing product data. Download the template to ensure proper format.
          </Text>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <Button appearance="subtle" icon={<DocumentTable20Regular />}>
              Download CSV Template
            </Button>

            <div
              style={{
                ...shorthands.padding(tokens.spacingVerticalXL),
                ...shorthands.border('2px', 'dashed', tokens.colorNeutralStroke1),
                ...shorthands.borderRadius(tokens.borderRadiusMedium),
                textAlign: 'center',
              } as React.CSSProperties}
            >
              <ArrowUpload20Regular style={{ fontSize: '48px', color: tokens.colorBrandForeground1 }} />
              <Text block weight="semibold" style={{ marginTop: tokens.spacingVerticalM }}>
                Drop file here or click to browse
              </Text>
              <Text size={300}>Supported formats: CSV, XLSX</Text>
            </div>

            <Checkbox label="Update existing products if SKU matches" />
            <Checkbox label="Skip invalid rows and continue" defaultChecked />

            <Button appearance="primary" icon={<ArrowUpload20Regular />}>
              Start Import
            </Button>
          </div>
        </Card>
      )}

      {mode === 'export' && (
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>
            <ArrowDownload20Regular style={{ marginRight: tokens.spacingHorizontalS }} />
            Export Products
          </Title3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            <Text weight="semibold">Select fields to export:</Text>

            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
              <Checkbox label="Product Name & SKU" defaultChecked />
              <Checkbox label="Category & Brand" defaultChecked />
              <Checkbox label="Pricing Information" defaultChecked />
              <Checkbox label="Stock Quantities" defaultChecked />
              <Checkbox label="Supplier Information" />
              <Checkbox label="Images & Media" />
            </div>

            <Button appearance="primary" icon={<ArrowDownload20Regular />}>
              Export to CSV
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
