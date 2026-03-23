/**
 * Reports - Export Hub
 * EXPERT: Senior React Engineer (Data Export)
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
  Checkbox,
  RadioGroup,
  Radio,
  Dropdown,
  Option,
} from '@fluentui/react-components';
import { ArrowDownload20Regular, DocumentPdf20Regular, DocumentTable20Regular } from '@fluentui/react-icons';

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
  exportGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
});

export const ExportHub = () => {
  const classes = useStyles();
  const [format, setFormat] = useState('excel');

  return (
    <div className={classes.container}>
      <div>
        <Title3>Export Hub</Title3>
        <Text>Export reports and data in various formats</Text>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Select Export Options</Title3>

        <div className={classes.formSection}>
          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Report Type
            </Text>
            <Dropdown placeholder="Select report">
              <Option>Sales Report</Option>
              <Option>Inventory Report</Option>
              <Option>Financial Statement</Option>
              <Option>Customer Analysis</Option>
              <Option>Product Performance</Option>
            </Dropdown>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Export Format
            </Text>
            <RadioGroup value={format} onChange={(_, data) => setFormat(data.value)}>
              <Radio value="excel" label="Excel (.xlsx)" />
              <Radio value="pdf" label="PDF (.pdf)" />
              <Radio value="csv" label="CSV (.csv)" />
            </RadioGroup>
          </div>

          <div>
            <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
              Include Options
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
              <Checkbox label="Include Charts & Graphs" defaultChecked />
              <Checkbox label="Include Summary Statistics" defaultChecked />
              <Checkbox label="Include Detailed Breakdown" />
              <Checkbox label="Include Company Branding" defaultChecked />
            </div>
          </div>

          <Button appearance="primary" icon={<ArrowDownload20Regular />} size="large">
            Export Report
          </Button>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
            <DocumentTable20Regular style={{ fontSize: '32px', color: tokens.colorPaletteGreenForeground1 }} />
            <div>
              <Title3>Excel Export</Title3>
              <Text size={300}>Spreadsheet format with data analysis</Text>
            </div>
          </div>
          <Text>Best for: Data manipulation, pivot tables, advanced analysis</Text>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
            <DocumentPdf20Regular style={{ fontSize: '32px', color: tokens.colorPaletteRedForeground1 }} />
            <div>
              <Title3>PDF Export</Title3>
              <Text size={300}>Professional print-ready format</Text>
            </div>
          </div>
          <Text>Best for: Sharing, presentations, archiving, formal reports</Text>
        </Card>
      </div>
    </div>
  );
};
