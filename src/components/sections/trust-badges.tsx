const badges = [
  { icon: "🌿", label: "Cold-chain aware packaging" },
  { icon: "🧪", label: "Batch lab certification" },
  { icon: "♻️", label: "Recyclable primary cartons" },
  { icon: "🤝", label: "Carbon-conscious logistics " },
];

export function TrustBadgeStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${
        tone === "dark"
          ? "text-cream bg-botanical-800/95 border border-botanical-600/70"
          : "text-botanical-800 bg-white/90 border-botanical-100"
      } rounded-3xl border px-6 py-6`}
    >
      {badges.map((badge) => (
        <div key={badge.label} className="flex items-center gap-3 text-sm">
          <span className="text-2xl" aria-hidden>
            {badge.icon}
          </span>
          <p className="leading-snug font-medium">{badge.label}</p>
        </div>
      ))}
    </div>
  );
}
