import type { ReactNode } from "react";

import PublicLayoutClient from "./PublicLayoutClient";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return <PublicLayoutClient>{children}</PublicLayoutClient>;
}
