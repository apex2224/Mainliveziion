import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  MapPin, Briefcase, Clock, Calendar, ArrowLeft,
  CheckCircle, ChevronRight, X, Upload, Trash2,
} from "lucide-react";
import Navbar from "../head/Navbar";
import Footer from "../footer/Footer";
import { fetchPublishedJobs, fetchJobBySlug, submitApplication } from "../../firebase/careersFirebase";
import styles from "./JobDetail.module.css";

const JobDetail = () => {
  const { jobSlug } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [job, setJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchJobBySlug(jobSlug).catch(() => null),
      fetchPublishedJobs().catch(() => []),
    ]).then(([jobData, allData]) => {
      setJob(jobData);
      setAllJobs(allData);
    }).finally(() => setLoading(false));
  }, [jobSlug]);

  if (loading) {
    return (
      <div className={styles.notFound}>
        <Navbar />
        <div className={styles.notFoundContent}>
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!job) {
    return (
      <div className={styles.notFound}>
        <Navbar />
        <div className={styles.notFoundContent}>
          <h1>Position Not Found</h1>
          <p>This job listing may have been closed or the URL is incorrect.</p>
          <Link to="/careers" className={styles.backBtn}>
            <ArrowLeft size={16} /> View All Positions
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.jobDetailPage}>
      <Helmet>
        <title>{job.title} at Ziion Technology | Careers</title>
        <meta
          name="description"
          content={`${job.title} — ${job.department} | ${job.location} | ${job.employmentType}. ${job.shortDescription}`}
        />
        <link rel="canonical" href={`https://ziiontechnology.in/careers/${job.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job.title,
            description: job.overview,
            datePosted: job.postedDate,
            validThrough: job.deadline,
            employmentType: job.employmentType.toUpperCase().replace("-", "_"),
            hiringOrganization: {
              "@type": "Organization",
              name: "Ziion Technology",
              sameAs: "https://ziiontechnology.in",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mohali",
                addressRegion: "Punjab",
                addressCountry: "IN",
              },
            },
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/careers">Careers</Link>
        <span> / </span>
        <span>{job.title}</span>
      </div>

      <div className={styles.layout}>
        {/* ── Main Content ── */}
        <main className={styles.mainContent}>
          {/* Job Header */}
          <div className={styles.jobHeader}>
            <div className={styles.jobHeaderTop}>
              <span className={styles.jobDept}>{job.department}</span>
              <span
                className={`${styles.jobTypeBadge} ${
                  job.employmentType === "Internship" ? styles.internBadge : styles.fullTimeBadge
                }`}
              >
                {job.employmentType}
              </span>
            </div>
            <h1 className={styles.jobTitle}>{job.title}</h1>
            <div className={styles.jobMeta}>
              <span><MapPin size={14} style={{display:'inline',marginRight:4}} />{job.location}</span>
              <span><Briefcase size={14} style={{display:'inline',marginRight:4}} />{job.workMode}</span>
              <span><Clock size={14} style={{display:'inline',marginRight:4}} />{job.experience}</span>
              <span>
                <Calendar size={14} style={{display:'inline',marginRight:4}} />
                {job.postedDate ? `Posted ${new Date(job.postedDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}` : "Recently Posted"}
              </span>
            </div>
          </div>

          {/* Overview */}
          <section className={styles.jobSection}>
            <h2 className={styles.sectionTitle}>Job Overview</h2>
            <p className={styles.sectionText}>{job.overview}</p>
          </section>

          {/* Responsibilities */}
          <section className={styles.jobSection}>
            <h2 className={styles.sectionTitle}>Responsibilities</h2>
            <ul className={styles.bulletList}>
              {job.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>

          {/* Required Skills */}
          <section className={styles.jobSection}>
            <h2 className={styles.sectionTitle}>Required Skills</h2>
            <div className={styles.skillTags}>
              {job.requiredSkills.map((skill) => (
                <span key={skill} className={styles.skillTag}>
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Preferred Skills */}
          {job.preferredSkills?.length > 0 && (
            <section className={styles.jobSection}>
              <h2 className={styles.sectionTitle}>Preferred Skills</h2>
              <div className={styles.skillTags}>
                {job.preferredSkills.map((skill) => (
                  <span key={skill} className={`${styles.skillTag} ${styles.skillTagAlt}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Qualifications */}
          <section className={styles.jobSection}>
            <h2 className={styles.sectionTitle}>Qualifications</h2>
            <p className={styles.sectionText}>{job.qualifications}</p>
          </section>

          {/* Growth Path */}
          {job.growthPath && (
            <section className={styles.jobSection}>
              <h2 className={styles.sectionTitle}>Career Growth Path</h2>
              <p className={styles.growthPath}>{job.growthPath}</p>
            </section>
          )}

          {/* Related Jobs */}
          <section className={styles.jobSection}>
            <h2 className={styles.sectionTitle}>Other Open Positions</h2>
            <div className={styles.relatedJobs}>
              {allJobs
                .filter((j) => j.id !== job.id)
                .slice(0, 3)
                .map((related) => (
                  <Link
                    key={related.id}
                    to={`/careers/${related.slug}`}
                    className={styles.relatedJobCard}
                  >
                    <span className={styles.relatedJobDept}>{related.department}</span>
                    <p className={styles.relatedJobTitle}>{related.title}</p>
                    <span className={styles.relatedJobMeta}>
                      {related.workMode} · {related.experience}
                      <ChevronRight size={12} style={{display:'inline',marginLeft:4}} />
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        </main>

        {/* ── Sidebar ── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Apply for This Role</h3>
            <p className={styles.sidebarText}>
              Interested in this position? Submit your application and our team
              will review it shortly.
            </p>
            <button
              className={styles.applyBtn}
              onClick={() => setShowForm(true)}
            >
              Apply Now
            </button>
            <Link to="/careers" className={styles.backLink}>
              <ArrowLeft size={14} /> All Positions
            </Link>
          </div>

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Benefits</h3>
            <ul className={styles.benefitsList}>
              {job.benefits.map((b, i) => (
                <li key={i} className={styles.benefitItem}>
                  <CheckCircle size={14} className={styles.benefitCheck} /> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>Application Deadline</h3>
            <p className={styles.deadlineDate}>
              {job.deadline
                ? new Date(job.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                : "Open until filled"}
            </p>
          </div>
        </aside>
      </div>

      {/* ── Application Modal ── */}
      {showForm && (
        <ApplicationModal
          jobTitle={job.title}
          jobId={job.id}
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            navigate("/thank-you");
          }}
        />
      )}

      <Footer />
    </div>
  );
};

// ── Application Modal ─────────────────────────────────────────────────────────
const ApplicationModal = ({ jobTitle, jobId, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    portfolio: "",
    linkedin: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit phone number is required";
    if (!resume) e.resume = "Resume is required";
    return e;
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC, or DOCX files are allowed" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: "File size must be under 5MB" }));
      return;
    }
    setResume(file);
    setErrors((prev) => ({ ...prev, resume: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('jobTitle', jobTitle);
      if (resume) formData.append('resume', resume);

      const res = await fetch('/api/careers/apply', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Failed');

      await submitApplication({ ...form, jobTitle, resumeName: resume?.name || '' });
      onSuccess();
    } catch {
      setErrors((prev) => ({ ...prev, submit: 'Submission failed. Please try again.' }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-label="Job Application Form">
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Apply for {jobTitle}</h2>
            <p className={styles.modalSubtitle}>Fill in your details and we'll be in touch.</p>
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <X size={16} />
        </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.appForm} noValidate>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                type="text"
                value={form.fullName}
                onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                className={errors.fullName ? styles.inputError : ""}
                placeholder="Your full name"
              />
              {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={errors.email ? styles.inputError : ""}
                placeholder="your@email.com"
              />
              {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className={errors.phone ? styles.inputError : ""}
                placeholder="10-digit mobile number"
              />
              {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="location">Current Location</label>
              <input
                id="location"
                type="text"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="City, State"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="experience">Years of Experience</label>
              <select
                id="experience"
                value={form.experience}
                onChange={(e) => setForm((f) => ({ ...f, experience: e.target.value }))}
              >
                <option value="">Select experience</option>
                <option value="fresher">Fresher</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-2">1–2 years</option>
                <option value="2-3">2–3 years</option>
                <option value="3+">3+ years</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="portfolio">Portfolio / Website</label>
              <input
                id="portfolio"
                type="url"
                value={form.portfolio}
                onChange={(e) => setForm((f) => ({ ...f, portfolio: e.target.value }))}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="linkedin">LinkedIn Profile</label>
            <input
              id="linkedin"
              type="url"
              value={form.linkedin}
              onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="resume">Resume / CV * (PDF, DOC, DOCX — max 5MB)</label>
            <div className={styles.fileUpload}>
              <input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeChange}
                className={styles.fileInput}
              />
              <label htmlFor="resume" className={styles.fileLabel}>
                {resume ? (
                  <><CheckCircle size={14} style={{display:'inline',marginRight:6}} />{resume.name}</>
                ) : (
                  <><Upload size={14} style={{display:'inline',marginRight:6}} />Choose File</>
                )}
              </label>
              {resume && (
                <button type="button" className={styles.removeFile} onClick={() => setResume(null)}>
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            {errors.resume && <span className={styles.errorMsg}>{errors.resume}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="coverLetter">Cover Letter / Additional Information</label>
            <textarea
              id="coverLetter"
              value={form.coverLetter}
              onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
              rows={4}
              placeholder="Tell us why you're a great fit for this role..."
            />
          </div>

          <div className={styles.formActions}>
            {errors.submit && <span className={styles.errorMsg} style={{display:'block',marginBottom:8}}>{errors.submit}</span>}
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobDetail;
