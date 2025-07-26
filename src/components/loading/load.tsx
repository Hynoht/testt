'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';

export default function Load() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/win');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <Loader2Icon className="w-16 h-16 animate-spin text-blue-500 mb-6" />
      <h1 className="text-2xl font-semibold">Traitement en cours...</h1>
      <p className="text-sm text-gray-500 mt-2"> Cette opération peut prendre quelques instants selon l&apos;image </p>
    </div>
  );
}
