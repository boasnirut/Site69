export async function getGithubFileContent(path: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    // Fallback to local file read for development if env vars are missing
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs/promises");
      const localPath = `${process.cwd()}/${path}`;
      try {
        const content = await fs.readFile(localPath, "utf-8");
        return { content, sha: "local-dev-sha" };
      } catch (e) {
        return null;
      }
    }
    console.error("Missing GitHub configuration");
    return null;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
      // Cache must be disabled to get fresh content during admin edits
      cache: "no-store", 
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`GitHub API error: ${res.statusText}`);
    }

    const data = await res.json();
    
    // GitHub API returns content as base64
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    
    return {
      content,
      sha: data.sha, // Required for updating the file later
    };
  } catch (error) {
    console.error("Failed to fetch from GitHub:", error);
    return null;
  }
}

export async function updateGithubFile(path: string, newContent: string, message: string, sha?: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs/promises");
      const localPath = `${process.cwd()}/${path}`;
      await fs.writeFile(localPath, newContent, "utf-8");
      return true;
    }
    throw new Error("Missing GitHub configuration");
  }

  try {
    // If sha is not provided, we need to get it first
    let fileSha = sha;
    if (!fileSha) {
      const currentFile = await getGithubFileContent(path);
      if (currentFile) {
        fileSha = currentFile.sha;
      }
    }

    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(newContent).toString("base64"),
        sha: fileSha,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to update GitHub file:", error);
    throw error;
  }
}

export async function uploadGithubBase64File(path: string, base64Content: string, message: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    if (process.env.NODE_ENV === "development") {
      const fs = await import("fs/promises");
      const localPath = `${process.cwd()}/${path}`;
      // In development, ensure directory exists
      const pathModule = await import("path");
      await fs.mkdir(pathModule.dirname(localPath), { recursive: true });
      await fs.writeFile(localPath, Buffer.from(base64Content, "base64"));
      return true;
    }
    throw new Error("Missing GitHub configuration");
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: base64Content,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to upload binary file to GitHub:", error);
    throw error;
  }
}
