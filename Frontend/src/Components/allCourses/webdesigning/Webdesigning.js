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
  projectData,
  syllabusData,
  faqQuestions,
  leftScrollCards,
} from "./webDesigningData";
import ReviewsSection from "../../reviews/ReviewsSection";

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

const Webdesigning = () => {
  const [showForm, setShowForm] = useState(false);
  const typedOutput = useCustomTypewriter(phrases);
  const [selected, setSelected] = useState(Object.keys(syllabusData)[0] || "");

  // certificate //
  const [active, setActive] = useState(null);

  // FAQ toggle
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          <img src={images.html} alt="html" className={styles.html} />
          <img src={images.css} alt="css" className={styles.css} />
          <img src={images.js} alt="js" className={styles.js} />
          <img src={images.react} alt="react" className={styles.react} />
          <img
            src={images.Bootstrap}
            alt="bootstrap"
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
              Web Designing Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our Web Designing Course offers immersive, hands-on training in
            HTML, CSS, JavaScript, Bootstrap, WordPress, and more. You'll master
            the skills to design and develop responsive, visually appealing, and
            user-friendly websites. The course emphasizes industry best
            practices, ensuring you're job-ready from day one.
          </h2>
          <button
            className={styles.herobutton}
            onClick={() => setShowForm(true)}
          >
            Talk to us
          </button>
        </div>
        {showForm && <Form closeForm={() => setShowForm(false)} />}
      </section>

      {/* stat section */}
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

      {/* tools section */}

      <section className={styles.toolsMain}>
        <h1>Tools</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles["feature-card"]}>
            <div>
              <h3 className={styles.title}>HTML</h3>
              <p className={styles.description}>
                HTML (HyperText Markup Language) provides the basic structure of
                web pages, using elements like headings, paragraphs, links, and
                images.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.html}
                alt="HTML"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.css}
                alt="CSS"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div>
              <h3 className={styles.title}>CSS</h3>
              <p className={styles.description}>
                CSS (Cascading Style Sheets) styles the layout and design of web
                pages—controlling colors, spacing, fonts, and responsive
                behavior.
              </p>
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div>
              <h3 className={styles.title}>JavaScript</h3>
              <p className={styles.description}>
                JavaScript adds dynamic behavior to websites, enabling
                interactive features like sliders, form validation, and
                real-time updates.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.js}
                alt="JavaScript"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.react}
                alt="React"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div>
              <h3 className={styles.title}>React</h3>
              <p className={styles.description}>
                React is a popular JavaScript library for building user
                interfaces using reusable components and efficient state
                management.
              </p>
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div>
              <h3 className={styles.title}>Shopify</h3>
              <p className={styles.description}>
                Shopify is a leading eCommerce platform that enables individuals
                and businesses to create online stores with customizable
                templates.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.shopify}
                alt="Shopify"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.wordpress}
                alt="WordPress"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div>
              <h3 className={styles.title}>WordPress</h3>
              <p className={styles.description}>
                WordPress is a content management system (CMS) used for building
                websites and blogs, known for its ease of use and plugin
                ecosystem.
              </p>
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div>
              <h3 className={styles.title}>Bootstrap</h3>
              <p className={styles.description}>
                Bootstrap is a responsive front-end framework offering prebuilt
                UI components and grid systems for rapid web design and layout.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.Bootstrap}
                alt="Bootstrap"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles["feature-card"]}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={images.nestjs}
                alt="NestJS"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div>
              <h3 className={styles.title}>NestJS</h3>
              <p className={styles.description}>
                NestJS is a scalable Node.js framework built with TypeScript,
                offering a modular architecture for building efficient
                server-side apps.
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

      {/* what will you learn */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>
          Who Can Join Our Web Designing Course?
        </h1>
        <p className={styles.subheading}>
          Our <strong>Web Designing course</strong> Whether you're a 10th or
          12th pass student exploring career options, a graduate seeking
          in-demand skills, a job seeker aiming to stand out, a freelancer ready
          to expand your portfolio, or an entrepreneur building a digital brand
          — this course is made for you. No prior experience needed, just your
          willingness to learn and grow.
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
                    real-world tech skills and unlock internships or junior
                    roles in web, design, or digital sectors.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Graduates / Job Seekers</strong>
                    <br />
                    Bridge the gap between education and employment. Master
                    job-relevant tools and confidently apply for high-demand
                    roles in tech, marketing, or business.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Freelancers & Entrepreneurs</strong>
                    <br />
                    Transform your ideas into income. Learn to build websites,
                    promote your brand online, and scale your freelance services
                    or startup with digital excellence.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Working Professionals (Upskilling)</strong>
                    <br />
                    Future-proof your career. Stay ahead in your field, shift
                    into trending tech roles, or gain the edge for promotions
                    and leadership opportunities.
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

      {/* sylabus */}
      <div className={styles.syllabusContainer}>
        <h1>What Will Our Trainees Learn In Web Designing Training</h1>
        <p>
          Explore our <strong>Web Designing training course</strong> curriculum
          to know exactly what skills you will gain. Ziion Technology is one of
          India’s leading industrial training institutes, offering comprehensive
          training to our <strong>trainees</strong> in HTML, CSS, JavaScript,
          responsive design, and modern UI/UX practices.
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

      {/* project */}
      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          {/* Heading */}
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              Web Designing Projects Highlighting Creativity
            </h2>
          </div>

          {/* Grid */}
          <div className={styles.projectSectionGrid}>
            {/* Project 1 */}
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
                  interactive animations for better user experience.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🖌️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>UI/UX Redesign</h3>
                <p className={styles.projectSectionDesc}>
                  Revamped an outdated website design with modern UI/UX
                  practices, improving navigation and accessibility.
                </p>
              </div>
            </div>

            {/* Project 3 */}
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
                  Flexbox, ensuring seamless mobile-first experiences.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🖼️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Landing Page Design
                </h3>
                <p className={styles.projectSectionDesc}>
                  Designed high-conversion landing pages with engaging visuals,
                  custom icons, and strong calls-to-action.
                </p>
              </div>
            </div>

            {/* Project 5 */}
            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🎬</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Interactive Prototypes
                </h3>
                <p className={styles.projectSectionDesc}>
                  Built interactive prototypes in Figma and Adobe XD to
                  demonstrate user flows and animations before development.
                </p>
              </div>
            </div>

            {/* Project 6 */}
            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🔤</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Typography & Branding
                </h3>
                <p className={styles.projectSectionDesc}>
                  Created consistent branding with typography, color schemes,
                  and icon sets for a unified digital identity.
                </p>
              </div>
            </div>

            {/* Project 7 */}
            <div className={`${styles.projectSectionCard} ${styles.project7}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🛒</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  E-Commerce UI Design
                </h3>
                <p className={styles.projectSectionDesc}>
                  Designed sleek product pages, shopping carts, and checkout
                  flows with an emphasis on usability and conversions.
                </p>
              </div>
            </div>

            {/* Project 8 */}
            <div className={`${styles.projectSectionCard} ${styles.project8}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🧭</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Navigation & Wireframing
                </h3>
                <p className={styles.projectSectionDesc}>
                  Designed intuitive navigation structures and wireframes to
                  improve user journey mapping and content placement.
                </p>
              </div>
            </div>

            {/* Project 9 */}
            <div className={`${styles.projectSectionCard} ${styles.project9}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>✨</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Micro-interactions & Animations
                </h3>
                <p className={styles.projectSectionDesc}>
                  Added subtle animations, hover effects, and micro-interactions
                  to enhance user engagement and design polish.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* achievers section */}

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
          {/* Nisha */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "nisha" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("nisha")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.nisha}
              className={styles.appFeatureImage}
              alt="Nisha"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "nisha" && (
                <p className={styles.appFeatureText}>
                  “Dream big, work hard — success will follow.”
                </p>
              )}
            </div>
          </div>

          {/* Parmeet */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "parmeet" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("parmeet")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.parmeet}
              className={styles.appFeatureImage}
              alt="Parmeet"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "parmeet" && (
                <p className={styles.appFeatureText}>
                  “Consistency is the key to turning dreams into reality.”
                </p>
              )}
            </div>
          </div>

          {/* Raghav */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "raghav" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("raghav")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.raghav}
              className={styles.appFeatureImage}
              alt="Raghav"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "raghav" && (
                <p className={styles.appFeatureText}>
                  “Every step forward, no matter how small, counts toward
                  success.”
                </p>
              )}
            </div>
          </div>

          {/* Rupalpreet */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "rupalpreet" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("rupalpreet")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.rupal}
              className={styles.appFeatureImage}
              alt="Rupalpreet"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "rupalpreet" && (
                <p className={styles.appFeatureText}>
                  “Success is not final, failure is not fatal — keep moving
                  forward.”
                </p>
              )}
            </div>
          </div>

          {/* Shubham */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "shubham" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("shubham")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.shubham}
              className={styles.appFeatureImage}
              alt="Shubham"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "shubham" && (
                <p className={styles.appFeatureText}>
                  “Hard work beats talent when talent doesn’t work hard.”
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "app" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("app")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.arunesh}
              className={styles.appFeatureImage}
              alt="Mobile App Development"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "app" && (
                <p className={styles.appFeatureText}>
                  “Innovate, create, and build for the future.”
                </p>
              )}
            </div>
          </div>

          {/* Digital Marketing */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "marketing" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("marketing")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.harleen}
              className={styles.appFeatureImage}
              alt="Digital Marketing"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "marketing" && (
                <p className={styles.appFeatureText}>
                  “Your passion and persistence define your brand.”
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
            Why Choose <span>Ziion Technology</span> For Web Designing Course In
            Mohali?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>Digital Marketing Training</strong> and guarantees 100%
            job assistance in the industry.
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
          <img src={images.nisha} alt="Certificate Sample1" />
          <img src={images.arunesh} alt="Certificate Sample2" />
          <img src={images.raghav} alt="Certificate Sample3" />
          <img src={images.nishaRani} alt="Certificate Sample4" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Webdesigning;
