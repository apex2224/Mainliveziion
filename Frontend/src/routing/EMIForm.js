import React, { useState } from "react";
import styles from "./EMIForm.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { FormFilled, resetForm } from '../store/studentSlice';
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EMIForm() {
  const formData = useSelector(state => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emiOption, setEmiOption] = useState("");

  // Show form only on All Courses pages
  const isAllCoursesPage = location.pathname === '/allcourses' || location.pathname === '/courses';

  // Determine if we're on the special pages that need white theme
  const isSpecialPage = location.pathname === '/six-month-training' || location.pathname === '/six-weeks-training';

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(FormFilled({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        'service_4zv8d5l',
        'template_7lt1pb6',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          emiOption: emiOption,
          page_url: window.location.href,
        },
        'j6fsWCbZRRU2n1J4A'
      );

      dispatch(resetForm());
      setEmiOption("");
      navigate('/thank-you', { state: { name: formData.name, source: 'tracking' } });
    } catch (error) {
      console.error('EmailJS Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    dispatch(resetForm({
     name: "",
     email: "",
     phone: "",
     course: ""
    }));
    setEmiOption("");
  };

  return (
    <>
      {/* Left Vertical Button - Only show on All Courses page */}
      {isAllCoursesPage && (
        <div className={`${styles.leftButtonContainer} ${isSpecialPage ? styles.whiteTheme : ''}`} onClick={() => setOpen(true)}>
          <span className={`${styles.leftButtonText} ${isSpecialPage ? styles.whiteThemeText : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${styles.leftButtonIcon} ${isSpecialPage ? styles.whiteThemeIcon : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke={isSpecialPage ? "white" : "currentColor"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8m-8 6h8m-8 6h8"
              />
            </svg>
            EMI Available
          </span>
        </div>
      )}

      {/* Popup Form - Only show on All Courses page */}
      {isAllCoursesPage && open && (
        <div className={`${styles.popupOverlay} ${isSpecialPage ? styles.whiteThemeOverlay : ''}`}>
          <div className={`${styles.popupFormBox} ${isSpecialPage ? styles.whiteThemeFormBox : ''}`}>
            <h3 className={isSpecialPage ? styles.whiteThemeHeading : ''}>We will get back to you soon</h3>
            <button
              className={`${styles.popupCloseBtn} ${isSpecialPage ? styles.whiteThemeCloseBtn : ''}`}
              onClick={() => setOpen(false)}
              aria-label="Close form"
            >
              &times;
            </button>

            <form onSubmit={handleSubmit} className={styles.popupForm}>
              <input
                type="text"
                name="name"
                placeholder="Full Name*"
                value={formData.name}
                onChange={handleChange}
                required
                className={isSpecialPage ? styles.whiteThemeInput : ''}
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                required
                className={isSpecialPage ? styles.whiteThemeInput : ''}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number*"
                value={formData.phone}
                onChange={handleChange}
                required
                className={isSpecialPage ? styles.whiteThemeInput : ''}
              />
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className={isSpecialPage ? styles.whiteThemeInput : ''}
              >
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

              {/* EMI Options */}
              <select
                name="emiOption"
                value={emiOption}
                onChange={(e) => setEmiOption(e.target.value)}
                required
                className={isSpecialPage ? styles.whiteThemeInput : ''}
              >
                <option value="" disabled>Select EMI Plan*</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Months</option>
                <option value="6 Months">6 Months</option>
              </select>

             <div>
               <button type="submit" disabled={loading} className={`${styles.popupSubmitBtn} ${isSpecialPage ? styles.whiteThemeSubmitBtn : ''}`}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" onClick={handleReset} className={`${styles.popupResetBtn} ${isSpecialPage ? styles.whiteThemeResetBtn : ''}`}>
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
