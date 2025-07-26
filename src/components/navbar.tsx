import ThemeSwitcher from "./theme-switcher";
import LanguageSwitcher from "./language-switcher";
import Image from 'next/image';

export default function Navbar() 
{
    return (
        <div className="flex w-full z-10 justify-between items-center p-2 border">
            
                <Image className="relative"
                    src="/logo.png"
                    alt="elacet"
                    width={100}
                    height={10}
                />
            <div className="flex items-center justify-between gap-4">
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
        </div>
    )
}