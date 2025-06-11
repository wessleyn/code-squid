'use client'

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Loading from './(components)/Loading';

const GameClient = dynamic(() => import('./(components)/GameClient'), { 
  ssr: false,
  loading: () => <Loading />
});

export default function GamePage() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate additional loading time for game resources
  useEffect(() => {
      setIsLoading(false);
  }, []);
  
  return isLoading ? <Loading /> : <GameClient />;
}
