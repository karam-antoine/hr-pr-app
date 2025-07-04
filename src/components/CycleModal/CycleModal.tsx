'use client';

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
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
import MultiSelectList, {
  MultiSelectListRef,
} from '../MultiSelectList/MultiSelectList';
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
const initialCycle: CycleDetailsDTO = {
  id: '',
  name: '',
  startDate: '',
  endDate: '',
  participantIds: [],
  questionnaireIds: [],
};
export default function CycleModal({
  show,
  onClose,
  onSaved,
  users,
  questionnaires,
  cycleId,
}: Props) {
  const [cycle, setCycle] = useState<CycleDetailsDTO>(initialCycle);
  const nameRef = useRef<HTMLInputElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const selectedParticipantsRef = useRef<MultiSelectListRef>(null);
  const selectedQuestionnairesRef = useRef<MultiSelectListRef>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCycle(initialCycle);
    if (!show || cycleId == undefined) return;

    setLoading(true);
    fetch(`/api/admin/cycles/${cycleId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load cycle');
        return res.json() as Promise<CycleDetailsDTO>;
      })
      .then((cycle) => {
        setCycle(cycle);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [show, cycleId]);

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
    const name = nameRef.current?.value.trim() || '';
    const startDate = startDateRef.current?.value;
    const endDate = endDateRef.current?.value;
    const selectedUsers = selectedParticipantsRef.current?.selected || [];
    const selectedQs = selectedQuestionnairesRef.current?.selected || [];
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
      const url = cycle.id
        ? `/api/admin/cycles/${cycleId}`
        : `/api/admin/cycles`;
      const method = cycle.id ? 'PUT' : 'POST';

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
  }, [cycle.id, cycleId, onClose, onSaved]);

  const handleClose = useCallback(() => {
    setCycle(initialCycle);
    setError('');
    onClose();
  }, [onClose]);

  return (
    <Modal show={show} onClose={handleClose} size="lg" centered>
      <Modal.Header>
        <Modal.Title>
          {cycle.id ? 'Edit Review Cycle' : 'Create New Review Cycle'}
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
                    defaultValue={cycle.name}
                    ref={nameRef}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={cycle.startDate.slice(0, 10)}
                    ref={startDateRef}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={cycle.endDate.slice(0, 10)}
                    ref={endDateRef}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Card className="mb-3">
              <Card.Body>
                <Form.Label>Participants</Form.Label>
                <MultiSelectList
                  height={200}
                  items={userItems}
                  placeholder="Search employees…"
                  ref={selectedParticipantsRef}
                  initialSelected={cycle.participantIds}
                />
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Form.Label>Questionnaires</Form.Label>
                <MultiSelectList
                  items={qItems}
                  placeholder="Search questionnaires…"
                  ref={selectedQuestionnairesRef}
                  height={200}
                  initialSelected={cycle.questionnaireIds}
                />
              </Card.Body>
            </Card>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={saving}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={saving || loading}
        >
          {saving
            ? cycle.id
              ? 'Saving…'
              : 'Creating…'
            : cycle.id
            ? 'Save Changes'
            : 'Create & Assign'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
