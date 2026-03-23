import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  makeStyles,
  shorthands,
  tokens,
  Button,
  Input,
  Label,
  Checkbox,
  Text,
  Title2,
  Card,
  Spinner,
} from '@fluentui/react-components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, selectIsLoading } from '../slices/authSlice';
import { APP_NAME } from '@/shared/utils/constants';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    background: 'linear-gradient(135deg, #0078d4 0%, #106ebe 100%)',
  },
  loginCard: {
    width: '420px',
    ...shorthands.padding(tokens.spacingVerticalXXXL, tokens.spacingHorizontalXXL),
  },
  header: {
    textAlign: 'center',
    marginBottom: tokens.spacingVerticalXL,
  },
  logo: {
    fontSize: '48px',
    marginBottom: tokens.spacingVerticalM,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalS),
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    marginTop: tokens.spacingVerticalL,
  },
  demoHint: {
    ...shorthands.padding(tokens.spacingVerticalM),
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: 'center',
  },
});

export const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const [email, setEmail] = useState('admin@nabab.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await dispatch(login({ email, password, rememberMe })).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className={classes.container}>
      <Card className={classes.loginCard}>
        <div className={classes.header}>
          <div className={classes.logo}>⚡</div>
          <Title2>{APP_NAME}</Title2>
          <Text size={300}>Enterprise Resource Planning System</Text>
        </div>

        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.field}>
            <Label htmlFor="email" required>
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className={classes.field}>
            <Label htmlFor="password" required>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          <Checkbox
            checked={rememberMe}
            onChange={(_, data) => setRememberMe(!!data.checked)}
            label="Remember me"
            disabled={isLoading}
          />

          <div className={classes.actions}>
            <Button
              appearance="primary"
              type="submit"
              size="large"
              disabled={isLoading}
              icon={isLoading ? <Spinner size="tiny" /> : undefined}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>

          <div className={classes.demoHint}>
            <strong>Demo Mode:</strong> Any email/password combination will work
          </div>
        </form>
      </Card>
    </div>
  );
};
