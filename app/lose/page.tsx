import LottieAnimation from "@/src/components/LottieAnimation";
import { Button } from "@/src/components/ui/button";
import { XCircle, Home } from "lucide-react";
import Link from "next/link";
import animationData from '../../public/sad_emotion.json'; // Ton animation JSON téléchargée

export default function Lose() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Dommage !
          </h1>
          <p className="text-gray-600">
            Vos lacets ne sont pas défaits. Nous ne pouvons pas vous aider dans ce cas.
          </p>
        </div>
            <LottieAnimation
                animationData={animationData}
                size={400}  // Taille de l'animation (400px)
                loop={true} // Animation en boucle
                autoplay={true} // Démarre automatiquement
                speed={1.5} // Animation plus rapide
                controls={false} // Pas de contrôles
            />
        <div className="space-y-4">
          
          <Link href="/accueil">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Retour à l&apos;accueil</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}