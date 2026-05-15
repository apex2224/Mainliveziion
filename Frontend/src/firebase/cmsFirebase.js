const CMS_DB_URL = "https://ziionblogs-default-rtdb.firebaseio.com/";

// Fetch content for a specific page section
export const fetchPageContent = async (pageKey) => {
  const res = await fetch(`${CMS_DB_URL}/pages/${pageKey}.json`);
  if (!res.ok) throw new Error("Failed to fetch page content");
  return await res.json();
};

// Update content for a specific page section
// Using PATCH (not PUT) so only the provided fields are updated,
// and existing fields in Firebase are NOT wiped/deleted.
export const updatePageContent = async (pageKey, data) => {
  const res = await fetch(`${CMS_DB_URL}/pages/${pageKey}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error("Failed to update page content");
  return await res.json();
};

// Fetch SEO metadata for a specific page
export const fetchSeoMeta = async (pageKey) => {
  const res = await fetch(`${CMS_DB_URL}/seo/${pageKey}.json`);
  if (!res.ok) throw new Error("Failed to fetch SEO metadata");
  return await res.json();
};

// Update SEO metadata for a specific page
// Using PATCH (not PUT) so only the provided fields are updated,
// and existing SEO fields in Firebase are NOT wiped/deleted.
export const updateSeoMeta = async (pageKey, data) => {
  const res = await fetch(`${CMS_DB_URL}/seo/${pageKey}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error("Failed to update SEO metadata");
  return await res.json();
};
