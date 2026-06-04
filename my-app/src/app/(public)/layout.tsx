import type { ReactNode } from "react";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { Nav } from "@/widgets/Nav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
