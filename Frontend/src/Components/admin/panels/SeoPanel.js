import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Skeleton,
  Fade,
} from "@mui/material";
import {
  Save,
  RefreshCw,
  Search,
  Globe,
  Eye,
  BarChart3,
  Check,
} from "lucide-react";
import { fetchSeoMeta, updateSeoMeta } from "../../../firebase/cmsFirebase";

const ACCENT = "#3b82f6";
const ACCENT_LIGHT = "#60a5fa";

const PAGES = [
  { key: "home", label: "Home Page" },
  { key: "courses", label: "All Courses Page" },
  { key: "six-week", label: "Six Week Training Page" },
  { key: "six-month", label: "Six Month Training Page" },
  { key: "contact", label: "Contact Us Page" },
];

/* Character count status helper: returns color and label based on ratio */
const getCharStatus = (count, max) => {
  if (count === 0) return { color: "#475569", label: "", pct: 0 };
  const pct = Math.min((count / max) * 100, 120);
  if (count <= max * 0.75) return { color: "#10b981", label: "Good", pct };
  if (count <= max) return { color: "#facc15", label: "Getting long", pct };
  return { color: "#ef4444", label: "Too long", pct };
};

/* Reusable SEO field styling with focus ring animation */
const seoFieldSx = {
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
    fontWeight: 500,
    fontSize: "0.85rem",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#e2e8f0",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  },
  "& .MuiInputBase-input": { color: "#0f172a" },
  "& .MuiOutlinedInput-root": {
    bgcolor: "#f8fafc",
    transition: "all 0.3s ease",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3b82f6",
    },
    "&.Mui-focused": {
      boxShadow: "0 0 0 3px rgba(59,130,246,0.12)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${ACCENT} !important`,
    },
  },
};

/* Reusable section card styling with gradient left border and hover lift */
const seoCardSx = {
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  position: "relative",
  overflow: "visible",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 10,
    bottom: 10,
    width: "4px",
    background: "linear-gradient(to bottom, #3b82f6, #2563eb)",
    borderRadius: "0 4px 4px 0",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
    borderColor: "#3b82f6",
  },
};

const SeoPanel = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [data, setData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  const loadData = async (pageKey) => {
    setLoading(true);
    try {
      const fbData = await fetchSeoMeta(pageKey);
      if (fbData) {
        setData(fbData);
      } else {
        setData({ title: "", description: "" });
      }
    } catch (err) {
      console.error(err);
      setData({ title: "", description: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(selectedPage);
  }, [selectedPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      await updateSeoMeta(selectedPage, data);
      setSnack({
        open: true,
        msg: "SEO metadata saved successfully!",
        severity: "success",
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      setSnack({
        open: true,
        msg: "Failed to save SEO metadata.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const titleStatus = getCharStatus((data.title || "").length, 60);
  const descStatus = getCharStatus((data.description || "").length, 160);

  return (
    <Box maxWidth={800} sx={{ color: "#0f172a" }}>
      <style>{`
        @keyframes seoSavePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
        }
        @keyframes seoCheckPop {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>

      {/* Header with icon */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        mb={4}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
            <Search size={22} color={ACCENT} />
            <Typography variant="h5" fontWeight={700} color="#0f172a">
              SEO Manager
            </Typography>
          </Stack>
          <Typography variant="body2" color="#64748b">
            Manage title tags and meta descriptions for better search rankings.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={
            loading ? (
              <CircularProgress size={16} sx={{ color: ACCENT }} />
            ) : (
              <RefreshCw size={16} />
            )
          }
          onClick={() => loadData(selectedPage)}
          disabled={loading}
          sx={{
            borderColor: "#e2e8f0",
            color: "#64748b",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#3b82f6",
              color: "#3b82f6",
              backgroundColor: "rgba(59,130,246,0.04)",
            },
          }}
        >
          Refresh
        </Button>
      </Stack>

      {/* Page selector card with icon header */}
      <Card
        elevation={0}
        sx={{
          ...seoCardSx,
          mb: 4,
          "&::before": { display: "none" },
          "&:hover": {
            transform: "none",
            boxShadow: "none",
            borderColor: "#e2e8f0",
          },
        }}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
            <Globe size={18} color={ACCENT_LIGHT} />
            <Typography variant="subtitle1" fontWeight={600} color="#0f172a">
              Select Page
            </Typography>
          </Stack>
          <FormControl fullWidth size="small">
            <InputLabel id="page-select-label" sx={{ color: "#64748b" }}>
              Step 1: Select a Page to Edit
            </InputLabel>
            <Select
              labelId="page-select-label"
              value={selectedPage}
              label="Step 1: Select a Page to Edit"
              onChange={(e) => setSelectedPage(e.target.value)}
              sx={{
                color: "#0f172a",
                bgcolor: "#f8fafc",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e2e8f0",
                  transition: "all 0.3s ease",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: ACCENT,
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                  },
                },
              }}
            >
              {PAGES.map((page) => (
                <MenuItem
                  key={page.key}
                  value={page.key}
                  sx={{
                    color: "#0f172a",
                    "&:hover": { backgroundColor: "rgba(59,130,246,0.04)" },
                  }}
                >
                  {page.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Loading skeleton */}
      {loading ? (
        <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
          {[1, 2].map((i) => (
            <Box key={i} flex={1}>
              <Skeleton
                variant="rounded"
                height={320}
                sx={{
                  bgcolor: "#f1f5f9",
                  borderRadius: 2,
                  "&::after": {
                    background:
                      "linear-gradient(90deg, transparent, rgba(59,130,246,0.05), transparent)",
                  },
                }}
              />
            </Box>
          ))}
        </Stack>
      ) : (
        <Fade in timeout={400}>
          <form onSubmit={handleSave}>
            <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
              {/* Left: SEO Tags Editor */}
              <Box flex={1}>
                <Card elevation={0} sx={seoCardSx}>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={1}
                    >
                      <BarChart3 size={18} color={ACCENT_LIGHT} />
                      <Typography variant="h6" fontWeight={600} color="#0f172a">
                        Step 2: Update SEO Tags
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="#64748b" mb={3}>
                      These fields tell Google what your page is about.
                    </Typography>

                    <Stack spacing={3}>
                      {/* Title field with character count progress bar */}
                      <Box>
                        <TextField
                          label="Page Title (<title>)"
                          name="title"
                          value={data.title || ""}
                          onChange={handleChange}
                          fullWidth
                          size="small"
                          placeholder="e.g. Best Industrial Training in Chandigarh | Ziion"
                          sx={seoFieldSx}
                        />
                        <Box mt={0.75}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={0.5}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: titleStatus.color,
                                fontWeight: 600,
                                fontSize: "0.7rem",
                              }}
                            >
                              {(data.title || "").length}/60 characters
                              {titleStatus.label && ` · ${titleStatus.label}`}
                            </Typography>
                          </Stack>
                          <Box
                            sx={{
                              height: 3,
                              borderRadius: 2,
                              bgcolor: "#f1f5f9",
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              sx={{
                                height: "100%",
                                borderRadius: 2,
                                width: `${Math.min(titleStatus.pct, 100)}%`,
                                bgcolor: titleStatus.color,
                                transition: "all 0.4s ease",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>

                      {/* Description field with character count progress bar */}
                      <Box>
                        <TextField
                          label="Meta Description"
                          name="description"
                          value={data.description || ""}
                          onChange={handleChange}
                          fullWidth
                          multiline
                          rows={4}
                          placeholder="e.g. Join Ziion Technology for a 6-month industrial training program. Learn Web Dev, App Dev, AI, and more with 100% placement assistance."
                          sx={seoFieldSx}
                        />
                        <Box mt={0.75}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            mb={0.5}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                color: descStatus.color,
                                fontWeight: 600,
                                fontSize: "0.7rem",
                              }}
                            >
                              {(data.description || "").length}/160 characters
                              {descStatus.label && ` · ${descStatus.label}`}
                            </Typography>
                          </Stack>
                          <Box
                            sx={{
                              height: 3,
                              borderRadius: 2,
                              bgcolor: "#f1f5f9",
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              sx={{
                                height: "100%",
                                borderRadius: 2,
                                width: `${Math.min(descStatus.pct, 100)}%`,
                                bgcolor: descStatus.color,
                                transition: "all 0.4s ease",
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    </Stack>

                    {/* Save button with gradient, pulse, and checkmark */}
                    <Box mt={3} display="flex" justifyContent="flex-start">
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={saving}
                        startIcon={
                          saveSuccess ? (
                            <Check
                              size={18}
                              style={{
                                animation: "seoCheckPop 0.4s ease forwards",
                              }}
                            />
                          ) : saving ? (
                            <CircularProgress
                              size={18}
                              sx={{ color: "#ffffff" }}
                            />
                          ) : (
                            <Save size={18} />
                          )
                        }
                        sx={{
                          px: 4,
                          py: 1.2,
                          fontWeight: 700,
                          letterSpacing: "0.02em",
                          background: saveSuccess
                            ? "linear-gradient(135deg, #10b981, #059669)"
                            : "linear-gradient(135deg, #3b82f6, #2563eb)",
                          color: "#ffffff",
                          transition: "all 0.3s ease",
                          animation: saving
                            ? "seoSavePulse 1.5s ease-in-out infinite"
                            : "none",
                          "&:hover": {
                            background: saveSuccess
                              ? "linear-gradient(135deg, #10b981, #059669)"
                              : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                            boxShadow: "0 6px 20px rgba(59,130,246,0.4)",
                            transform: "translateY(-1px)",
                          },
                          "&:disabled": {
                            background: saveSuccess
                              ? "linear-gradient(135deg, #10b981, #059669)"
                              : "rgba(59,130,246,0.3)",
                            color: "#ffffff",
                          },
                        }}
                      >
                        {saveSuccess
                          ? "Saved!"
                          : saving
                            ? "Saving..."
                            : "Save SEO Settings"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>

              {/* Right: Live Google Search Preview */}
              <Box flex={1}>
                <Card elevation={0} sx={seoCardSx}>
                  <CardContent>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={1}
                    >
                      <Eye size={18} color={ACCENT_LIGHT} />
                      <Typography variant="h6" fontWeight={600} color="#0f172a">
                        Live Google Preview
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="#64748b" mb={3}>
                      This is how your page might look in Google search results.
                    </Typography>

                    {/* Enhanced Google preview card */}
                    <Box
                      sx={{
                        bgcolor: "#ffffff",
                        p: 2.5,
                        borderRadius: 2,
                        boxShadow:
                          "0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)",
                        fontFamily: "Arial, sans-serif",
                        transition: "box-shadow 0.3s ease",
                        "&:hover": {
                          boxShadow:
                            "0 12px 40px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#202124",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          mb: 0.5,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: "#f3f4f6",
                            marginRight: "10px",
                            backgroundImage: "url('/favicon.ico')",
                            backgroundSize: "cover",
                          }}
                        />
                        <span
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span>Ziion Technology</span>
                          <span style={{ color: "#4d5156", fontSize: "12px" }}>
                            https://mainliveziion.com ›{" "}
                            {selectedPage === "home" ? "" : selectedPage}
                          </span>
                        </span>
                      </Typography>

                      <Typography
                        variant="h3"
                        sx={{
                          color: "#1a0dab",
                          fontSize: "20px",
                          lineHeight: "1.3",
                          fontWeight: 400,
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                          mb: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {data.title || "Your Page Title Appears Here"}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#4d5156",
                          fontSize: "14px",
                          lineHeight: "1.58",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {data.description ||
                          "Write a compelling description to encourage people to click on your link. This snippet helps users understand what your page is about."}
                      </Typography>
                    </Box>

                    <Box
                      mt={3}
                      p={2}
                      sx={{
                        bgcolor: "rgba(59,130,246,0.04)",
                        border: "1px solid rgba(59,130,246,0.1)",
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="body2" color="#3b82f6">
                        <strong>Pro Tip:</strong> Include your target keywords
                        (like "Industrial Training in Chandigarh") naturally in
                        both the title and description to rank higher.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Stack>
          </form>
        </Fade>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SeoPanel;
