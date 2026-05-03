"use client";

import { Toaster } from "sonner";

export function ToasterProvider() {
  return (
    <Toaster
      toastOptions={{
        className:
          "!border !border-botanical-900/15 !rounded-2xl !bg-[#fffdf9] !text-botanical-900 !shadow-soft",
      }}
      position="bottom-right"
      duration={3400}
    />
  );
}
