import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import { listCycles } from "@/services/cycleService";

import CyclesList from "@/components/CyclesList/CyclesList";

export default async function AdminCyclesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.isSystemAdmin) {
    return redirect("/api/auth/signin");
  }

  const cycles = await listCycles();

  return <CyclesList cycles={cycles} />;
}
