import React, { useState, useEffect, useCallback, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import styles from "./AboutUs.module.css";
import NavBar from "../head/Navbar";
import images from "../../assets/images";
import Footer from "../footer/Footer";
import Journey from "./Journey";
import SecondForm from "../secondForm/SecondForm";
import useCustom from "../customHook/useCustom";
import { Linkedin, Mail, ArrowRight, Star } from "lucide-react";

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// --- Static Data (outside component to avoid re-creation on re-render) ---
const coreValues = [
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
];

const directorsData = [
  {
    id: "philip",
    name: "Philip Verma",
    role: "Director",
    experience: "10+ Years Experience",
    bio: "Specializes in developing modern web applications, delivering real-world projects, and training aspiring developers with industry-focused MERN Stack expertise.",
    fullBio:
      "For the past 10+ years, I have been working as a Full Stack Developer, building web applications that solve real business problems. I specialize in the MERN Stack and have delivered multiple live projects across different industries, including the PGIBrainMem platform for PGI Chandigarh. Teaching has always been an important part of my journey, and I enjoy sharing practical knowledge with students and developers through hands-on, industry-focused training. My goal is to help learners build strong technical skills and prepare them for real-world software development.",
    img: images.philipsir,
    expertise: [
      "MERN Stack",
      "Full Stack Development",
      "React.js",
      "Node.js",
      "Enterprise Solutions",
      "Software Architecture",
    ],

    specialties: [
      "Technical Training",
      "Project Development",
      "System Design",
      "Code Review",
      "API Development",
      "Industry Mentorship",
    ],
    stats: [
      { val: "10+", label: "Years Experience" },
      { val: "2000+", label: "Students Mentored" },
      { val: "70+", label: "Projects Delivered" },
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/philip-verma-ab5448266/",
      email: "mailto:vermaphilip51@gmail.com",
    },
  },
  {
    id: "rashmi",
    name: "Rashmi Bansal",
    role: "Director",
    experience: "12+ Years Experience",
    bio: "Supports students through career guidance, academic counseling, and one-on-one mentorship, empowering them to build successful futures.",
    fullBio:
      "Over the years, I have had the opportunity to work as an Education Consultant with Chandigarh University and other leading organizations, supporting students in their academic and career journeys. My focus has always been on understanding individual goals, providing the right guidance, and helping learners make confident career decisions. Through one-on-one mentoring and practical counseling, I strive to inspire students to unlock their potential and build successful futures.",
    img: images.FounderImg2,
    expertise: [
      "Education Consulting",
      "Career Guidance",
      "Student Mentorship",
      "Academic Counseling",
      "Professional Development",
      "Training & Support",
    ],

    specialties: [
      "Career Planning",
      "Student Success",
      "Personal Mentoring",
      "Communication",
      "Learning Strategies",
      "Industry Guidance",
    ],
    stats: [
      { val: "8+", label: "Years Experience" },
      { val: "2000+", label: "Students Mentored" },
      { val: "1000+", label: "Career Consultations" },
    ],
    social: {
      linkedin: "https://www.linkedin.com/in/rashmi-bansal-8a4b4b123/",
      email: "mailto:rashmi27bansal@gmail.com",
    },
  },
];

const galleryImages = [
  images.aichatfeature1,
  images.aichatfeature2,
  images.aichatfeature3,
  images.aichatfeature5,
  images.aichatfeature6,
  images.aichatfeature7,
];

// --- Sub Components ---
const GalleryItem = memo(({ img }) => (
  <motion.div
    className={styles.bentoItem}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <img src={img} alt="Gallery" loading="lazy" />
  </motion.div>
));

const DirectorCard = memo(({ director, index, onOpenModal }) => (
  <motion.div
    className={styles.directorPortraitCard}
    initial={{ opacity: 0, y: 35 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    whileHover={{ y: -6 }}
  >
    <div className={styles.directorImgFrame}>
      <img
        src={director.img}
        alt={director.name}
        className={
          director.id === "philip"
            ? styles.directorFounder1Img
            : styles.directorFounder2Img
        }
        loading="lazy"
      />
      <div className={styles.imgGradientOverlay} />
      <div className={styles.experienceBadge}>
        <Star size={13} />
        <span>{director.experience}</span>
      </div>
    </div>

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
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a href={director.social.email} aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
        <button className={styles.knowMoreBtn} onClick={onOpenModal}>
          <span>Know More</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  </motion.div>
));

const DirectorModal = memo(({ director, onClose }) => {
  useEffect(() => {
    // Lock body scroll when modal is open
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <motion.div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
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
              loading="lazy"
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
              {director.specialties.map((item, i) => (
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
});

// --- Main Component ---
const AboutUs = () => {
  useCustom("About Us | Ziion Technology");
  const [selectedDirector, setSelectedDirector] = useState(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const handleOpenModal = useCallback(
    (director) => setSelectedDirector(director),
    [],
  );
  const handleCloseModal = useCallback(() => setSelectedDirector(null), []);

  return (
    <>
      <NavBar />

      {/* HERO */}
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

      {/* CORE VALUES */}
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
            {coreValues.map((item, idx) => (
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

      {/* LEADERSHIP */}
      <section className={styles.leadershipSection}>
        <div className={styles.leadershipBgGlow} />
        <div className={styles.container}>
          <motion.div
            className={styles.leadershipHeader}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
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
              Guiding Ziion Technology with over 20+ combined years of technical
              excellence, academic research, enterprise consulting, and
              mentorship.
            </p>
          </motion.div>

          <div className={styles.unifiedLeadershipCard}>
            {directorsData.map((director, idx) => (
              <DirectorCard
                key={director.id}
                director={director}
                index={idx}
                onOpenModal={() => handleOpenModal(director)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedDirector && (
          <DirectorModal
            director={selectedDirector}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>

      {/* JOURNEY */}
      <Journey />

      {/* GALLERY */}
      <section className={styles.gallerySection}>
        <div className={styles.container}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={styles.galleryTitle}
          >
            Operational Excellence
          </motion.h2>
          <div className={styles.bentoGrid}>
            {galleryImages.map((img, index) => (
              <GalleryItem key={index} img={img} />
            ))}
          </div>
        </div>
      </section>

      <SecondForm />
      <Footer />
    </>
  );
};

export default AboutUs;
