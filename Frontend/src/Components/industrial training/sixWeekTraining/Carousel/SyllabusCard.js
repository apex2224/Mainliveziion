import React, { useState, useEffect, useCallback } from "react";
import styles from "./SyllabusCard.module.css";
import Modal from "../../syllabusform/Syllabusmodal/Modal";
import SyllabusForm from "../../syllabusform/SyllabusForm";
import {
  FaCloud,
  FaMobileAlt,
  FaBrain,
  FaCode,
  FaChartBar,
  FaInfinity,
  FaLock,
  FaRobot,
  FaArrowRight, // Icon for the button
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

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  // Swipe State
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const cards = [
    {
      id: 1,
      title: "Cloud Computing",
      subtitle: "Scalable Cloud Solutions",
      icon: icons.cloud,
      formValue: "cloud-computing",
      topics: [
        "AWS, Azure, GCP Fundamentals",
        "Serverless Architecture",
        "CI/CD Pipelines",
        "Kubernetes & Docker",
        "Cloud Security & Identity (IAM)",
        "Database Services (RDS, DynamoDB)",
        "Cloud Storage Solutions (S3)",
        "Cost Optimization Strategies",
      ],
    },
    {
      id: 2,
      title: "Flutter",
      subtitle: "Native & Cross-Platform",
      icon: icons.mobile,
      formValue: "mobile-app-development",
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
      icon: icons.brain,
      formValue: "machine-learning",
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
      icon: icons.code,
      formValue: "full-stack-development",
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
      icon: icons.chart,
      formValue: "data-science",
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
      icon: icons.infinity,
      formValue: "devops",
      topics: [
        "Continuous Integration (CI)",
        "Continuous Deployment (CD)",
        "Ansible, Terraform (IaC)",
        "Monitoring & Logging",
        "Git & Version Control Systems",
        "Linux Administration & Bash",
        "Prometheus & Grafana",
        "DevSecOps Implementation",
      ],
    },
    {
      id: 7,
      title: "Artificial Intelligence",
      subtitle: "Future of Technology",
      icon: icons.ai,
      formValue: "artificial-intelligence",
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
      title: "Digital Marketing",
      subtitle: "Protecting Your Digital Assets",
      icon: icons.lock,
      formValue: "digital-marketing",
      topics: [
        "Google Ads",
        "Onpage SEO Techniques",
        "Offpage SEO Techniques",
        "Technical SEO",
        "Content Marketing",
        "Social Media Marketing",
        "Email Marketing",
        "Analytics and Reporting",
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

  const handleOpenModal = (courseValue) => {
    setSelectedCourse(courseValue);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse("");
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

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
    <div className={styles.pageContainer}>
      <div className={styles.carouselContainer}>
        <div className={styles.carouselHeader}>
          <h2 className={styles.carouselTitle}>Our Training Programs</h2>
        </div>

        <div className={styles.carouselWrapper}>
          <div
            className={styles.carouselTrack}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={styles.carouselCard}
                style={getCardStyle(index)}
                onClick={() => index !== currentIndex && goToSlide(index)}
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(true)}
              >
                <div
                  className={styles.cardIconWrapper}
                  style={{
                    background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`,
                  }}
                >
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

                <p className={styles.detailsText}>
                  Detailed Syllabus Available
                </p>

                <div className={styles.buttonWrapper}>
                  {/* <-- THE NEW BUTTON STRUCTURE --> */}
                  <button
                    className={styles.cardButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(card.formValue);
                    }}
                  >
                    <span className={styles.btnText}>Read More</span>
                    <span className={styles.btnIconCircle}>
                      <FaArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <SyllabusForm defaultCourse={selectedCourse} />
      </Modal>
    </div>
  );
};

export default SyllabusCard;
