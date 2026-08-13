import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormFilled, resetForm } from "../../store/studentSlice";
import styles from "./form.module.css";
import emailjs from "@emailjs/browser";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { usePageSource } from "../../context/PageContext";
import { User, Mail, Phone, BookOpen, GraduationCap, X, Gift, CheckCircle2, CreditCard, BadgePercent, ShieldCheck } from "lucide-react";

function Form({ closeForm }) {
  const formData = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pageName = usePageSource();
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
          page_source: pageName,
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

  const emiPerks = [
    { icon: CreditCard,   title: "0% Interest EMI",     desc: "Pay in easy monthly instalments" },
    { icon: BadgePercent, title: "Up to ₹15,000 Off",   desc: "Freebies & scholarship on enrolment" },
    { icon: ShieldCheck,  title: "No Hidden Charges",   desc: "Transparent fee structure always" },
    { icon: CheckCircle2, title: "Flexible Plans",       desc: "1, 3 or 6 month EMI options" },
  ];

  return (
    <div className={styles.modalOverlay} onClick={closeForm}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>

        {/* Close */}
        <button className={styles.closeBtn} onClick={closeForm} aria-label="Close">
          <X size={18} />
        </button>

        {/* LEFT BANNER */}
        <div className={styles.leftBanner}>
          <img src={images.ziionTechLogo} alt="Ziion Technology" className={styles.logo} />

          <div className={styles.bannerHeading}>
            <Gift size={18} className={styles.giftIcon} />
            <span>Get Freebies worth <strong>₹15,000</strong></span>
          </div>

          <p className={styles.bannerSub}>Enrol today & unlock exclusive benefits</p>

          <div className={styles.emiCards}>
            {emiPerks.map(({ icon: Icon, title, desc }) => (
              <div className={styles.emiCard} key={title}>
                <div className={styles.emiCardIcon}><Icon size={16} /></div>
                <div>
                  <p className={styles.emiCardTitle}>{title}</p>
                  <p className={styles.emiCardDesc}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className={styles.bannerNote}>🎓 5000+ students already enrolled</p>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.formIconBadge}><Gift size={20} /></div>
            <div>
              <h2 className={styles.formTitle}>
                Claim Your <span className={styles.gradientText}>Freebies</span>
              </h2>
              <p className={styles.formSubtitle}>Fill in your details — takes 30 seconds</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>

            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><User size={15} /></span>
              <input type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} required />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><Mail size={15} /></span>
              <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><GraduationCap size={15} /></span>
              <input type="text" name="college" placeholder="College Name" value={formData.college} onChange={handleChange} />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><Phone size={15} /></span>
              <input type="tel" name="phone" placeholder="Phone Number*" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}><BookOpen size={15} /></span>
              <select name="course" value={formData.course} onChange={handleChange} required className={!formData.course ? styles.emptySelect : ""}>
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

            <div className={styles.radioGroup}>
              {["Working Professional", "College Student - Pursuing", "College Student - Final Year", "Others"].map((opt) => (
                <label key={opt} className={styles.radioLabel}>
                  <input type="radio" name="category" value={opt} checked={formData.category === opt} onChange={handleChange} required={!formData.category} />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Submitting..." : "Claim Freebies →"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
