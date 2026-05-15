// CoursesCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./coursesCard.module.css";
import NavBar from "../head/Navbar";
import Footer from "../footer/Footer";
import useCustom from "../customHook/useCustom";
import Form from "../form/Form";
import usePageContent from "../../customHook/usePageContent";

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
  {
    id: 10,
    route: "graphic",
    title: "Graphic Designing",
    description:
      "Master visual communication through branding, illustration, and digital design.",
    color: "#DB2777",
    images: DataScience,
  },
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

const IMAGE_MAP = {
  AI,
  CC1,
  DataAnalytics,
  DataScience,
  DevOps,
  ML,
  MobileAppDevelopment,
  PHP,
  CloudComputing,
  WebDevelopment,
};

const CoursesCard = () => {
  useCustom("AllCourses | Ziion Technology");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(`/allcourses/${route}`);
  };

  const { content } = usePageContent("courses-page", {
    heroBadge: "Professional Training",
    heroTitle: "All Courses",
    heroSubtitle:
      "Explore a wide range of technology courses designed to help you gain in-demand skills, from Web Development and Data Science to AI, Cloud Computing, and more.",
    stats: [
      { label: "10 Active Courses", dot: true },
      { label: "Expert Instructors", dot: false },
      { label: "Hands-on Projects", dot: false },
    ],
    sectionTitle: "Browse All Courses",
    sectionSubtitle:
      "Choose from our comprehensive curriculum and start your learning journey today",
    ctaTitle: "Ready to Start Learning?",
    ctaSubtitle:
      "Join thousands of students advancing their careers with our expert-led courses",
    ctaButtonText: "Get Started Today",
    coursesList: [
      {
        id: 1,
        route: "data-science",
        title: "Data Science",
        description:
          "Master data manipulation, statistical analysis, and predictive modeling techniques.",
        color: "#3B82F6",
        imageKey: "DataScience",
      },
      {
        id: 2,
        route: "web-development",
        title: "Web Development",
        description:
          "Build modern, responsive websites with frontend, backend, and fullstack technologies.",
        color: "#8B5CF6",
        imageKey: "WebDevelopment",
      },
      {
        id: 3,
        route: "web-designing",
        title: "Web Designing",
        description:
          "Create stunning user experiences with UI/UX design principles and tools.",
        color: "#F59E0B",
        imageKey: "WebDevelopment",
      },
      {
        id: 4,
        route: "digital-marketing",
        title: "Digital Marketing",
        description:
          "Master SEO, social media advertising, campaign analytics, and growth strategies.",
        color: "#10B981",
        imageKey: "DataAnalytics",
      },
      {
        id: 5,
        route: "ai",
        title: "Artificial Intelligence",
        description:
          "Explore neural networks, deep learning, and cutting-edge AI applications.",
        color: "#EF4444",
        imageKey: "AI",
      },
      {
        id: 6,
        route: "ml",
        title: "Machine Learning",
        description:
          "Build intelligent systems with supervised, unsupervised, and reinforcement learning.",
        color: "#EC4899",
        imageKey: "ML",
      },
      {
        id: 7,
        route: "data-analytics",
        title: "Data Analytics",
        description:
          "Transform raw data into actionable insights with powerful analytics tools.",
        color: "#F97316",
        imageKey: "DataAnalytics",
      },
      {
        id: 8,
        route: "mobileapp",
        title: "Mobile App Development",
        description:
          "Create native and cross-platform mobile applications for iOS and Android.",
        color: "#06B6D4",
        imageKey: "MobileAppDevelopment",
      },
      {
        id: 9,
        route: "php",
        title: "PHP Development",
        description:
          "Master server-side scripting and build dynamic web applications with PHP.",
        color: "#7C3AED",
        imageKey: "PHP",
      },
      {
        id: 10,
        route: "graphic",
        title: "Graphic Designing",
        description:
          "Master visual communication through branding, illustration, and digital design.",
        color: "#DB2777",
        imageKey: "DataAnalytics",
      },
    ],
  });

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
              <span>{content?.heroBadge}</span>
            </div>
            <h1 className={styles.heroTitle}>{content?.heroTitle}</h1>
            <p className={styles.heroSubtitle}>{content?.heroSubtitle}</p>
            <div className={styles.heroStats}>
              {content?.stats?.map((stat, i) => (
                <div key={i} className={styles.statBadge}>
                  {stat.dot && <span className={styles.statDot}></span>}
                  <span>{stat.label}</span>
                </div>
              ))}
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
            <h2 className={styles.sectionTitle}>{content?.sectionTitle}</h2>
            <p className={styles.sectionSubtitle}>{content?.sectionSubtitle}</p>
          </div>

          <div className={styles.coursesGrid}>
            {(content?.coursesList || []).map((topic) => (
              <div
                key={topic.id}
                className={styles.courseCard}
                onClick={() => handleNavigation(topic.route)}
              >
                <div
                  className={styles.cardIconWrapper}
                  style={{ backgroundColor: `${topic.color}15` }}
                >
                  <div
                    className={styles.iconBackground}
                    style={{ backgroundColor: topic.color }}
                  ></div>
                  <img
                    src={IMAGE_MAP[topic.imageKey] || WebDevelopment}
                    alt={topic.title}
                    className={styles.cardIcon}
                  />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{topic.title}</h3>
                  <p className={styles.cardDescription}>{topic.description}</p>
                </div>

                <div className={styles.cardFooter}>
                  <span
                    className={styles.exploreLink}
                    style={{ color: topic.color }}
                  >
                    Explore Syllabus
                    <svg
                      className={styles.arrowIcon}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>{content?.ctaTitle}</h2>
          <p className={styles.ctaSubtitle}>{content?.ctaSubtitle}</p>
          <button
            className={styles.ctaButton}
            onClick={() => setShowForm(true)}
          >
            {content?.ctaButtonText}
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
