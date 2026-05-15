import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Help.module.css";
import Navbar from "../head/Navbar";
import Footer from "../footer/Footer";
import Form from "../form/Form";
import useCustom from "../customHook/useCustom";
import { useDispatch, useSelector } from "react-redux";
import { FormFilled, resetForm } from "../../store/studentSlice";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

const Help = ({ closeForm }) => {
  useCustom("About us | Ziion Technology");
  const [showForm, setShowForm] = useState(false);

  // form //
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
    <Fragment>
      <Navbar />
      <div>
        <section className={styles.hero}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h1 className={styles.title}>Get in Touch With Us</h1>
              <p className={styles.subtitle}>
                Have questions? We’d love to hear from you. Whether you need
                support, training details, or want to visit us — we’re here to
                help.
              </p>
              <button
                className={styles.headerBtn}
                onClick={() => setShowForm(true)}
              >
                Contact Us
              </button>
              {showForm && <Form closeForm={() => setShowForm(false)} />}
            </div>
          </div>
        </section>
      </div>

      <div className={styles.wrapper}>
        {/* Top Section */}
        <div className={styles.container}>
          {/* Left Section */}
          <div className={styles.left}>
            <h4 className={styles.subHeading}>LET’S PLAN YOUR JOURNEY…</h4>
            <h2 className={styles.heading}>Reach Us!</h2>

            <div className={styles.infoBlock}>
              <h3>Address</h3>

              <p>
                <strong>Office 1 — Mohali:</strong> D-152 First Floor Industrial
                Area Phase-8 Sector-72, Mohali
              </p>

              <p>
                <strong>Office 2 — CANADA:</strong> 2970 Drew Rd, CANADA, ON L4T
                0A6
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Contact</h3>
              <p>
                <strong>Mobile:</strong> +91 9878564224 | +91 9779904224
              </p>
              <p>
                <strong>Mail:</strong> ziiontechnology@gmail.com
              </p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Office Timing</h3>
              <p>Mon – Sat : 9:00 AM – 6:30 PM</p>
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.right}>
            <h4 className={styles.subHeading}>CONTACT US</h4>
            <h2 className={styles.heading}>Get in Touch</h2>

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
                <option value="">Select Course*</option>
                <option value="Full Stack Development">
                  Full Stack Development
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Web Designing">Web Designing</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Graphic Designing">Graphic Designing</option>
                <option value="PHP">PHP</option>
                <option value="Python">Python</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
              </select>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.headerBtn}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className={styles.headerBtn}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapSection}>
          {[
            {
              city: "OFFICE 1 — MOHALI",
              address:
                "D152, First Floor, Phase-8, Industrial Area, Sector - 72, Mohali - 160055",
              phone: "+91 9878564224 | +91 9779904224",
              mapSrc:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.2092264234693!2d76.70553657537212!3d30.71251797459404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef7b48418d6b%3A0x8b24ec380ed85440!2sZiion%20Technology%20-%20Software%20Company%20in%20Mohali!5e0!3m2!1sen!2sin!4v1756213977139!5m2!1sen!2sin",
            },
            {
              city: "OFFICE 2 — CANADA",
              address: "2970 Drew Rd, CANADA, ON L4T 0A6, Canada",
              phone: "+91 9878564224 | +91 9779904224",
              mapSrc:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.0!2d-79.6441!3d43.7315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3d4a1b1a3a3b%3A0x1234567890abcdef!2s2970+Drew+Rd%2C+CANADA%2C+ON+L4T+0A6!5e0!3m2!1sen!2sin!4v1716000000000!5m2!1sen!2sin",
            },
          ].map((loc, idx) => (
            <div key={idx} className={styles.mapCard}>
              <h3>{loc.city}</h3>
              <p>{loc.address}</p>
              <p>
                <strong>Mobile:</strong> {loc.phone}
              </p>
              <iframe
                src={loc.mapSrc}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title={loc.city}
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default Help;
