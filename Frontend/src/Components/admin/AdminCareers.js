import React, { useState, useEffect } from "react";
import {
  Box, Stack, Typography, Button, Chip, IconButton, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions, Select,
  MenuItem, FormControl, InputLabel, CircularProgress, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Tooltip, Alert, Snackbar, Drawer, Badge,
} from "@mui/material";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, RefreshCw, Briefcase,
  X, MapPin, Clock, Tag, ChevronRight, CheckCircle, Users, Download,
} from "lucide-react";
import {
  fetchAllJobs, createJob, updateJob, deleteJob, toggleJobStatus,
  fetchAllApplications,
} from "../../firebase/careersFirebase";

const EMPTY_FORM = {
  title: "", slug: "", department: "", employmentType: "Full-time",
  location: "Mohali, Punjab", workMode: "On-site", experience: "",
  shortDescription: "", overview: "", skills: "",
  responsibilities: "", requiredSkills: "", preferredSkills: "",
  qualifications: "", benefits: "", growthPath: "",
  postedDate: "", deadline: "",
};

const DEPT_OPTIONS = ["Engineering", "Marketing", "Design", "Operations", "Sales", "HR"];
const TYPE_OPTIONS = ["Full-time", "Part-time", "Internship", "Contract"];
const MODE_OPTIONS = ["On-site", "Remote", "Hybrid"];

const DEPT_COLORS = {
  Engineering: { bg: "#eff6ff", color: "#3b82f6" },
  Marketing:   { bg: "#fdf4ff", color: "#a855f7" },
  Design:      { bg: "#fff7ed", color: "#f97316" },
  Operations:  { bg: "#f0fdf4", color: "#22c55e" },
  Sales:       { bg: "#fefce8", color: "#eab308" },
  HR:          { bg: "#fdf2f8", color: "#ec4899" },
};

const toSlug = (title) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const toArray = (val) =>
  typeof val === "string"
    ? val.split("\n").map((s) => s.trim()).filter(Boolean)
    : Array.isArray(val) ? val : [];

const fromArray = (val) =>
  Array.isArray(val) ? val.join("\n") : val || "";

/* ── Job Preview Panel ── */
const JobPreview = ({ job, onClose }) => {
  if (!job) return null;
  const dc = DEPT_COLORS[job.department] || { bg: "#f1f5f9", color: "#64748b" };
  const skills = Array.isArray(job.skills) ? job.skills : toArray(job.skills);
  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : toArray(job.responsibilities);
  const requiredSkills = Array.isArray(job.requiredSkills) ? job.requiredSkills : toArray(job.requiredSkills);
  const preferredSkills = Array.isArray(job.preferredSkills) ? job.preferredSkills : toArray(job.preferredSkills);
  const benefits = Array.isArray(job.benefits) ? job.benefits : toArray(job.benefits);

  return (
    <Box sx={{ width: 420, height: "100%", display: "flex", flexDirection: "column", bgcolor: "#fff" }}>
      {/* Preview Header */}
      <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: job.status === "published" ? "#10b981" : "#f59e0b" }} />
          <Typography fontSize={13} fontWeight={700} color="#0f172a">Job Preview</Typography>
          <Chip
            label={job.status === "published" ? "Live" : "Draft"}
            size="small"
            sx={{
              height: 20, fontSize: 10, fontWeight: 700,
              bgcolor: job.status === "published" ? "#ecfdf5" : "#fefce8",
              color: job.status === "published" ? "#10b981" : "#eab308",
            }}
          />
        </Stack>
        <IconButton size="small" onClick={onClose} sx={{ color: "#94a3b8" }}>
          <X size={16} />
        </IconButton>
      </Box>

      {/* Scrollable Content */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 3, py: 2.5 }}>

        {/* Dept + Type badges */}
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Chip label={job.department} size="small" sx={{ fontSize: 11, height: 22, fontWeight: 600, bgcolor: dc.bg, color: dc.color }} />
          <Chip label={job.employmentType} size="small" sx={{ fontSize: 11, height: 22, fontWeight: 600, bgcolor: "#f1f5f9", color: "#64748b" }} />
        </Stack>

        {/* Title */}
        <Typography fontSize={20} fontWeight={800} color="#0f172a" lineHeight={1.2} sx={{ mb: 1 }}>
          {job.title || "Untitled Position"}
        </Typography>

        {/* Meta row */}
        <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 2 }}>
          {job.location && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <MapPin size={12} style={{ color: "#94a3b8" }} />
              <Typography fontSize={12} color="#64748b">{job.location}</Typography>
            </Stack>
          )}
          {job.workMode && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Briefcase size={12} style={{ color: "#94a3b8" }} />
              <Typography fontSize={12} color="#64748b">{job.workMode}</Typography>
            </Stack>
          )}
          {job.experience && (
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Clock size={12} style={{ color: "#94a3b8" }} />
              <Typography fontSize={12} color="#64748b">{job.experience}</Typography>
            </Stack>
          )}
        </Stack>

        {/* Short Description */}
        {job.shortDescription && (
          <Box sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0", mb: 2.5 }}>
            <Typography fontSize={13} color="#475569" lineHeight={1.6}>{job.shortDescription}</Typography>
          </Box>
        )}

        <Divider sx={{ mb: 2.5, borderColor: "#f1f5f9" }} />

        {/* Overview */}
        {job.overview && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontSize={12} fontWeight={700} color="#0f172a" sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>Overview</Typography>
            <Typography fontSize={13} color="#64748b" lineHeight={1.7}>{job.overview}</Typography>
          </Box>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontSize={12} fontWeight={700} color="#0f172a" sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>Skills</Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.8}>
              {skills.map((s, i) => (
                <Chip key={i} label={s} size="small" sx={{ fontSize: 11, height: 24, bgcolor: "#eff6ff", color: "#3b82f6", fontWeight: 500 }} />
              ))}
            </Stack>
          </Box>
        )}

        {/* Responsibilities */}
        {responsibilities.length > 0 && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontSize={12} fontWeight={700} color="#0f172a" sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>Responsibilities</Typography>
            <Stack spacing={0.8}>
              {responsibilities.map((r, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                  <ChevronRight size={13} style={{ color: "#3b82f6", marginTop: 2, flexShrink: 0 }} />
                  <Typography fontSize={12.5} color="#64748b" lineHeight={1.5}>{r}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        {/* Required Skills */}
        {requiredSkills.length > 0 && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontSize={12} fontWeight={700} color="#0f172a" sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>Required Skills</Typography>
            <Stack spacing={0.6}>
              {requiredSkills.map((s, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <CheckCircle size={12} style={{ color: "#10b981", flexShrink: 0 }} />
                  <Typography fontSize={12.5} color="#64748b">{s}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        {/* Preferred Skills */}
        {preferredSkills.length > 0 && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontSize={12} fontWeight={700} color="#0f172a" sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>Preferred Skills</Typography>
            <Stack direction="row" flexWrap="wrap" gap={0.8}>
              {preferredSkills.map((s, i) => (
                <Chip key={i} label={s} size="small" sx={{ fontSize: 11, height: 24, bgcolor: "#f0fdf4", color: "#22c55e", fontWeight: 500 }} />
              ))}
            </Stack>
          </Box>
        )}

        {/* Qualifications */}
        {job.qualifications && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontSize={12} fontWeight={700} color="#0f172a" sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>Qualifications</Typography>
            <Typography fontSize={12.5} color="#64748b" lineHeight={1.6}>{job.qualifications}</Typography>
          </Box>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <Box sx={{ mb: 2.5 }}>
            <Typography fontSize={12} fontWeight={700} color="#0f172a" sx={{ mb: 1, textTransform: "uppercase", letterSpacing: 0.8 }}>Benefits</Typography>
            <Stack spacing={0.6}>
              {benefits.map((b, i) => (
                <Stack key={i} direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 5, height: 5, borderRadius: "50%", bgcolor: "#3b82f6", flexShrink: 0 }} />
                  <Typography fontSize={12.5} color="#64748b">{b}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        )}

        {/* Growth Path */}
        {job.growthPath && (
          <Box sx={{ p: 2, bgcolor: "#eff6ff", borderRadius: "10px", border: "1px solid #bfdbfe" }}>
            <Typography fontSize={11} fontWeight={700} color="#3b82f6" sx={{ mb: 0.5, textTransform: "uppercase", letterSpacing: 0.8 }}>Career Growth Path</Typography>
            <Typography fontSize={12.5} color="#1e40af" fontWeight={500}>{job.growthPath}</Typography>
          </Box>
        )}
      </Box>

      {/* Preview Footer */}
      <Box sx={{ px: 3, py: 2, borderTop: "1px solid #e2e8f0", bgcolor: "#f8fafc" }}>
        <Typography fontSize={11} color="#94a3b8" textAlign="center">
          This is how the job appears on <strong style={{ color: "#3b82f6" }}>/careers/{job.slug}</strong>
        </Typography>
      </Box>
    </Box>
  );
};

/* ── Main Component ── */
const AdminCareers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [previewJob, setPreviewJob] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });
  const [activeTab, setActiveTab] = useState("jobs");
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAllJobs();
      setJobs(data);
    } catch {
      showSnack("Failed to load jobs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const loadApplications = async () => {
    setAppsLoading(true);
    try {
      const data = await fetchAllApplications();
      setApplications(data);
    } catch {
      showSnack("Failed to load applications", "error");
    } finally {
      setAppsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "candidates") loadApplications();
  }, [activeTab]);

  const showSnack = (msg, severity = "success") =>
    setSnack({ open: true, msg, severity });

  const openCreate = () => {
    setEditingJob(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (job) => {
    setEditingJob(job);
    setForm({
      title: job.title || "",
      slug: job.slug || "",
      department: job.department || "",
      employmentType: job.employmentType || "Full-time",
      location: job.location || "Mohali, Punjab",
      workMode: job.workMode || "On-site",
      experience: job.experience || "",
      shortDescription: job.shortDescription || "",
      overview: job.overview || "",
      skills: fromArray(job.skills),
      responsibilities: fromArray(job.responsibilities),
      requiredSkills: fromArray(job.requiredSkills),
      preferredSkills: fromArray(job.preferredSkills),
      qualifications: job.qualifications || "",
      benefits: fromArray(job.benefits),
      growthPath: job.growthPath || "",
      postedDate: job.postedDate || "",
      deadline: job.deadline || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.department || !form.shortDescription) {
      showSnack("Title, Department and Short Description are required", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || toSlug(form.title),
        skills: toArray(form.skills),
        responsibilities: toArray(form.responsibilities),
        requiredSkills: toArray(form.requiredSkills),
        preferredSkills: toArray(form.preferredSkills),
        benefits: toArray(form.benefits),
      };
      if (editingJob) {
        await updateJob(editingJob.id, payload);
        showSnack("Job updated successfully");
        if (previewJob?.id === editingJob.id) setPreviewJob({ ...previewJob, ...payload });
      } else {
        await createJob(payload);
        showSnack("Job created successfully");
      }
      setDialogOpen(false);
      load();
    } catch {
      showSnack("Failed to save job", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setDeleteConfirm(null);
      if (previewJob?.id === id) setPreviewJob(null);
      showSnack("Job deleted");
      load();
    } catch {
      showSnack("Failed to delete job", "error");
    }
  };

  const handleToggle = async (job) => {
    try {
      const newStatus = await toggleJobStatus(job.id, job.status);
      showSnack(`Job ${newStatus === "published" ? "published" : "set to draft"}`);
      if (previewJob?.id === job.id) setPreviewJob({ ...previewJob, status: newStatus });
      load();
    } catch {
      showSnack("Failed to update status", "error");
    }
  };

  const f = (key) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      [key]: val,
      ...(key === "title" && !prev.slug ? { slug: toSlug(val) } : {}),
    }));
  };

  const published = jobs.filter((j) => j.status === "published").length;
  const drafts = jobs.length - published;

  const exportCSV = () => {
    if (applications.length === 0) { showSnack("No applications to export", "error"); return; }
    const headers = ["Name", "Email", "Phone", "Location", "Experience", "Job Applied", "Portfolio", "LinkedIn", "Cover Letter", "Submitted At"];
    const rows = applications.map((a) => [
      a.fullName || "", a.email || "", a.phone || "", a.location || "",
      a.experience || "", a.jobTitle || "", a.portfolio || "",
      a.linkedin || "", (a.coverLetter || "").replace(/,/g, " "),
      a.submittedAt ? new Date(a.submittedAt).toLocaleString("en-IN") : "",
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `ziion-candidates-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2.5 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="#0f172a">Careers Manager</Typography>
          <Typography fontSize={13} color="#64748b" mt={0.3}>
            Manage job listings · {jobs.length} total
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          {activeTab === "candidates" && (
            <Button variant="outlined" startIcon={<Download size={15} />} onClick={exportCSV}
              sx={{ borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: 13, borderColor: "#e2e8f0", color: "#64748b", "&:hover": { borderColor: "#3b82f6", color: "#3b82f6" } }}>
              Export CSV
            </Button>
          )}
          <Tooltip title="Refresh">
            <IconButton onClick={activeTab === "jobs" ? load : loadApplications} size="small" sx={{ color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "10px" }}>
              <RefreshCw size={16} />
            </IconButton>
          </Tooltip>
          {activeTab === "jobs" && (
            <Button variant="contained" startIcon={<Plus size={16} />} onClick={openCreate}
              sx={{ bgcolor: "#3b82f6", borderRadius: "10px", textTransform: "none", fontWeight: 600, fontSize: 13, px: 2, "&:hover": { bgcolor: "#2563eb" } }}>
              Add Job
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Tabs */}
      <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
        {[
          { id: "jobs", label: "Job Listings", count: jobs.length },
          { id: "candidates", label: "Candidates", count: applications.length },
        ].map((tab) => (
          <Button key={tab.id} onClick={() => setActiveTab(tab.id)}
            sx={{
              textTransform: "none", fontWeight: 600, fontSize: 13, borderRadius: "10px",
              px: 2, py: 0.8,
              bgcolor: activeTab === tab.id ? "#0f172a" : "transparent",
              color: activeTab === tab.id ? "#fff" : "#64748b",
              border: activeTab === tab.id ? "none" : "1px solid #e2e8f0",
              "&:hover": { bgcolor: activeTab === tab.id ? "#1e293b" : "#f8fafc" },
            }}>
            {tab.label}
            <Box component="span" sx={{ ml: 1, px: 0.8, py: 0.1, borderRadius: "6px", fontSize: 11, bgcolor: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "#f1f5f9", color: activeTab === tab.id ? "#fff" : "#94a3b8" }}>
              {tab.count}
            </Box>
          </Button>
        ))}
      </Stack>

      {/* Jobs Tab */}
      {activeTab === "jobs" && (<>
      <Stack direction="row" spacing={2} sx={{ mb: 2.5 }}>
        {[
          { label: "Total Listings", value: jobs.length, color: "#3b82f6", bg: "#eff6ff" },
          { label: "Published", value: published, color: "#10b981", bg: "#ecfdf5" },
          { label: "Drafts", value: drafts, color: "#f59e0b", bg: "#fefce8" },
          { label: "Departments", value: [...new Set(jobs.map((j) => j.department))].length, color: "#8b5cf6", bg: "#f5f3ff" },
        ].map((s) => (
          <Box key={s.label} sx={{ flex: 1, p: 2, bgcolor: s.bg, borderRadius: "12px", border: `1px solid ${s.color}20` }}>
            <Typography fontSize={22} fontWeight={800} color={s.color} lineHeight={1}>{loading ? "—" : s.value}</Typography>
            <Typography fontSize={12} color="#64748b" mt={0.5} fontWeight={500}>{s.label}</Typography>
          </Box>
        ))}
      </Stack>

      {/* Table + Preview side by side */}
      <Stack direction="row" spacing={2} alignItems="flex-start">
        {/* Table */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#3b82f6" }} />
            </Box>
          ) : jobs.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8, border: "1px dashed #e2e8f0", borderRadius: "14px" }}>
              <Briefcase size={32} style={{ color: "#cbd5e1", marginBottom: 12 }} />
              <Typography color="#94a3b8" fontSize={14}>No jobs yet. Add your first listing.</Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: "14px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8fafc" }}>
                    {["Title", "Department", "Type", "Mode", "Status", "Actions"].map((h) => (
                      <TableCell key={h} sx={{ fontSize: 12, fontWeight: 700, color: "#64748b", py: 1.5 }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobs.map((job) => {
                    const dc = DEPT_COLORS[job.department] || { bg: "#f1f5f9", color: "#64748b" };
                    const isSelected = previewJob?.id === job.id;
                    return (
                      <TableRow
                        key={job.id}
                        onClick={() => setPreviewJob(isSelected ? null : job)}
                        sx={{
                          cursor: "pointer",
                          bgcolor: isSelected ? "#eff6ff" : "transparent",
                          "&:hover": { bgcolor: isSelected ? "#eff6ff" : "#f8fafc" },
                          borderLeft: isSelected ? "3px solid #3b82f6" : "3px solid transparent",
                          transition: "all 0.15s",
                        }}
                      >
                        <TableCell>
                          <Typography fontSize={13} fontWeight={600} color="#0f172a">{job.title}</Typography>
                          <Typography fontSize={11} color="#94a3b8">{job.location} · {job.experience}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={job.department} size="small" sx={{ fontSize: 11, height: 22, fontWeight: 600, bgcolor: dc.bg, color: dc.color }} />
                        </TableCell>
                        <TableCell>
                          <Typography fontSize={12} color="#64748b">{job.employmentType}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontSize={12} color="#64748b">{job.workMode}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={job.status === "published" ? "Published" : "Draft"}
                            size="small"
                            sx={{
                              fontSize: 11, height: 22, fontWeight: 600,
                              bgcolor: job.status === "published" ? "#ecfdf5" : "#f1f5f9",
                              color: job.status === "published" ? "#10b981" : "#64748b",
                            }}
                          />
                        </TableCell>
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Stack direction="row" spacing={0.5}>
                            <Tooltip title={job.status === "published" ? "Set to Draft" : "Publish"}>
                              <IconButton size="small" onClick={() => handleToggle(job)} sx={{ color: job.status === "published" ? "#10b981" : "#94a3b8" }}>
                                {job.status === "published" ? <Eye size={15} /> : <EyeOff size={15} />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small" onClick={() => openEdit(job)} sx={{ color: "#3b82f6" }}>
                                <Pencil size={15} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" onClick={() => setDeleteConfirm(job)} sx={{ color: "#ef4444" }}>
                                <Trash2 size={15} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>

        {/* Inline Preview Panel */}
        {previewJob && (
          <Box sx={{ width: 420, flexShrink: 0, border: "1px solid #e2e8f0", borderRadius: "14px", overflow: "hidden", maxHeight: "75vh", display: "flex", flexDirection: "column" }}>
            <JobPreview job={previewJob} onClose={() => setPreviewJob(null)} />
          </Box>
        )}
      </Stack>

      {/* Hint text */}
      {jobs.length > 0 && !previewJob && (
        <Typography fontSize={12} color="#94a3b8" sx={{ mt: 1.5, textAlign: "center" }}>
          Click any row to preview the job listing
        </Typography>
      )}
      </>)}

      {/* Candidates Tab */}
      {activeTab === "candidates" && (
        <Box>
          {appsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress sx={{ color: "#3b82f6" }} />
            </Box>
          ) : applications.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8, border: "1px dashed #e2e8f0", borderRadius: "14px" }}>
              <Users size={32} style={{ color: "#cbd5e1", marginBottom: 12 }} />
              <Typography color="#94a3b8" fontSize={14}>No applications yet.</Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e2e8f0", borderRadius: "14px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f8fafc" }}>
                    {["Name", "Email", "Phone", "Job Applied", "Experience", "Location", "Submitted"].map((h) => (
                      <TableCell key={h} sx={{ fontSize: 12, fontWeight: 700, color: "#64748b", py: 1.5 }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((app) => (
                    <TableRow key={app.id} sx={{ "&:hover": { bgcolor: "#f8fafc" } }}>
                      <TableCell>
                        <Typography fontSize={13} fontWeight={600} color="#0f172a">{app.fullName}</Typography>
                      </TableCell>
                      <TableCell><Typography fontSize={12} color="#64748b">{app.email}</Typography></TableCell>
                      <TableCell><Typography fontSize={12} color="#64748b">{app.phone}</Typography></TableCell>
                      <TableCell>
                        <Chip label={app.jobTitle || "—"} size="small" sx={{ fontSize: 11, height: 22, bgcolor: "#eff6ff", color: "#3b82f6", fontWeight: 600 }} />
                      </TableCell>
                      <TableCell><Typography fontSize={12} color="#64748b">{app.experience || "—"}</Typography></TableCell>
                      <TableCell><Typography fontSize={12} color="#64748b">{app.location || "—"}</Typography></TableCell>
                      <TableCell>
                        <Typography fontSize={11} color="#94a3b8">
                          {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth
        PaperProps={{ sx: { borderRadius: "16px", maxHeight: "90vh" } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 16, pb: 1 }}>
          {editingJob ? "Edit Job Listing" : "Add New Job Listing"}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <TextField label="Job Title *" value={form.title} onChange={f("title")} fullWidth size="small" />
              <TextField label="URL Slug" value={form.slug} onChange={f("slug")} fullWidth size="small" />
            </Stack>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth size="small">
                <InputLabel>Department *</InputLabel>
                <Select value={form.department} onChange={f("department")} label="Department *">
                  {DEPT_OPTIONS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Employment Type</InputLabel>
                <Select value={form.employmentType} onChange={f("employmentType")} label="Employment Type">
                  {TYPE_OPTIONS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField label="Location" value={form.location} onChange={f("location")} fullWidth size="small" />
              <FormControl fullWidth size="small">
                <InputLabel>Work Mode</InputLabel>
                <Select value={form.workMode} onChange={f("workMode")} label="Work Mode">
                  {MODE_OPTIONS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Experience" value={form.experience} onChange={f("experience")} fullWidth size="small" placeholder="e.g. 1–3 Years" />
            </Stack>
            <TextField label="Short Description *" value={form.shortDescription} onChange={f("shortDescription")} fullWidth size="small" multiline rows={2} />
            <TextField label="Overview" value={form.overview} onChange={f("overview")} fullWidth size="small" multiline rows={3} />
            <Stack direction="row" spacing={2}>
              <TextField label="Skills (one per line)" value={form.skills} onChange={f("skills")} fullWidth size="small" multiline rows={3} />
              <TextField label="Required Skills (one per line)" value={form.requiredSkills} onChange={f("requiredSkills")} fullWidth size="small" multiline rows={3} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField label="Preferred Skills (one per line)" value={form.preferredSkills} onChange={f("preferredSkills")} fullWidth size="small" multiline rows={3} />
              <TextField label="Responsibilities (one per line)" value={form.responsibilities} onChange={f("responsibilities")} fullWidth size="small" multiline rows={3} />
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField label="Benefits (one per line)" value={form.benefits} onChange={f("benefits")} fullWidth size="small" multiline rows={3} />
              <TextField label="Qualifications" value={form.qualifications} onChange={f("qualifications")} fullWidth size="small" multiline rows={3} />
            </Stack>
            <TextField label="Growth Path" value={form.growthPath} onChange={f("growthPath")} fullWidth size="small" placeholder="e.g. Junior → Senior → Lead" />
            <Stack direction="row" spacing={2}>
              <TextField label="Posted Date" value={form.postedDate} onChange={f("postedDate")} fullWidth size="small" type="date" InputLabelProps={{ shrink: true }} />
              <TextField label="Application Deadline" value={form.deadline} onChange={f("deadline")} fullWidth size="small" type="date" InputLabelProps={{ shrink: true }} />
            </Stack>
          </Stack>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: "none", color: "#64748b" }}>Cancel</Button>
          <Button
            variant="contained" onClick={handleSave} disabled={saving}
            sx={{ textTransform: "none", bgcolor: "#3b82f6", borderRadius: "10px", fontWeight: 600, "&:hover": { bgcolor: "#2563eb" } }}
          >
            {saving ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : editingJob ? "Save Changes" : "Create Job"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}
        PaperProps={{ sx: { borderRadius: "14px", p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 700, fontSize: 15 }}>Delete Job?</DialogTitle>
        <DialogContent>
          <Typography fontSize={13} color="#64748b">
            Are you sure you want to delete <strong>{deleteConfirm?.title}</strong>? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 2, pb: 2, gap: 1 }}>
          <Button onClick={() => setDeleteConfirm(null)} sx={{ textTransform: "none", color: "#64748b" }}>Cancel</Button>
          <Button
            variant="contained" onClick={() => handleDelete(deleteConfirm.id)}
            sx={{ textTransform: "none", bgcolor: "#ef4444", borderRadius: "10px", fontWeight: 600, "&:hover": { bgcolor: "#dc2626" } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snack.severity} sx={{ borderRadius: "10px" }} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminCareers;
