import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Title3,
  Text,
  Card,
  Badge,
  Input,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogBody,
  DialogTitle,
  DialogActions,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Delete20Regular,
  Edit20Regular,
  CheckmarkCircle20Regular,
  People20Regular,
} from '@fluentui/react-icons';
import { useState } from 'react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  table: {
    width: '100%',
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginTop: tokens.spacingVerticalL,
  },
  roleCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
});

const TEAM_MEMBERS = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@company.com',
    role: 'Owner',
    status: 'active',
    joinDate: '2026-01-15',
  },
  {
    id: '2',
    name: 'Fatima Khan',
    email: 'fatima@company.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2026-02-10',
  },
  {
    id: '3',
    name: 'Karim Ali',
    email: 'karim@company.com',
    role: 'User',
    status: 'active',
    joinDate: '2026-02-20',
  },
];

const ROLES = [
  {
    name: 'Owner',
    description: 'Full control over account and billing',
    permissions: ['All features', 'Can invite users', 'Can manage billing', 'Can cancel account'],
  },
  {
    name: 'Admin',
    description: 'Can manage users and team settings',
    permissions: ['All features', 'Can invite users', 'Cannot change billing', 'View reports'],
  },
  {
    name: 'User',
    description: 'Can use application features',
    permissions: ['Create content', 'Access reports', 'Limited automation', 'Cannot invite'],
  },
];

export const TeamMembers = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('User');

  const handleInviteMember = async () => {
    // In real app, send invitation email
    console.log('Invite:', email, 'with role:', selectedRole);
    setDialogOpen(false);
    setEmail('');
    setSelectedRole('User');
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Team Members</Title3>
          <Text>Manage your team and user permissions</Text>
        </div>
        <DialogTrigger>
          <Button appearance="primary" icon={<Add20Regular />} onClick={() => setDialogOpen(true)}>
            Invite Member
          </Button>
        </DialogTrigger>
      </div>

      <Card>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Current Team</Title3>
        <Table aria-label="Team members" className={classes.table}>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Joined</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAM_MEMBERS.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <Badge appearance="filled" color="success">
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Edit20Regular />}
                    disabled={member.role === 'Owner'}
                  />
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Delete20Regular />}
                    disabled={member.role === 'Owner'}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div>
        <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Available Roles</Title3>
        <div className={classes.rolesGrid}>
          {ROLES.map((role) => (
            <Card key={role.name} className={classes.roleCard}>
              <div>
                <Title3 style={{ fontSize: '16px', marginBottom: tokens.spacingVerticalXS }}>
                  {role.name}
                </Title3>
                <Text size={300}>{role.description}</Text>
              </div>
              <div style={{ flex: 1 }}>
                <Text size={200} weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                  Permissions:
                </Text>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {role.permissions.map((perm, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: tokens.spacingHorizontalXS, marginBottom: tokens.spacingVerticalXS }}>
                      <CheckmarkCircle20Regular style={{ fontSize: '14px', color: '#107C10' }} />
                      <Text size={200}>{perm}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={(_, data) => setDialogOpen(data.open)}>
        <DialogContent>
          <DialogTitle>Invite Team Member</DialogTitle>
          <DialogBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
              <div>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
                  Email Address
                </Text>
                <Input
                  placeholder="user@example.com"
                  type="email"
                  value={email}
                  onChange={(_, data) => setEmail(data.value)}
                />
              </div>
              <div>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalXS }}>
                  Role
                </Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
                  {ROLES.map((role) => (
                    <label key={role.name} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                      <input
                        type="radio"
                        name="role"
                        value={role.name}
                        checked={selectedRole === role.name}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      />
                      <Text size={300}>{role.name}</Text>
                    </label>
                  ))}
                </div>
              </div>
              <Text size={200}>An invitation email will be sent to this address</Text>
            </div>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handleInviteMember}>
              Send Invitation
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};
