import React, { useState, useEffect } from "react";
import styles from "./SyllabusForm.module.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

// --- Icon Components (Inline SVG for simplicity) ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const CollegeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const CourseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Main Form Component ---

// <-- UPDATED to accept `defaultCourse` prop -->
const SyllabusForm = ({ defaultCourse = "" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    college: "",
    course: defaultCourse, // <-- Set initial state from prop
  });

  const [loading, setLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // For load-in animation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Add loaded class after component mounts for animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // <-- ADDED useEffect to update form if prop changes -->
  useEffect(() => {
    if (defaultCourse) {
      setFormData((prev) => ({ ...prev, course: defaultCourse }));
    }
  }, [defaultCourse]);

  // --- Validation Logic ---
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required.";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required.";
        else if (!/^\d{10}$/.test(value)) error = "Must be 10 digits.";
        break;
      case "college":
        if (!value.trim()) error = "College name is required.";
        break;
      case "course":
        if (!value) error = "Course selection is required.";
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const getValidationClass = (name) => {
    if (!touched[name]) return ""; // Not touched yet
    return errors[name] ? styles.isInvalid : styles.isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields on submit
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, phone: true, college: true, course: true });

    // If there are errors, stop
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      // Send email using EmailJS with the current fields
      await emailjs.send(
        "service_09dpakp", // Your Service ID
        "template_gs3qao1", // Your Template ID from Form.js
        {
          name: formData.name,
          college: formData.college, // Using college as email for this template
          phone: formData.phone,
          course: formData.course,
          preference: "Syllabus Request", // Using a fixed value for preference as this is a syllabus request
        },
        "nxDr7y8eXJG5rDyyN" // Your Public Key  nxDr7y8eXJG5rDyyN
      );

      // Navigate to ThankYou page with name parameter after successful submission
      navigate("/thank-you", { state: { name: formData.name } });

      // Reset form after successful submission
      setFormData({
        name: "",
        phone: "",
        college: "",
        course: "",
      });
      setErrors({}); // Clear errors
      setTouched({}); // Reset touched state
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <-- UPDATED CLASSNAME -->
    <div className={styles.formWrapperInModal}>
      <form
        className={`${styles.formContainer} ${isLoaded ? styles.loaded : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className={styles.title}>Download Syllabus</h2>

        {/* --- Name Field --- */}
        <div className={`${styles.formGroup} ${getValidationClass("name")}`}>
          <span className={styles.iconWrapper}>
            <UserIcon />
          </span>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.formInput}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            required
          />
          <label htmlFor="name" className={styles.formLabel}>
            Student Name
          </label>
          <span className={styles.validationIcon}>
            {errors.name ? <ErrorIcon /> : <CheckIcon />}
          </span>
          {errors.name && (
            <span className={styles.errorText}>{errors.name}</span>
          )}
        </div>

        {/* --- Phone Field --- */}
        <div className={`${styles.formGroup} ${getValidationClass("phone")}`}>
          <span className={styles.iconWrapper}>
            <PhoneIcon />
          </span>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={styles.formInput}
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            required
          />
          <label htmlFor="phone" className={styles.formLabel}>
            Phone Number (10-digit)
          </label>
          <span className={styles.validationIcon}>
            {errors.phone ? <ErrorIcon /> : <CheckIcon />}
          </span>
          {errors.phone && (
            <span className={styles.errorText}>{errors.phone}</span>
          )}
        </div>

        {/* --- College Field --- */}
        <div className={`${styles.formGroup} ${getValidationClass("college")}`}>
          <span className={styles.iconWrapper}>
            <CollegeIcon />
          </span>
          <input
            type="text"
            id="college"
            name="college"
            className={styles.formInput}
            value={formData.college}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" "
            required
          />
          <label htmlFor="college" className={styles.formLabel}>
            College Name
          </label>
          <span className={styles.validationIcon}>
            {errors.college ? <ErrorIcon /> : <CheckIcon />}
          </span>
          {errors.college && (
            <span className={styles.errorText}>{errors.college}</span>
          )}
        </div>

        {/* --- Course Field (Select) --- */}
        <div className={`${styles.formGroup} ${getValidationClass("course")}`}>
          <span className={styles.iconWrapper}>
            <CourseIcon />
          </span>
          <select
            id="course"
            name="course"
            className={styles.formInput}
            value={formData.course} // This will be pre-filled
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="" disabled>
              Select Course
            </option>
            <option value="full-stack-development">
              Full Stack Development
            </option>
            <option value="data-science">Data Science</option>
            <option value="web-designing">Web Designing</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="php">PHP</option>
            <option value="python">Python</option>
            <option value="artificial-intelligence">
              Artificial Intelligence
            </option>
            <option value="machine-learning">Machine Learning</option>
            <option value="mobile-app-development">
              Mobile App Development
            </option>
            {/* --- ADDED OPTIONS FROM CARDS --- */}
            <option value="cloud-computing">Cloud Computing</option>
            <option value="devops">DevOps</option>
            <option value="cybersecurity">Cybersecurity</option>
          </select>
          <label htmlFor="course" className={styles.formLabelSelect}>
            Course Interested
          </label>
          <span className={`${styles.validationIcon} ${styles.selectIcon}`}>
            {errors.course ? <ErrorIcon /> : <CheckIcon />}
          </span>
          {errors.course && (
            <span className={styles.errorText}>{errors.course}</span>
          )}
        </div>

        {/* --- Submit Button --- */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? (
            <div className={styles.spinner}></div>
          ) : (
            "Request For Syllabus"
          )}
          <span className={styles.shine}></span>
        </button>
      </form>
    </div>
  );
};

export default SyllabusForm;
