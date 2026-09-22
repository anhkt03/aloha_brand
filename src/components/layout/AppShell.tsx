"use client";

import { useState, type ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RegisterModal } from "./RegisterModal";
import { RegisterModalContext } from "./register-context";
import { BackToTop } from "./BackToTop";

/**
 * Wraps every locale page with the shared header/footer and the register
 * modal, exposing an `openRegister` callback to any descendant via
 * `useRegisterModal()`.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <RegisterModalContext.Provider value={{ open: () => setOpen(true), close: () => setOpen(false) }}>
      <Header onOpenRegister={() => setOpen(true)} />
      <main id="app">{children}</main>
      <Footer />
      <BackToTop />
      <RegisterModal open={open} onClose={() => setOpen(false)} />
    </RegisterModalContext.Provider>
  );
}
