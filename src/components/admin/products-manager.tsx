"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { ProductDoc } from "@/types";
import {
  subscribeProducts,
  upsertProduct,
  deleteProduct,
  seedDefaultCatalog,
} from "@/lib/repository/products";
import { isFirebaseConfigured } from "@/lib/firebase";

const emptyDraft: Omit<ProductDoc, "id"> = {
  slug: "",
  name: "",
  price: 0,
  compareAtPrice: undefined,
  category: "Powders",
  shortDescription: "",
  description: "",
  benefits: ["", "", "", ""],
  ingredients: "",
  usage: "",
  images: [],
  badges: [],
  inventory: 0,
  sku: "",
};

export function ProductsManager({ seedDocs }: { seedDocs: ProductDoc[] }) {
  const [items, setItems] = useState<ProductDoc[]>(seedDocs);
  const [busy, setBusy] = useState(false);
  const [draftId, setDraftId] = useState<string>("");
  const [draft, setDraft] = useState<Omit<ProductDoc, "id">>(emptyDraft);

  useEffect(() => {
    if (!isFirebaseConfigured()) return undefined;
    try {
      const unsub = subscribeProducts((latest) => {
        if (!latest.length) {
          setItems(seedDocs);
          return;
        }
        setItems(latest);
      });
      return () => unsub();
    } catch {
      setItems(seedDocs);
      return undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function hydrateForm(product?: ProductDoc) {
    if (!product) {
      setDraftId("");
      setDraft(emptyDraft);
      return;
    }
    setDraftId(product.id);
    const { id: _productFirestoreId, ...rest } = product;
    void _productFirestoreId;
    setDraft({ ...rest, benefits: [...rest.benefits, "", "", "", ""].slice(0, 4) });
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    setBusy(true);
    try {
      const payload = [
        draft.benefits[0]?.trim(),
        draft.benefits[1]?.trim(),
        draft.benefits[2]?.trim(),
        draft.benefits[3]?.trim(),
      ].filter(Boolean) as ProductDoc["benefits"];

      const images = draft.images
        .map((img) => img.trim())
        .filter(Boolean);

      const body: Parameters<typeof upsertProduct>[0] = {
        id: draftId || undefined,
        ...draft,
        benefits: payload,
        badges: draft.badges,
        sku: draft.sku?.trim() || undefined,
        compareAtPrice: draft.compareAtPrice || undefined,
        images: images.length ? images : ["/images/moringa-powder-1.jpg"],
      };

      await upsertProduct(body);
      hydrateForm(undefined);
      toast.success("SKU archived into Firestore");
    } catch (error) {
      console.error(error);
      toast.error("Could not persist SKU.");
    } finally {
      setBusy(false);
    }
  }

  async function handleSeed() {
    try {
      const additions = await seedDefaultCatalog();
      toast.success(
        additions ? `Synced ${additions} new SKU(s)` : "Catalog already includes seed SKUs.",
      );
    } catch (error) {
      console.error(error);
      toast.error("Seed failed.");
    }
  }

  async function handleRemove(id: string, name: string) {
    if (!confirm(`Delete ${name}?`)) return;
    try {
      await deleteProduct(id);
      toast.success("SKU vaporised calmly");
      if (draftId === id) hydrateForm(undefined);
    } catch (error) {
      console.error(error);
      toast.error("Could not remove SKU.");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.06fr_minmax(0,0.92fr)]">
      <section className="rounded-[36px] border border-botanical-100 bg-white/95 backdrop-blur p-10 shadow-soft">
        <div className="flex flex-wrap gap-9 items-center justify-between">
          <h2 className="text-xs uppercase tracking-[0.48em] text-botanical-500">Inventory ledger</h2>
          <div className="flex flex-wrap gap-4">
            <button type="button" className="rounded-full border px-11 py-[0.71rem] text-[11px] uppercase tracking-[0.33em]" onClick={() => hydrateForm(undefined)}>
              New SKU
            </button>
            <button type="button" className="rounded-full bg-botanical-800 px-11 py-[0.71rem] text-[11px] uppercase tracking-[0.33em] text-cream shadow-soft" onClick={() => void handleSeed()}>
              Seed default catalog
            </button>
          </div>
        </div>
        <ul className="mt-12 space-y-5">
          {items.map((item) => (
            <li key={item.id} className="rounded-[28px] border border-botanical-100 px-7 py-[0.96rem] flex flex-wrap items-center gap-11 justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.36em] text-botanical-500">{item.slug}</div>
                <strong className="block font-display text-2xl text-botanical-900">{item.name}</strong>
                <p className="text-sm text-botanical-600">{item.inventory} units ceremonialised</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button type="button" className="rounded-full px-11 py-[0.69rem] text-[11px] uppercase tracking-[0.33em]" onClick={() => hydrateForm(item)}>
                  Edit SKU
                </button>
                <button type="button" className="rounded-full px-11 py-[0.69rem] text-[11px] uppercase tracking-[0.33em] text-gold-deep" onClick={() => void handleRemove(item.id, item.name)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[36px] border border-botanical-100 bg-white p-12 shadow-soft">
        <h2 className="text-xs uppercase tracking-[0.48em] text-botanical-500 mb-10">
          {draftId ? "Ceremonially editing " + draft.slug : "New luminous SKU dossier"}
        </h2>
        <form className="grid gap-[1rem]" onSubmit={handleSubmit}>
          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Slug*</span>
            <input required className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" value={draft.slug} onChange={(e) => setDraft({ ...draft, slug: e.target.value })} placeholder="example-sku" />
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Display name*</span>
            <input required className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">SKU code</span>
            <input className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" value={draft.sku ?? ""} onChange={(e) => setDraft({ ...draft, sku: e.target.value })} placeholder="SKU-XYZ" />
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Images (comma-separated URLs)</span>
            <textarea
              rows={2}
              className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]"
              value={draft.images.join(",")}
              onChange={(e) => setDraft({ ...draft, images: e.target.value.split(",").map((s) => s.trim()) })}
            />
          </label>

          <div className="grid md:grid-cols-3 gap-[1rem]">
            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Selling price ₹*</span>
              <input required type="number" className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
            </label>

            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Compare ₹</span>
              <input type="number" className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" value={draft.compareAtPrice ?? ""} onChange={(e) => setDraft({ ...draft, compareAtPrice: e.target.value ? Number(e.target.value) : undefined })} />
            </label>

            <label className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Inventory*</span>
              <input required type="number" className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" value={draft.inventory} onChange={(e) => setDraft({ ...draft, inventory: Number(e.target.value) })} />
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Category*</span>
            <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as ProductDoc["category"] })} className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem] bg-transparent">
              <option value="Powders">Powders</option>
              <option value="Effervescents">Effervescents</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Short description*</span>
            <textarea required rows={2} value={draft.shortDescription} className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })} />
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Long lore*</span>
            <textarea required rows={4} value={draft.description} className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </label>

          <fieldset className="rounded-[34px] border border-botanical-100 px-[1.33rem] py-[1.33rem] space-y-[1.13rem]">
            <legend className="sr-only">Badges constellation</legend>
            <label className="flex items-center gap-[0.93rem] text-xs uppercase tracking-[0.33em] text-botanical-500">
              <input type="checkbox" checked={draft.badges.includes("bestseller")} onChange={() => setDraft({ ...draft, badges: toggleBadge(draft.badges, "bestseller") })} /> Bestseller
            </label>
            <label className="flex items-center gap-[0.93rem] text-xs uppercase tracking-[0.33em] text-botanical-500">
              <input type="checkbox" checked={draft.badges.includes("sale")} onChange={() => setDraft({ ...draft, badges: toggleBadge(draft.badges, "sale") })} /> Sale field
            </label>
          </fieldset>

          {draft.benefits.map((benefit, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <label key={`benefit-${index}`} className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Benefit pillar {index + 1}</span>
              <input className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" value={benefit} onChange={(evt) =>
                setDraft({
                  ...draft,
                  benefits: draft.benefits.map((benefitCandidate, iterator) => (iterator === index ? evt.target.value : benefitCandidate)),
                })}
              />
            </label>
          ))}

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Ingredients dossier*</span>
            <textarea required rows={2} value={draft.ingredients} className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" onChange={(e) => setDraft({ ...draft, ingredients: e.target.value })} />
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.33em] text-botanical-500">Usage ceremonial*</span>
            <textarea required rows={2} value={draft.usage} className="rounded-3xl border border-botanical-200 px-[1.06rem] py-[0.79rem]" onChange={(e) => setDraft({ ...draft, usage: e.target.value })} />
          </label>

          <button type="submit" disabled={busy} className="mt-8 rounded-full bg-botanical-800 px-14 py-[0.93rem] text-[11px] uppercase tracking-[0.38em] text-cream hover:bg-botanical-700 transition disabled:opacity-50">
            {busy ? "Sealing dossier..." : "Commit SKU"}
          </button>
        </form>
      </section>
    </div>
  );
}

function toggleBadge(badges: ProductDoc["badges"], needle: NonNullable<ProductDoc["badges"]>[number]) {
  if (badges.includes(needle)) return badges.filter((badge) => badge !== needle);
  return [...badges, needle];
}
