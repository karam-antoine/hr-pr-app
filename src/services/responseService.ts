import { prisma } from "@/lib/prisma";
import type {
  SaveResponsesRequestDTO,
  SaveResponsesResponseDTO,
} from "@/types/response";
import { toResponseSetDTO } from "@/mappers/responseMapper";

export async function saveOrUpdateResponseSet(
  input: SaveResponsesRequestDTO
): Promise<SaveResponsesResponseDTO> {
  const { assignmentId, status, answers, objectives } = input;

  const assignment = await prisma.cycleQuestionnaireAssignment.findUnique({
    where: { id: assignmentId },
    include: { responseSet: true },
  });
  if (!assignment) {
    throw new Error("Assignment not found");
  }

  let responseSetRecord = assignment.responseSet;
  if (!responseSetRecord) {
    responseSetRecord = await prisma.responseSet.create({
      data: {
        assignment: { connect: { id: assignmentId } },
        status,
      },
    });
  } else {
    responseSetRecord = await prisma.responseSet.update({
      where: { assignmentId: assignment.id },
      data: {
        status,
        submittedAt: status === "SUBMITTED" ? new Date() : undefined,
      },
    });
  }

  await prisma.answer.deleteMany({
    where: { responseSetId: responseSetRecord.id },
  });
  await prisma.responseObjective.deleteMany({
    where: { responseSetId: responseSetRecord.id },
  });
  await prisma.kPI.deleteMany({
    where: { objective: { responseSetId: responseSetRecord.id } },
  });


  if (Array.isArray(answers) && answers.length > 0) {
    await prisma.answer.createMany({
      data: answers.map((ans) => ({
        responseSetId: responseSetRecord.id,
        sectionQuestionId: ans.sectionQuestionId,
        ratingValue: ans.ratingValue,
        textValue: ans.textValue,
      })),
    });
  }

  for (const obj of objectives) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const objRecord = await prisma.responseObjective.create({
      data: {
        responseSet: { connect: { id: responseSetRecord.id } },
        objectiveIndex: obj.objectiveIndex,
        description: obj.description,
        // We link KPIs to this new objective:
        kpis: {
          create: obj.kpis.map((k) => ({
            text: k.text,
            status: k.status,
          })),
        },
      },
      include: { kpis: true }, // so we can map them later if needed
    });
    // Note: we don’t need to do anything else here, just creating implicitly.
  }

  const full = await prisma.responseSet.findUnique({
    where: { id: responseSetRecord.id },
    include: {
      answers: true,
      responseObjectives: {
        include: { kpis: true },
      },
    },
  });

  if (!full) {
    throw new Error("Failed to fetch ResponseSet after saving");
  }

  // 7) Convert to DTO and return
  return toResponseSetDTO(full);
}
