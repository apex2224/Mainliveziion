import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import FurtherNav from "./FurtherNav";
import images from "../../assets/images";
import StudentSearch from "../admin/Studentform";
import Refrencenumber from "../refrenceNumber/Rerencenumber";
import Help from "../help/Help";

const Navbar = () => {
  const [showFurtherNav, setShowFurtherNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [refrenceForm, setRefrenceForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navWrapperRef = useRef(null);
  const furtherNavRef = useRef(null); // This ref might not be strictly needed anymore

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      // Close menus on scroll
      setShowFurtherNav(false);
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update isMobile state on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close submenu/menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Updated ref check to be safer
      if (navWrapperRef.current && !navWrapperRef.current.contains(e.target)) {
        setShowFurtherNav(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setShowFurtherNav(false);
    setMenuOpen(false);
  };

  const handleCoursesClick = () => {
    if (isMobile) {
      setShowFurtherNav((prev) => !prev);
    } else {
      // Clicking "Courses" on desktop can also toggle
      setShowFurtherNav(!showFurtherNav);
    }
  };

  const handleCloseForm = () => {
    setRefrenceForm(false);
  };

  return (
    <>
      <div ref={navWrapperRef} className={styles["parent-navbar"]}>
        <nav
          className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}
        >
          <div className={styles.left}>
            <Link to="/" onClick={closeAllMenus}>
              <img src={images.ziionLogo} alt="Logo" />
            </Link>
          </div>

          {/* Hamburger for mobile */}
          {isMobile && (
            <div
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {images?.hamburger ? (
                <img src={images.hamburger} alt="hamburger" />
              ) : (
                <span className={styles.hamburgerFallback}>☰</span>
              )}
            </div>
          )}

          {/* Main menu */}
          <div
            className={`${styles.mainMenuContainer} ${
              menuOpen ? styles.showMenu : ""
            }`}
          >
            <ul className={styles.mainMenuList}>
              <Link to="/" className={styles.link} onClick={closeAllMenus}>
                <li className={styles.mainMenuItem}>Home</li>
              </Link>

              {/* === MODIFIED COURSES LI === */}
              <li
                className={styles.mainMenuItem}
                onClick={isMobile ? handleCoursesClick : undefined} // Only click on mobile
                onMouseEnter={() => !isMobile && setShowFurtherNav(true)}
                onMouseLeave={() => !isMobile && setShowFurtherNav(false)}
              >
                Courses
                {/* Desktop Dropdown */}
                {!isMobile && showFurtherNav && (
                  <div className={styles.externalFurtherNav}>
                    <FurtherNav />
                  </div>
                )}
                {/* === FIX 2: ADDED MOBILE RENDER === */}
                {/* Mobile Dropdown (appears inside menu) */}
                {isMobile && showFurtherNav && <FurtherNav />}
              </li>
              {/* === END MODIFIED COURSES LI === */}

              <Link
                to="/services"
                className={styles.link}
                onClick={closeAllMenus}
              >
                <li className={styles.mainMenuItem}>Services</li>
              </Link>

              <Link
                to="/placement"
                className={styles.link}
                onClick={closeAllMenus}
              >
                <li className={styles.mainMenuItem}>Placement</li>
              </Link>

              <Link
                to="/aboutus"
                className={styles.link}
                onClick={closeAllMenus}
              >
                <li className={styles.mainMenuItem}>About Us</li>
              </Link>

              <Link
                to="/contact-us"
                className={styles.link}
                onClick={closeAllMenus}
              >
                <li className={styles.mainMenuItem}>Contact Us</li>
                {showDashboard && <Help />}
              </Link>

              {/* Mobile-only Download button inside menu */}
              {isMobile && (
                <li className={styles.mainMenuItem}>
                  <button
                    className={styles.headerBtn}
                    onClick={() => {
                      setRefrenceForm(true);
                      closeAllMenus();
                    }}
                  >
                    Download Certificate
                  </button>
                </li>
              )}
            </ul>

            {/* Desktop download button */}
            {!isMobile && (
              <button
                className={styles.headerBtn}
                onClick={() => {
                  setRefrenceForm(true);
                  closeAllMenus();
                }}
              >
                Verified Certificate
              </button>
            )}
          </div>

          {refrenceForm && (
            <div className={styles.refrenceForm}>
              <Refrencenumber onClose={handleCloseForm} />
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
