/**
 * Settings - System Health Monitor
 * EXPERT: DevOps & Compliance Engineer (System Monitoring)
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
  ProgressBar,
  Badge,
} from '@fluentui/react-components';
import { Checkmark20Filled, Warning20Filled, Dismiss20Filled, ArrowSync20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statusCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

export const SystemHealthMonitor = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>System Health Monitor</Title3>
          <Text>Real-time system performance and health metrics</Text>
        </div>
        <Button icon={<ArrowSync20Regular />}>Refresh Status</Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }}>
          <Checkmark20Filled style={{ fontSize: '48px', color: tokens.colorPaletteGreenForeground1 }} />
          <div>
            <Title3>System Status: Healthy</Title3>
            <Text size={300}>All services operational | Last checked: 2 minutes ago</Text>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: tokens.spacingHorizontalL }}>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Uptime
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
              99.98%
            </Text>
            <Text size={200}>Last 30 days</Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Response Time
            </Text>
            <Text size={500} weight="bold" style={{ color: tokens.colorBrandForeground1 }}>
              42ms
            </Text>
            <Text size={200}>Average</Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Active Users
            </Text>
            <Text size={500} weight="bold">
              87
            </Text>
            <Text size={200}>Right now</Text>
          </div>
          <div>
            <Text size={200} block style={{ marginBottom: tokens.spacingVerticalXS }}>
              Requests/min
            </Text>
            <Text size={500} weight="bold">
              1,245
            </Text>
            <Text size={200}>Current load</Text>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Service Status</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
          <div
            className={classes.statusCard}
            style={{ backgroundColor: tokens.colorPaletteGreenBackground2, ...shorthands.border('1px', 'solid', tokens.colorPaletteGreenBorder2) } as React.CSSProperties}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Checkmark20Filled style={{ color: tokens.colorPaletteGreenForeground1 }} />
              <div>
                <Text weight="semibold" block>
                  Web Application
                </Text>
                <Text size={300}>Operational</Text>
              </div>
            </div>
            <Badge appearance="tint" color="success">
              Healthy
            </Badge>
          </div>

          <div
            className={classes.statusCard}
            style={{ backgroundColor: tokens.colorPaletteGreenBackground2, ...shorthands.border('1px', 'solid', tokens.colorPaletteGreenBorder2) } as React.CSSProperties}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Checkmark20Filled style={{ color: tokens.colorPaletteGreenForeground1 }} />
              <div>
                <Text weight="semibold" block>
                  API Server
                </Text>
                <Text size={300}>All endpoints responding</Text>
              </div>
            </div>
            <Badge appearance="tint" color="success">
              Healthy
            </Badge>
          </div>

          <div
            className={classes.statusCard}
            style={{ backgroundColor: tokens.colorPaletteGreenBackground2, ...shorthands.border('1px', 'solid', tokens.colorPaletteGreenBorder2) } as React.CSSProperties}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Checkmark20Filled style={{ color: tokens.colorPaletteGreenForeground1 }} />
              <div>
                <Text weight="semibold" block>
                  Database
                </Text>
                <Text size={300}>18ms query time average</Text>
              </div>
            </div>
            <Badge appearance="tint" color="success">
              Healthy
            </Badge>
          </div>

          <div
            className={classes.statusCard}
            style={{ backgroundColor: tokens.colorPaletteYellowBackground2, ...shorthands.border('1px', 'solid', tokens.colorPaletteYellowBorder2) } as React.CSSProperties}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Warning20Filled style={{ color: tokens.colorPaletteYellowForeground1 }} />
              <div>
                <Text weight="semibold" block>
                  Background Jobs
                </Text>
                <Text size={300}>12 jobs pending (high queue)</Text>
              </div>
            </div>
            <Badge appearance="tint" color="warning">
              Warning
            </Badge>
          </div>

          <div
            className={classes.statusCard}
            style={{ backgroundColor: tokens.colorPaletteGreenBackground2, ...shorthands.border('1px', 'solid', tokens.colorPaletteGreenBorder2) } as React.CSSProperties}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Checkmark20Filled style={{ color: tokens.colorPaletteGreenForeground1 }} />
              <div>
                <Text weight="semibold" block>
                  Email Service
                </Text>
                <Text size={300}>245 emails sent today</Text>
              </div>
            </div>
            <Badge appearance="tint" color="success">
              Healthy
            </Badge>
          </div>

          <div
            className={classes.statusCard}
            style={{ backgroundColor: tokens.colorPaletteGreenBackground2, ...shorthands.border('1px', 'solid', tokens.colorPaletteGreenBorder2) } as React.CSSProperties}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
              <Checkmark20Filled style={{ color: tokens.colorPaletteGreenForeground1 }} />
              <div>
                <Text weight="semibold" block>
                  File Storage
                </Text>
                <Text size={300}>68% capacity used</Text>
              </div>
            </div>
            <Badge appearance="tint" color="success">
              Healthy
            </Badge>
          </div>
        </div>
      </Card>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Resource Utilization</Title3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
              <Text weight="semibold">CPU Usage</Text>
              <Text weight="bold">42%</Text>
            </div>
            <ProgressBar value={0.42} thickness="large" color="brand" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
              <Text weight="semibold">Memory Usage</Text>
              <Text weight="bold">68%</Text>
            </div>
            <ProgressBar value={0.68} thickness="large" color="success" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
              <Text weight="semibold">Disk Usage</Text>
              <Text weight="bold">82%</Text>
            </div>
            <ProgressBar value={0.82} thickness="large" color="warning" />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalS }}>
              <Text weight="semibold">Network Bandwidth</Text>
              <Text weight="bold">35%</Text>
            </div>
            <ProgressBar value={0.35} thickness="large" color="brand" />
          </div>
        </div>
      </Card>
    </div>
  );
};
