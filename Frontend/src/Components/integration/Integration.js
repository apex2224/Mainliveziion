import React, { useEffect, useState } from "react";
import styles from "./integrationnextsection.module.css";
import Navbar from "../head/Navbar";
import images from "../../assets/images";
import Footer from "../footer/Footer";
import ReviewsSection from "../reviews/ReviewsSection";
import StudentCarousel from "../placement/StudentCarousel";
import useCustom from "../customHook/useCustom";
import placementassist from "../../assets/NewCoursesImages/placementassist.png";

// --- Data Arrays (Keep your existing data here) ---
const brightStarsData = [
  {
    image: images.nisha,
    name: "Nisha",
    title: "Frontend Developer",
    date: "10 Jan, 2025",
    description:
      "Building responsive, user-friendly web applications with modern technologies like React, JavaScript, and CSS to deliver seamless digital experiences.",
  },
  {
    image: images.NishaRani,
    name: "Nisha Rani",
    title: "Graphic Designing",
    date: "12 Jan, 2025",
    description:
      "Creating visually appealing designs, logos, and branding assets using Adobe Creative Suite and modern design trends for impactful communication.",
  },
  {
    image: images.parmeet,
    name: "Parmeet",
    title: "Frontend Developer",
    date: "10 Jan, 2025",
    description:
      "Focused on crafting clean UI components, performance optimization, and cross-browser compatibility for enhanced user interactions.",
  },
  {
    image: images.raghav,
    name: "Raghav",
    title: "Frontend Developer",
    date: "12 Jan, 2025",
    description:
      "Building modern, responsive, and user-friendly websites using technologies like React, JavaScript, HTML, and CSS to create seamless digital experiences.",
  },
  {
    image: images.rupal,
    name: "Rupal",
    title: "Frontend Developer",
    date: "12 Jan, 2025",
    description:
      "Specializing in modern frameworks and delivering pixel-perfect, mobile-first websites with smooth animations and fast performance.",
  },
  {
    image: images.shubham,
    name: "Shubham",
    title: "Frontend Development",
    date: "11 Jan, 2025",
    description:
      "Building responsive, user-friendly web applications with modern technologies like React, JavaScript, and CSS to deliver seamless digital experiences.",
  },
  {
    image: images.simranjeet,
    name: "Simranjeet",
    title: "Data Analytics",
    date: "12 Jan, 2025",
    description:
      "Applying machine learning, predictive analytics, and data visualization to solve real-world challenges and uncover valuable insights from datasets.",
  },
];

const collegeFeatures = [
  { image: images.kuk, text: "Kurukshetra University (KUK)" },
  { image: images.chitkara, text: "Chitkara University" },
  { image: images.lpu, text: "Lovely Professional University (LPU)" },
  { image: images.cgc, text: "Chandigarh Group of Colleges (CGC)" },
  { image: images.baddi, text: "Baddi University" },
  { image: images.pu, text: "Punjab University (PU)" },
  { image: images.mm, text: "Maharishi Markandeshwar University (MMU)" },
  {
    image: images.aimt,
    text: "Ambala Institute of Management & Technology (AIMT)",
  },
  { image: images.jmit, text: "JMIT Radaur" },
  { image: images.maimt, text: "Maharaja Agrasen Institute (MAIMT)" },
  { image: images.timt, text: "TIMT Yamunanagar" },
  { image: images.cgc2, text: "CGC Landran" },
];

const Integration = () => {
  useCustom("Placement | Ziion Technology");

  const [projectCount, setProjectCount] = useState(0);
  const [industryCount, setIndustryCount] = useState(0);

  useEffect(() => {
    const animateCounter = (target, setter) => {
      let start = 0;
      const end = parseInt(target);
      if (end === 0) return;
      let duration = 2000;
      let incrementTime = Math.max(1, Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;
        setter(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    };

    animateCounter(150, setProjectCount);
    animateCounter(20, setIndustryCount);
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      {/* --- Hero Section with 3D Neural Network (Light Theme) --- */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Learn With Us, <br />
            Provide{" "}
            <span className={styles.heroHighlight}>The Best Services</span>
          </h1>

          <p className={styles.heroSubtitle}>
            We partner with leading universities and companies to bridge the gap
            between education and industry, ensuring our students are placing in
            top-tier roles.
          </p>
        </div>

        {/* --- 3D Neural Network Visual --- */}
        <div className={styles.neuralNetworkContainer}>
          <div className={styles.neuralNetwork}>
            {/* Center Core Node */}
            <div className={`${styles.node} ${styles.coreNode}`}></div>

            {/* Satellite Nodes */}
            {[...Array(18)].map((_, i) => (
              <div
                key={`node-${i}`}
                className={styles.node}
                style={{
                  "--x": Math.cos((i / 18) * 2 * Math.PI) * 120 + "px", // Circular distribution X
                  "--y": Math.sin((i / 18) * 2 * Math.PI) * 120 + "px", // Circular distribution Y
                  "--z": Math.random() * 100 - 50 + "px", // Random Z depth
                  "--delay": i * 0.2 + "s",
                  "--node-color":
                    i % 2 === 0
                      ? "var(--color-primary)"
                      : "var(--color-secondary)",
                }}
              ></div>
            ))}

            {/* Connections (Lines) */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`link-${i}`}
                className={styles.connection}
                style={{
                  "--rot-x": Math.random() * 360 + "deg",
                  "--rot-y": Math.random() * 360 + "deg",
                  "--rot-z": Math.random() * 360 + "deg",
                  "--width": Math.random() * 100 + 100 + "px", // 100-200px length
                  "--delay": i * 0.5 + "s",
                }}
              ></div>
            ))}
          </div>
        </div>
      </section>

      <StudentCarousel />

      {/* --- "Bright Stars" Section --- */}
      <section className={styles.starsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.categoryLabel}>Our Bright Stars</span>
          <h1 className={styles.sectionTitle}>Meet Our Talented Achievers</h1>
          <p className={styles.sectionSubtitle}>
            From classroom theory to real-world application, see how our
            students are making an impact in their new careers.
          </p>
        </div>

        <div className={styles.starsGrid}>
          {brightStarsData.map((star, index) => (
            <div className={styles.starCard} key={index}>
              <div className={styles.starImageWrapper}>
                <img
                  src={star.image}
                  alt={star.name}
                  className={styles.starImage}
                />
              </div>
              <div className={styles.starContent}>
                <span className={styles.starDate}>{star.date}</span>
                <h2 className={styles.starName}>{star.name}</h2>
                <h3 className={styles.starTitle}>{star.title}</h3>
                <p className={styles.starDescription}>{star.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- College Partnership Section --- */}
      <section className={styles.collegeSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.categoryLabel}>Partnerships</span>
          <h1 className={styles.sectionTitle}>Our College Network</h1>
          <p className={styles.sectionSubtitle}>
            We are proud to collaborate with a wide network of esteemed
            universities and institutions.
          </p>
        </div>

        <div className={styles.collegeGrid}>
          {collegeFeatures.map((feature, index) => (
            <div key={index} className={styles.collegeCard}>
              <div className={styles.collegeIcon}>
                <img src={feature.image} alt={feature.text} />
              </div>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Placement Stats Section --- */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statsImageWrapper}>
            <div className={styles.statsLabel}>
              <p>
                Career Growth,
                <br />
                Tailored For You
              </p>
            </div>
            <img
              src={placementassist}
              alt="Placement Support"
              className={styles.statsImage}
            />
          </div>

          <div className={styles.statsContent}>
            <span className={styles.categoryLabel}>Placements</span>
            <h1 className={styles.sectionHeading}>
              Dedicated Placement Support
            </h1>
            <p className={styles.sectionDescription}>
              We connect talented students with leading companies, ensuring the
              right career opportunities and industry exposure.
            </p>

            <div className={styles.statsCounter}>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>{projectCount}+</span>
                <span className={styles.statText}>Students Placed</span>
              </div>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>{industryCount}+</span>
                <span className={styles.statText}>Recruiting Companies</span>
              </div>
            </div>

            <div className={styles.statsHighlight}>
              <div className={styles.statsHighlightIcon}>➔</div>
              <p>
                Our placement team works closely with top recruiters. From
                skill-building to interview preparation, we help you launch a
                successful career with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Integration;
