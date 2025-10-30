import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import NavBar from "../head/Navbar";
import Conversationchatbot from "./Conversationchatbot";
import MainNextSection from "./MainNextsection";
import Form from "../form/Form";
import Companies from "../tieupcompanies/Companies";
import useCustom from "../customHook/useCustom";

const Main = () => {
  useCustom("Home | Ziion Technology");
  const [showForm, setShowForm] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleExplorePrograms = () => {
    navigate("/allcourses");
  };

  // This function will scroll the page down by one viewport height
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight, // Scrolls down by the height of the viewport
      behavior: "smooth",
    });
  };

  return (
    <>
      <NavBar />

      <section className={styles.heroSection}>
        {/* Animated Background Elements */}
        <div className={styles.backgroundElements}>
          <div
            className={styles.gradientOrb1}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            }}
          />
          <div
            className={styles.gradientOrb2}
            style={{
              transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            }}
          />

          <div className={styles.floatingCode1}>{"</>"}</div>
          <div className={styles.floatingCode2}>{"{ }"}</div>
          <div className={styles.floatingCode3}>{"<AI/>"}</div>
          <div className={styles.gridPattern} />
          <div className={styles.dotsPattern} />
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>Enterprise-Grade Training Solutions</span>
          </div>

          <h1 className={styles.mainTitle}>
            Empowering Tomorrow's
            <br />
            <span className={styles.gradientText}>Tech Leaders</span>
          </h1>

          <p className={styles.subtitle}>
            Professional training in Web Development, AI/ML, Mobile
            Applications, and Enterprise Technologies. Industry-aligned
            curriculum with real-world applications and certification programs.
          </p>

          <div className={styles.ctaButtons}>
            <button
              className={styles.primaryButton}
              onClick={() => setShowForm(true)}
            >
              Schedule Consultation
              <span className={styles.buttonArrow}>→</span>
            </button>
            <button
              className={styles.secondaryButton}
              onClick={handleExplorePrograms}
            >
              Explore Programs
            </button>
          </div>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5,000+</div>
              <div className={styles.statLabel}>Professionals Trained</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNumber}>40+</div>
              <div className={styles.statLabel}>Academic Partners</div>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <div className={styles.statNumber}>98%</div>
              <div className={styles.statLabel}>Success Rate</div>
            </div>
          </div>

          <div className={styles.trustBadge}>
            <svg
              className={styles.trustIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10 0L13 7L20 8L15 13L16 20L10 17L4 20L5 13L0 8L7 7L10 0Z"
                fill="currentColor"
              />
            </svg>
            <span className={styles.trustText}>
              4.9/5 Rating from 2,000+ Reviews
            </span>
          </div>

          {/* === SCROLL INDICATOR MOVED HERE === */}
          <div className={styles.scrollIndicator} onClick={handleScrollDown}>
            <div className={styles.scrollMouse} />
            <span className={styles.scrollText}>Discover More</span>
          </div>
        </div>
      </section>

      <Companies />
      <MainNextSection />
      <Conversationchatbot />

      {showForm && <Form closeForm={() => setShowForm(false)} />}
    </>
  );
};

export default Main;