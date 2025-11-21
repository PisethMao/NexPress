"use client";

import React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps & {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="nexpress-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
