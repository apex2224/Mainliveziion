import React, { useState } from "react";
import styles from "./studentform.module.css";
import {
  User,
  BookOpen,
  Calendar,
  Hash,
  CheckCircle,
  Loader,
} from "lucide-react";

const FIREBASE_URL = "https://studentdata-18fe7-default-rtdb.firebaseio.com/";

const Studentform = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    referenceNumber: "",
    name: "",
    course: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(`${FIREBASE_URL}/studentData.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setFormData({
            referenceNumber: "",
            name: "",
            course: "",
            startDate: "",
            endDate: "",
          });
          setSuccess(false);
        }, 3000);
      } else {
        alert("❌ Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("⚠️ Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formWrapper}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.iconWrapper}>
            <BookOpen className={styles.headerIcon} />
          </div>
          <h1 className={styles.mainTitle}>Student Registration</h1>
          <p className={styles.subtitle}>
            Fill in your details to enroll in our courses
          </p>
        </div>

        {/* Form Card */}
        <div className={styles.formCard}>
          {/* Success Message */}
          {success && (
            <div className={styles.successBanner}>
              <CheckCircle className={styles.successIcon} />
              <p>✅ Student data submitted successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className="space-y-6">
              {" "}
              {/* This utility class was kept as CSS module doesn't have a direct replacement for spacing */}
              {/* Reference Number */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Reference Number</label>
                <div className={styles.inputWrapper}>
                  <Hash className={styles.inputIcon} />
                  <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    required
                    placeholder="Enter reference number"
                    className={styles.input}
                  />
                </div>
              </div>
              {/* Name */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <div className={styles.inputWrapper}>
                  <User className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className={styles.input}
                  />
                </div>
              </div>
              {/* Course */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Course</label>
                <div className={styles.inputWrapper}>
                  <BookOpen className={styles.inputIcon} />
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    placeholder="Enter course name"
                    className={styles.input}
                  />
                </div>
              </div>
              {/* Date Fields */}
              <div className={styles.dateGrid}>
                {/* Start Date */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Start Date</label>
                  <div className={styles.inputWrapper}>
                    <Calendar className={styles.inputIcon} />
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>End Date</label>
                  <div className={styles.inputWrapper}>
                    <Calendar className={styles.inputIcon} />
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={styles.submitBtn}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className={styles.btnIcon} />
                    <span>Submit Registration</span>
                  </>
                )}
              </button>
            </div>

            {/* Info Text */}
            <p className={styles.infoText}>
              By submitting this form, you agree to our terms and conditions
            </p>
          </form>
        </div>

        {/* Footer Note */}
        <div className={styles.footer}>
          <p>
            Need help? Contact us at{" "}
            <a href="mailto:support@ziion.com" className={styles.footerLink}>
              support@ziion.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Studentform;
