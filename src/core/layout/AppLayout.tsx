import { ReactNode, useState } from 'react';
import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { layout } from '../theme/theme';

const useStyles = makeStyles({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    ...shorthands.overflow('hidden'),
    backgroundColor: tokens.colorNeutralBackground3,
  },
  mainContainer: {
    display: 'flex',
    flex: 1,
    ...shorthands.overflow('hidden'),
  },
  sidebarContainer: {
    height: '100%',
    ...shorthands.transition('width', '200ms', 'ease'),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRight('1px', 'solid', tokens.colorNeutralStroke2),
    zIndex: 100,
  },
  sidebarCollapsed: {
    width: layout.sidebarCollapsedWidth,
  },
  sidebarExpanded: {
    width: layout.sidebarWidth,
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.overflow('hidden'),
  },
  contentScroll: {
    flex: 1,
    ...shorthands.overflow('auto'),
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalXL),
  },
});

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const classes = useStyles();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={classes.layout}>
      <Header onToggleSidebar={handleToggleSidebar} />
      
      <div className={classes.mainContainer}>
        <div
          className={`${classes.sidebarContainer} ${
            isSidebarCollapsed ? classes.sidebarCollapsed : classes.sidebarExpanded
          }`}
        >
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </div>

        <div className={classes.contentArea}>
          <div className={classes.contentScroll}>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
