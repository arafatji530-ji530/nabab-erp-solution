/**
 * Settings - Localization Settings
 * EXPERT: SaaS Platform Architect (Internationalization)
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
  Switch,
  Input,
} from '@fluentui/react-components';
import { Save20Regular, LocalLanguage20Regular } from '@fluentui/react-icons';

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

export const LocalizationSettings = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
        <LocalLanguage20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
        <div>
          <Title3>Localization Settings</Title3>
          <Text>Configure language, region, and formatting preferences</Text>
        </div>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Regional Settings</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Default Language</Text>
            <Dropdown placeholder="Select language" defaultValue="English (United States)">
              <Option>English (United States)</Option>
              <Option>English (United Kingdom)</Option>
              <Option>বাংলা (Bangladesh)</Option>
              <Option>हिन्दी (India)</Option>
              <Option>中文 (China)</Option>
              <Option>日本語 (Japan)</Option>
              <Option>العربية (Arabic)</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Country/Region</Text>
            <Dropdown placeholder="Select country" defaultValue="Bangladesh">
              <Option>Bangladesh</Option>
              <Option>United States</Option>
              <Option>United Kingdom</Option>
              <Option>India</Option>
              <Option>China</Option>
              <Option>Japan</Option>
              <Option>Saudi Arabia</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Time Zone</Text>
            <Dropdown placeholder="Select time zone" defaultValue="(GMT+6:00) Dhaka">
              <Option>(GMT+6:00) Dhaka</Option>
              <Option>(GMT+5:30) Mumbai, Kolkata</Option>
              <Option>(GMT+8:00) Beijing, Hong Kong</Option>
              <Option>(GMT+9:00) Tokyo, Seoul</Option>
              <Option>(GMT+0:00) London</Option>
              <Option>(GMT-5:00) New York</Option>
              <Option>(GMT-8:00) Los Angeles</Option>
            </Dropdown>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Number & Currency Formatting</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Number Format</Text>
            <Dropdown placeholder="Select format" defaultValue="1,23,45,678.90 (Bengali/Indian)">
              <Option>1,23,45,678.90 (Bengali/Indian)</Option>
              <Option>12,345,678.90 (Western)</Option>
              <Option>12.345.678,90 (European)</Option>
              <Option>12 345 678,90 (French)</Option>
            </Dropdown>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Example: ৳1,23,45,678.90
            </Text>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Currency</Text>
            <Dropdown placeholder="Select currency" defaultValue="BDT - Bangladeshi Taka (৳)">
              <Option>BDT - Bangladeshi Taka (৳)</Option>
              <Option>USD - US Dollar ($)</Option>
              <Option>EUR - Euro (€)</Option>
              <Option>GBP - British Pound (£)</Option>
              <Option>INR - Indian Rupee (₹)</Option>
              <Option>JPY - Japanese Yen (¥)</Option>
              <Option>CNY - Chinese Yuan (¥)</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Currency Display</Text>
            <Dropdown placeholder="Select display" defaultValue="Symbol (৳)">
              <Option>Symbol (৳)</Option>
              <Option>Code (BDT)</Option>
              <Option>Name (Taka)</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Decimal Places</Text>
            <Input placeholder="Enter decimal places" type="number" value="2" />
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Number of decimal places for currency values
            </Text>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Date & Time Formatting</Title3>

        <div className={classes.formSection}>
          <div className={classes.field}>
            <Text weight="semibold">Date Format</Text>
            <Dropdown placeholder="Select format" defaultValue="DD/MM/YYYY">
              <Option>DD/MM/YYYY (22/03/2026)</Option>
              <Option>MM/DD/YYYY (03/22/2026)</Option>
              <Option>YYYY-MM-DD (2026-03-22)</Option>
              <Option>DD-MMM-YYYY (22-Mar-2026)</Option>
              <Option>MMMM DD, YYYY (March 22, 2026)</Option>
            </Dropdown>
            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
              Example: 22/03/2026
            </Text>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">Time Format</Text>
            <Dropdown placeholder="Select format" defaultValue="24-hour (14:30)">
              <Option>24-hour (14:30)</Option>
              <Option>12-hour (2:30 PM)</Option>
            </Dropdown>
          </div>

          <div className={classes.field}>
            <Text weight="semibold">First Day of Week</Text>
            <Dropdown placeholder="Select day" defaultValue="Saturday">
              <Option>Saturday</Option>
              <Option>Sunday</Option>
              <Option>Monday</Option>
            </Dropdown>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Additional Options</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Enable Multi-Language Support
              </Text>
              <Text size={300}>Allow users to switch between languages</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Auto-Detect User Language
              </Text>
              <Text size={300}>Use browser language settings</Text>
            </div>
            <Switch defaultChecked />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text weight="semibold" block>
                Right-to-Left (RTL) Support
              </Text>
              <Text size={300}>For Arabic, Hebrew, and other RTL languages</Text>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <Button appearance="primary" icon={<Save20Regular />}>
        Save Localization Settings
      </Button>
    </div>
  );
};
