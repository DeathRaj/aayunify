"use client";

import { buildWhatsAppContactUrl } from "@/lib/whatsapp";

export function WhatsAppButton({
  label,
  ariaLabel,
  className,
  prefill,
  variant = "solid",
}: {
  label?: string;
  ariaLabel?: string;
  className?: string;
  prefill?: string;
  variant?: "solid" | "outline";
}) {
  const base =
    variant === "solid"
      ? "rounded-full bg-[#107C10] hover:bg-[#0d6610]"
      : "rounded-full border border-[#107C10] hover:bg-botanical-50";
  const text = variant === "solid" ? "text-white" : "text-botanical-800";

  return (
    <a
      aria-label={ariaLabel ?? label}
      href={buildWhatsAppContactUrl(prefill)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-11 py-[0.9rem] text-xs uppercase tracking-[0.26em] font-semibold transition shadow-sm shadow-botanical-900/10 ${base} ${text} ${className ?? ""}`}
    >
      💬 
      <span>{label ?? "WhatsApp"}</span>
    </a>
  );
}
