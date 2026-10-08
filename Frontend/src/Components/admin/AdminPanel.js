import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  Drawer,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
  Divider,
  AppBar,
  IconButton,
  Stack,
  Fade,
  Chip,
  Tooltip,
  Avatar,
  InputBase,
  Badge,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  BookOpen,
  Briefcase,
  Search,
  Settings,
  Menu as MenuIcon,
  LogOut,
  Globe,
  ChevronRight,
  Sparkles,
  X,
  Bell,
  User,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  BarChart3,
  Activity,
  Clock,
  ExternalLink,
  ArrowUpRight,
  Zap,
  Users,
  FolderOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

import AdminBlog from "./AdminBlog";
import AdminCareers from "./AdminCareers";
import CoursesPanel from "./panels/CoursesPanel";
import SixWeekPanel from "./panels/SixWeekPanel";
import SixMonthPanel from "./panels/SixMonthPanel";
import SeoPanel from "./panels/SeoPanel";

// Firebase imports
import { fetchAllBlogs, fetchRecentBlogs } from "../../firebase/blogFirebase";
import {
  fetchPageContent,
  fetchStudentCount,
  fetchAllStudents,
  fetchAllPageKeys,
} from "../../firebase/cmsFirebase";

const drawerWidth = 260;
const drawerCollapsedWidth = 72;

/* ─── Light Theme ─── */
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3b82f6" },
    secondary: { main: "#0ea5e9" },
    background: { default: "#f1f5f9", paper: "#ffffff" },
    text: { primary: "#0f172a", secondary: "#64748b" },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  shape: { borderRadius: 12 },
});

/* ─── Chart Colors ─── */
const CHART_COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];
const PIE_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "blog", label: "Blog Manager", icon: FileText },
  { id: "careers", label: "Careers", icon: Briefcase },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "six-week", label: "6-Week Training", icon: GraduationCap },
  { id: "six-month", label: "6-Month Training", icon: GraduationCap },
  { id: "seo", label: "SEO Manager", icon: Search },
  { id: "settings", label: "Settings", icon: Settings },
];

/* ─── Sidebar Content ─── */
const SidebarContent = ({ activeTab, setActiveTab, collapsed, navigate }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
    }}
  >
    {/* Logo */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: collapsed ? 1.5 : 2.5,
        py: 2.5,
        minHeight: 70,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Sparkles size={18} color="#fff" />
      </Box>
      {!collapsed && (
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={800}
            color="#fff"
            lineHeight={1.1}
            letterSpacing={0.3}
            fontSize={15}
          >
            Ziion CMS
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "#64748b",
              fontWeight: 500,
              letterSpacing: 0.8,
              fontSize: 9.5,
            }}
          >
            ADMIN PANEL
          </Typography>
        </Box>
      )}
    </Box>

    {/* Nav Items */}
    <Box
      sx={{ flex: 1, overflowY: "auto", pt: 2, pb: 1, px: collapsed ? 1 : 1.5 }}
    >
      {!collapsed && (
        <Typography
          fontSize={10}
          fontWeight={700}
          color="#475569"
          sx={{
            px: 1.5,
            mb: 1,
            letterSpacing: 1.2,
            textTransform: "uppercase",
          }}
        >
          Menu
        </Typography>
      )}
      <List
        disablePadding
        sx={{ display: "flex", flexDirection: "column", gap: 0.3 }}
      >
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <Tooltip
              key={item.id}
              title={collapsed ? item.label : ""}
              placement="right"
              arrow
            >
              <ListItemButton
                selected={isActive}
                onClick={() => {
                  if (item.id === "blog") window.open("/admin/blog", "_blank");
                  else setActiveTab(item.id);
                }}
                sx={{
                  borderRadius: "10px",
                  minHeight: 42,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: 1.5,
                  transition: "all 0.2s ease",
                  color: isActive ? "#fff" : "#94a3b8",
                  background: isActive
                    ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                    : "transparent",
                  "&:hover": {
                    background: isActive
                      ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                      : "rgba(255,255,255,0.05)",
                    color: isActive ? "#fff" : "#e2e8f0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, color: isActive ? "#fff" : "inherit" }}
                >
                  <Icon size={18} />
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: isActive ? 600 : 500,
                    }}
                    sx={{ m: 0 }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Box>

    {/* Bottom Actions */}
    <Box
      sx={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        px: collapsed ? 1 : 1.5,
        py: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 0.3,
      }}
    >
      <Tooltip title={collapsed ? "View Live Site" : ""} placement="right">
        <ListItemButton
          onClick={() => window.open("/", "_blank")}
          sx={{
            borderRadius: "10px",
            minHeight: 40,
            justifyContent: collapsed ? "center" : "flex-start",
            color: "#64748b",
            gap: 1.5,
            "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: "#94a3b8" },
          }}
        >
          <Globe size={17} />
          {!collapsed && (
            <Typography fontSize={13} fontWeight={500}>
              View Live Site
            </Typography>
          )}
        </ListItemButton>
      </Tooltip>
      <Tooltip title={collapsed ? "Exit Panel" : ""} placement="right">
        <ListItemButton
          onClick={() => navigate("/")}
          sx={{
            borderRadius: "10px",
            minHeight: 40,
            justifyContent: collapsed ? "center" : "flex-start",
            color: "#ef4444",
            gap: 1.5,
            "&:hover": { bgcolor: "rgba(239,68,68,0.08)", color: "#f87171" },
          }}
        >
          <LogOut size={17} />
          {!collapsed && (
            <Typography fontSize={13} fontWeight={500}>
              Exit Panel
            </Typography>
          )}
        </ListItemButton>
      </Tooltip>
    </Box>
  </Box>
);

/* ─── Stat Card Component ─── */
const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
  color,
  loading,
}) => (
  <Card
    elevation={0}
    sx={{
      border: "1px solid #e2e8f0",
      borderRadius: "14px",
      transition: "all 0.25s ease",
      width: "100%",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        borderColor: "#cbd5e1",
      },
    }}
  >
    <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            bgcolor: `${color}10`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} style={{ color }} />
        </Box>
        {trend && (
          <Chip
            icon={
              trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />
            }
            label={trend}
            size="small"
            sx={{
              height: 24,
              fontSize: 10,
              fontWeight: 600,
              color: trendUp ? "#10b981" : "#ef4444",
              bgcolor: trendUp ? "#ecfdf5" : "#fef2f2",
              border: `1px solid ${trendUp ? "#a7f3d0" : "#fecaca"}`,
              "& .MuiChip-icon": { ml: 0.3 },
            }}
          />
        )}
      </Stack>
      {loading ? (
        <Box sx={{ height: 32, display: "flex", alignItems: "center" }}>
          <CircularProgress size={18} sx={{ color: "#94a3b8" }} />
        </Box>
      ) : (
        <Typography
          variant="h4"
          fontWeight={800}
          color="#0f172a"
          sx={{ mb: 0.25, lineHeight: 1 }}
        >
          {value}
        </Typography>
      )}
      <Typography fontSize={12.5} color="#64748b" fontWeight={500}>
        {label}
      </Typography>
    </CardContent>
  </Card>
);

/* ─── Custom Tooltip for Charts ─── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: "10px",
        p: 1.5,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Typography fontSize={12} fontWeight={600} color="#0f172a" mb={0.5}>
        {label}
      </Typography>
      {payload.map((entry, idx) => (
        <Typography key={idx} fontSize={11} color="#64748b">
          {entry.name}:{" "}
          <strong style={{ color: entry.color }}>{entry.value}</strong>
        </Typography>
      ))}
    </Box>
  );
};

/* ─── Main Component ─── */
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Real-time Dashboard State
  const [blogs, setBlogs] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [activePages, setActivePages] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const activeItem = MENU_ITEMS.find((m) => m.id === activeTab);
  const ActiveIcon = activeItem?.icon;
  const sidebarWidth = collapsed ? drawerCollapsedWidth : drawerWidth;

  // Fetch all dashboard data
  const loadDashboardData = async () => {
    setDashboardLoading(true);
    try {
      const [blogData, courseData, studentCountData, studentList, pageKeys] =
        await Promise.all([
          fetchAllBlogs().catch(() => []),
          fetchPageContent("courses-page").catch(() => null),
          fetchStudentCount().catch(() => 0),
          fetchAllStudents().catch(() => []),
          fetchAllPageKeys().catch(() => []),
        ]);
      setBlogs(blogData || []);
      setCoursesList(courseData?.coursesList || []);
      setStudentCount(studentCountData || 0);
      setStudents(studentList || []);
      setActivePages(pageKeys || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "dashboard") loadDashboardData();
  }, [activeTab]);

  // Derived stats
  const totalBlogs = blogs.length;
  const totalCourses = coursesList.length;
  const totalStudents = studentCount;
  const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
  const recentBlogs = blogs.slice(0, 5);
  const recentStudents = students.slice(-5).reverse();

  const now = new Date();
  const thisMonthBlogs = blogs.filter((b) => {
    if (!b.createdAt) return false;
    const d = new Date(b.createdAt);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;

  // Chart data: Blog categories distribution
  const categoryData = blogs.reduce((acc, blog) => {
    const cat = blog.category || "General";
    const existing = acc.find((item) => item.name === cat);
    if (existing) existing.value += 1;
    else acc.push({ name: cat, value: 1 });
    return acc;
  }, []);

  // Chart data: Blogs per month (last 6 months)
  const getMonthlyData = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString("en-IN", { month: "short" });
      const year = d.getFullYear();
      const count = blogs.filter((b) => {
        if (!b.createdAt) return false;
        const bd = new Date(b.createdAt);
        return bd.getMonth() === d.getMonth() && bd.getFullYear() === year;
      }).length;
      months.push({ month: monthName, blogs: count });
    }
    return months;
  };

  // Chart data: Students per month
  const getStudentMonthlyData = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthName = d.toLocaleString("en-IN", { month: "short" });
      const year = d.getFullYear();
      const count = students.filter((s) => {
        if (!s.startDate) return false;
        const sd = new Date(s.startDate);
        return sd.getMonth() === d.getMonth() && sd.getFullYear() === year;
      }).length;
      months.push({ month: monthName, students: count });
    }
    return months;
  };

  const timeAgo = (dateStr) => {
    if (!dateStr) return "Unknown";
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 7) return `${days}d ago`;
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  const formatNum = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "careers":
        return <AdminCareers />;
      case "courses":
        return <CoursesPanel />;
      case "six-week":
        return <SixWeekPanel />;
      case "six-month":
        return <SixMonthPanel />;
      case "seo":
        return <SeoPanel />;
      default:
        return (
          <Box>
            {/* Header */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2.5 }}
            >
              <Box>
                <Typography variant="h5" fontWeight={700} color="#0f172a">
                  Dashboard Overview
                </Typography>
                <Typography fontSize={13} color="#64748b" mt={0.3}>
                  Real-time data from Firebase • Updated{" "}
                  {lastRefresh.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
              <Chip
                icon={<RefreshCw size={12} />}
                label={dashboardLoading ? "Syncing..." : "Refresh"}
                size="small"
                onClick={loadDashboardData}
                sx={{
                  height: 32,
                  fontSize: 12,
                  fontWeight: 600,
                  bgcolor: "#eff6ff",
                  color: "#3b82f6",
                  border: "1px solid #bfdbfe",
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#dbeafe" },
                  "& .MuiChip-icon": { ml: 0.5, color: "#3b82f6" },
                }}
              />
            </Stack>

            {/* Stat Cards */}
            <Grid container spacing={2} sx={{ mb: 2.5 }}>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={FileText}
                  label="Total Blogs"
                  value={totalBlogs}
                  trend={`${thisMonthBlogs} this month`}
                  trendUp={thisMonthBlogs > 0}
                  color="#3b82f6"
                  loading={dashboardLoading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={BookOpen}
                  label="Active Courses"
                  value={totalCourses}
                  trend="From CMS"
                  trendUp={true}
                  color="#10b981"
                  loading={dashboardLoading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={Users}
                  label="Students Enrolled"
                  value={totalStudents}
                  trend="Registered"
                  trendUp={true}
                  color="#f59e0b"
                  loading={dashboardLoading}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <StatCard
                  icon={Eye}
                  label="Total Blog Views"
                  value={formatNum(totalViews)}
                  trend="All time"
                  trendUp={true}
                  color="#8b5cf6"
                  loading={dashboardLoading}
                />
              </Grid>
            </Grid>

            {/* Charts Row */}
            <Grid container spacing={2} sx={{ mb: 2.5 }}>
              {/* Blog Activity Chart */}
              <Grid item xs={12} lg={6}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    transition: "all 0.25s ease",
                    width: "100%",
                    "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.06)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 3 }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={700}
                          color="#0f172a"
                        >
                          Blog Act ivity
                        </Typography>
                        <Typography fontSize={12} color="#94a3b8" mt={0.3}>
                          Blogs published per month (last 6 months)
                        </Typography>
                      </Box>
                      <Chip
                        label="6 Months"
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: 10,
                          bgcolor: "#f1f5f9",
                          color: "#64748b",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                    {dashboardLoading ? (
                      <Box
                        sx={{
                          height: 250,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress size={28} sx={{ color: "#94a3b8" }} />
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={getMonthlyData()}>
                          <defs>
                            <linearGradient
                              id="blogGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3b82f6"
                                stopOpacity={0.15}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3b82f6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                          />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                          />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="blogs"
                            name="Blogs"
                            stroke="#3b82f6"
                            strokeWidth={2.5}
                            fill="url(#blogGradient)"
                            dot={{
                              r: 4,
                              fill: "#3b82f6",
                              stroke: "#fff",
                              strokeWidth: 2,
                            }}
                            activeDot={{
                              r: 6,
                              fill: "#3b82f6",
                              stroke: "#fff",
                              strokeWidth: 2,
                            }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Category Distribution */}
              <Grid item xs={12} lg={10}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    transition: "all 0.25s ease",
                    height: "100%",
                    width: "100%",
                    "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.06)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="#0f172a"
                      >
                        Categories
                      </Typography>
                      <Chip
                        label={categoryData.length}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: 10,
                          bgcolor: "#f1f5f9",
                          color: "#64748b",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                    {dashboardLoading || categoryData.length === 0 ? (
                      <Box
                        sx={{
                          height: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {dashboardLoading ? (
                          <CircularProgress
                            size={28}
                            sx={{ color: "#94a3b8" }}
                          />
                        ) : (
                          <Typography fontSize={13} color="#94a3b8">
                            No data
                          </Typography>
                        )}
                      </Box>
                    ) : (
                      <>
                        <ResponsiveContainer width="100%" height={180}>
                          <PieChart>
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              innerRadius={50}
                              outerRadius={75}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {categoryData.map((_, idx) => (
                                <Cell
                                  key={idx}
                                  fill={PIE_COLORS[idx % PIE_COLORS.length]}
                                />
                              ))}
                            </Pie>
                            <RechartsTooltip content={<CustomTooltip />} />
                          </PieChart>
                        </ResponsiveContainer>
                        <Stack spacing={0.8} sx={{ mt: 1 }}>
                          {categoryData.slice(0, 4).map((cat, idx) => (
                            <Stack
                              key={idx}
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "2px",
                                    bgcolor:
                                      PIE_COLORS[idx % PIE_COLORS.length],
                                  }}
                                />
                                <Typography
                                  fontSize={11.5}
                                  color="#64748b"
                                  fontWeight={500}
                                >
                                  {cat.name}
                                </Typography>
                              </Stack>
                              <Typography
                                fontSize={11.5}
                                fontWeight={700}
                                color="#0f172a"
                              >
                                {cat.value}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Bottom Row: Student Trend + Activity + System Status */}
            <Grid container spacing={2}>
              {/* Student Registration Trend */}
              <Grid item xs={12} lg={4}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    transition: "all 0.25s ease",
                    height: "100%",
                    width: "100%",
                    "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.06)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="#0f172a"
                      >
                        Student Registrations
                      </Typography>
                      <Chip
                        label="6 Months"
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: 10,
                          bgcolor: "#f1f5f9",
                          color: "#64748b",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                    {dashboardLoading ? (
                      <Box
                        sx={{
                          height: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress size={28} sx={{ color: "#94a3b8" }} />
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={getStudentMonthlyData()}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                          />
                          <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: "#94a3b8" }}
                            axisLine={false}
                            tickLine={false}
                            allowDecimals={false}
                          />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Bar
                            dataKey="students"
                            name="Students"
                            fill="#10b981"
                            radius={[6, 6, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Recent Activity */}
              <Grid item xs={12} lg={4}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    transition: "all 0.25s ease",
                    height: "100%",
                    width: "100%",
                    "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.06)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="#0f172a"
                      >
                        Recent Activity
                      </Typography>
                      <Chip
                        label={`${recentBlogs.length} items`}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: 10,
                          bgcolor: "#f1f5f9",
                          color: "#64748b",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                    {dashboardLoading ? (
                      <Box
                        sx={{
                          height: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress size={28} sx={{ color: "#94a3b8" }} />
                      </Box>
                    ) : recentBlogs.length === 0 ? (
                      <Box
                        sx={{
                          height: 200,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography fontSize={13} color="#94a3b8">
                          No activity yet
                        </Typography>
                      </Box>
                    ) : (
                      <Stack spacing={0}>
                        {recentBlogs.map((blog, idx) => (
                          <Stack
                            key={blog.id}
                            direction="row"
                            alignItems="center"
                            spacing={1.5}
                            sx={{
                              py: 1.3,
                              px: 1,
                              borderBottom:
                                idx < recentBlogs.length - 1
                                  ? "1px solid #f1f5f9"
                                  : "none",
                              borderRadius: "8px",
                              transition: "all 0.15s ease",
                              "&:hover": { bgcolor: "#f8fafc" },
                            }}
                          >
                            <Box
                              sx={{
                                width: 32,
                                height: 32,
                                borderRadius: "8px",
                                bgcolor: "#eff6ff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              <FileText
                                size={14}
                                style={{ color: "#3b82f6" }}
                              />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                fontSize={12}
                                fontWeight={600}
                                color="#0f172a"
                                noWrap
                              >
                                {blog.title}
                              </Typography>
                              <Typography fontSize={10.5} color="#94a3b8">
                                {blog.category || "General"} •{" "}
                                {timeAgo(blog.createdAt)}
                              </Typography>
                            </Box>
                          </Stack>
                        ))}
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* System Status */}
              <Grid item xs={12} lg={4}>
                <Card
                  elevation={0}
                  sx={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "14px",
                    transition: "all 0.25s ease",
                    height: "100%",
                    width: "100%",
                    "&:hover": { boxShadow: "0 4px 15px rgba(0,0,0,0.06)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ mb: 2 }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color="#0f172a"
                      >
                        System Status
                      </Typography>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor: "#10b981",
                          boxShadow: "0 0 8px rgba(16,185,129,0.4)",
                        }}
                      />
                    </Stack>
                    <Stack spacing={1.5}>
                      {[
                        {
                          label: "Blog Database",
                          status: blogs.length > 0 ? "Connected" : "Empty",
                          ok: blogs.length > 0,
                        },
                        {
                          label: "CMS Pages",
                          status: `${activePages.length} active`,
                          ok: activePages.length > 0,
                        },
                        {
                          label: "Student DB",
                          status:
                            studentCount > 0
                              ? `${studentCount} records`
                              : "Empty",
                          ok: studentCount > 0,
                        },
                        { label: "Website", status: "Live", ok: true },
                      ].map((item, idx) => (
                        <Stack
                          key={idx}
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{
                            py: 1.2,
                            px: 1.5,
                            borderRadius: "10px",
                            bgcolor: "#f8fafc",
                            border: "1px solid #f1f5f9",
                          }}
                        >
                          <Typography
                            fontSize={12}
                            fontWeight={500}
                            color="#64748b"
                          >
                            {item.label}
                          </Typography>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.7}
                          >
                            <Box
                              sx={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                bgcolor: item.ok ? "#10b981" : "#f59e0b",
                              }}
                            />
                            <Typography
                              fontSize={11.5}
                              fontWeight={600}
                              color={item.ok ? "#10b981" : "#f59e0b"}
                            >
                              {item.status}
                            </Typography>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                    <Divider sx={{ my: 2, borderColor: "#f1f5f9" }} />
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography
                        fontSize={11}
                        color="#94a3b8"
                        fontWeight={500}
                      >
                        Last refreshed
                      </Typography>
                      <Typography
                        fontSize={11}
                        color="#64748b"
                        fontWeight={600}
                      >
                        {lastRefresh.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f1f5f9" }}>
        {/* Mobile AppBar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            display: { xs: "flex", sm: "none" },
            bgcolor: "#fff",
            borderBottom: "1px solid #e2e8f0",
            color: "#0f172a",
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ color: "#64748b" }}
            >
              <MenuIcon size={22} />
            </IconButton>
            <Typography fontWeight={700} fontSize={16} color="#0f172a">
              {activeItem?.label}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: "#0f172a",
              borderRight: "none",
            },
          }}
        >
          <SidebarContent
            activeTab={activeTab}
            setActiveTab={(id) => {
              setActiveTab(id);
              setMobileOpen(false);
            }}
            collapsed={false}
            navigate={navigate}
          />
        </Drawer>

        {/* Desktop Sidebar */}
        <Box
          component="nav"
          sx={{
            display: { xs: "none", sm: "flex" },
            flexDirection: "column",
            width: sidebarWidth,
            flexShrink: 0,
            transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: sidebarWidth,
              transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
              bgcolor: "#0f172a",
              display: "flex",
              flexDirection: "column",
              zIndex: 1200,
            }}
          >
            {/* Collapse toggle */}
            <Tooltip
              title={collapsed ? "Expand" : "Collapse"}
              placement="right"
            >
              <IconButton
                onClick={() => setCollapsed((v) => !v)}
                size="small"
                sx={{
                  position: "absolute",
                  right: -13,
                  top: 68,
                  width: 26,
                  height: 26,
                  bgcolor: "#1e293b",
                  border: "1px solid #334155",
                  color: "#94a3b8",
                  zIndex: 10,
                  transition: "transform 0.3s",
                  transform: collapsed ? "rotate(180deg)" : "none",
                  "&:hover": { bgcolor: "#334155", color: "#e2e8f0" },
                }}
              >
                <ChevronRight size={13} />
              </IconButton>
            </Tooltip>
            <SidebarContent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              collapsed={collapsed}
              navigate={navigate}
            />
          </Box>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: "100%",
            minWidth: 0,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#f1f5f9",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflow: "hidden",
          }}
        >
          {/* Top Header Bar */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              py: 1.5,
              bgcolor: "#fff",
              borderBottom: "1px solid #e2e8f0",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            {/* Breadcrumb */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography fontSize={13} color="#94a3b8" fontWeight={500}>
                Admin
              </Typography>
              <ChevronRight size={14} color="#cbd5e1" />
              <Stack direction="row" alignItems="center" spacing={0.8}>
                {ActiveIcon && (
                  <ActiveIcon size={15} style={{ color: "#3b82f6" }} />
                )}
                <Typography fontSize={13} color="#0f172a" fontWeight={600}>
                  {activeItem?.label}
                </Typography>
              </Stack>
            </Stack>

            {/* Search */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                px: 1.5,
                py: 0.6,
                minWidth: 240,
                transition: "all 0.2s",
                "&:focus-within": {
                  borderColor: "#3b82f6",
                  bgcolor: "#fff",
                  boxShadow: "0 0 0 3px rgba(59,130,246,0.1)",
                },
              }}
            >
              <Search size={14} color="#94a3b8" />
              <InputBase
                placeholder="Search anything..."
                sx={{
                  fontSize: 12.5,
                  color: "#0f172a",
                  width: "100%",
                  "& ::placeholder": { color: "#94a3b8", opacity: 1 },
                }}
              />
            </Box>

            {/* Right side */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Chip
                icon={
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#10b981",
                    }}
                  />
                }
                label="Online"
                size="small"
                sx={{
                  height: 26,
                  fontSize: 11,
                  fontWeight: 600,
                  bgcolor: "#ecfdf5",
                  color: "#10b981",
                  border: "1px solid #a7f3d0",
                  "& .MuiChip-icon": { ml: 0.5 },
                }}
              />
              <IconButton
                size="small"
                sx={{
                  color: "#94a3b8",
                  "&:hover": { color: "#64748b", bgcolor: "#f1f5f9" },
                }}
              >
                <Badge
                  variant="dot"
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: "#ef4444",
                      width: 7,
                      height: 7,
                      minWidth: 7,
                      borderRadius: "50%",
                      border: "1.5px solid #fff",
                      top: 3,
                      right: 3,
                    },
                  }}
                >
                  <Bell size={18} />
                </Badge>
              </IconButton>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ mx: 0.5, borderColor: "#e2e8f0" }}
              />
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  cursor: "pointer",
                  py: 0.5,
                  px: 1,
                  borderRadius: "10px",
                  "&:hover": { bgcolor: "#f8fafc" },
                }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
                    color: "#fff",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Z
                </Avatar>
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Typography
                    fontSize={12}
                    fontWeight={600}
                    color="#0f172a"
                    lineHeight={1.2}
                  >
                    Admin
                  </Typography>
                  <Typography fontSize={10} color="#94a3b8">
                    Ziion
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>

          {/* Page Content */}
          <Box
            sx={{
              flex: 1,
              width: "100%",
              px: { xs: 2, sm: 3 },
              py: { xs: 9, sm: 2.5 },
              position: "relative",
              maxWidth: "100%",
            }}
          >
            <Fade key={activeTab} in timeout={350}>
              <Box>{renderContent()}</Box>
            </Fade>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;
