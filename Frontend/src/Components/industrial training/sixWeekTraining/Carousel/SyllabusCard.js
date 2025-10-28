import React, { useState, useEffect, useCallback } from "react";
import styles from "./SyllabusCard.module.css";

// Import icons from react-icons
import {
  FaCloud,
  FaMobileAlt,
  FaBrain,
  FaCode,
  FaChartBar,
  FaInfinity,
  FaLock,
  FaRobot,
} from "react-icons/fa";

// Updated icons object to use React components
const icons = {
  cloud: <FaCloud />,
  mobile: <FaMobileAlt />,
  brain: <FaBrain />,
  code: <FaCode />,
  chart: <FaChartBar />,
  infinity: <FaInfinity />,
  lock: <FaLock />,
  ai: <FaRobot />,
};

const SyllabusCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const cards = [
    {
      id: 1,
      title: "Cloud Computing",
      subtitle: "Scalable Cloud Solutions",
      icon: icons.cloud, // No change needed here
      topics: [
        "AWS, Azure, GCP",
        "Serverless Architecture",
        "CI/CD Pipelines",
        "Kubernetes & Docker",
      ],
    },
    {
      id: 2,
      title: "Flutter",
      subtitle: "Native & Cross-Platform",
      icon: icons.mobile, // No change needed here
      topics: [
        "Dart Programming and Flutter Widgets",
        "State Management, Networking",
        "Navigation and Routing",
        "External Package Integration",
        "Testing, Debugging, and Performance",
        "UI Components, Web Development",
      ],
    },
    {
      id: 3,
      title: "Machine Learning",
      subtitle: "Intelligent Automation",
      icon: icons.brain, // No change needed here
      topics: [
        "Functions, File I/O, Exception Handling",
        "Data Visualization",
        "Machine Learning Fundamentals",
        "Supervised & Unsupervised Learning",
        "Model Evaluation and Selection",
        "Natural Language Processing (NLP)",
        "Real-World Applications",
      ],
    },
    {
      id: 4,
      title: "Full Stack Development",
      subtitle: "Web Design Tools & Tech",
      icon: icons.code, // No change needed here
      topics: [
        "Web Design Tools and Technologies",
        "HTML, CSS, Responsive Web Design",
        "MERN - MongoDB",
        "Express.js & React.js",
        "JavaScript and Frameworks",
        "Node.js, React.js, Angular.js",
      ],
    },
    {
      id: 5,
      title: "Data Science",
      subtitle: "Actionable Business Insights",
      icon: icons.chart, // No change needed here
      topics: [
        "Data And Database",
        "Relational databases and SQL",
        "NoSQL databases",
        "Exploratory Data Analysis (EDA)",
        "Advanced ML Algorithms",
        "Natural Language Processing",
        "Neural Networks",
        "Spark for data processing",
      ],
    },
    {
      id: 6,
      title: "DevOps",
      subtitle: "Streamline Your Operations",
      icon: icons.infinity, // No change needed here
      topics: [
        "Continuous Integration",
        "Continuous Deployment",
        "Ansible, Terraform",
        "Monitoring & Logging",
      ],
    },
    {
      id: 7,
      title: "Artificial Intelligence",
      subtitle: "Future of Technology",
      icon: icons.ai, // No change needed here
      topics: [
        "Data Preprocessing",
        "Neural Networks",
        "Supervised Learning Algorithms",
        "Unsupervised Learning",
        "Natural Language Processing",
        "Deep and Reinforcement Learning",
        "AI Ethics and Bias",
        "AI Deployment",
      ],
    },
    {
      id: 8,
      title: "Cybersecurity",
      subtitle: "Protecting Your Digital Assets",
      icon: icons.lock, // No change needed here
      topics: [
        "Qualitative & quantitative data type",
        "Inferential Statistics",
        "Data Cleaning and Preprocessing",
        "Data Wrangling and Transformation",
        "Predictive Analytics and Regression",
        "Decision trees and random forests",
        "Cluster Analysis",
      ],
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, nextSlide]);

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const totalCards = cards.length;

    let position = diff;
    if (diff > totalCards / 2) position = diff - totalCards;
    if (diff < -totalCards / 2) position = diff + totalCards;

    const isCenter = position === 0;
    const absPosition = Math.abs(position);

    const scale = isCenter ? 1 : 0.8 - absPosition * 0.1;
    const translateX = position * 320;

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity: absPosition > 2 ? 0 : isCenter ? 1 : 0.4 - absPosition * 0.1,
      zIndex: isCenter ? 10 : 5 - absPosition,
      pointerEvents: absPosition > 2 ? "none" : "auto",
    };
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>Our Training Programs</h2>
      </div>

      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={prevSlide}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          aria-label="Previous slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className={styles.carouselTrack}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={styles.carouselCard}
              style={getCardStyle(index)}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
            >
              <div
                className={styles.cardIconWrapper}
                style={{
                  background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                }}
              >
                {/* This span now renders the React component */}
                <span className={styles.cardIcon}>{card.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardSubtitle}>{card.subtitle}</p>

              <ul className={styles.topicList}>
                {card.topics.map((topic, i) => (
                  <li key={i} className={styles.topicItem}>
                    <span className={styles.topicBullet}>•</span>
                    {topic}
                  </li>
                ))}
              </ul>

              <p className={styles.detailsText}>Detailed Syllabus Available</p>

              <div className={styles.buttonWrapper}>
                <button className={styles.cardButton}>Read More</button>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={nextSlide}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          aria-label="Next slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SyllabusCard;
