/**
 * HR - Performance Review & Appraisal
 * EXPERT: Senior React Engineer (Assessment Framework)
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
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Badge,
  Avatar,
  ProgressBar,
  Rating,
} from '@fluentui/react-components';
import { Add20Regular, DocumentPdf20Regular, Eye20Regular } from '@fluentui/react-icons';
import { formatDate } from '@/shared/utils/formatters';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalL),
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
    textAlign: 'center',
  },
});

const REVIEWS = [
  {
    id: '1',
    employee: 'Ahmed Hassan',
    empId: 'EMP-001',
    department: 'Sales',
    reviewPeriod: 'Q1 2026',
    reviewDate: '2026-03-28',
    overallScore: 4.2,
    status: 'Completed',
    reviewer: 'Manager A',
  },
  {
    id: '2',
    employee: 'Fatima Rahman',
    empId: 'EMP-002',
    department: 'Marketing',
    reviewPeriod: 'Q1 2026',
    reviewDate: '2026-03-29',
    overallScore: 4.8,
    status: 'Completed',
    reviewer: 'Manager B',
  },
  {
    id: '3',
    employee: 'Karim Ali',
    empId: 'EMP-003',
    department: 'IT',
    reviewPeriod: 'Q1 2026',
    reviewDate: '2026-03-30',
    overallScore: 0,
    status: 'In Progress',
    reviewer: 'Manager C',
  },
  {
    id: '4',
    employee: 'Nusrat Jahan',
    empId: 'EMP-004',
    department: 'HR',
    reviewPeriod: 'Q1 2026',
    reviewDate: '2026-04-02',
    overallScore: 0,
    status: 'Scheduled',
    reviewer: 'Manager D',
  },
];

export const PerformanceReviews = () => {
  const classes = useStyles();

  const totalReviews = REVIEWS.length;
  const completedCount = REVIEWS.filter((r) => r.status === 'Completed').length;
  const avgScore =
    REVIEWS.filter((r) => r.status === 'Completed').reduce((sum, r) => sum + r.overallScore, 0) / completedCount || 0;
  const pendingCount = REVIEWS.filter((r) => r.status !== 'Completed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'brand';
      case 'Scheduled':
        return 'warning';
      default:
        return 'subtle';
    }
  };

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Performance Reviews & Appraisals</Title3>
          <Text>Track and manage employee performance evaluations</Text>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Button appearance="secondary" icon={<DocumentPdf20Regular />}>
            Export Report
          </Button>
          <Button appearance="primary" icon={<Add20Regular />}>
            Schedule Review
          </Button>
        </div>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Reviews
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            {totalReviews}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Completed
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            {completedCount}
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Average Score
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            {avgScore.toFixed(1)}/5.0
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Pending
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            {pendingCount}
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Performance Review Tracker</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Employee</TableHeaderCell>
              <TableHeaderCell>Department</TableHeaderCell>
              <TableHeaderCell>Review Period</TableHeaderCell>
              <TableHeaderCell>Review Date</TableHeaderCell>
              <TableHeaderCell>Reviewer</TableHeaderCell>
              <TableHeaderCell>Overall Score</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {REVIEWS.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                    <Avatar name={review.employee} size={32} />
                    <div>
                      <Text weight="semibold" block>
                        {review.employee}
                      </Text>
                      <Text size={200}>{review.empId}</Text>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge appearance="outline">{review.department}</Badge>
                </TableCell>
                <TableCell>
                  <Text>{review.reviewPeriod}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{formatDate(review.reviewDate)}</Text>
                </TableCell>
                <TableCell>
                  <Text size={300}>{review.reviewer}</Text>
                </TableCell>
                <TableCell>
                  {review.status === 'Completed' ? (
                    <div>
                      <Text weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
                        {review.overallScore.toFixed(1)}
                      </Text>
                      <Rating value={review.overallScore} max={5} size="small" />
                      <ProgressBar
                        value={(review.overallScore / 5) * 100}
                        max={100}
                        color={review.overallScore >= 4 ? 'success' : review.overallScore >= 3 ? 'brand' : 'warning'}
                        thickness="medium"
                        style={{ marginTop: tokens.spacingVerticalXS }}
                      />
                    </div>
                  ) : (
                    <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
                      Not Rated
                    </Text>
                  )}
                </TableCell>
                <TableCell>
                  <Badge appearance="tint" color={getStatusColor(review.status)}>
                    {review.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                    {review.status === 'Completed' && (
                      <Button appearance="subtle" size="small" icon={<Eye20Regular />}>
                        View
                      </Button>
                    )}
                    {review.status === 'In Progress' && (
                      <Button appearance="primary" size="small">
                        Continue
                      </Button>
                    )}
                    {review.status === 'Scheduled' && (
                      <Button appearance="primary" size="small">
                        Start Review
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: tokens.spacingHorizontalL }}>
        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Review Criteria</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {['Technical Skills', 'Communication', 'Teamwork', 'Leadership', 'Problem Solving'].map((criteria, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={300}>{criteria}</Text>
                  <Text size={300} weight="semibold">
                    {(4.5 - idx * 0.2).toFixed(1)}/5.0
                  </Text>
                </div>
                <ProgressBar
                  value={(4.5 - idx * 0.2) * 20}
                  max={100}
                  color={4.5 - idx * 0.2 >= 4 ? 'success' : 'brand'}
                  thickness="medium"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
          <Title3 style={{ marginBottom: tokens.spacingVerticalM }}>Department Averages</Title3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
            {['Sales', 'Marketing', 'IT', 'HR', 'Finance'].map((dept, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={300}>{dept}</Text>
                  <Text size={300} weight="semibold">
                    {(4.8 - idx * 0.3).toFixed(1)}/5.0
                  </Text>
                </div>
                <ProgressBar
                  value={(4.8 - idx * 0.3) * 20}
                  max={100}
                  color={4.8 - idx * 0.3 >= 4 ? 'success' : 'brand'}
                  thickness="medium"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
