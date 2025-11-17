import React, { useState, useEffect, useRef } from "react";
import styles from "./ML.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import Form from "../../form/Form";
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
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Certification from "../../Certification/Certification";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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

const MachineLearning = () => {
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

  // Syllabus tab
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

      {/* Hero Section */}

      <section className={styles.webDesigningHeroSection}>
        <div className={styles.overlay}>
          <SiPython className={styles.html} color="#3776AB" />
          <SiTensorflow className={styles.css} color="#FF6F00" />
          <SiKeras className={styles.js} color="#D00000" />
          <SiNumpy className={styles.react} color="#013243" />
          <SiPandas className={styles.bootstrap} color="#150458" />
        </div>

        {/* <div className={styles.webDesigning}>
                <img src={images.knowledgeHeroImage} alt="background" className={styles.webDesigningBgImage} />
              </div> */}

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              Machine Learning Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our Machine Learning Course is designed to provide hands-on training
            with real-world tools and techniques.
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

      {/*Tool*/}
      <section className={styles.toolsMain}>
        <h1>Tools</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Python</h3>
              <p className={styles.toolDescription}>
                Python is the primary programming language used in machine
                learning due to its simplicity, versatility, and extensive
                libraries.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiPython size={60} color="#3776AB" className={styles.toolName} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiTensorflow
                size={60}
                color="#FF6F00"
                className={styles.toolName}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>TensorFlow</h3>
              <p className={styles.toolDescription}>
                TensorFlow is an open-source framework by Google, widely used
                for developing and training deep learning and AI models.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Keras</h3>
              <p className={styles.toolDescription}>
                Keras is a high-level neural network API that runs on top of
                TensorFlow, enabling fast experimentation and model building.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiKeras size={60} color="#D00000" className={styles.toolName} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiNumpy size={60} color="#013243" className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>NumPy</h3>
              <p className={styles.toolDescription}>
                NumPy is essential for numerical computations and forms the base
                of many machine learning workflows through array manipulation.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Pandas</h3>
              <p className={styles.toolDescription}>
                Pandas simplifies data analysis and manipulation using its
                intuitive dataframes, making data cleaning effortless in ML.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiPandas size={60} color="#150458" className={styles.toolName} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiScikitlearn
                size={60}
                color="#F7931E"
                className={styles.toolName}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Scikit-Learn</h3>
              <p className={styles.toolDescription}>
                Scikit-Learn offers a wide range of simple and efficient tools
                for data mining, classification, and model evaluation.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Matplotlib</h3>
              <p className={styles.toolDescription}>
                Matplotlib allows you to create static, animated, and
                interactive visualizations — essential for data exploration in
                ML.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <SiPlotly size={60} color="#3F4F75" className={styles.toolName} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiJupyter
                size={60}
                color="#F37626"
                className={styles.toolName}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Jupyter Notebook</h3>
              <p className={styles.toolDescription}>
                Jupyter Notebook is an open-source web application that lets you
                write and share code, visualizations, and documentation.
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
          Who Can Join Our Machine Learning Course?
        </h1>
        <p className={styles.subheading}>
          Our <strong>Machine Learning course</strong> is designed for everyone
          — whether you're a student curious about AI, a graduate eager for
          high-paying tech roles, a working professional looking to upskill, a
          freelancer seeking data-driven projects, or an entrepreneur aiming to
          implement intelligent systems — this course welcomes all. No prior ML
          experience required, just your passion to learn and innovate.
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
                    Discover AI early! Build strong foundations in coding,
                    logic, and data analysis — opening doors to internships and
                    tech-based careers from the start.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Graduates / Job Seekers</strong>
                    <br />
                    Gain industry-relevant ML skills and hands-on experience
                    with tools like Python, TensorFlow, and Pandas to qualify
                    for roles in Data Science, AI, and Analytics.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Freelancers & Entrepreneurs</strong>
                    <br />
                    Add ML to your service offerings. Build intelligent
                    applications, automate tasks, and bring data-driven
                    decisions into your freelance or startup workflow.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Working Professionals (Upskilling)</strong>
                    <br />
                    Step into the future of tech. Switch to machine learning
                    roles or bring AI-powered improvements to your existing job,
                    increasing impact and salary potential.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.rightSection}>
            <img
              src={images.willGet}
              alt="ML Training Roadmap"
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

      {/* Syllabus Section */}
      <div className={styles.syllabusContainer}>
        <h1>What Will Our Trainees Learn In Machine Learning Training</h1>
        <p>
          Explore our <strong>Machine Learning training course</strong>{" "}
          curriculum to know exactly what skills you will gain. Ziion Technology
          is one of India’s leading industrial training institutes, offering
          comprehensive training
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
        <div className={styles.appFeatureContainer}>
          <div
            className={`${styles.appFeatureCard} ${
              active === "web" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("web")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.rubalPreetKaurMl}
              className={styles.appFeatureImage}
              alt="Web Development"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "web" && (
                <p className={styles.appFeatureText}>
                  Build modern, responsive websites with custom functionality
                  and design.
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "web" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("web")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.muskanMl}
              className={styles.appFeatureImage}
              alt="Web Development"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "web" && (
                <p className={styles.appFeatureText}>
                  Build modern, responsive websites with custom functionality
                  and design.
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "web" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("web")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.jashandeepMl}
              className={styles.appFeatureImage}
              alt="Web Development"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "web" && (
                <p className={styles.appFeatureText}>
                  Build modern, responsive websites with custom functionality
                  and design.
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "web" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("web")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.harshMl}
              className={styles.appFeatureImage}
              alt="Web Development"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "web" && (
                <p className={styles.appFeatureText}>
                  Build modern, responsive websites with custom functionality
                  and design.
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "web" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("web")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.harnoorMl}
              className={styles.appFeatureImage}
              alt="Web Development"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "web" && (
                <p className={styles.appFeatureText}>
                  Build modern, responsive websites with custom functionality
                  and design.
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
              src={images.arshdeepSinghMl}
              className={styles.appFeatureImage}
              alt="Mobile App Development"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "app" && (
                <p className={styles.appFeatureText}>
                  Create user-friendly apps for Android and iOS platforms with
                  top performance.
                </p>
              )}
            </div>
          </div>

          <div
            className={`${styles.appFeatureCard} ${
              active === "marketing" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("marketing")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.arshdeepMl}
              className={styles.appFeatureImage}
              alt="Digital Marketing"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "marketing" && (
                <p className={styles.appFeatureText}>
                  Grow your brand with SEO, social media marketing, and paid
                  campaigns.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <div className={styles.carerrOpportunities}>
        <h2 className={styles.opportunitiesheading}>
          💼 Career <span>Opportunities</span> After This Course
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

      {/* Why Choose Us */}
      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For Machine Learning
            Training?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Learn from industry experts with job-ready skills and projects.
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

      {/* FAQ Section */}
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
          <img src={images.devagyaPy} alt="Certificate Sample1" />
          <img src={images.gurshanPy} alt="Certificate Sample2" />
          <img src={images.rubalPreetKaurMl} alt="Certificate Sample3" />
          <img src={images.harnoorMl} alt="Certificate Sample4" />
        </div>
      </section>

      <SecondForm />

      <Footer />
    </div>
  );
};

export default MachineLearning;
