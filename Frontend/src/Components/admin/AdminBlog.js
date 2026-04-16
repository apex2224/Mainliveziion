import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  InputLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  TextField,
  Toolbar,
  Typography,
  FormControl,
  Stack,
  Avatar,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  PenLine,
  LayoutList,
  Eye,
  Trash2,
  ExternalLink,
  RefreshCw,
  LogOut,
  Globe,
  Lock,
  ArrowLeft,
  Send,
  RotateCcw,
} from "lucide-react";

import {
  fetchAllBlogs,
  postBlog,
  deleteBlog,
  CATEGORY_THUMBNAILS,
  BLOG_CATEGORIES,
} from "../../firebase/blogFirebase";

// ── Minimal MUI theme ───────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e40af" },
    background: { default: "#f8fafc", paper: "#ffffff" },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          borderRight: "1px solid #e2e8f0",
          background: "#ffffff",
        },
      },
    },
  },
});

const ADMIN_PASSWORD = "Ziion@152";
const DRAWER_WIDTH = 240;

const formatDate = (str) =>
  new Date(str).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// ═══════════════════════════════════════════════════════════════
const AdminBlog = () => {
  const navigate = useNavigate();

  // ── Auth ──────────────────────────────────────────────────────
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  // ── Tabs ──────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("write");

  // ── Blogs list ────────────────────────────────────────────────
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // ── Form ──────────────────────────────────────────────────────
  const [form, setForm] = useState({
    title: "",
    category: "Web Development",
    author: "Mainliveziion Team",
    readTime: "5 min read",
    excerpt: "",
    content: "",
    thumbnail: CATEGORY_THUMBNAILS["Web Development"],
  });

  // Quill toolbar config
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  };
  const quillFormats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "bullet", "indent",
    "blockquote", "code-block",
    "link", "image",
    "color", "background",
  ];
  const [publishing, setPublishing] = useState(false);

  // ── Snackbar ──────────────────────────────────────────────────
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });
  const showSnack = (msg, severity = "success") =>
    setSnack({ open: true, msg, severity });

  // ── Load blogs after login ─────────────────────────────────
  useEffect(() => {
    if (isLoggedIn) loadBlogs();
  }, [isLoggedIn]);

  const loadBlogs = async () => {
    setLoadingBlogs(true);
    try {
      const data = await fetchAllBlogs();
      setBlogs(data);
    } catch {
      showSnack("Failed to load blogs", "error");
    } finally {
      setLoadingBlogs(false);
    }
  };

  // ── Login ────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Try again.");
      setPasswordInput("");
    }
  };

  // ── Form handlers ─────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    const upd = { [name]: value };
    if (name === "category") {
      upd.thumbnail =
        CATEGORY_THUMBNAILS[value] || CATEGORY_THUMBNAILS["General"];
    }
    setForm((p) => ({ ...p, ...upd }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "Web Development",
      author: "Mainliveziion Team",
      readTime: "5 min read",
      excerpt: "",
      content: "",
      thumbnail: CATEGORY_THUMBNAILS["Web Development"],
    });
  };

  // Quill content change handler
  const handleContentChange = (value) => {
    setForm((p) => ({ ...p, content: value }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const plainText = form.content.replace(/<[^>]*>/g, "").trim();
    if (!form.title.trim() || !plainText) {
      showSnack("Title and Content are required.", "warning");
      return;
    }
    setPublishing(true);
    try {
      await postBlog(form);
      showSnack("Blog published successfully!");
      resetForm();
      await loadBlogs();
      setActiveTab("manage");
    } catch {
      showSnack("Failed to publish. Check Firebase URL.", "error");
    } finally {
      setPublishing(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    setDeletingId(id);
    try {
      await deleteBlog(id);
      setBlogs((p) => p.filter((b) => b.id !== id));
      showSnack("Blog deleted.");
    } catch {
      showSnack("Failed to delete.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // LOGIN PAGE
  // ═══════════════════════════════════════════════════════════════
  if (!isLoggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
            p: 2,
          }}
        >
          <Card sx={{ width: "100%", maxWidth: 400, p: 1 }} elevation={2}>
            <CardContent>
              <Stack alignItems="center" spacing={1} mb={3}>
                <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
                  <Lock size={22} />
                </Avatar>
                <Typography variant="h6" fontWeight={700}>
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mainliveziion Blog Management
                </Typography>
              </Stack>

              <form onSubmit={handleLogin}>
                <Stack spacing={2}>
                  <TextField
                    id="admin-password"
                    label="Password"
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    size="small"
                    fullWidth
                    autoFocus
                    error={!!loginError}
                    helperText={loginError}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disableElevation
                    startIcon={<Lock size={16} />}
                  >
                    Login
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    startIcon={<ArrowLeft size={14} />}
                    onClick={() => navigate("/")}
                    sx={{ color: "text.secondary" }}
                  >
                    Back to Website
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Box>
      </ThemeProvider>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // NAV ITEMS
  // ═══════════════════════════════════════════════════════════════
  const navItems = [
    { id: "write", label: "Write Blog", icon: <PenLine size={18} /> },
    { id: "manage", label: "Manage Blogs", icon: <LayoutList size={18} />, badge: blogs.length },
    { id: "preview", label: "Preview", icon: <Eye size={18} /> },
  ];

  // ═══════════════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════════════
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>

        {/* ── Sidebar ── */}
        <Drawer variant="permanent" anchor="left">
          {/* Logo */}
          <Toolbar sx={{ px: 2, borderBottom: "1px solid #e2e8f0" }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar sx={{ bgcolor: "primary.main", width: 34, height: 34 }}>
                <PenLine size={16} />
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight={700} lineHeight={1.2}>
                  Blog Admin
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Mainliveziion
                </Typography>
              </Box>
            </Stack>
          </Toolbar>

          {/* Nav */}
          <List sx={{ flex: 1, px: 1, pt: 1 }}>
            {navItems.map((item) => (
              <ListItemButton
                key={item.id}
                id={`tab-${item.id}`}
                selected={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "manage") loadBlogs();
                }}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  "&.Mui-selected": {
                    bgcolor: "rgba(30,64,175,0.08)",
                    color: "primary.main",
                  },
                  "&.Mui-selected .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                />
                {item.badge > 0 && (
                  <Chip
                    label={item.badge}
                    size="small"
                    color="primary"
                    sx={{ height: 20, fontSize: 11 }}
                  />
                )}
              </ListItemButton>
            ))}
          </List>

          <Divider />

          {/* Footer actions */}
          <Stack spacing={1} p={1.5}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Globe size={14} />}
              onClick={() => window.open("/blogs", "_blank")}
              fullWidth
            >
              View Blog Page
            </Button>
            <Button
              variant="text"
              size="small"
              color="error"
              startIcon={<LogOut size={14} />}
              onClick={() => setIsLoggedIn(false)}
              fullWidth
            >
              Logout
            </Button>
          </Stack>
        </Drawer>

        {/* ── Main Content ── */}
        <Box
          component="main"
          sx={{ flexGrow: 1, ml: `${DRAWER_WIDTH}px`, p: 4 }}
        >

          {/* ══ WRITE TAB ══ */}
          {activeTab === "write" && (
            <Box maxWidth={800}>
              <Typography variant="h6" fontWeight={700} mb={0.5}>
                Write New Blog
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Fill all fields and publish to Firebase
              </Typography>

              <Card elevation={0} sx={{ border: "1px solid #e2e8f0" }}>
                <CardContent>
                  <form onSubmit={handlePublish}>
                    <Stack spacing={2.5}>
                      {/* Title */}
                      <TextField
                        id="blog-title"
                        label="Blog Title *"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        placeholder="e.g. How to Start a Career in Web Development"
                        required
                      />

                      {/* Category + Author */}
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <FormControl size="small" fullWidth>
                          <InputLabel id="cat-label">Category</InputLabel>
                          <Select
                            labelId="cat-label"
                            id="blog-category"
                            name="category"
                            value={form.category}
                            label="Category"
                            onChange={handleChange}
                          >
                            {BLOG_CATEGORIES.map((cat) => (
                              <MenuItem key={cat} value={cat}>
                                {cat}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          id="blog-author"
                          label="Author"
                          name="author"
                          value={form.author}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      </Stack>

                      {/* Read Time + Thumbnail */}
                      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                          id="blog-readtime"
                          label="Read Time"
                          name="readTime"
                          value={form.readTime}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          placeholder="e.g. 5 min read"
                        />
                        <TextField
                          id="blog-thumbnail"
                          label="Thumbnail URL (auto-filled)"
                          name="thumbnail"
                          value={form.thumbnail}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                        />
                      </Stack>

                      {/* Thumbnail preview */}
                      {form.thumbnail && (
                        <Box
                          component="img"
                          src={form.thumbnail}
                          alt="preview"
                          sx={{
                            width: "100%",
                            height: 180,
                            objectFit: "cover",
                            borderRadius: 2,
                            border: "1px solid #e2e8f0",
                          }}
                          onError={(e) => (e.target.style.display = "none")}
                        />
                      )}

                      {/* Excerpt */}
                      <TextField
                        id="blog-excerpt"
                        label="Short Excerpt (shown on card)"
                        name="excerpt"
                        value={form.excerpt}
                        onChange={handleChange}
                        fullWidth
                        size="small"
                        inputProps={{ maxLength: 150 }}
                        helperText={`${form.excerpt.length}/150`}
                      />

                      {/* Content — Rich Text Editor */}
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary", mb: 0.5, display: "block", fontWeight: 500 }}
                        >
                          Full Article Content *
                        </Typography>
                        <Box
                          sx={{
                            border: "1px solid #e2e8f0",
                            borderRadius: 2,
                            overflow: "hidden",
                            "& .ql-toolbar": {
                              borderBottom: "1px solid #e2e8f0",
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              bgcolor: "#f8fafc",
                            },
                            "& .ql-container": {
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              fontSize: "0.95rem",
                              fontFamily: "'Inter', sans-serif",
                              minHeight: 320,
                            },
                            "& .ql-editor": { minHeight: 320, p: 2 },
                          }}
                        >
                          <ReactQuill
                            value={form.content}
                            onChange={handleContentChange}
                            modules={quillModules}
                            formats={quillFormats}
                            placeholder="Write your full article here. Use the toolbar to add headings, bold text, bullet lists, images (via URL), links, and more..."
                            theme="snow"
                          />
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                          💡 Tip: Click the 🖼 image icon in toolbar to insert an image via URL
                        </Typography>
                      </Box>

                      <Divider />

                      {/* Actions */}
                      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                        <Button
                          variant="text"
                          color="inherit"
                          startIcon={<Eye size={15} />}
                          onClick={() => setActiveTab("preview")}
                          sx={{ color: "text.secondary" }}
                        >
                          Preview
                        </Button>
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<RotateCcw size={15} />}
                          onClick={resetForm}
                          sx={{ color: "text.secondary", borderColor: "#e2e8f0" }}
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disableElevation
                          disabled={publishing}
                          startIcon={
                            publishing ? (
                              <CircularProgress size={14} color="inherit" />
                            ) : (
                              <Send size={15} />
                            )
                          }
                        >
                          {publishing ? "Publishing..." : "Publish Blog"}
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* ══ MANAGE TAB ══ */}
          {activeTab === "manage" && (
            <Box>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>
                    All Blogs
                    <Chip
                      label={blogs.length}
                      size="small"
                      color="primary"
                      sx={{ ml: 1.5, height: 22, fontSize: 11 }}
                    />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Manage published blog posts
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<RefreshCw size={14} />}
                  onClick={loadBlogs}
                >
                  Refresh
                </Button>
              </Stack>

              {loadingBlogs ? (
                <Box display="flex" alignItems="center" gap={1.5} py={4} color="text.secondary">
                  <CircularProgress size={20} />
                  <Typography variant="body2">Loading blogs...</Typography>
                </Box>
              ) : blogs.length === 0 ? (
                <Box textAlign="center" py={8} color="text.secondary">
                  <LayoutList size={40} strokeWidth={1} style={{ marginBottom: 12 }} />
                  <Typography variant="body1" mb={2}>No blogs published yet.</Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={() => setActiveTab("write")}
                    startIcon={<PenLine size={15} />}
                  >
                    Write First Blog
                  </Button>
                </Box>
              ) : (
                <Stack spacing={1.5}>
                  {blogs.map((blog) => (
                    <Card
                      key={blog.id}
                      elevation={0}
                      sx={{
                        border: "1px solid #e2e8f0",
                        "&:hover": { borderColor: "#a5b4fc" },
                        transition: "border-color 0.2s",
                      }}
                    >
                      <CardContent sx={{ p: "14px 16px !important" }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* Thumbnail */}
                          <CardMedia
                            component="img"
                            image={blog.thumbnail}
                            alt={blog.title}
                            sx={{
                              width: 96,
                              height: 64,
                              borderRadius: 1.5,
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />

                          {/* Info */}
                          <Box flex={1} minWidth={0}>
                            <Chip
                              label={blog.category}
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: 10,
                                bgcolor: "rgba(30,64,175,0.08)",
                                color: "#1e40af",
                                mb: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              noWrap
                              sx={{ mb: 0.5 }}
                            >
                              {blog.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {blog.author} &nbsp;·&nbsp; {formatDate(blog.createdAt)} &nbsp;·&nbsp; {blog.readTime}
                            </Typography>
                          </Box>

                          {/* Actions */}
                          <Stack direction="row" spacing={0.5}>
                            <IconButton
                              size="small"
                              onClick={() => window.open(`/blogs/${blog.id}`, "_blank")}
                              title="View"
                            >
                              <ExternalLink size={16} />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(blog.id, blog.title)}
                              disabled={deletingId === blog.id}
                              title="Delete"
                            >
                              {deletingId === blog.id ? (
                                <CircularProgress size={14} color="inherit" />
                              ) : (
                                <Trash2 size={16} />
                              )}
                            </IconButton>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </Box>
          )}

          {/* ══ PREVIEW TAB ══ */}
          {activeTab === "preview" && (
            <Box maxWidth={800}>
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Button
                  variant="text"
                  color="inherit"
                  size="small"
                  startIcon={<ArrowLeft size={15} />}
                  onClick={() => setActiveTab("write")}
                  sx={{ color: "text.secondary" }}
                >
                  Back to Edit
                </Button>
                <Typography variant="h6" fontWeight={700}>
                  Preview
                </Typography>
              </Stack>

              {!form.title ? (
                <Box textAlign="center" py={8} color="text.secondary">
                  <Eye size={40} strokeWidth={1} style={{ marginBottom: 12 }} />
                  <Typography variant="body1">
                    Nothing to preview yet. Write a blog first.
                  </Typography>
                </Box>
              ) : (
                <Card elevation={0} sx={{ border: "1px solid #e2e8f0", overflow: "hidden" }}>
                  {form.thumbnail && (
                    <CardMedia
                      component="img"
                      image={form.thumbnail}
                      alt="preview"
                      sx={{ height: 260, objectFit: "cover" }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  )}
                  <CardContent sx={{ p: "28px 32px" }}>
                    <Chip
                      label={form.category}
                      size="small"
                      sx={{
                        bgcolor: "rgba(30,64,175,0.08)",
                        color: "#1e40af",
                        mb: 1.5,
                      }}
                    />
                    <Typography variant="h5" fontWeight={800} mb={1}>
                      {form.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {form.author} &nbsp;·&nbsp; {form.readTime}
                    </Typography>

                    {form.excerpt && (
                      <Box
                        sx={{
                          mt: 2,
                          p: "14px 18px",
                          bgcolor: "rgba(30,64,175,0.04)",
                          borderLeft: "4px solid #1e40af",
                          borderRadius: "0 8px 8px 0",
                        }}
                      >
                        <Typography variant="body1" fontWeight={500} color="text.secondary">
                          {form.excerpt}
                        </Typography>
                      </Box>
                    )}

                    <Box
                      mt={2.5}
                      className="ql-snow"
                      sx={{
                        "& .ql-editor": { padding: 0 },
                        "& img": { maxWidth: "100%", borderRadius: 1 },
                        "& h1,h2,h3": { fontFamily: "'Inter',sans-serif", mb: 1 },
                        "& p": { lineHeight: 1.85, color: "#6b7280", mb: 1.2 },
                        "& ul,ol": { pl: 3, mb: 1.5 },
                        "& blockquote": { borderLeft: "4px solid #1e40af", pl: 2, color: "#6b7280" },
                      }}
                    >
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: form.content }}
                        style={{ padding: 0, fontFamily: "'Inter',sans-serif" }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Snackbar ── */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack((p) => ({ ...p, open: false }))}
          sx={{ borderRadius: 2 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default AdminBlog;
