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
} from "@mui/material";
import { Save, RefreshCw } from "lucide-react";
import { fetchSeoMeta, updateSeoMeta } from "../../../firebase/cmsFirebase";

const PAGES = [
  { key: "home", label: "Home Page" },
  { key: "courses", label: "All Courses Page" },
  { key: "six-week", label: "Six Week Training Page" },
  { key: "six-month", label: "Six Month Training Page" },
  { key: "contact", label: "Contact Us Page" },
];

const SeoPanel = () => {
  const [selectedPage, setSelectedPage] = useState("home");
  const [data, setData] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

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
    try {
      await updateSeoMeta(selectedPage, data);
      setSnack({ open: true, msg: "SEO metadata saved successfully!", severity: "success" });
    } catch (error) {
      setSnack({ open: true, msg: "Failed to save SEO metadata.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box maxWidth={800} sx={{ color: "#f1f5f9" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={4}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="#f1f5f9" mb={0.5}>
            SEO Manager
          </Typography>
          <Typography variant="body2" color="#64748b">
            Manage title tags and meta descriptions for better search rankings.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={loading ? <CircularProgress size={16} sx={{ color: "#facc15" }} /> : <RefreshCw size={16} />}
          onClick={() => loadData(selectedPage)}
          disabled={loading}
          sx={{
            borderColor: "rgba(250,204,21,0.3)",
            color: "#94a3b8",
            "&:hover": {
              borderColor: "#facc15",
              color: "#fde047",
              backgroundColor: "rgba(250,204,21,0.1)",
            },
          }}
        >
          Refresh
        </Button>
      </Stack>

      <Card elevation={0} sx={{ border: "1px solid rgba(250,204,21,0.2)", mb: 4, background: "rgba(18,18,18,0.6)" }}>
        <CardContent>
          <FormControl fullWidth size="small">
            <InputLabel id="page-select-label" sx={{ color: "#64748b" }}>Step 1: Select a Page to Edit</InputLabel>
            <Select
              labelId="page-select-label"
              value={selectedPage}
              label="Step 1: Select a Page to Edit"
              onChange={(e) => setSelectedPage(e.target.value)}
              sx={{
                color: "#f1f5f9",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(250,204,21,0.3)" },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "#121212",
                    border: "1px solid rgba(250,204,21,0.2)",
                  },
                },
              }}
            >
              {PAGES.map((page) => (
                <MenuItem key={page.key} value={page.key} sx={{ color: "#f1f5f9", "&:hover": { backgroundColor: "rgba(250,204,21,0.1)" } }}>
                  {page.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {!loading && (
        <form onSubmit={handleSave}>
          <Stack spacing={4} direction={{ xs: "column", md: "row" }}>
            <Box flex={1}>
              <Card elevation={0} sx={{ border: "1px solid rgba(250,204,21,0.2)", background: "rgba(18,18,18,0.6)", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={1} color="#facc15">
                    Step 2: Update SEO Tags
                  </Typography>
                  <Typography variant="body2" color="#64748b" mb={3}>
                    These fields tell Google what your page is about.
                  </Typography>
                  
                  <Stack spacing={3}>
                    <TextField
                      label="Page Title (<title>)"
                      name="title"
                      value={data.title || ""}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      placeholder="e.g. Best Industrial Training in Chandigarh | Ziion"
                      helperText={`${(data.title || "").length}/60 characters. This appears as the big blue link on Google.`}
                      FormHelperTextProps={{
                        sx: {
                          color: (data.title || "").length > 60 ? "#f87171" : "#64748b",
                          "&.Mui-error": { color: "#f87171" },
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": { color: "#64748b" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(250,204,21,0.3)" },
                        "& .MuiInputBase-input": { color: "#f1f5f9" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(250,204,21,0.5)" },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#facc15 !important" },
                      }}
                    />
                    <TextField
                      label="Meta Description"
                      name="description"
                      value={data.description || ""}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="e.g. Join Ziion Technology for a 6-month industrial training program. Learn Web Dev, App Dev, AI, and more with 100% placement assistance."
                      helperText={`${(data.description || "").length}/160 characters. This is the short summary shown under the link on Google.`}
                      FormHelperTextProps={{
                        sx: {
                          color: (data.description || "").length > 160 ? "#f87171" : "#64748b",
                        },
                      }}
                      sx={{
                        "& .MuiInputLabel-root": { color: "#64748b" },
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(250,204,21,0.3)" },
                        "& .MuiInputBase-input": { color: "#f1f5f9" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(250,204,21,0.5)" },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#facc15 !important" },
                      }}
                    />
                  </Stack>
                  <Box mt={3} display="flex" justifyContent="flex-start">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={saving}
                      startIcon={saving ? <CircularProgress size={18} sx={{ color: "#0a0a0a" }} /> : <Save size={18} />}
                      sx={{
                        px: 4,
                        py: 1.2,
                        bgcolor: "#facc15",
                        color: "#0a0a0a",
                        fontWeight: "bold",
                        "&:hover": {
                          bgcolor: "#fbbf24",
                          boxShadow: "0 6px 20px rgba(250,204,21,0.4)",
                        },
                        "&:disabled": {
                          bgcolor: "rgba(250,204,21,0.3)",
                        },
                      }}
                    >
                      {saving ? "Saving..." : "Save SEO Settings"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Live Google Search Preview */}
            <Box flex={1}>
              <Card elevation={0} sx={{ border: "1px solid rgba(250,204,21,0.2)", background: "rgba(18,18,18,0.6)", height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={1} color="#facc15">
                    Live Google Preview
                  </Typography>
                  <Typography variant="body2" color="#64748b" mb={3}>
                    This is how your page might look in Google search results.
                  </Typography>
                  
                  <Box sx={{ 
                    bgcolor: "#ffffff", 
                    p: 2, 
                    borderRadius: 2, 
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    fontFamily: "Arial, sans-serif" 
                  }}>
                    <Typography variant="body2" sx={{ color: "#202124", fontSize: "14px", display: "flex", alignItems: "center", mb: 0.5 }}>
                      <span style={{ 
                        display: "inline-block", 
                        width: "28px", 
                        height: "28px", 
                        borderRadius: "50%", 
                        backgroundColor: "#f3f4f6", 
                        marginRight: "10px",
                        backgroundImage: "url('/favicon.ico')",
                        backgroundSize: "cover"
                      }}></span>
                      <span style={{ display: "flex", flexDirection: "column" }}>
                        <span>Ziion Technology</span>
                        <span style={{ color: "#4d5156", fontSize: "12px" }}>https://mainliveziion.com › {selectedPage === "home" ? "" : selectedPage}</span>
                      </span>
                    </Typography>
                    
                    <Typography variant="h3" sx={{ 
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
                      WebkitBoxOrient: "vertical"
                    }}>
                      {data.title || "Your Page Title Appears Here"}
                    </Typography>
                    
                    <Typography variant="body2" sx={{ 
                      color: "#4d5156", 
                      fontSize: "14px", 
                      lineHeight: "1.58",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical"
                    }}>
                      {data.description || "Write a compelling description to encourage people to click on your link. This snippet helps users understand what your page is about."}
                    </Typography>
                  </Box>
                  
                  <Box mt={3} p={2} sx={{ bgcolor: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 2 }}>
                     <Typography variant="body2" color="#a5b4fc">
                        <strong>Pro Tip:</strong> Include your target keywords (like "Industrial Training in Chandigarh") naturally in both the title and description to rank higher.
                     </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </form>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack((p) => ({ ...p, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} sx={{ width: "100%", borderRadius: 2, boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SeoPanel;
