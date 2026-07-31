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
  Skeleton,
  Collapse,
} from "@mui/material";
import { Save, ChevronDown, CheckCircle, Calendar, Sparkles, Check } from "lucide-react";
import { fetchPageContent, updatePageContent } from "../../../firebase/cmsFirebase";

const ACCENT = "#3b82f6";
const ACCENT_LIGHT = "#60a5fa";

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
    ],
  },
];

/* Reusable field styling with focus ring animation */
const fieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "#0f172a",
    bgcolor: "#f8fafc",
    transition: "all 0.3s ease",
    "& fieldset": {
      borderColor: "#e2e8f0",
      transition: "border-color 0.3s ease",
    },
    "&:hover fieldset": { borderColor: "#3b82f6" },
    "&.Mui-focused fieldset": { borderColor: ACCENT },
    "&.Mui-focused": { boxShadow: "0 0 0 3px rgba(59,130,246,0.12)" },
  },
};

const SixWeekPanel = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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
    setSaveSuccess(false);
    setMessage(null);
    try {
      await updatePageContent("six-week-training", formData);
      setMessage({ type: "success", text: "Content updated successfully!" });
      setSaveSuccess(true);
      setTimeout(() => {
        setMessage(null);
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error saving content:", error);
      setMessage({ type: "error", text: "Failed to update content." });
    } finally {
      setSaving(false);
    }
  };

  /* Shimmer loading state */
  if (loading) {
    return (
      <Box sx={{ maxWidth: 1000, mx: "auto", width: "100%", px: { xs: 2, sm: 0 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Skeleton variant="text" width={200} height={48} sx={{ bgcolor: "#f1f5f9" }} />
          <Skeleton variant="rounded" width={140} height={36} sx={{ bgcolor: "#f1f5f9", borderRadius: 1 }} />
        </Stack>
        <Stack spacing={4} direction={{ xs: "column", lg: "row" }}>
          <Box flex={1}>
            <Skeleton
              variant="rounded"
              height={300}
              sx={{
                bgcolor: "#f1f5f9",
                borderRadius: 3,
                "&::after": {
                  background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.05), transparent)",
                },
              }}
            />
          </Box>
          <Box flex={1}>
            <Skeleton
              variant="rounded"
              height={300}
              sx={{
                bgcolor: "#f1f5f9",
                borderRadius: 3,
                "&::after": {
                  background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.04), transparent)",
                },
              }}
            />
          </Box>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", width: "100%", px: { xs: 2, sm: 0 } }}>
      <style>{`
        @keyframes weekSavePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
        }
        @keyframes weekCheckPop {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header with icon and save button */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 4,
          gap: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Calendar size={24} color={ACCENT} />
          <Typography variant="h4" fontWeight={800} color="#0f172a">
            6-Week CMS
          </Typography>
        </Stack>
        <Button
          variant="contained"
          fullWidth={false}
          startIcon={
            saveSuccess ? (
              <Check size={18} style={{ animation: "weekCheckPop 0.4s ease forwards" }} />
            ) : saving ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <Save size={18} />
            )
          }
          onClick={handleSave}
          disabled={saving}
          sx={{
            fontWeight: 700,
            width: { xs: "100%", sm: "auto" },
            background: saveSuccess
              ? "linear-gradient(135deg, #10b981, #059669)"
              : "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "#ffffff",
            transition: "all 0.3s ease",
            animation: saving ? "weekSavePulse 1.5s ease-in-out infinite" : "none",
            "&:hover": {
              background: saveSuccess
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "linear-gradient(135deg, #2563eb, #1d4ed8)",
              boxShadow: "0 6px 20px rgba(59,130,246,0.35)",
              transform: "translateY(-1px)",
            },
          }}
        >
          {saveSuccess ? "Saved!" : saving ? "Saving..." : "Save Changes"}
        </Button>
      </Box>

      {/* Animated success/error message */}
      <Collapse in={!!message} timeout={300}>
        {message && (
          <Alert
            icon={message.type === "success" ? <CheckCircle size={20} /> : undefined}
            severity={message.type}
            sx={{
              mb: 4,
              borderRadius: "10px",
              fontWeight: 600,
              animation: "slideDown 0.3s ease",
              ...(message.type === "success" && {
                bgcolor: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.2)",
                color: "#6ee7b7",
              }),
              ...(message.type === "error" && {
                bgcolor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#fca5a5",
              }),
            }}
          >
            {message.text}
          </Alert>
        )}
      </Collapse>

      <Stack spacing={4} direction={{ xs: "column", lg: "row" }} alignItems="flex-start">
        {/* Left Side: Editor Form */}
        <Box flex={1} width="100%">
          {SECTIONS.map((section, index) => (
            <Accordion
              key={section.id}
              defaultExpanded={index === 0}
              sx={{
                bgcolor: "#ffffff",
                mb: 2,
                border: "1px solid #e2e8f0",
                "&:before": { display: "none" },
                borderRadius: "12px !important",
                overflow: "hidden",
                transition: "all 0.3s ease",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "#3b82f6",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown color={ACCENT} />}
                sx={{ bgcolor: "#f8fafc" }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Sparkles size={16} color={ACCENT} />
                  <Typography variant="h6" fontWeight={700} color="#0f172a" fontSize={15}>
                    {section.title}
                  </Typography>
                </Stack>
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
                      onChange={(e) =>
                        setFormData({ ...formData, [field.key]: e.target.value })
                      }
                      InputLabelProps={{ style: { color: "#94a3b8", fontWeight: 500 } }}
                      sx={fieldSx}
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
              bgcolor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              color: "#0f172a",
              transition: "all 0.3s ease",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                borderColor: "#3b82f6",
              },
            }}
          >
            <Typography
              variant="h6"
              fontWeight={600}
              mb={3}
              color={ACCENT}
              display="flex"
              alignItems="center"
              gap={1}
            >
              Live Preview{" "}
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: ACCENT,
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
            </Typography>

            {/* Hero Preview */}
            <Box mb={2}>
              <Typography
                sx={{
                  display: "inline-block",
                  color: ACCENT,
                  bgcolor: "rgba(59,130,246,0.06)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 5,
                  fontSize: "0.75rem",
                  mb: 2,
                  border: "1px solid rgba(59,130,246,0.12)",
                }}
              >
                {formData.badgeText || "Badge Text Goes Here"}
              </Typography>
              <Typography
                variant="h5"
                fontWeight={800}
                mb={2}
                lineHeight={1.3}
                sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
              >
                {formData.headingMain || "Main Heading"}{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #3b82f6, #2563eb)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {formData.headingGradient || "Gradient Word"}
                </span>{" "}
                {formData.headingEnd || "End Heading"}
              </Typography>
              <Typography color="#94a3b8" mb={3} fontSize="0.85rem" lineHeight={1.6}>
                {formData.description ||
                  "Description will appear here. Write a compelling summary to engage the user."}
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{ flexDirection: { xs: "column", sm: "row" }, gap: { xs: 1, sm: 0 } }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: ACCENT,
                    color: "#ffffff",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#2563eb" },
                  }}
                >
                  Talk To Us
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: ACCENT,
                    borderColor: "rgba(59,130,246,0.3)",
                    ml: { xs: "0 !important", sm: "16px !important" },
                  }}
                >
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
