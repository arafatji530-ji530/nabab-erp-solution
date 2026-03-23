import { makeStyles, shorthands, tokens, Link } from '@fluentui/react-components';
import { layout } from '../theme/theme';
import { APP_VERSION } from '@/shared/utils/constants';

const useStyles = makeStyles({
  footer: {
    height: layout.footerHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding('0', tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderTop('1px', 'solid', tokens.colorNeutralStroke2),
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
});

export const Footer = () => {
  const classes = useStyles();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.leftSection}>
        <span>© {currentYear} Nabab ERP POS Solution</span>
        <span>•</span>
        <span>Version {APP_VERSION}</span>
      </div>

      <div className={classes.rightSection}>
        <Link href="#" appearance="subtle">
          Help
        </Link>
        <span>•</span>
        <Link href="#" appearance="subtle">
          Privacy
        </Link>
        <span>•</span>
        <Link href="#" appearance="subtle">
          Terms
        </Link>
      </div>
    </footer>
  );
};
