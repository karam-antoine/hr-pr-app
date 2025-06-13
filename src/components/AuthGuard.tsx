'use client';

import { signIn, useSession } from 'next-auth/react';
import { Fragment, ReactNode, useEffect } from 'react';
import Loader from '@/components/Loader/Loader';

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('azure-ad');
    }
  }, [status]);

  if (status === 'loading' || status === 'unauthenticated') {
    console.log('status', status);
    return <Loader />;
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};
export default AuthGuard;
