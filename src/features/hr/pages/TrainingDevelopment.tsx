/**
 * HR - Training & Development
 * EXPERT: Enterprise Solution Architect (Learning Management)
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
  ProgressBar,
  Avatar,
} from '@fluentui/react-components';
import { Add20Regular, BookOpen20Regular, Certificate20Regular } from '@fluentui/react-icons';
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

const COURSES = [
  {
    id: '1',
    title: 'Advanced Sales Techniques',
    instructor: 'Senior Trainer',
    enrolled: 24,
    completed: 18,
    duration: '8 hours',
    category: 'Sales',
  },
  {
    id: '2',
    title: 'Financial Compliance & Regulations',
    instructor: 'Finance Expert',
    enrolled: 15,
    completed: 12,
    duration: '6 hours',
    category: 'Finance',
  },
  {
    id: '3',
    title: 'Leadership Development Program',
    instructor: 'HR Manager',
    enrolled: 10,
    completed: 7,
    duration: '12 hours',
    category: 'Management',
  },
];

export const TrainingDevelopment = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Training & Development</Title3>
          <Text>Manage employee training programs and skill development</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Create Course
        </Button>
      </div>

      <div className={classes.statsGrid}>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Total Courses
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorBrandForeground1 }}>
            24
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Enrolled Employees
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteBlueForeground2 }}>
            156
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Completion Rate
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteGreenForeground1 }}>
            78%
          </Text>
        </Card>
        <Card className={classes.statCard}>
          <Text size={200} block>
            Certificates Issued
          </Text>
          <Text size={600} weight="bold" block style={{ color: tokens.colorPaletteYellowForeground1 }}>
            89
          </Text>
        </Card>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalL) } as React.CSSProperties}>
        <Title3 style={{ marginBottom: tokens.spacingVerticalL }}>Training Courses</Title3>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Course Title</TableHeaderCell>
              <TableHeaderCell>Instructor</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Duration</TableHeaderCell>
              <TableHeaderCell>Enrolled</TableHeaderCell>
              <TableHeaderCell>Completed</TableHeaderCell>
              <TableHeaderCell>Progress</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {COURSES.map((course) => {
              const progress = ((course.completed / course.enrolled) * 100).toFixed(1);
              return (
                <TableRow key={course.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      <BookOpen20Regular />
                      <Text weight="semibold">{course.title}</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{course.instructor}</Text>
                  </TableCell>
                  <TableCell>
                    <Badge appearance="outline">{course.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Text size={300}>{course.duration}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold">{course.enrolled}</Text>
                  </TableCell>
                  <TableCell>
                    <Text weight="semibold" style={{ color: tokens.colorPaletteGreenForeground1 }}>
                      {course.completed}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <div style={{ minWidth: '120px' }}>
                      <ProgressBar
                        value={parseFloat(progress)}
                        max={100}
                        color={parseFloat(progress) >= 75 ? 'success' : 'brand'}
                        thickness="medium"
                      />
                      <Text size={200}>{progress}%</Text>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS }}>
                      <Button appearance="subtle" size="small">
                        View
                      </Button>
                      <Button appearance="subtle" size="small" icon={<Certificate20Regular />}>
                        Certify
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
