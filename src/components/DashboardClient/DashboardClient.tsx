'use client';

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {
  FaStar,
  FaRegStar,
  FaClock,
  FaUserFriends,
  FaListAlt,
} from 'react-icons/fa';
import { differenceInCalendarDays } from 'date-fns';
import type { AssignmentDTO, PastAssignmentDTO } from '@/types/assignment';
import classes from './DashboardClient.module.scss';

interface CycleBlock {
  cycle: { name: string; startDate: string; endDate: string };
  assignments: AssignmentDTO[];
}

interface Props {
  active: CycleBlock[];
  past: PastAssignmentDTO[];
}

export default function DashboardClient({ active, past }: Props) {
  const usingActive = active.length > 0;
  const sourceAssignments: AssignmentDTO[] | PastAssignmentDTO[] = usingActive
    ? active.flatMap((c) => c.assignments)
    : past;

  const notStarted = sourceAssignments.filter((a) => a.status === 'DUE').length;
  const inProgress = sourceAssignments.filter(
    (a) => a.status === 'DRAFT'
  ).length;
  const completed = sourceAssignments.filter(
    (a) => a.status === 'SUBMITTED'
  ).length;
  const daysLeft = usingActive
    ? differenceInCalendarDays(new Date(active[0].cycle.endDate), new Date())
    : 0;

  return (
    <Container fluid className={classes.dashboard}>
      <h1 className={classes.title}>Dashboard</h1>
      <p className={classes.subtitle}>
        Welcome back! Here&apos;s your review progress overview.
      </p>

      <Row className={classes.summaryGrid}>
        {[
          { icon: <FaClock />, value: notStarted, label: 'Not Started' },
          { icon: <FaRegStar />, value: inProgress, label: 'In Progress' },
          { icon: <FaStar />, value: completed, label: 'Completed' },
          ...(usingActive
            ? [{ icon: <FaClock />, value: daysLeft, label: 'Days Left' }]
            : []),
        ].map(({ icon, value, label }, i) => (
          <Col key={i}>
            <Card className={classes.summaryCard}>
              <div className={classes.summaryIcon}>{icon}</div>
              <div className={classes.summaryNumber}>{value}</div>
              <div className={classes.summaryLabel}>{label}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {usingActive && (
        <Card className={classes.cycleBanner}>
          <Row className="align-items-center">
            <Col>
              <div className={classes.cycleName}>{active[0].cycle.name}</div>
              <div className={classes.cycleDates}>
                {new Date(active[0].cycle.startDate).toLocaleDateString()} –{' '}
                {new Date(active[0].cycle.endDate).toLocaleDateString()}
              </div>
              <div className={classes.cycleStats}>
                <FaClock /> Active Cycle&nbsp;&nbsp;
                <FaUserFriends /> {sourceAssignments.length} Reviews
              </div>
            </Col>
            <Col xs="auto" className={classes.cycleProgressWrapper}>
              <div className={classes.cycleProgressNumber}>
                {Math.round((completed / sourceAssignments.length) * 100)}%
              </div>
              <div className={classes.cycleProgressLabel}>Complete</div>
            </Col>
          </Row>
        </Card>
      )}

      {!usingActive && (
        <Card className={classes.assignmentsSection}>
          <div className={classes.assignmentsHeader}>
            <FaListAlt className="me-2" /> Past Reviews
          </div>
          {past.length === 0 ? (
            <div className={classes.emptyState}>No past reviews found.</div>
          ) : (
            past.map((a) => (
              <Row key={a.id} className={classes.assignmentRow}>
                <Col className={classes.assignmentInfo}>
                  <div className={classes.assignmentName}>
                    {a.revieweeName} ({a.cycleName})
                  </div>
                  <div className={classes.assignmentDue}>
                    Due: {new Date(a.dueDate).toLocaleDateString()}
                  </div>
                </Col>
                <Col xs="auto" className={classes.assignmentStatus}>
                  {
                    {
                      DUE: (
                        <span className={classes.statusDue}>Not Started</span>
                      ),
                      DRAFT: (
                        <span className={classes.statusDraft}>In Progress</span>
                      ),
                      SUBMITTED: (
                        <span className={classes.statusSubmitted}>
                          Completed
                        </span>
                      ),
                    }[a.status]
                  }
                </Col>
                <Col xs="auto" className={classes.assignmentRating}>
                  {a.rating != null
                    ? Array.from({ length: 4 }).map((_, i) =>
                        i < (a.rating ?? 0) ? (
                          <FaStar key={i} color="var(--color-brand)" />
                        ) : (
                          <FaRegStar key={i} color="var(--color-grey-600)" />
                        )
                      )
                    : '—'}
                </Col>
                <Col xs="auto">
                  <Button
                    className={classes.assignmentButton}
                    onClick={() =>
                      (window.location.href = `/questionnaire/${a.id}`)
                    }
                  >
                    View
                  </Button>
                </Col>
              </Row>
            ))
          )}
        </Card>
      )}

      {/* If we have an active cycle, render assignments for it */}
      {usingActive && (
        <Card className={classes.assignmentsSection}>
          <div className={classes.assignmentsHeader}>
            Your Review Assignments for {active[0].cycle.name}
          </div>
          {active[0].assignments.map((a) => (
            <Row key={a.id} className={classes.assignmentRow}>
              <Col className={classes.assignmentInfo}>
                <div className={classes.assignmentName}>{a.revieweeName}</div>
                <div className={classes.assignmentDue}>
                  Due: {new Date(a.dueDate).toLocaleDateString()}
                </div>
              </Col>
              <Col xs="auto" className={classes.assignmentStatus}>
                {
                  {
                    DUE: <span className={classes.statusDue}>Not Started</span>,
                    DRAFT: (
                      <span className={classes.statusDraft}>In Progress</span>
                    ),
                    SUBMITTED: (
                      <span className={classes.statusSubmitted}>Completed</span>
                    ),
                  }[a.status]
                }
              </Col>
              <Col xs="auto" className={classes.assignmentRating}>
                {a.rating != null
                  ? Array.from({ length: 4 }).map((_, i) =>
                      i < (a.rating ?? 0) ? (
                        <FaStar key={i} color="var(--color-brand)" />
                      ) : (
                        <FaRegStar key={i} color="var(--color-grey-600)" />
                      )
                    )
                  : '—'}
              </Col>
              <Col xs="auto">
                <Button
                  className={classes.assignmentButton}
                  onClick={() =>
                    (window.location.href = `/questionnaire/${a.questionnaireId}`)
                  }
                >
                  {a.status === 'DRAFT' ? 'Continue' : 'Start'}
                </Button>
              </Col>
            </Row>
          ))}
        </Card>
      )}
    </Container>
  );
}
