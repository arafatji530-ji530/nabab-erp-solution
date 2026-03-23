/**
 * Settings - Company Settings Page
 * System configuration and company information
 */

import { useState } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Label,
  Textarea,
  Title3,
  Card,
  Tab,
  TabList,
  Dropdown,
  Option,
  Switch,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import {
  Save20Regular,
  Building20Regular,
  Settings20Regular,
  Mail20Regular,
  DocumentSettings20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    maxWidth: '1200px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabContent: {
    ...shorthands.padding(tokens.spacingVerticalXL),
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    marginBottom: tokens.spacingVerticalXL,
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
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginBottom: tokens.spacingVerticalM,
    ...shorthands.padding(tokens.spacingVerticalS, '0'),
    ...shorthands.borderBottom('2px', 'solid', tokens.colorBrandStroke1),
  },
  settingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  actions: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    justifyContent: 'flex-end',
    ...shorthands.padding(tokens.spacingVerticalL, '0'),
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    marginTop: tokens.spacingVerticalL,
  },
});

export const CompanySettings = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState('company');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Settings</Title3>
        </div>
        <Button appearance="primary" icon={<Save20Regular />} onClick={handleSave}>
          Save Changes
        </Button>
      </div>

      {saved && (
        <MessageBar intent="success">
          <MessageBarBody>Settings saved successfully!</MessageBarBody>
        </MessageBar>
      )}

      <Card>
        <TabList
          selectedValue={selectedTab}
          onTabSelect={(_, data) => setSelectedTab(data.value as string)}
        >
          <Tab value="company" icon={<Building20Regular />}>
            Company
          </Tab>
          <Tab value="general" icon={<Settings20Regular />}>
            General
          </Tab>
          <Tab value="notifications" icon={<Mail20Regular />}>
            Notifications
          </Tab>
          <Tab value="documents" icon={<DocumentSettings20Regular />}>
            Documents
          </Tab>
        </TabList>

        <div className={classes.tabContent}>
          {selectedTab === 'company' && (
            <div className={classes.formSection}>
              <div className={classes.sectionTitle}>
                <Building20Regular />
                <Title3>Company Information</Title3>
              </div>

              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <Label required>Company Name</Label>
                  <Input defaultValue="Nabab ERP Solutions" />
                </div>
                <div className={classes.formGroup}>
                  <Label>Legal Name</Label>
                  <Input defaultValue="Nabab ERP Solutions Ltd." />
                </div>
              </div>

              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <Label>Tax ID / TIN</Label>
                  <Input defaultValue="123456789" />
                </div>
                <div className={classes.formGroup}>
                  <Label>Trade License</Label>
                  <Input defaultValue="TL-2023-001234" />
                </div>
              </div>

              <div className={classes.formGroup}>
                <Label>Address</Label>
                <Textarea rows={3} defaultValue="123 Main Street, Gulshan-2, Dhaka-1212" />
              </div>

              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <Label>Phone</Label>
                  <Input defaultValue="+880-2-9876543" />
                </div>
                <div className={classes.formGroup}>
                  <Label>E mail</Label>
                  <Input defaultValue="info@nababerp.com" />
                </div>
              </div>

              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <Label>Website</Label>
                  <Input defaultValue="www.nababerp.com" />
                </div>
                <div className={classes.formGroup}>
                  <Label>Currency</Label>
                  <Dropdown defaultValue="BDT">
                    <Option value="BDT">BDT - Bangladeshi Taka</Option>
                    <Option value="USD">USD - US Dollar</Option>
                    <Option value="EUR">EUR - Euro</Option>
                  </Dropdown>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'general' && (
            <div className={classes.formSection}>
              <div className={classes.sectionTitle}>
                <Settings20Regular />
                <Title3>General Settings</Title3>
              </div>

              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <Label>Date Format</Label>
                  <Dropdown defaultValue="dd/mm/yyyy">
                    <Option value="dd/mm/yyyy">DD/MM/YYYY</Option>
                    <Option value="mm/dd/yyyy">MM/DD/YYYY</Option>
                    <Option value="yyyy-mm-dd">YYYY-MM-DD</Option>
                  </Dropdown>
                </div>
                <div className={classes.formGroup}>
                  <Label>Time Zone</Label>
                  <Dropdown defaultValue="asia/dhaka">
                    <Option value="asia/dhaka">Asia/Dhaka (GMT+6)</Option>
                    <Option value="utc">UTC</Option>
                  </Dropdown>
                </div>
              </div>

              <div className={classes.formRow}>
                <div className={classes.formGroup}>
                  <Label>Language</Label>
                  <Dropdown defaultValue="en">
                    <Option value="en">English</Option>
                    <Option value="bn">Bengali</Option>
                  </Dropdown>
                </div>
                <div className={classes.formGroup}>
                  <Label>Fiscal Year Start</Label>
                  <Dropdown defaultValue="july">
                    <Option value="january">January</Option>
                    <Option value="july">July</Option>
                  </Dropdown>
                </div>
              </div>

              <div className={classes.settingRow}>
                <div>
                  <Label>Enable Multi-Currency</Label>
                  <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
                    Allow transactions in multiple currencies
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>

              <div className={classes.settingRow}>
                <div>
                  <Label>Auto Backup</Label>
                  <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
                    Automatically backup system data daily
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </div>
          )}

          {selectedTab === 'notifications' && (
            <div className={classes.formSection}>
              <div className={classes.sectionTitle}>
                <Mail20Regular />
                <Title3>Notification Preferences</Title3>
              </div>

              <div className={classes.settingRow}>
                <div>
                  <Label>Email Notifications</Label>
                  <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
                    Receive email alerts for important events
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className={classes.settingRow}>
                <div>
                  <Label>Low Stock Alerts</Label>
                  <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
                    Get notified when inventory is low
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className={classes.settingRow}>
                <div>
                  <Label>Order Confirmations</Label>
                  <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
                    Send notifications for new orders
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className={classes.settingRow}>
                <div>
                  <Label>Payment Reminders</Label>
                  <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
                    Remind customers about pending payments
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>
          )}

          {selectedTab === 'documents' && (
            <div className={classes.formSection}>
              <div className={classes.sectionTitle}>
                <DocumentSettings20Regular />
                <Title3>Document Settings</Title3>
              </div>

              <div className={classes.formGroup}>
                <Label>Invoice Prefix</Label>
                <Input defaultValue="INV-" />
              </div>

              <div className={classes.formGroup}>
                <Label>Quotation Prefix</Label>
                <Input defaultValue="QT-" />
              </div>

              <div className={classes.formGroup}>
                <Label>Purchase Order Prefix</Label>
                <Input defaultValue="PO-" />
              </div>

              <div className={classes.formGroup}>
                <Label>Invoice Footer Text</Label>
                <Textarea rows={3} defaultValue="Thank you for your business. Payment terms: Net 30 days." />
              </div>

              <div className={classes.settingRow}>
                <div>
                  <Label>Auto-generate Document Numbers</Label>
                  <div style={{ fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3 }}>
                    Automatically assign sequential numbers to documents
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </div>
          )}

          <div className={classes.actions}>
            <Button appearance="secondary">Reset to Defaults</Button>
            <Button appearance="primary" icon={<Save20Regular />} onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
