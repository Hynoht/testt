'use client';

import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";

export default function Commencer() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/form');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 space-y-12 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight" role="heading" aria-level="1">
          Bonjour, on vous aide à faire vos{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            lacets
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 font-medium max-w-lg mx-auto">
          Découvrez notre guide interactif pour maîtriser l&apos;art du laçage
        </p>
      </div>

      <Button
        className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none"
        onClick={handleClick}
        aria-label="Commencer à remplir le formulaire"
      >
        Commencer maintenant
      </Button>
    </div>
  );
}
