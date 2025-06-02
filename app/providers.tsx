"use client";

import type React from "react";
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { PersistenceProvider } from "@/lib/persistence";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <Provider store={store}>
          <PersistenceProvider>{children}</PersistenceProvider>
        </Provider>
      </AuthProvider>
    </ThemeProvider>
  );
}
