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
  Chip,
  Skeleton,
  Fade,
  IconButton,
} from "@mui/material";
import { Save, RefreshCw, Plus, Trash2, BookOpen, Layout, Layers, Sparkles, Check, Zap } from "lucide-react";
import { fetchPageContent, updatePageContent } from "../../../firebase/cmsFirebase";
import CoursesCard from "../../allCourses/CoursesCard";

const ACCENT = "#3b82f6";
const ACCENT_LIGHT = "#60a5fa";
const ACCENT_GRADIENT = "linear-gradient(135deg, #3b82f6, #2563eb)";

const CATEGORY_MAP = {
  DataScience: "Data Science",
  WebDevelopment: "Web Dev",
  MobileAppDevelopment: "Mobile",
  DataAnalytics: "Analytics",
  AI: "AI / ML",
  ML: "AI / ML",
  PHP: "Backend",
  Graphic: "Design",
};

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

/* Reusable text field styling with focus ring animation */
const textFieldSx = {
  "& .MuiInputLabel-root": {
    color: "#94a3b8",
    fontWeight: 500,
    fontSize: "0.85rem",
    letterSpacing: "0.01em",
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
      boxShadow: "0 0 0 3px rgba(59,130,246,0.15)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: `${ACCENT} !important`,
    },
  },
};

/* Reusable section card styling with gradient left border and hover lift */
const sectionCardSx = {
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
    background: ACCENT_GRADIENT,
    borderRadius: "0 4px 4px 0",
  },
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
    borderColor: "#3b82f6",
  },
};

const CoursesPanel = () => {
  const [data, setData] = useState(DEFAULT_COURSES_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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
    setSaveSuccess(false);
    try {
      await updatePageContent("courses-page", data);
      setSnack({ open: true, msg: "Content saved successfully!", severity: "success" });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (error) {
      setSnack({ open: true, msg: "Failed to save content.", severity: "error" });
    } finally {
      setSaving(false);
    }
  };

  const courseCount = (data.coursesList || []).length;

  /* Shimmer loading state */
  if (loading) {
    return (
      <Box sx={{ display: "flex", gap: 4, height: "calc(100vh - 100px)", color: "#0f172a" }}>
        <style>{`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
        `}</style>
        <Box sx={{ flex: 1, overflowY: "auto", pr: 2, pb: 4, maxWidth: "600px" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={4}>
            <Box>
              <Skeleton variant="text" width={260} height={40} sx={{ bgcolor: "#f1f5f9" }} />
              <Skeleton variant="text" width={340} height={24} sx={{ bgcolor: "#f1f5f9" }} />
            </Box>
            <Skeleton variant="rounded" width={90} height={32} sx={{ bgcolor: "#f1f5f9", borderRadius: 1 }} />
          </Stack>
          {[1, 2, 3, 4].map((i) => (
            <Box key={i} sx={{ mb: 3 }}>
              <Skeleton
                variant="rounded"
                height={160}
                sx={{
                  bgcolor: "#f1f5f9",
                  borderRadius: 2,
                  "&::after": {
                    background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.06), transparent)",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ flex: 1.2, borderLeft: "1px solid #e2e8f0", pl: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Stack alignItems="center" spacing={2}>
            <CircularProgress size={32} sx={{ color: "#3b82f6" }} />
            <Typography variant="body2" color="#64748b">Loading courses...</Typography>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", gap: 4, height: "calc(100vh - 100px)", color: "#0f172a" }}>
      <style>{`
        @keyframes coursesSavePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59,130,246,0); }
        }
        @keyframes coursesCheckPop {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>

      <Box sx={{ flex: 1, overflowY: "auto", pr: 2, pb: 4, maxWidth: "600px" }}>
        {/* Header with icon and course count badge */}
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={4}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
              <Layout size={22} color={ACCENT} />
              <Typography variant="h5" fontWeight={700} color="#0f172a">
                Courses Page Content
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Typography variant="body2" color="#64748b">
                Manage text, headings, and CTA sections of the /allcourses page.
              </Typography>
              <Chip
                label={`${courseCount} courses`}
                size="small"
                icon={<BookOpen size={12} />}
                sx={{
                  bgcolor: "rgba(59,130,246,0.08)",
                  color: "#3b82f6",
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: 22,
                  "& .MuiChip-icon": { color: "#3b82f6" },
                }}
              />
            </Stack>
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshCw size={16} />}
            onClick={loadData}
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

        <form onSubmit={handleSave}>
          <Stack spacing={4}>
            {/* Hero Section */}
            <Card elevation={0} sx={sectionCardSx}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Sparkles size={18} color={ACCENT_LIGHT} />
                  <Typography variant="h6" fontWeight={600} color="#0f172a">
                    Hero Section
                  </Typography>
                </Stack>
                <Stack spacing={2.5}>
                  <TextField
                    label="Hero Badge Text"
                    name="heroBadge"
                    value={data.heroBadge}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="e.g. Professional Training"
                    sx={textFieldSx}
                  />
                  <TextField
                    label="Hero Title (H1)"
                    name="heroTitle"
                    value={data.heroTitle}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="e.g. All Courses"
                    sx={textFieldSx}
                  />
                  <TextField
                    label="Hero Subtitle"
                    name="heroSubtitle"
                    value={data.heroSubtitle}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Brief description for the hero section"
                    sx={textFieldSx}
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* Grid Section Header */}
            <Card elevation={0} sx={sectionCardSx}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Layers size={18} color={ACCENT_LIGHT} />
                  <Typography variant="h6" fontWeight={600} color="#0f172a">
                    Course Grid Header
                  </Typography>
                </Stack>
                <Stack spacing={2.5}>
                  <TextField
                    label="Section Title"
                    name="sectionTitle"
                    value={data.sectionTitle}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="e.g. Browse All Courses"
                    sx={textFieldSx}
                  />
                  <TextField
                    label="Section Subtitle"
                    name="sectionSubtitle"
                    value={data.sectionSubtitle}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="Brief subtitle below the title"
                    sx={textFieldSx}
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <Card elevation={0} sx={sectionCardSx}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Zap size={18} color={ACCENT_LIGHT} />
                  <Typography variant="h6" fontWeight={600} color="#0f172a">
                    Bottom CTA Section
                  </Typography>
                </Stack>
                <Stack spacing={2.5}>
                  <TextField
                    label="CTA Title"
                    name="ctaTitle"
                    value={data.ctaTitle}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="e.g. Ready to Start Learning?"
                    sx={textFieldSx}
                  />
                  <TextField
                    label="CTA Subtitle"
                    name="ctaSubtitle"
                    value={data.ctaSubtitle}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="Compelling subtitle"
                    sx={textFieldSx}
                  />
                  <TextField
                    label="Button Text"
                    name="ctaButtonText"
                    value={data.ctaButtonText}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    placeholder="e.g. Get Started Today"
                    sx={textFieldSx}
                  />
                </Stack>
              </CardContent>
            </Card>

            {/* Manage Courses List */}
            <Card elevation={0} sx={sectionCardSx}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <BookOpen size={18} color={ACCENT_LIGHT} />
                    <Typography variant="h6" fontWeight={600} color="#0f172a">
                      Individual Courses
                    </Typography>
                    <Chip
                      label={courseCount}
                      size="small"
                      sx={{
                        bgcolor: "rgba(59,130,246,0.08)",
                        color: "#3b82f6",
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        height: 22,
                        minWidth: 28,
                      }}
                    />
                  </Stack>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Plus size={16} />}
                    onClick={addCourse}
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
                    Add Course
                  </Button>
                </Stack>

                <Stack spacing={3}>
                  {(data.coursesList || []).map((course, idx) => (
                    <Fade in key={course.id || idx} timeout={300}>
                      <Box
                        sx={{
                          p: 2.5,
                          border: "1px solid #e2e8f0",
                          borderRadius: 2,
                          position: "relative",
                          background: "#f8fafc",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            borderColor: "#3b82f6",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
                            transform: "translateY(-1px)",
                          },
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
                            transition: "all 0.2s ease",
                            "&:hover": {
                              color: "#fca5a5",
                              backgroundColor: "rgba(248,113,113,0.1)",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <Trash2 size={16} />
                        </IconButton>

                        {/* Course header with index and category badge */}
                        <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                          <Typography variant="subtitle2" color="#3b82f6" fontWeight={600}>
                            Course #{idx + 1}
                          </Typography>
                          <Chip
                            label={CATEGORY_MAP[course.imageKey] || course.imageKey}
                            size="small"
                            sx={{
                              bgcolor: `${course.color}22`,
                              color: course.color,
                              fontWeight: 600,
                              fontSize: "0.65rem",
                              height: 20,
                              border: `1px solid ${course.color}44`,
                            }}
                          />
                        </Stack>

                        <Stack spacing={2}>
                          <Stack direction="row" spacing={2}>
                            <TextField
                              label="Course Title"
                              value={course.title}
                              onChange={(e) => handleCourseChange(idx, "title", e.target.value)}
                              fullWidth
                              size="small"
                              sx={textFieldSx}
                            />
                            <TextField
                              label="URL Route (e.g. data-science)"
                              value={course.route}
                              onChange={(e) => handleCourseChange(idx, "route", e.target.value)}
                              fullWidth
                              size="small"
                              sx={textFieldSx}
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
                            sx={textFieldSx}
                          />
                          <Stack direction="row" spacing={2}>
                            <TextField
                              label="Color Hex (e.g. #3B82F6)"
                              value={course.color}
                              onChange={(e) => handleCourseChange(idx, "color", e.target.value)}
                              fullWidth
                              size="small"
                              sx={textFieldSx}
                            />
                            <TextField
                              label="Image Key (e.g. DataScience, WebDevelopment)"
                              value={course.imageKey}
                              onChange={(e) => handleCourseChange(idx, "imageKey", e.target.value)}
                              fullWidth
                              size="small"
                              sx={textFieldSx}
                            />
                          </Stack>
                        </Stack>
                      </Box>
                    </Fade>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Save Button with pulse animation and success checkmark */}
            <Box display="flex" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={saving}
                startIcon={
                  saveSuccess ? (
                    <Check size={18} style={{ animation: "coursesCheckPop 0.4s ease forwards" }} />
                  ) : saving ? (
                    <CircularProgress size={18} sx={{ color: "#fff" }} />
                  ) : (
                    <Save size={18} />
                  )
                }
                sx={{
                  px: 4,
                  py: 1.2,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  background: saveSuccess
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : ACCENT_GRADIENT,
                  transition: "all 0.3s ease",
                  animation: saving ? "coursesSavePulse 1.5s ease-in-out infinite" : "none",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(59,130,246,0.4)",
                    transform: "translateY(-1px)",
                  },
                  "&:disabled": {
                    background: saveSuccess
                      ? "linear-gradient(135deg, #10b981, #059669)"
                      : "rgba(59,130,246,0.3)",
                  },
                }}
              >
                {saveSuccess ? "Saved!" : saving ? "Saving..." : "Save Changes"}
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

      {/* Right Column: Live Preview */}
      <Box sx={{ flex: 1.2, borderLeft: "1px solid #e2e8f0", pl: 4, overflowY: "auto", pb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
          <Typography variant="h6" fontWeight={600} color="#0f172a">
            Live Preview
          </Typography>
          <Box sx={{ px: 1.5, py: 0.5, borderRadius: 1, backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10B981", fontSize: "0.75rem", fontWeight: 600 }}>
            Updates as you type
          </Box>
        </Stack>
        <Box
          sx={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            overflow: "hidden",
            background: "#ffffff",
            position: "relative",
            boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
            maxHeight: "80vh",
            overflowY: "auto",
            transition: "box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            },
          }}
        >
          <CoursesCard previewData={data} isPreview={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default CoursesPanel;
