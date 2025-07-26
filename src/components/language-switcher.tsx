"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem} from "@radix-ui/react-dropdown-menu";
import { Languages } from "lucide-react"

type Language = {
    code: 'fr' | 'mg' | 'en';
    flag: string;
  };
  

  const languages: Language[] = [
    { code: 'fr', flag: '🇫🇷' },
    { code: 'mg', flag: '🇲🇬' },
    { code: 'en', flag: '🇬🇧' }
  ];

export default function LanguageSwitcher()
{
    const [activeLang, setActiveLang] = useState<'fr' | 'mg' | 'en' | null>(null);

    const getItemClass = (langCode: 'fr' | 'mg' | 'en') => {
        return `hover:bg-slate-100 hover:text-accent-foreground hover:scale-105 transition-all duration-300 ${activeLang === langCode ? 'bg-gray-50' : ''}`;
      };
    
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Languages className="size-5 w-50 hover:bg-slate-50 hover:scale-105 transition-all duration-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex mt-2 w-30 gap-2 flex-col items-center cursor-pointer">
            {languages.map(({ code, flag }) => (
              <DropdownMenuItem
                key={code}
                className={getItemClass(code)}
                onClick={() => setActiveLang(code)}
              >
                {flag}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
}