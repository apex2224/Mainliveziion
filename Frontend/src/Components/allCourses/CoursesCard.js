// CoursesCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./coursesCard.module.css";
import NavBar from "../head/Navbar";
import Footer from "../footer/Footer";
import useCustom from "../customHook/useCustom";
import Form from "../form/Form";

import AI from "../../assets/NewCoursesImages/AI.png";
import CC1 from "../../assets/NewCoursesImages/CC1.png";
import DataAnalytics from "../../assets/NewCoursesImages/DataAnalytics.png";
import DataScience from "../../assets/NewCoursesImages/DataScience.webp";
import DevOps from "../../assets/NewCoursesImages/DevOps.png";
import ML from "../../assets/NewCoursesImages/ML.png";
import MobileAppDevelopment from "../../assets/NewCoursesImages/MobileAppDevelopment.png";
import PHP from "../../assets/NewCoursesImages/PHP.png";
import CloudComputing from "../../assets/NewCoursesImages/CloudComputing.png";
import WebDevelopment from "../../assets/NewCoursesImages/WebDevelopment.png";

const topics = [
  {
    id: 1,
    route: "data-science",
    title: "Data Science",
    description:
      "Master data manipulation, statistical analysis, and predictive modeling techniques.",
    color: "#3B82F6",
    images: DataScience,
  },
  {
    id: 2,
    route: "web-development",
    title: "Web Development",
    description:
      "Build modern, responsive websites with frontend, backend, and fullstack technologies.",
    color: "#8B5CF6",
    images: WebDevelopment,
  },
  {
    id: 3,
    route: "web-designing",
    title: "Web Designing",
    description:
      "Create stunning user experiences with UI/UX design principles and tools.",
    color: "#F59E0B",
    images: WebDevelopment,
  },
  {
    id: 4,
    route: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Master SEO, social media advertising, campaign analytics, and growth strategies.",
    color: "#10B981",
    images: DataAnalytics,
  },
  {
    id: 5,
    route: "ai",
    title: "Artificial Intelligence",
    description:
      "Explore neural networks, deep learning, and cutting-edge AI applications.",
    color: "#EF4444",
    images: AI,
  },
  {
    id: 6,
    route: "ml",
    title: "Machine Learning",
    description:
      "Build intelligent systems with supervised, unsupervised, and reinforcement learning.",
    color: "#EC4899",
    images: ML,
  },
  {
    id: 7,
    route: "data-analytics",
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights with powerful analytics tools.",
    color: "#F97316",
    images: DataAnalytics,
  },
  {
    id: 8,
    route: "mobileapp",
    title: "Mobile App Development",
    description:
      "Create native and cross-platform mobile applications for iOS and Android.",
    color: "#06B6D4",
    images: MobileAppDevelopment,
  },
  {
    id: 9,
    route: "php",
    title: "PHP Development",
    description:
      "Master server-side scripting and build dynamic web applications with PHP.",
    color: "#7C3AED",
    images: PHP,
  },
  // {
  //   id: 10,
  //   route: "graphic",
  //   title: "Graphic Designing",
  //   description:
  //     "Master visual communication through branding, illustration, and digital design.",
  //   color: "#DB2777",
  //   images: DataScience,
  // },
  {
    id: 11,
    route: "cloud-computing",
    title: "Cloud Computing",
    description:
      "Deploy scalable solutions on AWS, Azure, and Google Cloud platforms.",
    color: "#0EA5E9",
    images: CloudComputing,
  },
  {
    id: 12,
    route: "devops",
    title: "DevOps",
    description:
      "Implement CI/CD pipelines, containerization, and infrastructure automation.",
    color: "#F97316",
    images: DevOps,
  },
];

const CoursesCard = () => {
  useCustom("AllCourses | Ziion Technology");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (topic) => {
    navigate(`/allcourses/${topic.route}`);
  };

  const handleGetStartedClick = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className={styles.coursesPage}>
      <NavBar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span>Professional Training</span>
            </div>
            <h1 className={styles.heroTitle}>All Courses</h1>
            <p className={styles.heroSubtitle}>
              Explore a wide range of technology courses designed to help you
              gain in-demand skills, from Web Development and Data Science to
              AI, Cloud Computing, and more.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statBadge}>
                <span className={styles.statDot}></span>
                <span>10 Active Courses</span>
              </div>
              <div className={styles.statBadge}>
                <span>Expert Instructors</span>
              </div>
              <div className={styles.statBadge}>
                <span>Hands-on Projects</span>
              </div>
            </div>
          </div>
          <img
            src={DataScience}
            alt="Courses Hero"
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* Courses Section */}
      <section className={styles.coursesSection}>
        <div className={styles.coursesContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse All Courses</h2>
            <p className={styles.sectionSubtitle}>
              Choose from our comprehensive curriculum and start your learning
              journey today
            </p>
          </div>

          <div className={styles.coursesGrid}>
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={styles.courseCard}
                onClick={() => handleCardClick(topic)}
              >
                <div
                  className={styles.cardIconWrapper}
                  style={{ backgroundColor: topic.color }}
                >
                  <img
                    src={topic.images}
                    alt={topic.title}
                    className={styles.cardIcon}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "16px",
                    }}
                  />
                </div>
                <h3 className={styles.cardTitle}>{topic.title}</h3>
                <p className={styles.cardDescription}>{topic.description}</p>
                <div
                  className={styles.cardFooter}
                  style={{ color: topic.color }}
                >
                  <span>Learn More</span>
                  <svg
                    className={styles.arrowIcon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
          <p className={styles.ctaSubtitle}>
            Join thousands of students advancing their careers with our
            expert-led courses
          </p>
          <button className={styles.ctaButton} onClick={handleGetStartedClick}>
            Get Started Today
          </button>
        </div>
      </section>

      <Footer />

      {/* Form Modal */}
      {showForm && <Form closeForm={closeForm} />}
    </div>
  );
};

export default CoursesCard;
