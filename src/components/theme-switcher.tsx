"use client"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { MoonStar, Sun } from "lucide-react"

export default function ThemeSwitcher() 
{
    const { theme, setTheme } = useTheme()

    return (
        <div className="flex gap-1">
            <Button variant={theme === "light" ? "outline" : "ghost"} size="icon" className="size-8"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <Sun className="absolute h-10 w-10 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
                <MoonStar className="absolute h-10 w-10 rotate-90 scale-0 dark:-rotate-0 dark:scale-100" />
            </Button>
        </div>
    )
}