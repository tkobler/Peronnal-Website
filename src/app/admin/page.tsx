"use client";

import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { useAdmin } from "@/context/AdminContext";
import { getTranslations, type Translations } from "@/data/translations";
import { getByPath } from "@/lib/admin/translationIndex";
import { SECTIONS, type SectionDef } from "@/components/admin/sectionConfig";
import { useSaveAndDeploy } from "@/components/admin/useSaveAndDeploy";

/* ------------------------------------------------------------------ */
/*  Helper: recursively collect leaf string paths from a sub-tree      */
/* ------------------------------------------------------------------ */

function collectLeafPaths(obj: unknown, prefix: string): string[] {
  if (typeof obj === "string") return [prefix];
  if (Array.isArray(obj)) {
    return obj.flatMap((item, i) => collectLeafPaths(item, `${prefix}.${i}`));
  }
  if (obj && typeof obj === "object") {
    return Object.entries(obj).flatMap(([key, value]) =>
      collectLeafPaths(value, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}

/* ------------------------------------------------------------------ */
/*  TranslationForm: renders key-value pairs for one locale            */
/* ------------------------------------------------------------------ */

function TranslationForm({
  locale,
  paths,
  translations,
}: {
  locale: string;
  paths: string[];
  translations: Translations;
}) {
  const { recordEdit, edits } = useAdmin();
  const localeEdits = edits[locale] ?? {};

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          textTransform: "uppercase",
          letterSpacing: 1,
          color: "#6b7280",
          marginBottom: 12,
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: 6,
        }}
      >
        {locale.toUpperCase()}
      </div>
      {paths.map((keyPath) => {
        const original = getByPath(translations, keyPath) ?? "";
        const edited = localeEdits[keyPath];
        const currentValue = edited !== undefined ? edited : original;
        const isModified = edited !== undefined && edited !== original;
        const isLong = original.length > 80;

        return (
          <div key={keyPath} style={{ marginBottom: 14 }}>
            <label
              style={{
                display: "block",
                fontSize: 11,
                fontFamily: "monospace",
                color: "#9ca3af",
                marginBottom: 3,
                wordBreak: "break-all",
              }}
            >
              {keyPath}
            </label>
            {isLong ? (
              <textarea
                value={currentValue}
                onChange={(e) => recordEdit(locale, keyPath, e.target.value)}
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical" as const,
                  borderColor: isModified ? "#f59e0b" : "#d1d5db",
                  backgroundColor: isModified ? "#fffbeb" : "#fff",
                }}
              />
            ) : (
              <input
                type="text"
                value={currentValue}
                onChange={(e) => recordEdit(locale, keyPath, e.target.value)}
                style={{
                  ...inputStyle,
                  borderColor: isModified ? "#f59e0b" : "#d1d5db",
                  backgroundColor: isModified ? "#fffbeb" : "#fff",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared input style                                                 */
/* ------------------------------------------------------------------ */

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "6px 10px",
  borderRadius: 4,
  border: "1px solid #d1d5db",
  fontSize: 13,
  fontFamily: "system-ui, sans-serif",
  color: "#111",
  boxSizing: "border-box",
};

/* ------------------------------------------------------------------ */
/*  Main Admin Page                                                    */
/* ------------------------------------------------------------------ */

export default function AdminPage() {
  const { isAdmin, githubToken, setGithubToken, editCount } = useAdmin();
  const [isLocalhost, setIsLocalhost] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [tokenInput, setTokenInput] = useState("");
  const { saving, progress, error, success, save } = useSaveAndDeploy();

  useEffect(() => {
    // Defer via rAF so the setState is not synchronous inside the effect body
    // (react-hooks/set-state-in-effect).
    const id = requestAnimationFrame(() => {
      const hostname = window.location.hostname;
      setIsLocalhost(hostname === "localhost" || hostname === "127.0.0.1");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const enTranslations = useMemo(() => getTranslations("en"), []);
  const frTranslations = useMemo(() => getTranslations("fr"), []);

  // Compute leaf paths for the active section
  const sectionDef = SECTIONS.find((s) => s.id === activeSection) as SectionDef;

  const leafPaths = useMemo(() => {
    const paths: string[] = [];
    for (const key of sectionDef.keys) {
      const subTree = (enTranslations as unknown as Record<string, unknown>)[key];
      if (subTree !== undefined) {
        paths.push(...collectLeafPaths(subTree, key));
      }
    }
    return paths;
  }, [sectionDef, enTranslations]);

  /* ---- Not localhost guard ---- */
  if (!isLocalhost) {
    return (
      <main
        id="main-content"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          background: "#0f0f1a",
        }}
      >
        <div
          style={{
            background: "#1a1a2e",
            borderRadius: 12,
            padding: 32,
            maxWidth: 480,
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: 24, marginBottom: 12 }}>Admin Panel</h1>
          <p style={{ color: "#f87171" }}>
            This page is only available on localhost during development.
          </p>
        </div>
      </main>
    );
  }

  /* ---- Main layout ---- */
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* ===== Sidebar ===== */}
      <aside
        style={{
          width: 250,
          minWidth: 250,
          background: "#1a1a2e",
          color: "#e5e7eb",
          display: "flex",
          flexDirection: "column",
          padding: "20px 0",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "0 16px 16px",
            borderBottom: "1px solid #2d2d4a",
            marginBottom: 12,
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>
            Content Editor
          </h2>
          <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4 }}>
            {isAdmin ? "Admin mode active" : "Read-only"}
          </div>
        </div>

        {/* Section buttons */}
        <nav style={{ flex: 1, padding: "0 8px" }}>
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 12px",
                marginBottom: 2,
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: activeSection === section.id ? 600 : 400,
                background:
                  activeSection === section.id ? "#2d2d4a" : "transparent",
                color:
                  activeSection === section.id ? "#fff" : "#9ca3af",
              }}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Edit count */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "1px solid #2d2d4a",
            fontSize: 12,
          }}
        >
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "#9ca3af" }}>Pending edits: </span>
            <span
              style={{
                fontWeight: 600,
                color: editCount > 0 ? "#f59e0b" : "#6b7280",
              }}
            >
              {editCount}
            </span>
          </div>

          {/* GitHub token */}
          <div style={{ marginBottom: 6 }}>
            <span style={{ color: "#9ca3af" }}>GitHub token: </span>
            <span style={{ color: githubToken ? "#4ade80" : "#f87171" }}>
              {githubToken ? "Set" : "Missing"}
            </span>
          </div>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="ghp_..."
            style={{
              width: "100%",
              padding: "4px 8px",
              borderRadius: 4,
              border: "1px solid #374151",
              background: "#0d1117",
              color: "#fff",
              fontSize: 11,
              boxSizing: "border-box",
              marginBottom: 4,
            }}
          />
          <button
            onClick={() => {
              if (tokenInput.trim()) {
                setGithubToken(tokenInput.trim());
                setTokenInput("");
              }
            }}
            style={{
              width: "100%",
              padding: "4px 8px",
              borderRadius: 4,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              fontSize: 11,
            }}
          >
            Set Token
          </button>
        </div>
      </aside>

      {/* ===== Main area ===== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
            borderBottom: "1px solid #e5e7eb",
            background: "#fafafa",
            flexShrink: 0,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 700,
                margin: 0,
                color: "#111",
              }}
            >
              {sectionDef.label}
            </h1>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              {leafPaths.length} fields
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Status messages */}
            {saving && (
              <span style={{ fontSize: 13, color: "#6b7280" }}>{progress}</span>
            )}
            {error && (
              <span style={{ fontSize: 13, color: "#ef4444", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {error}
              </span>
            )}
            {success && (
              <span style={{ fontSize: 13, color: "#16a34a", fontWeight: 600 }}>
                Saved and deployed!
              </span>
            )}

            <button
              onClick={save}
              disabled={saving || editCount === 0}
              style={{
                padding: "8px 20px",
                borderRadius: 6,
                border: "none",
                background:
                  saving || editCount === 0 ? "#9ca3af" : "#16a34a",
                color: "#fff",
                cursor:
                  saving || editCount === 0 ? "not-allowed" : "pointer",
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {saving ? "Saving..." : `Save & Deploy (${editCount})`}
            </button>
          </div>
        </header>

        {/* Form area - EN and FR side by side */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <TranslationForm
              locale="en"
              paths={leafPaths}
              translations={enTranslations}
            />
            <TranslationForm
              locale="fr"
              paths={leafPaths}
              translations={frTranslations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
