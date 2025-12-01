import React, { useState, useEffect, useRef } from "react";
import styles from "./ML.module.css";
import images from "../../../assets/images"; // Ensure this has your ML images
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import Form from "../../form/Form";
import SecondForm from "../../secondForm/SecondForm";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import ReviewsSection from "../../reviews/ReviewsSection";
import StudentCarousel from "../../placement/StudentCarousel";

import tenplustwoImage from "../../../assets/NewCoursesImages/10+2.png";
import jobImage from "../../../assets/NewCoursesImages/Job.png";
import freelancerImage from "../../../assets/NewCoursesImages/freelancer.png";
import workingProfessionalImage from "../../../assets/NewCoursesImages/workingproffessional.png";

// Import your ML data here
import {
  heroPhrases,
  statsData,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./MLdata";

// React Icons for Hero & Tools
import {
  SiPython,
  SiTensorflow,
  SiKeras,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiJupyter,
  SiPlotly,
} from "react-icons/si";

// Scroll Cards Data
const rightScrollCards = [
  { image: images.simratMl },
  { image: images.arshdeepMl },
  { image: images.harnoorMl },
  { image: images.arshdeepSinghMl },
  { image: images.devagyaPy },
  { image: images.gurshanPy },
  { image: images.simranjeet },
  { image: images.simrat },
  { image: images.abhishek },
];

const CARD_WIDTH = 300; // px
const VIDEO_WIDTH = 310; // px

// --- Typewriter Hook ---
const useCustomTypewriter = (phrasesArray) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrasesArray[currentPhraseIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrasesArray.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentPhraseIndex, phrasesArray]);

  return text;
};

const MachineLearning = () => {
  const [showForm, setShowForm] = useState(false);
  const typedOutput = useCustomTypewriter(heroPhrases);

  // Certificate Hover State
  const [active, setActive] = useState(null);

  // FAQ toggle
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    faqRefs.current.forEach((ref, i) => {
      if (ref) {
        if (i === openIndex) {
          ref.classList.add(styles.openBody);
        } else {
          ref.classList.remove(styles.openBody);
        }
      }
    });
  }, [openIndex]);

  // --- NEW: 'Who Can Join' Interactive Tabs State ---
  const [activeAudience, setActiveAudience] = useState("students");

  // Content for the tabs (Customized for ML)
  const audienceData = {
    students: {
      title: "Aspiring AI Engineers",
      description:
        "Beginners and students eager to build the future with Artificial Intelligence.",
      image: tenplustwoImage, // Use relevant ML image
    },
    developers: {
      title: "Software Developers",
      description:
        "Coders looking to transition into high-growth AI and ML roles.",
      image: jobImage, // Use relevant ML image
    },
    analysts: {
      title: "Data Analysts",
      description:
        "Professionals wanting to move from analyzing past data to predicting future trends.",
      image: freelancerImage, // Use relevant ML image
    },
    professionals: {
      title: "Business Professionals",
      description:
        "Leaders wanting to leverage Machine Learning for data-driven decision making.",
      image: workingProfessionalImage, // Use relevant ML image
    },
  };

  const activeContent = audienceData[activeAudience];

  // --- NEW: Syllabus Accordion Logic ---
  const getSyllabusColumns = () => {
    const allTopics = Object.keys(syllabusData);
    const midpoint = Math.ceil(allTopics.length / 2);
    const leftTopics = allTopics.slice(0, midpoint);
    const rightTopics = allTopics.slice(midpoint);
    return { leftTopics, rightTopics };
  };

  const [openSyllabusTopic, setOpenSyllabusTopic] = useState(null);
  const toggleSyllabus = (topic) => {
    setOpenSyllabusTopic(openSyllabusTopic === topic ? null : topic);
  };

  const { leftTopics, rightTopics } = getSyllabusColumns();

  // --- Placement Carousel Logic ---
  const [topIndex, setTopIndex] = useState(0);
  const [topTransition, setTopTransition] = useState(true);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [bottomTransition, setBottomTransition] = useState(true);
  const [isTopPaused, setIsTopPaused] = useState(false);
  const [isBottomPaused, setIsBottomPaused] = useState(false);

  useEffect(() => {
    if (isTopPaused) return;
    const id = setInterval(() => {
      setTopIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(id);
  }, [isTopPaused]);

  useEffect(() => {
    if (isBottomPaused) return;
    const id = setInterval(() => {
      setBottomIndex((prev) => prev + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [isBottomPaused]);

  useEffect(() => {
    if (topIndex >= rightScrollCards.length) {
      setTimeout(() => {
        setTopTransition(false);
        setTopIndex(0);
        requestAnimationFrame(() => setTopTransition(true));
      }, 800);
    }
  }, [topIndex]);

  useEffect(() => {
    if (bottomIndex >= leftScrollCards.length) {
      setTimeout(() => {
        setBottomTransition(false);
        setBottomIndex(0);
        requestAnimationFrame(() => setBottomTransition(true));
      }, 800);
    }
  }, [bottomIndex]);

  const handleTopMouseEnter = () => setIsTopPaused(true);
  const handleTopMouseLeave = () => setIsTopPaused(false);
  const handleBottomMouseEnter = () => setIsBottomPaused(true);
  const handleBottomMouseLeave = () => setIsBottomPaused(false);

  const handleTopPrev = () => {
    setTopIndex((prev) =>
      prev === 0 ? rightScrollCards.length - 1 : prev - 1
    );
  };
  const handleTopNext = () => {
    setTopIndex((prev) =>
      prev === rightScrollCards.length - 1 ? 0 : prev + 1
    );
  };
  const handleBottomPrev = () => {
    setBottomIndex((prev) =>
      prev === 0 ? leftScrollCards.length - 1 : prev - 1
    );
  };
  const handleBottomNext = () => {
    setBottomIndex((prev) =>
      prev === leftScrollCards.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className={styles.heroSection}>
        <div className={styles.overlay}>
          {/* Using classNames from CSS for animation, referencing React Icons */}
          <div className={styles.html}>
            <SiPython size={60} color="#3776AB" />
          </div>
          <div className={styles.css}>
            <SiTensorflow size={80} color="#FF6F00" />
          </div>
          <div className={styles.js}>
            <SiKeras size={70} color="#D00000" />
          </div>
          <div className={styles.react}>
            <SiNumpy size={70} color="#013243" />
          </div>
          <div className={styles.bootstrap}>
            <SiPandas size={100} color="#150458" />
          </div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={`${styles.heroFalldown} ${styles.gradientText}`}>
              Machine Learning Course in Chandigarh
              <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.heroSubtitle}>
            Master the algorithms that drive the future. From predictive models
            to deep neural networks, build the core skills essential for AI with
            our top-rated Machine Learning course.
          </h2>
          <button
            className={styles.herobutton}
            onClick={() => setShowForm(true)}
          >
            Talk to us
          </button>
        </div>
      </section>

      {/* Render the form as a modal at the component level */}
      {showForm && <Form closeForm={() => setShowForm(false)} />}

      {/* --- STATS SECTION --- */}
      <div className={styles.statsWrapper}>
        {statsData.map((stat, index) => (
          <div className={styles.statCircle} key={index}>
            <div className={styles.statsrotatingRing}></div>
            <div className={styles.statContent}>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- TOOLS SECTION --- */}
      <section className={styles.toolsMain}>
        <h1>Tools You Will Master</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Python</h3>
              <p className={styles.toolDescription}>
                The #1 language for ML, known for its simplicity and vast
                ecosystem of data libraries.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiPython size={60} color="#3776AB" className={styles.toolIcon} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiTensorflow
                size={60}
                color="#FF6F00"
                className={styles.toolIcon}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>TensorFlow</h3>
              <p className={styles.toolDescription}>
                Google's open-source framework for building and deploying robust
                ML and Deep Learning models.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Keras</h3>
              <p className={styles.toolDescription}>
                A high-level neural networks API enabling fast experimentation
                and prototyping.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiKeras size={60} color="#D00000" className={styles.toolIcon} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiNumpy size={60} color="#013243" className={styles.toolIcon} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>NumPy</h3>
              <p className={styles.toolDescription}>
                The fundamental package for scientific computing, powering
                efficient array and matrix operations.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Pandas</h3>
              <p className={styles.toolDescription}>
                Fast, flexible, and expressive data structures designed to make
                working with relational data easy.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiPandas size={60} color="#150458" className={styles.toolIcon} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiScikitlearn
                size={60}
                color="#F7931E"
                className={styles.toolIcon}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Scikit-Learn</h3>
              <p className={styles.toolDescription}>
                Simple and efficient tools for predictive data analysis, built
                on NumPy, SciPy, and matplotlib.
              </p>
            </div>
          </div>
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* --- WHO CAN JOIN (Tabs) --- */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>Who is this ML Course For?</h1>
        <p className={styles.subheading}>
          Our Machine Learning training is designed for anyone ready to
          innovate. Whether you're a student, a developer, or an analyst, we
          provide the blueprint to become an AI specialist.
        </p>

        <div className={styles.roadmapBox}>
          {/* Left: Navigation */}
          <div className={styles.leftSection}>
            <div className={styles.audienceNav}>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "students" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("students")}
              >
                <span className={styles.tabIcon}>🎓</span>
                <div>
                  <strong>Aspiring AI Engineers</strong>
                  <span className={styles.tabSubtext}>
                    Start your AI journey
                  </span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "developers" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("developers")}
              >
                <span className={styles.tabIcon}>💻</span>
                <div>
                  <strong>Software Developers</strong>
                  <span className={styles.tabSubtext}>
                    Transition into AI roles
                  </span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "analysts" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("analysts")}
              >
                <span className={styles.tabIcon}>📊</span>
                <div>
                  <strong>Data Analysts</strong>
                  <span className={styles.tabSubtext}>
                    Master predictive modeling
                  </span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "professionals" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("professionals")}
              >
                <span className={styles.tabIcon}>📈</span>
                <div>
                  <strong>Business Professionals</strong>
                  <span className={styles.tabSubtext}>
                    Drive data decisions
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Content */}
          <div className={styles.rightSection}>
            <div className={styles.audienceContentPane} key={activeAudience}>
              <img
                src={activeContent.image}
                alt={activeContent.title}
                className={styles.whatlearnimg}
              />
              <h3 className={styles.contentTitle}>{activeContent.title}</h3>
              <p className={styles.contentDescription}>
                {activeContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <EnrollProcess />

      {/* --- SUCCESS STORIES --- */}
      <div>
        <h1 className={styles.storyHeading}>Our Success Story</h1>

        {/* Videos Bottom */}
        <div className={styles.leftCarouselWrapper}>
          <div
            className={styles.leftCarousel}
            style={{
              transform: `translateX(-${bottomIndex * VIDEO_WIDTH}px)`,
              transition: bottomTransition
                ? "transform 0.8s ease-in-out"
                : "none",
            }}
            onMouseEnter={handleBottomMouseEnter}
            onMouseLeave={handleBottomMouseLeave}
          >
            {[...leftScrollCards, ...leftScrollCards].map((item, i) => (
              <div key={i} className={styles.leftCard}>
                <iframe
                  src={item.iframe}
                  className={styles.leftIframe}
                  title={`video-${i}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
                <div className={styles.leftProfileSection}>{item.name}</div>
                <div className={styles.leftCompanySection}>{item.company}</div>
              </div>
            ))}
          </div>
          <div className={styles.carouselButtons}>
            <button onClick={handleBottomPrev} className={styles.carouselBtn}>
              ◀️
            </button>
            <button onClick={handleBottomNext} className={styles.carouselBtn}>
              ▶️
            </button>
          </div>
        </div>

        {/* Images Top */}
        <div className={styles.carouselWrapper}>
          <div
            className={styles.carousel}
            style={{
              transform: `translateX(${
                -rightScrollCards.length * CARD_WIDTH + topIndex * CARD_WIDTH
              }px)`,
              transition: topTransition ? "transform 0.8s ease-in-out" : "none",
            }}
            onMouseEnter={handleTopMouseEnter}
            onMouseLeave={handleTopMouseLeave}
          >
            {[...rightScrollCards, ...rightScrollCards].map((item, i) => (
              <div key={i} className={styles.card}>
                <img
                  src={item.image}
                  alt="student"
                  className={styles.cardImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.carouselButtons}>
            <button onClick={handleTopPrev} className={styles.carouselBtn}>
              ◀️
            </button>
            <button onClick={handleTopNext} className={styles.carouselBtn}>
              ▶️
            </button>
          </div>
        </div>
      </div>

      <StudentCarousel />

      {/* --- SYLLABUS SECTION (Accordion) --- */}
      <section className={styles.syllabusSection}>
        <h1 className={styles.syllabusTitle}>
          Machine Learning Course Syllabus
        </h1>
        <p className={styles.syllabusSubtitle}>
          Our curriculum is crafted by industry leaders to take you from Python
          basics to advanced Deep Learning and Neural Networks.
        </p>

        <div className={styles.syllabusGrid}>
          {/* Left Column */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Core Concepts & Tools</h2>
            {leftTopics.map((topic, index) => (
              <div className={styles.accordionItem} key={topic}>
                <div
                  className={styles.accordionHeader}
                  onClick={() => toggleSyllabus(topic)}
                >
                  <span className={styles.accordionTitle}>
                    {`${index + 1}. ${topic}`}
                  </span>
                  <div
                    className={`${styles.accordionIcon} ${
                      openSyllabusTopic === topic ? styles.open : ""
                    }`}
                  >
                    <span>▼</span>
                  </div>
                </div>
                {openSyllabusTopic === topic && (
                  <div className={styles.accordionBody}>
                    <ul className={styles.syllabusList}>
                      {syllabusData[topic].map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Advanced ML & Deployment</h2>
            {rightTopics.map((topic, index) => (
              <div className={styles.accordionItem} key={topic}>
                <div
                  className={styles.accordionHeader}
                  onClick={() => toggleSyllabus(topic)}
                >
                  <span className={styles.accordionTitle}>
                    {`${index + leftTopics.length + 1}. ${topic}`}
                  </span>
                  <div
                    className={`${styles.accordionIcon} ${
                      openSyllabusTopic === topic ? styles.open : ""
                    }`}
                  >
                    <span>▼</span>
                  </div>
                </div>
                {openSyllabusTopic === topic && (
                  <div className={styles.accordionBody}>
                    <ul className={styles.syllabusList}>
                      {syllabusData[topic].map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              ML Projects Showcasing Innovation
            </h2>
          </div>

          <div className={styles.projectSectionGrid}>
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🤖</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Recommendation Systems
                </h3>
                <p className={styles.projectSectionDesc}>
                  Build a system like Netflix or Amazon using collaborative
                  filtering to suggest products.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📈</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Stock Prediction</h3>
                <p className={styles.projectSectionDesc}>
                  Use LSTM and time-series analysis to forecast market trends
                  and stock prices.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🚗</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Autonomous Driving
                </h3>
                <p className={styles.projectSectionDesc}>
                  Implement computer vision to detect lanes and signs for
                  self-driving logic.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project7}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🛡️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Fraud Detection</h3>
                <p className={styles.projectSectionDesc}>
                  Create classification models to identify fraudulent bank
                  transactions in real-time.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>💬</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Sentiment Analysis
                </h3>
                <p className={styles.projectSectionDesc}>
                  Use NLP to analyze social media text and determine public
                  sentiment.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🏥</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Disease Prediction
                </h3>
                <p className={styles.projectSectionDesc}>
                  Predict the likelihood of diseases based on patient medical
                  history using classification.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* --- ACHIEVERS SECTION --- */}
      <section className={styles.achieversSection}>
        <div className={styles.achieversInner}>
          <h2 id="achievers-title" className={styles.achieversTitle}>
            <span className={styles.shimmer}>Our Achievers</span>
          </h2>
          <p className={styles.achieversSubtitle}>
            From <span className={styles.highlight}>classroom</span> to{" "}
            <span className={styles.highlight}>career</span> — turning ambition
            into offers at leading companies.
          </p>
        </div>

        <div className={styles.appFeatureContainer}>
          {/* Reuse the images/cards from the ML logic but with DS styling */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "one" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("one")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.rubalPreetKaurMl}
              className={styles.appFeatureImage}
              alt="Student"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "one" && (
                <p className={styles.appFeatureText}>
                  "Machine Learning gave me the power to predict the future with
                  code."
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "two" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("two")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.muskanMl}
              className={styles.appFeatureImage}
              alt="Student"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "two" && (
                <p className={styles.appFeatureText}>
                  "From algorithms to AI applications, the journey was
                  incredible."
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "three" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("three")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.jashandeepMl}
              className={styles.appFeatureImage}
              alt="Student"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "three" && (
                <p className={styles.appFeatureText}>
                  "The practical projects really prepared me for the industry."
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "four" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("four")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.harnoorMl}
              className={styles.appFeatureImage}
              alt="Student"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "four" && (
                <p className={styles.appFeatureText}>
                  "Learning Neural Networks opened a new world of
                  possibilities."
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- CAREER OPPORTUNITIES --- */}
      <div className={styles.carerrOpportunities}>
        <h2 className={styles.opportunitiesheading}>
          💼 Career <span> Opportunities</span> After This Course.
        </h2>
        <div className={styles.careerOpportunitiesGrid}>
          {careerOpportunities.map((service, index) => {
            const icons = ["📊", "🔬", "🤖", "📈", "🔧", "🧠"];
            const icon = icons[index] || "💼";

            return (
              <div
                key={index}
                className={`${styles.careerCard} ${styles.curveTopRight} ${styles.curveBottomLeft}`}
              >
                <div className={styles.careerCardContent}>
                  <div className={styles.careerIcon}>{icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </div>

      {/* --- WHY CHOOSE US --- */}
      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For ML Training?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            We enable every student to develop exceptional skills in
            <strong> Machine Learning</strong> and guarantee job assistance.
          </p>
        </div>

        <div className={styles.whychooseusGrid}>
          <div className={styles.whychooseusList}>
            {chooseUsLeftItems.map((item, index) => (
              <div className={styles.whychooseusItem} key={index}>
                <span className={styles.whychooseusIcon}>{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <div className={styles.whychooseusImage}>
            <img src={images.whyChooseImg} alt="Why Choose Us" />
          </div>
          <div className={styles.whychooseusList}>
            {chooseUsRightItems.map((item, index) => (
              <div className={styles.whychooseusItem} key={index}>
                <span className={styles.whychooseusIcon}>{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* --- FAQ SECTION --- */}
      <div className={styles.faqContainer}>
        <div className={styles.faqContent}>
          <div className={styles.faqLeft}>
            <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
            <div className={styles.faqFaqs}>
              {faqQuestions.map((item, index) => (
                <div key={index} className={styles.faqFaqCard}>
                  <div
                    className={styles.faqFaqHeader}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className={styles.faqIconCircle}>
                      {openIndex === index ? "−" : "+"}
                    </span>
                    <span className={styles.faqQuestionText}>
                      {item.question}
                    </span>
                  </div>
                  {openIndex === index && (
                    <div
                      ref={(el) => (faqRefs.current[index] = el)}
                      className={styles.faqFaqBody}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- CERTIFICATE SECTION --- */}
      <section className={styles.certificateSection}>
        <div className={styles.mainContainer}>
          <div className={styles.certificateImage}>
            <img src={images.certificatehero} alt="Ziion Certificate" />
          </div>
          <div className={styles.certificateContent}>
            <h2>WHAT BENEFITS AWAIT YOU AT ZIION TECHNOLOGY?</h2>
            <p className={styles.highlight}>
              Highly Acclaimed Program Over the Years, We've Educated Over
              35,000+ Learners & Supported Them in Landing Their Initial IT
              Role.
            </p>
            <p className={styles.description}>
              We Provide Fully Career-Focused Courses for Professionals,
              Entrepreneurs, and Students at Reasonable Costs.
            </p>
            <p className={styles.showcase}>
              <strong>Showcase Your Success</strong>
              <br />
              Post it on LinkedIn to enhance your profile and share your
              accomplishment with peers.
            </p>
          </div>
        </div>
        <div className={styles.certificateGallery}>
          <img src={images.devagyaPy} alt="Certificate 1" />
          <img src={images.gurshanPy} alt="Certificate 2" />
          <img src={images.rubalPreetKaurMl} alt="Certificate 3" />
          <img src={images.harnoorMl} alt="Certificate 4" />
        </div>
      </section>

      <SecondForm />
      <Footer />
    </div>
  );
};

export default MachineLearning;
