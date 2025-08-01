import { useCallback, useEffect, useState } from "react";
import type { VariantProps } from "class-variance-authority";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { type Theme, useTheme } from "@/providers/theme-provider";
import { cn } from "@/utils/cn";

const THEME_KEYBOARD_SHORTCUT = "m";

interface ThemeToggleProps {
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  className?: string;
}

export function ThemeToggle({ buttonVariant = "outline", className = "" }: ThemeToggleProps) {
  const { theme, themes, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const getNextTheme = (current: Theme): Theme => {
      const idx = themes.indexOf(current);
      return themes[(idx + 1) % themes.length] as Theme;
    };

    setTheme(getNextTheme(theme as Theme));
  }, [setTheme, theme, themes]);

  // theme toggle event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === THEME_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  if (!mounted) return null;

  return (
    <Button
      variant={buttonVariant}
      size="icon"
      onClick={toggleTheme}
      className={cn("size-8", className)}
    >
      {themes.map((t) => {
        if (t === "light") {
          return (
            <SunIcon
              key={t}
              className={cn(
                "absolute transition-all",
                theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
              )}
            />
          );
        }
        if (t === "dark") {
          return (
            <MoonIcon
              key={t}
              className={cn(
                "absolute transition-all",
                theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
              )}
            />
          );
        }
        if (t === "system") {
          return (
            <LaptopIcon
              key={t}
              className={cn(
                "absolute transition-all",
                theme === "system" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
              )}
            />
          );
        }
        return null;
      })}
      <span className="sr-only absolute">Toggle Theme</span>
    </Button>
  );
}
