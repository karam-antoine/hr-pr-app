'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Modal,
  Button,
  Alert,
  Row,
  Col,
  Form,
  Card,
  Spinner,
} from 'react-bootstrap';
import MultiSelectList from '../MultiSelectList/MultiSelectList';
import { QuestionnaireDTO, UserDTO } from '@/types/questionnaire';
import { CycleDetailsDTO } from '@/types/assignment';

interface Props {
  show: boolean;
  onClose: () => void;
  onSaved: () => void;
  users: UserDTO[];
  questionnaires: QuestionnaireDTO[];
  cycleId?: string;
}

export default function CycleModal({
  show,
  onClose,
  onSaved,
  users,
  questionnaires,
  cycleId,
}: Props) {
  const isEdit = Boolean(cycleId);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedQs, setSelectedQs] = useState<string[]>([]);

  useEffect(() => {
    if (!show || !isEdit) return;

    setLoading(true);
    fetch(`/api/admin/cycles/${cycleId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load cycle');
        return res.json() as Promise<CycleDetailsDTO>;
      })
      .then((cycle) => {
        setName(cycle.name);
        setStartDate(cycle.startDate.slice(0, 10));
        setEndDate(cycle.endDate.slice(0, 10));
        setSelectedUsers(cycle.participantIds);
        setSelectedQs(cycle.questionnaireIds);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [show, cycleId, isEdit]);

  const userItems = useMemo(
    () => users.map((u) => ({ id: u.id, label: u.name })),
    [users]
  );
  const qItems = useMemo(
    () =>
      questionnaires.map((q) => ({
        id: q.id,
        label: q.name,
        group: `${q.category} / ${q.level} / ${q.type}`,
      })),
    [questionnaires]
  );

  const handleSave = useCallback(async () => {
    setError('');
    if (!name.trim() || !startDate || !endDate) {
      setError('Name, start date & end date are required.');
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

    setSaving(true);
    try {
      const url = isEdit ? `/api/admin/cycles/${cycleId}` : `/api/admin/cycles`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
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
      if (!res.ok) throw new Error(json.error || 'Save failed');

      onSaved();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }, [cycleId, endDate, isEdit, name, onClose, onSaved, selectedQs, selectedUsers, startDate]);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? 'Edit Review Cycle' : 'Create New Review Cycle'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <Form>
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
                  height={200}
                  initialSelected={selectedUsers}
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
                  height={200}
                  initialSelected={selectedQs}
                />
              </Card.Body>
            </Card>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving || loading}
        >
          {saving
            ? isEdit
              ? 'Saving…'
              : 'Creating…'
            : isEdit
            ? 'Save Changes'
            : 'Create & Assign'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
