import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  disableSystemTheme?: boolean;
};

type ThemeProviderState = {
  theme: Theme;
  themes: Theme[];
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  themes: ["dark", "light", "system"] as Theme[],
  theme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "tanstack-start-app-theme",
  disableSystemTheme = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return (window.localStorage.getItem(storageKey) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  const themes = useMemo<Theme[]>(() => {
    if (disableSystemTheme) {
      return ["dark", "light"];
    }
    return ["dark", "light", "system"];
  }, [disableSystemTheme]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system" && !disableSystemTheme) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    themes,
  };

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={value}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
