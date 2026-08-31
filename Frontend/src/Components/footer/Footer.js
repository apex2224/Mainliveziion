import React, { useState } from "react";
import styles from "./footer.module.css";
import homeImages from "../../assets/homeImages";
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
      <div className={styles.container}>
        {/* Glare Heading & Contact CTA */}
        <div className={styles.footerCta}>
          <h1 className={styles.glareText}>Ziion Technology</h1>

          <div className={styles.ctaGrid}>
            {/* Find us */}
            <div className={styles.singleCta}>
              <FaMapMarkerAlt className={styles.ctaIcon} />
              <div className={styles.ctaText}>
                <h4>Find us</h4>
                <div className={styles.addressBlock}>
                  <span className={styles.officeBadge}>Mohali</span>
                  <span>D-152, Phase 8, Industrial Area, Mohali</span>
                </div>
                <div className={styles.addressBlock}>
                  <span className={styles.officeBadge}>Canada</span>
                  <span>2970 Drew Rd, CANADA, ON L4T 0A6</span>
                </div>
              </div>
            </div>

            {/* Call us */}
            <div className={styles.singleCta}>
              <FaPhone className={styles.ctaIcon} />
              <div className={styles.ctaText}>
                <h4>Call us</h4>
                <span>
                  9878564224 <br /> 9779904224
                </span>
              </div>
            </div>

            {/* Mail us */}
            <div className={styles.singleCta}>
              <FaEnvelopeOpen className={styles.ctaIcon} />
              <div className={styles.ctaText}>
                <h4>Mail us</h4>
                <span>ziiontechnology@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Main Content */}
        <div className={styles.footerContent}>
          <div className={styles.mainGrid}>
            {/* Column 1: Logo & Info */}
            <div className={styles.footerWidget}>
              <div className={styles.footerLogo}>
                <img
                  src={homeImages.ziionTechLogo}
                  alt="Ziion Technology Logo"
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

              {/* Social Icons */}
              <div className={styles.footerSocialIcon}>
                <span>Follow us</span>
                <div className={styles.socialList}>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <div
                      className={`${styles.iconCircle} ${styles.facebookBg}`}
                    >
                      <FaFacebookF />
                    </div>
                  </a>

                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Twitter"
                  >
                    <div className={`${styles.iconCircle} ${styles.twitterBg}`}>
                      <FaTwitter />
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/verma-programming-minds/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <div
                      className={`${styles.iconCircle} ${styles.linkedinBg}`}
                    >
                      <FaLinkedinIn />
                    </div>
                  </a>

                  <a
                    href="https://www.instagram.com/ziion_technology/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <div
                      className={`${styles.iconCircle} ${styles.instagramBg}`}
                    >
                      <FaInstagram />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className={styles.footerWidget}>
              <div
                className={styles.footerWidgetHeading}
                onClick={() => setQuickLinksOpen(!quickLinksOpen)}
              >
                <h3>Quick Links</h3>
                <FaChevronDown
                  className={`${styles.accordionIcon} ${
                    quickLinksOpen ? styles.accordionIconOpen : ""
                  }`}
                />
              </div>
              <ul
                className={`
                  ${styles.linkList}
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
                  <a href="/ai">Python / AI</a>
                </li>
                <li>
                  <a href="/ml">ML</a>
                </li>
                <li>
                  <a href="/data-science">Data Science</a>
                </li>
                <li>
                  <a href="/mobileapp">Mobile Application Development</a>
                </li>
                <li>
                  <a href="/php">PHP</a>
                </li>
                <li>
                  <a href="/six-month-training">
                    Six Month Industrial Training
                  </a>
                </li>
                <li>
                  <a href="/six-week-training">Six Week Industrial Training</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Useful Links */}
            <div className={styles.footerWidget}>
              <div
                className={styles.footerWidgetHeading}
                onClick={() => setUsefulLinksOpen(!usefulLinksOpen)}
              >
                <h3>Useful Links</h3>
                <FaChevronDown
                  className={`${styles.accordionIcon} ${
                    usefulLinksOpen ? styles.accordionIconOpen : ""
                  }`}
                />
              </div>
              <ul
                className={`
                  ${styles.linkList}
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
                  <a href="/blogs">Latest News</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyrightArea}>
        <div className={styles.container}>
          <div className={styles.copyrightWrapper}>
            <div className={styles.copyrightText}>
              <p>
                © Copyright reserved by{" "}
                <a href="https://ziiontechnology.in/">ziiontechnology.com</a>
              </p>
            </div>
            <div className={styles.footerNavLinks}>
              <a href="/">Home</a>
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/contact-us">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
