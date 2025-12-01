// cc.js
import { useState, useRef, useEffect } from "react";
import styles from "./CC.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
// Reusing these images, assuming they are generic enough or we'll map them
import architect from "../../../assets/NewCoursesImages/analyst.png"; // Placeholder for Cloud Architect
import devops from "../../../assets/NewCoursesImages/DevOps.png"; // Placeholder for DevOps
import sysadmin from "../../../assets/NewCoursesImages/datascientist.png"; // Placeholder for SysAdmin
import workingproffessional from "../../../assets/NewCoursesImages/workingproffessional.png";
import cloudIcon from "../../../assets/NewCoursesImages/CloudComputing.png"; // Placeholder for Cloud Illustration
import aws from "../../../assets/NewCoursesImages/training.png"; // Placeholder for AWS Icon
import azure from "../../../assets/NewCoursesImages/CC1.png"; // Placeholder for Azure Icon
import gcp from "../../../assets/NewCoursesImages/courses.png"; // Placeholder for GCP Icon
import terraform from "../../../assets/NewCoursesImages/courses2.png"; // Placeholder for Terraform Icon
import kubernetes from "../../../assets/NewCoursesImages/HSIMG.png"; // Placeholder for Kubernetes Icon
import docker from "../../../assets/NewCoursesImages/itservices.png"; // Placeholder for Docker Icon

import {
  statsData,
  heroPhrases,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./CCdata";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Form from "../../form/Form";
import ReviewsSection from "../../reviews/ReviewsSection";
import SecondForm from "../../secondForm/SecondForm";
import StudentCarousel from "../../placement/StudentCarousel";

// Reusing the student images from the original DS page
const rightScrollCards = [
  { image: images.aayushDs },
  { image: images.harmanPreetDs },
  { image: images.mananMangleshDs },
  { image: images.ramanDeepDs },
  { image: images.abhishekDs },
  { image: images.aryanDs },
  { image: images.mohit },
  { image: images.mohitKumarDataScience },
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

const CloudComputing = () => {
  const [showForm, setShowForm] = useState(false);

  // sertificate //
  const [active, setActive] = useState(null);

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

  // Content for the tabs (UPDATED FOR CLOUD)
  const audienceData = {
    students: {
      title: "Aspiring Cloud Engineer/Architect",
      description:
        "Beginners with a curiosity for scalable infrastructure and modern computing models, eager to start a cloud career.",
      image: architect,
    },
    developers: {
      title: "Software Developers/Engineers",
      description:
        "Looking to deploy, manage, and scale applications efficiently using serverless and container technologies in the cloud.",
      image: devops,
    },
    analysts: {
      title: "System Administrators & IT Pros",
      description:
        "Wanting to upgrade skills from on-premise to cloud administration, managing resources in AWS, Azure, or GCP.",
      image: sysadmin,
    },
    professionals: {
      title: "Any Professional",
      description:
        "Seeking to understand cloud infrastructure for better business strategy, cost optimization, and secure operations.",
      image: workingproffessional,
    },
  };

  // Get the content for the currently active tab
  const activeContent = audienceData[activeAudience];

  // --- Helper to prepare syllabus data ---
  const getSyllabusColumns = () => {
    const allTopics = Object.keys(syllabusData);
    const midpoint = Math.ceil(allTopics.length / 2);
    const leftTopics = allTopics.slice(0, midpoint);
    const rightTopics = allTopics.slice(midpoint);
    return { leftTopics, rightTopics };
  };

  // --- NEW Syllabus Accordion State ---
  const [openSyllabusTopic, setOpenSyllabusTopic] = useState(null);

  // Toggle function for syllabus accordion
  const toggleSyllabus = (topic) => {
    setOpenSyllabusTopic(openSyllabusTopic === topic ? null : topic);
  };

  // Prepare the syllabus columns
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
          {/* Replaced Data Science icons with Cloud icons */}
          <img src={aws} alt="AWS" className={styles.html} />
          <img src={azure} alt="Azure" className={styles.css} />
          <img src={gcp} alt="GCP" className={styles.js} />
          <img src={kubernetes} alt="Kubernetes" className={styles.react} />
          <img src={terraform} alt="Terraform" className={styles.bootstrap} />
        </div>

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              Industry-Leading Cloud Computing Course in Chandigarh
              <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Learn to design, deploy, and scale highly available applications on
            the world's leading cloud platforms—AWS, Azure, and GCP—and master
            essential DevOps practices for a top-tier career in cloud
            engineering.
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

      {/* tools section (Updated for Cloud) */}
      <section className={styles.toolsMain}>
        <h1>Key Cloud Technologies</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Amazon Web Services (AWS)</h3>
              <p className={styles.toolDescription}>
                The world's most comprehensive and broadly adopted cloud
                platform, offering over 200 fully featured services from data
                centers globally. Focus on EC2, S3, RDS, and Lambda.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={aws} // Placeholder
                alt="AWS"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={azure} // Placeholder
                alt="Microsoft Azure"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Microsoft Azure</h3>
              <p className={styles.toolDescription}>
                Microsoft's cloud computing service for building, testing,
                deploying, and managing applications and services through
                Microsoft-managed data centers. Focus on VMs, App Services, and
                AD.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Google Cloud Platform (GCP)</h3>
              <p className={styles.toolDescription}>
                A suite of cloud computing services that runs on the same
                infrastructure that Google uses internally for its end-user
                products. Focus on Compute Engine, Kubernetes Engine, and
                BigQuery.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={gcp} // Placeholder
                alt="GCP"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={docker} // Placeholder
                alt="Docker"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Docker</h3>
              <p className={styles.toolDescription}>
                A platform used to develop, ship, and run applications inside
                lightweight, portable containers, crucial for modern cloud
                deployment strategies and microservices.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Kubernetes (K8s)</h3>
              <p className={styles.toolDescription}>
                An open-source system for automating deployment, scaling, and
                management of containerized applications, forming the backbone
                of DevOps in the cloud.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={kubernetes} // Placeholder
                alt="Kubernetes"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={terraform} // Placeholder
                alt="Terraform"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Terraform (IaC)</h3>
              <p className={styles.toolDescription}>
                An open-source Infrastructure as Code (IaC) tool that allows you
                to safely and predictably create, change, and improve
                infrastructure across multiple clouds.
              </p>
            </div>
          </div>
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>

      {/* --- Who is this Course For (Interactive Tabs) --- */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>
          Who is this Cloud Computing Course For?
        </h1>
        <p className={styles.subheading}>
          This course is tailored for anyone looking to enter or advance in the
          Cloud space. Whether you're a developer, an IT professional, or a
          fresh graduate, our program provides the expertise to become a
          certified cloud professional.
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
                <span className={styles.tabIcon}>☁️</span>
                <div>
                  <strong>Aspiring Cloud Engineers</strong>
                  <span className={styles.tabSubtext}>
                    Start your cloud career
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
                  <strong>Developers & Engineers</strong>
                  <span className={styles.tabSubtext}>
                    Master deployment & DevOps
                  </span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "analysts" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("analysts")}
              >
                <span className={styles.tabIcon}>🛠️</span>
                <div>
                  <strong>System Admins & IT Pros</strong>
                  <span className={styles.tabSubtext}>
                    Transition to cloud ops
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
                  <strong>Any Professional</strong>
                  <span className={styles.tabSubtext}>
                    Understand cloud strategy
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* --- RIGHT SECTION: Tab Content --- */}
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

      {/* placemnet */}
      <div>
        <h1 className={styles.storyHeading}>
          Our Success Story in Cloud & DevOps
        </h1>

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

      {/* --- NEW SYLLABUS SECTION (Updated for Cloud) --- */}
      <section className={styles.syllabusSection}>
        <h1 className={styles.syllabusTitle}>
          Cloud Computing Course Syllabus
        </h1>
        <p className={styles.syllabusSubtitle}>
          Our curriculum is designed by certified cloud architects, covering the
          core services of AWS, Azure, and GCP, alongside critical DevOps
          practices like Infrastructure as Code (IaC) and container
          orchestration.
        </p>

        <div className={styles.syllabusGrid}>
          {/* --- Left Column --- */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>
              Core Cloud Concepts & Services
            </h2>
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
            <h2 className={styles.columnTitle}>
              DevOps, Security & Advanced Topics
            </h2>
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
      {/* --- END NEW SYLLABUS SECTION --- */}

      {/* --- projects (Updated for Cloud) --- */}
      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          {/* Heading */}
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              Cloud & DevOps Projects for Your Portfolio
            </h2>
          </div>

          {/* Grid */}
          <div className={styles.projectSectionGrid}>
            {/* Project 1 */}
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🌐</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Serverless Web App Deployment (AWS Lambda)
                </h3>
                <p className={styles.projectSectionDesc}>
                  Designed and deployed a fully functional, low-cost serverless
                  web application using AWS Lambda, API Gateway, and DynamoDB.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>⚙️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  CI/CD Pipeline with Jenkins & Docker
                </h3>
                <p className={styles.projectSectionDesc}>
                  Built an automated Continuous Integration/Continuous
                  Deployment pipeline for an application using Jenkins, Docker,
                  and Kubernetes (EKS).
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className={`${styles.projectSectionCard} ${styles.project3}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📜</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Infrastructure as Code (IaC) with Terraform
                </h3>
                <p className={styles.projectSectionDesc}>
                  Wrote declarative Terraform code to provision and manage a
                  complete three-tier application infrastructure on Azure (VNet,
                  VMs, DB).
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🔒</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Cloud Security Audit & IAM Hardening
                </h3>
                <p className={styles.projectSectionDesc}>
                  Performed cloud security assessments, IAM policy hardening,
                  authentication improvements, and network isolation policies
                  across a GCP environment.
                </p>
              </div>
            </div>

            {/* Project 5 */}
            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📊</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Cloud Data Warehouse ETL Pipeline
                </h3>
                <p className={styles.projectSectionDesc}>
                  Set up a scalable ETL pipeline using AWS Glue/Azure Data
                  Factory to transform raw data and load it into a cloud data
                  warehouse (Redshift/BigQuery).
                </p>
              </div>
            </div>

            {/* Project 6 */}
            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>📈</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Auto-Scaling & High Availability
                </h3>
                <p className={styles.projectSectionDesc}>
                  Configured auto-scaling groups, load balancers, and
                  multi-region deployment to ensure a web service achieves
                  99.99% uptime.
                </p>
              </div>
            </div>

            {/* Project 7 */}
            <div className={`${styles.projectSectionCard} ${styles.project7}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>💰</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Cloud Cost Optimization Model
                </h3>
                <p className={styles.projectSectionDesc}>
                  Analyzed cloud usage reports to identify and implement
                  cost-saving strategies, such as resource scheduling and
                  reserved instances.
                </p>
              </div>
            </div>

            {/* Project 8 */}
            <div className={`${styles.projectSectionCard} ${styles.project8}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🩺</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Cloud Monitoring & Alerting Setup
                </h3>
                <p className={styles.projectSectionDesc}>
                  Configured CloudWatch/Azure Monitor to track key metrics and
                  set up automated alerting for critical resource utilization
                  thresholds.
                </p>
              </div>
            </div>

            {/* Project 9 */}
            <div className={`${styles.projectSectionCard} ${styles.project9}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🚀</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Blue/Green Deployment Strategy
                </h3>
                <p className={styles.projectSectionDesc}>
                  Implemented a zero-downtime deployment strategy for rolling
                  out new application versions on a Kubernetes cluster.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* achievers */}
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
          {/* Aayush - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "nisha" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("nisha")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.aayushDs}
              className={styles.appFeatureImage}
              alt="Aayush"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "nisha" && (
                <p className={styles.appFeatureText}>
                  “The cloud is the new operating system—master it to master
                  technology's future.”
                </p>
              )}
            </div>
          </div>

          {/* Abhishek - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "parmeet" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("parmeet")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.abhishekDs}
              className={styles.appFeatureImage}
              alt="Abhishek"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "parmeet" && (
                <p className={styles.appFeatureText}>
                  “Continuous integration leads to continuous career
                  advancement.”
                </p>
              )}
            </div>
          </div>

          {/* Aryan - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "raghav" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("raghav")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.aryanDs}
              className={styles.appFeatureImage}
              alt="Aryan"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "raghav" && (
                <p className={styles.appFeatureText}>
                  “Scaling applications is easy once you know how to scale your
                  knowledge.”
                </p>
              )}
            </div>
          </div>

          {/* Harmanpreet - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "rupalpreet" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("rupalpreet")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.harmanPreetDs}
              className={styles.appFeatureImage}
              alt="Harmanpreet"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "rupalpreet" && (
                <p className={styles.appFeatureText}>
                  “DevOps is a mindset, and this course gave me the tools to
                  execute it.”
                </p>
              )}
            </div>
          </div>

          {/* Manan Manglesh - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "shubham" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("shubham")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.mananMangleshDs}
              className={styles.appFeatureImage}
              alt="Manan Manglesh"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "shubham" && (
                <p className={styles.appFeatureText}>
                  “From zero to certified Cloud Architect in months—the guidance
                  here is top-notch.”
                </p>
              )}
            </div>
          </div>

          {/* Mohit Kumar - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "app" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("app")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.mohitKumarDataScience}
              className={styles.appFeatureImage}
              alt="Mohit Kumar"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "app" && (
                <p className={styles.appFeatureText}>
                  “Innovate with data, create with code, and build your
                  tomorrow.”
                </p>
              )}
            </div>
          </div>

          {/* Raman Deep - Data Science */}
          <div
            className={`${styles.appFeatureCard} ${
              active === "marketing" ? styles.active : ""
            }`}
            onMouseEnter={() => setActive("marketing")}
            onMouseLeave={() => setActive(null)}
          >
            <img
              src={images.ramanDeepDs}
              className={styles.appFeatureImage}
              alt="Raman Deep"
            />
            <div className={styles.appFeatureOverlay}>
              {active === "marketing" && (
                <p className={styles.appFeatureText}>
                  “Cloud knowledge is the single most valuable skill in today's
                  IT landscape.”
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
          {careerOpportunities.map((service, index) => {
            // Define icons for each career opportunity
            const icons = [
              "🏗️", // Cloud Architect
              "💻", // AWS/Azure/GCP Engineer
              "♾️", // Cloud DevOps Engineer
              "🛡️", // Cloud Security Specialist
              "💾", // Cloud Data Engineer
              "💡", // Cloud Consultant
            ];
            const icon = icons[index] || "💼"; // Default icon if none specified

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

      {/* why choose us section  */}

      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER CLOUD & DEVOPS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For Cloud Computing Course
            In Mohali?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>Cloud and DevOps Training</strong> and guarantees 100%
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
            <img src={cloudIcon} alt="Cloud Illustration" /> {/* Placeholder */}
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
              Costs. We Empower Driven Individuals Like You to Shape Their Read
              20 articles Future by Teaching Skills That Every Sector Seeks.
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
          <img src={images.abhishekDs} alt="Certificate Sample1" />
          <img src={images.aryanDs} alt="Certificate Sample2" />
          <img src={images.harmanPreetDs} alt="Certificate Sample3" />
          <img src={images.mananMangleshDs} alt="Certificate Sample4" />
        </div>
      </section>

      <SecondForm />

      <Footer />
    </div>
  );
};
export default CloudComputing;
