// Devops.js
import { useState, useRef, useEffect } from "react";
import styles from "./Devops.module.css"; // *** UPDATED CSS IMPORT ***
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
// Reusing Cloud/Generic images as placeholders
import architect from "../../../assets/NewCoursesImages/analyst.png";
import devops from "../../../assets/NewCoursesImages/DevOps.png";
import sysadmin from "../../../assets/NewCoursesImages/datascientist.png";
import workingproffessional from "../../../assets/NewCoursesImages/workingproffessional.png";
import devopsIcon from "../../../assets/NewCoursesImages/CloudComputing.png"; // Placeholder for Devops Illustration
import git from "../../../assets/NewCoursesImages/training.png"; // Placeholder for Git/Tools Icon
import jenkins from "../../../assets/NewCoursesImages/CC1.png"; // Placeholder for Jenkins Icon
import dockerIcon from "../../../assets/NewCoursesImages/itservices.png"; // Placeholder for Docker Icon
import terraform from "../../../assets/NewCoursesImages/courses2.png"; // Placeholder for Terraform Icon
import kubernetesIcon from "../../../assets/NewCoursesImages/HSIMG.png"; // Placeholder for Kubernetes Icon

import {
  statsData,
  heroPhrases,
  chooseUsLeftItems,
  chooseUsRightItems,
  careerOpportunities,
  faqQuestions,
  syllabusData,
  leftScrollCards,
} from "./Devopsdata"; // *** UPDATED DATA IMPORT ***
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

const Devops = () => {
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

  // Content for the tabs (UPDATED FOR DEVOPS)
  const audienceData = {
    students: {
      title: "Aspiring DevOps Engineer/SRE",
      description:
        "Beginners eager to master automation, CI/CD pipelines, and infrastructure management to build robust deployment systems.",
      image: architect, // Reusing analyst.png placeholder
    },
    developers: {
      title: "Software Developers/Engineers",
      description:
        "Looking to integrate development and operations, automate testing, and deploy code quickly and reliably using modern DevOps tools.",
      image: devops, // Reusing DevOps.png placeholder
    },
    analysts: {
      title: "System Administrators & IT Pros",
      description:
        "Wanting to transition from manual operations to automated, scalable infrastructure using Infrastructure as Code (IaC) and configuration management.",
      image: sysadmin, // Reusing datascientist.png placeholder
    },
    professionals: {
      title: "Any Professional",
      description:
        "Seeking to drive efficiency, collaboration, and continuous improvement within their organization's technology delivery lifecycle.",
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
          {/* DevOps Icons */}
          <img src={git} alt="Git" className={styles.html} />
          <img src={jenkins} alt="Jenkins" className={styles.css} />
          <img src={dockerIcon} alt="Docker" className={styles.js} />
          <img src={kubernetesIcon} alt="Kubernetes" className={styles.react} />
          <img src={terraform} alt="Terraform" className={styles.bootstrap} />
        </div>

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span
              className={`${styles.webDesigningFalldown} ${styles.gradientText}`}
            >
              Expert DevOps Engineering Course in Chandigarh
              <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Master the art of **Continuous Integration and Continuous Delivery
            (CI/CD)**, automate infrastructure using **Infrastructure as Code
            (IaC)**, and drive a culture of collaboration and speed for modern
            software delivery.
          </h2>
          <button
            className={styles.herobutton}
            onClick={() => setShowForm(true)}
          >
            Talk to us
          </button>
        </div>
      </section>

      {/* Render the form as a modal at the component level */}
      {showForm && <Form closeForm={() => setShowForm(false)} />}

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

      {/* tools section (Updated for DevOps) */}
      <section className={styles.toolsMain}>
        <h1>Essential DevOps Toolchain</h1>
        <div className={styles.webdevtoolsContainer}>
          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Docker & Containers</h3>
              <p className={styles.toolDescription}>
                Learn to package applications and their dependencies into
                portable containers for consistent environments from development
                to production.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={dockerIcon}
                alt="Docker"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={kubernetesIcon}
                alt="Kubernetes"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Kubernetes (K8s)</h3>
              <p className={styles.toolDescription}>
                Master the leading container orchestration platform to automate
                deployment, scaling, and management of containerized workloads
                at scale in cloud environments.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Jenkins / GitLab CI</h3>
              <p className={styles.toolDescription}>
                Build robust Continuous Integration (CI) and Continuous Delivery
                (CD) pipelines to automate the software release process,
                ensuring rapid and reliable deployments.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={jenkins}
                alt="Jenkins"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={terraform}
                alt="Terraform"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Terraform (IaC)</h3>
              <p className={styles.toolDescription}>
                Implement Infrastructure as Code (IaC) to provision and manage
                cloud infrastructure (AWS, Azure, GCP) safely and efficiently
                using human-readable configuration files.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Ansible</h3>
              <p className={styles.toolDescription}>
                A simple yet powerful automation engine for application
                deployment, configuration management, and orchestration,
                centralizing control over environments.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={sysadmin} // Placeholder image for configuration tool
                alt="Ansible"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img
                src={git} // Placeholder image for version control
                alt="Git"
                className={styles.webdevtoolsFeatureImg}
              />
            </div>
            <div className={styles.textBlock}>
              <h3 className={styles.title}>Git & Version Control</h3>
              <p className={styles.toolDescription}>
                Understand distributed version control for collaborative
                development, ensuring traceability, code integrity, and seamless
                merging in a team environment.
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
          Who is this DevOps Engineering Course For?
        </h1>
        <p className={styles.subheading}>
          This course is designed for professionals ready to automate and
          streamline the entire software delivery pipeline, accelerating
          development and operations.
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
                <span className={styles.tabIcon}>⚙️</span>
                <div>
                  <strong>Aspiring DevOps Engineers</strong>
                  <span className={styles.tabSubtext}>
                    Build your first pipeline
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
                  <strong>Developers</strong>
                  <span className={styles.tabSubtext}>
                    Automate deployment & testing
                  </span>
                </div>
              </button>
              <button
                className={`${styles.audienceTab} ${
                  activeAudience === "analysts" ? styles.active : ""
                }`}
                onClick={() => setActiveAudience("analysts")}
              >
                <span className={styles.tabIcon}>☁️</span>
                <div>
                  <strong>System Admins & IT Pros</strong>
                  <span className={styles.tabSubtext}>
                    Move to IaC and Cloud Ops
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
                  <strong>Engineering Managers</strong>
                  <span className={styles.tabSubtext}>
                    Lead faster, reliable delivery
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
          Our Success Story in DevOps & Automation
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

      {/* --- NEW SYLLABUS SECTION (Updated for DevOps) --- */}
      <section className={styles.syllabusSection}>
        <h1 className={styles.syllabusTitle}>
          DevOps Engineering Course Syllabus
        </h1>
        <p className={styles.syllabusSubtitle}>
          Our expert-led curriculum covers the full DevOps lifecycle, from
          containerization and infrastructure automation to robust CI/CD
          pipelines and advanced monitoring techniques.
        </p>

        <div className={styles.syllabusGrid}>
          {/* --- Left Column --- */}
          <div className={styles.syllabusColumn}>
            <h2 className={styles.columnTitle}>
              Foundation & Automation Tools
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
              CI/CD, Orchestration & Observability
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

      {/* --- projects (Updated for DevOps) --- */}
      <div className={styles.projectBackModal}>
        <section className={styles.projectSection}>
          {/* Heading */}
          <div className={styles.projectSectionHeader}>
            <h2 className={styles.projectSectionHeading}>
              Real-World DevOps Projects & Automation
            </h2>
          </div>

          {/* Grid */}
          <div className={styles.projectSectionGrid}>
            {/* Project 1 */}
            <div className={`${styles.projectSectionCard} ${styles.project1}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>♾️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Full CI/CD Pipeline on Jenkins/GitLab
                </h3>
                <p className={styles.projectSectionDesc}>
                  Set up an end-to-end pipeline to automatically build, test,
                  containerize (Docker), and deploy a web application to a
                  staging environment.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className={`${styles.projectSectionCard} ${styles.project2}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>☸️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Kubernetes Cluster & Application Deployment
                </h3>
                <p className={styles.projectSectionDesc}>
                  Provisioned a Kubernetes cluster (EKS/AKS/GKE) using IaC and
                  deployed a multi-service application, managed using services,
                  secrets, and config maps.
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
                  Cloud Infrastructure Provisioning (Terraform)
                </h3>
                <p className={styles.projectSectionDesc}>
                  Used Terraform to define and manage a complete, repeatable
                  cloud infrastructure stack, including VPC, subnets, EC2
                  instances, and security groups.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className={`${styles.projectSectionCard} ${styles.project4}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>💾</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Ansible Configuration Management
                </h3>
                <p className={styles.projectSectionDesc}>
                  Created Ansible playbooks to automatically install and
                  configure common software (web servers, databases) on a fleet
                  of remote servers.
                </p>
              </div>
            </div>

            {/* Project 5 */}
            <div className={`${styles.projectSectionCard} ${styles.project5}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🛡️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  DevSecOps: Static Application Security Testing (SAST)
                </h3>
                <p className={styles.projectSectionDesc}>
                  Integrated security scanning tools (like SonarQube or similar)
                  directly into the CI pipeline to catch vulnerabilities early.
                </p>
              </div>
            </div>

            {/* Project 6 */}
            <div className={`${styles.projectSectionCard} ${styles.project6}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🔔</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Monitoring & Logging Stack (Prometheus/Grafana)
                </h3>
                <p className={styles.projectSectionDesc}>
                  Deployed a centralized logging and monitoring system to track
                  application metrics, server health, and trigger alerts on
                  anomalies.
                </p>
              </div>
            </div>

            {/* Project 7 */}
            <div className={`${styles.projectSectionCard} ${styles.project7}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🔄</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Advanced Deployment Strategy (Canary/Blue-Green)
                </h3>
                <p className={styles.projectSectionDesc}>
                  Implemented a risk-mitigating deployment model (e.g., Canary
                  or Blue/Green) on a cloud environment to achieve zero-downtime
                  releases.
                </p>
              </div>
            </div>

            {/* Project 8 */}
            <div className={`${styles.projectSectionCard} ${styles.project8}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>☁️</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Serverless CI/CD using AWS Code Services
                </h3>
                <p className={styles.projectSectionDesc}>
                  Set up a purely serverless pipeline using AWS CodeCommit,
                  CodeBuild, and CodeDeploy, deploying code to Lambda or ECS.
                </p>
              </div>
            </div>

            {/* Project 9 */}
            <div className={`${styles.projectSectionCard} ${styles.project9}`}>
              <div className={styles.projectSectionIconWrapper}>
                <div className={styles.projectSectionIcon}>🐍</div>
              </div>
              <div className={styles.projectSectionContent}>
                <h3 className={styles.projectSectionTitle}>
                  Python Automation for Health Checks & Reporting
                </h3>
                <p className={styles.projectSectionDesc}>
                  Wrote Python scripts to periodically check application health,
                  generate automated status reports, and integrate with
                  notification systems.
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
                  “DevOps isn't just tools; it's a culture of speed and shared
                  responsibility that this course instilled in me.”
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
                  “Mastering automation has unlocked complex system management
                  and a high-paying career.”
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
                  “The hands-on work with Kubernetes and Terraform made me
                  job-ready from day one.”
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
                  “From manual deployments to fully automated pipelines—the
                  skill gap was bridged perfectly here.”
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
                  “I gained confidence in solving real production problems,
                  thanks to the strong focus on SRE principles.”
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
                  “Learning DevSecOps integration made my profile stand out in
                  the competitive IT job market.”
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
                  “The deep dive into monitoring and logging transformed how I
                  approach system reliability.”
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
              "🛠️", // DevOps Engineer
              "🔭", // SRE
              "☁️", // Cloud DevOps Engineer
              "🤖", // Automation Engineer
              "⚙️", // CI/CD Specialist
              "🔒", // DevSecOps Engineer
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
          <p className={styles.whychooseusTagline}>MASTER CI/CD & AUTOMATION</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For DevOps Course In
            Mohali?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills
            in <strong>DevOps and Cloud Automation Training</strong> and
            guarantees 100% job assistance in the industry.
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
            <img src={devopsIcon} alt="DevOps Illustration" />{" "}
            {/* Placeholder */}
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
export default Devops;
