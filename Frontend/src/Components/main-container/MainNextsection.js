// src/components/MainNextSection.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MainNextSection.module.css";
import Form from "../form/Form";

// Import Font Awesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faChalkboardTeacher,
  faServer,
} from "@fortawesome/free-solid-svg-icons";

const MainNextSection = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* Cards Section */}
      <div className={styles.cardContainer}>
        {/* Card 1: Courses */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FontAwesomeIcon icon={faGraduationCap} size="3x" />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Courses</h2>
            <p className={styles.description}>
              Learn high-demand digital skills like web, mobile, AI, design, and
              marketing to boost your career, income, and future opportunities.
            </p>
            <Link to="/allcourses">
              <button className={styles.headerBtn}>Know More</button>
            </Link>
          </div>
        </div>

        {/* Card 2: Trainings */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FontAwesomeIcon icon={faChalkboardTeacher} size="3x" />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>Trainings</h2>
            <p className={styles.description}>
              Upgrade your career in the shortest time with training in web
              development, digital marketing, graphic designing, data analytics,
              AI, and others.
            </p>
            <Link to="/industrial-training">
              <button className={styles.headerBtn}>Know More</button>
            </Link>
          </div>
        </div>

        {/* Card 3: IT Services */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <FontAwesomeIcon icon={faServer} size="3x" />
          </div>
          <div className={styles.cardContent}>
            <h2 className={styles.cardTitle}>IT Services</h2>
            <p className={styles.description}>
              We deliver smart, scalable IT solutions—from cloud services and
              cybersecurity to software development, IT support, and
              infrastructure management.
            </p>
            <Link to="/services">
              <button className={styles.headerBtn}>Know More</button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Hero Section */}
      <div className={styles.wpHeroSection}>
        <div className={styles.wpOverlayContent}>
          <p className={styles.wpWelcomeText}>WELCOME TO ZIION TECHNOLOGY</p>
          <h1 className={styles.wpTitle}>
            Learn, Build & Grow with <br />{" "}
            <span className={styles.highlight}>
              Our Professional IT Courses
            </span>
          </h1>
          <p className={styles.wpDescription}>
            At Ziion Technology, we provide industry-focused training programs
            designed to equip learners with practical skills and knowledge. From
            Web Development, Data Science, and Artificial Intelligence to Cloud
            Computing, Cybersecurity, and Digital Marketing — our courses
            empower students and professionals to succeed in today's competitive
            tech landscape.
          </p>

          <div className={styles.wpIconBox}>
            <button
              className={styles.headerBtn}
              onClick={() => setShowForm(true)}
            >
              Talk to us
            </button>
          </div>
        </div>

        {/* Form Modal */}
        {showForm && <Form closeForm={() => setShowForm(false)} />}
      </div>
    </div>
  );
};

export default MainNextSection;
