"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { resetCollection, saveCollection, type AdminResult } from "@/app/actions/admin";
import { collections, type FieldDef } from "@/lib/admin-schema";
import type { ManagedContent } from "@/content/types";
import { FormAlert } from "@/components/forms/Field";
import { Icon } from "@/components/ui/Icon";

type Item = Record<string, unknown>;

function FieldInput({ field, value, onChange, idPrefix }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void; idPrefix: string }) {
  const id = `${idPrefix}-${field.key}`;
  const label = (
    <label htmlFor={id}>
      {field.label} {!field.required && field.type !== "boolean" && <span className="optional">(optional)</span>}
    </label>
  );
  const hint = field.hint ? <p className="field-hint">{field.hint}</p> : null;

  switch (field.type) {
    case "boolean":
      return (
        <label className="checkbox" style={{ alignSelf: "end", paddingBottom: 12 }}>
          <input id={id} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
          <span>{field.label}</span>
        </label>
      );
    case "textarea":
      return (
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          {label}
          <textarea id={id} className="textarea" rows={3} style={{ minHeight: 90 }} maxLength={field.max} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
          {hint}
        </div>
      );
    case "list":
      return (
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          {label}
          <textarea
            id={id}
            className="textarea"
            rows={5}
            style={{ minHeight: 110 }}
            value={Array.isArray(value) ? value.join("\n") : String(value ?? "")}
            onChange={(e) => onChange(e.target.value.split("\n"))}
          />
          {hint}
        </div>
      );
    case "select":
      return (
        <div className="field">
          {label}
          <select id={id} className="select" value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {hint}
        </div>
      );
    case "number":
      return (
        <div className="field">
          {label}
          <input
            id={id}
            type="number"
            min={0}
            step="0.01"
            inputMode="decimal"
            className="input"
            value={value == null ? "" : String(value)}
            onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)}
          />
          {hint}
        </div>
      );
    default:
      return (
        <div className="field">
          {label}
          <input id={id} className="input" maxLength={field.max} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />
          {hint}
        </div>
      );
  }
}

export function CollectionEditor({ collectionKey, initial }: { collectionKey: keyof ManagedContent; initial: Item[] }) {
  const def = collections[collectionKey];
  const router = useRouter();
  const [items, setItems] = useState<Item[]>(initial);
  const [dirty, setDirty] = useState(false);
  const [result, setResult] = useState<AdminResult | null>(null);
  const [pending, startTransition] = useTransition();

  const update = (next: Item[]) => {
    setItems(next);
    setDirty(true);
    setResult(null);
  };
  const setField = (i: number, key: string, v: unknown) => update(items.map((it, idx) => (idx === i ? { ...it, [key]: v } : it)));
  const move = (i: number, dir: -1 | 1) => {
    const next = [...items];
    [next[i], next[i + dir]] = [next[i + dir], next[i]];
    update(next);
  };

  const save = () =>
    startTransition(async () => {
      const res = await saveCollection(collectionKey, JSON.stringify(items));
      setResult(res);
      if (res.ok) {
        setDirty(false);
        router.refresh();
      }
    });

  const reset = () => {
    if (!confirm(`Restore the default ${def.title.toLowerCase()}? Your saved changes will be discarded.`)) return;
    startTransition(async () => {
      const res = await resetCollection(collectionKey);
      setResult(res);
      if (res.ok) window.location.reload(); // re-load the default items into the editor
    });
  };

  return (
    <div>
      {items.map((item, i) => (
        <section key={i} className="editor-item" aria-label={`${def.itemLabel} ${i + 1}`}>
          <div className="editor-item__head">
            <span>
              {i + 1}. {String(item[def.titleField] || `New ${def.itemLabel}`)}
            </span>
            <div className="editor-item__actions">
              <button type="button" className="icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                <Icon name="chevronDown" size={16} style={{ transform: "rotate(180deg)" }} />
              </button>
              <button type="button" className="icon-btn" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">
                <Icon name="chevronDown" size={16} />
              </button>
              <button
                type="button"
                className="icon-btn icon-btn--danger"
                aria-label={`Remove ${def.itemLabel}`}
                onClick={() => confirm(`Remove this ${def.itemLabel}?`) && update(items.filter((_, idx) => idx !== i))}
              >
                <Icon name="x" size={16} />
              </button>
            </div>
          </div>
          <div className="form-row">
            {def.fields.map((f) => (
              <FieldInput key={f.key} field={f} value={item[f.key]} onChange={(v) => setField(i, f.key, v)} idPrefix={`${collectionKey}-${i}`} />
            ))}
          </div>
        </section>
      ))}

      <button type="button" className="btn btn--secondary mt-4" onClick={() => update([...items, def.blank()])}>
        <Icon name="plus" size={16} /> Add {def.itemLabel}
      </button>

      <div className="sticky-actions">
        <div style={{ flex: 1, minWidth: 220 }} aria-live="polite">
          {result ? <FormAlert ok={result.ok} message={result.message} /> : <span className="subtle">{dirty ? "You have unsaved changes." : "All changes saved."}</span>}
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn--ghost" onClick={reset} disabled={pending}>
            Restore defaults
          </button>
          <button type="button" className="btn btn--primary" onClick={save} disabled={pending || !dirty}>
            {pending ? <span className="spinner" aria-hidden="true" /> : <Icon name="check" size={16} />}
            Save &amp; publish
          </button>
        </div>
      </div>
    </div>
  );
}
