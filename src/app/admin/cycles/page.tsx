import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';

import { listCycles } from '@/services/cycleService';

import CyclesList from '@/components/CyclesList/CyclesList';
import { prisma } from '@/lib/prisma';

export default async function AdminCyclesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.isSystemAdmin) {
    return redirect('/api/auth/signin');
  }

  const cycles = await listCycles();
  const [users, questionnaires] = await Promise.all([
    prisma.user.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    }),
    prisma.questionnaire.findMany({
      orderBy: [{ level: 'asc' }, { category: 'asc' }, { type: 'asc' }],
      select: {
        id: true,
        name: true,
        level: true,
        category: true,
        type: true,
        isActive: true,
      },
    }),
  ]);
  return (
    <CyclesList cycles={cycles} users={users} questionnaires={questionnaires} />
  );
}
