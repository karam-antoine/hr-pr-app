import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

import CycleForm from "@/components/CycleForm/CycleForm";

export default async function NewCyclePage() {
  const session = await getServerSession(authOptions);
  if (!session?.isSystemAdmin) {
    return redirect("/api/auth/signin");
  }

  const [users, questionnaires] = await Promise.all([
    prisma.user.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    }),
    prisma.questionnaire.findMany({
      orderBy: [{ level: "asc" }, { category: "asc" }, { type: "asc" }],
      select: { id: true, name: true, level: true, category: true, type: true },
    }),
  ]);

  return <CycleForm users={users} questionnaires={questionnaires} />;
}
