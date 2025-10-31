// src/components/Card.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MainNextSection.module.css";
import Homefeature from "./Homefeature";
import images from "../../assets/images";
import Form from "../form/Form";
import courses2 from "../../assets/NewCoursesImages/courses2.png";
import itservices from "../../assets/NewCoursesImages/itservices.png";
import training from "../../assets/NewCoursesImages/training.png";
import DataAnalytics from "../../assets/NewCoursesImages/DataAnalytics.png";
import WebDevelopment from "../../assets/NewCoursesImages/WebDevelopment.png";
import DataScience from "../../assets/NewCoursesImages/DataScience.webp";
import DigitalMarketing from "../../assets/NewCoursesImages/DigitalMarketing.png";

const MainNextSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("webdev");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const categoryContent = {
    webdev: {
      title: "Web Development Course",
      description:
        "Learn front-end and back-end web development, including HTML, CSS, JavaScript, and modern frameworks like React and Node.js.",
      image: WebDevelopment,
    },
    digitalmarketing: {
      title: "Digital Marketing Course",
      description:
        "Master the art of online marketing, including SEO, social media campaigns, email marketing, and Google Ads.",
      image: DigitalMarketing,
    },
    datascience: {
      title: "Data Science Course",
      description:
        "Gain skills in data analysis, machine learning, Python, R, and statistical modeling to make data-driven decisions.",
      image: DataScience,
    },
    analytics: {
      title: "Analytics Course",
      description:
        "Learn to analyze business data, create dashboards, and generate actionable insights using tools like Excel, Tableau, and Power BI.",
      image: DataAnalytics,
    },
  };

  return (
    <div>
      {/* Cards Section */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div className={styles.cardImage}>
            <img src={courses2} alt="Courses" />
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

        <div className={styles.card}>
          <div className={styles.cardImage}>
            <img src={training} alt="Trainings" />
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

        <div className={styles.card}>
          <div className={styles.cardImage}>
            <img src={itservices} alt="IT Services" />
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

      {/* Category Selection Section */}
      <div className={styles.heroThirdSection}>
        <div className={styles.industry}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div
              className={`${styles.category} ${
                selectedCategory === "webdev" ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick("webdev")}
            >
              <span className={styles.icon}>💻</span>
              <div>
                <h3 className={styles.categoryTitle}>Web Development</h3>
                <p className={styles.categorySubtitle}>
                  Learn to build responsive websites and web apps
                </p>
              </div>
            </div>

            <div
              className={`${styles.category} ${
                selectedCategory === "digitalmarketing" ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick("digitalmarketing")}
            >
              <span className={styles.icon}>📈</span>
              <div>
                <h3 className={styles.categoryTitle}>Digital Marketing</h3>
                <p className={styles.categorySubtitle}>
                  Master SEO, social media, and online advertising
                </p>
              </div>
            </div>

            <div
              className={`${styles.category} ${
                selectedCategory === "datascience" ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick("datascience")}
            >
              <span className={styles.icon}>🧠</span>
              <div>
                <h3 className={styles.categoryTitle}>Data Science</h3>
                <p className={styles.categorySubtitle}>
                  Analyze data and build predictive models
                </p>
              </div>
            </div>

            <div
              className={`${styles.category} ${
                selectedCategory === "analytics" ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick("analytics")}
            >
              <span className={styles.icon}>📊</span>
              <div>
                <h3 className={styles.categoryTitle}>Analytics</h3>
                <p className={styles.categorySubtitle}>
                  Turn data into actionable business insights
                </p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className={styles.mainContent}>
            <h1 className={styles.title}>
              {categoryContent[selectedCategory].title}
            </h1>

            <p className={styles.description}>
              {categoryContent[selectedCategory].description}
            </p>

            <div className={styles.illustration}>
              <img
                src={categoryContent[selectedCategory].image}
                alt={`${selectedCategory} illustration`}
                className={styles.industryimage}
              />
            </div>
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

        {showForm && <Form closeForm={() => setShowForm(false)} />}
      </div>

      <Homefeature />
    </div>
  );
};

export default MainNextSection;
