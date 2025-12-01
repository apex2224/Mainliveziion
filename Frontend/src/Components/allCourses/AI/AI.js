import React, { useState, useEffect, useRef } from "react";
import styles from "./AI.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import AI from "../../../assets/NewCoursesImages/AI.png";
// CORRECTED: Standardized variable names to lowercase and clear camelCase
import tenplustwoImage from "../../../assets/NewCoursesImages/10+2.png";
import jobImage from "../../../assets/NewCoursesImages/Job.png";
import freelancerImage from "../../../assets/NewCoursesImages/freelancer.png";
import workingProfessionalImage from "../../../assets/NewCoursesImages/workingproffessional.png";

import {
  heroPhrases,
  statsData,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./AIdata";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Form from "../../form/Form";
import ReviewsSection from "../../reviews/ReviewsSection";
import StudentCarousel from "../../placement/StudentCarousel";
import SecondForm from "../../secondForm/SecondForm";

// --- Audience Image Mapping ---
// Note: These fallback logic lines mostly use placeholder images.
// The primary image source for the tabs is the new imported files below.
const developer = images.developer || images.knowledgeHeroImage; // Fallback
const analyst = images.analyst || jobImage; // Fallback
const datascientist = images.datascientist || images.knowledgeHeroImage; // Fallback

// CORRECTED: Use the standardized imported variables directly
const imageTenplustwo = tenplustwoImage;
const imageJob = jobImage;
const imageFreelancer = freelancerImage;
const imageWorkingProfessional = workingProfessionalImage;

const rightScrollCards = [
  { image: images.devagyaPy },
  { image: images.gurshanPy },
  { image: images.simratMl },
  { image: images.arshdeepMl },
  { image: images.arshdeepSinghMl },
  { image: images.harnoorMl },
  { image: images.harmanPreetDs },
  { image: images.aayushDs },
  { image: images.mananMangleshDs },
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

// --- Helper to prepare syllabus data ---
const getSyllabusColumns = () => {
  const allTopics = Object.keys(syllabusData);
  const midpoint = Math.ceil(allTopics.length / 2);
  const leftTopics = allTopics.slice(0, midpoint);
  const rightTopics = allTopics.slice(midpoint);
  return { leftTopics, rightTopics };
};

const Ai = () => {
  const [showForm, setShowForm] = useState(false);
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

  const audienceData = {
    students: {
      title: "Aspiring AI Engineers",
      description:
        "Students eager to build the future with intelligent systems and automation.",
      // Fixed: Used the correct imported image variable
      image: tenplustwoImage,
    },
    developers: {
      title: "Software Developers",
      description:
        "Coders looking to transition into Machine Learning and Deep Learning roles.",
      // Fixed: Used the correct imported image variable
      image: jobImage,
    },
    analysts: {
      title: "Data Analysts",
      description:
        "Professionals wanting to upgrade from analysis to predictive modeling.",
      // Fixed: Used the correct imported image variable
      image: freelancerImage,
    },
    professionals: {
      title: "Business Leaders",
      description:
        "Managers seeking to implement AI solutions to optimize business workflows.",
      // Fixed: Used the correct imported image variable
      image: workingProfessionalImage,
    },
  };

  const activeContent = audienceData[activeAudience];

  // --- NEW Syllabus Accordion State ---
  const [openSyllabusTopic, setOpenSyllabusTopic] = useState(null);

  const toggleSyllabus = (topic) => {
    setOpenSyllabusTopic(openSyllabusTopic === topic ? null : topic);
  };

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
      <Navbar />
      <section className={styles.webDesigningHeroSection}>
        <div className={styles.overlay}>
          <img
            src={images.scikitlearn}
            alt="scikitlearn"
            className={styles.html}
          />
          <img
            src={images.tenserflow}
            alt="tenserflow"
            className={styles.css}
          />
          <img src={images.nlp} alt="nlp" className={styles.js} />
          <img src={images.keras} alt="keras" className={styles.react} />
          <img src={images.github} alt="github" className={styles.bootstrap} />
        </div>
        <div className={styles.webDesigning}>
          <img
            src={images.knowledgeHeroImage}
            alt="background"
            className={styles.webDesigningBgImage}
          />
        </div>

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              Artificial Intelligence Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our Artificial Intelligence Course provides in-depth training in
            Machine Learning, Deep Learning, Neural Networks, Natural Language
            Processing, and AI model deployment. Gain practical experience with
            real-world projects.
          </h2>

          {/* FIXED: Corrected button and Form rendering JSX block */}
          <button className={styles.herob} onClick={() => setShowForm(true)}>
            Talk to us
          </button>
          {showForm && <Form closeForm={() => setShowForm(false)} />}
        </div>
      </section>

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

      {/* tools */}
      <section className={styles.toolsMain}>
        <h1>Tools</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>OpenAI</h3>
              <p className={styles.toolDescription}>
                OpenAI develops advanced AI models like ChatGPT and Codex that
                assist in natural language understanding, code generation, and
                AI-driven tasks.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.openai}
                alt="OpenAI"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.github}
                alt="GitHub"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>GitHub</h3>
              <p className={styles.toolDescription}>
                GitHub is a platform for version control and collaboration,
                enabling developers to host, review, and manage code using Git.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>PyTorch</h3>
              <p className={styles.toolDescription}>
                PyTorch is an open-source machine learning library developed by
                Meta, widely used for deep learning applications like computer
                vision and NLP.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.pytorch}
                alt="PyTorch"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.scikitlearn}
                alt="Scikit-learn"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Scikit-learn</h3>
              <p className={styles.toolDescription}>
                Scikit-learn is a Python library used for machine learning,
                offering tools for classification, regression, clustering, and
                dimensionality reduction.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>TensorFlow</h3>
              <p className={styles.toolDescription}>
                TensorFlow is an end-to-end open-source platform by Google for
                machine learning and deep learning across various tasks and
                platforms.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.tensorflow}
                alt="TensorFlow"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.keras}
                alt="Keras"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Keras</h3>
              <p className={styles.toolDescription}>
                Keras is a high-level neural networks API written in Python,
                running on top of TensorFlow, and designed for fast
                experimentation and prototyping.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>NLP</h3>
              <p className={styles.toolDescription}>
                Natural Language Processing (NLP) enables computers to
                understand, interpret, and generate human language, powering
                applications like chatbots and translators.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.nlp}
                alt="Natural Language Processing"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.runway}
                alt="Runway ML"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Runway ML</h3>
              <p className={styles.toolDescription}>
                Runway ML is a platform that brings machine learning models to
                creators, allowing them to use AI for design, art, and video
                editing with ease.
              </p>
            </div>
          </div>
        </div>
        {/* FIXED: Corrected button placement and props */}
        <button className={styles.herob} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* --- Who Will Learn (Interactive Tabs) --- */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>
          Who Can Join Our Artificial Intelligence Course?
        </h1>
        <p className={styles.subheading}>
          Explore our <strong>Artificial Intelligence training course</strong>{" "}
          curriculum to know what you are going to learn exactly. Ziion
          Technology is one of India’s leading industrial training institutes,
          offering comprehensive training to our <strong>trainees</strong>.
        </p>

        <div className={styles.roadmapBox}>
          {/* Left Side: Tabs */}
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
                  <strong>Students (10th/12th Pass)</strong>
                  <span className={styles.tabSubtext}>
                    Turn curiosity into a career
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
                  <strong>Graduates / Developers</strong>
                  <span className={styles.tabSubtext}>
                    Bridge gap between education and employment
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
                  <strong>Freelancers & Entrepreneurs</strong>
                  <span className={styles.tabSubtext}>
                    Transform ideas into income
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
                  <strong>Working Professionals</strong>
                  <span className={styles.tabSubtext}>
                    Future-proof your career
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className={styles.rightSection}>
            <div className={styles.audienceContentPane} key={activeAudience}>
              <img
                // FIXED: Corrected image source to use the activeContent.image property
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
        {/* FIXED: Corrected className syntax here */}
        <div className={styles.carouselButtons}>
          <button onClick={handleTopPrev} className={styles.carouselBtn}>
            ◀️
          </button>
          <button onClick={handleTopNext} className={styles.carouselBtn}>
            ▶️
          </button>
        </div>

        <StudentCarousel />

        {/* --- Syllabus Section (Accordion) --- */}
        <section className={styles.syllabusSection}>
          <h1 className={styles.syllabusTitle}>AI Course Syllabus</h1>
          <p className={styles.syllabusSubtitle}>
            Our curriculum is designed by industry experts to build your skills
            from the ground up, covering everything from Python programming and
            statistical analysis to advanced machine learning and deep learning
            models.
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
              <h2 className={styles.columnTitle}>Advanced AI & Deployment</h2>
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

        {/* projects */}

        <div className={styles.projectBackModal}>
          <section className={styles.projectSection}>
            {/* Heading */}
            <div className={styles.projectSectionHeader}>
              <h2 className={styles.projectSectionHeading}>
                AI Solutions For Your Digital Transformation
              </h2>
            </div>

            {/* Grid */}
            <div className={styles.projectSectionGrid}>
              {/* Block 1 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard1}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>🤖</div>
                </div>
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>AI Chatbots</h3>
                  <p className={styles.projectSectionDesc}>
                    Build intelligent virtual assistants that enhance customer
                    engagement and automate support workflows.
                  </p>
                </div>
              </div>

              {/* Block 2 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard2}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>📊</div>
                </div>
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>
                    Predictive Analytics
                  </h3>
                  <p className={styles.projectSectionDesc}>
                    Leverage AI-driven insights to forecast trends, optimize
                    operations, and make data-backed decisions.
                  </p>
                </div>
              </div>

              {/* Block 3 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard3}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>🖼️</div>
                </div>
                {/* FIXED: Removed extra '.' in className */}
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>
                    Computer Vision
                  </h3>
                  <p className={styles.projectSectionDesc}>
                    Develop AI systems that recognize images, detect objects,
                    and transform visual data into actionable insights.
                  </p>
                </div>
              </div>

              {/* Block 4 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard4}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>🔍</div>
                </div>
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>
                    Natural Language Processing
                  </h3>
                  <p className={styles.projectSectionDesc}>
                    Harness AI for text and speech understanding to automate
                    communication, sentiment analysis, and knowledge extraction.
                  </p>
                </div>
              </div>

              {/* Block 5 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard5}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>⚙️</div>
                </div>
                {/* FIXED: Removed extra '.' in className */}
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>AI Automation</h3>
                  <p className={styles.projectSectionDesc}>
                    Streamline complex workflows and repetitive tasks using
                    intelligent AI-driven automation solutions.
                  </p>
                </div>
              </div>

              {/* Block 6 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard6}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>🧠</div>
                </div>
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>Generative AI</h3>
                  <p className={styles.projectSectionDesc}>
                    Create high-quality content, designs, and ideas with
                    advanced AI models tailored for innovation.
                  </p>
                </div>
              </div>

              {/* Block 7 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard7}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>🏥</div>
                </div>
                {/* FIXED: Removed extra '.' in className */}
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>
                    AI in Healthcare
                  </h3>
                  <p className={styles.projectSectionDesc}>
                    Implement AI solutions for smarter diagnostics, patient
                    care, and healthcare workflow optimization.
                  </p>
                </div>
              </div>

              {/* Block 8 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard8}`}
              >
                {/* FIXED: Corrected misplaced closing tag for Block 8 */}
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>💼</div>
                </div>
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>
                    Business Intelligence AI
                  </h3>
                  <p className={styles.projectSectionDesc}>
                    Empower decision-making with AI-driven insights that reveal
                    patterns and actionable business opportunities.
                  </p>
                </div>
              </div>

              {/* Block 9 */}
              <div
                className={`${styles.projectSectionCard} ${styles.projectSectionCard9}`}
              >
                <div className={styles.projectSectionIconWrapper}>
                  <div className={styles.projectSectionIcon}>🛡️</div>
                </div>
                {/* FIXED: Removed extra '.' in className */}
                <div className={styles.projectSectionContent}>
                  <h3 className={styles.projectSectionTitle}>
                    AI Cybersecurity
                  </h3>
                  <p className={styles.projectSectionDesc}>
                    Detect and prevent digital threats proactively using
                    intelligent AI-powered security systems.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* career oportunities */}

        <div className={styles.carerrOpportunities}>
          <h2 className={styles.opportunitiesheading}>
            💼 Career <span> Opportunities</span> After This Course.
          </h2>
          <div className={styles.careerOpportunitiesGrid}>
            {careerOpportunities.map((service, index) => (
              <div
                key={index}
                className={`${styles.careerCard} ${styles.curveTopRight} ${styles.curveBottomLeft}`}
              >
                <div className={styles.careerCardContent}>
                  <div className={styles.careerIcon}></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* FIXED: Corrected button placement and props */}
          <button className={styles.herob} onClick={() => setShowForm(true)}>
            Talk to us
          </button>
        </div>

        {/* why choose us section  */}

        <section className={styles.whychooseusSection}>
          <div className={styles.whychooseusTitleBlock}>
            <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
            <h2 className={styles.whychooseusHeading}>
              Why Choose <span>Ziion Technology</span> For Artificial
              Intelligence Course In Mohali?
            </h2>
            <p className={styles.whychooseusSubtitle}>
              Ziion Technology enables every student to develop exceptional
              skills in <strong>Artificial Intelligence Training</strong> and
              guarantees 100% job assistance in the industry.
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
              {/* FIXED: Using the local import for AI image */}
              <img src={AI} alt="Graduate Illustration" />
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
                Business Owners, Marketing Experts & Career Changers at
                Reasonable Costs. We Empower Driven Individuals Like You to
                Shape Their Future by Teaching Skills That Every Sector Seeks.
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
            <img src={images.arshdeepMl} alt="Certificate Sample1" />
            <img src={images.harnoorMl} alt="Certificate Sample2" />
            <img src={images.harshMl} alt="Certificate Sample3" />
            <img src={images.muskanMl} alt="Certificate Sample4" />
          </div>
        </section>

        {/* faq section */}

        <div className={styles.faqContainer}>
          <div className={styles.faqContent}>
            <div className={styles.faqLeft}>
              <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
              {/* <p className={styles.faqDescription}>
                                                Blandit nunc sapien orci egestas scelerisque mattis. Pulvinar pellentesque cursus ornare neque non mi pellentesque adipiscing mollis.
                                            </p> */}

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
                    {/* Removed redundant conditional rendering for body to fix ref issue */}
                    <div
                      ref={(el) => (faqRefs.current[index] = el)}
                      className={styles.faqFaqBody}
                    >
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SecondForm />
        <Footer />
      </div>
    </div>
  );
};
export default Ai;
