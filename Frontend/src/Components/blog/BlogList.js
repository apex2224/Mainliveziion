import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../head/Navbar";
import Footer from "../footer/Footer";
import { fetchAllBlogs } from "../../firebase/blogFirebase";

// MUI
import {
  Box,
  Container,
  Grid,
  Typography,
  Skeleton,
  Chip,
  InputAdornment,
  TextField,
  Avatar,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

// ── Theme ────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    primary: { main: "#2c52be" },
    background: { default: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#64748b" },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  shape: { borderRadius: 14 },
});

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// ── Blog Card ────────────────────────────────────────────────────
const BlogCard = ({ blog, onClick, featured = false }) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: "pointer",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid rgba(226,232,240,0.8)",
      bgcolor: "#fff",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
      "&:hover": {
        transform: "translateY(-6px)",
        boxShadow: "0 20px 48px rgba(44,82,190,0.13)",
        borderColor: "rgba(44,82,190,0.25)",
        "& .card-img": { transform: "scale(1.06)" },
        "& .read-more": { gap: "10px", color: "#2c52be" },
      },
    }}
  >
    {/* Image */}
    <Box sx={{ overflow: "hidden", height: featured ? 280 : 210, flexShrink: 0 }}>
      <Box
        component="img"
        className="card-img"
        src={blog.thumbnail}
        alt={blog.title}
        loading="lazy"
        onError={(e) =>
          (e.target.src =
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop")
        }
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.45s ease",
        }}
      />
    </Box>

    {/* Body */}
    <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Chip
        label={blog.category || "General"}
        size="small"
        sx={{
          alignSelf: "flex-start",
          mb: 1.5,
          fontSize: "0.68rem",
          fontWeight: 700,
          height: 22,
          bgcolor: "rgba(44,82,190,0.08)",
          color: "#2c52be",
          letterSpacing: "0.3px",
        }}
      />

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: featured ? "1.25rem" : "1rem",
          lineHeight: 1.45,
          color: "#0f172a",
          mb: 1,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          transition: "color 0.2s",
        }}
      >
        {blog.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#64748b",
          fontSize: "0.85rem",
          lineHeight: 1.65,
          mb: 2,
          display: "-webkit-box",
          WebkitLineClamp: featured ? 3 : 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flexGrow: 1,
        }}
      >
        {blog.excerpt || blog.content?.substring(0, 130) + "..."}
      </Typography>

      {/* Footer */}
      <Box
        sx={{
          pt: 2,
          borderTop: "1px solid rgba(226,232,240,0.7)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              fontSize: "0.7rem",
              fontWeight: 700,
              bgcolor: "#2c52be",
            }}
          >
            {blog.author?.[0]}
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 600, color: "#374151", lineHeight: 1.2 }}>
              {blog.author}
            </Typography>
            {blog.showTimestamp !== false && (
              <Box sx={{ display: "flex", gap: 0.8, alignItems: "center" }}>
                <CalendarTodayIcon sx={{ fontSize: "0.6rem", color: "#9ca3af" }} />
                <Typography sx={{ fontSize: "0.65rem", color: "#9ca3af" }}>
                  {fmtDate(blog.createdAt)}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          className="read-more"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
            fontWeight: 700,
            color: "#94a3b8",
            transition: "all 0.25s ease",
          }}
        >
          <AccessTimeIcon sx={{ fontSize: "0.85rem" }} />
          {blog.readTime}
        </Box>
      </Box>
    </Box>
  </Box>
);

// ── Skeleton Card ────────────────────────────────────────────────
const SkeletonCard = () => (
  <Box sx={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(226,232,240,0.7)" }}>
    <Skeleton variant="rectangular" height={210} />
    <Box sx={{ p: 2.5 }}>
      <Skeleton width="30%" height={22} sx={{ mb: 1.5, borderRadius: "50px" }} />
      <Skeleton height={20} />
      <Skeleton height={20} width="75%" sx={{ mb: 1.5 }} />
      <Skeleton height={14} />
      <Skeleton height={14} width="85%" sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", gap: 1, mt: 2, pt: 1.5, borderTop: "1px solid #f1f5f9" }}>
        <Skeleton variant="circular" width={28} height={28} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton height={12} width="40%" />
          <Skeleton height={10} width="30%" />
        </Box>
      </Box>
    </Box>
  </Box>
);

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════
const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch { /* ignore */ }
      finally { setLoading(false); }
    })();
    window.scrollTo(0, 0);
  }, []);

  // Unique categories
  const categories = useMemo(() => {
    const cats = blogs.map((b) => b.category).filter(Boolean);
    return ["All", ...Array.from(new Set(cats))];
  }, [blogs]);

  // Filtered blogs
  const filtered = useMemo(() => {
    return blogs.filter((b) => {
      const matchCat = activeCategory === "All" || b.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [blogs, search, activeCategory]);

  const [featured, ...rest] = filtered;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
        <Navbar />

        {/* ════ HERO BANNER ════ */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #1e40af 100%)",
            pt: { xs: 16, md: 18 },
            pb: { xs: 8, md: 10 },
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-40%",
              right: "-10%",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,130,43,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-30%",
              left: "-5%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(44,82,190,0.3) 0%, transparent 70%)",
              pointerEvents: "none",
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="overline"
              sx={{ color: "rgba(255,130,43,0.9)", fontWeight: 700, letterSpacing: "2px", mb: 1, display: "block" }}
            >
              Knowledge Hub
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontSize: { xs: "2rem", md: "3rem" },
                lineHeight: 1.2,
                mb: 2,
                letterSpacing: "-1px",
              }}
            >
              Our{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #ff822b, #fbbf24)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Blog
              </Box>
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", maxWidth: 520, mb: 4 }}
            >
              Insights, tutorials, and stories from our learning community — written by our instructors and students.
            </Typography>

            {/* Search */}
            <TextField
              fullWidth
              placeholder="Search articles, topics, authors…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: 560,
                "& .MuiOutlinedInput-root": {
                  bgcolor: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "12px",
                  color: "#fff",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.18)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.35)" },
                  "&.Mui-focused fieldset": { borderColor: "rgba(255,130,43,0.6)" },
                },
                "& input::placeholder": { color: "rgba(255,255,255,0.45)" },
              }}
            />
          </Container>
        </Box>

        {/* Curved divider */}
        <Box sx={{ overflow: "hidden", mt: "-2px", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: "block" }}>
            <path d="M0,60 C360,0 1080,0 1440,60 L1440,0 L0,0 Z" fill="#1e40af" />
          </svg>
        </Box>

        {/* ════ MAIN CONTENT ════ */}
        <Container maxWidth="lg" sx={{ pt: 5, pb: 10, flexGrow: 1 }}>

          {/* Category filters */}
          {!loading && categories.length > 1 && (
            <Fade in>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 5 }}>
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => setActiveCategory(cat)}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      borderRadius: "8px",
                      px: 0.5,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      bgcolor: activeCategory === cat ? "#2c52be" : "rgba(44,82,190,0.07)",
                      color: activeCategory === cat ? "#fff" : "#2c52be",
                      "&:hover": {
                        bgcolor: activeCategory === cat ? "#1e3a8a" : "rgba(44,82,190,0.14)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  />
                ))}
                {/* Count */}
                {!loading && (
                  <Typography
                    variant="caption"
                    sx={{ ml: "auto", alignSelf: "center", color: "#94a3b8", fontWeight: 500 }}
                  >
                    {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                  </Typography>
                )}
              </Box>
            </Fade>
          )}

          {/* Loading skeletons */}
          {loading && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <SkeletonCard />
              </Grid>
              <Grid item xs={12} md={4}>
                <SkeletonCard />
              </Grid>
              {[1, 2, 3].map((i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <SkeletonCard />
                </Grid>
              ))}
            </Grid>
          )}

          {/* Featured (first) blog — bigger */}
          {!loading && featured && (
            <Fade in timeout={400}>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={8}>
                  <BlogCard blog={featured} onClick={() => navigate(`/blogs/${featured.id}`)} featured />
                </Grid>
                {rest[0] && (
                  <Grid item xs={12} md={4}>
                    <BlogCard blog={rest[0]} onClick={() => navigate(`/blogs/${rest[0].id}`)} />
                  </Grid>
                )}
              </Grid>
            </Fade>
          )}

          {/* Rest of blogs */}
          {!loading && rest.length > 1 && (
            <Fade in timeout={600}>
              <Grid container spacing={3}>
                {rest.slice(1).map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog.id}>
                    <BlogCard blog={blog} onClick={() => navigate(`/blogs/${blog.id}`)} />
                  </Grid>
                ))}
              </Grid>
            </Fade>
          )}

          {/* Empty / no results */}
          {!loading && filtered.length === 0 && (
            <Box
              textAlign="center"
              py={14}
              sx={{
                bgcolor: "rgba(44,82,190,0.03)",
                borderRadius: "20px",
                border: "1px dashed rgba(44,82,190,0.15)",
              }}
            >
              <Typography fontSize="2.5rem" mb={1}>📭</Typography>
              <Typography fontWeight={700} fontSize="1.15rem" color="#0f172a" mb={0.5}>
                {search ? "No articles found" : "No articles yet"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {search
                  ? `Try a different keyword or browse all categories.`
                  : "Check back soon — articles coming shortly."}
              </Typography>
              {search && (
                <Chip
                  label="Clear search"
                  onClick={() => setSearch("")}
                  sx={{ mt: 2, cursor: "pointer", bgcolor: "#2c52be", color: "#fff", fontWeight: 600 }}
                />
              )}
            </Box>
          )}

          {/* View more CTA at bottom */}
          {!loading && filtered.length > 0 && (
            <Box textAlign="center" mt={8}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 4,
                  py: 1.5,
                  borderRadius: "10px",
                  border: "2px solid",
                  borderColor: alpha("#2c52be", 0.25),
                  color: "#2c52be",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "default",
                  bgcolor: alpha("#2c52be", 0.04),
                }}
              >
                <ArrowForwardIcon fontSize="small" />
                Showing all {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </Box>
            </Box>
          )}
        </Container>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default BlogList;
