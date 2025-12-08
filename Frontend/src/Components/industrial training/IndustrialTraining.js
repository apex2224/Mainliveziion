import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./IndustrialTraining.module.css";
import Footer from "../footer/Footer";
import Navbar from "../head/Navbar";
import Form from "../form/Form";
import ueCustom from "../customHook/useCustom";

const IndustrialTraining = () => {
  ueCustom("Industrial Training | Ziion Technology");
  const [showForm, setShowForm] = useState(false);

  // Create a ref for the 3D shapes container
  const shapesContainerRef = useRef(null);

  // Add an effect to handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!shapesContainerRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Calculate mouse position from center (from -0.5 to 0.5)
      const xFactor = (clientX - innerWidth / 2) / innerWidth;
      const yFactor = (clientY - innerHeight / 2) / innerHeight;

      // Define the max movement and rotation
      const xMove = xFactor * 50; // Max 50px left/right
      const yMove = yFactor * 30; // Max 30px up/down
      const xRotate = yFactor * -10; // Max 10deg rotation
      const yRotate = xFactor * 10; // Max 10deg rotation

      // Apply the transform to the container.
      shapesContainerRef.current.style.transform = `
        perspective(1000px) 
        translateX(${xMove}px) 
        translateY(${yMove}px) 
        rotateX(${xRotate}deg) 
        rotateY(${yRotate}deg)
      `;
    };

    // Add listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.industrialTrainingContainer}>
        {/* 🌟 Modern Hero Section (with 3D Background) */}
        <section className={styles.industrialHeroSection}>
          {/* 3D Background Elements */}
          <div
            ref={shapesContainerRef}
            className={styles.heroBackgroundShapes}
          >
            <div className={`${styles.shape} ${styles.shape1}`}></div>
            <div className={`${styles.shape} ${styles.shape2}`}></div>
            <div className={`${styles.shape} ${styles.shape3}`}></div>
          </div>

          {/* Content is now placed on top */}
          <div className={styles.industrialHeroContent}>
            <h1 className={styles.industrialHeroHeading}>
              Build Your Future in Tech
            </h1>
            <p className={styles.industrialPara}>
              Our industrial training programs bridge the gap between theory and
              real-world application. Gain hands-on experience, work on live
              projects, and get the practical skills employers are looking for.
            </p>
            <button
              className={styles.herobutton}
              onClick={() => setShowForm(true)}
            >
              Start Your Training
            </button>
          </div>

          {/* Graphic is now placed on top */}
          <div className={styles.conceptualGraphic}>
            {/* UPDATED: Changed from div to Link */}
            <Link to="/six-week-training" className={styles.sixWeekIcon}>
              6 Week
            </Link>
            
            <div className={styles.arrow}>→</div>
            
            {/* UPDATED: Changed from div to Link */}
            <Link to="/six-month-training" className={styles.sixMonthIcon}>
              6 Month
            </Link>
          </div>
          
          {showForm && <Form closeForm={() => setShowForm(false)} />}
        </section>

        {/* 🏭 Training Offerings Section */}
        <section className={styles.trainingOfferingsSection}>
          <h2 className={styles.sectionHeading}>Our Core Programs</h2>
          <p className={styles.sectionSubheading}>
            Choose the path that's right for your goals.
          </p>

          <div className={styles.offeringsGrid}>
            {/* Left Card - Six Weeks */}
            <div className={styles.trainingCard}>
              <div
                className={`${styles.cardHeader} ${styles.header6Weeks}`}
              >
                <span className={styles.duration}>6 WEEKS</span>
                <span className={styles.level}>Foundation Program</span>
              </div>
              <div className={styles.trainingCardContent}>
                <h3 className={styles.trainingCardTitle}>
                  6 Weeks Industrial Training
                </h3>
                <p className={styles.trainingDescription}>
                  Perfect for beginners. Learn core concepts, tools, and
                  technologies by building a real-world project.
                </p>
                <ul className={styles.keyFeaturesList}>
                  <li className={styles.featureItem}>Core Concepts</li>
                  <li className={styles.featureItem}>Hands-on Projects</li>
                  <li className={styles.featureItem}>Expert-Led Sessions</li>
                </ul>
              </div>
              <Link to="/six-week-training" className={styles.trainingBtnLink}>
                <button className={styles.trainingBtn}>Learn More</button>
              </Link>
            </div>

            {/* Right Card - Six Months */}
            <div className={styles.trainingCard}>
              <div
                className={`${styles.cardHeader} ${styles.header6Months}`}
              >
                <span className={styles.duration}>6 MONTHS</span>
                <span className={styles.level}>Advanced Program</span>
              </div>
              <div className={styles.trainingCardContent}>
                <h3 className={styles.trainingCardTitle}>
                  6 Months Industrial Training
                </h3>
                <p className={styles.trainingDescription}>
                  An in-depth program to master advanced skills, complete a
                  full-scale project, and receive dedicated placement support.
                </p>
                <ul className={styles.keyFeaturesList}>
                  <li className={styles.featureItem}>Advanced Modules</li>
                  <li className={styles.featureItem}>Live Project Development</li>
                  <li className={styles.featureItem}>100% Placement Assistance</li>
                </ul>
              </div>
              <Link to="/six-month-training" className={styles.trainingBtnLink}>
                <button className={styles.trainingBtn}>Learn More</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default IndustrialTraining;