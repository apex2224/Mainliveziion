import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
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
  Switch,
  FormControlLabel,
  useMediaQuery,
} from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";

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
  Pencil,
  Menu,
} from "lucide-react";

import {
  fetchAllBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
  patchBlogField,
  CATEGORY_THUMBNAILS,
  BLOG_CATEGORIES,
} from "../../firebase/blogFirebase";

// ── Clean White & Black Professional Theme ──────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#111111" },
    secondary: { main: "#444444" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
    text: { primary: "#111111", secondary: "#555555" },
    divider: "#e0e0e0",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          },
        },
        containedPrimary: {
          backgroundColor: "#111111",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          borderRight: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fafafa",
            "& fieldset": { borderColor: "#d1d5db" },
            "&:hover fieldset": { borderColor: "#9ca3af" },
            "&.Mui-focused fieldset": { borderColor: "#111111" },
          },
          "& .MuiInputLabel-root": { color: "#6b7280" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#111111" },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#111111",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#f3f4f6",
          color: "#374151",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          marginBottom: 2,
          "&.Mui-selected": {
            backgroundColor: "#111111",
            color: "#ffffff",
            "& .MuiListItemIcon-root": { color: "#ffffff" },
            "&:hover": { backgroundColor: "#333333" },
          },
          "&:hover": {
            backgroundColor: "#f3f4f6",
          },
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
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

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
    id: null,
    title: "",
    category: "Web Development",
    author: "Mainliveziion Team",
    readTime: "5 min read",
    excerpt: "",
    content: "",
    thumbnail: CATEGORY_THUMBNAILS["Web Development"],
    showTimestamp: true,
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
      id: null,
      title: "",
      category: "Web Development",
      author: "Mainliveziion Team",
      readTime: "5 min read",
      excerpt: "",
      content: "",
      thumbnail: CATEGORY_THUMBNAILS["Web Development"],
      showTimestamp: true,
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
      if (form.id) {
        await updateBlog(form.id, form);
        showSnack("Blog updated successfully!");
      } else {
        await postBlog(form);
        showSnack("Blog published successfully!");
      }
      resetForm();
      await loadBlogs();
      setActiveTab("manage");
    } catch {
      showSnack("Failed to publish/update. Check Firebase URL.", "error");
    } finally {
      setPublishing(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      id: blog.id,
      title: blog.title,
      category: blog.category || "Web Development",
      author: blog.author || "Mainliveziion Team",
      readTime: blog.readTime || "5 min read",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      thumbnail: blog.thumbnail || CATEGORY_THUMBNAILS["Web Development"],
      showTimestamp: blog.showTimestamp !== false,
    });
    setActiveTab("write");
  };

  const handleToggleTimestamp = async (id, currentVal) => {
    try {
      await patchBlogField(id, "showTimestamp", !currentVal);
      setBlogs((p) =>
        p.map((b) => (b.id === id ? { ...b, showTimestamp: !currentVal } : b))
      );
      showSnack(`Timestamp ${!currentVal ? 'enabled' : 'disabled'}.`);
    } catch {
      showSnack("Failed to toggle timestamp.", "error");
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
            position: "relative",
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 420,
              p: 3,
            }}
          >
            <CardContent>
              <Stack alignItems="center" spacing={2} mb={4}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: "#111111",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <Lock size={24} color="#fff" />
                </Box>
                <Typography variant="h5" fontWeight={700} color="text.primary">
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mainliveziion Blog Management
                </Typography>
              </Stack>

              <form onSubmit={handleLogin}>
                <Stack spacing={2.5}>
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
                    sx={{}} // theme handles styling
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                    startIcon={<Lock size={18} />}
                  >
                    Login
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    size="small"
                    startIcon={<ArrowLeft size={14} />}
                    onClick={() => navigate("/")}
                    sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
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
  // ── Shared Sidebar Content ────────────────────────────────────
  const sidebarContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <Toolbar sx={{ px: 2.5, py: 2, borderBottom: "1px solid #e5e7eb", minHeight: "64px !important" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            <PenLine size={18} color="#fff" />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700} lineHeight={1.2} color="text.primary">
              Blog Admin
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Mainliveziion
            </Typography>
          </Box>
        </Stack>
      </Toolbar>

      {/* Nav */}
      <List sx={{ flex: 1, px: 1.5, pt: 1.5 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.id}
            id={`tab-${item.id}`}
            selected={activeTab === item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (item.id === "manage") loadBlogs();
              if (isMobile) setMobileOpen(false);
            }}
            sx={{
              borderRadius: 8,
              mb: 0.5,
              transition: "all 0.2s",
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: activeTab === item.id ? "#ffffff" : "#555555" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: 14, fontWeight: activeTab === item.id ? 600 : 500 }}
            />
            {item.badge > 0 && (
              <Chip
                label={item.badge}
                size="small"
                sx={{
                  height: 20,
                  fontSize: 10,
                }}
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
          sx={{
            borderColor: "#d1d5db",
            color: "#374151",
            "&:hover": {
              borderColor: "#111111",
              color: "#111111",
              backgroundColor: "#f3f4f6",
            },
          }}
        >
          View Blog Page
        </Button>
        <Button
          variant="text"
          size="small"
          startIcon={<LogOut size={14} />}
          onClick={() => setIsLoggedIn(false)}
          fullWidth
          sx={{
            color: "#dc2626",
            "&:hover": {
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
            },
          }}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>

        {/* ── Mobile Top AppBar ── */}
        {isMobile && (
          <AppBar
            position="fixed"
            elevation={0}
            sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
          >
            <Toolbar sx={{ gap: 2 }}>
              <IconButton
                edge="start"
                onClick={() => setMobileOpen((prev) => !prev)}
                sx={{ color: "#111111" }}
              >
                <Menu size={22} />
              </IconButton>
              <Typography variant="body1" fontWeight={700} color="text.primary">
                Blog Admin
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        {/* ── Mobile Drawer (temporary) ── */}
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                borderRight: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            anchor="left"
            sx={{
              "& .MuiDrawer-paper": {
                width: DRAWER_WIDTH,
                borderRight: "1px solid #e5e7eb",
                backgroundColor: "#ffffff",
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        )}

        {/* ── Main Content ── */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
            mt: { xs: "64px", md: 0 },
            p: { xs: 2, sm: 3, md: 5 },
            minHeight: "100vh",
            width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
            bgcolor: "background.default",
            position: "relative",
            overflowX: "hidden",
            "&::before": { display: "none" },
          }}
        >

          {/* ══ WRITE TAB ══ */}
          {activeTab === "write" && (
            <Box maxWidth={800}>
              <Typography variant="h5" fontWeight={700} mb={0.5} color="text.primary">
                Write New Blog
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Fill all fields and publish to Firebase
              </Typography>

              <Card elevation={0}>
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
                        sx={{}} // theme handles styling
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
                            sx={{}}
                            MenuProps={{}}
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
                          sx={{}} // theme handles styling
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
                          sx={{}} // theme handles styling
                        />
                        <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                          <TextField
                            id="blog-thumbnail"
                            label="Thumbnail URL (auto-filled or custom)"
                            name="thumbnail"
                            value={form.thumbnail}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            sx={{
                              "& .MuiInputLabel-root": { color: "#6b7280" },
                              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
                              "& .MuiInputBase-input": { color: "#111111" },
                            }}
                          />
                          <Button
                            variant="outlined"
                            component="label"
                            sx={{
                              borderColor: "#d1d5db",
                              color: "#374151",
                              minWidth: "120px",
                              "&:hover": { borderColor: "#111111", backgroundColor: "#f3f4f6" },
                            }}
                          >
                            Upload File
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    const img = new Image();
                                    img.onload = () => {
                                      const canvas = document.createElement("canvas");
                                      const MAX_WIDTH = 800;
                                      const scaleSize = MAX_WIDTH / img.width;
                                      canvas.width = MAX_WIDTH;
                                      canvas.height = img.height * scaleSize;
                                      const ctx = canvas.getContext("2d");
                                      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                                      const resizedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                                      setForm((p) => ({ ...p, thumbnail: resizedBase64 }));
                                    };
                                    img.src = reader.result;
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </Button>
                        </Stack>
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
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
                        sx={{
                          "& .MuiInputLabel-root": { color: "#6b7280" },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#d1d5db" },
                          "& .MuiInputBase-input": { color: "#111111" },
                          "& .MuiFormHelperText-root": { color: "#6b7280" },
                        }}
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
                            border: "1px solid #e5e7eb",
                            borderRadius: 2,
                            overflow: "hidden",
                            background: "#ffffff",
                            "& .ql-toolbar": {
                              borderBottom: "1px solid #e5e7eb",
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              bgcolor: "#fafafa",
                              color: "#111111",
                            },
                            "& .ql-container": {
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: "none",
                              fontSize: "0.95rem",
                              fontFamily: "'Inter', sans-serif",
                              minHeight: 320,
                              backgroundColor: "#ffffff",
                            },
                            "& .ql-editor": { minHeight: 320, p: 2, color: "#111111" },
                            "& .ql-stroke": { stroke: "#555555" },
                            "& .ql-fill": { fill: "#555555" },
                            "& .ql-picker": { color: "#111111" },
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
                          Tip: Click the image icon in toolbar to insert an image via URL
                        </Typography>
                      </Box>

                      <Divider />

                      {/* Actions */}
                      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                        <Button
                          variant="text"
                          startIcon={<Eye size={15} />}
                          onClick={() => setActiveTab("preview")}
                          sx={{ color: "#555555", "&:hover": { color: "#111111" } }}
                        >
                          Preview
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<RotateCcw size={15} />}
                          onClick={resetForm}
                          sx={{
                            color: "#555555",
                            borderColor: "#e5e7eb",
                            "&:hover": {
                              borderColor: "#111111",
                              backgroundColor: "#f3f4f6",
                              color: "#111111",
                            },
                          }}
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={publishing}
                          startIcon={
                            publishing ? (
                              <CircularProgress size={14} sx={{ color: "#111111" }} />
                            ) : (
                              <Send size={15} />
                            )
                          }
                          sx={{
                            backgroundColor: "#111111",
                            color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#333333",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                            },
                            "&:disabled": {
                              backgroundColor: "#e5e7eb",
                              color: "#9ca3af",
                            },
                          }}
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
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
                <Box>
                  <Typography variant="h5" fontWeight={700} color="text.primary">
                    All Blogs
                    <Chip
                      label={blogs.length}
                      size="small"
                      sx={{
                        ml: 1.5,
                        height: 22,
                        fontSize: 11,
                        bgcolor: "#f3f4f6",
                        color: "#374151",
                        border: "1px solid #e5e7eb",
                      }}
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
                  sx={{
                    borderColor: "#e5e7eb",
                    color: "#555555",
                    "&:hover": {
                      borderColor: "#111111",
                      color: "#111111",
                      backgroundColor: "#f3f4f6",
                    },
                  }}
                >
                  Refresh
                </Button>
              </Stack>

              {loadingBlogs ? (
                <Box display="flex" alignItems="center" gap={1.5} py={4} color="text.secondary">
                  <CircularProgress size={20} sx={{ color: "#111111" }} />
                  <Typography variant="body2">Loading blogs...</Typography>
                </Box>
              ) : blogs.length === 0 ? (
                <Box textAlign="center" py={8} color="text.secondary">
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 15,
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <LayoutList size={32} strokeWidth={1.5} color="#111111" />
                  </Box>
                  <Typography variant="body1" mb={2} color="text.secondary">No blogs published yet.</Typography>
                  <Button
                    variant="contained"
                    onClick={() => setActiveTab("write")}
                    startIcon={<PenLine size={15} />}
                    sx={{
                      backgroundColor: "#111111",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    }}
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
                        border: "1px solid #e5e7eb",
                        background: "#ffffff",
                        "&:hover": {
                          borderColor: "#111111",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <CardContent sx={{ p: "16px !important" }}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* Thumbnail */}
                          <CardMedia
                            component="img"
                            image={blog.thumbnail}
                            alt={blog.title}
                            sx={{
                              width: 100,
                              height: 70,
                              borderRadius: 2,
                              objectFit: "cover",
                              flexShrink: 0,
                              border: "1px solid #e5e7eb",
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />

                          {/* Info */}
                          <Box flex={1} minWidth={0}>
                            <Chip
                              label={blog.category}
                              size="small"
                              sx={{
                                height: 20,
                                fontSize: 10,
                                bgcolor: "#f3f4f6",
                                color: "#374151",
                                border: "1px solid #e5e7eb",
                                mb: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              noWrap
                              sx={{ mb: 0.5, color: "text.primary" }}
                            >
                              {blog.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {blog.author} &nbsp;·&nbsp; {formatDate(blog.createdAt)} &nbsp;·&nbsp; {blog.readTime}
                            </Typography>
                          </Box>

                          {/* Actions */}
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <FormControlLabel
                              control={
                                <Switch
                                  size="small"
                                  checked={blog.showTimestamp !== false}
                                  onChange={() => handleToggleTimestamp(blog.id, blog.showTimestamp !== false)}
                                  sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                      color: "#111111",
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                      backgroundColor: "#111111",
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography variant="caption" sx={{ fontSize: '10px', color: "text.secondary" }}>
                                  {blog.showTimestamp !== false ? "ON" : "OFF"}
                                </Typography>
                              }
                              sx={{ mr: 0.5 }}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(blog)}
                              title="Edit"
                              sx={{
                                color: "#555555",
                                "&:hover": { color: "#111111", backgroundColor: "#f3f4f6" },
                              }}
                            >
                              <Pencil size={16} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => window.open(`/blogs/${blog.id}`, "_blank")}
                              title="View"
                              sx={{
                                color: "#555555",
                                "&:hover": { color: "#059669", backgroundColor: "#d1fae5" },
                              }}
                            >
                              <ExternalLink size={16} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(blog.id, blog.title)}
                              disabled={deletingId === blog.id}
                              title="Delete"
                              sx={{
                                color: "#dc2626",
                                "&:hover": { color: "#b91c1c", backgroundColor: "#fee2e2" },
                              }}
                            >
                              {deletingId === blog.id ? (
                                <CircularProgress size={14} sx={{ color: "#dc2626" }} />
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
                  size="small"
                  startIcon={<ArrowLeft size={15} />}
                  onClick={() => setActiveTab("write")}
                  sx={{
                    color: "#555555",
                    "&:hover": { color: "#111111", backgroundColor: "#f3f4f6" },
                  }}
                >
                  Back to Edit
                </Button>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  Preview
                </Typography>
              </Stack>

              {!form.title ? (
                <Box textAlign="center" py={8} color="text.secondary">
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 15,
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                    }}
                  >
                    <Eye size={32} strokeWidth={1.5} color="#111111" />
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    Nothing to preview yet. Write a blog first.
                  </Typography>
                </Box>
              ) : (
                <Card elevation={0} sx={{ border: "1px solid #e5e7eb", overflow: "hidden", background: "#ffffff" }}>
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
                        bgcolor: "#f3f4f6",
                        color: "#374151",
                        border: "1px solid #e5e7eb",
                        mb: 1.5,
                      }}
                    />
                    <Typography variant="h5" fontWeight={800} mb={1} color="text.primary">
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
                          bgcolor: "#f3f4f6",
                          borderLeft: "4px solid #111111",
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
                        "& h1,h2,h3": { fontFamily: "'Inter',sans-serif", mb: 1, color: "text.primary" },
                        "& p": { lineHeight: 1.85, color: "text.secondary", mb: 1.2 },
                        "& ul,ol": { pl: 3, mb: 1.5 },
                        "& blockquote": { borderLeft: "4px solid #111111", pl: 2, color: "text.secondary", bgcolor: "#f3f4f6", py: 1 },
                        "& a": { color: "#111111" },
                      }}
                    >
                      <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{ __html: form.content }}
                        style={{ padding: 0, fontFamily: "'Inter',sans-serif", color: "#555555" }}
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
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default AdminBlog;
