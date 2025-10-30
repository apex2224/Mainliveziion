import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Courses.module.css";
import Modal from "../../syllabusform/Syllabusmodal/Modal";
import SyllabusForm from "../../syllabusform/SyllabusForm";

// SVG for the default icon next to domain names
const briefcaseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.035a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zM11 4H5v-.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V4zM0 6.384V14.5A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V6.384l-7.614 2.035a1.5 1.5 0 0 1-.772 0L0 6.384z" />
  </svg>
);

// Expanded and detailed data with all specified courses and new images
const courseData = [
  {
    name: "WEB DEVELOPMENT",
    icon: briefcaseIcon,
    imageUrl:
      "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subcategories: [
      "Web Development",
      "PHP",
      "Front-End Frameworks",
      "Back-End Architecture",
    ],
  },
  {
    name: "APP DEVELOPMENT & DESIGN",
    icon: briefcaseIcon,
    imageUrl:
      "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subcategories: [
      "Mobile Application Development",
      "Web Designing",
      "UI/UX Principles",
      "Responsive Design",
    ],
  },
  {
    name: "ARTIFICIAL INTELLIGENCE & ML",
    icon: briefcaseIcon,
    imageUrl:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subcategories: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
    ],
  },
  {
    name: "DATA ANALYTICS & SCIENCE",
    icon: briefcaseIcon,
    imageUrl:
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subcategories: [
      "Data Science",
      "Data Analytics",
      "Big Data Technologies",
      "Data Visualization",
    ],
  },
  {
    name: "CLOUD & DEVOPS",
    icon: briefcaseIcon,
    imageUrl:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subcategories: [
      "Cloud Computing",
      "DevOps",
      "CI/CD Pipelines",
      "Containerization",
    ],
  },
  {
    name: "DIGITAL MARKETING",
    icon: briefcaseIcon,
    imageUrl:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subcategories: [
      "Digital Marketing",
      "SEO & SEM",
      "Content Strategy",
      "Social Media Marketing",
    ],
  },
];

const Courses = () => {
  const [openDomain, setOpenDomain] = useState(courseData[0]?.name || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDomain = (domainName) => {
    setOpenDomain(openDomain === domainName ? null : domainName);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleExploreClick = () => {
    navigate("/SyllabusForm");
  };

  const activeDomain = courseData.find((domain) => domain.name === openDomain);
  const currentImageUrl = activeDomain
    ? activeDomain.imageUrl
    : courseData[0]?.imageUrl;

  return (
    <div className={styles.coursesContainer}>
      <div className={styles.leftSection}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>
            Turning Learning into{" "}
            <span className={styles.highlight}>Career Success</span>
          </h1>
          <p className={styles.description}>
            Unlock Our industrial training programs of 6 months empower students
            to gain hands-on experience with real-world projects. Many of our
            trainees have successfully applied their skills to secure jobs in
            top companies, develop innovative projects, and excel in their
            careers. These success stories highlight how practical learning
            transforms knowledge into real-world achievements, building
            confidence and industry-ready skills.
          </p>
          <button onClick={handleOpenModal} className={styles.exploreButton}>
            Download Syllabus
          </button>
        </div>

        <div key={currentImageUrl} className={styles.imageCard}>
          <img
            src={currentImageUrl}
            alt={activeDomain ? activeDomain.name : "Technology Course"}
            className={styles.cardImage}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.industryList}>
          {courseData.map((domain) => (
            <div key={domain.name} className={styles.industryItem}>
              <div
                className={`${styles.industryHeader} ${
                  openDomain === domain.name ? styles.open : ""
                }`}
                onClick={() => toggleDomain(domain.name)}
              >
                <span className={styles.industryName}>
                  {domain.icon} {domain.name}
                </span>
                <span className={styles.toggleIcon}>+</span>
              </div>

              <div
                className={`${styles.subcategoriesWrapper} ${
                  openDomain === domain.name ? styles.open : ""
                }`}
              >
                <div className={styles.subcategories}>
                  {domain.subcategories.map((sub, index) => (
                    <span
                      key={index}
                      className={styles.subcategoryTag}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <SyllabusForm />
      </Modal>
    </div>
  );
};

export default Courses;
