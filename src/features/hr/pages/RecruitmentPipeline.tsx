/**
 * HR - Recruitment & Hiring Pipeline
 * EXPERT: UI/UX Designer (Talent Acquisition)
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
  Badge,
  Avatar,
  Dropdown,
  Option,
  Input,
} from '@fluentui/react-components';
import { Add20Regular, Person20Regular, Mail20Regular, Calendar20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  kanbanBoard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.overflow('auto'),
  },
  column: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding(tokens.spacingVerticalM),
    minWidth: '250px',
  },
  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM,
  },
  candidateCard: {
    ...shorthands.padding(tokens.spacingVerticalM),
    marginBottom: tokens.spacingVerticalS,
    cursor: 'pointer',
    ':hover': {
      boxShadow: tokens.shadow8,
    },
  },
  candidateHeader: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginBottom: tokens.spacingVerticalS,
  },
});

const STAGES = [
  { id: 'applied', name: 'Applied', color: tokens.colorPaletteBlueForeground2, count: 15 },
  { id: 'screening', name: 'Screening', color: tokens.colorPalettePurpleForeground2, count: 8 },
  { id: 'interview', name: 'Interview', color: tokens.colorPaletteYellowForeground1, count: 5 },
  { id: 'assessment', name: 'Assessment', color: tokens.colorPaletteDarkOrangeForeground1, count: 3 },
  { id: 'offer', name: 'Offer', color: tokens.colorPaletteGreenForeground1, count: 2 },
];

const CANDIDATES = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    position: 'Senior Developer',
    stage: 'applied',
    experience: '5 years',
    rating: 4.5,
    appliedDate: '2026-03-20',
  },
  {
    id: '2',
    name: 'Mohammad Khan',
    position: 'Marketing Manager',
    stage: 'screening',
    experience: '7 years',
    rating: 4.2,
    appliedDate: '2026-03-18',
  },
  {
    id: '3',
    name: 'Ayesha Rahman',
    position: 'UI/UX Designer',
    stage: 'interview',
    experience: '4 years',
    rating: 4.8,
    appliedDate: '2026-03-15',
  },
  {
    id: '4',
    name: 'Imran Ali',
    position: 'Data Analyst',
    stage: 'assessment',
    experience: '3 years',
    rating: 4.0,
    appliedDate: '2026-03-12',
  },
  {
    id: '5',
    name: 'Zainab Hassan',
    position: 'HR Executive',
    stage: 'offer',
    experience: '6 years',
    rating: 4.9,
    appliedDate: '2026-03-10',
  },
];

export const RecruitmentPipeline = () => {
  const classes = useStyles();

  const getCandidatesByStage = (stageId: string) => CANDIDATES.filter((c) => c.stage === stageId);

  return (
    <div className={classes.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title3>Recruitment & Hiring Pipeline</Title3>
          <Text>Track candidates through the hiring process</Text>
        </div>
        <Button appearance="primary" icon={<Add20Regular />}>
          Add Candidate
        </Button>
      </div>

      <Card style={{ ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalL) } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM }}>
          <Input placeholder="Search candidates..." style={{ flexGrow: 1, maxWidth: '300px' }} />
          <Dropdown placeholder="All Positions">
            <Option value="all">All Positions</Option>
            <Option value="developer">Senior Developer</Option>
            <Option value="marketing">Marketing Manager</Option>
            <Option value="designer">UI/UX Designer</Option>
            <Option value="analyst">Data Analyst</Option>
          </Dropdown>
          <Dropdown placeholder="All Stages">
            <Option value="all">All Stages</Option>
            <Option value="applied">Applied</Option>
            <Option value="screening">Screening</Option>
            <Option value="interview">Interview</Option>
            <Option value="assessment">Assessment</Option>
            <Option value="offer">Offer</Option>
          </Dropdown>
        </div>
      </Card>

      <div className={classes.kanbanBoard}>
        {STAGES.map((stage) => {
          const stageCandidates = getCandidatesByStage(stage.id);

          return (
            <div key={stage.id} className={classes.column}>
              <div className={classes.columnHeader}>
                <Text weight="semibold">{stage.name}</Text>
                <Badge appearance="tint" style={{ backgroundColor: stage.color + '20', color: stage.color }}>
                  {stage.count}
                </Badge>
              </div>

              {stageCandidates.map((candidate) => (
                <Card key={candidate.id} className={classes.candidateCard}>
                  <div className={classes.candidateHeader}>
                    <Avatar name={candidate.name} size={36} />
                    <div style={{ flexGrow: 1 }}>
                      <Text weight="semibold" block size={300}>
                        {candidate.name}
                      </Text>
                      <Text size={200}>{candidate.position}</Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS }}>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalXS, flexWrap: 'wrap' }}>
                      <Badge appearance="tint" color="informative" size="small">
                        {candidate.experience}
                      </Badge>
                      <Badge
                        appearance="tint"
                        color={candidate.rating >= 4.5 ? 'success' : 'brand'}
                        size="small"
                      >
                        ★ {candidate.rating}
                      </Badge>
                    </div>

                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      Applied: {candidate.appliedDate}
                    </Text>

                    <div
                      style={{
                        display: 'flex',
                        gap: tokens.spacingHorizontalXS,
                        marginTop: tokens.spacingVerticalS,
                      }}
                    >
                      <Button appearance="subtle" size="small" icon={<Person20Regular />} />
                      <Button appearance="subtle" size="small" icon={<Mail20Regular />} />
                      <Button appearance="subtle" size="small" icon={<Calendar20Regular />} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
