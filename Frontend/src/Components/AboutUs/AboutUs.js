import React, { useState, useEffect } from "react";
import styles from "./AboutUs.module.css";
import NavBar from "../head/Navbar";
import images from "../../assets/images";
import Footer from "../footer/Footer";
import axios from "axios";
import Journey from "./Journey";
import SecondForm from "../secondForm/SecondForm";
import useCustom from "../customHook/useCustom";

// const pricingPlans = [
//   {
//     name: "Basic",
//     price: "Free",
//     features: [
//       "2 seats included",
//       "Unlimited chat history",
//       "Livechat",
//       "Mobile apps",
//       "Basic integrations",
//     ],
//     buttonText: "Get Started",
//     isPopular: false,
//   },
//   {
//     name: "Pro",
//     price: "$25",
//     period: "/ month",
//     features: [
//       "4 seats included",
//       "Unlimited chat history",
//       "Livechat + Email",
//       "Advanced integrations",
//       "Shared inbox",
//     ],
//     buttonText: "Try for 14 days",
//     isPopular: true,
//   },
//   {
//     name: "Unlimited",
//     price: "$95",
//     period: "/ month",
//     features: [
//       "Unlimited seats",
//       "Unlimited chat history",
//       "Livechat + Email + More",
//       "Premium integrations",
//       "Advanced analytics",
//     ],
//     buttonText: "Try for 14 days",
//     isPopular: false,
//   },
// ];

// /  all plans
// /assign  user assign a plan
// /upgrade  to updgrade

const AboutUs = () => {
  useCustom("About Us | Ziion Technology");

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/plans/")
      .then((res) => {
        console.log(res.data);
        setPlans(res.data.plans);
      })
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  //image hover the content
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const isVisible = (index) => {
    return hoverIndex === index || activeIndex === index;
  };

  return (
    <>
      <NavBar />

      <section className={styles.pricingHeroSection}>
        <img
          src={images.pricingBack}
          alt="background"
          className={styles.pricingBack}
        />
        <div className={styles.pricingHeroContainer}>
          <h1 className={styles.pricingHeroTitle}>About Ziion Technology</h1>
          <h2 className={styles.pricingHeroSubtitle}>
            Turning Vision Into Reality
          </h2>
        </div>
      </section>

      <section className={styles.pricingSection}>
        <div className={styles.pricingContainer}>
          {plans.map((plan) => (
            <div key={plan._id} className={styles.pricingCard}>
              <h2>{plan.name}</h2>
              <div className={styles.price}>
                <span className={styles.amount}>
                  {plan.price === 0 ? "Free" : `$${plan.price}`}
                </span>
                <span className={styles.period}>
                  {plan.price === 0 ? "" : "/ month"}
                </span>
              </div>
              <ul className={styles.features}>
                {plan.features.map((feature, id) => (
                  <li key={id}>{feature}</li>
                ))}
              </ul>
              <button className={styles.priceButton}>
                {plan.trialDays === 0
                  ? "Get Started"
                  : `Try for ${plan.trialDays} days`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* founder message section */}

      <section className={styles["founder-main-container"]}>
        <h1 className={styles["founder-title"]}>
          A note from <span className={styles.highlight}> Our Visionary</span>
        </h1>

        <section className={styles.container}>
          <div className={styles.heroSection}>
            <div className={styles.contentLeft}>
              <span className={styles["founders-name"]}>Mr. Phillip Verma</span>
              <br></br>
              {/* <h1 className={styles.heading}>
            Automate Business, <span className={styles.highlight}>Stream</span> More Revenue
          </h1> */}
              <p className={styles["founder-message"]}>
                This journey began with a dream to make digital skills simple,
                useful, and life-changing for anyone willing to learn. Today,
                that dream lives on in every course we create and every service
                we deliver. We're here to grow together with honesty, care, and
                a whole lot of heart.
              </p>
              <div className={styles.pricingStats}>
                <div className={styles.pricingCard}>
                  <div className={styles.pricingValue}>1500+</div>
                  <div className={styles.pricingLabel}>Project Complete</div>
                </div>
                <div className={styles.pricingCard}>
                  <div className={styles.pricingValue}>7+</div>
                  <div className={styles.pricingLabel}>Years Experience</div>
                </div>
              </div>
            </div>
            <div className={styles["founder-imageSection"]}>
              <img
                src={images.FounderImg1}
                alt="Business Analytics"
                className={styles["founder-image"]}
              />
            </div>
          </div>

          <div className={`${styles.heroSection} ${styles.rashmiMam}`}>
            <div className={styles["founder-imageSection"]}>
              <img
                src={images.FounderImg2}
                alt="Business Analytics"
                className={styles["founder-image"]}
              />
            </div>
            <div className={styles.contentLeft}>
              <span className={styles["founders-name"]}>
                Mrs. Rashmi Bansal
              </span>
              <br></br>
              {/* <h1 className={styles.heading}>
            Automate Business, <span className={styles.highlight}>Stream</span> More Revenue
          </h1> */}
              <p className={styles["founder-message"]}>
                What we had was little: passion, sense and a firm conviction
                that digital skills can lead to opening doors. Since that time,
                the thing that we have created is not only a company; it is a
                place where people can learn, develop and go somewhere, bearing
                in mind that they do this together. Thank you for choosing us to
                go with you.
              </p>
              <div className={styles.pricingStats}>
                <div className={styles.pricingCard}>
                  <div className={styles.pricingValue}>12+</div>
                  <div className={styles.pricingLabel}>Years Experience</div>
                </div>
                <div className={styles.pricingCard}>
                  <div className={styles.pricingValue}>30,000+</div>
                  <div className={styles.pricingLabel}>Student Counselling</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* 3D ABOUT ZIION TECHNOLOGY SECTION */}
      <section className={styles.threeDAboutSection}>
        <div className={styles.threeDAboutBackground}>
          <div className={styles.threeDElement + " " + styles.element1}></div>
          <div className={styles.threeDElement + " " + styles.element2}></div>
          <div className={styles.threeDElement + " " + styles.element3}></div>
        </div>

        <div className={styles.threeDAboutContainer}>
          <h1 className={styles.threeDAboutTitle}>
            About <span>Ziion Technology</span>
          </h1>
          <p className={styles.threeDAboutSubtitle}>
            Turning Vision Into Reality - Pioneering digital transformation through innovative education and cutting-edge technology solutions.
          </p>

          <div className={styles.threeDCardsContainer}>
            <div className={styles.threeDAboutCard}>
              <div className={styles.threeDAboutCardContent}>
                <h3>Innovation</h3>
                <p>We embrace cutting-edge technologies to deliver superior solutions that anticipate future needs.</p>
              </div>
            </div>

            <div className={styles.threeDAboutCard}>
              <div className={styles.threeDAboutCardContent}>
                <h3>Excellence</h3>
                <p>Our commitment to quality ensures that every project exceeds expectations and delivers measurable results.</p>
              </div>
            </div>

            <div className={styles.threeDAboutCard}>
              <div className={styles.threeDAboutCardContent}>
                <h3>Integrity</h3>
                <p>Transparent practices and ethical values are the foundation of every relationship we build.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* journey section */}
      <Journey />

      {/* gallery */}

      <div className={styles.aiChatbotImageContainer}>
        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(1)}
        >
          <img src={images.aichatfeature1} alt="AI 1" />
          {isVisible(1) && (
            <div className={styles.overlay}>
              <p>“First, solve the problem. Then, write the code.”</p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(2)}
        >
          <img src={images.aichatfeature2} alt="AI 2" />
          {isVisible(2) && (
            <div className={styles.overlay}>
              <p>
                “Code is like humor. When you have to explain it, it’s bad.”
              </p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(3)}
        >
          <img src={images.aichatfeature3} alt="AI 3" />
          {isVisible(3) && (
            <div className={styles.overlay}>
              <p>“Talk is cheap. Show me the code.”</p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(5)}
        >
          <img src={images.aichatfeature5} alt="AI 5" />
          {isVisible(5) && (
            <div className={styles.overlay}>
              <p>
                “Programs must be written for people to read, and only
                incidentally for machines to execute.”
              </p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(6)}
        >
          <img src={images.aichatfeature6} alt="AI 6" />
          {isVisible(6) && (
            <div className={styles.overlay}>
              <p>“Learning to write programs stretches your mind.”</p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(7)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(7)}
        >
          <img src={images.aichatfeature7} alt="AI 7" />
          {isVisible(7) && (
            <div className={styles.overlay}>
              <p>“The best error message is the one that never shows up.”</p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(8)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(8)}
        >
          <img src={images.aichatfeature8} alt="AI 8" />
          {isVisible(8) && (
            <div className={styles.overlay}>
              <p>“Experience is the name everyone gives to their mistakes.”</p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(9)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(9)}
        >
          <img src={images.aichatfeature9} alt="AI 9" />
          {isVisible(9) && (
            <div className={styles.overlay}>
              <p>“Great developers never stop learning.”</p>
            </div>
          )}
        </div>

        <div
          className={styles.aiChatbotImageBlock}
          onMouseEnter={() => handleMouseEnter(10)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handle(10)}
        >
          <img src={images.aichatfeature10} alt="AI 9" />
          {isVisible(10) && (
            <div className={styles.overlay}>
              <p>“Great developers never stop learning.”</p>
            </div>
          )}
        </div>
      </div>

      <SecondForm />

      <Footer />
    </>
  );
};

export default AboutUs;
