import React, { useState, useEffect } from "react";
import styles from "./footer.module.css";
import { FaFacebookF, FaLinkedinIn, FaHeart } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoChevronDown, IoSend } from "react-icons/io5"; // Changed IoIosArrowDown to IoChevronDown
import { Link } from "react-router-dom";

// A simple custom hook to check screen size
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

// Helper component for accordion items
const AccordionItem = ({
  index,
  title,
  children,
  openAccordion,
  handleAccordionToggle,
  isMobile,
}) => {
  const isOpen = openAccordion === index;
  return (
    <div className={styles.footerColumn}>
      <h3
        className={styles.footerHeading}
        onClick={isMobile ? () => handleAccordionToggle(index) : undefined}
      >
        <span>{title}</span>
        {/* --- AND FIX IS HERE --- */}
        {isMobile && (
          <IoChevronDown
            className={`${styles.accordionIcon} ${
              isOpen ? styles.accordionIconOpen : ""
            }`}
          />
        )}
      </h3>
      <div
        className={
          isMobile
            ? `${styles.accordionContent} ${
                isOpen ? styles.accordionContentOpen : ""
              }`
            : ""
        }
      >
        {children}
      </div>
    </div>
  );
};

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const commonAccordionProps = {
    openAccordion,
    handleAccordionToggle,
    isMobile,
  };

  return (
    <footer className={styles.footer}>
      {/* Main content grid */}
      <div className={styles.sectionWrapper}>
        <div className={styles.container}>
          <div className={styles.gridContainer}>
            {/* Column 1: About - Not an accordion */}
            <div className={styles.aboutColumn}>
              <div className={styles.logo}> Ziion Technology</div>
              <p className={styles.footerText}>
                is a comprehensive platform offering web development, Python
                programming, data science, AI/ML and digital marketing trainings
                in Chandigarh/Mohali.
              </p>
              <p>
                Made with <FaHeart className={styles.heartIcon} /> in{" "}
                <strong>India</strong>
              </p>
            </div>

            {/* Column 2: Solutions */}
            <AccordionItem
              index={1}
              title="Industrial Training"
              {...commonAccordionProps}
            >
              <ul>
                <li>
                  <Link to="/six-week-training">sixWeekTraining</Link>
                </li>
                <li>
                  <Link to="/six-month-training">sixMonthTraining</Link>
                </li>
              </ul>
            </AccordionItem>

            {/* Column 3: Company */}
            <AccordionItem index={2} title="Courses" {...commonAccordionProps}>
              <ul>
                <li>
                  <Link to="/web-development">Web Development</Link>
                </li>
                <li>
                  <Link to="/ai">AI</Link>
                </li>
                <li>
                  <Link to="/ml">ML</Link>
                </li>
                <li>
                  <Link to="/data-science">Data Science</Link>
                </li>
                <li>
                  <Link to="/mobileapp">Mobile App Development</Link>
                </li>
                <li>
                  <Link to="/data-analytics">Data Analytics</Link>
                </li>
                <li>
                  <a href="#">DevOps</a>
                </li>
                <li>
                  <Link to="/php">PHP</Link>
                </li>
                <li>
                  <Link to="/digital-marketing">Digital Marketing</Link>
                </li>
                <li>
                  <a href="/allcourses/python">Python</a>
                </li>
              </ul>
            </AccordionItem>

            {/* Column 4: Resources */}
            <AccordionItem index={3} title="Services" {...commonAccordionProps}>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact US</a>
                </li>
              </ul>
            </AccordionItem>

            {/* Column 5: Newsletter - Not an accordion */}
            <div className={styles.newsletterWrapper}>
              <h3>Stay in the loop</h3>
              <p className={styles.newsletterText}>
                Get the latest news, updates, and platform tips sent straight to
                your inbox.
              </p>
              <form action="#" onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.newsletterInput}
                  />
                  <button
                    type="submit"
                    className={styles.newsletterButton}
                    aria-label="Subscribe"
                  >
                    <IoSend />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Legal, Copyright, & Social */}
      <div className={styles.footerBottomWrapper}>
        <div className={`${styles.container} ${styles.footerBottom}`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} ZIION Technology — All rights reserved.
          </p>

          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>

          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter">
              <FaSquareXTwitter />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
