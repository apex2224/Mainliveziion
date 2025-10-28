import { useState } from "react";
import styles from "./ProjectShow.module.css";
import { useInView } from "react-intersection-observer";
import Form from "../../../form/Getdemo"; // Import the form component

// --- Make sure the path to your images is correct ---
import AI_ML from "../../../../assets/ProjectImages/AI_ML.jpg";
import googleadd from "../../../../assets/ProjectImages/googleadd.jpg";
import datascience from "../../../../assets/ProjectImages/datascience.jpg";
import mern from "../../../../assets/ProjectImages/mern.jpg";
// Make sure you have added this image to your assets folder
import mobiledev from "../../../../assets/ProjectImages/mobiledev.jpg";

// --- ICONS ---
const CartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <circle cx="9" cy="21" r="1"></circle>{" "}
    <circle cx="20" cy="21" r="1"></circle>{" "}
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>{" "}
  </svg>
);
const AdIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
  </svg>
);
const BotIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4v-4h-4a4 4 0 0 1-4-4z"></path>
    <path d="M20 12h-4a4 4 0 0 1-4-4V4"></path>
  </svg>
);
const DataIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18"></path>
    <path d="M18.7 8.3c-1.5-1-3.5-1.3-5.2-.6"></path>
    <path d="M13.3 12.9c-1.5 1-3.5 1.3-5.2 .6"></path>
    <path d="M8 17.5c-1.5 1-3.5 1.3-5.2 .6"></path>
  </svg>
);
const MobileIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
);

// --- Project Data Array (CONTENT UPDATED) ---
const projectsData = [
  {
    icon: <BotIcon />,
    title: "Chatbot",
    description:
      "Build an AI-powered chatbot that can answer customer queries automatically using NLP (Natural Language Processing).",
    techStack: "Python, TensorFlow, NLTK, Flask",
    coreFeature: "Natural Language Processing (NLP) & Intent Recognition.",
    buttonText: "Live Demo",
    buttonType: "demo",
    imageUrl: AI_ML,
  },
  {
    icon: <AdIcon />,
    title: "Google Ads",
    description:
      "Technologies: Google Analytics,Google Tag Manager, Google Data Studio (Looker Studio),Google Keyword Planner",
    techStack: "Google Ads, Analytics, Tag Manager, Looker Studio",
    coreFeature: "Campaign Setup, A/B Testing & Conversion Tracking.",
    buttonText: "Live Demo",
    buttonType: "demo",
    imageUrl: googleadd,
  },
  {
    icon: <DataIcon />,
    title: " Real-World Data Collection",
    description:
      "Collected real-world datasets from sources such as Kaggle, company databases, and APIs for analysis.",
    techStack: "Python, Pandas, NumPy, Matplotlib, Scikit-learn",
    coreFeature: "Data Cleaning, Exploratory Data Analysis (EDA) & Visualization.",
    buttonText: "Live Demo",
    buttonType: "demo",
    imageUrl: datascience,
  },
  {
    icon: <CartIcon />,
    title: " E-commerce Platform",
    description:
      "Engineered a responsive e-commerce solution with secure user authentication, dynamic product catalogs, and an integrated stripe payment gateway for seamless transactions..",
    techStack: "MongoDB, Express.js, React, Node.js (MERN)",
    coreFeature: "RESTful API, JWT Authentication & Payment Gateway.",
    buttonText: "Live Demo",
    buttonType: "demo",
    imageUrl: mern,
  },
  {
    icon: <MobileIcon />,
    title: "Mobile App Development",
    description:
      "Developed a cross-platform mobile application for both iOS and Android from a single codebase, featuring native performance and access to device APIs.",
    techStack: "React Native, Expo, Firebase, React Navigation",
    coreFeature: "Cross-Platform (iOS/Android) UI & Firebase Auth/Firestore.",
    buttonText: "Live Demo",
    buttonType: "demo",
    imageUrl: mobiledev,
  },
];

// --- Animated Card Component ---
const AnimatedProjectCard = ({ project, index, onDemoClick }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const handleClick = () => {
    if (project.buttonType === "demo") {
      onDemoClick(project); // Open form for demo buttons
    } else if (project.buttonType === "source") {
      // In a real app, you would have different links for each project
      window.open("https://github.com/ziion-technology", "_blank");
    }
  };

  return (
    <div
      ref={ref}
      className={`${styles.projectCard} ${inView ? styles.isVisible : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={styles.infoSection}>
        <div className={styles.infoIcon}>
          {project.icon}
          <span>{project.title}</span>
        </div>
        <p className={styles.infoDescription}>{project.description}</p>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{project.techStack}</span>
          <span className={styles.metricLabel}>Technologies</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricValue}>{project.coreFeature}</span>
          <span className={styles.metricLabel}>Key Features</span>
        </div>
        <button className={styles.viewCaseStudyButton} onClick={handleClick}>
          {project.buttonText}
        </button>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <img
            src={project.imageUrl}
            alt={`${project.title} UI`}
            className={styles.projectImage}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const Projectshow = () => {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleDemoClick = (project) => {
    setSelectedProject(project);
    setShowDemoForm(true);
  };

  const closeDemoForm = () => {
    setShowDemoForm(false);
    setSelectedProject(null);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.projectShowContainer}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              Real Projects to Learn{" "}
              <span className={styles.brandStories}>
                {" "}
                <br />
                Modern Tech
              </span>
            </h1>
          </div>
          <div className={styles.headerCta}>
            <p className={styles.ctaText}>
              Live projects during Six-Month Industrial Training in Chandigarh
              offers students hands-on experience through live projects with a
              stipend. Participants gain real-world exposure in fields like
              Digital Marketing, Web Development, Full Stack, AI & ML, and Data
              Science, preparing them for professional success.
            </p>
            <button className={styles.caseStudiesButton}>View on GitHub</button>
          </div>
        </header>

        <main className={styles.mainContent}>
          {projectsData.map((project, index) => (
            <AnimatedProjectCard
              key={index}
              project={project}
              index={index}
              onDemoClick={handleDemoClick}
            />
          ))}
        </main>
      </div>
      {showDemoForm && (
        <Form closeForm={closeDemoForm} project={selectedProject} />
      )}
    </div>
  );
};

export default Projectshow;