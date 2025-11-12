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
import Form from "../form/Form"; // Import the Form component

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

      {/* OUR FEATURES */}
      <div className={styles.serviceFeature}>
        <div className={styles.pageWrapper}>
          <header className={styles.headerSection}>
            <span className={styles.categoryLabel}>Motivational Insights</span>
            <h1 className={styles.mainHeading}>
              Inspire Yourself, Unlock Your Potential, Achieve Your Dreams
            </h1>
          </header>

          <main className={styles.contentArea}>
            <div className={styles.featurecontent}>
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
                  Concentrate on what matters most, minimize distractions, and
                  achieve your goals efficiently.
                </p>
              </div>

              <div className={styles.featureBox}>
                <div className={styles.featureIcon}>💡</div>
                <h2 className={styles.featureTitle}>Creativity</h2>
                <p className={styles.featureDescription}>
                  Think outside the box, innovate, and approach challenges with
                  fresh, inspiring ideas.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      <section className={styles.appThird}>
        <div className={styles.leftPanel}>
          <button className={styles.joinBtn} onClick={() => setShowForm(true)}>
            LET'S JOIN
          </button>
          <h1 className={styles.heading}>It’s Time to Hire</h1>
          <h2 className={styles.subheading}>AI Customer Services</h2>
          <p className={styles.description}>
            Hiring an AI Customer services it's easy, you just need to know your
            needs and the business very well.
          </p>
          <div className={styles.buttonsGroup}>
            <button
              className={styles.learnMore}
              onClick={() => setShowForm(true)}
            >
              Learn More
            </button>
            <button
              className={styles.signUpNow}
              onClick={() => setShowForm(true)}
            >
              Contact Us
            </button>
          </div>
        </div>

        <div className={styles.rightPanel}>
          {steps.map((step, index) => (
            <div className={styles.stepBox} key={index}>
              <div className={styles.stepNumber}>{`0${index + 1}`}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* client reviews */}

      <div>
        <section className={styles.clientReviewsSection}>
          <div className={styles.clientHeader}>
            <h1>
              What Our <span className={styles.clientHighlight}>Clients</span>{" "}
              <br />
              Say About <span className={styles.clientHighlight}>Us</span>
            </h1>
          </div>

          {/* Row 1 */}
          <div className={styles.reviewContainer}>
            {/* Block 1 - Web Development */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={WebDevelopment}
                  alt="Web Development"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Web Development</h2>
                  <p>
                    "We provide custom web development services to build
                    responsive, secure, and scalable websites that help
                    businesses establish a strong online presence."
                  </p>
                  <a href="/web-development" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Block 2 - Data Analytics */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.dataAnalytics}
                  alt="Data Analytics"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Data Analytics</h2>
                  <p>
                    "Our data analytics services turn raw data into actionable
                    insights, helping organizations make data-driven decisions
                    with confidence."
                  </p>
                  <a href="/data-analytics" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className={styles.reviewContainer}>
            {/* Block 3 - Data Science */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.datascience}
                  alt="Data Science"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Data Science</h2>
                  <p>
                    "We help businesses leverage data science solutions to
                    forecast trends, automate processes, and enhance customer
                    experiences."
                  </p>
                  <a href="/data-science" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Block 4 - PHP Development */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.php}
                  alt="PHP Development"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>PHP Development</h2>
                  <p>
                    "Our PHP development services deliver robust web
                    applications, CMS solutions, and dynamic websites tailored
                    to client requirements."
                  </p>
                  <a href="/php" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className={styles.reviewContainer}>
            {/* Block 5 - Web Designing */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.webdesigning}
                  alt="Web Designing"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Web Designing</h2>
                  <p>
                    "We craft visually appealing, user-friendly, and
                    mobile-responsive website designs that enhance user
                    engagement and brand identity."
                  </p>
                  <a href="/web-designing" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Block 6 - AI Solutions */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.ai}
                  alt="Artificial Intelligence"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Artificial Intelligence</h2>
                  <p>
                    "Our AI solutions empower businesses with automation,
                    predictive analytics, and smart decision-making systems for
                    future-ready growth."
                  </p>
                  <a href="/ai" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
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
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Machine Learning</h2>
                  <p>
                    "Our ML models deliver smarter predictions, enhanced
                    automation, and intelligent solutions to solve complex
                    business problems."
                  </p>
                  <a href="/ml" className={styles.reviewMoreLink}>
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

            {/* Block 8 - Digital Marketing */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.digital}
                  alt="Digital Marketing"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Digital Marketing</h2>
                  <p>
                    "We offer SEO, social media, and performance marketing
                    strategies to boost online visibility and drive business
                    growth."
                  </p>
                  <a
                    href="/digital-marketing"
                    className={styles.reviewMoreLink}
                  >
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Row 5 */}
          <div className={styles.reviewContainer}>
            {/* Block 9 - Mobile App Development */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.mobileapp}
                  alt="Mobile App Development"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Mobile App Development</h2>
                  <p>
                    "We build scalable and user-friendly mobile apps for Android
                    and iOS platforms, ensuring seamless digital experiences."
                  </p>
                  <a href="/mobileapp" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Block 10 - IT Consulting */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.graphic}
                  alt="Graphic Designing"
                  className={styles.reviewImage}
                />
              </div>
              <div className={styles.reviewTextWrapper}>
                <div className={styles.reviewTextContent}>
                  <h2>Graphic Designing</h2>
                  <p>
                    "Our graphic designing services create visually stunning
                    designs, logos, and branding materials that capture
                    attention and enhance your brand identity."
                  </p>
                  <a href="/graphic" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
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
      
      {/* Modal for Form */}
      {showForm && (
        <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeModal} type="button" onClick={(e) => {
              e.stopPropagation();
              setShowForm(false);
            }}>×</button>
            <Form closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </>
    </div>
  );
}