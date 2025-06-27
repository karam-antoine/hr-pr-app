import { prisma } from '@/lib/prisma';
import type {
  AssignmentDTO,
  CycleDTO,
  PastAssignmentDTO,
} from '@/types/assignment';

export async function getDashboardDataByEmail(email: string): Promise<{
  active: { cycle: CycleDTO; assignments: AssignmentDTO[] }[];
  past: PastAssignmentDTO[];
}> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error(`User not found: ${email}`);

  const now = new Date();

  const activeRaw = await prisma.cycle.findMany({
    where: {
      startDate: { lte: now },
      endDate: { gte: now },
      participants: { some: { userId: user.id } },
    },
    include: {
      assignments: {
        where: { assigneeId: user.id },
        include: {
          reviewee: true,
          responseSet: { include: { answers: true } },
        },
      },
    },
    orderBy: { startDate: 'asc' },
  });

  const active = activeRaw.map((c) => {
    const cycle: CycleDTO = {
      id: c.id,
      name: c.name,
      startDate: c.startDate.toISOString(),
      endDate: c.endDate.toISOString(),
    };
    const assignments: AssignmentDTO[] = c.assignments.map((a) => {
      const status = a.responseSet ? a.responseSet.status : ('DUE' as const);
      const ratings =
        a.responseSet?.answers
          .map((ans) => ans.ratingValue)
          .filter((v): v is number => typeof v === 'number') ?? [];
      const rating =
        ratings.length > 0
          ? Math.round(ratings.reduce((s, x) => s + x, 0) / ratings.length)
          : null;
      return {
        id: a.id,
        revieweeName: a.reviewee.name,
        dueDate: cycle.endDate,
        status,
        rating,
        questionnaireId: a.questionnaireId,
      };
    });
    return { cycle, assignments };
  });

  const pastRaw = await prisma.cycleQuestionnaireAssignment.findMany({
    where: {
      assigneeId: user.id,
      cycle: { endDate: { lt: now } },
    },
    include: {
      cycle: true,
      reviewee: true,
      responseSet: { include: { answers: true } },
    },
  });

  const past: PastAssignmentDTO[] = pastRaw.map((a) => {
    const status = a.responseSet ? a.responseSet.status : ('DUE' as const);
    const ratings =
      a.responseSet?.answers
        .map((ans) => ans.ratingValue)
        .filter((v): v is number => typeof v === 'number') ?? [];
    const rating =
      ratings.length > 0
        ? Math.round(ratings.reduce((s, x) => s + x, 0) / ratings.length)
        : null;
    return {
      id: a.id,
      revieweeName: a.reviewee.name,
      cycleName: a.cycle.name,
      dueDate: a.cycle.endDate.toISOString(),
      questionnaireId: a.questionnaireId,
      status,
      rating,
    };
  });

  return { active, past };
}
