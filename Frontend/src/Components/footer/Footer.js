import React, { useState } from "react";
import styles from "./footer.module.css";
import homeImages from "../../assets/homeImages";
// Import icons from react-icons
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelopeOpen,
  FaChevronDown,
} from "react-icons/fa";

const Footer = () => {
  // State for mobile accordions
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [usefulLinksOpen, setUsefulLinksOpen] = useState(false);

  return (
    <footer className={styles.footerSection}>
      <div className="container">
        {/* Glare Heading */}
        <div className={`${styles.footerCta} pt-5 pb-5`}>
          <h1 className={styles.glareText}>Ziion Technology</h1>

          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className={`${styles.singleCta} ${styles.ctaAlignSmall}`}>
                <FaMapMarkerAlt className={styles.ctaIcon} />
                <div className={styles.ctaText}>
                  <h4>Our Offices</h4>
                  <div className={styles.addressBlock}>
                    <span className={styles.officeBadge}>Office 1</span>
                    <span>D-152, Phase 8, Industrial Area, Mohali</span>
                  </div>
                  <div className={styles.addressBlock}>
                    <span className={styles.officeBadge}>Office 2</span>
                    <span>2970 Drew Rd, CANADA, ON L4T 0A6</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-4 mb-30">
              <div className={styles.singleCta}>
                <FaPhone className={styles.ctaIcon} />
                <div className={styles.ctaText}>
                  <h4>Call us</h4>
                  <span>9878564224, 9779904224</span>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-4 mb-30">
              <div className={`${styles.singleCta} ${styles.mailFooter}`}>
                <FaEnvelopeOpen className={styles.ctaIcon} />
                <div className={styles.ctaText}>
                  <h4>Mail us</h4>
                  <span>ziiontechnology@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className={`${styles.footerContent} pt-5 pb-5`}>
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className={styles.footerWidget}>
                <div className={styles.footerLogo}>
                  <img
                    src={homeImages.ziionTechLogo}
                    alt="logo"
                    loading="lazy"
                  />
                </div>
                <div className={styles.footerText}>
                  <p>
                    Ziion Technology is a comprehensive platform offering web
                    development, Python programming, data science, AI/ML and
                    digital marketing trainings in Chandigarh/Mohali.
                  </p>
                </div>

                {/* --- UPDATED SOCIAL ICONS SECTION --- */}
                <div className={styles.footerSocialIcon}>
                  <span>Follow us</span>

                  <a href="/">
                    <div
                      className={`${styles.iconCircle} ${styles.facebookBg}`}
                    >
                      <FaFacebookF />
                    </div>
                  </a>

                  <a href="/">
                    <div className={`${styles.iconCircle} ${styles.twitterBg}`}>
                      <FaTwitter />
                    </div>
                  </a>

                  <a href="https://www.linkedin.com/company/verma-programming-minds/">
                    <div
                      className={`${styles.iconCircle} ${styles.linkedinBg}`}
                    >
                      <FaLinkedinIn />
                    </div>
                  </a>

                  <a href="https://www.instagram.com/ziion_technology/?next=%2F&hl=en">
                    <div
                      className={`${styles.iconCircle} ${styles.instagramBg}`}
                    >
                      <FaInstagram />
                    </div>
                  </a>
                </div>
                {/* ------------------------------------ */}
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className={styles.footerWidget}>
                <div
                  className={styles.footerWidgetHeading}
                  onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                >
                  <h3>Quick Links</h3>
                  {/* Replaced Chevron <i> with React Icon */}
                  <FaChevronDown
                    className={`${styles.accordionIcon} ${quickLinksOpen ? styles.accordionIconOpen : ""}`}
                  />
                </div>
                <ul
                  className={`
                    ${styles.accordionContent}
                    ${quickLinksOpen ? styles.accordionContentOpen : ""}
                  `}
                >
                  <li>
                    <a href="/web-development">Web Development</a>
                  </li>
                  <li>
                    <a href="/graphic">Graphic Designing</a>
                  </li>
                  <li>
                    <a href="/digital-marketing">Digital Marketing</a>
                  </li>
                  <li>
                    <a href="/ai">AI</a>
                  </li>
                  <li>
                    <a href="/ml">ML</a>
                  </li>
                  <li>
                    <a href="/data-science">Data Science</a>
                  </li>
                  <li>
                    <a href="/mobileapp">Mobile App Development</a>
                  </li>
                  <li>
                    <a href="/php">PHP</a>
                  </li>
                  <li>
                    <a href="/six-week-training">Six Week Training</a>
                  </li>
                  <li>
                    <a href="/six-month-training">Six Month Training</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className={styles.footerWidget}>
                <div
                  className={styles.footerWidgetHeading}
                  onClick={() => setUsefulLinksOpen(!usefulLinksOpen)}
                >
                  <h3>Useful Links</h3>
                  <FaChevronDown
                    className={`${styles.accordionIcon} ${usefulLinksOpen ? styles.accordionIconOpen : ""}`}
                  />
                </div>
                <ul
                  className={`
                    ${styles.accordionContent}
                    ${usefulLinksOpen ? styles.accordionContentOpen : ""}
                  `}
                >
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/services">Services</a>
                  </li>
                  <li>
                    <a href="/placement">Placement</a>
                  </li>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/">Expert Team</a>
                  </li>
                  <li>
                    <a href="/contact-us">Contact Us</a>
                  </li>
                  <li>
                    <a href="/">Latest News</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === COPYRIGHT SECTION === */}
      <div className={styles.copyrightArea}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className={styles.copyrightText}>
                <p>
                  Copyright &copy; 2025, All Right Reserved{" "}
                  <a href="https://ziiontechnology.in/">Ziion Technology</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
