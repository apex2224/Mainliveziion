import React, { useState, useEffect } from "react";
import styles from "./graphic.module.css";
import images from "../../../assets/images";
import Navbar from "../../head/Navbar";
import Footer from "../../footer/Footer";
import EnrollProcess from "../ProcessSection/EnrollProcess";
import Form from "../../form/Form";
import ReviewsSection from "../../reviews/ReviewsSection";
import SecondForm from "../../secondForm/SecondForm";
import tenplustwo from "./../../../assets/NewCoursesImages/10+2.png";

// Import React Icons
import {
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiFigma,
  SiCanva,
  SiAdobeaftereffects,
  SiCoreldraw,
  SiBlender
} from 'react-icons/si';

// Constants
const TYPING_CONFIG = {
  TYPING_SPEED: 100,
  DELETING_SPEED: 50,
  PAUSE_DURATION: 1200,
};

// --- DATA ---
const heroPhrases = ['Be a Graphic Designer', 'Design Your Creative Future'];

const statsData = [
  { value: '5000+', label: 'Students Trained' },
  { value: '15+', label: 'Courses Offered' },
  { value: '98%', label: 'Placement Success Rate' },
  { value: '10+', label: 'Years Of Experience' },
];

const toolsData = [
  { name: "Adobe Photoshop", description: "Image editing & retouching.", icon: <SiAdobephotoshop size={50} color="#31A8FF" /> },
  { name: "Adobe Illustrator", description: "Vector graphics & logos.", icon: <SiAdobeillustrator size={50} color="#FF9A00" /> },
  { name: "Adobe InDesign", description: "Layouts for print & digital.", icon: <SiAdobeindesign size={50} color="#EE3D8F" /> },
  { name: "Figma", description: "UI/UX & prototyping.", icon: <SiFigma size={50} color="#F24E1E" /> },
  { name: "Canva", description: "Quick social media designs.", icon: <SiCanva size={50} color="#00C4CC" /> },
  { name: "After Effects", description: "Motion graphics & VFX.", icon: <SiAdobeaftereffects size={50} color="#9999FF" /> },
  { name: "CorelDRAW", description: "Vector illustration tool.", icon: <SiCoreldraw size={50} color="#00B388" /> },
  { name: "Blender", description: "3D modeling & animation.", icon: <SiBlender size={50} color="#F5792A" /> },
];

// --- CUSTOM HOOKS ---
const useTypewriter = (phrases) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(TYPING_CONFIG.TYPING_SPEED);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? TYPING_CONFIG.DELETING_SPEED : TYPING_CONFIG.TYPING_SPEED);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), TYPING_CONFIG.PAUSE_DURATION);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return text;
};

// --- SUB-COMPONENTS ---

const HeroSection = ({ typedText, onShowForm }) => (
  <section className={styles.webDesigningHeroSection}>
    <div className={styles.overlay}>
      <SiAdobephotoshop className={styles.html} size={40} />
      <SiAdobeillustrator className={styles.css} size={40} />
      <SiAdobeindesign className={styles.js} size={40} />
      <SiFigma className={styles.react} size={40} />
      <SiAdobeaftereffects className={styles.mongo} size={40} />
      <SiCanva className={styles.express} size={40} />
    </div>

    <div className={styles.webDesigningContent}>
      <div className={styles.webDesigningTitle}>
        <span className={styles.gradientText}>Graphic Designing Course</span>
        <span className={styles.gradientText}>in Chandigarh</span>
        <h2 style={{ fontSize: '2rem', marginTop: '10px' }}>
          <span className={styles.typedText}>{typedText}</span>
          <span className={styles.cursor}>|</span>
        </h2>
      </div>

      <p className={styles.webDesigningSubtitle}>
        Master Photoshop, Illustrator, InDesign, Figma, and Motion Graphics. 
        Build a stunning creative portfolio that meets modern industry standards.
      </p>

      <button className={styles.herobutton} onClick={onShowForm}>
        Talk to us
      </button>
    </div>
  </section>
);

const StatsSection = ({ stats }) => (
  <div className={styles.statsWrapper}>
    {stats.map((stat, index) => (
      <div className={styles.statCircle} key={index}>
        <div className={styles.statValue}>{stat.value}</div>
        <div className={styles.statLabel}>{stat.label}</div>
      </div>
    ))}
  </div>
);

const ToolsSection = ({ tools, onShowForm }) => (
  <section className={styles.toolsMain}>
    <h1>Tools You Will Master</h1>
    <div className={styles.webdevtoolsContainer}>
      {tools.map((tool, index) => (
        <div key={index} className={styles.webdevtools}>
          <div className={styles.webdevtoolsFeature}>{tool.icon}</div>
          <div className={styles.textBlock}>
            <div className={styles.title}>{tool.name}</div>
            <p className={styles.toolDescription}>{tool.description}</p>
          </div>
        </div>
      ))}
    </div>
    <button className={styles.herobutton} onClick={onShowForm}>Talk to us</button>
  </section>
);

const LearningSection = () => {
  const [activeAudience, setActiveAudience] = useState("students");
  
  const audienceData = {
    students: {
      title: "Students (10th/12th Pass)",
      description: "Start early! Learn industry tools like Photoshop & Canva and build a strong portfolio for internships.",
      icon: "🎓", subtitle: "Start your journey"
    },
    graduates: {
      title: "Graduates / Job Seekers",
      description: "Get job-ready skills for roles like Graphic Designer, UI/UX Intern, or Branding Assistant.",
      icon: "💼", subtitle: "Launch career"
    },
    freelancers: {
      title: "Freelancers",
      description: "Create compelling visuals for clients. Learn to design logos, banners, and social posts.",
      icon: "💻", subtitle: "Build your brand"
    },
    professionals: {
      title: "Working Professionals",
      description: "Upskill to contribute in marketing or creative departments with modern design principles.",
      icon: "📈", subtitle: "Upgrade skills"
    },
  };

  const activeContent = audienceData[activeAudience];

  return (
    <div className={styles.container}>
      <h1 className={styles.whatHeading}>Who Can Join Our Course?</h1>
      <p className={styles.subheading}>Explore our curriculum to discover the creative skills you'll gain.</p>

      <div className={styles.roadmapBox}>
        <div className={styles.leftSection}>
          {Object.entries(audienceData).map(([key, data]) => (
            <button
              key={key}
              className={`${styles.audienceTab} ${activeAudience === key ? styles.active : ""}`}
              onClick={() => setActiveAudience(key)}
            >
              <span className={styles.tabIcon}>{data.icon}</span>
              <div>
                <strong>{data.title}</strong>
                <span className={styles.tabSubtext}>{data.subtitle}</span>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.rightSection}>
          <img src={tenplustwo} alt={activeContent.title} className={styles.whatlearnimg} />
          <h3 className={styles.contentTitle}>{activeContent.title}</h3>
          <p className={styles.contentDescription}>{activeContent.description}</p>
        </div>
      </div>
    </div>
  );
};

// --- NEW: Redesigned Syllabus Section ---
const SyllabusSection = ({ syllabusData }) => {
  const [openTopic, setOpenTopic] = useState(null);
  const toggle = (topic) => setOpenTopic(openTopic === topic ? null : topic);

  // Split data for the two columns
  const topicKeys = Object.keys(syllabusData);
  const midPoint = Math.ceil(topicKeys.length / 2);
  const leftTopics = topicKeys.slice(0, midPoint);
  const rightTopics = topicKeys.slice(midPoint);

  // Helper function to render an accordion item
  const renderAccordion = (topic, index, offset = 0) => (
    <div key={topic} className={styles.accordionItem}>
      <div className={styles.accordionHeader} onClick={() => toggle(topic)}>
        {/* Add numbering like in the image */}
        <span className={styles.accordionTitle}>{index + 1 + offset}. {topic}</span>
        <span className={styles.accordionIcon}>{openTopic === topic ? "▲" : "▼"}</span>
      </div>
      {openTopic === topic && (
        <div className={styles.accordionBody}>
          <ul className={styles.syllabusList}>
            {syllabusData[topic].map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <section className={styles.syllabusSection}>
      {/* Title and Subtitle matching the image style */}
      <h1 className={styles.syllabusTitle}>Graphic Designing Course Syllabus</h1>
      <p className={styles.syllabusSubtitle}>
        Our curriculum is designed by industry experts to build your skills from the ground up, covering everything from design principles to advanced tools like Photoshop, Illustrator, and Motion Graphics.
      </p>

      <div className={styles.syllabusGrid}>
        {/* Left Column */}
        <div className={styles.syllabusColumn}>
          <h3 className={styles.columnHeader}>Core Design Skills</h3>
          <div className={styles.accordionGroup}>
            {leftTopics.map((topic, index) => renderAccordion(topic, index))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.syllabusColumn}>
          <h3 className={styles.columnHeader}>Advanced & Specialized Skills</h3>
          <div className={styles.accordionGroup}>
            {rightTopics.map((topic, index) => renderAccordion(topic, index, leftTopics.length))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = ({ questions }) => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className={styles.faqContainer}>
      <div className={styles.faqContent}>
        <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
        {questions.map((q, i) => (
          <div key={i} className={styles.faqFaqCard}>
            <div className={styles.faqFaqHeader} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
              <span className={styles.faqQuestionText}>{q.question}</span>
              <span className={styles.faqIconCircle}>{openIndex === i ? "−" : "+"}</span>
            </div>
            {openIndex === i && <div className={styles.faqFaqBody}>{q.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

const CertificateSection = () => (
  <section className={styles.certificateSection}>
    <div className={styles.mainContainer}>
      <div className={styles.certificateImage}>
        <img src={images.certificatehero} alt="Certificate" />
      </div>
      <div className={styles.certificateContent}>
        <h2>Benefits of Certification</h2>
        <span className={styles.highlight}>Authorized & Recognized Industry Certification</span>
        <p className={styles.description}>
          Our certification validates your skills in Graphic Design, recognized by top agencies and companies. 
          Use it to boost your LinkedIn profile and resume.
        </p>
      </div>
    </div>
    <div className={styles.certificateGallery}>
      {[images.nisha, images.kavya, images.kritish, images.mohit].map((img, i) => (
        <img key={i} src={img} alt={`Cert ${i}`} />
      ))}
    </div>
  </section>
);

// --- MAIN COMPONENT ---

const GraphicDesigning = () => {
  const [showForm, setShowForm] = useState(false);
  const typedOutput = useTypewriter(heroPhrases);

  return (
    <div>
      <Navbar />
      <HeroSection typedText={typedOutput} onShowForm={() => setShowForm(true)} />
      {showForm && <Form closeForm={() => setShowForm(false)} />}
      
      <StatsSection stats={statsData} />
      <ToolsSection tools={toolsData} onShowForm={() => setShowForm(true)} />
      <LearningSection />
      <EnrollProcess />
      
      <SyllabusSection syllabusData={syllabusData} />
      <ReviewsSection />
      <FAQSection questions={faqQuestions} />
      <CertificateSection />
      <SecondForm />
      <Footer />
    </div>
  );
};

// --- DATA EXPORTS ---
export const syllabusData = {
  "Introduction to Design": ["Design Principles", "Color Theory", "Typography", "Design Thinking"],
  "Adobe Photoshop": ["Retouching", "Layers & Masks", "Color Grading", "Compositing"],
  "Adobe Illustrator": ["Vector Art", "Logo Design", "Typography", "Print Prep"],
  "Adobe InDesign": ["Layout Design", "Magazines", "Brochures", "E-books"],
  "UI/UX Basics (Figma)": ["Wireframing", "Prototyping", "User Research", "App Design"],
  "Motion Graphics": ["After Effects Basics", "Keyframing", "Animation Principles", "Rendering"]
};

export const faqQuestions = [
  { question: 'What will I learn?', answer: 'Photoshop, Illustrator, InDesign, Figma, and Motion Graphics principles.' },
  { question: 'Is this beginner friendly?', answer: 'Yes, we start from scratch.' },
  { question: 'Do I get a certificate?', answer: 'Yes, a valid industry-recognized certificate.' },
  { question: 'Is placement support provided?', answer: 'Yes, we provide 100% placement assistance.' },
];

export default GraphicDesigning;