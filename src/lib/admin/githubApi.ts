const API_BASE = "https://api.github.com";

interface FileContent {
  content: string; // decoded UTF-8 content
  sha: string; // for update operations
}

function headers(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

/**
 * Fetch a single file's decoded content and SHA from the GitHub Contents API.
 */
export async function getFileContent(
  token: string,
  owner: string,
  repo: string,
  path: string,
): Promise<FileContent> {
  const res = await fetch(
    `${API_BASE}/repos/${owner}/${repo}/contents/${path}`,
    { headers: headers(token) },
  );
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const content = atob(data.content.replace(/\n/g, ""));
  return { content, sha: data.sha };
}

/**
 * Commit a single file update via the GitHub Contents API.
 */
export async function commitFile(
  token: string,
  owner: string,
  repo: string,
  path: string,
  content: string,
  sha: string,
  message: string,
): Promise<void> {
  const res = await fetch(
    `${API_BASE}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: headers(token),
      body: JSON.stringify({
        message,
        content: btoa(unescape(encodeURIComponent(content))),
        sha,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`GitHub commit error ${res.status}: ${await res.text()}`);
  }
}

/**
 * Commit multiple files atomically using the Git Trees / Blobs API.
 *
 * Flow:
 *   1. Get the SHA of the latest commit on the default branch.
 *   2. Create a blob for each file.
 *   3. Build a new tree that layers the blobs on top of the current tree.
 *   4. Create a commit pointing to that tree.
 *   5. Update the branch ref to the new commit.
 */
export async function commitMultipleFiles(
  token: string,
  owner: string,
  repo: string,
  files: Array<{ path: string; content: string }>,
  message: string,
  branch = "main",
): Promise<void> {
  const h = headers(token);
  const base = `${API_BASE}/repos/${owner}/${repo}`;

  // 1. Latest commit SHA and its tree SHA
  const refRes = await fetch(`${base}/git/ref/heads/${branch}`, {
    headers: h,
  });
  if (!refRes.ok) {
    throw new Error(
      `GitHub ref error ${refRes.status}: ${await refRes.text()}`,
    );
  }
  const refData = await refRes.json();
  const latestCommitSha: string = refData.object.sha;

  const commitRes = await fetch(`${base}/git/commits/${latestCommitSha}`, {
    headers: h,
  });
  if (!commitRes.ok) {
    throw new Error(
      `GitHub commit-read error ${commitRes.status}: ${await commitRes.text()}`,
    );
  }
  const commitData = await commitRes.json();
  const baseTreeSha: string = commitData.tree.sha;

  // 2. Create blobs in parallel
  const blobShas = await Promise.all(
    files.map(async (f) => {
      const blobRes = await fetch(`${base}/git/blobs`, {
        method: "POST",
        headers: h,
        body: JSON.stringify({ content: f.content, encoding: "utf-8" }),
      });
      if (!blobRes.ok) {
        throw new Error(
          `GitHub blob error ${blobRes.status}: ${await blobRes.text()}`,
        );
      }
      const blobData = await blobRes.json();
      return { path: f.path, sha: blobData.sha as string };
    }),
  );

  // 3. Create tree
  const treeRes = await fetch(`${base}/git/trees`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: blobShas.map((b) => ({
        path: b.path,
        mode: "100644",
        type: "blob",
        sha: b.sha,
      })),
    }),
  });
  if (!treeRes.ok) {
    throw new Error(
      `GitHub tree error ${treeRes.status}: ${await treeRes.text()}`,
    );
  }
  const treeData = await treeRes.json();

  // 4. Create commit
  const newCommitRes = await fetch(`${base}/git/commits`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({
      message,
      tree: treeData.sha,
      parents: [latestCommitSha],
    }),
  });
  if (!newCommitRes.ok) {
    throw new Error(
      `GitHub new-commit error ${newCommitRes.status}: ${await newCommitRes.text()}`,
    );
  }
  const newCommitData = await newCommitRes.json();

  // 5. Update branch ref
  const updateRefRes = await fetch(`${base}/git/refs/heads/${branch}`, {
    method: "PATCH",
    headers: h,
    body: JSON.stringify({ sha: newCommitData.sha }),
  });
  if (!updateRefRes.ok) {
    throw new Error(
      `GitHub ref-update error ${updateRefRes.status}: ${await updateRefRes.text()}`,
    );
  }
}
