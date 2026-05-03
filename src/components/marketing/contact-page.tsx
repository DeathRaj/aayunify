"use client";

import { useState } from "react";
import { toast } from "sonner";
import { brand } from "@/lib/brand";
import { WhatsAppButton } from "@/components/cta/whatsapp-button";
import Link from "next/link";

export function ContactPageClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (!message.trim()) {
      toast.error("Compose a luminous note for our care desk?");
      return;
    }
    toast.success("Transmission logged locally", {
      description: "Wire Firebase Functions + transactional email later.",
    });
    setMessage("");
    setEmail("");
    setName("");
  }

  return (
    <div className="mx-auto mt-28 mb-40 max-w-6xl px-6">
      <div className="max-w-3xl space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Concierge constellation</p>
        <h1 className="font-display text-5xl sm:text-[3.7rem]">We answer warmly · WhatsApp-fast</h1>
        <p className="text-lg leading-relaxed text-botanical-600">
          Ritual dosing questions, COD orchestration, partner procurement — escalate through WhatsApp.
          Email anchors formal partnerships.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_minmax(0,0.92fr)]">
        <aside className="space-y-6 rounded-[40px] border border-botanical-100 bg-botanical-800 px-8 py-10 text-white shadow-soft">
          <header>
            <p className="text-xs uppercase tracking-[0.45em] text-gold-deep">WhatsApp ceremonial line</p>
            <p className="mt-4 font-display text-3xl">Instant clarity · logistics · gifting</p>
          </header>

          <WhatsAppButton />

          <div className="space-y-2 text-sm uppercase tracking-[0.18em] text-white/85">
            <p>Email concierge</p>
            <a href={`mailto:${brand.contactEmail}`} className="text-lg normal-case lowercase text-white underline-offset-[7px]">
              {brand.contactEmail}
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 text-xs uppercase tracking-[0.38em] text-white/85">
            <Link href={brand.socials.instagram} className="hover:text-white" target="_blank" rel="noreferrer noopener">
              Instagram
            </Link>
            <Link href={brand.socials.youtube} className="hover:text-white" target="_blank" rel="noreferrer noopener">
              Youtube
            </Link>
            <Link href={brand.socials.facebook} className="hover:text-white" target="_blank" rel="noreferrer noopener">
              Facebook
            </Link>
          </div>

          <p className="text-sm leading-snug text-white/70">
            For wholesale & clinic partnerships attach your GST docs + intent note — our merchant desk delights in aligned collaborations.
          </p>
        </aside>

        <form className="space-y-6 rounded-[40px] border border-botanical-100 bg-white/95 px-8 py-10 shadow-soft backdrop-blur" onSubmit={handleSubmit}>
          <fieldset className="space-y-6">
            <legend className="sr-only">Contact constellation</legend>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.42em] text-botanical-500">Name*</span>
              <input required className="w-full rounded-full border border-botanical-200 px-8 py-[0.8rem]" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.42em] text-botanical-500">Email</span>
              <input type="email" className="w-full rounded-full border border-botanical-200 px-8 py-[0.8rem]" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="space-y-2">
              <span className="text-xs uppercase tracking-[0.42em] text-botanical-500">Message*</span>
              <textarea rows={6} className="w-full rounded-[32px] border border-botanical-200 px-8 py-[0.9rem]" value={message} onChange={(e) => setMessage(e.target.value)} />
            </label>
          </fieldset>
          <button type="submit" className="w-full rounded-full bg-botanical-800 px-8 py-[0.93rem] text-xs uppercase tracking-[0.43em] text-cream hover:bg-botanical-700 transition">
            Send luminous note · email pipeline soon
          </button>
        </form>
      </div>
    </div>
  );
}
