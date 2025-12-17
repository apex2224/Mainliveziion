import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";

// IMPORT NEW ICONS for the cube and scroller
import {
  FaReact,
  FaBrain, // Icon for AI
  FaProjectDiagram, // Icon for ML
  FaTools, // Icon for Web Dev Tools
  FaBullhorn, // Icon for Digital Marketing
  FaDatabase, // Icon for Data
  FaJs,
  FaPython,
} from "react-icons/fa";

import Form from "../../../form/Form";
import GetdemoComponent from "../../../form/Getdemo";

const Getdemo = GetdemoComponent;

// NEW icon array with a focus on tech fields
const techIcons = [
  { name: "React", icon: <FaReact size={64} color="#61DAFB" /> },
  {
    name: "Artificial Intelligence",
    icon: <FaBrain size={64} color="#8A2BE2" />,
  },
  {
    name: "Machine Learning",
    icon: <FaProjectDiagram size={64} color="#FF6347" />,
  },
  { name: "Web Dev Tools", icon: <FaTools size={64} color="#708090" /> },
  { name: "Digital Marketing", icon: <FaBullhorn size={64} color="#1E90FF" /> },
  { name: "Data Science", icon: <FaDatabase size={64} color="#4682B4" /> },
  // Keep some of the old ones for the scroller
  { name: "JavaScript", icon: <FaJs size={64} color="#f7df1e" /> },
  { name: "Python", icon: <FaPython size={64} color="#3776ab" /> },
];

// The first 6 icons will be used for the cube faces
const cubeIcons = techIcons.slice(0, 6);

const HeroSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const heroVisualRef = useRef(null);
  // Ref to hold the animation frame ID
  const animationFrameId = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // If there's a pending animation frame, cancel it.
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }

      // Schedule the style update to run on the next animation frame.
      animationFrameId.current = requestAnimationFrame(() => {
        if (heroVisualRef.current) {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const rotateX = (clientY / innerHeight - 0.5) * -20;
          const rotateY = (clientX / innerWidth - 0.5) * 20;
          heroVisualRef.current.style.setProperty(
            "--mouse-rotate-x",
            `${rotateX}deg`
          );
          heroVisualRef.current.style.setProperty(
            "--mouse-rotate-y",
            `${rotateY}deg`
          );
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // Also cancel any pending frame when the component unmounts
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array means this effect runs only once.

  const closeForm = () => setShowForm(false);
  const closeDemo = () => setShowDemo(false);

  return (
    <main className={styles.container}>
      {/* --- Hero Section --- */}
      <section className={styles.heroGrid}>
        <article className={styles.heroText}>
          <span className={`${styles.heroSubtitle} ${styles.animateFadeIn}`}>
            Join Ziion technology for a transformative experience
          </span>
          <h1 className={styles.animateFadeIn}>
            Six Weeks{" "}
            <span className={styles.gradientText}>Industrial Training</span> in
            Chandigarh
          </h1>
          <p className={styles.animateFadeIn}>
            Ziion Technology is offering six-weeks industrial training at
            Chandigarh for students of B.Tech , MCA, M.Sc (IT), Diploma, and
            other graduate courses. During the training duration, students are
            working on actual industry projects where hands-on learning is
            promoted and technical skills are enhanced.
          </p>
          <div className={`${styles.buttonContainer} ${styles.animateFadeIn}`}>
            <button
              className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
              onClick={() => setShowForm(true)}
            >
              Talk To Us
            </button>
            <button
              className={`${styles.ctaButton} ${styles.ctaButtonSecondary}`}
              onClick={() => setShowDemo(true)}
            >
              Get a DEMO
            </button>
          </div>
        </article>

        {/* --- Cube Visual Element --- */}
        <div ref={heroVisualRef} className={styles.heroImageContainer}>
          <div className={styles.cube}>
            <div className={`${styles.face} ${styles.front}`}>
              {cubeIcons[0]?.icon}
            </div>
            <div className={`${styles.face} ${styles.back}`}>
              {cubeIcons[1]?.icon}
            </div>
            <div className={`${styles.face} ${styles.right}`}>
              {cubeIcons[2]?.icon}
            </div>
            <div className={`${styles.face} ${styles.left}`}>
              {cubeIcons[3]?.icon}
            </div>
            <div className={`${styles.face} ${styles.top}`}>
              {cubeIcons[4]?.icon}
            </div>
            <div className={`${styles.face} ${styles.bottom}`}>
              {cubeIcons[5]?.icon}
            </div>
          </div>
        </div>
      </section>

      {/* --- Other sections --- */}
      <section className={styles.partnersSection}>
        <h3>
          Learn with the Best{" "}
          <span className={styles.gradientText}>Technologies</span>
        </h3>
        <div className={styles.logoScroller}>
          <div className={styles.logoTrack}>
            {techIcons.map((tech, index) => (
              <div className={styles.logoSlide} key={index}>
                {tech.icon}
                <div className={styles.techName}>{tech.name}</div>
              </div>
            ))}
            {techIcons.map((tech, index) => (
              <div className={styles.logoSlide} key={`clone-${index}`}>
                {tech.icon}
                <div className={styles.techName}>{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showForm && <Form closeForm={closeForm} />}
      {showDemo && <Getdemo closeForm={closeDemo} />}
    </main>
  );
};

export default HeroSection;
