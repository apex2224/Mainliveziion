import React, { useState, useEffect, useRef } from "react";
import styles from "./dataAnalytics.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import {
  heroPhrases,
  statsData,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./dataAnalyticsdata";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Form from "../../form/Form";
import SecondForm from "../../secondForm/SecondForm";
import ReviewsSection from "../../reviews/ReviewsSection";
import StudentCarousel from "../../placement/StudentCarousel";

const rightScrollCards = [
  { image: images.mohit },
  { image: images.simranJeetKaur },
  { image: images.chetna },
  { image: images.kavyaPaurya },
  { image: images.kritish },
  { image: images.anuj },
  { image: images.nikita },
  { image: images.devagyaPy },
  { image: images.gurshanPy },
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

const DataAnalytics = () => {
  const [active, setActive] = useState(null);
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

  // --- NEW: 'Who Can Join' Interactive Tabs State ---
  const [activeAudience, setActiveAudience] = useState("students");

  // Content for the tabs
  const audienceData = {
    students: {
      title: "Aspiring Data Analysts",
      description:
        "Beginners with a knack for numbers looking to start a career in analytics.",
      image: images.analyst, // Ensure you have a relevant image
    },
    professionals: {
      title: "Business Professionals",
      description:
        "Managers and execs wanting to make data-driven decisions using Power BI & Tableau.",
      image: images.workingproffessional,
    },
    developers: {
      title: "Career Switchers",
      description:
        "Professionals from other fields looking to transition into the high-growth data sector.",
      image: images.developer,
    },
    entrepreneurs: {
      title: "Business Owners",
      description:
        "Entrepreneurs wanting to analyze business metrics to optimize growth and revenue.",
      image: images.datascientist,
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
      <section className={styles.webDesigningHeroSection}>
        <div className={styles.overlay}>
          {/* Floating Icons */}
          <img src={images.numpy} alt="html" className={styles.html} />
          <img src={images.sql} alt="css" className={styles.css} />
          <img src={images.python} alt="js" className={styles.js} />
          <img src={images.tableau} alt="react" className={styles.react} />
          <img src={images.powerbi} alt="bootstrap" className={styles.bootstrap} />
        </div>

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              Data Analytics Course in Chandigarh
              <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Transform raw data into actionable insights. Master Excel, SQL, Power
            BI, Tableau, and Python to make data-driven decisions that align with
            industry demands.
          </h2>
          <button
            className={styles.herobutton}
            onClick={() => setShowForm(true)}
          >
            Talk to us
          </button>
          {showForm && <Form closeForm={() => setShowForm(false)} />}
        </div>
      </section>

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
              <h3 className={styles.title}>Excel</h3>
              <p className={styles.description}>
                The foundational tool for data analysis, calculations, and organizing information efficiently.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.excel}
                alt="Excel"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.sql}
                alt="SQL"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>SQL</h3>
              <p className={styles.description}>
                Manage and manipulate relational databases to retrieve critical data through queries.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Power BI</h3>
              <p className={styles.description}>
                Transform raw data into interactive dashboards and reports for insightful business decisions.
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
                src={images.python}
                alt="Python"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Python</h3>
              <p className={styles.description}>
                Automate analysis and handle large datasets with Python's powerful libraries.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Tableau</h3>
              <p className={styles.description}>
                A leading visual analytics platform transforming the way we use data to solve problems.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.tableau}
                alt="Tableau"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.pandas}
                alt="Pandas"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Pandas</h3>
              <p className={styles.description}>
                A Python library for data manipulation and analysis, offering flexible data structures.
              </p>
            </div>
          </div>
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* --- WHO CAN JOIN (Interactive Tabs) --- */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>Who is this Course For?</h1>
        <p className={styles.subheading}>
          Whether you're a student, a professional, or a business owner, our Data
          Analytics course provides the roadmap to data literacy and career growth.
        </p>

        <div className={styles.roadmapBox}>
          {/* LEFT SECTION: Tabs */}
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
                  <strong>Aspiring Analysts</strong>
                  <span className={styles.tabSubtext}>Start your data career</span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "professionals" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("professionals")}
              >
                <span className={styles.tabIcon}>💼</span>
                <div>
                  <strong>Business Professionals</strong>
                  <span className={styles.tabSubtext}>Make better decisions</span>
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
                  <strong>Career Switchers</strong>
                  <span className={styles.tabSubtext}>Transition to analytics</span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "entrepreneurs" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("entrepreneurs")}
              >
                <span className={styles.tabIcon}>🚀</span>
                <div>
                  <strong>Business Owners</strong>
                  <span className={styles.tabSubtext}>Optimize your growth</span>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT SECTION: Content */}
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

        {/* Bottom: Videos */}
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

        {/* Top: Images */}
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
        <h1 className={styles.syllabusTitle}>Data Analytics Course Syllabus</h1>
        <p className={styles.syllabusSubtitle}>
          From Excel basics to advanced SQL querying and Python automation, explore
          the skills that make you industry-ready.
        </p>

        <div className={styles.syllabusGrid}>
          {/* Left Column */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Core Fundamentals</h2>
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
            <h2 className={styles.columnTitle}>Advanced Analytics</h2>
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
              Real-World Data Projects
            </h2>
          </div>

          <div className={styles.projectSectionGrid}>
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📊</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Sales Forecasting</h3>
                <p className={styles.projectSectionDesc}>
                  Analyze historical sales data to forecast future revenue trends with high accuracy.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📈</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Customer Segmentation</h3>
                <p className={styles.projectSectionDesc}>
                  Use clustering to identify customer groups for personalized marketing campaigns.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🌐</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Web Traffic Analysis</h3>
                <p className={styles.projectSectionDesc}>
                  Analyze user behavior from digital platforms to optimize conversion funnels.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>💳</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Fraud Detection</h3>
                <p className={styles.projectSectionDesc}>
                  Build detection algorithms to identify fraudulent financial transactions.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project8}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📦</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Supply Chain Analytics</h3>
                <p className={styles.projectSectionDesc}>
                  Implement data pipelines to reduce delays and enhance supply chain visibility.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🏥</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Healthcare Analytics</h3>
                <p className={styles.projectSectionDesc}>
                  Process patient records to identify at-risk groups and support clinical decisions.
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
          <div
            className={`${styles.appFeatureCard} ${
              active === "mohit" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("mohit")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.mohitKumarDataScience}
              className={styles.appFeatureImage}
              alt="Mohit"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "mohit" && (
                <p className={styles.appFeatureText}>
                  “Turn data into decisions! Every dataset hides a story –
                  unleash it with analytics.”
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "simran" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("simran")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.simranJeetKaur}
              className={styles.appFeatureImage}
              alt="Simran"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "simran" && (
                <p className={styles.appFeatureText}>
                  “Analytics is not just about numbers – it’s about finding
                  patterns that inspire action.”
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "kritish" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("kritish")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.kritishDataScience}
              className={styles.appFeatureImage}
              alt="Kritish"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "kritish" && (
                <p className={styles.appFeatureText}>
                  “From raw data to powerful insights – analytics is the
                  bridge to innovation.”
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "kavya" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("kavya")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.kavyaPaurya}
              className={styles.appFeatureImage}
              alt="Kavya"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "kavya" && (
                <p className={styles.appFeatureText}>
                  “Data analytics empowers you to predict, plan, and progress
                  with confidence.”
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
             // Generate an icon based on index or title if possible
             // Just placeholders here to match style
             const icons = ["📊", "📈", "🏭", "💳", "🌐", "🏥"];
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
            Why Choose <span>Ziion Technology</span> For Data Analytics?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>Data Analytics</strong> and guarantees job assistance.
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

      {/* --- CERTIFICATE --- */}
      <section className={styles.certificateSection}>
        <div className={styles.mainContainer}>
          <div className={styles.certificateImage}>
            <img src={images.certificatehero} alt="Ziion Certificate" />
          </div>
          <div className={styles.certificateContent}>
            <h2>WHAT BENEFITS AWAIT YOU AT ZIION TECHNOLOGY?</h2>
            <p className={styles.highlight}>
              Highly Acclaimed Program Over the Years, We've Educated Over
              35,000+ Learners & Supported Them in Landing Their Initial IT Role.
            </p>
            <p className={styles.certificteDescription}>
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
          <img src={images.mohitKumarDataScience} alt="Certificate 1" />
          <img src={images.simranJeetKaur} alt="Certificate 2" />
          <img src={images.kritishDataScience} alt="Certificate 3" />
          <img src={images.chetnaDataSience} alt="Certificate 4" />
        </div>
      </section>

      <SecondForm />
      <Footer />
    </div>
  );
};

export default DataAnalytics;