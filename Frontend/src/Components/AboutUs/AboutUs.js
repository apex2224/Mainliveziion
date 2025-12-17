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

      <section className={styles.founderSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Leadership</h2>
          </div>

          <FounderBlock
            img={images.FounderImg1}
            name="Mr. Phillip Verma"
            role="Director"
            text="Our mission is technical sovereignty. We engineer platforms that allow businesses to automate complex workflows and scale without friction."
            stats={[
              { val: "1500+", label: "Deliverables" },
              { val: "7+", label: "Years Tenure" },
            ]}
            reversed={false}
          />

          <div className={styles.spacer} />

          <FounderBlock
            img={images.FounderImg2}
            name="Mrs. Rashmi Bansal"
            role="Director"
            text="True innovation lies in human capital. We foster an ecosystem where talent is nurtured, ensuring every technological leap is grounded in purpose."
            stats={[
              { val: "30k+", label: "Mentorships" },
              { val: "12+", label: "Years Tenure" },
            ]}
            reversed={true}
          />
        </div>
      </section>

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

const FounderBlock = ({ img, name, role, text, stats, reversed }) => {
  return (
    <motion.div
      className={`${styles.founderBlock} ${reversed ? styles.reversed : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className={styles.founderImgWrapper}>
        <img src={img} alt={name} />
      </div>
      <div className={styles.founderContent}>
        <div className={styles.roleTag}>{role}</div>
        <h2>{name}</h2>
        <p>{text}</p>
        <div className={styles.founderStats}>
          {stats.map((s, i) => (
            <div key={i}>
              <strong>{s.val}</strong> <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
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
