"use client";

import { memo, ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = memo(function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
});
