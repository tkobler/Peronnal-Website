"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

interface AdminContextValue {
  isAdmin: boolean;
  edits: Record<string, Record<string, string>>; // locale -> keyPath -> newValue
  isDirty: boolean;
  githubToken: string | null;
  setGithubToken: (token: string) => void;
  recordEdit: (locale: string, keyPath: string, newValue: string) => void;
  discardEdits: () => void;
  discardEdit: (locale: string, keyPath: string) => void;
  getEditsForLocale: (locale: string) => Record<string, string>;
  editCount: number;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [edits, setEdits] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const [githubToken, setGithubToken] = useState<string | null>(null);

  useEffect(() => {
    // Defer via rAF so setState calls are not synchronous inside the effect body
    // (react-hooks/set-state-in-effect).
    const id = requestAnimationFrame(() => {
      const hostname = window.location.hostname;
      setIsAdmin(hostname === "localhost" || hostname === "127.0.0.1");

      const envToken = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
      if (envToken) {
        setGithubToken(envToken);
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const isDirty = Object.values(edits).some(
    (localeEdits) => Object.keys(localeEdits).length > 0
  );

  const editCount = Object.values(edits).reduce(
    (sum, localeEdits) => sum + Object.keys(localeEdits).length,
    0
  );

  const recordEdit = useCallback(
    (locale: string, keyPath: string, newValue: string) => {
      setEdits((prev) => ({
        ...prev,
        [locale]: {
          ...(prev[locale] ?? {}),
          [keyPath]: newValue,
        },
      }));
    },
    []
  );

  const discardEdits = useCallback(() => {
    setEdits({});
  }, []);

  const discardEdit = useCallback((locale: string, keyPath: string) => {
    setEdits((prev) => {
      const localeEdits = { ...(prev[locale] ?? {}) };
      delete localeEdits[keyPath];
      const next = { ...prev, [locale]: localeEdits };
      if (Object.keys(next[locale]).length === 0) {
        delete next[locale];
      }
      return next;
    });
  }, []);

  const getEditsForLocale = useCallback(
    (locale: string): Record<string, string> => {
      return edits[locale] ?? {};
    },
    [edits]
  );

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        edits,
        isDirty,
        githubToken,
        setGithubToken,
        recordEdit,
        discardEdits,
        discardEdit,
        getEditsForLocale,
        editCount,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return ctx;
}
