"use client";

import React, { useMemo, useRef, useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import Select, { GroupBase } from "react-select";
import classes from "./CycleForm.module.scss";

type User = { id: string; name: string };
type Questionnaire = {
  id: string;
  name: string;
  level: string;
  category: string;
  type: string;
};

interface Props {
  users: User[];
  questionnaires: Questionnaire[];
}

type UserOption = { value: string; label: string };
type QOption = { value: string; label: string };
type QGroup = GroupBase<QOption>;

export default function CycleForm({ users, questionnaires }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([]);
  const [selectedQs, setSelectedQs] = useState<QOption[]>([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userOptions: UserOption[] = useMemo(
    () =>
      users.map((u) => ({
        value: u.id,
        label: u.name,
      })),
    [users]
  );

  const qGroups: QGroup[] = useMemo(
    () =>
      Object.entries(
        questionnaires.reduce<Record<string, QOption[]>>((acc, q) => {
          const key = `${q.level} · ${q.category} · ${q.type}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push({ value: q.id, label: q.name });
          return acc;
        }, {})
      ).map(([label, options]) => ({ label, options })),
    [questionnaires]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const name = nameRef.current?.value.trim() || "";
    const startDate = startRef.current?.value;
    const endDate = endRef.current?.value;

    if (!name || !startDate || !endDate) {
      setError("Name, start date & end date are required.");
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError("Start date must be before end date.");
      return;
    }

    if (selectedUsers.length === 0 || selectedQs.length === 0) {
      setError("Select at least one participant and one questionnaire.");
      return;
    }

    try {
      const res = await fetch("/api/admin/cycles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          startDate,
          endDate,
          participantIds: selectedUsers.map((u) => u.value),
          questionnaireIds: selectedQs.map((q) => q.value),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Failed to create cycle");

      setSuccess(`Cycle “${body.name}” created!`);
      if (nameRef.current) nameRef.current.value = "";
      if (startRef.current) startRef.current.value = "";
      if (endRef.current) endRef.current.value = "";
      setSelectedUsers([]);
      setSelectedQs([]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className={classes.formContainer}>
      <h2>Create New Review Cycle</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} className={classes.form}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Cycle Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Q1 2026"
              ref={nameRef}
            />
          </Col>
          <Col md={3}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" ref={startRef} />
          </Col>
          <Col md={3}>
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" ref={endRef} />
          </Col>
        </Row>

        <Form.Group className="mb-4">
          <Form.Label>Participants</Form.Label>
          <Select<UserOption, true, GroupBase<UserOption>>
            isMulti
            options={userOptions}
            value={selectedUsers}
            onChange={(opts) => setSelectedUsers(opts as UserOption[])}
            classNamePrefix="react-select"
            placeholder="Select participants…"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Questionnaires</Form.Label>
          <Select<QOption, true, QGroup>
            isMulti
            options={qGroups}
            value={selectedQs}
            onChange={(opts) => setSelectedQs(opts as QOption[])}
            classNamePrefix="react-select"
            placeholder="Select questionnaires…"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Cycle &amp; Assign
        </Button>
      </Form>
    </Container>
  );
}
