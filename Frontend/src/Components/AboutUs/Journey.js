import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import styles from "./journey.module.css";

const GrowthData = [
  {
    year: "2018",
    title: "Inception",
    description:
      "Established core operations with a focus on web architecture.",
  },
  {
    year: "2020",
    title: "Infrastructure",
    description:
      "Implemented automated delivery pipelines and stabilized the tech stack.",
  },
  {
    year: "2021",
    title: "Diversification",
    description:
      "Expanded service verticals to include Cloud Solutions and Mobile Dev.",
  },
  {
    year: "2022",
    title: "Scaling",
    description:
      "Workforce capacity doubled; launched B2B digital training modules.",
  },
  {
    year: "2023",
    title: "Consolidation",
    description:
      "Strategic rebranding and deployment of proprietary internal tools.",
  },
  {
    year: "2024",
    title: "Global Entry",
    description:
      "Integrated AI/ML workflows and secured international partnerships.",
  },
  {
    year: "2025",
    title: "Industry Leader",
    description:
      "Recognized for excellence in end-to-end digital transformation.",
  },
];

const Journey = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.timelineWrapper} ref={ref}>
        <div className={styles.header}>
          <h2>Our Trajectory</h2>
          <p>From humble beginnings to global impact.</p>
        </div>

        <div className={styles.timelineCenter}>
          {/* Base Gray Line */}
          <div className={styles.lineBase}></div>
          {/* Animated Blue Fill Line */}
          <motion.div
            className={styles.lineFill}
            style={{ scaleY: scrollYProgress }}
          />

          {GrowthData.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      className={`${styles.row} ${isEven ? styles.rowLeft : styles.rowRight}`}
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className={styles.content}>
        <span className={styles.year}>{item.year}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <div className={styles.dot}></div>
    </motion.div>
  );
};

export default Journey;
