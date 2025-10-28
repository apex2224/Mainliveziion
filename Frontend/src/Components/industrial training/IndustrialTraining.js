import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./IndustrialTraining.module.css";
import images from "../../assets/images";
import Footer from "../footer/Footer";
import Navbar from "../head/Navbar";
import Form from "../form/Form";
import ueCustom from "../customHook/useCustom";

const IndustrialTraining = () => {
  ueCustom("Industrial Training | Ziion Technology");
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Navbar />
      <div className={styles.industrialTrainingContainer}>
        {/* 🌟 Hero Section */}
        <section
          className={styles.industrialHeroSection}
          style={{ backgroundImage: `url(${images.trainingBack})` }}
        >
          <div className={styles.industrialOverlay}></div>
          <div className={styles.industrialHeroContent}>
            <h1 className={styles.industrialHeroHeading}>
              <span className={styles.industrialGradientText}>
                Industrial Training
              </span>
            </h1>
            <p className={styles.industrialPara}>
              Our Industrial Training programs are crafted to give students and
              professionals real-world exposure. Whether you choose the 6-week
              or 6-month program, you’ll work on live projects, gain practical
              knowledge, and boost your job prospects.
            </p>
            <button
              className={styles.herobutton}
              onClick={() => setShowForm(true)}
            >
              Talk to us
            </button>
          </div>
          {showForm && <Form closeForm={() => setShowForm(false)} />}
        </section>

        {/* 🏭 Training Section */}
        <div className={styles.industrialCardSection}>
          {/* Left Card - Six Weeks */}
          <div className={styles.industrialCard}>
            <img
              src={images.training1}
              alt="Six Weeks"
              className={styles.industrialCardImage}
            />
            <p className={styles.industrialDescription}>
              Learn core concepts, tools, and technologies with real projects in
              just 6 weeks.
            </p>
            <Link to="/six-week-training">
              <button className={styles.industrialBtn}>
                Six Weeks Training
              </button>
            </Link>
          </div>

          {/* Center Image */}
          <img
            src={images.trainingCenter}
            alt="Girl Learning"
            className={styles.industrialImage}
          />

          {/* Right Card - Six Months */}
          <div className={styles.industrialCard}>
            <img
              src={images.training2}
              alt="Six Months"
              className={styles.industrialCardImage}
            />
            <p className={styles.industrialDescription}>
              Master advanced skills with full project development & placement
              assistance in 6 months.
            </p>
            <Link to="/six-month-training">
              <button className={styles.industrialBtn}>
                Six Months Training
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IndustrialTraining;
