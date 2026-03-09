import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import FurtherNav from "./FurtherNav";
import homeImages from "../../assets/homeImages";
import Refrencenumber from "../refrenceNumber/Rerencenumber";

const Navbar = () => {
  const [showFurtherNav, setShowFurtherNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [refrenceForm, setRefrenceForm] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navWrapperRef = useRef(null);

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
              <img src={homeImages.ziionLogo} alt="Logo" />
            </Link>
          </div>

          {/* Hamburger for mobile */}
          {isMobile && (
            <div
              className={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {homeImages?.hamburger ? (
                <img src={homeImages.hamburger} alt="hamburger" />
              ) : (
                <span className={styles.hamburgerFallback}>☰</span>
              )}
            </div>
          )}

          {/* Overlay Background for Mobile Menu */}
          <div
            className={`${styles.menuOverlay} ${menuOpen ? styles.showOverlay : ""}`}
            onClick={() => setMenuOpen(false)}
          ></div>

          {/* Main menu container */}
          <div
            className={`${styles.mainMenuContainer} ${
              menuOpen ? styles.showMenu : ""
            }`}
          >
            {/* Mobile Menu Header with Logo */}
            {isMobile && (
              <div className={styles.mobileMenuHeader}>
                <div className={styles.mobileLogo}>
                  <img src={homeImages.ziionLogo} alt="Logo" />
                </div>
              </div>
            )}

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

              {/* Mobile Close Button at Bottom */}
              {isMobile && (
                <li className={styles.mobileCloseItem}>
                  <button
                    className={styles.bottomCloseBtn}
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    <span>Close Menu</span>
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

export default React.memo(Navbar);
