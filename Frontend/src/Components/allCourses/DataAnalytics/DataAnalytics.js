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
import Certification from "../../Certification/Certification";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Form from "../../form/Form";
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
        setTimeout(() => setIsDeleting(true), 1200); // pause before deleting
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
  // certificate section //
  const [active, setActive] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const typedOutput = useCustomTypewriter(heroPhrases);

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

  const [selected, setSelected] = useState(Object.keys(syllabusData)[0] || "");

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
          <img src={images.numpy} alt="html" className={styles.html} />
          <img src={images.sql} alt="sklearn" className={styles.css} />
          <img src={images.python} alt="pyhton" className={styles.js} />
          <img src={images.tableau} alt="tenserflow" className={styles.react} />
          <img
            src={images.powerbi}
            alt="jupyter"
            className={styles.bootstrap}
          />
        </div>
        {/* <div className={styles.webDesigning}>
          <img src={images.knowledgeHeroImage} alt="background" className={styles.webDesigningBgImage} />
        </div> */}

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              Data Analytics Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our Data Analytics Course provides in-depth, hands-on training in
            tools and technologies like Excel, SQL, Power BI, Tableau, and
            Python. Learn how to analyze data effectively, generate insights,
            and make data-driven decisions that align with industry demands.
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
              <h3 className={styles.title}>Excel</h3>
              <p className={styles.description}>
                Microsoft Excel is a powerful spreadsheet tool used for data
                analysis, calculations, visualization, and organizing
                information efficiently.
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
                SQL (Structured Query Language) is used for managing and
                manipulating relational databases through queries, updates, and
                data retrieval.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Power BI</h3>
              <p className={styles.description}>
                Power BI is a business analytics tool by Microsoft that
                transforms raw data into interactive dashboards and reports for
                insightful decisions.
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
                Python is a versatile programming language widely used for web
                development, data analysis, automation, and artificial
                intelligence applications.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Google Sheets</h3>
              <p className={styles.description}>
                Google Sheets is a cloud-based spreadsheet tool that supports
                real-time collaboration, data analysis, and integrations with
                other Google apps.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.googleSheet}
                alt="Google Sheets"
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
              <p className={styles.description}>
                NumPy is a fundamental Python library for numerical computing,
                providing support for arrays, mathematical functions, and linear
                algebra.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Pandas</h3>
              <p className={styles.description}>
                Pandas is a Python library used for data manipulation and
                analysis, offering data structures like DataFrames to handle
                structured data efficiently.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.pandas}
                alt="Pandas"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.nlp}
                alt="NLP"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>
                Natural Language <br />
                Processing
              </h3>
              <p className={styles.description}>
                NLP is a field of AI focused on enabling computers to
                understand, interpret, and generate human language.
              </p>
            </div>
          </div>
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* what will you learn */}
      <div className={styles.learncontainer}>
        <h1 className={styles.whatHeading}>
          Who Can Join Our Data Analytics Course?
        </h1>
        <p className={styles.subheading}>
          Explore our <strong>Data Analytics training course</strong> curriculum
          to understand exactly what skills you'll acquire. Certiwise is one of
          India’s leading industrial training institutes, offering
          industry-relevant training for aspiring <strong>data analysts</strong>
          .
        </p>

        <div className={styles.roadmapBox}>
          <div className={styles.leftSection}>
            <div className={styles.whoCanJoinSection}>
              <h2 className={styles.sectionTitle}>
                Who Can Join & What You'll Gain
              </h2>
              <ul className={styles.pointsList}>
                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Students (10th/12th Pass)</strong>
                    <br />
                    Start your data journey early! Gain practical skills in
                    Excel, visualization, and analytics that can lead to
                    internships and junior analyst roles.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Graduates / Job Seekers</strong>
                    <br />
                    Become job-ready by learning industry-standard tools like
                    Excel, SQL, Power BI, and Python. Get prepared for roles
                    like data analyst, business analyst, and more.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Freelancers & Entrepreneurs</strong>
                    <br />
                    Make data work for your business. Learn how to collect,
                    analyze, and visualize data to make smarter decisions and
                    offer analytics services to clients.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Working Professionals (Upskilling)</strong>
                    <br />
                    Boost your career with data-driven decision-making skills.
                    Learn how to use analytics to support strategic initiatives
                    and gain promotions or new roles.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.rightSection}>
            <img
              src={images.willGet}
              alt="Data Analytics Training Roadmap"
              className={styles.whatlearnimg}
            />
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

      {/* sylabus */}
      <div className={styles.syllabusContainer}>
        <h1>What Will Our Trainees Learn In Data Analytics Training</h1>
        <p>
          Explore our <strong>Data Analytics training course</strong> curriculum
          to know exactly what skills you will gain. Ziion Technology is one of
          India’s leading industrial training institutes, offering comprehensive
          training to our <strong>trainees</strong> in analytics, visualization,
          and data-driven decision making.
        </p>

        <div className={styles.syllabusWrapper}>
          {/* Left side - topic list */}
          <div className={styles.topicList}>
            <ul className={styles.syllabusList}>
              {Object.keys(syllabusData).map((topic) => (
                <li
                  key={topic}
                  className={`${styles.topicItem} ${
                    selected === topic ? styles.active : ""
                  }`}
                  onClick={() => setSelected(topic)}
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - topic details */}
          <div className={styles.topicDetails}>
            <h3>{selected}:</h3>
            <ul className={styles.syllabusList}>
              {syllabusData[selected]?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* projects */}
      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          {/* Heading */}
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              Data Analytics Projects Driving Business Value
            </h2>
          </div>

          {/* Grid */}
          <div className={styles.projectSectionGrid}>
            {/* Project 1 */}
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📊</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Sales Forecasting Model
                </h3>
                <p className={styles.projectSectionDesc}>
                  Developed a predictive model to analyze historical sales data
                  and forecast future revenue trends with high accuracy.
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
                  Customer Segmentation
                </h3>
                <p className={styles.projectSectionDesc}>
                  Applied clustering algorithms to identify customer groups,
                  enabling personalized marketing campaigns and improved
                  retention rates.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`${styles.projectSectionCard} ${styles.project3}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🏭</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Manufacturing Process Optimization
                </h3>
                <p className={styles.projectSectionDesc}>
                  Leveraged real-time sensor data and machine learning to
                  minimize downtime and optimize production efficiency.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>💳</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Fraud Detection System
                </h3>
                <p className={styles.projectSectionDesc}>
                  Built anomaly detection algorithms to identify fraudulent
                  transactions in financial datasets with reduced false
                  positives.
                </p>
              </div>
            </div>

            {/* Project 5 */}
            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🌐</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Web Traffic Analysis
                </h3>
                <p className={styles.projectSectionDesc}>
                  Analyzed user behavior data from digital platforms to optimize
                  conversion funnels and improve engagement metrics.
                </p>
              </div>
            </div>

            {/* Project 6 */}
            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🏥</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Healthcare Data Analytics
                </h3>
                <p className={styles.projectSectionDesc}>
                  Processed patient records to identify at-risk groups and
                  support data-driven clinical decision-making.
                </p>
              </div>
            </div>

            {/* Project 7 */}
            <div className={`${styles.projectSectionCard} ${styles.project7}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>⚡</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Energy Consumption Forecasting
                </h3>
                <p className={styles.projectSectionDesc}>
                  Built forecasting models to predict electricity demand,
                  helping optimize grid operations and resource allocation.
                </p>
              </div>
            </div>

            {/* Project 8 */}
            <div className={`${styles.projectSectionCard} ${styles.project8}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📦</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Supply Chain Analytics
                </h3>
                <p className={styles.projectSectionDesc}>
                  Implemented data pipelines and predictive models to reduce
                  delays, lower costs, and enhance supply chain visibility.
                </p>
              </div>
            </div>

            {/* Project 9 */}
            <div className={`${styles.projectSectionCard} ${styles.project9}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🔐</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Cybersecurity Threat Analytics
                </h3>
                <p className={styles.projectSectionDesc}>
                  Deployed machine learning techniques to detect unusual network
                  activity, reducing response times to potential breaches.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* certificate section */}

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

        <section className={styles.appFeatureSection}>
          <div className={styles.appFeatureContainer}>
            {/* Mohit Kumar */}
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
                alt="Mohit Kumar"
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

            {/* Simran Jeet Kaur */}
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
                alt="Simran Jeet Kaur"
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

            {/* Kritish */}
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

            {/* Kavya Paurya */}
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
                alt="Kavya Paurya"
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

            {/* Chetna */}
            <div
              className={`${styles.appFeatureCard} ${
                active === "chetna" ? styles.active : ""
              }`}
              onMouseEnter={() => setActive("chetna")}
              onMouseLeave={() => setActive(null)}
            >
              <img
                src={images.chetnaDataSience}
                className={styles.appFeatureImage}
                alt="Chetna"
              />
              <div className={styles.appFeatureOverlay}>
                {active === "chetna" && (
                  <p className={styles.appFeatureText}>
                    “Behind every number is a lesson. Analytics helps you see
                    the future in today’s data.”
                  </p>
                )}
              </div>
            </div>

            {/* Anuj */}
            <div
              className={`${styles.appFeatureCard} ${
                active === "anuj" ? styles.active : ""
              }`}
              onMouseEnter={() => setActive("anuj")}
              onMouseLeave={() => setActive(null)}
            >
              <img
                src={images.anujDataScience}
                className={styles.appFeatureImage}
                alt="Anuj"
              />
              <div className={styles.appFeatureOverlay}>
                {active === "anuj" && (
                  <p className={styles.appFeatureText}>
                    “In the world of analytics, curiosity is your superpower –
                    keep questioning, keep learning.”
                  </p>
                )}
              </div>
            </div>

            {/* Niketa */}
            <div
              className={`${styles.appFeatureCard} ${
                active === "niketa" ? styles.active : ""
              }`}
              onMouseEnter={() => setActive("niketa")}
              onMouseLeave={() => setActive(null)}
            >
              <img
                src={images.niketa}
                className={styles.appFeatureImage}
                alt="Niketa"
              />
              <div className={styles.appFeatureOverlay}>
                {active === "niketa" && (
                  <p className={styles.appFeatureText}>
                    “Numbers speak, but only to those who listen – be the
                    storyteller of data.”
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>

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
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </div>

      {/* why choose us section  */}

      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For Data Analytics In
            Mohali?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>Data Analytics Training</strong> and guarantees 100% job
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
            <img src={images.whyChooseImg} alt="Graduate Illustration" />
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
            <p className={styles.certificteDescription}>
              We Provide Fully Career-Focused Courses for Professionals,
              Entrepreneurs, High School Graduates, University Students, Small
              Business Owners, Marketing Experts & Career Changers at Reasonable
              Costs. We Empower Driven Individuals Like You to Shape Their
              Future by Teaching Skills That Every Sector Seeks.
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
          <img src={images.mohitKumarDataScience} alt="Certificate Sample1" />
          <img src={images.simranJeetKaur} alt="Certificate Sample2" />
          <img src={images.kritishDataScience} alt="Certificate Sample3" />
          <img src={images.chetnaDataSience} alt="Certificate Sample4" />
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
      <Footer />
    </div>
  );
};

export default DataAnalytics;
