import React, { useState, useCallback } from "react"; // Import useCallback
import Particles from "react-tsparticles"; // Import Particles
import { loadSlim } from "tsparticles-slim"; // Import the slim engine
import particlesConfig from "../apps/Particles-config"; // Import our new config

import NavBar from "../head/Navbar";
import styles from "./Apphero.module.css";
import images from "../../assets/images";
import Footer from "../footer/Footer";
import appFourSection1 from "../../assets/app/appFourSection1.png";
import appFourSection2 from "../../assets/app/appFourthSection2.png";
import appFourSection3 from "../../assets/app/appFourthSection3.png";
import ReviewsSection from "../reviews/ReviewsSection";
import WebDevelopment from "../../assets/NewCoursesImages/WebDevelopment.png";
import useCustom from "../customHook/useCustom";

export default function Apphero() {
  const [showForm, setShowForm] = useState(false);

  useCustom("Services | Ziion Technology");

  // Add this function to load the particle engine
  const particlesInit = useCallback(async (engine) => {
    // This loads the slim version of tsparticles
    await loadSlim(engine);
  }, []);

  // Data for "How to Join" section
  const steps = [
    {
      title: "Join Us",
      description:
        "Boost your courage and take the first step towards your IT career.",
    },
    {
      title: "Choose Your Course",
      description:
        "Select from a wide range of industry-relevant IT courses designed for you.",
    },
    {
      title: "Learn & Practice",
      description:
        "Gain practical knowledge with hands-on training and real-world projects.",
    },
    {
      title: "Achieve & Grow",
      description:
        "Build confidence, earn certifications, and accelerate your career in IT.",
    },
  ];

  // Data for "Advantages" section
  const servicesAdvantages = [
    {
      title: "Learn industry-relevant skills with expert guidance.",
      description: "Professional Courses",
      image: appFourSection1,
    },
    {
      title: "Boost your business with our customized IT solutions.",
      description: "IT Services",
      image: appFourSection2,
    },
    {
      title:
        "Hands-on training programs to prepare you for real-world challenges.",
      description: "IT Training",
      image: appFourSection3,
    },
  ];

  // Data for "All Services" grid
  const allServices = [
    {
      title: "Web Development",
      description:
        "We provide custom web development services to build responsive, secure, and scalable websites.",
      image: WebDevelopment,
      link: "#",
    },
    {
      title: "Data Analytics",
      description:
        "Our data analytics services turn raw data into actionable insights for data-driven decisions.",
      image: images.dataAnalytics,
      link: "#",
    },
    {
      title: "Data Science",
      description:
        "Leverage data science solutions to forecast trends, automate processes, and enhance experiences.",
      image: images.datascience,
      link: "#",
    },
    {
      title: "PHP Development",
      description:
        "We deliver robust web applications, CMS solutions, and dynamic websites tailored to your requirements.",
      image: images.php,
      link: "#",
    },
    {
      title: "Web Designing",
      description:
        "We craft visually appealing, user-friendly, and mobile-responsive website designs.",
      image: images.webdesigning,
      link: "#",
    },
    {
      title: "Artificial Intelligence",
      description:
        "Empower your business with automation, predictive analytics, and smart decision-making systems.",
      image: images.ai,
      link: "#",
    },
    {
      title: "Machine Learning",
      description:
        "Our ML models deliver smarter predictions and intelligent solutions to solve complex problems.",
      image: images.ml,
      link: "#",
    },
    {
      title: "Digital Marketing",
      description:
        "SEO, social media, and performance marketing strategies to boost online visibility.",
      image: images.digital,
      link: "#",
    },
    {
      title: "Mobile App Development",
      description:
        "We build scalable and user-friendly mobile apps for Android and iOS platforms.",
      image: images.mobileapp,
      link: "#",
    },
    {
      title: "Graphic Designing",
      description:
        "Visually stunning designs, logos, and branding materials that capture attention.",
      image: images.graphic,
      link: "#",
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <NavBar />

      {/* --- HERO SECTION --- */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          {/* The Particles component */}
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesConfig}
            className={styles.particlesCanvas} // Add a class for styling
          />

          <div className={styles.heroOverlay}>
            <h1 className={styles.heroTitle}>Empowering Your Future</h1>
            <p className={styles.heroSubtitle}>
              Providing <strong>Industrial Training</strong> and{" "}
              <strong>IT Services</strong>
              to help you grow and excel in the digital world.
            </p>
            <button
              className={styles.heroCtaButton}
              onClick={() => setShowForm(true)}
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      {/* --- ADVANTAGES SECTION --- */}
      <section className={styles.advantagesSection}>
        <h1 className={styles.sectionTitle}>Building Careers & Businesses</h1>
        <p className={styles.sectionSubtitle}>
          Explore our wide range of professional <strong>Courses</strong>,
          <strong> IT Training</strong>, and <strong>IT Services</strong>{" "}
          designed to help you succeed.
        </p>
        <div className={styles.advantagesGrid}>
          {servicesAdvantages.map((advantage, index) => (
            <div key={index} className={styles.advantageCard}>
              <div className={styles.advantageIconContainer}>
                <img
                  src={advantage.image}
                  alt={advantage.title}
                  className={styles.advantageIcon}
                />
              </div>
              <h2 className={styles.advantageTitle}>{advantage.title}</h2>
              <p className={styles.advantageDescription}>
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- SERVICES GRID SECTION (Moved Up) --- */}
      <section className={styles.servicesGridSection}>
        <div className={styles.servicesGridHeader}>
          <h1 className={styles.sectionTitle}>
            Our Comprehensive{" "}
            <span className={styles.highlight}>IT Services</span>
          </h1>
        </div>

        <div className={styles.servicesGrid}>
          {allServices.map((service, index) => (
            <div className={styles.serviceCard} key={index}>
              <div className={styles.serviceCardImageWrapper}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.serviceCardImage}
                />
              </div>
              <div className={styles.serviceCardTextWrapper}>
                <div className={styles.serviceCardTextContent}>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <a
                    href={service.link}
                    className={styles.serviceCardMoreLink}
                  >
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROCESS/JOIN SECTION (Content Updated) --- */}
      <section className={styles.processSection}>
        <div className={styles.processGrid}>
          <div className={styles.processLeftPanel}>
            <span className={styles.categoryLabel}>START YOUR JOURNEY</span>
            <h1 className={styles.processHeading}>Begin Your Career With Us</h1>
            <h2 className={styles.processSubheading}>
              Simple Steps to Get Started
            </h2>
            <p className={styles.processDescription}>
              Follow these simple steps to enroll in our industry-leading
              training programs and unlock your potential.
            </p>
            <div className={styles.processButtonsGroup}>
              <button className={styles.buttonPrimary}>View Courses</button>
              <button className={styles.buttonOutline}>Contact Us</button>
            </div>
          </div>

          <div className={styles.processRightPanel}>
            {steps.map((step, index) => (
              <div className={styles.processStep} key={index}>
                <div className={styles.processStepNumber}>{`0${
                  index + 1
                }`}</div>
                <div className={styles.processStepContent}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS SECTION --- */}
      <ReviewsSection />

      {/* --- FOOTER --- */}
      <Footer />
    </div>
  );
}