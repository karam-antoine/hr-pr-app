import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import type { QuestionnaireDTO } from '@/types/questionnaire';
import { getQuestionnaireById } from '@/services/questionnaireService';
import QuestionnaireClient from '@/components/Questionnaire/Questionnaire';

export default async function QuestionnairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return redirect('/api/auth/signin');
  }

  const questionnaire: QuestionnaireDTO = await getQuestionnaireById(id);
  return <QuestionnaireClient questionnaire={questionnaire} />;
}
