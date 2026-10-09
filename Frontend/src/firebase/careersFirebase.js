const CAREERS_DB_URL = "https://ziionblogs-default-rtdb.firebaseio.com/";

export const fetchAllJobs = async () => {
  const res = await fetch(`${CAREERS_DB_URL}/jobs.json`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();
  if (!data) return [];
  return Object.entries(data)
    .map(([id, job]) => ({ id, ...job }))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const fetchPublishedJobs = async () => {
  const jobs = await fetchAllJobs();
  return jobs.filter((j) => j.status === "published");
};

export const fetchJobBySlug = async (slug) => {
  const jobs = await fetchAllJobs();
  const job = jobs.find((j) => j.slug === slug);
  if (!job) throw new Error("Job not found");
  return job;
};

export const createJob = async (jobData) => {
  const payload = { ...jobData, createdAt: new Date().toISOString(), status: "draft" };
  const res = await fetch(`${CAREERS_DB_URL}/jobs.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create job");
  return await res.json();
};

export const updateJob = async (id, jobData) => {
  const payload = { ...jobData, updatedAt: new Date().toISOString() };
  const res = await fetch(`${CAREERS_DB_URL}/jobs/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update job");
  return await res.json();
};

export const deleteJob = async (id) => {
  const res = await fetch(`${CAREERS_DB_URL}/jobs/${id}.json`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete job");
};

export const toggleJobStatus = async (id, currentStatus) => {
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const res = await fetch(`${CAREERS_DB_URL}/jobs/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus, updatedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error("Failed to toggle status");
  return newStatus;
};

export const submitApplication = async (applicationData) => {
  const payload = { ...applicationData, submittedAt: new Date().toISOString(), status: "new" };
  const res = await fetch(`${CAREERS_DB_URL}/applications.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit application");
  return await res.json();
};

export const fetchAllApplications = async () => {
  const res = await fetch(`${CAREERS_DB_URL}/applications.json`);
  if (!res.ok) throw new Error("Failed to fetch applications");
  const data = await res.json();
  if (!data) return [];
  return Object.entries(data)
    .map(([id, app]) => ({ id, ...app }))
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
};
