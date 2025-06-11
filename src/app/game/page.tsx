'use client'

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Loading from './(components)/Loading';

const GameClient = dynamic(() => import('./(components)/GameClient'), {
  ssr: false,
  loading: () => <Loading />
});

export default function GamePage() {
  return (
    <Suspense fallback={<Loading />}>
      <GameClient />
    </Suspense>
  );
}
