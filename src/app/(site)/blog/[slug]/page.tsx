import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPlaceholders } from "@/data/content";

type PageProps = { params: { slug: string } };

export function generateStaticParams() {
  return blogPlaceholders.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = blogPlaceholders.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPlaceholderPage({ params }: PageProps) {
  const post = blogPlaceholders.find((entry) => entry.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-32 pt-28">
      <p className="text-xs uppercase tracking-[0.38em] text-botanical-500">{post.tag}</p>
      <h1 className="mt-4 font-display text-5xl">{post.title}</h1>

      <p className="mt-10 rounded-[34px] border border-gold/40 bg-parchment px-8 py-6 text-botanical-800">
        This article is staged for CMS ingestion — scaffold your preferred headless editorial stack later.
      </p>

      <div className="mt-12 space-y-6 text-botanical-700 leading-relaxed">
        <p>{post.excerpt}</p>

        <h2 className="font-display text-2xl text-botanical-900">Rituals at a glance</h2>
        <ul className="list-disc space-y-2 pl-8">
          <li>Evidence-forward botanical synopsis</li>
          <li>Micro-ritual stacking patterns</li>
          <li>Integration with movement + fibre-forward meals</li>
        </ul>
      </div>

      <div className="mt-16 flex flex-wrap gap-6">
        <Link href="/blog" className="text-xs uppercase tracking-[0.35em] text-gold-deep">
          ← Editorial index
        </Link>
        <Link href="/shop" className="text-xs uppercase tracking-[0.35em] text-botanical-800">
          Shop SKU →
        </Link>
      </div>
    </article>
  );
}
