import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Title3,
  Title2,
  Text,
  Switch,
  Button,
  Checkbox,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  Input,
  TabList,
  Tab,
} from '@fluentui/react-components';
import { useState } from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  headerCard: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  notificationCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  notificationContent: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    flex: 1,
  },
  contactCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
    marginTop: tokens.spacingVerticalL,
  },
});

interface NotificationSetting {
  id: string;
  category: string;
  title: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface ContactMethod {
  type: 'email' | 'phone';
  value: string;
  verified: boolean;
  primary: boolean;
}

const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: '1',
    category: 'billing',
    title: 'Invoice Notifications',
    description: 'Receive notifications when new invoices are available',
    email: true,
    push: true,
    sms: false,
  },
  {
    id: '2',
    category: 'billing',
    title: 'Payment Reminders',
    description: 'Get reminded about upcoming or overdue payments',
    email: true,
    push: false,
    sms: true,
  },
  {
    id: '3',
    category: 'account',
    title: 'Account Changes',
    description: 'Notify about profile updates and security changes',
    email: true,
    push: true,
    sms: false,
  },
  {
    id: '4',
    category: 'account',
    title: 'Login Alerts',
    description: 'Alert on successful or failed login attempts',
    email: true,
    push: false,
    sms: false,
  },
  {
    id: '5',
    category: 'product',
    title: 'New Features',
    description: 'Learn about new features and product updates',
    email: true,
    push: false,
    sms: false,
  },
  {
    id: '6',
    category: 'product',
    title: 'Maintenance Alerts',
    description: 'Get notified about scheduled maintenance',
    email: true,
    push: true,
    sms: false,
  },
  {
    id: '7',
    category: 'product',
    title: 'Usage Alerts',
    description: 'Alert when you reach 80% of your usage limits',
    email: true,
    push: true,
    sms: false,
  },
  {
    id: '8',
    category: 'team',
    title: 'Team Invitations',
    description: 'Notifications about team member invitations',
    email: true,
    push: true,
    sms: false,
  },
  {
    id: '9',
    category: 'team',
    title: 'Team Activity',
    description: 'Daily digest of team activity and changes',
    email: false,
    push: true,
    sms: false,
  },
];

export const NotificationPreferences = () => {
  const classes = useStyles();
  const [settings, setSettings] = useState<NotificationSetting[]>(NOTIFICATION_SETTINGS);
  const [activeTab, setActiveTab] = useState('billing');
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>([
    { type: 'email', value: 'user@example.com', verified: true, primary: true },
    { type: 'phone', value: '+1 (555) 123-4567', verified: true, primary: false },
  ]);
  const [addContactDialogOpen, setAddContactDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState<{ type: 'email' | 'phone'; value: string }>({ type: 'email', value: '' });

  const handleSettingChange = (id: string, channel: 'email' | 'push' | 'sms', value: boolean) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, [channel]: value } : setting
      )
    );
  };

  const handleAddContact = () => {
    if (newContact.value) {
      setContactMethods([
        ...contactMethods,
        { ...newContact, verified: false, primary: false },
      ]);
      setAddContactDialogOpen(false);
      setNewContact({ type: 'email', value: '' });
    }
  };

  const handleRemoveContact = (value: string) => {
    setContactMethods(contactMethods.filter((method) => method.value !== value));
  };

  const handleSetPrimaryContact = (value: string) => {
    setContactMethods(
      contactMethods.map((method) => ({
        ...method,
        primary: method.value === value,
      }))
    );
  };

  const filteredSettings = settings.filter((setting) => setting.category === activeTab);

  const categories = [
    { id: 'billing', label: 'Billing' },
    { id: 'account', label: 'Account' },
    { id: 'product', label: 'Product' },
    { id: 'team', label: 'Team' },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.headerCard}>
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalS }}>
          Notification Preferences
        </Title3>
        <Text style={{ color: 'inherit' }}>
          Control how and when you receive notifications across email, push, and SMS
        </Text>
      </div>

      <Card className={classes.contactCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalL }}>
          <Title2>Contact Methods</Title2>
          <Dialog open={addContactDialogOpen} onOpenChange={(_, data) => setAddContactDialogOpen(data.open)}>
            <DialogTrigger>
              <Button appearance="primary">Add Contact Method</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Contact Method</DialogTitle>
              <DialogBody>
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: tokens.spacingVerticalS }}>
                      <input
                        type="radio"
                        value="email"
                        checked={newContact.type === 'email'}
                        onChange={(e) =>
                          setNewContact({ ...newContact, type: e.target.value as 'email' | 'phone' })
                        }
                      />
                      {' '}Email
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="phone"
                        checked={newContact.type === 'phone'}
                        onChange={(e) =>
                          setNewContact({ ...newContact, type: e.target.value as 'email' | 'phone' })
                        }
                      />
                      {' '}Phone
                    </label>
                  </div>
                  
                  <Input
                    placeholder={newContact.type === 'email' ? 'Enter email address' : 'Enter phone number'}
                    value={newContact.value}
                    onChange={(_, data) => setNewContact({ ...newContact, value: data.value || '' })}
                  />
                </div>
              </DialogBody>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setAddContactDialogOpen(false)}>
                  Cancel
                </Button>
                <Button appearance="primary" onClick={handleAddContact}>
                  Add
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </div>

        {contactMethods.map((method) => (
          <div
            key={method.value}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: `${tokens.spacingVerticalM} 0`,
              borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
            }}
          >
            <div style={{ flex: 1 }}>
              <Text weight="semibold" block>
                {method.type === 'email' ? '📧' : '📱'} {method.value}
              </Text>
              <Text size={200}>
                {method.verified ? '✓ Verified' : '⚠️ Verification pending'} {method.primary && '(Primary)'}
              </Text>
            </div>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
              {!method.primary && (
                <Button
                  appearance="secondary"
                  size="small"
                  onClick={() => handleSetPrimaryContact(method.value)}
                >
                  Set Primary
                </Button>
              )}
              <Button
                appearance="subtle"
                size="small"
                onClick={() => handleRemoveContact(method.value)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <div style={{ ...shorthands.padding(tokens.spacingVerticalL) }}>
          <Title2 style={{ marginBottom: tokens.spacingVerticalL }}>Notification Categories</Title2>

          <TabList
            selectedValue={activeTab}
            onTabSelect={(_, data) => setActiveTab(String(data.value))}
            style={{ marginBottom: tokens.spacingVerticalL }}
          >
            {categories.map((category) => (
              <Tab key={category.id} value={category.id}>
                {category.label}
              </Tab>
            ))}
          </TabList>

          <div className={classes.tabContent}>
            {filteredSettings.map((setting) => (
              <div key={setting.id} className={classes.notificationCard}>
                <div className={classes.notificationContent}>
                  <Text weight="semibold">{setting.title}</Text>
                  <Text size={200}>{setting.description}</Text>
                </div>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalL, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                    <Checkbox
                      checked={setting.email}
                      onChange={(_, data) => handleSettingChange(setting.id, 'email', !!data.checked)}
                      label="📧"
                      title="Email"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', ...shorthands.gap(tokens.spacingHorizontalXS) }}>
                    <Checkbox
                      checked={setting.push}
                      onChange={(_, data) => handleSettingChange(setting.id, 'push', !!data.checked)}
                      label="🔔"
                      title="Push"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', ...shorthands.gap(tokens.spacingHorizontalXS) }}>
                    <Checkbox
                      checked={setting.sms}
                      onChange={(_, data) => handleSettingChange(setting.id, 'sms', !!data.checked)}
                      label="📱"
                      title="SMS"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card
        style={{
          ...shorthands.padding(tokens.spacingVerticalL),
          backgroundColor: tokens.colorNeutralBackgroundInverted,
          color: tokens.colorNeutralForegroundInverted,
        }}
      >
        <Title3 style={{ color: 'inherit', marginBottom: tokens.spacingVerticalM }}>
          Communication Frequency
        </Title3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text style={{ color: 'inherit', marginBottom: tokens.spacingVerticalXS }} weight="semibold" block>
                Weekly Summary
              </Text>
              <Text style={{ color: 'inherit' }} size={200}>
                Receive a weekly digest of your account activity
              </Text>
            </div>
            <Switch defaultChecked label="Enabled" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text style={{ color: 'inherit', marginBottom: tokens.spacingVerticalXS }} weight="semibold" block>
                Marketing Communications
              </Text>
              <Text style={{ color: 'inherit' }} size={200}>
                Receive emails about new features and special offers
              </Text>
            </div>
            <Switch defaultChecked={false} label="Disabled" />
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
        <Button appearance="primary">Save Preferences</Button>
        <Button appearance="secondary">Reset to Defaults</Button>
      </div>
    </div>
  );
};
