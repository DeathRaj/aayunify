import Link from "next/link";
import { blogPlaceholders } from "@/data/content";

export function JournalPreviewSection() {
  return (
    <section className="mx-auto mb-36 max-w-7xl px-6">
      <div className="flex flex-wrap items-start justify-between gap-8 mb-14">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-botanical-500">Ayurvedic journal</p>
          <h2 className="mt-3 font-display text-4xl">Story-driven education for curious metabolisms</h2>
        </div>
        <Link href="/blog" className="text-sm uppercase tracking-[0.39em] text-gold-deep">
          View writings →
        </Link>
      </div>

      <div className="grid gap-11 md:grid-cols-2">
        {blogPlaceholders.map((post, index) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between rounded-[32px] border border-botanical-100 bg-white/92 px-10 py-10 shadow-soft backdrop-blur"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-botanical-500">{post.tag}</span>
            <Link href={`/blog/${post.slug}`} className="mt-8 inline-block font-display text-3xl text-botanical-900">
              {post.title}
            </Link>
            <p className="mt-10 text-botanical-600 leading-relaxed">{post.excerpt}</p>

            <div className="mt-14 flex justify-between gap-10 text-[11px] uppercase tracking-[0.24em] text-botanical-500">
              <span>Story {index + 1}/{blogPlaceholders.length}</span>
              <span>
                Coming soon · <strong className="text-botanical-800">Medium edition</strong>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
