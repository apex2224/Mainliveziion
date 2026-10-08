import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./dataScience.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import developer from "../../../assets/NewCoursesImages/developer.png";
import analyst from "../../../assets/NewCoursesImages/analyst.png";
import datascientist from "../../../assets/NewCoursesImages/datascientist.png";
import workingproffessional from "../../../assets/NewCoursesImages/workingproffessional.png";
import dataascience from "../../../assets/NewCoursesImages/dataascience.png";

import {
  statsData,
  heroPhrases,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./dataScienceData";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Certification from "../../Certification/Certification";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Form from "../../form/Form";
import ReviewsSection from "../../reviews/ReviewsSection";
import SecondForm from "../../secondForm/SecondForm";
import StudentCarousel from "../../placement/StudentCarousel";

const rightScrollCards = [
  { image: images.aayushDs },
  { image: images.harmanPreetDs },
  { image: images.mananMangleshDs },
  { image: images.ramanDeepDs },
  { image: images.abhishekDs },
  { image: images.aryanDs },
  { image: images.mohit },
  { image: images.mohitKumarDataScience },
];

const CARD_WIDTH = 300; // px
const VIDEO_WIDTH = 310; // px

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

const DataScience = () => {
  const [showForm, setShowForm] = useState(false);

  // sertificate //
  const [active, setActive] = useState(null);

  const typedOutput = useCustomTypewriter(heroPhrases);

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

  // --- NEW State for 'Who Can Join' tabs ---
  const [activeAudience, setActiveAudience] = useState("students");

  // Content for the tabs (Data from your old JSX)
  const audienceData = {
    students: {
      title: "Aspiring Data Scientist",
      description:
        "Beginners with an analytical mindset eager to enter the field.",
      image: datascientist,
    },
    developers: {
      title: "Software Developers/Engineers",
      description: "Looking to transition into data-centric roles.",
      image: developer,
    },
    analysts: {
      title: "Analysts & Statisticians",
      description:
        "Wanting to upgrade skills with modern tools and machine learning techniques.",
      image: analyst,
    },
    professionals: {
      title: "Any Professional",
      description:
        "With a keen interest in data, problem-solving, and a desire to make data-driven decisions.",
      image: workingproffessional,
    },
  };

  // Get the content for the currently active tab
  const activeContent = audienceData[activeAudience];

  // --- Helper to prepare syllabus data ---
  const getSyllabusColumns = () => {
    const allTopics = Object.keys(syllabusData);
    const midpoint = Math.ceil(allTopics.length / 2);
    const leftTopics = allTopics.slice(0, midpoint);
    const rightTopics = allTopics.slice(midpoint);
    return { leftTopics, rightTopics };
  };

  // --- NEW Syllabus Accordion State ---
  const [openSyllabusTopic, setOpenSyllabusTopic] = useState(null);

  // Toggle function for syllabus accordion
  const toggleSyllabus = (topic) => {
    setOpenSyllabusTopic(openSyllabusTopic === topic ? null : topic);
  };

  // Prepare the syllabus columns
  const { leftTopics, rightTopics } = getSyllabusColumns();

  // placement //
  // Top (left → right)
  const [topIndex, setTopIndex] = useState(0);
  const [topTransition, setTopTransition] = useState(true);

  // Bottom (right → left)
  const [bottomIndex, setBottomIndex] = useState(0);
  const [bottomTransition, setBottomTransition] = useState(true);

  // Carousel play/pause state
  const [isTopPaused, setIsTopPaused] = useState(false);
  const [isBottomPaused, setIsBottomPaused] = useState(false);

  // Auto move top carousel
  useEffect(() => {
    if (isTopPaused) return;
    const id = setInterval(() => {
      setTopIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(id);
  }, [isTopPaused]);

  // Auto move bottom carousel
  useEffect(() => {
    if (isBottomPaused) return;
    const id = setInterval(() => {
      setBottomIndex((prev) => prev + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [isBottomPaused]);

  // Reset loop for top
  useEffect(() => {
    if (topIndex >= rightScrollCards.length) {
      setTimeout(() => {
        setTopTransition(false);
        setTopIndex(0);
        requestAnimationFrame(() => setTopTransition(true));
      }, 800);
    }
  }, [topIndex]);

  // Reset loop for bottom
  useEffect(() => {
    if (bottomIndex >= leftScrollCards.length) {
      setTimeout(() => {
        setBottomTransition(false);
        setBottomIndex(0);
        requestAnimationFrame(() => setBottomTransition(true));
      }, 800);
    }
  }, [bottomIndex]);

  // Pause on hover handlers
  const handleTopMouseEnter = () => setIsTopPaused(true);
  const handleTopMouseLeave = () => setIsTopPaused(false);

  const handleBottomMouseEnter = () => setIsBottomPaused(true);
  const handleBottomMouseLeave = () => setIsBottomPaused(false);

  // Manual buttons
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
      <Helmet>
        <title>Data Science Course in Chandigarh | Ziion Technology</title>
        <meta name="description" content="Learn Data Science with AI & ML at Ziion Technology, Chandigarh. Master Python, TensorFlow, Scikit-learn & more. 100% placement assistance. Enroll now!" />
        <link rel="canonical" href="https://ziiontechnology.in/data-science" />
      </Helmet>
      <Navbar />
      <section className={styles.webDesigningHeroSection}>
        <div className={styles.overlay}>
          <img src={images.numpy} alt="html" className={styles.html} />
          <img src={images.sklearn} alt="sklearn" className={styles.css} />
          <img src={images.python} alt="pyhton" className={styles.js} />
          <img
            src={images.tensorflow}
            alt="tenserflow"
            className={styles.react}
          />
          <img
            src={images.jupyter}
            alt="jupyter"
            className={styles.bootstrap}
          />
        </div>
        {/* <div className={styles.webDesigning}>
          <img
            src={images.knowledgeHeroImage}
            alt="background"
            className={styles.webDesigningBgImage}
          />
        </div> */}

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              AI-Driven Data Science Course in Chandigarh
              <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Learn to transform raw data into powerful predictions and
            intelligent solutions, building the core skills essential for
            Artificial Intelligence and Machine Learning, with our top-rated
            Data Science course in Chandigarh.
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

      {/* stat section */}
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

      {/* tools section */}
      <section className={styles.toolsMain}>
        <h1>Tools</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Python</h3>
              <p className={styles.toolDescription}>
                Python is a versatile programming language known for its
                simplicity and wide use in web development, data analysis,
                automation, and machine learning.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.python}
                alt="Python"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.jupyter}
                alt="Jupyter"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Jupyter Notebook</h3>
              <p className={styles.toolDescription}>
                Jupyter Notebook is an open-source tool that allows interactive
                coding, visualization, and documentation, widely used in data
                science and education.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>SQL</h3>
              <p className={styles.toolDescription}>
                SQL (Structured Query Language) is used to communicate with and
                manage relational databases, enabling efficient data retrieval
                and manipulation.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.sql}
                alt="SQL"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.tableau}
                alt="Tableau"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Tableau</h3>
              <p className={styles.toolDescription}>
                Tableau is a powerful data visualization tool that helps create
                interactive and shareable dashboards for business intelligence
                and analytics.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Power BI</h3>
              <p className={styles.toolDescription}>
                Power BI is a business analytics service by Microsoft that
                provides tools for aggregating, analyzing, and visualizing data
                to support decision-making.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.powerbi}
                alt="Power BI"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.numpy}
                alt="NumPy"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>NumPy</h3>
              <p className={styles.toolDescription}>
                NumPy is a fundamental Python library for numerical computing,
                providing support for large multi-dimensional arrays and
                matrices, along with mathematical functions.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Scikit-learn</h3>
              <p className={styles.toolDescription}>
                Scikit-learn is a Python machine learning library that features
                classification, regression, clustering algorithms, and tools for
                model evaluation and selection.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.scikitlearn}
                alt="Scikit-learn"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.seaborn}
                alt="Seaborn"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Seaborn</h3>
              <p className={styles.toolDescription}>
                Seaborn is a Python data visualization library based on
                Matplotlib, offering a high-level interface for drawing
                attractive and informative statistical graphics.
              </p>
            </div>
          </div>
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* --- What Will You Learn (Interactive Tabs) --- */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>
          Who is this Data Science Course For?
        </h1>
        <p className={styles.subheading}>
          This course is built for anyone ready to master data. Whether you're a
          student, a developer, or an analyst, our program provides the tools to
          become a professional Data Scientist.
        </p>

        <div className={styles.roadmapBox}>
          {/* --- LEFT SECTION: Tab Navigation --- */}
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
                  <strong>Aspiring Data Scientists</strong>
                  <span className={styles.tabSubtext}>
                    Start your data journey
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
                  <strong>Developers & Engineers</strong>
                  <span className={styles.tabSubtext}>
                    Transition into data roles
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
                  <strong>Analysts & Statisticians</strong>
                  <span className={styles.tabSubtext}>
                    Upgrade your ML skills
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
                  <strong>Any Professional</strong>
                  <span className={styles.tabSubtext}>
                    Make data-driven decisions
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* --- RIGHT SECTION: Tab Content --- */}
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

      {/* placemnet */}
      <div>
        <h1 className={styles.storyHeading}>Our Success Story</h1>

        {/* 🔹 Bottom: videos, right → left */}
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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

        {/* 🔹 Top: images, left → right */}

        <div className={styles.carouselWrapper}>
          <div
            className={styles.carousel}
            style={{
              // Start far left, move towards 0
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

      {/* --- NEW SYLLABUS SECTION --- */}
      <section className={styles.syllabusSection}>
        <h1 className={styles.syllabusTitle}>Data Science Course Syllabus</h1>
        <p className={styles.syllabusSubtitle}>
          Our curriculum is designed by industry experts to build your skills
          from the ground up, covering everything from Python programming and
          statistical analysis to advanced machine learning and deep learning
          models.
        </p>

        <div className={styles.syllabusGrid}>
          {/* --- Left Column --- */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Foundation & Core Skills</h2>
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

          {/* --- Right Column --- */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Machine Learning & Advanced</h2>
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
      {/* --- END NEW SYLLABUS SECTION --- */}

      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          {/* Heading */}
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              Data Science Projects Showcasing Innovation
            </h2>
          </div>

          {/* Grid */}
          <div className={styles.projectSectionGrid}>
            {/* Project 1 */}
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🤖</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Recommendation Engine
                </h3>
                <p className={styles.projectSectionDesc}>
                  Designed a movie and product recommendation system using
                  collaborative filtering and deep learning techniques.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📈</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Stock Price Prediction
                </h3>
                <p className={styles.projectSectionDesc}>
                  Built predictive models with time series analysis and LSTMs to
                  forecast stock prices and market volatility.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`${styles.projectSectionCard} ${styles.project3}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🧬</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Genomic Data Analysis
                </h3>
                <p className={styles.projectSectionDesc}>
                  Applied machine learning to DNA sequence data for disease risk
                  prediction and biomarker discovery.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>💬</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Sentiment Analysis
                </h3>
                <p className={styles.projectSectionDesc}>
                  Developed NLP models to analyze tweets and reviews, providing
                  insights into public opinion and brand perception.
                </p>
              </div>
            </div>

            {/* Project 5 */}
            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🏥</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Predictive Healthcare
                </h3>
                <p className={styles.projectSectionDesc}>
                  Used patient records to predict disease progression and
                  recommend personalized treatment pathways.
                </p>
              </div>
            </div>

            {/* Project 6 */}
            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🚗</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Autonomous Vehicle Vision
                </h3>
                <p className={styles.projectSectionDesc}>
                  Implemented computer vision models to detect lanes,
                  pedestrians, and traffic signs for self-driving car systems.
                </p>
              </div>
            </div>

            {/* Project 7 */}
            <div className={`${styles.projectSectionCard} ${styles.project7}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🛡️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Fraud Detection</h3>
                <p className={styles.projectSectionDesc}>
                  Built classification models to detect fraudulent transactions,
                  reducing financial risks and false positives.
                </p>
              </div>
            </div>

            {/* Project 8 */}
            <div className={`${styles.projectSectionCard} ${styles.project8}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🌍</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Climate Data Modeling
                </h3>
                <p className={styles.projectSectionDesc}>
                  Analyzed satellite and weather datasets to predict climate
                  patterns and support sustainability research.
                </p>
              </div>
            </div>

            {/* Project 9 */}
            <div className={`${styles.projectSectionCard} ${styles.project9}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📦</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Supply Chain Optimization
                </h3>
                <p className={styles.projectSectionDesc}>
                  Used machine learning and data modeling to optimize logistics,
                  reduce costs, and improve delivery times.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* achievers */}

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
          {/* Aayush - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "nisha" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("nisha")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.aayushDs}
              className={styles.appFeatureImage}
              alt="Aayush"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "nisha" && (
                <p className={styles.appFeatureText}>
                  “Data is powerful — those who master it, master the future.”
                </p>
              )}
            </div>
          </div>

          {/* Abhishek - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "parmeet" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("parmeet")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.abhishekDs}
              className={styles.appFeatureImage}
              alt="Abhishek"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "parmeet" && (
                <p className={styles.appFeatureText}>
                  “Consistency in learning turns raw data into career-changing
                  insights.”
                </p>
              )}
            </div>
          </div>

          {/* Aryan - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "raghav" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("raghav")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.aryanDs}
              className={styles.appFeatureImage}
              alt="Aryan"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "raghav" && (
                <p className={styles.appFeatureText}>
                  “Every dataset is a new opportunity — embrace the challenge.”
                </p>
              )}
            </div>
          </div>

          {/* Harmanpreet - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "rupalpreet" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("rupalpreet")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.harmanPreetDs}
              className={styles.appFeatureImage}
              alt="Harmanpreet"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "rupalpreet" && (
                <p className={styles.appFeatureText}>
                  “Failures are just experiments — keep iterating, keep
                  improving.”
                </p>
              )}
            </div>
          </div>

          {/* Manan Manglesh - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "shubham" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("shubham")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.mananMangleshDs}
              className={styles.appFeatureImage}
              alt="Manan Manglesh"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "shubham" && (
                <p className={styles.appFeatureText}>
                  “In Data Science, persistence trains the mind like algorithms
                  train the model.”
                </p>
              )}
            </div>
          </div>

          {/* Mohit Kumar - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "app" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("app")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.mohitKumarDataScience}
              className={styles.appFeatureImage}
              alt="Mohit Kumar"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "app" && (
                <p className={styles.appFeatureText}>
                  “Innovate with data, create with code, and build your
                  tomorrow.”
                </p>
              )}
            </div>
          </div>

          {/* Raman Deep - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "marketing" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("marketing")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.ramanDeepDs}
              className={styles.appFeatureImage}
              alt="Raman Deep"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "marketing" && (
                <p className={styles.appFeatureText}>
                  “Passion for data and persistence in learning define a true
                  achiever.”
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* career oportunities */}
      <div className={styles.carerrOpportunities}>
        <h2 className={styles.opportunitiesheading}>
          💼 Career <span> Opportunities</span> After This Course.
        </h2>
        <div className={styles.careerOpportunitiesGrid}>
          {careerOpportunities.map((service, index) => {
            // Define icons for each career opportunity
            const icons = [
              "📊", // Data Analyst
              "🔬", // Data Scientist
              "🤖", // Machine Learning Engineer
              "📈", // Business Intelligence Analyst
              "🔧", // Data Engineer
              "🧠", // AI Researcher
            ];
            const icon = icons[index] || "💼"; // Default icon if none specified

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

      {/* why choose us section  */}

      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For Data Science Course In
            Mohali?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>Data Science Training</strong> and guarantees 100% job
            assistance in the industry.
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
            <img src={dataascience} alt="Graduate Illustration" />
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

      {/* faq section */}

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

      {/* certificate */}
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
              Sector Role.
            </p>
            <p className={styles.description}>
              We Provide Fully Career-Focused Courses for Professionals,
              Entrepreneurs, High School Graduates, University Students, Small
              Business Owners, Marketing Experts & Career Changers at Reasonable
              Costs. We Empower Driven Individuals Like You to Shape Their Read
              20 articles Future by Teaching Skills That Every Sector Seeks.
            </p>
            <p className={styles.showcase}>
              <strong>Showcase Your Success</strong>
              <br />
              Post it on LinkedIn, Twitter, and Facebook to enhance your
              profile. Highlight your accomplishment and share the news with
              peers and coworkers.
            </p>
          </div>
        </div>

        <div className={styles.certificateGallery}>
          <img src={images.abhishekDs} alt="Certificate Sample1" />
          <img src={images.aryanDs} alt="Certificate Sample2" />
          <img src={images.harmanPreetDs} alt="Certificate Sample3" />
          <img src={images.mananMangleshDs} alt="Certificate Sample4" />
        </div>
      </section>

      <SecondForm />

      <Footer />
    </div>
  );
};
export default DataScience;
