"use client";

import type { ReactNode } from "react";

import { SelectedDateProvider } from "@/entities/Issue/model/SelectedDateContext";
import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import { Nav } from "@/widgets/Nav";

type PublicLayoutClientProps = {
  children: ReactNode;
};

export default function PublicLayoutClient({
  children,
}: PublicLayoutClientProps) {
  return (
    <SelectedDateProvider>
      <div>
        <Header />
        <Nav />
        <main>{children}</main>
        <Footer />
      </div>
    </SelectedDateProvider>
  );
}
