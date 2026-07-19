import type { ReactNode } from "react";
import { RiskPlatformShell } from "@/components/risk-platform";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <RiskPlatformShell>{children}</RiskPlatformShell>;
}
