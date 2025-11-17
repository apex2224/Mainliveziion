import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import particlesConfig from "../apps/Particles-config";
import { useNavigate } from "react-router-dom";

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
import Form from "../form/Form";

export default function Apphero() {
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useCustom("Services | Ziion Technology");

  const particlesInit = useCallback(async (engine) => {
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
    // {
    //   title: "PHP Development",
    //   description:
    //     "We deliver robust web applications, CMS solutions, and dynamic websites tailored to your requirements.",
    //   image: images.php,
    //   link: "#",
    // },
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
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesConfig}
            className={styles.particlesCanvas}
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

      {/* --- MOTIVATIONAL INSIGHTS (NOW STYLED) --- */}
      <div className={styles.serviceFeature}>
        <div className={styles.pageWrapper}>
          <header className={styles.headerSection}>
            <span className={styles.categoryLabel}>Motivational Insights</span>
            <h1 className={styles.mainHeading}>
              Inspire Yourself, Unlock Your Potential, Achieve Your Dreams
            </h1>
          </header>

          <main className={styles.contentArea}>
            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🏆</div>
              <h2 className={styles.featureTitle}>Self-Confidence</h2>
              <p className={styles.featureDescription}>
                Believe in yourself, embrace your strengths, and tackle
                challenges with courage.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🌟</div>
              <h2 className={styles.featureTitle}>Goal Setting</h2>
              <p className={styles.featureDescription}>
                Set clear goals, plan your journey, and stay focused on what
                truly matters to achieve success.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🔥</div>
              <h2 className={styles.featureTitle}>Persistence</h2>
              <p className={styles.featureDescription}>
                Keep going even when the path is tough. Every step forward
                brings you closer to your dreams.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🌈</div>
              <h2 className={styles.featureTitle}>Positive Mindset</h2>
              <p className={styles.featureDescription}>
                Cultivate positivity in your thoughts and actions to attract
                success and happiness.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🚀</div>
              <h2 className={styles.featureTitle}>Ambition</h2>
              <p className={styles.featureDescription}>
                Dream big, take bold steps, and strive to reach new heights in
                every area of your life.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🧘‍♂️</div>
              <h2 className={styles.featureTitle}>Resilience</h2>
              <p className={styles.featureDescription}>
                Bounce back from setbacks stronger than before and turn
                challenges into opportunities.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>🎯</div>
              <h2 className={styles.featureTitle}>Focus</h2>
              <p className={styles.featureDescription}>
                Concentrate on what matters most, minimize distractions, and achieve your goals efficiently.
              </p>
            </div>

            <div className={styles.featureBox}>
              <div className={styles.featureIcon}>💡</div>
              <h2 className={styles.featureTitle}>Creativity</h2>
              <p className={styles.featureDescription}>
                Think outside the box, innovate, and approach challenges with fresh, inspiring ideas.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* --- PROCESS/JOIN SECTION (This is the correct one) --- */}
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
              <button
                className={styles.buttonPrimary}
                onClick={() => navigate("/allcourses")}
              >
                View Courses
              </button>
              <button
                className={styles.buttonOutline}
                onClick={() => setShowForm(true)}
              >
                Contact Us
              </button>
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

      {/* --- SERVICES GRID SECTION --- */}
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
                  <a href={service.link} className={styles.serviceCardMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CUSTOMER TESTIMONIALS (NOW STYLED) --- */}
      <section className={styles.clientReviewsSection}>
        <div className={styles.clientHeader}>
          <h1>
            What Our <span className={styles.clientHighlight}>Clients</span>{" "}
            <br />
            Say About <span className={styles.clientHighlight}>Us</span>
          </h1>
        </div>
        <ReviewsSection />
      </section>

      {/* --- FOOTER --- */}
      <Footer />

      {/* --- Modal for Form --- */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeModal}
              type="button"
              onClick={() => setShowForm(false)} // Simplified
            >
              ×
            </button>
            <Form closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
