// ⚠️ IMPORTANT: Replace this URL with your actual Firebase Realtime Database URL
// Go to: Firebase Console → Your Project → Realtime Database → Copy URL
const BLOG_DB_URL = "https://ziionblogs-default-rtdb.firebaseio.com/";

// ✅ Category-based AI-themed thumbnail images (Unsplash)
export const CATEGORY_THUMBNAILS = {
  "Web Development":
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&auto=format",
  "Digital Marketing":
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=450&fit=crop&auto=format",
  "Data Science":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&auto=format",
  "AI/ML":
    "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop&auto=format",
  "Graphic Design":
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop&auto=format",
  "Career Tips":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop&auto=format",
  PHP: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop&auto=format",
  General:
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop&auto=format",
};

export const BLOG_CATEGORIES = Object.keys(CATEGORY_THUMBNAILS);

// ✅ Fetch all blogs (sorted newest first)
export const fetchAllBlogs = async () => {
  const res = await fetch(`${BLOG_DB_URL}/blogs.json`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  if (!data) return [];
  return Object.entries(data)
    .map(([id, blog]) => ({ id, ...blog }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// ✅ Fetch single blog by ID
export const fetchBlogById = async (id) => {
  const res = await fetch(`${BLOG_DB_URL}/blogs/${id}.json`);
  if (!res.ok) throw new Error("Blog not found");
  const data = await res.json();
  if (!data) throw new Error("Blog not found");
  return data;
};

// ✅ Post a new blog
export const postBlog = async (blogData) => {
  const payload = {
    ...blogData,
    createdAt: new Date().toISOString(),
    views: 0,
  };
  const res = await fetch(`${BLOG_DB_URL}/blogs.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to publish blog");
  return await res.json();
};

// ✅ Update (edit) an existing blog by ID
export const updateBlog = async (id, blogData) => {
  const payload = { ...blogData, updatedAt: new Date().toISOString() };
  const res = await fetch(`${BLOG_DB_URL}/blogs/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update blog");
  return await res.json();
};

// ✅ Toggle a single field on a blog (e.g. showTimestamp)
export const patchBlogField = async (id, field, value) => {
  const res = await fetch(`${BLOG_DB_URL}/blogs/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [field]: value }),
  });
  if (!res.ok) throw new Error(`Failed to update ${field}`);
};

// ✅ Delete a blog by ID
export const deleteBlog = async (id) => {
  const res = await fetch(`${BLOG_DB_URL}/blogs/${id}.json`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete blog");
};
