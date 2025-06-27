import { prisma } from "@/lib/prisma";
import { CycleDTO } from "@/types/assignment";
import { QuestionnaireTypes } from "@/types/enums";

export async function listCycles(): Promise<CycleDTO[]> {
  const rows = await prisma.cycle.findMany({
    orderBy: { startDate: "desc" },
    select: {
      id: true,
      name: true,
      startDate: true,
      endDate: true,
    },
  });

  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    startDate: c.startDate.toISOString(),
    endDate: c.endDate.toISOString(),
  }));
}

export async function getCycleById(id: string): Promise<{
  cycle: CycleDTO;
  participantIds: string[];
  assignmentIds: string[];
}> {
  const c = await prisma.cycle.findUnique({
    where: { id },
    include: {
      participants: { select: { userId: true } },
      assignments: { select: { id: true } },
    },
  });

  if (!c) {
    throw new Error(`Cycle not found: ${id}`);
  }

  return {
    cycle: {
      id: c.id,
      name: c.name,
      startDate: c.startDate.toISOString(),
      endDate: c.endDate.toISOString(),
    },
    participantIds: c.participants.map((p) => p.userId),
    assignmentIds: c.assignments.map((a) => a.id),
  };
}

export async function createCycleWithAssignments(data: {
  name: string;
  startDate: Date;
  endDate: Date;
  participantIds: string[];
  questionnaireIds: string[];
}): Promise<CycleDTO> {
  const cycle = await prisma.cycle.create({
    data: {
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      participants: {
        create: data.participantIds.map((userId) => ({ userId })),
      },
    },
  });

  const participants = await prisma.user.findMany({
    where: { id: { in: data.participantIds } },
    select: { id: true, managerId: true, role: true },
  });

  const roles = Array.from(new Set(participants.map((u) => u.role)));
  const mappings = await prisma.roleMapping.findMany({
    where: { role: { in: roles } },
    select: { role: true, level: true, category: true },
  });
  const mapByRole = Object.fromEntries(
    mappings.map((m) => [m.role, { level: m.level, category: m.category }])
  );

  const questionnaires = await prisma.questionnaire.findMany({
    where: { id: { in: data.questionnaireIds } },
    select: { id: true, type: true, level: true, category: true },
  });

  const assignments: {
    questionnaireId: string;
    assigneeId: string;
    revieweeId: string;
  }[] = [];

  for (const q of questionnaires) {
    for (const u of participants) {
      const rm = mapByRole[u.role];
      if (!rm) continue;
      if (rm.level !== q.level || rm.category !== q.category) continue;

      const mgr = u.managerId;
      switch (q.type as QuestionnaireTypes) {
        case "Self":
          assignments.push({
            questionnaireId: q.id,
            assigneeId: u.id,
            revieweeId: u.id,
          });
          break;

        case "Manager":
          if (mgr) {
            assignments.push({
              questionnaireId: q.id,
              assigneeId: mgr,
              revieweeId: u.id,
            });
          }
          break;

        case "Upwards":
          if (mgr) {
            assignments.push({
              questionnaireId: q.id,
              assigneeId: u.id,
              revieweeId: mgr,
            });
          }
          break;

        case "Peer":
          if (mgr) {
            participants
              .filter((p2) => p2.id !== u.id && p2.managerId === mgr)
              .forEach((peer) => {
                assignments.push({
                  questionnaireId: q.id,
                  assigneeId: u.id,
                  revieweeId: peer.id,
                });
              });
          }
          break;
      }
    }
  }
  await prisma.cycleQuestionnaireAssignment.createMany({
    data: assignments.map((a) => ({
      cycleId: cycle.id,
      questionnaireId: a.questionnaireId,
      assigneeId: a.assigneeId,
      revieweeId: a.revieweeId,
    })),
    skipDuplicates: true,
  });

  return {
    id: cycle.id,
    name: cycle.name,
    startDate: cycle.startDate.toISOString(),
    endDate: cycle.endDate.toISOString(),
  };
}
