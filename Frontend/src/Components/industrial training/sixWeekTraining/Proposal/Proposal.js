import React, { useState } from "react";
import styles from "./Proposal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const Proposal = () => {
  // 1. Updated state to match Form.js fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    category: "", // For the radio buttons
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 2. Updated template parameters to match Form.js and its template
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      course: formData.course,
      preference: formData.category, // 'preference' is likely the variable in your email template
    };

    try {
      await emailjs.send(
        "service_4zv8d5l", // Your Service ID
        "template_7lt1pb6", // Your Template ID from Form.js
        templateParams,
        "j6fsWCbZRRU2n1J4A" // Your Public Key
      );

      // Navigate to ThankYou page with name parameter after successful submission
      navigate("/thank-you", { state: { name: formData.name } });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        category: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Sorry, something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.proposalContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>
            Get in Touch With Us{" "}
            <span className={styles.bigProject}>Big Project!</span>
          </h2>
          <p className={styles.heroDescription}>
            Fill out the form and our team will get back to you as soon as
            possible. Whether you're interested in our courses, partnerships, or
            just want to say hello — we’d love to hear from you!
          </p>
          <div className={styles.contactInfo}>
            <p>
              <FontAwesomeIcon icon={faPhone} className={styles.icon} />{" "}
              9878564224, 9779904224 <span className={styles.flag}></span>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />{" "}
              ziiontechnology@gmail.com
            </p>
          </div>
        </div>

        <div className={styles.formCard}>
          <form className={styles.proposalForm} onSubmit={handleSubmit}>
            {/* 3. Form fields are now identical to Form.js */}
            <div className={styles.formGroup}>
              <input
                type="text"
                name="name"
                className={styles.formInput}
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className={styles.formLabel}>
                Full Name*
              </label>
            </div>

            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                className={styles.formInput}
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className={styles.formLabel}>
                Email ID*
              </label>
            </div>

            <div className={styles.formGroup}>
              <input
                type="tel"
                name="phone"
                className={styles.formInput}
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className={styles.formLabel}>
                Phone Number*
              </label>
            </div>

            <div className={styles.formGroup}>
              <select
                name="course"
                className={styles.formInput}
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Course*</option>
                <option value="Full Stack Development">Full Stack Development</option>
                <option value="Web Designing">Web Designing</option>
                <option value="Graphic Designing">Graphic Designing</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Science">Data Analytics</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="DevOps">DevOps</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Python">Python</option>
              </select>
            </div>

            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="Working Professional"
                  checked={formData.category === "Working Professional"}
                  onChange={handleChange}
                  required
                />
                <span className={styles.customRadio}></span>
                Working Professional
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="College Student - Pursuing"
                  checked={formData.category === "College Student - Pursuing"}
                  onChange={handleChange}
                />
                <span className={styles.customRadio}></span>
                College Student - Pursuing
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="College Student - Final Year"
                  checked={formData.category === "College Student - Final Year"}
                  onChange={handleChange}
                />
                <span className={styles.customRadio}></span>
                College Student - Final Year
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="Others"
                  checked={formData.category === "Others"}
                  onChange={handleChange}
                />
                <span className={styles.customRadio}></span>
                Others
              </label>
            </div>

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.requestProposalButton}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Request Proposal"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
