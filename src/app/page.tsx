import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  return <main>Welcome, {session.user!.name}!</main>;
}
