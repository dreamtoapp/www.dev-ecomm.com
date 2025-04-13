"use client";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import { UI_TEXT } from "../app/(e-comm)/checkout/helpers/uiText";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before accessing client-side APIs
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoized theme toggle handler
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  // Avoid rendering theme toggle until mounted
  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";
  return (
    <div>
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 w-full mt-2"
      >
        {/* Render both icons initially to avoid hydration mismatch */}
        <Sun size={16} className={`${isDark ? "hidden" : "text-primary"}`} />
        <Moon size={16} className={`${isDark ? "text-primary" : "hidden"}`} />
        {/* <span className="mr-2">
            {isDark
              ? UI_TEXT.footer.toggleTheme.light
              : UI_TEXT.footer.toggleTheme.dark}
          </span> */}
      </button>
    </div>
  );
}

export default ThemeToggle;
