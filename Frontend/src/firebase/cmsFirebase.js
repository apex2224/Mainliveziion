const CMS_DB_URL = "https://ziionblogs-default-rtdb.firebaseio.com/";
const STUDENT_DB_URL = "https://studentdata-18fe7-default-rtdb.firebaseio.com/";

// Fetch student count
export const fetchStudentCount = async () => {
  try {
    const res = await fetch(`${STUDENT_DB_URL}/studentData.json`);
    if (!res.ok) return 0;
    const data = await res.json();
    if (!data) return 0;
    return Object.keys(data).length;
  } catch {
    return 0;
  }
};

// Fetch all students
export const fetchAllStudents = async () => {
  try {
    const res = await fetch(`${STUDENT_DB_URL}/studentData.json`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data) return [];
    return Object.entries(data).map(([id, student]) => ({ id, ...student }));
  } catch {
    return [];
  }
};

// Fetch all page keys to count active CMS pages
export const fetchAllPageKeys = async () => {
  try {
    const res = await fetch(`${CMS_DB_URL}/pages.json`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data) return [];
    return Object.keys(data);
  } catch {
    return [];
  }
};

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
