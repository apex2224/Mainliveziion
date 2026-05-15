import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormFilled, resetForm } from "../../store/studentSlice";
import styles from "./form.module.css";
import emailjs from "@emailjs/browser";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

function Form({ closeForm }) {
  const formData = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
          college: formData.college,
          email: formData.email,
          phone: formData.phone,
          course: formData.course,
          preference: formData.category,
        },
        "j6fsWCbZRRU2n1J4A",
      );

      dispatch(resetForm());
      closeForm();
      navigate("/thank-you");
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={closeForm}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeForm}>
          &times;
        </button>

        {/* LEFT BANNER */}
        <div className={styles.leftBanner}>
          <img
            src={images.ziionTechLogo}
            alt="Ziion Technology"
            className={styles.logo}
          />
          <h3>Delivering innovative IT strategies for real-world impact.</h3>

          {/* Office Addresses */}
          <div className={styles.addressSection}>
            <div className={styles.addressItem}>
              <FaMapMarkerAlt className={styles.addressIcon} />
              <div>
                <span className={styles.officeLabel}>Office 1 — Mohali</span>
                <p>D-152, Phase 8, Industrial Area, Mohali</p>
              </div>
            </div>
            <div className={styles.addressItem}>
              <FaMapMarkerAlt className={styles.addressIcon} />
              <div>
                <span className={styles.officeLabel}>Office 2 — CANADA</span>
                <p>2970 Drew Rd, CANADA, ON L4T 0A6</p>
              </div>
            </div>
          </div>

          <p>You can also find us here:</p>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/ziion_technology/?next=%2F&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className={styles.formIcon} />
            </a>
            <a
              href="https://www.linkedin.com/company/verma-programming-minds/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className={styles.formIcon} />
            </a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formContainer}>
          <h2>
            Get <span className={styles.gradientText}>Freebies</span> of upto
            ₹15000
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* --- Name Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" " /* Required for floating label */
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className={styles.floatingLabel}>
                Full Name*
              </label>
            </div>

            {/* --- Email Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className={styles.floatingLabel}>
                Email*
              </label>
            </div>

            {/* --- College Name Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="college"
                id="college"
                placeholder=" "
                value={formData.college}
                onChange={handleChange}
                required
              />
              <label htmlFor="college" className={styles.floatingLabel}>
                College Name
              </label>
            </div>

            {/* --- Phone Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className={styles.floatingLabel}>
                Phone Number*
              </label>
            </div>

            {/* --- Course Select --- */}
            <div className={styles.inputGroup}>
              <select
                name="course"
                id="course"
                value={formData.course}
                onChange={handleChange}
                required
                /* This class applies the invalid style when no value is selected */
                className={!formData.course ? styles.invalidSelect : ""}
              >
                <option value="" disabled>
                  Select Course*
                </option>
                <option value="Full Stack Development">
                  Full Stack Development
                </option>
                <option value="Web Designing">Web Designing</option>
                <option value="Graphic Designing">Graphic Designing</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="DevOps">DevOps</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Python">Python</option>
              </select>
              <label htmlFor="course" className={styles.floatingLabel}>
                Select Course*
              </label>
            </div>

            {/* --- Radio Options --- */}
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
                Others
              </label>
            </div>

            {/* --- Submit Button --- */}
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
