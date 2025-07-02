'use client';

import React, { useState } from 'react';
import { Modal, Button, Alert, Row, Col, Form, Card } from 'react-bootstrap';
import MultiSelectList from '@/components/MultiSelectList/MultiSelectList';
import { QuestionnaireDTO, UserDTO } from '@/types/questionnaire';

interface Props {
  show: boolean;
  onClose: () => void;
  onCreated: (name: string) => void;
  users: UserDTO[];
  questionnaires: QuestionnaireDTO[];
}

export default function CreateCycleModal({
  show,
  onClose,
  onCreated,
  users,
  questionnaires,
}: Props) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedQs, setSelectedQs] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userItems = users.map((u) => ({ id: u.id, label: u.name }));
  const qItems = questionnaires.map((q) => ({
    id: q.id,
    label: q.name,
    group: `${q.category} - ${q.level} `,
  }));

  async function handleCreate() {
    setError('');
    if (!name.trim() || !startDate || !endDate) {
      setError('Name, start & end date required.');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError('Start date must be before end date.');
      return;
    }
    if (!selectedUsers.length || !selectedQs.length) {
      setError('Select at least one participant & one questionnaire.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/cycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          startDate,
          endDate,
          participantIds: selectedUsers,
          questionnaireIds: selectedQs,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to create');
      onCreated(json.name);
      setName('');
      setStartDate('');
      setEndDate('');
      setSelectedUsers([]);
      setSelectedQs([]);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Review Cycle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Cycle Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Q1 2026"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Card className="mb-3">
          <Card.Body>
            <Form.Label>Participants</Form.Label>
            <MultiSelectList
              items={userItems}
              onChange={setSelectedUsers}
              placeholder="Search employees…"
              groupName='Users'
            />
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Form.Label>Questionnaires</Form.Label>
            <MultiSelectList
              items={qItems}
              onChange={setSelectedQs}
              placeholder="Search questionnaires…"
            />
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate} disabled={loading}>
          {loading ? 'Creating…' : 'Create & Assign'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
