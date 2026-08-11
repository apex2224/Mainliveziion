// CoursesCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./coursesCard.module.css";
import NavBar from "../head/Navbar";
import Footer from "../footer/Footer";
import useCustom from "../customHook/useCustom";
import Form from "../form/Form";
import usePageContent from "../../customHook/usePageContent";

import DataScience from "../../assets/NewCoursesImages/DataScience.webp";
import WebDevelopment from "../../assets/NewCoursesImages/WebDevelopment.png";
import {
  FlaskConical,
  Code2,
  Palette,
  TrendingUp,
  Brain,
  Bot,
  BarChart2,
  Smartphone,
  FileCode2,
  Brush,
  Cloud,
  GitMerge,
  ArrowRight,
} from "lucide-react";

const topics = [
  { id: 1, route: "data-science", title: "Data Science", description: "Master data manipulation, statistical analysis, and predictive modeling techniques.", color: "#3B82F6", icon: FlaskConical },
  { id: 2, route: "web-development", title: "Web Development", description: "Build modern, responsive websites with frontend, backend, and fullstack technologies.", color: "#8B5CF6", icon: Code2 },
  { id: 3, route: "web-designing", title: "Web Designing", description: "Create stunning user experiences with UI/UX design principles and tools.", color: "#F59E0B", icon: Palette },
  { id: 4, route: "digital-marketing", title: "Digital Marketing", description: "Master SEO, social media advertising, campaign analytics, and growth strategies.", color: "#10B981", icon: TrendingUp },
  { id: 5, route: "ai", title: "Artificial Intelligence", description: "Explore neural networks, deep learning, and cutting-edge AI applications.", color: "#EF4444", icon: Brain },
  { id: 6, route: "ml", title: "Machine Learning", description: "Build intelligent systems with supervised, unsupervised, and reinforcement learning.", color: "#EC4899", icon: Bot },
  { id: 7, route: "data-analytics", title: "Data Analytics", description: "Transform raw data into actionable insights with powerful analytics tools.", color: "#F97316", icon: BarChart2 },
  { id: 8, route: "mobileapp", title: "Mobile App Development", description: "Create native and cross-platform mobile applications for iOS and Android.", color: "#06B6D4", icon: Smartphone },
  { id: 9, route: "php", title: "PHP Development", description: "Master server-side scripting and build dynamic web applications with PHP.", color: "#7C3AED", icon: FileCode2 },
  { id: 10, route: "graphic", title: "Graphic Designing", description: "Master visual communication through branding, illustration, and digital design.", color: "#DB2777", icon: Brush },
  { id: 11, route: "cloud-computing", title: "Cloud Computing", description: "Deploy scalable solutions on AWS, Azure, and Google Cloud platforms.", color: "#0EA5E9", icon: Cloud },
  { id: 12, route: "devops", title: "DevOps", description: "Implement CI/CD pipelines, containerization, and infrastructure automation.", color: "#F97316", icon: GitMerge },
];

const CoursesCard = ({ previewData = null, isPreview = false }) => {
  useCustom("AllCourses | Ziion Technology");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    if (isPreview) return;
    navigate(`/allcourses/${route}`);
  };

  const { content: fetchedContent } = usePageContent("courses-page", {
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
        id: 1, route: "data-science", title: "Data Science", description: "Master data manipulation, statistical analysis, and predictive modeling techniques.", color: "#3B82F6", iconKey: "FlaskConical" },
      { id: 2, route: "web-development", title: "Web Development", description: "Build modern, responsive websites with frontend, backend, and fullstack technologies.", color: "#8B5CF6", iconKey: "Code2" },
      { id: 3, route: "web-designing", title: "Web Designing", description: "Create stunning user experiences with UI/UX design principles and tools.", color: "#F59E0B", iconKey: "Palette" },
      { id: 4, route: "digital-marketing", title: "Digital Marketing", description: "Master SEO, social media advertising, campaign analytics, and growth strategies.", color: "#10B981", iconKey: "TrendingUp" },
      { id: 5, route: "ai", title: "Artificial Intelligence", description: "Explore neural networks, deep learning, and cutting-edge AI applications.", color: "#EF4444", iconKey: "Brain" },
      { id: 6, route: "ml", title: "Machine Learning", description: "Build intelligent systems with supervised, unsupervised, and reinforcement learning.", color: "#EC4899", iconKey: "Bot" },
      { id: 7, route: "data-analytics", title: "Data Analytics", description: "Transform raw data into actionable insights with powerful analytics tools.", color: "#F97316", iconKey: "BarChart2" },
      { id: 8, route: "mobileapp", title: "Mobile App Development", description: "Create native and cross-platform mobile applications for iOS and Android.", color: "#06B6D4", iconKey: "Smartphone" },
      { id: 9, route: "php", title: "PHP Development", description: "Master server-side scripting and build dynamic web applications with PHP.", color: "#7C3AED", iconKey: "FileCode2" },
      { id: 10, route: "graphic", title: "Graphic Designing", description: "Master visual communication through branding, illustration, and digital design.", color: "#DB2777", iconKey: "Brush" },
    ],
  });

  const content = previewData || fetchedContent;

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className={styles.coursesPage}>
      {!isPreview && <NavBar />}

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
            {topics.map((topic) => (
              <div
                key={topic.id}
                className={styles.courseCard}
                onClick={() => handleNavigation(topic.route)}
              >
                <div
                  className={styles.cardIconWrapper}
                  style={{ backgroundColor: `${topic.color}18`, color: topic.color }}
                >
                  {topic.icon && <topic.icon size={32} strokeWidth={1.8} />}
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
                    <ArrowRight size={18} strokeWidth={2.5} className={styles.arrowIcon} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaLeft}>
            <span className={styles.ctaEyebrow}>Enroll Today</span>
            <h2 className={styles.ctaTitle}>
              Take the next step in <br />
              <span className={styles.ctaAccent}>your tech career.</span>
            </h2>
            <p className={styles.ctaSubtitle}>
              Our instructors have worked in the industry — not just taught it.
              Get mentorship, real projects, and a community that actually helps you grow.
            </p>
            <div className={styles.ctaActions}>
              <button className={styles.ctaButton} onClick={() => setShowForm(true)}>
                Talk to a Counsellor
              </button>
              <span className={styles.ctaNote}>Free consultation · No commitment</span>
            </div>
          </div>
          <div className={styles.ctaRight}>
            <div className={styles.ctaStat}>
              <strong>5,000+</strong>
              <span>Students trained</span>
            </div>
            <div className={styles.ctaStat}>
              <strong>92%</strong>
              <span>Placement rate</span>
            </div>
            <div className={styles.ctaStat}>
              <strong>12+</strong>
              <span>Industry courses</span>
            </div>
            <div className={styles.ctaStat}>
              <strong>7 yrs</strong>
              <span>In the field</span>
            </div>
          </div>
        </div>
      </section>

      {!isPreview && <Footer />}

      {/* Form Modal */}
      {showForm && !isPreview && <Form closeForm={closeForm} />}
    </div>
  );
};

export default CoursesCard;
