import React, { useState, useEffect, useRef } from "react";
import styles from "./Php.module.css";
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
} from "./PhpData";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Form from "../../form/Form";
import {
  SiPhp,
  SiLaravel,
  SiComposer,
  SiMysql,
  SiApache,
  SiXampp,
  SiWordpress,
  SiCodeigniter,
} from "react-icons/si";
import ReviewsSection from "../../reviews/ReviewsSection";
import StudentCarousel from "../../placement/StudentCarousel";
import SecondForm from "../../secondForm/SecondForm";

const rightScrollCards = [
  { image: images.simratMl },
  { image: images.arshdeepMl },
  { image: images.harnoorMl },
  { image: images.arshdeepSinghMl },
  { image: images.devagyaPy },
  { image: images.gurshanPy },
  { image: images.simratMl },
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

const Php = () => {
  const [showForm, setShowForm] = useState(false);
  const typedOutput = useCustomTypewriter(heroPhrases);
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

  // Content for the tabs (Customized for PHP)
  const audienceData = {
    students: {
      title: "Aspiring Web Developers",
      description:
        "Beginners looking to master server-side scripting and build dynamic websites.",
      image: images.developer, // Use relevant image
    },
    graduates: {
      title: "CS/IT Graduates",
      description:
        "Graduates wanting to specialize in Backend Development with PHP & Laravel.",
      image: images.datascientist,
    },
    freelancers: {
      title: "Freelancers",
      description:
        "Individuals wanting to build and sell custom websites or manage WordPress clients.",
      image: images.workingproffessional,
    },
    entrepreneurs: {
      title: "Entrepreneurs",
      description:
        "Business owners who want to control their own e-commerce platforms and CMS.",
      image: images.analyst,
    },
  };

  const activeContent = audienceData[activeAudience];

  // --- NEW: Syllabus Accordion Logic ---
  const getSyllabusColumns = () => {
    const allTopics = Object.keys(syllabusData);
    // Splitting broadly for 2 columns
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
    setTopIndex((prev) => (prev === 0 ? rightScrollCards.length - 1 : prev - 1));
  };
  const handleTopNext = () => {
    setTopIndex((prev) => (prev === rightScrollCards.length - 1 ? 0 : prev + 1));
  };
  const handleBottomPrev = () => {
    setBottomIndex((prev) => (prev === 0 ? leftScrollCards.length - 1 : prev - 1));
  };
  const handleBottomNext = () => {
    setBottomIndex((prev) => (prev === leftScrollCards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className={styles.webDesigningHeroSection}>
        <div className={styles.overlay}>
          {/* Floating Icons using React Icons but positioned via CSS classes */}
          <SiPhp className={styles.html} color="#777BB4" />
          <SiLaravel className={styles.css} color="#FF2D20" />
          <SiComposer className={styles.js} color="#885630" />
          <SiMysql className={styles.react} color="#4479A1" />
          <SiApache className={styles.bootstrap} color="#D22128" />
        </div>

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              PHP Course in Chandigarh
              <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Master backend development with our advanced PHP training. Learn to
            build dynamic, secure, and scalable web applications using PHP, MySQL,
            and the Laravel framework.
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
              <h3 className={styles.title}>PHP</h3>
              <p className={styles.description}>
                The core scripting language for creating dynamic and interactive
                web pages.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiPhp size={60} color="#777BB4" className={styles.toolIcon} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiLaravel size={60} color="#FF2D20" className={styles.toolIcon} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Laravel</h3>
              <p className={styles.description}>
                A robust PHP framework for building modern, secure, and scalable
                web applications.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Composer</h3>
              <p className={styles.description}>
                A dependency manager for PHP to manage libraries and packages
                efficiently.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiComposer size={60} color="#885630" className={styles.toolIcon} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiMysql size={60} color="#4479A1" className={styles.toolIcon} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>MySQL</h3>
              <p className={styles.description}>
                A powerful relational database management system for storing application data.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>XAMPP</h3>
              <p className={styles.description}>
                A local server environment for testing and developing PHP applications.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiXampp size={60} color="#FB7A24" className={styles.toolIcon} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiWordpress size={60} color="#21759B" className={styles.toolIcon} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>WordPress</h3>
              <p className={styles.description}>
                The world's most popular CMS, built on PHP, allowing for rapid site creation.
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
        <h1 className={styles.whatHeading}>Who is this PHP Course For?</h1>
        <p className={styles.subheading}>
          Whether you're a complete beginner or a professional looking to upskill
          in backend technologies, our PHP training provides the roadmap to success.
        </p>

        <div className={styles.roadmapBox}>
          {/* LEFT: Navigation */}
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
                  <strong>Students</strong>
                  <span className={styles.tabSubtext}>Start your web career</span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "graduates" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("graduates")}
              >
                <span className={styles.tabIcon}>👨‍🎓</span>
                <div>
                  <strong>Graduates</strong>
                  <span className={styles.tabSubtext}>Specialize in Backend</span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "freelancers" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("freelancers")}
              >
                <span className={styles.tabIcon}>💻</span>
                <div>
                  <strong>Freelancers</strong>
                  <span className={styles.tabSubtext}>Build custom sites</span>
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
                  <strong>Entrepreneurs</strong>
                  <span className={styles.tabSubtext}>Manage your tech</span>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT: Content */}
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
        <h1 className={styles.syllabusTitle}>PHP Course Syllabus In Mohali</h1>
        <p className={styles.syllabusSubtitle}>
          From core PHP syntax to advanced Laravel features and database
          management, our syllabus covers everything you need to become a backend
          expert.
        </p>

        <div className={styles.syllabusGrid}>
          {/* Left Column */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Core PHP & Database</h2>
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
            <h2 className={styles.columnTitle}>Advanced Frameworks</h2>
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
              Real-World PHP Projects
            </h2>
          </div>

          <div className={styles.projectSectionGrid}>
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🛒</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>E-commerce Platform</h3>
                <p className={styles.projectSectionDesc}>
                  Build a full-featured online store with product listings, cart
                  functionality, and payment gateways.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📝</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Content Management System</h3>
                <p className={styles.projectSectionDesc}>
                  Create a custom CMS like WordPress to manage posts, pages, and
                  users dynamically.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project3}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>⚡</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>RESTful API</h3>
                <p className={styles.projectSectionDesc}>
                  Develop secure APIs for mobile apps and third-party integrations
                  using Laravel.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>👥</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>CRM System</h3>
                <p className={styles.projectSectionDesc}>
                  Build a Customer Relationship Management tool to track leads,
                  sales, and client interactions.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>💬</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Chat Application</h3>
                <p className={styles.projectSectionDesc}>
                  Create a real-time chat application using PHP websockets and
                  database storage.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📅</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>Booking System</h3>
                <p className={styles.projectSectionDesc}>
                  Develop an appointment booking system for hotels or clinics with
                  calendar integration.
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
              active === "one" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("one")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.arshdeepMl}
              className={styles.appFeatureImage}
              alt="Student"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "one" && (
                <p className={styles.appFeatureText}>
                  "Learning Laravel transformed my career. I can now build complex
                  web apps with ease."
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
              src={images.simratMl}
              className={styles.appFeatureImage}
              alt="Student"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "two" && (
                <p className={styles.appFeatureText}>
                  "The hands-on projects gave me the confidence to handle backend
                  challenges in my job."
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
              src={images.harnoorMl}
              className={styles.appFeatureImage}
              alt="Student"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "three" && (
                <p className={styles.appFeatureText}>
                  "From PHP basics to API development, the curriculum was
                  perfectly structured."
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For PHP Training?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>PHP Development</strong> and guarantees 100% job
            assistance.
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
          <img src={images.simratMl} alt="Certificate 1" />
          <img src={images.harnoorMl} alt="Certificate 2" />
          <img src={images.arshdeepMl} alt="Certificate 3" />
          <img src={images.devagyaPy} alt="Certificate 4" />
        </div>
      </section>

      <SecondForm />
      <Footer />

      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            zIndex: 99999,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Form closeForm={() => setShowForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Php;