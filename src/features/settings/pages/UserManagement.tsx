/**
 * Settings - User Management Page
 * Manage system users, roles, and permissions
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Title3,
  Text,
  Card,
  Badge,
  Avatar,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  MoreVertical20Regular,
  Edit20Regular,
  Delete20Regular,
  Key20Regular,
  PersonLock20Regular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  table: {
    width: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 100px 60px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1.5fr 1fr 1fr 100px 60px',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@nababerp.com',
    role: 'Admin',
    department: 'IT',
    status: 'Active',
    lastLogin: '2026-03-22 10:30 AM',
  },
  {
    id: '2',
    name: 'Sales Manager',
    email: 'sales.manager@nababerp.com',
    role: 'Manager',
    department: 'Sales',
    status: 'Active',
    lastLogin: '2026-03-22 09:15 AM',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@nababerp.com',
    role: 'Sales Rep',
    department: 'Sales',
    status: 'Active',
    lastLogin: '2026-03-21 05:45 PM',
  },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane.smith@nababerp.com',
    role: 'Accountant',
    department: 'Finance',
    status: 'Active',
    lastLogin: '2026-03-22 08:00 AM',
  },
  {
    id: '5',
    name: 'Mike Johnson',
    email: 'mike.johnson@nababerp.com',
    role: 'Stock Manager',
    department: 'Operations',
    status: 'Inactive',
    lastLogin: '2026-03-15 02:30 PM',
  },
];

export const UserManagement = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [users] = useState(MOCK_USERS);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'danger';
      case 'Manager':
        return 'important';
      case 'Accountant':
        return 'success';
      default:
        return 'informative';
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>User Management</Title3>
          <Text>Manage system users, roles, and permissions</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add User
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search users..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button appearance="secondary" icon={<PersonLock20Regular />}>
          Role Management
        </Button>
        <Button appearance="secondary" icon={<Key20Regular />}>
          Permissions
        </Button>
      </Card>

      <Card className={classes.table}>
        <div className={classes.tableHeader}>
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
          <div>Department</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {users.map((user) => (
          <div key={user.id} className={classes.tableRow}>
            <div className={classes.userInfo}>
              <Avatar name={user.name} size={36} color="brand" />
              <div>
                <Text weight="semibold" block>
                  {user.name}
                </Text>
                <Text size={200}>Last login: {user.lastLogin}</Text>
              </div>
            </div>
            <Text size={300} truncate>
              {user.email}
            </Text>
            <Badge appearance="tint" color={getRoleColor(user.role) as any}>
              {user.role}
            </Badge>
            <Text size={300}>{user.department}</Text>
            <Badge appearance="filled" color={user.status === 'Active' ? 'success' : 'danger'}>
              {user.status}
            </Badge>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="subtle" icon={<MoreVertical20Regular />} size="small" />
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<Edit20Regular />}>Edit User</MenuItem>
                  <MenuItem icon={<Key20Regular />}>Change Password</MenuItem>
                  <MenuItem icon={<PersonLock20Regular />}>Manage Permissions</MenuItem>
                  <MenuItem icon={<Delete20Regular />}>Delete User</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        ))}
      </Card>
    </div>
  );
};
