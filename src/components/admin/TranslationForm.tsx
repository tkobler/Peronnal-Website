"use client";

import { useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TranslationFormProps {
  data: unknown;
  prefix: string;
  locale: string;
  edits: Record<string, string>;
  onEdit: (keyPath: string, value: string) => void;
  originalData: unknown; // for diff comparison
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Resolve a dot-separated key path against a nested object / array. */
function resolveKeyPath(root: unknown, keyPath: string): unknown {
  const parts = keyPath.split(".");
  let current: unknown = root;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    if (Array.isArray(current)) {
      const idx = Number(part);
      if (Number.isNaN(idx)) return undefined;
      current = current[idx];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

/* ------------------------------------------------------------------ */
/*  Inline styles                                                      */
/* ------------------------------------------------------------------ */

const styles = {
  fieldWrapper: {
    marginBottom: 12,
  } as React.CSSProperties,

  label: {
    display: "block",
    fontFamily: "monospace",
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 2,
  } as React.CSSProperties,

  input: {
    width: "100%",
    padding: "6px 8px",
    fontSize: 14,
    border: "1px solid #d1d5db",
    borderRadius: 4,
    boxSizing: "border-box" as const,
  } as React.CSSProperties,

  inputEdited: {
    backgroundColor: "#fef9c3", // yellow highlight
    borderColor: "#facc15",
  } as React.CSSProperties,

  textarea: {
    width: "100%",
    padding: "6px 8px",
    fontSize: 14,
    border: "1px solid #d1d5db",
    borderRadius: 4,
    boxSizing: "border-box" as const,
    minHeight: 72,
    resize: "vertical" as const,
  } as React.CSSProperties,

  originalHint: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
    fontStyle: "italic" as const,
  } as React.CSSProperties,

  groupHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    cursor: "pointer",
    userSelect: "none" as const,
    fontWeight: 600,
    fontSize: 14,
    padding: "6px 0",
    borderBottom: "1px solid #e5e7eb",
    marginTop: 8,
    marginBottom: 4,
  } as React.CSSProperties,

  groupBody: {
    paddingLeft: 16,
    borderLeft: "2px solid #e5e7eb",
  } as React.CSSProperties,

  chevron: {
    display: "inline-block",
    transition: "transform 0.15s ease",
    fontSize: 10,
  } as React.CSSProperties,
};

/* ------------------------------------------------------------------ */
/*  Collapsible group                                                  */
/* ------------------------------------------------------------------ */

function CollapsibleGroup({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <div>
      <button
        type="button"
        style={{
          ...styles.groupHeader,
          background: "none",
          border: "none",
          width: "100%",
          textAlign: "left",
        }}
        onClick={toggle}
      >
        <span
          style={{
            ...styles.chevron,
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          &#9654;
        </span>
        <span>{label}</span>
      </button>
      {open && <div style={styles.groupBody}>{children}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  String field                                                       */
/* ------------------------------------------------------------------ */

function StringField({
  keyPath,
  value,
  originalValue,
  isEdited,
  onEdit,
}: {
  keyPath: string;
  value: string;
  originalValue: string;
  isEdited: boolean;
  onEdit: (keyPath: string, value: string) => void;
}) {
  const useTextarea = value.length >= 80;

  const inputStyle = {
    ...(useTextarea ? styles.textarea : styles.input),
    ...(isEdited ? styles.inputEdited : {}),
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onEdit(keyPath, e.target.value);
  };

  return (
    <div style={styles.fieldWrapper}>
      <label style={styles.label}>{keyPath}</label>
      {useTextarea ? (
        <textarea style={inputStyle} value={value} onChange={handleChange} />
      ) : (
        <input
          type="text"
          style={inputStyle}
          value={value}
          onChange={handleChange}
        />
      )}
      {isEdited && (
        <div style={styles.originalHint}>Original: {originalValue}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Recursive renderer                                                 */
/* ------------------------------------------------------------------ */

function renderNode(
  data: unknown,
  originalData: unknown,
  prefix: string,
  locale: string,
  edits: Record<string, string>,
  onEdit: (keyPath: string, value: string) => void,
): React.ReactNode {
  // --- string leaf ---
  if (typeof data === "string") {
    const keyPath = prefix;
    const originalValue = resolveKeyPath(originalData, keyPath);
    const originalStr =
      typeof originalValue === "string" ? originalValue : String(data);
    const isEdited = keyPath in edits;
    const displayValue = isEdited ? edits[keyPath] : data;

    return (
      <StringField
        key={keyPath}
        keyPath={keyPath}
        value={displayValue}
        originalValue={originalStr}
        isEdited={isEdited}
        onEdit={onEdit}
      />
    );
  }

  // --- number / boolean leaf (render as string) ---
  if (typeof data === "number" || typeof data === "boolean") {
    const keyPath = prefix;
    const strValue = String(data);
    const originalValue = resolveKeyPath(originalData, keyPath);
    const originalStr =
      originalValue !== undefined ? String(originalValue) : strValue;
    const isEdited = keyPath in edits;
    const displayValue = isEdited ? edits[keyPath] : strValue;

    return (
      <StringField
        key={keyPath}
        keyPath={keyPath}
        value={displayValue}
        originalValue={originalStr}
        isEdited={isEdited}
        onEdit={onEdit}
      />
    );
  }

  // --- array ---
  if (Array.isArray(data)) {
    return (
      <CollapsibleGroup label={prefix || "root"} key={prefix}>
        {data.map((item, idx) => {
          const childPrefix = prefix ? `${prefix}.${idx}` : String(idx);
          return (
            <div key={childPrefix}>
              {renderNode(item, originalData, childPrefix, locale, edits, onEdit)}
            </div>
          );
        })}
      </CollapsibleGroup>
    );
  }

  // --- object / record ---
  if (data !== null && typeof data === "object") {
    const entries = Object.keys(data as Record<string, unknown>);
    return (
      <CollapsibleGroup label={prefix || "root"} key={prefix}>
        {entries.map((key) => {
          const childPrefix = prefix ? `${prefix}.${key}` : key;
          const childData = (data as Record<string, unknown>)[key];
          return (
            <div key={childPrefix}>
              {renderNode(
                childData,
                originalData,
                childPrefix,
                locale,
                edits,
                onEdit,
              )}
            </div>
          );
        })}
      </CollapsibleGroup>
    );
  }

  // --- null / undefined ---
  return null;
}

/* ------------------------------------------------------------------ */
/*  Public component                                                   */
/* ------------------------------------------------------------------ */

export default function TranslationForm({
  data,
  prefix,
  locale,
  edits,
  onEdit,
  originalData,
}: TranslationFormProps) {
  return (
    <div>
      {renderNode(data, originalData, prefix, locale, edits, onEdit)}
    </div>
  );
}
