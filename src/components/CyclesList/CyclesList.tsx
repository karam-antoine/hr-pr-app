"use client";
import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import Link from "next/link";
import { CycleDTO } from "@/types/assignment";
import classes from "./CyclesList.module.scss";

interface Props {
  cycles: CycleDTO[];
}
export default function CyclesList({ cycles: initial }: Props) {
  const [cycles, setCycles] = useState<CycleDTO[]>(initial);

  const refresh = async () => {
    const res = await fetch("/api/admin/cycles");
    if (res.ok) {
      setCycles(await res.json());
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <Container fluid className={classes.page}>
      <div className={classes.header}>
        <h2 className={classes.title}>Review Cycles</h2>
        <Link href="/admin/cycles/new" passHref>
          <Button className={classes.createButton}>Create Cycle</Button>
        </Link>
      </div>

      <div className={classes.tableWrapper}>
        <Table hover responsive className={classes.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cycles.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{new Date(c.startDate).toLocaleDateString()}</td>
                <td>{new Date(c.endDate).toLocaleDateString()}</td>
                <td className={classes.actions}>
                  <Link href={`/admin/cycles/${c.id}`} passHref>
                    <Button size="sm" variant="outline-secondary">
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
