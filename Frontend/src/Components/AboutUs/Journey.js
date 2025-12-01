import React from "react";
import styles from "./journey.module.css";

const GrowthData = [
  {
    year: "2018",
    title: "The Saint: The Origin",
    description:
      "Began with a team of few people, providing basic web and IT services in the local market.",
  },
  {
    year: "2020",
    title: "Construction of the Basis",
    description:
      "Retained clients, automated delivery process, and built a stable tech stack.",
  },
  {
    year: "2021",
    title: "New Additions",
    description: "Added digital marketing, mobile apps, and cloud services.",
  },
  {
    year: "2022",
    title: "Team Growth & Training",
    description:
      "Workforce doubled; started digital training for communities and clients.",
  },
  {
    year: "2023",
    title: "Branding",
    description:
      "Invested in internal tools, brand redesign, and customer success model.",
  },
  {
    year: "2024",
    title: "International Presence",
    description: "Started AI/ML services; got first foreign clients.",
  },
  {
    year: "2025",
    title: "Industry Recognition",
    description:
      "Gained fame for efficient, innovative end-to-end digital transformation services.",
  },
];

const AboutCard = [
  {
    title: "Courses Completed",
    description:
      "25+ students completed Full Stack Development and UI/UX courses this month.",
    icon: "📚",
  },
  {
    title: "New Placements",
    description: "10 students placed in top MNCs like Infosys, TCS, and Wipro.",
    icon: "💼",
  },
  {
    title: "Events Conducted",
    description:
      "We hosted 2 tech webinars and a hackathon with 100+ participants.",
    icon: "🎉",
  },
];

const Journey = () => {
  return (
    <>
      <div className={styles.aboutContainer}>
        <h1 className={styles.heading}>What's New This Month</h1>
        <p className={styles.intro}>
          We're excited to share what's happening this month at our institute.
        </p>

        <div className={styles.updateCards}>
          {AboutCard.map((item, index) => (
            <div className={styles.updateCard} key={index}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.timelineContainer}>
        <h2 className={styles.title}>Our Growth journey</h2>
        <div className={styles.timeline}>
          {GrowthData.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.year}>{item.year}</div>
              <div className={styles.content}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Journey;
