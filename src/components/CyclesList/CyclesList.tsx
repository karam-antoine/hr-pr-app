'use client';

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Container,
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';

import { CycleDTO } from '@/types/assignment';
import { QuestionnaireDTO, UserDTO } from '@/types/questionnaire';
import CycleModal from '@/components/CycleModal/CycleModal';

import classes from './CyclesList.module.scss';
interface Props {
  cycles: CycleDTO[];
  users: UserDTO[];
  questionnaires: QuestionnaireDTO[];
}

export default function CyclesList({
  cycles: initial,
  users,
  questionnaires,
}: Props) {
  const [cycles, setCycles] = useState<CycleDTO[]>(initial);
  const [cycleId, setCycleId] = useState<string | undefined>();
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const refreshCycles = useCallback(() => {
    return fetch('/api/admin/cycles')
      .then((res) => res.json())
      .then(setCycles);
  }, []);

  useEffect(() => {
    refreshCycles();
  }, [refreshCycles]);
  const displayed = useMemo(
    () =>
      cycles.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase())),
    [cycles, filter]
  );
  const onCreateClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const onUpdateClick = useCallback((id: string) => {
    setShowModal(true);
    setCycleId(id);
  }, []);

  return (
    <>
      <Container className={classes.page}>
        <div className={classes.header}>
          <h2 className={classes.title}>Review Cycles</h2>
          <div className={classes.actions}>
            <InputGroup className="me-2">
              <FormControl
                placeholder="Search cycles…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </InputGroup>
            <Button className={classes.createButton} onClick={onCreateClick}>
              Create
            </Button>
          </div>
        </div>

        <Card className={classes.card}>
          <Table hover striped responsive className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.startDate).toLocaleDateString()}</td>
                  <td>{new Date(c.endDate).toLocaleDateString()}</td>
                  <td className="text-end">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => onUpdateClick(c.id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
              {displayed.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    No cycles found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
      <CycleModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setCycleId(undefined);
        }}
        onSaved={() => {
          setShowModal(false);
          setCycleId(undefined);
          refreshCycles();
        }}
        users={users}
        questionnaires={questionnaires}
        cycleId={cycleId}
      />
    </>
  );
}
