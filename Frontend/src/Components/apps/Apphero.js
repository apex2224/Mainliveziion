import React, { useState } from "react";
import NavBar from "../head/Navbar";
import styles from "./Apphero.module.css";
import images from "../../assets/images";
import Footer from "../footer/Footer";
import appFourSection1 from "../../assets/app/appFourSection1.png";
import appFourSection2 from "../../assets/app/appFourthSection2.png";
import appFourSection3 from "../../assets/app/appFourthSection3.png";
import nn from "../../assets/app/nn.png";
import ReviewsSection from "../reviews/ReviewsSection";
import WebDevelopment from "../../assets/NewCoursesImages/WebDevelopment.png";
import useCustom from "../customHook/useCustom";

export default function Apphero() {
  const [showForm, setShowForm] = useState(false);

  useCustom("Services | Ziion Technology");

  // const [active, setActive] = useState(null);
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

  return (
    <>
      <NavBar />
      <section className={styles.servicesSection}>
        <div className={styles.servicesBackground}>
          <img src={nn} alt="background" className={styles.servicesImage} />
          <div className={styles.servicesOverlay}>
            <h1 className={styles.servicesTitle}>Empowering Your Future</h1>
            <p className={styles.servicesSubtitle}>
              Providing <strong>Industrial Training</strong> and{" "}
              <strong>IT Services</strong>
              to help you grow and excel in the digital world.
            </p>
            <button
              className={styles.headerBtn}
              onClick={() => setShowForm(true)}
            >
              Talk to us
            </button>
          </div>
        </div>
      </section>

      <section className={styles.appFourSection}>
        <h1 className={styles.title}>Building Careers & Businesses</h1>
        <p className={styles.subtitle}>
          Explore our wide range of professional <strong>Courses</strong>,
          <strong> IT Training</strong>, and <strong>IT Services</strong>{" "}
          designed to help you succeed.
        </p>
        <div className={styles.cardsContainer}>
          {servicesAdvantages.map((advantage, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>
                <img
                  src={advantage.image}
                  alt={advantage.title}
                  className={styles.icon}
                />
              </div>
              <h2 className={styles.cardTitle}>{advantage.title}</h2>
              <p className={styles.cardDescription}>{advantage.description}</p>
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
          <button className={styles.joinBtn}>LET'S JOIN</button>
          <h1 className={styles.heading}>It’s Time to Hire</h1>
          <h2 className={styles.subheading}>AI Customer Services</h2>
          <p className={styles.description}>
            Hiring an AI Customer services it’s easy, you just need to know your
            needs and the business very well.
          </p>
          <div className={styles.buttonsGroup}>
            <button className={styles.learnMore}>Learn More</button>
            <button className={styles.signUpNow}>Sign Up Now</button>
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
                  <a href="#" className={styles.reviewMoreLink}>
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
                  <a href="#" className={styles.reviewMoreLink}>
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
                  <a href="#" className={styles.reviewMoreLink}>
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
                  <a href="#" className={styles.reviewMoreLink}>
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
                  <a href="#" className={styles.reviewMoreLink}>
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
                  <a href="#" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className={styles.reviewContainer}>
            {/* Block 7 - Machine Learning */}
            <div className={styles.reviewCard}>
              <div className={styles.reviewImageWrapper}>
                <img
                  src={images.ml}
                  alt="Machine Learning"
                  className={styles.reviewImage}
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
                  <a href="#" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>

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
                  <a href="#" className={styles.reviewMoreLink}>
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
                  <a href="#" className={styles.reviewMoreLink}>
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
                  <a href="#" className={styles.reviewMoreLink}>
                    Read More ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <div className={styles.appFeatureContainer}>
      <div
        className={`${styles.appFeatureCard} ${active === 'web' ? styles.active : ''}`}
        onMouseEnter={() => setActive('web')}
        onMouseLeave={() => setActive(null)}>
        <img src={images.appPick1} className={styles.appFeatureImage} alt="Web Development" />
        <div className={styles.appFeatureOverlay}>
          {active === 'web' && (
            <p className={styles.appFeatureText}>Build modern, responsive websites with custom functionality and design.</p>
          )}
        </div>
      </div>

      <div
        className={`${styles.appFeatureCard} ${active === 'app' ? styles.active : ''}`}
        onMouseEnter={() => setActive('app')}
        onMouseLeave={() => setActive(null)}
      >
        <img src={images.appPick2} className={styles.appFeatureImage} alt="Mobile App Development" />
        <div className={styles.appFeatureOverlay}>
          {active === 'app' && (
            <p className={styles.appFeatureText}>Create user-friendly apps for Android and iOS platforms with top performance.</p>
          )}
        </div>
      </div>

      <div
        className={`${styles.appFeatureCard} ${active === 'marketing' ? styles.active : ''}`}
        onMouseEnter={() => setActive('marketing')}
        onMouseLeave={() => setActive(null)}
      >
        <img src={images.appPick3} className={styles.appFeatureImage} alt="Digital Marketing" />
        <div className={styles.appFeatureOverlay}>
          {active === 'marketing' && (
            <p className={styles.appFeatureText}>Grow your brand with SEO, social media marketing, and paid campaigns.</p>
          )}
        </div>
      </div>
    </div> */}
      <ReviewsSection />

      <Footer />
    </>
  );
}
