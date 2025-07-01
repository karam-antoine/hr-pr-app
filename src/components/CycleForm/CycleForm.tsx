"use client";

import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

import MultiSelectList from "../MultiSelectList/MultiSelectList";

import styles from "./CycleForm.module.scss";

type User = { id: string; name: string };
type Questionnaire = {
  id:       string;
  name:     string;
  level:    string;
  category: string;
  type:     string;
};

interface Props {
  users: User[];
  questionnaires: Questionnaire[];
}

export default function CycleForm({ users, questionnaires }: Props) {
  const [name, setName]                   = useState("");
  const [startDate, setStartDate]         = useState("");
  const [endDate, setEndDate]             = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedQs, setSelectedQs]       = useState<string[]>([]);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState("");

  const userItems = users.map((u) => ({
    id: u.id,
    label: u.name,
  }));

  const qItems = questionnaires.map((q) => ({
    id:    q.id,
    label: q.name,
    group: `${q.category} / ${q.level} / ${q.type}`,
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (!name.trim() || !startDate || !endDate) {
      setError("Name, start & end date required.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError("Start date must precede end date.");
      return;
    }
    if (!selectedUsers.length || !selectedQs.length) {
      setError("Pick at least one participant & one questionnaire.");
      return;
    }

    const body = {
      name,
      startDate,
      endDate,
      participantIds:   selectedUsers,
      questionnaireIds: selectedQs,
    };

    const res = await fetch("/api/admin/cycles", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error || "Failed to create cycle");
    } else {
      setSuccess(`Cycle “${json.name}” created!`);
      setName(""); setStartDate(""); setEndDate("");
      setSelectedUsers([]); setSelectedQs([]);
    }
  };

  return (
    <Container className={styles.page}>
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <h3>Create New Review Cycle</h3>
        </Card.Header>
        <Card.Body>
          {error   && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
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

            <Form.Group className="mb-4">
              <Form.Label>Participants</Form.Label>
              <MultiSelectList
                items={userItems}
                placeholder="Search employees…"
                onChange={setSelectedUsers}
                height={200}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Questionnaires</Form.Label>
              <MultiSelectList
                items={qItems}
                placeholder="Search questionnaires…"
                onChange={setSelectedQs}
                height={200}
              />
            </Form.Group>

            <Button type="submit" className="w-100">
              Create Cycle &amp; Assign
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
