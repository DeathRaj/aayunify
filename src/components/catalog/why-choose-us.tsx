import Image from "next/image";
import { whyChooseUs } from "@/data/content";

export function WhyChooseUs() {
  return (
    <section className="relative mt-32 overflow-hidden rounded-[40px] border border-botanical-100 bg-gradient-to-br from-botanical-800 via-botanical-700 to-botanical-600 px-6 py-20 text-cream lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/raw-ingredient.png"
          alt="Raw Ayurvedic Ingredients"
          fill
          className="object-cover opacity-20"
          loading="lazy"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-botanical-900/70 via-botanical-800/92 to-botanical-700/94" aria-hidden />
      </div>

      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.43em] text-gold-deep/95">
            Why choose us
          </p>
          <h2 className="mt-4 font-display text-4xl sm:text-[2.9rem]">
            Purpose-built formulations for conscientious Ayurveda lovers
          </h2>
          <p className="mt-10 text-white/82 leading-relaxed max-w-xl text-base">
            We obsess over botanical sourcing transparency, potency stability, taste architecture, and packaging
            ergonomics — so your wellness ritual mirrors the calibre of artisan perfumery, not dusty supplement aisles.
          </p>
        </div>
        <ul className="mt-14 grid gap-7 text-sm lg:mt-0">
          {whyChooseUs.map((item, index) => (
            <li
              key={item.title}
              className="flex gap-8 rounded-[32px] border border-white/20 bg-white/8 px-7 py-6 backdrop-blur-2xl"
            >
              <span className="text-5xl lg:text-[3rem]">{index === 0 ? "🜁" : index === 1 ? "🌿" : index === 2 ? "⚖️" : "🧾"}</span>
              <div>
                <p className="text-lg font-semibold tracking-tight">{item.title}</p>
                <p className="mt-3 leading-relaxed text-white/74">{item.copy}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
