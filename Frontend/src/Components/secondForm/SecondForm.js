import React, { useState } from "react";
import styles from "./secondform.module.css";
import {
  FaTelegramPlane,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import { FaTwitter, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FormFilled, resetForm } from "../../store/studentSlice";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const SecondForm = ({ closeForm }) => {
  const formData = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

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
  const handleReset = () => {
    setData({
      name: "",
      email: "",
      phone: "",
      course: "",
    });
  };

  return (
    <>
      <section className={styles.contactSection}>
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name*"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number*"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
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

            <button type="submit" disabled={loading} className={styles.sendBtn}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetBtn}
            >
              Reset
            </button>
          </form>
        </div>

        <div className={styles.infoBox}>
          <h4 className={styles.subTitle}>NEED ANY HELP?</h4>

          <p className={styles.desc}>
            Ziiion Technology empowers businesses with innovative solutions,
            driving success through cutting-edge technology and exceptional
            services tailored to your needs.
          </p>

          <div className={styles.contactItem}>
            <FaTelegramPlane className={styles.icon} />
            <div>
              <h5>Visit Us</h5>
              <p>
                <strong>Office 1 — Mohali:</strong>
                <br />
                Building No. D152, 1st Floor, Phase 8, Industrial Area, Mohali
              </p>
              <p style={{ marginTop: "6px" }}>
                <strong>Office 2 — CANADA:</strong>
                <br />
                2970 Drew Rd, CANADA, ON L4T 0A6
              </p>
            </div>
          </div>

          <div className={styles.contactItem}>
            <FaPhoneAlt className={styles.icon} />
            <div>
              <h5>Have any question?</h5>
              <p>+919878564224, +919779904224</p>
            </div>
          </div>

          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <div>
              <h5>Write Email</h5>
              <p>ziiontechnology@gmail.com</p>
            </div>
          </div>

          <div className={styles.socials}>
            <p>Follow Us</p>
            <div className={styles.icons}>
              <a
                href="https://www.instagram.com/ziion_technology/?next=%2F&hl=en"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/verma-programming-minds/">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SecondForm;
