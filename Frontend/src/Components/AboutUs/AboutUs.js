import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./AboutUs.module.css";
import NavBar from "../head/Navbar";
import images from "../../assets/images";
import Footer from "../footer/Footer";
import axios from "axios";
import Journey from "./Journey";
import SecondForm from "../secondForm/SecondForm";
import useCustom from "../customHook/useCustom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const AboutUs = () => {
  useCustom("About Us | Ziion Technology");
  const [plans, setPlans] = useState([]);
  const [selectedDirector, setSelectedDirector] = useState(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/plans/")
      .then((res) => setPlans(res.data.plans))
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  return (
    <>
      <NavBar />

      <section className={styles.heroSection}>
        <div className={styles.heroBgContainer}>
          <motion.div
            style={{ y: y1 }}
            className={`${styles.blob} ${styles.blob1}`}
          />
          <motion.div
            style={{ y: y2 }}
            className={`${styles.blob} ${styles.blob2}`}
          />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.badge}
          >
            Since 2018
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            We Build the Future of <br />
            {/* The Gradient is applied here */}
            <span className={styles.gradientText}>Technology & Education</span>
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            Ziion Technology helps businesses grow with smart software solutions
            and empowers the next generation through world-class tech training.
          </motion.p>
        </div>
      </section>

      {/* --- Rest of the sections remain unchanged --- */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2>Our Core Values</h2>
          </motion.div>

          <motion.div
            className={styles.valuesGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                title: "Precision",
                desc: "We engineer solutions with pixel-perfect accuracy and logic.",
              },
              {
                title: "Scalability",
                desc: "Building systems designed to grow alongside your ambition.",
              },
              {
                title: "Transparency",
                desc: "Clear communication is the foundation of our partnerships.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className={styles.valueCard}
              >
                <div className={styles.valueNumber}>0{idx + 1}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- LEADERSHIP / BOARD OF DIRECTORS SECTION (UNIFIED) --- */}
      <section className={styles.leadershipSection}>
        <div className={styles.leadershipBgGlow} />

        <div className={styles.container}>
          <motion.div
            className={styles.leadershipHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.leadershipBadge}>
              <span className={styles.badgeDot} />
              Executive Leadership
            </span>
            <h2 className={styles.leadershipTitle}>
              The Visionaries{" "}
              <span className={styles.gradientText}>Behind Our Success</span>
            </h2>
            <p className={styles.leadershipSubtitle}>
              Guiding Ziion Technology with over 25+ combined years of technical
              excellence, academic research, enterprise consulting, and
              mentorship.
            </p>
          </motion.div>

          {/* ONE UNIFIED SHOWCASE CONTAINER — 2 vertical portrait cards side by side */}
          <div className={styles.unifiedLeadershipCard}>
            {directorsData.map((director, idx) => (
              <DirectorCard
                key={director.id}
                director={director}
                index={idx}
                onOpenModal={() => setSelectedDirector(director)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- DIRECTOR DETAIL MODAL --- */}
      {selectedDirector && (
        <DirectorModal
          director={selectedDirector}
          onClose={() => setSelectedDirector(null)}
        />
      )}

      <Journey />

      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={styles.galleryTitle}
          >
            Operational Excellence
          </motion.h2>
          <div className={styles.bentoGrid}>
            {[
              images.aichatfeature1,
              images.aichatfeature2,
              images.aichatfeature3,
              images.aichatfeature5,
              images.aichatfeature6,
              images.aichatfeature7,
            ].map((img, index) => (
              <GalleryItem key={index} img={img} />
            ))}
          </div>
        </div>
      </section>

      {plans.length > 0 && (
        <section className={styles.pricingSection}>
          <div className={styles.container}>
            <h2 className={styles.pricingHeader}>Enterprise Plans</h2>
            <div className={styles.pricingGrid}>
              {plans.map((plan) => (
                <div key={plan._id} className={styles.pricingCard}>
                  <div className={styles.planHeader}>
                    <h3>{plan.name}</h3>
                    <p className={styles.price}>
                      {plan.price === 0 ? "Custom" : `$${plan.price}`}
                      <span>/mo</span>
                    </p>
                  </div>
                  <ul className={styles.featureList}>
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  <button className={styles.planBtn}>Select Plan</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SecondForm />
      <Footer />
    </>
  );
};

const directorsData = [
  {
    id: "philip",
    name: "Philip Verma",
    role: "Director ",
    experience: "15+ Years Experience",
    bio: "Engineers platforms that automate complex workflows and scale enterprise systems without friction, driving digital sovereignty.",
    fullBio:
      "Philip Verma brings over 15 years of deep software engineering experience and enterprise architecture leadership. Having led transformative software deliverables across global domains, Philip focuses on building high-performance, fault-tolerant platforms and pioneering next-generation tech training.",
    img: images.FounderImg1,
    expertise: [
      "Teaching",
      "Consulting",
      "Research",
      "Mentorship",
      "Industry Experience",
    ],
    stats: [
      { val: "1500+", label: "Deliverables" },
      { val: "15+", label: "Years Experience" },
      { val: "50+", label: "Enterprise Clients" },
    ],
    social: {
      linkedin: "https://linkedin.com",
      email: "mailto:philip.verma@ziiontechnology.com",
    },
  },
  {
    id: "rashmi",
    name: "Rashmi Bansal",
    role: "Director ",
    experience: "12+ Years Experience",
    bio: "Fosters an ecosystem where human capital is nurtured, ensuring every technological leap is grounded in purpose and excellence.",
    fullBio:
      "Rashmi Bansal has spearheaded tech education and leadership initiatives, mentoring over 30,000 students and corporate professionals. With extensive expertise in academic research, consulting, and curriculum engineering, Rashmi bridges industrial demands with human-centric innovation.",
    img: images.FounderImg2,
    expertise: [
      "Teaching",
      "Consulting",
      "Research",
      "Mentorship",
      "Industry Experience",
    ],
    stats: [
      { val: "30k+", label: "Mentorships" },
      { val: "12+", label: "Years Experience" },
      { val: "100+", label: "Workshops" },
    ],
    social: {
      linkedin: "https://linkedin.com",
      email: "mailto:rashmi.bansal@ziiontechnology.com",
    },
  },
];

const DirectorCard = ({ director, index, onOpenModal }) => {
  return (
    <motion.div
      className={styles.directorPortraitCard}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -6 }}
    >
      {/* IMAGE — TOP */}
      <div className={styles.directorImgFrame}>
        <img
          src={director.img}
          alt={director.name}
          className={director.id === "philip" ? styles.directorFounder1Img : styles.directorFounder2Img}
        />
        <div className={styles.imgGradientOverlay} />
        <div className={styles.experienceBadge}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span>{director.experience}</span>
        </div>
      </div>

      {/* CONTENT — BOTTOM */}
      <div className={styles.directorPortraitContent}>
        <div className={styles.directorHeaderGroup}>
          <span className={styles.directorRoleTag}>{director.role}</span>
          <h3 className={styles.directorName}>{director.name}</h3>
        </div>

        <p className={styles.directorBio}>"{director.bio}"</p>

        <div className={styles.cardStatsRow}>
          {director.stats.map((s, i) => (
            <div key={i} className={styles.cardStatItem}>
              <strong>{s.val}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.expertiseWrapper}>
          <span className={styles.expertiseTitle}>Core Focus & Expertise</span>
          <div className={styles.tagsContainer}>
            {director.expertise.map((tag, i) => (
              <span key={i} className={styles.expertiseTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.socialLinks}>
            <a
              href={director.social.linkedin}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z" />
              </svg>
            </a>
            <a
              href={director.social.twitter}
              target="_blank"
              rel="noreferrer"
              title="Twitter / X"
              aria-label="Twitter"
            >
              <svg
                width="17"
                height="17"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href={director.social.email} title="Email" aria-label="Email">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>

          <button className={styles.knowMoreBtn} onClick={onOpenModal}>
            <span>Know More</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M12 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const DirectorModal = ({ director, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <motion.div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <button
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className={styles.modalBody}>
          <div className={styles.modalLeft}>
            <img
              src={director.img}
              alt={director.name}
              className={styles.modalImg}
            />
            <div className={styles.modalRole}>{director.role}</div>
            <h3 className={styles.modalName}>{director.name}</h3>
            <span className={styles.modalExpBadge}>{director.experience}</span>
          </div>

          <div className={styles.modalRight}>
            <h4>Executive Overview</h4>
            <p className={styles.modalFullBio}>{director.fullBio}</p>

            <h4>Key Impact & Metrics</h4>
            <div className={styles.modalStats}>
              {director.stats.map((s, i) => (
                <div key={i} className={styles.modalStatItem}>
                  <strong>{s.val}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>

            <h4>Core Competencies</h4>
            <div className={styles.modalTags}>
              {director.expertise.map((item, i) => (
                <span key={i} className={styles.modalTag}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const GalleryItem = ({ img }) => {
  return (
    <motion.div
      className={styles.bentoItem}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img src={img} alt="Gallery" loading="lazy" />
    </motion.div>
  );
};

export default AboutUs;
