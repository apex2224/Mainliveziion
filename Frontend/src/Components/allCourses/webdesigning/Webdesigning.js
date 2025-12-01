import React, { useState, useEffect, useRef } from "react";
import styles from "./webdesigning.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Form from "../../form/Form";
import {
  phrases,
  statsData,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  syllabusData,
  faqQuestions,
  leftScrollCards,
} from "./webDesigningData";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiBootstrap,
  SiWordpress,
  SiShopify,
  SiNestjs,
} from "react-icons/si";
import ReviewsSection from "../../reviews/ReviewsSection";
import StudentCarousel from "../../placement/StudentCarousel";
import SecondForm from "../../secondForm/SecondForm";

const rightScrollCards = [
  { image: images.raghav },
  { image: images.nishaRani },
  { image: images.parmeet },
  { image: images.nisha },
  { image: images.rupal },
  { image: images.shubham },
  { image: images.simranjeet },
  { image: images.simrat },
  { image: images.abhishek },
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

const Webdesigning = () => {
  const [showForm, setShowForm] = useState(false);
  const typedOutput = useCustomTypewriter(phrases);

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

  // --- Syllabus Accordion State ---
  const [openSyllabusTopic, setOpenSyllabusTopic] = useState(null);

  const toggleSyllabus = (topic) => {
    setOpenSyllabusTopic(openSyllabusTopic === topic ? null : topic);
  };

  const { leftTopics, rightTopics } = getSyllabusColumns();

  // Placement Carousels
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
      <section className={styles.webDesigningHeroSection}>
        <div className={styles.overlay}>
          <SiHtml5 className={styles.html} color="#E34F26" />
          <SiCss3 className={styles.css} color="#1572B6" />
          <SiJavascript className={styles.js} color="#F7DF1E" />
          <SiReact className={styles.react} color="#61DAFB" />
          <SiBootstrap className={styles.bootstrap} color="#7952B3" />
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
              Web Designing Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our Web Designing Course offers immersive, hands-on training in
            HTML, CSS, JavaScript, Bootstrap, WordPress, and more. You'll master
            the skills to design and develop responsive, visually appealing, and
            user-friendly websites.
          </h2>
          <button
            className={styles.herobutton}
            onClick={() => setShowForm(true)}
          >
            Talk to us
          </button>
        </div>
      </section>

      {/* Stat Section */}
      <div className={styles.statsWrapper}>
        {statsData.map((stat, index) => (
          <div className={styles.statCircle} key={index}>
            <div className={styles.rotatingRing}></div>
            <div className={styles.statContent}>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tool Section */}
      <section className={styles.toolsMain}>
        <h1>Tools</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>HTML5</h3>
              <p className={styles.description}>
                HTML provides the basic structure of web pages, using elements
                like headings, paragraphs, and links.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiHtml5 size={60} color="#E34F26" className={styles.toolName} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiCss3 size={60} color="#1572B6" className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>CSS3</h3>
              <p className={styles.description}>
                CSS styles the layout and design of web pages—controlling
                colors, spacing, fonts, and responsiveness.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>JavaScript</h3>
              <p className={styles.description}>
                JavaScript adds dynamic behavior to websites, enabling
                interactive features and real-time updates.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiJavascript
                size={60}
                color="#F7DF1E"
                className={styles.toolName}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiReact size={60} color="#61DAFB" className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>React</h3>
              <p className={styles.description}>
                React is a popular library for building user interfaces using
                reusable components and efficient state management.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Bootstrap</h3>
              <p className={styles.description}>
                Bootstrap is a responsive front-end framework offering prebuilt
                UI components and grid systems.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiBootstrap
                size={60}
                color="#7952B3"
                className={styles.toolName}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiWordpress
                size={60}
                color="#21759B"
                className={styles.toolName}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>WordPress</h3>
              <p className={styles.description}>
                WordPress is a CMS used for building websites and blogs, known
                for its ease of use and plugin ecosystem.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Shopify</h3>
              <p className={styles.description}>
                Shopify is a leading eCommerce platform that enables businesses
                to create online stores.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiShopify
                size={60}
                color="#96BF48"
                className={styles.toolName}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiNestjs
                size={60}
                color="#E0234E"
                className={styles.toolName}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>NestJS</h3>
              <p className={styles.description}>
                NestJS is a scalable Node.js framework built with TypeScript,
                offering a modular architecture.
              </p>
            </div>
          </div>
        </div>
        <button
          className={styles.herobutton}
          onClick={() => setShowForm(true)}
        >
          Talk to us
        </button>
      </section>

      {/* What Will You Learn */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>
          Who Can Join Our Web Designing Course?
        </h1>
        <p className={styles.subheading}>
          Our <strong>Web Designing course</strong> is designed for everyone.
          Whether you're a student, a graduate looking for skills, a job seeker,
          or an entrepreneur — this course is your stepping stone into
          professional web design.
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
                    Turn your curiosity into a career! Get early exposure to
                    real-world tech skills and unlock internships.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Graduates / Job Seekers</strong>
                    <br />
                    Master job-relevant tools and confidently apply for
                    high-demand roles in tech and marketing.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Freelancers & Entrepreneurs</strong>
                    <br />
                    Transform your ideas into income. Learn to build websites
                    and promote your brand online.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Working Professionals</strong>
                    <br />
                    Future-proof your career. Add design skills to your
                    portfolio and shift into trending tech roles.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.rightSection}>
            <img
              src={images.willGet}
              alt="Web Training Roadmap"
              className={styles.whatlearnimg}
            />
          </div>
        </div>
      </div>

      <EnrollProcess />

      {/* Placement Section */}
      <div>
        <h1 className={styles.storyHeading}>Our Success Story</h1>
        <div className={styles.leftCarouselWrapper}>
          <div
            className={styles.leftCarousel}
            style={{
              transform: `translateX(-${bottomIndex * VIDEO_WIDTH}px)`,
              transition: bottomTransition ? "transform 0.8s ease-in-out" : "none",
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

      {/* Syllabus Section (Accordion Style) */}
      <section className={styles.syllabusSection}>
        <h1 className={styles.syllabusTitle}>Web Designing Course Syllabus</h1>
        <p className={styles.syllabusSubtitle}>
          Our curriculum is designed by industry experts to build your skills
          from the ground up, covering everything from HTML, CSS, and JavaScript
          fundamentals to advanced React, WordPress, and UI/UX design.
        </p>

        <div className={styles.syllabusGrid}>
          {/* Left Column */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Frontend Basics</h2>
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
            <h2 className={styles.columnTitle}>Advanced Design</h2>
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

      {/* Projects */}
      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              Web Designing Projects Highlighting Creativity
            </h2>
          </div>

          <div className={styles.projectSectionGrid}>
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🎨</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Creative Portfolio Design
                </h3>
                <p className={styles.projectSectionDesc}>
                  Designed a modern, minimal portfolio with custom layouts and
                  interactive animations.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🖌️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>UI/UX Redesign</h3>
                <p className={styles.projectSectionDesc}>
                  Revamped an outdated website design with modern UI/UX practices.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project3}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📱</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Responsive Web Design
                </h3>
                <p className={styles.projectSectionDesc}>
                  Created pixel-perfect responsive designs with CSS Grid and
                  Flexbox.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🖼️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Landing Page Design
                </h3>
                <p className={styles.projectSectionDesc}>
                  Designed high-conversion landing pages with engaging visuals.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🎬</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Interactive Prototypes
                </h3>
                <p className={styles.projectSectionDesc}>
                  Built interactive prototypes in Figma to demonstrate user flows.
                </p>
              </div>
            </div>

            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🛒</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>E-Commerce UI</h3>
                <p className={styles.projectSectionDesc}>
                  Designed sleek product pages and shopping carts for conversion.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Career Opportunities */}
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
        <button
          className={styles.herobutton}
          onClick={() => setShowForm(true)}
        >
          Talk to us
        </button>
      </div>

      {/* Why Choose Us */}
      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For Web Designing?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>Web Design</strong> and guarantees 100% job assistance.
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

      {/* FAQ */}
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

export default Webdesigning;