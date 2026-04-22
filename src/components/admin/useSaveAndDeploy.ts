"use client";

import { useState, useCallback } from "react";
import { useAdmin } from "@/context/AdminContext";
import { getTranslations } from "@/data/translations";
import { getByPath } from "@/lib/admin/translationIndex";
import { keyPathToFile, applyEditsToSource } from "@/lib/admin/fileSerializer";
import { getFileContent, commitMultipleFiles } from "@/lib/admin/githubApi";

interface SaveState {
  saving: boolean;
  progress: string;
  error: string | null;
  success: boolean;
}

export function useSaveAndDeploy() {
  const { edits, githubToken, discardEdits, editCount } = useAdmin();
  const [state, setState] = useState<SaveState>({
    saving: false,
    progress: "",
    error: null,
    success: false,
  });

  const save = useCallback(async () => {
    if (!githubToken) {
      setState((s) => ({ ...s, error: "No GitHub token configured" }));
      return;
    }
    if (editCount === 0) {
      setState((s) => ({ ...s, error: "No changes to save" }));
      return;
    }

    const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER || "ccka";
    const repo = process.env.NEXT_PUBLIC_GITHUB_REPO || "personnal-website";

    setState({
      saving: true,
      progress: "Preparing changes...",
      error: null,
      success: false,
    });

    try {
      // Group edits by file
      const fileEdits = new Map<
        string,
        Array<{ oldValue: string; newValue: string }>
      >();

      for (const [locale, localeEdits] of Object.entries(edits)) {
        const t = getTranslations(locale as "en" | "fr");
        for (const [keyPath, newValue] of Object.entries(localeEdits)) {
          const filePath = keyPathToFile(keyPath, locale);
          const oldValue = getByPath(t, keyPath);
          if (!oldValue || oldValue === newValue) continue;

          const existing = fileEdits.get(filePath) || [];
          existing.push({ oldValue, newValue });
          fileEdits.set(filePath, existing);
        }
      }

      if (fileEdits.size === 0) {
        setState({
          saving: false,
          progress: "",
          error: "No actual changes detected (values unchanged)",
          success: false,
        });
        return;
      }

      // Fetch, edit, and prepare each file
      const filesToCommit: Array<{ path: string; content: string }> = [];
      const totalFiles = fileEdits.size;
      let fileIndex = 0;

      for (const [filePath, editsForFile] of fileEdits) {
        fileIndex++;
        setState((s) => ({
          ...s,
          progress: `Updating file ${fileIndex}/${totalFiles}: ${filePath}`,
        }));

        const { content: source } = await getFileContent(
          githubToken,
          owner,
          repo,
          filePath,
        );
        const newSource = applyEditsToSource(source, editsForFile);
        filesToCommit.push({ path: filePath, content: newSource });
      }

      // Commit all files atomically
      setState((s) => ({ ...s, progress: "Committing to GitHub..." }));
      const sectionNames = [
        ...new Set(
          [...Object.values(edits)].flatMap((e) =>
            Object.keys(e).map((k) => k.split(".")[0]),
          ),
        ),
      ];
      const message = `content: update ${sectionNames.join(", ")} translations`;

      await commitMultipleFiles(
        githubToken,
        owner,
        repo,
        filesToCommit,
        message,
      );

      discardEdits();
      setState({ saving: false, progress: "", error: null, success: true });
      setTimeout(
        () => setState((s) => ({ ...s, success: false })),
        5000,
      );
    } catch (err) {
      setState((s) => ({
        ...s,
        saving: false,
        error: err instanceof Error ? err.message : "Unknown error",
      }));
    }
  }, [edits, githubToken, editCount, discardEdits]);

  return { ...state, save };
}
