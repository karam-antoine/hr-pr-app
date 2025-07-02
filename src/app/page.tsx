import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { getDashboardDataByEmail } from '@/services/dashboardService';

import DashboardClient from '@/components/DashboardClient/DashboardClient';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  const { active, past } = await getDashboardDataByEmail(session.user.email);
  return <DashboardClient active={active} past={past} />;
}
