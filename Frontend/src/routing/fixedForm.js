import React, { useState, useEffect } from "react";
import styles from "./popupForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FormFilled, resetForm } from "../store/studentSlice";
import emailjs from "@emailjs/browser";
import { useNavigate, useLocation } from "react-router-dom";
import { usePageSource } from "../context/PageContext";
import { User, Mail, Phone, BookOpen, CreditCard, X, MessageCircle } from "lucide-react";

export default function FixedForm({ externalOpen, setExternalOpen }) {
  const formData = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emiOption, setEmiOption] = useState("");
  const pageName = usePageSource();

  useEffect(() => {
    if (externalOpen) {
      setOpen(true);
      setExternalOpen(false);
    }
  }, [externalOpen, setExternalOpen]);

  const isCourseDetailPage =
    location.pathname.startsWith("/web-development") ||
    location.pathname.startsWith("/web-designing") ||
    location.pathname.startsWith("/digital-marketing") ||
    location.pathname.startsWith("/data-science") ||
    location.pathname.startsWith("/data-analytics") ||
    location.pathname.startsWith("/ai") ||
    location.pathname.startsWith("/ml") ||
    location.pathname.startsWith("/mobileapp") ||
    location.pathname.startsWith("/php") ||
    location.pathname.startsWith("/graphic") ||
    location.pathname.startsWith("/allcourses/") ||
    location.pathname === "/industrial-training";

  const isAllCoursesPage =
    location.pathname === "/allcourses" || location.pathname === "/courses";

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(FormFilled({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_4zv8d5l",
        "template_7lt1pb6",
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          emiOption,
          page_source: pageName,
        },
        "j6fsWCbZRRU2n1J4A"
      );
      dispatch(resetForm());
      setEmiOption("");
      setOpen(false);
      navigate("/thank-you", { state: { name: formData.name, source: "tracking" } });
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    dispatch(resetForm({ name: "", email: "", phone: "", course: "" }));
    setEmiOption("");
  };

  if (!isCourseDetailPage || isAllCoursesPage) return null;

  return (
    <>
      {open && (
        <div className={styles.popupOverlay} onClick={() => setOpen(false)}>
          <div className={styles.popupFormBox} onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className={styles.formHeader}>
              <div className={styles.formIconBadge}>
                <MessageCircle size={20} />
              </div>
              <div>
                <p className={styles.formTitle}>Talk To Our Expert</p>
                <p className={styles.formSubtitle}>We'll get back to you within 24 hrs</p>
              </div>
            </div>

            {/* Close */}
            <button className={styles.popupCloseBtn} onClick={() => setOpen(false)} aria-label="Close">
              <X size={16} />
            </button>

            <form onSubmit={handleSubmit} className={styles.popupForm}>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><User size={15} /></span>
                <input type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} required />
              </div>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><Mail size={15} /></span>
                <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
              </div>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><Phone size={15} /></span>
                <input type="tel" name="phone" placeholder="Phone Number*" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><BookOpen size={15} /></span>
                <select name="course" value={formData.course} onChange={handleChange} required>
                  <option value="" disabled>Select Course*</option>
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="Web Designing">Web Designing</option>
                  <option value="Graphic Designing">Graphic Designing</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Python">Python</option>
                </select>
              </div>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><CreditCard size={15} /></span>
                <select name="emiOption" value={emiOption} onChange={(e) => setEmiOption(e.target.value)} required>
                  <option value="" disabled>Select EMI Plan*</option>
                  <option value="1 Month">1 Month</option>
                  <option value="3 Months">3 Months</option>
                  <option value="6 Months">6 Months</option>
                </select>
              </div>
              <div className={styles.btnRow}>
                <button type="submit" disabled={loading} className={styles.popupSubmitBtn}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button type="button" onClick={handleReset} className={styles.popupResetBtn}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
