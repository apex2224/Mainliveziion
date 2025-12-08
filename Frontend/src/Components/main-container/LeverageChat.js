import React, { useState } from "react";
import styles from "./LeverageChat.module.css";
import images from "../../assets/images"; // Note: This import seems unused in this component, but I've kept it as it was in your original code.
import { Link } from "react-router-dom";
import ReviewsSection from "../reviews/ReviewsSection";
import StudentGallery from "./StudentGallery";

import SecondForm from "../secondForm/SecondForm";

const MainContent = () => {
  const [showForm, setShowForm] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "What Type Of Websites Can I Build With This Theme?",
      answer:
        "You can build a variety of websites such as business, portfolio, e-commerce, blog, and more with this theme. It's highly customizable to suit your needs.",
    },
    {
      id: 2,
      question:
        "Will I Get All The Demos For Single Purchase With Lifetime Validity?",
      answer:
        "Yes, with a single purchase, you get access to all demos with lifetime validity, including future updates and support.",
    },
    {
      id: 3,
      question: "Can I Change The Theme Language To My Local Language?",
      answer:
        "Absolutely! The theme supports multi-language options, and you can easily integrate your local language using translation plugins.",
    },
    {
      id: 4,
      question:
        "Why The Price Of Aiglobe Is Affordable Compared To Other Themes Providing Similar Features?",
      answer:
        "Aiglobe offers competitive pricing by optimizing development costs and providing a streamlined feature set without compromising quality.",
    },
    {
      id: 5,
      question: "Is There A Money-Back Guarantee?",
      answer:
        "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the theme.",
    },
    {
      id: 6,
      question: "How Can I Get Support For Customization?",
      answer:
        "You can reach our support team via email or our dedicated support portal for assistance with customization.",
    },
    {
      id: 7,
      question: "Can I Use This Theme For Multiple Websites?",
      answer:
        "The license allows use on a single site. For multiple sites, you'll need to purchase additional licenses.",
    },
  ];

  const features = [
    {
      id: 1,
      title: "Expert Mentors",
      description:
        "Learn from industry professionals with years of real-world experience",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2c52be" strokeWidth="2">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Hands-on Projects",
      description:
        "Build real-world applications and add them to your portfolio",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff822b" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="9" y1="9" x2="15" y2="9" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Career Support",
      description:
        "Get placement assistance and interview preparation guidance",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#2c52be" strokeWidth="2">
          <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Flexible Learning",
      description:
        "Learn at your own pace with lifetime access to course materials",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ff822b" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
  ];

  const [expanded, setExpanded] = useState(null);

  const handleToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      <div className={styles["main-content"]}>
        <div className={styles["content-wrapper"]}>
          <div className={styles["text-section"]}>
            <h1>Empowering Students with Future-Ready Skills</h1>

            {/* Icon Badges */}
            <div className={styles["iconContainer"]}>
              <div className={styles["iconBox"]}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#2c52be"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Certified Programs</span>
              </div>
              <div className={styles["iconBox"]}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    stroke="#ff822b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Live Sessions</span>
              </div>
              <div className={styles["iconBox"]}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    stroke="#2c52be"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>24/7 Support</span>
              </div>
            </div>

            <p>
              At Ziion Technology, we go beyond traditional learning methods to
              provide industry-relevant training programs. Our courses are
              designed to help students gain hands-on experience in fields like
              Web Development, Data Science, Artificial Intelligence, Mobile App
              Development, and Graphic Designing.
            </p>

            <Link to="/placement">
              <button className={styles.learMoreBtn}>
                <span>Learn More</span>
              </button>
            </Link>
          </div>

          <div className={styles["code-section"]}>
            <div className={styles["code-block"]}>
              <div className={styles["code-circle"]}>
                <span className={styles.circle}></span>
                <span className={styles.circle}></span>
                <span className={styles.circle}></span>
              </div>
              <pre>
                <code
                  dangerouslySetInnerHTML={{
                    __html: `<span style="color: #f97583">const</span> <span style="color: #79b8ff">ZiionTech</span> <span style="color: #ffffff">= {</span>
  <span style="color: #79b8ff">mission</span>: <span style="color: #9ecbff">"Empowering Future"</span><span style="color: #ffffff">,</span> 
  <span style="color: #79b8ff">programs</span> <span style="color: #ffffff">: [</span> 
    <span style="color: #9ecbff">"Web Development"</span><span style="color: #ffffff">,</span> 
    <span style="color: #9ecbff">"Data Science"</span><span style="color: #ffffff">,</span> 
    <span style="color: #9ecbff">"AI & Machine Learning"</span><span style="color: #ffffff">,</span> 
    <span style="color: #9ecbff">"Mobile App Dev"</span><span style="color: #ffffff">,</span> 
    <span style="color: #9ecbff">"Graphic Design"</span><span style="color: #ffffff">,</span> 
  ],
  <span style="color: #79b8ff">features</span><span style="color: #ffffff">: [</span> 
    <span style="color: #79b8ff">mentors</span>: <span style="color: #9ecbff">"Industry Experts"</span> <span style="color: #ffffff">,</span> 
    <span style="color: #79b8ff">learning</span>: <span style="color: #9ecbff">"Hands-on Projects"</span><span style="color: #ffffff">,</span> 
    <span style="color: #79b8ff">support</span>: <span style="color: #9ecbff">"Career Guidance"</span><span style="color: #ffffff">,</span> 
    <span style="color: #79b8ff">access</span>: <span style="color: #9ecbff">"Lifetime Access"</span><span style="color: #ffffff">,</span> 
  },
  <span style="color: #79b8ff">stats</span><span style="color: #ffffff">: [</span> 
    <span style="color: #79b8ff">companies</span>: <span style="color: #9ecbff">"200+"</span><span style="color: #ffffff">,</span> 
    <span style="color: #79b8ff">students</span>: <span style="color: #9ecbff">"5000+"</span><span style="color: #ffffff">,</span> 
    <span style="color: #79b8ff">placement</span>: <span style="color: #9ecbff">"98%"</span><span style="color: #ffffff">,</span> 
<span style="color: #ffffff">  } 
<span style="color: #ffffff">}</span> </span> `,
                  }}
                />
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className={styles["featuresGrid"]}>
        {features.map((feature) => (
          <div key={feature.id} className={styles["featureCard"]}>
            <div className={styles["featureIcon"]}>{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <section className={styles.faqNextContainer}>
        <div className={styles.left}>
          <h1 className={styles.title}>
            <span className={styles.titleGradient}>Empowering Learners</span>{" "}
            with Innovative Education
          </h1>
          <p className={styles.subtitle}>
            At Ziion EdTech, we specialize in providing next-generation online
            learning, skill development programs, and digital solutions that
            prepare students and professionals for the future of work. Our
            mission is to make learning accessible, engaging, and impactful
            through technology, creativity, and expertise.
          </p>
          <Link to="/placement">
            <button
              className={styles.headerBtn}
              onClick={() => setShowForm(true)}
            >
              Talk to us
            </button>
          </Link>
        </div>

        {/* --- MODIFIED: Removed .blue, .green, .red classes --- */}
        <div className={styles.right}>
          <div className={styles.card}>
            <h2 className={styles.number}>200+</h2>
            <p className={styles.label}>Hiring Partners</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.number}>5000+</h2>
            <p className={styles.label}>Students Enrolled</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.number}>98%</h2>
            <p className={styles.label}>Placement Rate</p>
          </div>
        </div>
      </section>

      <ReviewsSection />
      <StudentGallery />
      <SecondForm />

      {/* This is the FAQ section you provided in your original code.
        I'm keeping it here as it was part of the original file structure,
        but it's not rendered unless you map over the `faqs` array.
      */}
      {/* <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
          <p className={styles.faqSubtitle}>
            Find answers to common questions about our platform and services.
          </p>
        </div>
        <div className={styles.faqMain}>
          {faqs.map((faq) => (
            <div key={faq.id} className={styles.faqItem}>
              <div className={styles.faqQuestion} onClick={() => handleToggle(faq.id)}>
                {faq.question}
                <span className={`${styles.arrow} ${expanded === faq.id ? styles.arrowUp : ''}`}>
                  &gt;
                </span>
              </div>
              {expanded === faq.id && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      */}
    </>
  );
};

export default MainContent;
