'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Card,
  Table,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import Link from 'next/link';

import { CycleDTO } from '@/types/assignment';
import { QuestionnaireDTO, UserDTO } from '@/types/questionnaire';
import CreateCycleModal from '@/components/CreateCycleModal/CreateCycleModal';

import styles from './CyclesList.module.scss';
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
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    refreshCycles();
  }, []);
  const refreshCycles = () => {
    return fetch('/api/admin/cycles')
      .then((res) => res.json())
      .then(setCycles);
  };
  const displayed = useMemo(
    () =>
      cycles.filter((c) => c.name.toLowerCase().includes(filter.toLowerCase())),
    [cycles, filter]
  );
  const onCreateClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <Container className={styles.page}>
        <div className={styles.header}>
          <h2 className={styles.title}>Review Cycles</h2>
          <div className={styles.actions}>
            <InputGroup className="me-2">
              <FormControl
                placeholder="Search cycles…"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </InputGroup>
            <Button className={styles.createButton} onClick={onCreateClick}>
              Create
            </Button>
          </div>
        </div>

        <Card className={styles.card}>
          <Table hover striped responsive className={styles.table}>
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
                    <Link href={`/admin/cycles/${c.id}`} passHref>
                      <Button size="sm" variant="outline-secondary">
                        Edit
                      </Button>
                    </Link>
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
      <CreateCycleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onCreated={() => {
          setShowModal(false);
          refreshCycles(); // re-fetch or re-render list
        }}
        users={users}
        questionnaires={questionnaires}
      />
    </>
  );
}
