import React, { useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./webDev.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Form from "../../form/Form";
import ReviewsSection from "../../reviews/ReviewsSection";
import SecondForm from "../../secondForm/SecondForm";
import {
  heroPhrases,
  statsData,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./webdevData";

// Constants
const CAROUSEL_CONFIG = {
  CARD_WIDTH: 300,
  VIDEO_WIDTH: 310,
  TOP_INTERVAL: 2000,
  BOTTOM_INTERVAL: 2200,
  TRANSITION_DURATION: 800,
};

const TYPING_CONFIG = {
  TYPING_SPEED: 100,
  DELETING_SPEED: 50,
  PAUSE_DURATION: 1200,
};

// Sample carousel data
const rightScrollCards = [
  { image: images.raghav },
  { image: images.jasmeet },
  { image: images.parmeet },
  { image: images.nisha },
  { image: images.rupal },
  { image: images.shubham },
  { image: images.simranjeet },
  { image: images.simrat },
  { image: images.abhishek },
  { image: images.arunesh },
];

const toolsData = [
  {
    name: "HTML",
    description:
      "HTML (HyperText Markup Language) forms the backbone of web development by structuring web pages using elements like headings, paragraphs, and links.",
    image: images.html,
    align: "left",
  },
  {
    name: "CSS",
    description:
      "CSS (Cascading Style Sheets) handles the visual design of web pages by controlling layout, colors, fonts, and responsiveness.",
    image: images.css,
    align: "right",
  },
  {
    name: "JavaScript",
    description:
      "JavaScript adds interactivity and dynamic behavior to web pages, enabling features like animations, data validation, and API calls.",
    image: images.js,
    align: "left",
  },
  {
    name: "React",
    description:
      "React is a popular JavaScript library for building fast and modular user interfaces using reusable components and virtual DOM.",
    image: images.react,
    align: "right",
  },
  {
    name: "MongoDB",
    description:
      "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents, making it ideal for modern, scalable web applications.",
    image: images.mongo,
    align: "left",
  },
  {
    name: "Express.js",
    description:
      "Express.js is a lightweight Node.js framework that simplifies building server-side applications and APIs with robust routing capabilities.",
    image: images.express,
    align: "right",
  },
  {
    name: "Node.js",
    description:
      "Node.js is a runtime environment that allows developers to run JavaScript on the server side, enabling full-stack JavaScript development.",
    image: images.nodejs,
    align: "left",
  },
  {
    name: "Next.js",
    description:
      "Next.js is a React-based framework for building high-performance, SEO-friendly web applications with features like SSR and static site generation.",
    image: images.nextjs,
    align: "right",
  },
];

const projectsData = [
  {
    id: 1,
    icon: "🌐",
    title: "Responsive Portfolio Website",
    description:
      "Built a fully responsive personal portfolio using React and Tailwind CSS, optimized for desktop and mobile devices.",
  },
  {
    id: 2,
    icon: "🛠️",
    title: "E-Commerce Platform",
    description:
      "Developed a MERN stack e-commerce application with product catalog, cart, payments, and admin dashboard.",
  },
  {
    id: 3,
    icon: "📱",
    title: "Progressive Web App (PWA)",
    description:
      "Built a PWA with offline support, push notifications, and installable features for enhanced user experience.",
  },
  {
    id: 4,
    icon: "⚡",
    title: "Real-Time Chat Application",
    description:
      "Implemented a real-time chat app using Socket.io and Node.js with authentication and private messaging.",
  },
  {
    id: 5,
    icon: "📊",
    title: "Data Visualization Dashboard",
    description:
      "Designed an analytics dashboard with Chart.js and D3.js to visualize business KPIs interactively.",
  },
  {
    id: 6,
    icon: "🔐",
    title: "Authentication System",
    description:
      "Built a secure login system with JWT, OAuth integration, and role-based access control.",
  },
  {
    id: 7,
    icon: "☁️",
    title: "Cloud Deployment",
    description:
      "Deployed full-stack applications on AWS and Vercel with CI/CD pipelines and scalability in mind.",
  },
  {
    id: 8,
    icon: "🖼️",
    title: "Image Optimization Tool",
    description:
      "Created a Next.js tool to compress and optimize images for performance and SEO improvements.",
  },
  {
    id: 9,
    icon: "🤖",
    title: "AI-Powered Blog Generator",
    description:
      "Integrated OpenAI API to auto-generate SEO-friendly blog posts with rich text editor support.",
  },
];

const achieversData = [
  {
    id: "aayush",
    image: images.aayushDs,
    name: "Aayush",
    quote: "Data is powerful — those who master it, master the future.",
  },
  {
    id: "abhishek",
    image: images.abhishekDs,
    name: "Abhishek",
    quote:
      "Consistency in learning turns raw data into career-changing insights.",
  },
  {
    id: "aryan",
    image: images.aryanDs,
    name: "Aryan",
    quote: "Every dataset is a new opportunity — embrace the challenge.",
  },
  {
    id: "harmanpreet",
    image: images.harmanPreetDs,
    name: "Harmanpreet",
    quote: "Failures are just experiments — keep iterating, keep improving.",
  },
  {
    id: "manan",
    image: images.mananMangleshDs,
    name: "Manan Manglesh",
    quote:
      "In Data Science, persistence trains the mind like algorithms train the model.",
  },
  {
    id: "mohit",
    image: images.mohitKumarDataScience,
    name: "Mohit Kumar",
    quote: "Innovate with data, create with code, and build your tomorrow.",
  },
  {
    id: "raman",
    image: images.ramanDeepDs,
    name: "Raman Deep",
    quote:
      "Passion for data and persistence in learning define a true achiever.",
  },
];

// Custom Hooks
const useTypewriter = (phrases) => {
  const [state, setState] = useState({
    currentPhraseIndex: 0,
    text: "",
    isDeleting: false,
  });

  useEffect(() => {
    const currentPhrase = phrases[state.currentPhraseIndex];
    const typingSpeed = state.isDeleting
      ? TYPING_CONFIG.DELETING_SPEED
      : TYPING_CONFIG.TYPING_SPEED;

    const timeout = setTimeout(() => {
      setState((prev) => {
        const newText = prev.isDeleting
          ? currentPhrase.substring(0, prev.text.length - 1)
          : currentPhrase.substring(0, prev.text.length + 1);

        if (!prev.isDeleting && prev.text === currentPhrase) {
          setTimeout(() => {
            setState((s) => ({ ...s, isDeleting: true }));
          }, TYPING_CONFIG.PAUSE_DURATION);
          return prev;
        }

        if (prev.isDeleting && prev.text === "") {
          return {
            text: "",
            isDeleting: false,
            currentPhraseIndex: (prev.currentPhraseIndex + 1) % phrases.length,
          };
        }

        return { ...prev, text: newText };
      });
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [state, phrases]);

  return state.text;
};

const useCarousel = (items, interval, width) => {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance carousel
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [isPaused, interval]);

  // Reset carousel loop
  useEffect(() => {
    if (index >= items.length) {
      setTimeout(() => {
        setTransition(false);
        setIndex(0);
        requestAnimationFrame(() => setTransition(true));
      }, CAROUSEL_CONFIG.TRANSITION_DURATION);
    }
  }, [index, items.length]);

  const handlePrev = useCallback(() => {
    setIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  return {
    index,
    transition,
    isPaused,
    setIsPaused,
    handlePrev,
    handleNext,
    transform: `translateX(-${index * width}px)`,
  };
};

// Sub-components
const HeroSection = ({ typedText, onShowForm }) => (
  <section className={styles.webDesigningHeroSection}>
    <div className={styles.overlay}>
      <img src={images.mongo} alt="MongoDB" className={styles.mongo} />
      <img src={images.express} alt="Express.js" className={styles.express} />
      <img src={images.html} alt="HTML" className={styles.html} />
      <img src={images.js} alt="JavaScript" className={styles.js} />
      <img src={images.css} alt="CSS" className={styles.css} />
    </div>

    {/* <div className={styles.webDesigning}>
      <img
        src={images.knowledgeHeroImage}
        alt="Web Development Background"
        className={styles.webDesigningBgImage}
      />
    </div> */}

    <div className={styles.webDesigningContent}>
      <h1 className={styles.webDesigningTitle}>
        <span
          className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
        >
          Web Development Course in Chandigarh <br />
          <span className={styles.typedText}>{typedText}</span>
          <span className={styles.cursor}>|</span>
        </span>
      </h1>

      <h2 className={styles.webDesigningSubtitle}>
        Our Web Development Course is designed to provide hands-on training with
        a focus on HTML, CSS, JavaScript, Bootstrap, React, Node.js, and more.
        We help you build responsive, dynamic, and scalable websites that meet
        modern industry standards.
      </h2>

      <button className={styles.herobutton} onClick={onShowForm}>
        Talk to us
      </button>
    </div>
  </section>
);

HeroSection.propTypes = {
  typedText: PropTypes.string.isRequired,
  onShowForm: PropTypes.func.isRequired,
};

const StatsSection = ({ stats }) => (
  <div className={styles.statsWrapper}>
    {stats.map((stat, index) => (
      <div className={styles.statCircle} key={index}>
        <div className={styles.statsrotatingRing} />
        <div className={styles.statContent}>
          <h2 className={styles.statValue}>{stat.value}</h2>
          <p className={styles.statLabel}>{stat.label}</p>
        </div>
      </div>
    ))}
  </div>
);

StatsSection.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const ToolsSection = ({ tools, onShowForm }) => (
  <section className={styles.toolsMain}>
    <h1>Tools</h1>
    <div className={styles.webdevtoolsContainer}>
      {tools.map((tool, index) => (
        <div key={index} className={styles.webdevtools}>
          {tool.align === "left" ? (
            <>
              <div className={styles.textBlock}>
                <h3 className={styles.title}>{tool.name}</h3>
                <p className={styles.toolDescription}>{tool.description}</p>
              </div>
              <div className={styles.webdevtoolsFeature}>
                <img
                  src={tool.image}
                  alt={tool.name}
                  className={styles.webdevtoolsFeatureImg}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.webdevtoolsFeature}>
                <img
                  src={tool.image}
                  alt={tool.name}
                  className={styles.webdevtoolsFeatureImg}
                />
              </div>
              <div className={styles.textBlock}>
                <h3 className={styles.title}>{tool.name}</h3>
                <p className={styles.toolDescription}>{tool.description}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
    <button className={styles.herobutton} onClick={onShowForm}>
      Talk to us
    </button>
  </section>
);

ToolsSection.propTypes = {
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      align: PropTypes.oneOf(["left", "right"]).isRequired,
    })
  ).isRequired,
  onShowForm: PropTypes.func.isRequired,
};

const LearningSection = () => (
  <div className={styles.learncontainer}>
    <h1 className={styles.whatHeading}>
      Who Can Join Our Web Development Course?
    </h1>
    <p className={styles.subheading}>
      Explore our <strong>Web Development training course</strong> curriculum to
      discover the essential skills you'll gain. Certiwise is one of India's
      leading industrial training institutes, offering practical, job-ready
      training to our <strong>trainees</strong>.
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
                Build your foundation in HTML, CSS, and JavaScript. Start your
                journey toward a tech career early and gain skills to create
                your first website.
              </div>
            </li>
            <li className={styles.pointItem}>
              <span className={styles.arrow}>→</span>
              <div>
                <strong>Graduates / Job Seekers</strong>
                <br />
                Get industry-ready with full-stack skills and portfolio
                projects. Secure job roles like front-end developer, web
                designer, or junior developer.
              </div>
            </li>
            <li className={styles.pointItem}>
              <span className={styles.arrow}>→</span>
              <div>
                <strong>Freelancers & Entrepreneurs</strong>
                <br />
                Build and manage your own websites or client projects. Launch
                your business online and promote your services through a strong
                web presence.
              </div>
            </li>
            <li className={styles.pointItem}>
              <span className={styles.arrow}>→</span>
              <div>
                <strong>Working Professionals (Upskilling)</strong>
                <br />
                Add web development to your skillset to shift into tech roles or
                manage websites and web apps within your current organization.
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.rightSection}>
        <img
          src={images.willGet}
          alt="Web Development Roadmap"
          className={styles.whatlearnimg}
        />
      </div>
    </div>
  </div>
);

const Carousel = ({ items, config, renderItem }) => {
  const carousel = useCarousel(items, config.interval, config.width);

  return (
    <div className={config.wrapperClass}>
      <div
        className={config.carouselClass}
        style={{
          transform: carousel.transform,
          transition: carousel.transition
            ? "transform 0.8s ease-in-out"
            : "none",
        }}
        onMouseEnter={() => carousel.setIsPaused(true)}
        onMouseLeave={() => carousel.setIsPaused(false)}
      >
        {[...items, ...items].map((item, index) => renderItem(item, index))}
      </div>
      <div className={styles.carouselButtons}>
        <button
          onClick={carousel.handlePrev}
          className={styles.carouselBtn}
          aria-label="Previous"
        >
          ◀️
        </button>
        <button
          onClick={carousel.handleNext}
          className={styles.carouselBtn}
          aria-label="Next"
        >
          ▶️
        </button>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  config: PropTypes.shape({
    interval: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    wrapperClass: PropTypes.string.isRequired,
    carouselClass: PropTypes.string.isRequired,
  }).isRequired,
  renderItem: PropTypes.func.isRequired,
};

const SyllabusSection = ({ syllabusData }) => {
  const [selected, setSelected] = useState(Object.keys(syllabusData)[0] || "");

  return (
    <div className={styles.syllabusContainer}>
      <h1>What Will Our Trainees Learn In Web Development Training</h1>
      <p>
        Explore our <strong>Web Development training course</strong> curriculum
        to know exactly what skills you will gain. Ziion Technology is one of
        India's leading industrial training institutes, offering comprehensive
        training to our <strong>trainees</strong> in front-end and back-end
        development, databases, frameworks, and building dynamic full-stack
        applications.
      </p>

      <div className={styles.syllabusWrapper}>
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
  );
};

SyllabusSection.propTypes = {
  syllabusData: PropTypes.object.isRequired,
};

const ProjectsSection = ({ projects }) => (
  <div className={styles.projectBackModal}>
    <section className={styles.projectSection}>
      <div className={styles.projectSectionHeader}>
        <h2 className={styles.projectSectionHeading}>
          Web Development Projects Showcasing Expertise
        </h2>
      </div>

      <div className={styles.projectSectionGrid}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={`${styles.projectSectionCard} ${
              styles[`project${project.id}`]
            }`}
          >
            <div className={styles.projectSectionIconWrapper}>
              <div className={styles.projectSectionIcon}>{project.icon}</div>
            </div>
            <div className={styles.projectSectionContent}>
              <h3 className={styles.projectSectionTitle}>{project.title}</h3>
              <p className={styles.projectSectionDesc}>{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

ProjectsSection.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const AchieversSection = ({ achievers }) => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className={styles.achieversSection}>
      <div className={styles.achieversInner}>
        <h2 className={styles.achieversTitle}>
          <span className={styles.shimmer}>Our Achievers</span>
        </h2>
        <p className={styles.achieversSubtitle}>
          From <span className={styles.highlight}>classroom</span> to{" "}
          <span className={styles.highlight}>career</span> — turning ambition
          into offers at leading companies.
        </p>
      </div>

      <div className={styles.appFeatureContainer}>
        {achievers.map((achiever) => (
          <div
            key={achiever.id}
            className={`${styles.appFeatureCard} ${
              activeId === achiever.id ? styles.active : ""
            }`}
            onMouseEnter={() => setActiveId(achiever.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <img
              src={achiever.image}
              className={styles.appFeatureImage}
              alt={achiever.name}
            />
            <div className={styles.appFeatureOverlay}>
              {activeId === achiever.id && (
                <p className={styles.appFeatureText}>"{achiever.quote}"</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

AchieversSection.propTypes = {
  achievers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const CareerOpportunitiesSection = ({ opportunities, onShowForm }) => (
  <div className={styles.carerrOpportunities}>
    <h2 className={styles.opportunitiesheading}>
      💼 Career <span>Opportunities</span> After This Course.
    </h2>
    <div className={styles.careerOpportunitiesGrid}>
      {opportunities.map((opportunity, index) => (
        <div key={index} className={styles.careerCard}>
          <div className={styles.careerCardContent}>
            <div className={styles.careerIcon} />
            <h3>{opportunity.title}</h3>
            <p>{opportunity.description}</p>
          </div>
        </div>
      ))}
    </div>
    <button className={styles.herobutton} onClick={onShowForm}>
      Talk to us
    </button>
  </div>
);

CareerOpportunitiesSection.propTypes = {
  opportunities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onShowForm: PropTypes.func.isRequired,
};

const WhyChooseUsSection = ({ leftItems, rightItems }) => (
  <section className={styles.whychooseusSection}>
    <div className={styles.whychooseusTitleBlock}>
      <p className={styles.whychooseusTagline}>BUILD FUTURE-READY WEBSITES</p>
      <h2 className={styles.whychooseusHeading}>
        Why Choose <span>Ziion Technology</span> For Web Development In Mohali?
      </h2>
      <p className={styles.whychooseusSubtitle}>
        Ziion Technology empowers every student with hands-on experience in{" "}
        <strong>Web Development Training</strong> and provides 100% job
        assistance to help kickstart your career in the tech industry.
      </p>
    </div>

    <div className={styles.whychooseusGrid}>
      <div className={styles.whychooseusList}>
        {leftItems.map((item, index) => (
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
        {rightItems.map((item, index) => (
          <div className={styles.whychooseusItem} key={index}>
            <span className={styles.whychooseusIcon}>{item.icon}</span>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

WhyChooseUsSection.propTypes = {
  leftItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  rightItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const FAQSection = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

  const toggleFAQ = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

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

  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqContent}>
        <div className={styles.faqLeft}>
          <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
          <div className={styles.faqFaqs}>
            {questions.map((item, index) => (
              <div key={index} className={styles.faqFaqCard}>
                <div
                  className={styles.faqFaqHeader}
                  onClick={() => toggleFAQ(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && toggleFAQ(index)}
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
  );
};

FAQSection.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const CertificateSection = () => (
  <section className={styles.certificateSection}>
    <div className={styles.mainContainer}>
      <div className={styles.certificateImage}>
        <img src={images.certificatehero} alt="Ziion Certificate" />
      </div>

      <div className={styles.certificateContent}>
        <h2>WHAT BENEFITS AWAIT YOU AT ZIION TECHNOLOGY?</h2>
        <p className={styles.highlight}>
          Highly Acclaimed Program Over the Years, We've Educated Over 35,000+
          Learners & Supported Them in Landing Their Initial IT Sector Role.
        </p>
        <p className={styles.description}>
          We Provide Fully Career-Focused Courses for Professionals,
          Entrepreneurs, High School Graduates, University Students, Small
          Business Owners, Marketing Experts & Career Changers at Reasonable
          Costs. We Empower Driven Individuals Like You to Shape Their Future by
          Teaching Skills That Every Sector Seeks.
        </p>
        <p className={styles.showcase}>
          <strong>Showcase Your Success</strong>
          <br />
          Post it on LinkedIn, Twitter, and Facebook to enhance your profile.
          Highlight your accomplishment and share the news with peers and
          coworkers.
        </p>
      </div>
    </div>

    <div className={styles.certificateGallery}>
      <img src={images.jasmeet} alt="Certificate Sample 1" />
      <img src={images.nisha} alt="Certificate Sample 2" />
      <img src={images.raghav} alt="Certificate Sample 3" />
      <img src={images.arunesh} alt="Certificate Sample 4" />
    </div>
  </section>
);

// Main Component
const WebDevelopment = () => {
  const [showForm, setShowForm] = useState(false);
  const typedOutput = useTypewriter(heroPhrases);

  const handleShowForm = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);

  return (
    <div>
      <Navbar />

      <HeroSection typedText={typedOutput} onShowForm={handleShowForm} />

      <StatsSection stats={statsData} />

      <ToolsSection tools={toolsData} onShowForm={handleShowForm} />

      <LearningSection />

      <EnrollProcess />

      <div>
        <h1 className={styles.storyHeading}>Our Success Story</h1>

        {/* Video Carousel */}
        <Carousel
          items={leftScrollCards}
          config={{
            interval: CAROUSEL_CONFIG.BOTTOM_INTERVAL,
            width: CAROUSEL_CONFIG.VIDEO_WIDTH,
            wrapperClass: styles.leftCarouselWrapper,
            carouselClass: styles.leftCarousel,
          }}
          renderItem={(item, index) => (
            <div key={index} className={styles.leftCard}>
              <iframe
                src={item.iframe}
                className={styles.leftIframe}
                title={`video-${index}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
              <div className={styles.leftProfileSection}>{item.name}</div>
              <div className={styles.leftCompanySection}>{item.company}</div>
            </div>
          )}
        />

        {/* Image Carousel */}
        <Carousel
          items={rightScrollCards}
          config={{
            interval: CAROUSEL_CONFIG.TOP_INTERVAL,
            width: CAROUSEL_CONFIG.CARD_WIDTH,
            wrapperClass: styles.carouselWrapper,
            carouselClass: styles.carousel,
          }}
          renderItem={(item, index) => (
            <div key={index} className={styles.card}>
              <img
                src={item.image}
                alt={`Student ${index + 1}`}
                className={styles.cardImage}
              />
            </div>
          )}
        />
      </div>

      <SyllabusSection syllabusData={syllabusData} />

      <ProjectsSection projects={projectsData} />

      <AchieversSection achievers={achieversData} />

      <CareerOpportunitiesSection
        opportunities={careerOpportunities}
        onShowForm={handleShowForm}
      />

      <WhyChooseUsSection
        leftItems={chooseUsLeftItems}
        rightItems={chooseUsRightItems}
      />

      <ReviewsSection />

      <FAQSection questions={faqQuestions} />

      <CertificateSection />

      <SecondForm />

      <Footer />

      {showForm && <Form closeForm={handleCloseForm} />}
    </div>
  );
};

export default WebDevelopment;
