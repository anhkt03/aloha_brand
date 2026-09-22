"use client";

import { createContext, useContext } from "react";

interface RegisterModalApi {
  open: () => void;
  close: () => void;
}

export const RegisterModalContext = createContext<RegisterModalApi>({
  open: () => {},
  close: () => {},
});

export function useRegisterModal() {
  return useContext(RegisterModalContext);
}
