import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
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
} from "@mui/material";
import {
  LayoutDashboard,
  FileText,
  GraduationCap,
  BookOpen,
  Search,
  Settings,
  Menu as MenuIcon,
  LogOut,
  Globe,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import AdminBlog from "./AdminBlog";
import CoursesPanel from "./panels/CoursesPanel";
import SixWeekPanel from "./panels/SixWeekPanel";
import SixMonthPanel from "./panels/SixMonthPanel";
import SeoPanel from "./panels/SeoPanel";

const drawerWidth = 270;
const drawerCollapsedWidth = 72;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#facc15" },
    secondary: { main: "#fbbf24" },
    background: { default: "#0a0a0a", paper: "#121212" },
    text: { primary: "#f8fafc", secondary: "#94a3b8" },
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  shape: { borderRadius: 14 },
});

const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "#facc15", badge: null },
  { id: "blog", label: "Blog Manager", icon: FileText, color: "#4ade80", badge: "Live" },
  { id: "courses", label: "Courses CMS", icon: BookOpen, color: "#fbbf24", badge: null },
  { id: "six-week", label: "6-Week CMS", icon: GraduationCap, color: "#38bdf8", badge: null },
  { id: "six-month", label: "6-Month CMS", icon: GraduationCap, color: "#a78bfa", badge: null },
  { id: "seo", label: "SEO Manager", icon: Search, color: "#f87171", badge: null },
  { id: "settings", label: "Settings", icon: Settings, color: "#94a3b8", badge: null },
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
        borderBottom: "1px solid rgba(250,204,21,0.12)",
        justifyContent: collapsed ? "center" : "flex-start",
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "12px",
          background: "linear-gradient(135deg, #facc15 0%, #fb923c 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(250,204,21,0.45)",
          flexShrink: 0,
        }}
      >
        <Sparkles size={18} color="#111" />
      </Box>
      {!collapsed && (
        <Box>
          <Typography variant="subtitle1" fontWeight={800} color="#fff" lineHeight={1.1} letterSpacing={0.4}>
            Ziion CMS
          </Typography>
          <Typography variant="caption" sx={{ color: "#fbbf24", fontWeight: 600, letterSpacing: 1, fontSize: 9 }}>
            ADMIN PANEL
          </Typography>
        </Box>
      )}
    </Box>

    {/* Nav Items */}
    <Box sx={{ flex: 1, overflowY: "auto", pt: 1.5, pb: 1, px: collapsed ? 1 : 1.5 }}>
      <List disablePadding sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
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
                  if (item.id === "blog") {
                    window.open("/admin/blog", "_blank");
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                sx={{
                  borderRadius: "12px",
                  minHeight: 46,
                  px: collapsed ? 1.5 : 2,
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: 1.5,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
                  color: isActive ? "#fff" : "#64748b",
                  background: isActive
                    ? `linear-gradient(135deg, ${item.color}28, ${item.color}14)`
                    : "transparent",
                  border: isActive ? `1px solid ${item.color}35` : "1px solid transparent",
                  "&:hover": {
                    background: isActive
                      ? `linear-gradient(135deg, ${item.color}35, ${item.color}20)`
                      : "rgba(255,255,255,0.04)",
                    color: isActive ? "#fff" : "#cbd5e1",
                    transform: collapsed ? "none" : "translateX(3px)",
                  },
                  ...(isActive && {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 3,
                      borderRadius: "0 4px 4px 0",
                      background: item.color,
                      boxShadow: `0 0 8px ${item.color}`,
                    },
                  }),
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, color: isActive ? item.color : "inherit" }}>
                  <Icon size={19} />
                </ListItemIcon>
                {!collapsed && (
                  <>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ fontSize: 13.5, fontWeight: isActive ? 700 : 500 }}
                      sx={{ m: 0 }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: 9,
                          fontWeight: 700,
                          bgcolor: "#10b98120",
                          color: "#10b981",
                          border: "1px solid #10b98135",
                          letterSpacing: 0.5,
                        }}
                      />
                    )}
                    {isActive && <ChevronRight size={14} style={{ color: item.color, opacity: 0.7 }} />}
                  </>
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
        borderTop: "1px solid rgba(250,204,21,0.1)",
        px: collapsed ? 1 : 1.5,
        py: 1.5,
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
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
            "&:hover": { bgcolor: "rgba(99,102,241,0.08)", color: "#a5b4fc" },
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
            color: "#f87171",
            gap: 1.5,
            "&:hover": { bgcolor: "rgba(248,113,113,0.08)", color: "#fca5a5" },
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

/* ─── Main Component ─── */
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const activeItem = MENU_ITEMS.find((m) => m.id === activeTab);
  const ActiveIcon = activeItem?.icon;
  const sidebarWidth = collapsed ? drawerCollapsedWidth : drawerWidth;

  const renderContent = () => {
    switch (activeTab) {
      case "courses":   return <CoursesPanel />;
      case "six-week":  return <SixWeekPanel />;
      case "six-month": return <SixMonthPanel />;
      case "seo":       return <SeoPanel />;
      default:
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <Box textAlign="center">
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "24px",
                  background: "linear-gradient(135deg, rgba(250,204,21,0.2), rgba(251,146,60,0.1))",
                  border: "1px solid rgba(250,204,21,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 3,
                }}
              >
                {ActiveIcon && <ActiveIcon size={32} style={{ color: activeItem?.color || "#facc15" }} />}
              </Box>
              <Typography variant="h5" fontWeight={700} color="#fff" mb={1}>
                {activeItem?.label}
              </Typography>
              <Typography color="#475569" fontSize={14}>
                This section is coming soon. Stay tuned!
              </Typography>
            </Box>
          </Box>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0a0a0a" }}>

        {/* ── Mobile AppBar ── */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            display: { xs: "flex", sm: "none" },
            bgcolor: "rgba(10,10,10,0.92)",
            backdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(250,204,21,0.12)",
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "#a5b4fc" }}>
              <MenuIcon size={22} />
            </IconButton>
            <Typography fontWeight={700} color="#fff" fontSize={16}>
              {activeItem?.label}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* ── Mobile Drawer ── */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              bgcolor: "#121212",
              backgroundImage: "linear-gradient(180deg, rgba(250,204,21,0.06) 0%, transparent 60%)",
              borderRight: "1px solid rgba(250,204,21,0.12)",
            },
          }}
        >
          <SidebarContent
            activeTab={activeTab}
            setActiveTab={(id) => { setActiveTab(id); setMobileOpen(false); }}
            collapsed={false}
            navigate={navigate}
          />
        </Drawer>

        {/* ── Desktop Sidebar ── */}
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
              bgcolor: "#121212",
              backgroundImage:
                "linear-gradient(180deg, rgba(250,204,21,0.07) 0%, rgba(251,146,60,0.03) 60%, transparent 100%)",
              borderRight: "1px solid rgba(250,204,21,0.12)",
              display: "flex",
              flexDirection: "column",
              zIndex: 1200,
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Collapse toggle */}
            <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
              <IconButton
                onClick={() => setCollapsed((v) => !v)}
                size="small"
                sx={{
                  position: "absolute",
                  right: -14,
                  top: 68,
                  width: 28,
                  height: 28,
                  bgcolor: "#1e1e1e",
                  border: "1px solid rgba(250,204,21,0.25)",
                  color: "#facc15",
                  zIndex: 10,
                  transition: "transform 0.3s",
                  transform: collapsed ? "rotate(180deg)" : "none",
                  "&:hover": { bgcolor: "#2a2a2a" },
                }}
              >
                <ChevronRight size={14} />
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

        {/* ── Main Content ── */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#0a0a0a",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient bg glow */}
          <Box
            sx={{
              position: "absolute",
              top: -150,
              right: -150,
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -100,
              left: -100,
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(251,146,60,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* ── Top Header Bar (desktop) ── */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
              px: 4,
              py: 2,
              borderBottom: "1px solid rgba(250,204,21,0.08)",
              bgcolor: "rgba(10,10,10,0.6)",
              backdropFilter: "blur(12px)",
              position: "sticky",
              top: 0,
              zIndex: 100,
            }}
          >
            {/* Breadcrumb */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography fontSize={13} color="#475569" fontWeight={500}>
                Admin
              </Typography>
              <ChevronRight size={14} color="#334155" />
              <Stack direction="row" alignItems="center" spacing={1}>
                {ActiveIcon && (
                  <ActiveIcon size={15} style={{ color: activeItem?.color || "#facc15" }} />
                )}
                <Typography fontSize={13} color="#cbd5e1" fontWeight={600}>
                  {activeItem?.label}
                </Typography>
              </Stack>
            </Stack>

            {/* Right side */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  px: 2,
                  py: 0.6,
                  borderRadius: "8px",
                  bgcolor: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.7,
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    bgcolor: "#10b981",
                    boxShadow: "0 0 6px #10b981",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { opacity: 1 },
                      "50%": { opacity: 0.4 },
                    },
                  }}
                />
                <Typography fontSize={12} fontWeight={600} color="#10b981">
                  Live
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: "linear-gradient(135deg, #facc15, #fb923c)",
                  color: "#111",
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  border: "2px solid rgba(250,204,21,0.3)",
                  boxShadow: "0 0 12px rgba(250,204,21,0.25)",
                }}
              >
                Z
              </Avatar>
            </Stack>
          </Box>

          {/* ── Page Content ── */}
          <Box
            sx={{
              flex: 1,
              px: { xs: 2, sm: 4 },
              py: { xs: 9, sm: 3.5 },
              position: "relative",
              zIndex: 1,
            }}
          >
            <Fade key={activeTab} in timeout={400}>
              <Box>{renderContent()}</Box>
            </Fade>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminPanel;
