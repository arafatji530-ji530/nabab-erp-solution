/**
 * HR - Employee Management Page
 * Human resources management with employee profiles
 */

import { useEffect, useState } from 'react';
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
  Spinner,
} from '@fluentui/react-components';
import {
  Add20Regular,
  Search20Regular,
  Mail20Regular,
  Phone20Regular,
  PersonAccounts20Regular,
} from '@fluentui/react-icons';
import { apiService } from '@/services/api';
import { formatDate } from '@/shared/utils/formatters';
import type { Employee } from '@/types/domain';

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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  employeeCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    cursor: 'pointer',
    ...shorthands.transition('all', '150ms'),
    
    ':hover': {
      boxShadow: tokens.shadow8,
      transform: 'translateY(-2px)',
    },
  },
  cardHeader: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalM,
  },
  employeeInfo: {
    flex: 1,
  },
  contactRow: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginTop: tokens.spacingVerticalXS,
  },
  divider: {
    height: '1px',
    backgroundColor: tokens.colorNeutralStroke2,
    ...shorthands.margin(tokens.spacingVerticalM, '0'),
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const EmployeeList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await apiService.employees.list({ page: 1, pageSize: 20 });
      setEmployees(data.data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentColor = (dept?: string) => {
    const colors: Record<string, string> = {
      Sales: 'brand',
      IT: 'success',
      HR: 'warning',
      Finance: 'important',
      Operations: 'informative',
    };
    return colors[dept || ''] || 'subtle';
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalXXXL }}>
        <Spinner size="large" label="Loading employees..." />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div>
          <Title3>Employees</Title3>
          <Text>Manage employee profiles and organizational structure</Text>
        </div>
        <Button
          appearance="primary"
          icon={<Add20Regular />}
          onClick={() => navigate('/hr/employees/create')}
        >
          Add Employee
        </Button>
      </div>

      <Card className={classes.toolbar}>
        <Input
          placeholder="Search employees..."
          contentBefore={<Search20Regular />}
          style={{ flexGrow: 1, maxWidth: '400px' }}
        />
        <Button appearance="secondary">Filter by Department</Button>
        <Button appearance="secondary">Export</Button>
      </Card>

      <div className={classes.grid}>
        {employees.map((employee) => (
          <Card
            key={employee.id}
            className={classes.employeeCard}
            onClick={() => navigate(`/hr/employees/${employee.id}`)}
          >
            <div className={classes.cardHeader}>
              <Avatar
                name={`${employee.firstName} ${employee.lastName}`}
                size={56}
                color="brand"
                icon={<PersonAccounts20Regular />}
              />
              <div className={classes.employeeInfo}>
                <Text weight="semibold" size={400} block>
                  {employee.firstName} {employee.lastName}
                </Text>
                <Text size={200}>{employee.employeeCode}</Text>
                <Badge
                  appearance="tint"
                  color={getDepartmentColor(employee.department?.name) as any}
                  style={{ marginTop: tokens.spacingVerticalXS }}
                >
                  {employee.department?.name || 'Unassigned'}
                </Badge>
              </div>
            </div>

            <Text size={300} block style={{ color: tokens.colorBrandForeground1, marginBottom: tokens.spacingVerticalS }}>
              {employee.position}
            </Text>

            <div className={classes.contactRow}>
              <Mail20Regular style={{ fontSize: '16px' }} />
              <Text size={300} truncate>
                {employee.email}
              </Text>
            </div>
            <div className={classes.contactRow}>
              <Phone20Regular style={{ fontSize: '16px' }} />
              <Text size={300}>{employee.phone}</Text>
            </div>

            <div className={classes.divider} />

            <div className={classes.footer}>
              <div>
                <Text size={200} block>
                  Joined
                </Text>
                <Text size={300} weight="semibold">
                  {formatDate(employee.joinDate)}
                </Text>
              </div>
              <Badge appearance="filled" color={employee.isActive ? 'success' : 'danger'}>
                {employee.isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
