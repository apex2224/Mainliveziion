import React, { useState, useEffect, useRef } from "react";
import styles from "./mobileApp.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import tenPlusTwoImage from "../../../assets/NewCoursesImages/10+2.png";
import jobseeker from "../../../assets/NewCoursesImages/jobseeker.png";
import freelancer from "../../../assets/NewCoursesImages/freelancer.png";
import workingproffessional from "../../../assets/NewCoursesImages/workingproffessional.png";
import mobiledev from "../../../assets/NewCoursesImages/mobiledev.png";

import {
  heroPhrases,
  statsData,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./mobileAppdata";
import EnrollProcess from "../ProcessSection/EnrollProcess";
// import Certification from "../../Certification/Certification"; // Certification component is not used here
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Form from "../../form/Form";
import {
  SiAndroidstudio,
  SiXcode,
  SiReact,
  SiFlutter,
  SiFirebase,
} from "react-icons/si";
import ReviewsSection from "../../reviews/ReviewsSection";
import SecondForm from "../../secondForm/SecondForm";
import StudentCarousel from "../../placement/StudentCarousel";

// Data for the image/photo half of the new combined carousel
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

const MobileApp = () => {
  const [showForm, setShowForm] = useState(false);
  const typedOutput = useCustomTypewriter(heroPhrases);

  // FAQ toggle
  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

  // --- State for 'Who Can Join' tabs ---
  const [activeAudience, setActiveAudience] = useState("students");

  // Content for the 'Who Can Join' tabs
  const audienceData = {
    students: {
      title: "For Students (10th/12th Pass)",
      description:
        "Step into the world of mobile technology! Learn to build basic Android/iOS apps and open the door to tech internships and junior developer roles.",
      image: tenPlusTwoImage,
    },
    graduates: {
      title: "For Graduates / Job Seekers",
      description:
        "Stand out in interviews by adding mobile app development to your skillset. Master real tools like React Native, Flutter, and Android Studio to land roles in tech.",
      image: jobseeker,
    },
    freelancers: {
      title: "For Freelancers & Entrepreneurs",
      description:
        "Launch your own mobile apps or take on freelance app development projects. Build solutions for your business or clients using cutting-edge tools.",
      image: freelancer,
    },
    professionals: {
      title: "For Working Professionals (Upskilling)",
      description:
        "Broaden your expertise by adding mobile development to your resume. Shift into app-centric roles or build internal tools and apps for your company.",
      image: workingproffessional,
    },
  };

  const activeContent = audienceData[activeAudience];

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

  // --- NEW UNIFIED PLACEMENT CAROUSEL ---
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      // Calculate scroll amount based on card width
      // We'll use the first card's width as a reference
      const card = carouselRef.current.querySelector(
        `.${styles.placementCard}`
      );
      if (card) {
        const scrollAmount = card.offsetWidth + 24; // 24px gap
        carouselRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <section className={styles.webDesigningHeroSection}>
        {/* Using the page-specific icons from your JS file */}
        <div className={styles.overlay}>
          <SiAndroidstudio className={styles.html} />
          <SiXcode className={styles.css} />
          <SiReact className={styles.js} />
          <SiFlutter className={styles.react} />
          <SiFirebase className={styles.bootstrap} />
        </div>

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              Mobile App Development Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our Mobile App Course provides hands-on experience with Android,
            iOS, and cross-platform tools like Flutter and React Native.
          </h2>
          <button
            className={styles.herobutton}
            onClick={() => setShowForm(true)}
          >
            Talk to us
          </button>
          {showForm && <Form closeForm={() => setShowForm(false)} />}{" "}
        </div>
      </section>

      {/*Stat Section*/}
      <div className={styles.statsWrapper}>
        {statsData.map((stat, index) => (
          <div className={styles.statCircle} key={index}>
            {/* <div className={styles.rotatingRing}></div> */}
            <div className={styles.statContent}>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tool Section - Mobile App Development Focused */}
      <section className={styles.toolsMain}>
        <h1>Tools You Will Master</h1>
        <div className={styles.webdevtoolsContainer}>
          {/* Card 1: Android Studio */}
          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiAndroidstudio size={50} className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Android Studio</h3>
              <p className={styles.description}>
                The official IDE for building, testing, and debugging native
                Android applications.
              </p>
            </div>
          </div>

          {/* Card 2: Xcode */}
          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiXcode size={50} className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Xcode</h3>
              <p className={styles.description}>
                Apple's official IDE for creating native applications for
                iPhone, iPad, and all Apple devices.
              </p>
            </div>
          </div>

          {/* Card 3: React Native */}
          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiReact size={50} className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>React Native</h3>
              <p className={styles.description}>
                A popular JavaScript framework for building cross-platform
                mobile apps from a single codebase.
              </p>
            </div>
          </div>

          {/* Card 4: Flutter */}
          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <SiFlutter size={50} className={styles.toolName} />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Flutter</h3>
              <p className={styles.description}>
                Google's UI toolkit for building natively compiled, beautiful
                apps for mobile, web, and desktop.
              </p>
            </div>
          </div>
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* --- Who is this Course For? (Interactive Tabs) --- */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>Who is this Course For?</h1>
        <p className={styles.subheading}>
          Our Mobile App Development course is designed for anyone passionate
          about building mobile apps. This course welcomes you.
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
                  <strong>Students (10th/12th Pass)</strong>
                  <span className={styles.tabSubtext}>
                    Start your tech journey
                  </span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "graduates" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("graduates")}
              >
                <span className={styles.tabIcon}>💼</span>
                <div>
                  <strong>Graduates / Job Seekers</strong>
                  <span className={styles.tabSubtext}>Become job-ready</span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "freelancers" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("freelancers")}
              >
                <span className={styles.tabIcon}>🚀</span>
                <div>
                  <strong>Freelancers & Entrepreneurs</strong>
                  <span className={styles.tabSubtext}>
                    Build your own vision
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
                    Upskill for the future
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* --- RIGHT SECTION: Tab Content --- */}
          <div className={styles.rightSection}>
            <div className={styles.audienceContentPane} key={activeAudience}>
              <div className={styles.imageContainer}>
                <img
                  src={activeContent.image}
                  alt={activeContent.title}
                  className={styles.whatlearnimg}
                />
              </div>
              <h3 className={styles.contentTitle}>{activeContent.title}</h3>
              <p className={styles.contentDescription}>
                {activeContent.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <EnrollProcess />

      {/* --- REDESIGNED PLACEMENT SECTION (Combined Carousel) --- */}
      <section className={styles.placementSection}>
        <h1 className={styles.storyHeading}>Our Placed Students</h1>
        <p className={styles.syllabusSubtitle}>
          See where our students are working. We combine images of our
          successful graduates with video testimonials.
        </p>
        <div className={styles.placementCarouselWrapper}>
          <button
            className={`${styles.carouselBtn} ${styles.prevBtn}`}
            onClick={() => handleScroll("left")}
          >
            <FaArrowLeft />
          </button>
          <div className={styles.placementCarousel} ref={carouselRef}>
            {/* Map over Images */}
            {rightScrollCards.map((item, i) => (
              <div key={`img-${i}`} className={styles.placementCard}>
                <img
                  src={item.image}
                  alt="Placed Student"
                  className={styles.placementImage}
                />
              </div>
            ))}
            {/* Map over Videos */}
            {leftScrollCards.map((item, i) => (
              <div key={`vid-${i}`} className={styles.placementCard}>
                <iframe
                  src={item.iframe}
                  className={styles.placementIframe}
                  title={`video-${i}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
                <div className={styles.placementInfo}>
                  <h4 className={styles.leftProfileSection}>{item.name}</h4>
                  <p className={styles.leftCompanySection}>{item.company}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`${styles.carouselBtn} ${styles.nextBtn}`}
            onClick={() => handleScroll("right")}
          >
            <FaArrowRight />
          </button>
        </div>
      </section>

      <StudentCarousel />

      {/* --- SYLLABUS ACCORDION SECTION --- */}
      <section className={styles.syllabusSection}>
        <h1 className={styles.syllabusTitle}>
          Mobile App Development Course Syllabus
        </h1>
        <p className={styles.syllabusSubtitle}>
          Our syllabus is designed by industry experts to take you from a
          beginner to a job-ready mobile app developer, covering everything from
          fundamentals to advanced cross-platform development.
        </p>

        <div className={styles.syllabusGrid}>
          {/* --- Left Column --- */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>Core Concepts & Native</h2>
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
            <h2 className={styles.columnTitle}>Cross-Platform & Advanced</h2>
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
      {/* --- END SYLLABUS SECTION --- */}

      {/* career opportunities */}
      <div className={styles.carerrOpportunities}>
        <h2 className={styles.opportunitiesHeading}>
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
            Why Choose <span>Ziion Technology</span> For Mobile App Development?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>App Development</strong> and guarantees 100% job
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
            <img src={mobiledev} alt="Graduate Illustration" />
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

      <SecondForm />
      <Footer />
    </div>
  );
};
export default MobileApp;
