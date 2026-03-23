/**
 * Reports - Custom Report Builder
 * EXPERT: DevOps & Automation Engineer (Dynamic Reporting)
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
  Label,
  Dropdown,
  Option,
  Checkbox,
  Input,
  Badge,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Play20Regular,
  Save20Regular,
  DocumentPdf20Regular,
  TableSimple20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  builderGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  configPanel: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  previewPanel: {
    ...shorthands.padding(tokens.spacingVerticalXL),
    backgroundColor: tokens.colorNeutralBackground2,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    marginBottom: tokens.spacingVerticalL,
  },
  checkboxGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

const AVAILABLE_FIELDS = {
  sales: ['Invoice Number', 'Customer Name', 'Date', 'Amount', 'Status', 'Payment Method'],
  inventory: ['Product Name', 'SKU', 'Quantity', 'Unit Price', 'Location', 'Supplier'],
  customers: ['Customer Name', 'Email', 'Phone', 'City', 'Total Purchases', 'Last Purchase'],
  financial: ['Account Code', 'Account Name', 'Debit', 'Credit', 'Balance', 'Type'],
};

export const CustomReportBuilder = () => {
  const classes = useStyles();
  const [selectedModule, setSelectedModule] = useState('sales');

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Custom Report Builder</Title3>
          <Text>Create custom reports with drag-and-drop interface</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<Save20Regular />}>
            Save Template
          </Button>
          <Button appearance="primary" icon={<Play20Regular />}>
            Run Report
          </Button>
        </div>
      </div>

      <div className={classes.builderGrid}>
        <Card className={classes.configPanel}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Report Configuration</Title3>

          <div className={classes.formGroup}>
            <Label required>Report Name</Label>
            <Input placeholder="e.g., Monthly Sales Summary" />
          </div>

          <div className={classes.formGroup}>
            <Label required>Data Source</Label>
            <Dropdown
              placeholder="Select module"
              value={selectedModule}
              onOptionSelect={(_, data) => setSelectedModule(data.optionValue as string)}
            >
              <Option value="sales">Sales & Invoices</Option>
              <Option value="inventory">Inventory & Products</Option>
              <Option value="customers">Customers & CRM</Option>
              <Option value="financial">Financial & Accounting</Option>
              <Option value="hr">Human Resources</Option>
              <Option value="purchases">Purchases & Suppliers</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Report Type</Label>
            <Dropdown placeholder="Select type">
              <Option value="table">Table/List</Option>
              <Option value="summary">Summary</Option>
              <Option value="pivot">Pivot Table</Option>
              <Option value="chart">Chart/Graph</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label required>Date Range</Label>
            <Dropdown placeholder="Select range">
              <Option value="today">Today</Option>
              <Option value="yesterday">Yesterday</Option>
              <Option value="this-week">This Week</Option>
              <Option value="this-month">This Month</Option>
              <Option value="last-month">Last Month</Option>
              <Option value="this-quarter">This Quarter</Option>
              <Option value="this-year">This Year</Option>
              <Option value="custom">Custom Range</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Select Fields to Include</Label>
            <div className={classes.checkboxGroup}>
              {AVAILABLE_FIELDS[selectedModule as keyof typeof AVAILABLE_FIELDS].map((field) => (
                <Checkbox key={field} label={field} />
              ))}
            </div>
          </div>

          <div className={classes.formGroup}>
            <Label>Group By</Label>
            <Dropdown placeholder="Select grouping">
              <Option value="none">No Grouping</Option>
              <Option value="customer">Customer</Option>
              <Option value="date">Date</Option>
              <Option value="category">Category</Option>
              <Option value="status">Status</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Sort By</Label>
            <Dropdown placeholder="Select sorting">
              <Option value="date-desc">Date (Newest First)</Option>
              <Option value="date-asc">Date (Oldest First)</Option>
              <Option value="amount-desc">Amount (High to Low)</Option>
              <Option value="amount-asc">Amount (Low to High)</Option>
              <Option value="name">Name (A-Z)</Option>
            </Dropdown>
          </div>

          <div className={classes.formGroup}>
            <Label>Filters</Label>
            <Button appearance="subtle" icon={<Add20Regular />} size="small">
              Add Filter
            </Button>
          </div>
        </Card>

        <Card className={classes.previewPanel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalL }}>
            <div>
              <Title3>Report Preview</Title3>
              <Text size={300}>Configure your report to see a live preview</Text>
            </div>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
              <Button appearance="subtle" size="small" icon={<DocumentPdf20Regular />}>
                PDF
              </Button>
              <Button appearance="subtle" size="small" icon={<TableSimple20Regular />}>
                Excel
              </Button>
            </div>
          </div>

          <div
            style={{
              ...shorthands.padding(tokens.spacingVerticalXXL),
              textAlign: 'center',
              ...shorthands.border('2px', 'dashed', tokens.colorNeutralStroke2),
              ...shorthands.borderRadius(tokens.borderRadiusMedium),
              backgroundColor: tokens.colorNeutralBackground1,
            } as React.CSSProperties}
          >
            <TableSimple20Regular style={{ fontSize: '64px', color: tokens.colorNeutralForeground3 }} />
            <Text size={400} weight="semibold" block style={{ marginTop: tokens.spacingVerticalM }}>
              Report Preview
            </Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
              Select a data source and fields to generate preview
            </Text>

            <div style={{ marginTop: tokens.spacingVerticalXL, display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}>
                <Text weight="semibold">Total Records:</Text>
                <Badge appearance="tint" color="brand">0</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}>
                <Text weight="semibold">Columns:</Text>
                <Badge appearance="tint" color="brand">0</Badge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}>
                <Text weight="semibold">Filters Applied:</Text>
                <Badge appearance="tint" color="brand">0</Badge>
              </div>
            </div>
          </div>

          <div style={{ marginTop: tokens.spacingVerticalXL }}>
            <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Saved Templates</Title3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
              {['Monthly Sales Report', 'Inventory Status', 'Customer Analysis'].map((template, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)} as React.CSSProperties}
                >
                  <Text weight="semibold">{template}</Text>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    <Button appearance="subtle" size="small">
                      Load
                    </Button>
                    <Button appearance="subtle" size="small">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
