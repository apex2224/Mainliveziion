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
import Certification from "../../Certification/Certification";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
  // { image: images.simranjeet },
  { image: images.simratMl },
  // { image: images.abhishek },
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
// Takes the large syllabusData object and splits it for the 2-column layout
const getSyllabusColumns = () => {
  const allTopics = Object.keys(syllabusData);
  // Splitting 19 topics into 10 and 9
  const leftTopics = allTopics.slice(0, 10);
  const rightTopics = allTopics.slice(10);
  return { leftTopics, rightTopics };
};

const Php = () => {
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

  // --- NEW Syllabus Accordion State ---
  // We use the topic string (e.g., "Introduction to PHP") as the unique key
  const [openSyllabusTopic, setOpenSyllabusTopic] = useState(null);

  // Toggle function for syllabus accordion
  const toggleSyllabus = (topic) => {
    setOpenSyllabusTopic(openSyllabusTopic === topic ? null : topic);
  };

  // Prepare the syllabus columns
  const { leftTopics, rightTopics } = getSyllabusColumns(); // Top (left → right)

  // (Your existing placement/carousel hooks remain unchanged)
  // ... (placement hooks) ...
  // placement //
  const [topIndex, setTopIndex] = useState(0);
  const [topTransition, setTopTransition] = useState(true); // Bottom (right → left)

  const [bottomIndex, setBottomIndex] = useState(0);
  const [bottomTransition, setBottomTransition] = useState(true); // Carousel play/pause state

  const [isTopPaused, setIsTopPaused] = useState(false);
  const [isBottomPaused, setIsBottomPaused] = useState(false); // Auto move top carousel

  useEffect(() => {
    if (isTopPaused) return;
    const id = setInterval(() => {
      setTopIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(id);
  }, [isTopPaused]); // Auto move bottom carousel

  useEffect(() => {
    if (isBottomPaused) return;
    const id = setInterval(() => {
      setBottomIndex((prev) => prev + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [isBottomPaused]); // Reset loop for top

  useEffect(() => {
    if (topIndex >= rightScrollCards.length) {
      setTimeout(() => {
        setTopTransition(false);
        setTopIndex(0);
        requestAnimationFrame(() => setTopTransition(true));
      }, 800);
    }
  }, [topIndex]); // Reset loop for bottom

  useEffect(() => {
    if (bottomIndex >= leftScrollCards.length) {
      setTimeout(() => {
        setBottomTransition(false);
        setBottomIndex(0);
        requestAnimationFrame(() => setBottomTransition(true));
      }, 800);
    }
  }, [bottomIndex]); // Pause on hover handlers

  const handleTopMouseEnter = () => setIsTopPaused(true);
  const handleTopMouseLeave = () => setIsTopPaused(false);

  const handleBottomMouseEnter = () => setIsBottomPaused(true);
  const handleBottomMouseLeave = () => setIsBottomPaused(false); // Manual buttons

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
          <SiPhp className={styles.html} color="#777BB4" />
          <SiLaravel className={styles.css} color="#FF2D20" />
          <SiComposer className={styles.js} color="#885630" />
          <SiMysql className={styles.react} color="#4479A1" />
          <SiApache className={styles.bootstrap} color="#D22128" />
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
              PHP Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our PHP Development Course is crafted to turn beginners into backend
            experts by focusing on server-side scripting, databases, and
            frameworks like Laravel.
          </h2>
          <button
            className={styles.herobutton}
            onClick={() => setShowForm(true)}
          >
            Talk to us
          </button>
        </div>
      </section>

      {/*Stat Section*/}
      <div className={styles.statsWrapper}>
        {statsData.map((stat, index) => (
          <div className={styles.statCircle} key={index}>
            <div className={styles.rotatingRing}></div> {/* Fixed class name */}
            <div className={styles.statContent}>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tool Section - PHP Focused */}
      <section className={styles.toolsMain}>
        <h1>Tools</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>PHP</h3>
              <p className={styles.description}>
                PHP is a widely-used open-source scripting language especially
                suited for web development and server-side scripting.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiPhp size={60} color="#777BB4" className={styles.toolName} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiLaravel
                size={60}
                color="#FF2D20"
                className={styles.toolName}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Laravel</h3>
              <p className={styles.description}>
                Laravel is a PHP framework with elegant syntax, providing tools
                for routing, authentication, and more for modern web apps.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Composer</h3>
              <p className={styles.description}>
                Composer is a dependency manager for PHP that allows you to
                manage project libraries and autoloading efficiently.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiComposer
                size={60}
                color="#885630"
                className={styles.toolName}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiMysql size={60} color="#4479A1" className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>MySQL</h3>
              <p className={styles.description}>
                MySQL is a popular open-source relational database management
                system used for storing and managing website data.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Apache</h3>
              <p className={styles.description}>
                Apache is a widely-used web server software that allows PHP
                applications to run on local or live servers.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiApache size={60} color="#D42029" className={styles.toolName} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiXampp size={60} color="#FB7A24" className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>XAMPP</h3>
              <p className={styles.description}>
                XAMPP is a local server package that includes Apache, MySQL,
                PHP, and Perl for testing and development purposes.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>WordPress</h3>
              <p className={styles.description}>
                WordPress is a content management system built on PHP and MySQL,
                ideal for creating websites and blogs easily.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiWordpress
                size={60}
                color="#21759B"
                className={styles.toolName}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiCodeigniter
                size={60}
                color="#EE4623"
                className={styles.toolName}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>CodeIgniter</h3>
              <p className={styles.description}>
                CodeIgniter is a powerful PHP framework with a small footprint,
                known for speed and performance in backend development.
              </p>
            </div>
          </div>
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* what will you learn */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>
          Who Can Join Our PHP Development Course?
        </h1>
        <p className={styles.subheading}>
          Our <strong>PHP course</strong> is designed for absolute beginners and
          intermediate learners. Whether you're a student, a graduate looking
          for backend skills, a job seeker aiming for full-stack roles, or an
          entrepreneur wanting to manage your own website — this course is your
          stepping stone into professional web development.
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
                    Begin your coding journey early! Learn to create dynamic
                    websites and gain internship-ready skills in backend
                    development.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Graduates / Job Seekers</strong>
                    <br />
                    Become job-ready with in-demand PHP, MySQL, and Laravel
                    skills — ideal for web development, CMS integration, and
                    backend roles.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Freelancers & Entrepreneurs</strong>
                    <br />
                    Build, launch, and manage your own websites or client
                    projects. Take control of your digital presence with
                    hands-on backend control.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Working Professionals (Upskilling)</strong>
                    <br />
                    Add backend development to your skill set. Seamlessly
                    integrate with front-end teams or transition into full-stack
                    developer roles.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.rightSection}>
            <img
              src={images.willGet}
              alt="PHP Training Roadmap"
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

      {/* --- NEW SYLLABUS SECTION --- */}
      <section className={styles.syllabusSection}>
        <h1 className={styles.syllabusTitle}>PHP Course Syllabus In Mohali</h1>
        <p className={styles.syllabusSubtitle}>
          Our <strong>PHP Course in Mohali</strong> is designed and curated by
          industry experts who have over 20+ years of experience working as
          Backend Developers. That's why, by enrolling in this training program,
          you can build a solid foundation for all the core components of PHP
          Development, plus gain proficiency in MySQL, Laravel, and more.
        </p>

        <div className={styles.syllabusGrid}>
          {/* --- Left Column --- */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>PHP SYLLABUS</h2>
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
            <h2 className={styles.columnTitle}>ADVANCE PHP</h2>
            {rightTopics.map((topic, index) => (
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
        </div>
      </section>
      {/* --- END NEW SYLLABUS SECTION --- */}

      {/* projects */}
      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          {/* Heading */}
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              PHP Solutions For Your Web Development
            </h2>
          </div>

          {/* Grid */}
          <div className={styles.projectSectionGrid}>
            {/* Block 1 */}
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🌐</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Custom Web Applications
                </h3>
                <p className={styles.projectSectionDesc}>
                  Build scalable and secure web applications tailored to your
                  business needs using PHP frameworks.
                </p>
              </div>
            </div>

            {/* Block 2 */}
            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🛒</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  E-commerce Development
                </h3>
                <p className={styles.projectSectionDesc}>
                  Develop feature-rich e-commerce platforms with payment gateway
                  integration and inventory management.
                </p>
              </div>
            </div>

            {/* Block 3 */}
            <div className={`${styles.projectSectionCard} ${styles.project3}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>⚡</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>API Development</h3>
                <p className={styles.projectSectionDesc}>
                  Create secure RESTful APIs in PHP to enable seamless
                  integration with third-party services and applications.
                </p>
              </div>
            </div>

            {/* Block 4 */}
            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🗄️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>CMS Solutions</h3>
                <p className={styles.projectSectionDesc}>
                  Develop and customize content management systems like
                  WordPress, Drupal, or Joomla using PHP.
                </p>
              </div>
            </div>

            {/* Block 5 */}
            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🔧</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Maintenance & Support
                </h3>
                <p className={styles.projectSectionDesc}>
                  Ensure your PHP applications run smoothly with ongoing
                  support, bug fixes, and performance optimization.
                </p>
              </div>
            </div>

            {/* Block 6 */}
            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📱</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Responsive Websites
                </h3>
                <p className={styles.projectSectionDesc}>
                  Build mobile-friendly, responsive websites powered by PHP to
                  ensure seamless user experiences.
                </p>
              </div>
            </div>

            {/* Block 7 */}
            <div className={`${styles.projectSectionCard} ${styles.project7}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>☁️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Cloud Integration
                </h3>
                <p className={styles.projectSectionDesc}>
                  Integrate PHP applications with cloud platforms for
                  scalability, flexibility, and enhanced performance.
                </p>
              </div>
            </div>

            {/* Block 8 */}
            <div className={`${styles.projectSectionCard} ${styles.project8}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🔒</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Security Solutions
                </h3>
                <p className={styles.projectSectionDesc}>
                  Implement advanced PHP security practices to safeguard your
                  web apps against threats and vulnerabilities.
                </p>
              </div>
            </div>

            {/* Block 9 */}
            <div className={`${styles.projectSectionCard} ${styles.project9}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🚀</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Performance Optimization
                </h3>
                <p className={styles.projectSectionDesc}>
                  Optimize PHP applications for speed, scalability, and
                  efficient database interactions.
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
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </div>

      {/* why choose us section  */}

      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For PHP Training In Mohali?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>PHP Development</strong> and guarantees 100% job
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
      {/* <section className={styles.certificateSection}>
     <div className={styles.mainContainer}>
   . . . (certificate content) . . .
     </div>
   </section> */}

      {/* faq section */}
      <div className={styles.faqContainer}>
        <div className={styles.faqContent}>
          <div className={styles.faqLeft}>
            <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
            {/* <p className={styles.faqDescription}>
         Blandit nunc sapien orci egestas scelerisque mattis. Pulvinar pellentesque cursus ornare neque non mi pellentesque adipiscing mollis.
   . . .
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
