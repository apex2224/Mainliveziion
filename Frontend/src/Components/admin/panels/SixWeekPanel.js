import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Save, ChevronDown, CheckCircle } from "lucide-react";
import { fetchPageContent, updatePageContent } from "../../../firebase/cmsFirebase";

const SECTIONS = [
  {
    id: "hero",
    title: "Landing Page Section",
    fields: [
      { key: "badgeText", label: "Badge Text", type: "text" },
      { key: "headingMain", label: "Main Heading", type: "text" },
      { key: "headingGradient", label: "Gradient Heading", type: "text" },
      { key: "headingEnd", label: "End Heading", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ]
  }
];

const SixWeekPanel = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await fetchPageContent("six-week-training");
        if (data) {
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await updatePageContent("six-week-training", formData);
      setMessage({ type: "success", text: "Content updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error saving content:", error);
      setMessage({ type: "error", text: "Failed to update content." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress sx={{ color: "#facc15" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", width: "100%", px: { xs: 2, sm: 0 } }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" }, mb: 4, gap: 2 }}>
        <Typography variant="h4" fontWeight={800} color="#fff">
          6-Week CMS
        </Typography>
        <Button
          variant="contained"
          fullWidth={false}
          startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <Save size={18} />}
          onClick={handleSave}
          disabled={saving}
          sx={{
            bgcolor: "#facc15",
            color: "#0a0a0a",
            fontWeight: 700,
            width: { xs: "100%", sm: "auto" },
            "&:hover": { bgcolor: "#fbbf24" },
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      {message && (
        <Alert
          icon={message.type === "success" ? <CheckCircle size={20} /> : undefined}
          severity={message.type}
          sx={{ mb: 4, borderRadius: "10px", fontWeight: 600 }}
        >
          {message.text}
        </Alert>
      )}

      <Stack spacing={4} direction={{ xs: "column", lg: "row" }} alignItems="flex-start">
        {/* Left Side: Editor Form */}
        <Box flex={1} width="100%">
          {SECTIONS.map((section, index) => (
            <Accordion
              key={section.id}
              defaultExpanded={index === 0}
              sx={{
                bgcolor: "#121212",
                mb: 2,
                border: "1px solid rgba(250,204,21,0.1)",
                "&:before": { display: "none" },
                borderRadius: "12px !important",
                overflow: "hidden",
              }}
            >
              <AccordionSummary expandIcon={<ChevronDown color="#facc15" />} sx={{ bgcolor: "rgba(250,204,21,0.03)" }}>
                <Typography variant="h6" fontWeight={700} color="#cbd5e1" fontSize={15}>
                  {section.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: { xs: 2, sm: 3 } }}>
                <Stack spacing={3}>
                  {section.fields.map((field) => (
                    <TextField
                      key={field.key}
                      label={field.label}
                      variant="outlined"
                      fullWidth
                      multiline={field.type === "textarea"}
                      rows={field.type === "textarea" ? 4 : 1}
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      InputLabelProps={{ style: { color: "#94a3b8" } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          color: "#fff",
                          bgcolor: "rgba(255,255,255,0.02)",
                          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                          "&:hover fieldset": { borderColor: "rgba(250,204,21,0.3)" },
                          "&.Mui-focused fieldset": { borderColor: "#facc15" },
                        },
                      }}
                    />
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Right Side: Live Preview */}
        <Box flex={1} width="100%" sx={{ position: "sticky", top: 20 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 4 },
              bgcolor: "#050505",
              border: "1px solid rgba(250,204,21,0.2)",
              borderRadius: "16px",
              color: "#fff",
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={3} color="#facc15" display="flex" alignItems="center" gap={1}>
              Live Preview <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#facc15", display: "inline-block", animation: "pulse 2s infinite" }} />
            </Typography>

            {/* Hero Preview */}
            <Box mb={2}>
              <Typography
                sx={{
                  display: "inline-block",
                  color: "#facc15",
                  bgcolor: "rgba(250,204,21,0.1)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 5,
                  fontSize: "0.75rem",
                  mb: 2,
                  border: "1px solid rgba(250,204,21,0.2)",
                }}
              >
                {formData.badgeText || "Badge Text Goes Here"}
              </Typography>
              <Typography variant="h5" fontWeight={800} mb={2} lineHeight={1.3} sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                {formData.headingMain || "Main Heading"}{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #facc15, #fb923c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {formData.headingGradient || "Gradient Word"}
                </span>{" "}
                {formData.headingEnd || "End Heading"}
              </Typography>
              <Typography color="#94a3b8" mb={3} fontSize="0.85rem" lineHeight={1.6}>
                {formData.description || "Description will appear here. Write a compelling summary to engage the user."}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 0 } }}>
                <Button variant="contained" size="small" sx={{ bgcolor: "#facc15", color: "#000", fontWeight: "bold", "&:hover": { bgcolor: "#facc15" } }}>
                  Talk To Us
                </Button>
                <Button variant="outlined" size="small" sx={{ color: "#facc15", borderColor: "rgba(250,204,21,0.5)", ml: { xs: "0 !important", sm: "16px !important" } }}>
                  Get a DEMO
                </Button>
              </Stack>
            </Box>

            <style>
              {`
                @keyframes pulse {
                  0% { opacity: 1; }
                  50% { opacity: 0.4; }
                  100% { opacity: 1; }
                }
              `}
            </style>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default SixWeekPanel;
