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
} from "@mui/material";
import { Save, RefreshCw, Plus, Trash2 } from "lucide-react";
import { fetchPageContent, updatePageContent } from "../../../firebase/cmsFirebase";
import { IconButton } from "@mui/material";
import CoursesCard from "../../allCourses/CoursesCard";

const DEFAULT_COURSES_DATA = {
  heroBadge: "Professional Training",
  heroTitle: "All Courses",
  heroSubtitle:
    "Explore a wide range of technology courses designed to help you gain in-demand skills, from Web Development and Data Science to AI, Cloud Computing, and more.",
  stats: [
    { label: "10 Active Courses", dot: true },
    { label: "Expert Instructors", dot: false },
    { label: "Hands-on Projects", dot: false },
  ],
  sectionTitle: "Browse All Courses",
  sectionSubtitle:
    "Choose from our comprehensive curriculum and start your learning journey today",
  ctaTitle: "Ready to Start Learning?",
  ctaSubtitle:
    "Join thousands of students advancing their careers with our expert-led courses",
  ctaButtonText: "Get Started Today",
  coursesList: [
    { id: 1, route: "data-science", title: "Data Science", description: "Master data manipulation, statistical analysis, and predictive modeling techniques.", color: "#3B82F6", imageKey: "DataScience" },
    { id: 2, route: "web-development", title: "Web Development", description: "Build modern, responsive websites with frontend, backend, and fullstack technologies.", color: "#8B5CF6", imageKey: "WebDevelopment" },
    { id: 3, route: "web-designing", title: "Web Designing", description: "Create stunning user experiences with UI/UX design principles and tools.", color: "#F59E0B", imageKey: "WebDevelopment" },
    { id: 4, route: "digital-marketing", title: "Digital Marketing", description: "Master SEO, social media advertising, campaign analytics, and growth strategies.", color: "#10B981", imageKey: "DataAnalytics" },
    { id: 5, route: "ai", title: "Artificial Intelligence", description: "Explore neural networks, deep learning, and cutting-edge AI applications.", color: "#EF4444", imageKey: "AI" },
    { id: 6, route: "ml", title: "Machine Learning", description: "Build intelligent systems with supervised, unsupervised, and reinforcement learning.", color: "#EC4899", imageKey: "ML" },
    { id: 7, route: "data-analytics", title: "Data Analytics", description: "Transform raw data into actionable insights with powerful analytics tools.", color: "#F97316", imageKey: "DataAnalytics" },
    { id: 8, route: "mobileapp", title: "Mobile App Development", description: "Create native and cross-platform mobile applications for iOS and Android.", color: "#06B6D4", imageKey: "MobileAppDevelopment" },
    { id: 9, route: "php", title: "PHP Development", description: "Master server-side scripting and build dynamic web applications with PHP.", color: "#7C3AED", imageKey: "PHP" },
    { id: 10, route: "graphic", title: "Graphic Designing", description: "Master visual communication through branding, illustration, and digital design.", color: "#DB2777", imageKey: "DataAnalytics" },
  ],
};

const CoursesPanel = () => {
  const [data, setData] = useState(DEFAULT_COURSES_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  const loadData = async () => {
    setLoading(true);
    try {
      const fbData = await fetchPageContent("courses-page");
      if (fbData) {
        setData((prev) => ({ ...prev, ...fbData }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...data.coursesList];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setData((prev) => ({ ...prev, coursesList: updatedCourses }));
  };

  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      title: "New Course",
      description: "Course description here",
      route: "new-course",
      color: "#3B82F6",
      imageKey: "WebDevelopment",
    };
    setData((prev) => ({ ...prev, coursesList: [...(prev.coursesList || []), newCourse] }));
  };

  const removeCourse = (index) => {
    const updatedCourses = [...data.coursesList];
    updatedCourses.splice(index, 1);
    setData((prev) => ({ ...prev, coursesList: updatedCourses }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePageContent("courses-page", data);
      setSnack({ open: true, msg: "Content saved successfully!", severity: "success" });
    } catch (error) {
      setSnack({ open: true, msg: "Failed to save content.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        p={4}
        sx={{
          minHeight: "400px",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
          color: "#64748b",
        }}
      >
        <CircularProgress size={24} sx={{ color: "#6366f1" }} />
        <Typography>Loading Courses CMS...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 4, height: "calc(100vh - 100px)", color: "#f1f5f9" }}>
      <Box sx={{ flex: 1, overflowY: "auto", pr: 2, pb: 4, maxWidth: "600px" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={4}>
          <Box>
          <Typography variant="h5" fontWeight={700} color="#f1f5f9" mb={0.5}>
            Courses Page Content
          </Typography>
          <Typography variant="body2" color="#64748b">
            Manage text, headings, and CTA sections of the /allcourses page.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<RefreshCw size={16} />}
          onClick={loadData}
          sx={{
            borderColor: "rgba(99,102,241,0.3)",
            color: "#94a3b8",
            "&:hover": {
              borderColor: "#6366f1",
              color: "#a5b4fc",
              backgroundColor: "rgba(99,102,241,0.1)",
            },
          }}
        >
          Refresh
        </Button>
      </Stack>

      <form onSubmit={handleSave}>
        <Stack spacing={4}>
          {/* Hero Section */}
          <Card elevation={0} sx={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(26,26,46,0.6)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2} color="#f1f5f9">
                Hero Section
              </Typography>
              <Stack spacing={2.5}>
                <TextField
                  label="Hero Badge Text"
                  name="heroBadge"
                  value={data.heroBadge}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
                <TextField
                  label="Hero Title (H1)"
                  name="heroTitle"
                  value={data.heroTitle}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
                <TextField
                  label="Hero Subtitle"
                  name="heroSubtitle"
                  value={data.heroSubtitle}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Grid Section Header */}
          <Card elevation={0} sx={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(26,26,46,0.6)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2} color="#f1f5f9">
                Course Grid Header
              </Typography>
              <Stack spacing={2.5}>
                <TextField
                  label="Section Title"
                  name="sectionTitle"
                  value={data.sectionTitle}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
                <TextField
                  label="Section Subtitle"
                  name="sectionSubtitle"
                  value={data.sectionSubtitle}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card elevation={0} sx={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(26,26,46,0.6)" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2} color="#f1f5f9">
                Bottom CTA Section
              </Typography>
              <Stack spacing={2.5}>
                <TextField
                  label="CTA Title"
                  name="ctaTitle"
                  value={data.ctaTitle}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
                <TextField
                  label="CTA Subtitle"
                  name="ctaSubtitle"
                  value={data.ctaSubtitle}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
                <TextField
                  label="Button Text"
                  name="ctaButtonText"
                  value={data.ctaButtonText}
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#64748b" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                    "& .MuiInputBase-input": { color: "#f1f5f9" },
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Manage Courses List */}
          <Card elevation={0} sx={{ border: "1px solid rgba(99,102,241,0.2)", background: "rgba(26,26,46,0.6)" }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600} color="#f1f5f9">Individual Courses</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Plus size={16} />}
                  onClick={addCourse}
                  sx={{
                    borderColor: "rgba(99,102,241,0.3)",
                    color: "#94a3b8",
                    "&:hover": {
                      borderColor: "#6366f1",
                      color: "#a5b4fc",
                      backgroundColor: "rgba(99,102,241,0.15)",
                    },
                  }}
                >
                  Add Course
                </Button>
              </Stack>

              <Stack spacing={3}>
                {(data.coursesList || []).map((course, idx) => (
                  <Box
                    key={course.id || idx}
                    sx={{
                      p: 2.5,
                      border: "1px solid rgba(99,102,241,0.2)",
                      borderRadius: 2,
                      position: "relative",
                      background: "rgba(15,15,35,0.4)",
                      "&:hover": {
                        borderColor: "#6366f1",
                        boxShadow: "0 4px 12px rgba(99,102,241,0.1)",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeCourse(idx)}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "#f87171",
                        "&:hover": {
                          color: "#fca5a5",
                          backgroundColor: "rgba(248,113,113,0.1)",
                        },
                      }}
                    >
                      <Trash2 size={16} />
                    </IconButton>
                    <Typography variant="subtitle2" color="#a5b4fc" mb={2} fontWeight={600}>
                      Course #{idx + 1}
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2}>
                        <TextField
                          label="Course Title"
                          value={course.title}
                          onChange={(e) => handleCourseChange(idx, "title", e.target.value)}
                          fullWidth
                          size="small"
                          sx={{
                            "& .MuiInputLabel-root": { color: "#64748b" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                            "& .MuiInputBase-input": { color: "#f1f5f9" },
                          }}
                        />
                        <TextField
                          label="URL Route (e.g. data-science)"
                          value={course.route}
                          onChange={(e) => handleCourseChange(idx, "route", e.target.value)}
                          fullWidth
                          size="small"
                          sx={{
                            "& .MuiInputLabel-root": { color: "#64748b" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                            "& .MuiInputBase-input": { color: "#f1f5f9" },
                          }}
                        />
                      </Stack>
                      <TextField
                        label="Description"
                        value={course.description}
                        onChange={(e) => handleCourseChange(idx, "description", e.target.value)}
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        sx={{
                          "& .MuiInputLabel-root": { color: "#64748b" },
                          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                          "& .MuiInputBase-input": { color: "#f1f5f9" },
                        }}
                      />
                      <Stack direction="row" spacing={2}>
                        <TextField
                          label="Color Hex (e.g. #3B82F6)"
                          value={course.color}
                          onChange={(e) => handleCourseChange(idx, "color", e.target.value)}
                          fullWidth
                          size="small"
                          sx={{
                            "& .MuiInputLabel-root": { color: "#64748b" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                            "& .MuiInputBase-input": { color: "#f1f5f9" },
                          }}
                        />
                        <TextField
                          label="Image Key (e.g. DataScience, WebDevelopment)"
                          value={course.imageKey}
                          onChange={(e) => handleCourseChange(idx, "imageKey", e.target.value)}
                          fullWidth
                          size="small"
                          sx={{
                            "& .MuiInputLabel-root": { color: "#64748b" },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(99,102,241,0.3)" },
                            "& .MuiInputBase-input": { color: "#f1f5f9" },
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              disabled={saving}
              startIcon={saving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : <Save size={18} />}
              sx={{
                px: 4,
                py: 1.2,
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(99,102,241,0.4)",
                },
                "&:disabled": {
                  background: "rgba(99,102,241,0.3)",
                },
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </Stack>
      </form>

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

      {/* Right Column: Live Preview */}
      <Box sx={{ flex: 1.2, borderLeft: "1px solid rgba(99,102,241,0.2)", pl: 4, overflowY: "auto", pb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Typography variant="h6" fontWeight={600} color="#a5b4fc">
            Live Preview
          </Typography>
          <Box sx={{ px: 1.5, py: 0.5, borderRadius: 1, backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10B981", fontSize: "0.75rem", fontWeight: 600 }}>
            Updates as you type
          </Box>
        </Stack>
        <Box
          sx={{
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#fff",
            position: "relative",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            maxHeight: "80vh",
            overflowY: "auto"
          }}
        >
          <CoursesCard previewData={data} isPreview={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default CoursesPanel;
