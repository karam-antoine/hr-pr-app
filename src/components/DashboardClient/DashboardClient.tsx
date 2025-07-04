'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Carousel,
} from 'react-bootstrap';
import { FaStar, FaRegStar, FaClock, FaUserFriends } from 'react-icons/fa';
import { differenceInCalendarDays } from 'date-fns';
import type {
  AssignmentDTO,
  CycleDTO,
  PastAssignmentDTO,
} from '@/types/assignment';
import classes from './DashboardClient.module.scss';

interface CycleBlock {
  cycle: CycleDTO;
  assignments: AssignmentDTO[];
}

interface Props {
  active: CycleBlock[];
  past: PastAssignmentDTO[];
}

export default function DashboardClient({ active, past }: Props) {
  const router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState(0);

  const allActiveAssignments = useMemo(
    () => active.flatMap((c) => c.assignments),
    [active]
  );
  const stats = useMemo(
    () => ({
      notStarted: allActiveAssignments.filter((a) => a.status === 'DUE').length,
      inProgress: allActiveAssignments.filter((a) => a.status === 'DRAFT')
        .length,
      completed: allActiveAssignments.filter((a) => a.status === 'SUBMITTED')
        .length,
    }),
    [allActiveAssignments]
  );

  const daysLeft = useMemo(() => {
    if (!active.length) return 0;
    const earliest = active
      .map((c) => new Date(c.cycle.endDate))
      .reduce(
        (min, d) => (d < min ? d : min),
        new Date(active[0].cycle.endDate)
      );
    return differenceInCalendarDays(earliest, new Date());
  }, [active]);

  const statsConfig = useMemo(() => {
    const arr = [
      { icon: <FaClock />, value: stats.notStarted, label: 'Not Started' },
      { icon: <FaStar />, value: stats.inProgress, label: 'In Progress' },
      { icon: <FaRegStar />, value: stats.completed, label: 'Completed' },
    ];
    if (active.length) {
      arr.push({ icon: <FaClock />, value: daysLeft, label: 'Days Left' });
    }
    return arr;
  }, [stats, daysLeft, active.length]);

  const handleSelect = useCallback((idx: number) => {
    setSelectedIdx(idx);
  }, []);
  const handleStart = useCallback(
    (assignment: AssignmentDTO) => {
      router.push(`/questionnaire/${assignment.questionnaireId}`);
    },
    [router]
  );

  const current = active[selectedIdx];
  return (
    <Container className={classes.page}>
      <Row className={classes.statsRow}>
        {statsConfig.map(({ icon, value, label }) => (
          <Col key={label} md={3}>
            <Card className={classes.statCard}>
              <Card.Body className="text-center">
                <div className={classes.statIcon}>{icon}</div>
                <div className={classes.statValue}>{value}</div>
                <div className={classes.statLabel}>{label}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {active.length ? (
        <Carousel
          activeIndex={selectedIdx}
          onSelect={handleSelect}
          className={classes.carousel}
          interval={null}
        >
          {active.map(({ cycle, assignments }) => {
            const pct = Math.round(
              (assignments.filter((a) => a.status === 'SUBMITTED').length /
                assignments.length) *
                100
            );
            return (
              <Carousel.Item key={cycle.id}>
                <Card className={classes.activeCycleCard} body>
                  <Row>
                    <Col md={10}>
                      <h4>{cycle.name}</h4>
                      <div className={classes.dates}>
                        {new Date(cycle.startDate).toLocaleDateString()} –{' '}
                        {new Date(cycle.endDate).toLocaleDateString()}
                      </div>
                      <div className={classes.cycleMeta}>
                        <FaClock /> <span>Active Cycle</span>
                        <FaUserFriends />{' '}
                        <span>{assignments.length} Reviews</span>
                      </div>
                    </Col>
                    <Col md={2} className="text-end">
                      <div className={classes.progressValue}>{pct}%</div>
                      <div className={classes.progressLabel}>Complete</div>
                    </Col>
                  </Row>
                </Card>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <Card className={classes.noActiveCard}>
          <Card.Body className="text-center">
            <h5>No active cycles.</h5>
          </Card.Body>
        </Card>
      )}
      {current && (
        <Card className={classes.assignmentsCard}>
          <Card.Header>
            Your Review Assignments for {current.cycle.name}
          </Card.Header>
          <ListGroup variant="flush">
            {current.assignments.map((a) => (
              <ListGroup.Item
                key={a.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{a.revieweeName}</strong>
                  <div className={classes.dueDate}>
                    Due: {new Date(a.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-end">
                  <div className={classes.statusLabel}>
                    {
                      {
                        DUE: 'Not Started',
                        DRAFT: 'In Progress',
                        SUBMITTED: 'Completed',
                      }[a.status]
                    }
                  </div>
                  <Button size="sm" onClick={() => handleStart(a)}>
                    {a.status === 'DRAFT' ? 'Continue' : 'Start'}
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
      {past.length > 0 && (
        <Card className={classes.pastCard}>
          <Card.Header>Past Reviews</Card.Header>
          <ListGroup variant="flush">
            {past.map((p) => (
              <ListGroup.Item
                key={p.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{p.cycleName}</strong> — {p.revieweeName}
                  <div className={classes.dueDate}>
                    Completed on: {new Date(p.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-end">
                  <div className={classes.statusLabel}>
                    {p.status === 'SUBMITTED' ? 'Completed' : p.status}
                  </div>
                  {p.rating != null && (
                    <div className={classes.rating}>
                      {/* notime for icons this passed the vibe check */}
                      {'★'.repeat(p.rating) + '☆'.repeat(5 - p.rating)} 
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() =>
                      router.push(`/questionnaire/${p.questionnaireId}`)
                    }
                  >
                    View
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </Container>
  );
}
