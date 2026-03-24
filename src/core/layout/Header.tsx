import { makeStyles, shorthands, tokens, Button, Avatar, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, Badge } from '@fluentui/react-components';
import {
  Navigation20Regular,
  Search20Regular,
  Alert20Regular,
  PersonCircle20Regular,
  SignOut20Regular,
  Settings20Regular,
  WeatherMoon20Regular,
  WeatherSunny20Regular,
} from '@fluentui/react-icons';
import { layout, typography } from '../theme/theme';
import { APP_NAME } from '@/shared/utils/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout, selectUser } from '@/features/auth/slices/authSlice';
import { useThemeContext } from '../providers/ThemeProvider';

const useStyles = makeStyles({
  header: {
    height: layout.headerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('0', tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderBottom('1px', 'solid', tokens.colorNeutralStroke2),
    boxShadow: tokens.shadow4,
    zIndex: 200,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSizes.subtitle1,
    fontWeight: typography.fontWeights.semibold,
    color: tokens.colorBrandForeground1,
  },
  searchBox: {
    width: '400px',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  badge: {
    cursor: 'pointer',
  },
});

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { themeMode, toggleTheme } = useThemeContext();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={classes.header}>
      <div className={classes.leftSection}>
        <Button
          appearance="subtle"
          icon={<Navigation20Regular />}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        />
        
        <div className={classes.logo}>
          <span>⚡</span>
          <span>{APP_NAME}</span>
        </div>

        {/* Global Search */}
        <div className={classes.searchBox}>
          <Button
            appearance="subtle"
            icon={<Search20Regular />}
            style={{ width: '100%', justifyContent: 'flex-start' }}
          >
            Search... (Ctrl+K)
          </Button>
        </div>
      </div>

      <div className={classes.rightSection}>
        {/* Theme Toggle */}
        <Button
          appearance="subtle"
          icon={themeMode === 'dark' ? <WeatherSunny20Regular /> : <WeatherMoon20Regular />}
          aria-label={themeMode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={toggleTheme}
        />

        {/* Notifications */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            appearance="subtle"
            icon={<Alert20Regular />}
            aria-label="Notifications"
          />
          <Badge
            className={classes.badge}
            appearance="filled"
            color="danger"
            size="small"
            style={{ position: 'absolute', top: '-4px', right: '-4px' }}
          >
            3
          </Badge>
        </div>

        {/* User Menu */}
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              icon={<Avatar name={user?.fullName} size={32} />}
              style={{ paddingLeft: 0 }}
            />
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem icon={<PersonCircle20Regular />}>
                {user?.fullName}
              </MenuItem>
              <MenuItem disabled>{user?.email}</MenuItem>
              <MenuItem icon={<Settings20Regular />}>Settings</MenuItem>
              <MenuItem icon={<SignOut20Regular />} onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </header>
  );
};
