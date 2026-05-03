import type { Metadata } from "next";
import Link from "next/link";
import { blogPlaceholders } from "@/data/content";

export const metadata: Metadata = {
  title: "Ayurvedic journal placeholder",
  description: "Upcoming editorial on Moringa & Apple Cider Vinegar for wellness rituals.",
};

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-28">
      <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Editorial grove</p>
      <h1 className="mt-4 font-display text-5xl leading-tight sm:text-[3.6rem]">
        Ayurvedic journal · stories launching soon
      </h1>
      <p className="mt-8 max-w-2xl leading-relaxed text-botanical-600">
        We’re crafting luminous long-form dossiers marrying botanical science poetry with ceremonial photography.
        Subscribe on the homepage to get early drops.
      </p>

      <ul className="mt-14 space-y-8">
        {blogPlaceholders.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-[32px] border border-botanical-100 bg-white px-10 py-10 shadow-soft transition hover:border-botanical-200"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-botanical-500">{post.tag}</p>
              <h2 className="mt-4 font-display text-3xl">{post.title}</h2>
              <p className="mt-6 text-botanical-600">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
