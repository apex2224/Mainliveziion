import React, { useState, useEffect, useRef } from 'react'
import styles from './digitalMarketing.module.css'
import images from '../../../assets/images'
import Navbar from '../../head/Navbar';
import Footer from '../../footer/Footer';
import { statsData, heroPhrases, chooseUsLeftItems, chooseUsRightItems, careerOpportunities, faqQuestions, syllabusData, leftScrollCards } from './digitalMarketingData';
import EnrollProcess from '../ProcessSection/EnrollProcess';
import Certification from '../../Certification/Certification';
import Form from '../../form/Form'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ReviewsSection from '../../reviews/ReviewsSection';
import SecondForm from '../../secondForm/SecondForm';
import StudentCarousel from '../../placement/StudentCarousel';





const rightScrollCards = [
    { image: images.vartika },
    { image: images.himanshu },
    { image: images.sharanjeet },
    { image: images.manish },
    { image: images.rupal },
    { image: images.shubham },
    { image: images.simranjeet },
    { image: images.simrat },
      { image: images.kavyaPaurya },
        { image: images.kritish },
        { image: images.anuj },
        { image: images.nikita },
    { image: images.abhishek },
];

const CARD_WIDTH = 300; // px
const VIDEO_WIDTH = 310; // px



const useCustomTypewriter = (phrasesArray) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);



  useEffect(() => {
    const currentPhrase = phrasesArray[currentPhraseIndex];
    let typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrasesArray.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentPhraseIndex, phrasesArray]);

  return text;
}
const DigitalMarketing = () => {
  const [showForm, setShowForm] = useState(false);

  const typedOutput = useCustomTypewriter(heroPhrases);

  const [openIndex, setOpenIndex] = useState(null);
  const faqRefs = useRef([]);

  
  // certificate //
    const [active, setActive] = useState(null);



  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {

    faqRefs.current.forEach((ref, i) => {
      if (ref) {
        if (i === openIndex) {
          ref.classList.add(styles.openBody);
        } else {
          ref.classList.remove(styles.openBody);
        }
      }
    });
  }, [openIndex]);

  const [selected, setSelected] = useState(Object.keys(syllabusData)[0] || '');


// placement //
  // Top (left → right)
    const [topIndex, setTopIndex] = useState(0);
    const [topTransition, setTopTransition] = useState(true);

    // Bottom (right → left)
    const [bottomIndex, setBottomIndex] = useState(0);
    const [bottomTransition, setBottomTransition] = useState(true);

    // Carousel play/pause state
    const [isTopPaused, setIsTopPaused] = useState(false);
    const [isBottomPaused, setIsBottomPaused] = useState(false);

    // Auto move top carousel
    useEffect(() => {
        if (isTopPaused) return;
        const id = setInterval(() => {
            setTopIndex((prev) => prev + 1);
        }, 2000);
        return () => clearInterval(id);
    }, [isTopPaused]);

    // Auto move bottom carousel
    useEffect(() => {
        if (isBottomPaused) return;
        const id = setInterval(() => {
            setBottomIndex((prev) => prev + 1);
        }, 2200);
        return () => clearInterval(id);
    }, [isBottomPaused]);

    // Reset loop for top
    useEffect(() => {
        if (topIndex >= rightScrollCards.length) {
            setTimeout(() => {
                setTopTransition(false);
                setTopIndex(0);
                requestAnimationFrame(() => setTopTransition(true));
            }, 800);
        }
    }, [topIndex]);

    // Reset loop for bottom
    useEffect(() => {
        if (bottomIndex >= leftScrollCards.length) {
            setTimeout(() => {
                setBottomTransition(false);
                setBottomIndex(0);
                requestAnimationFrame(() => setBottomTransition(true));
            }, 800);
        }
    }, [bottomIndex]);

    // Pause on hover handlers
    const handleTopMouseEnter = () => setIsTopPaused(true);
    const handleTopMouseLeave = () => setIsTopPaused(false);

    const handleBottomMouseEnter = () => setIsBottomPaused(true);
    const handleBottomMouseLeave = () => setIsBottomPaused(false);

    // Manual buttons
    const handleTopPrev = () => {
        setTopIndex((prev) => (prev === 0 ? rightScrollCards.length - 1 : prev - 1));
    };
    const handleTopNext = () => {
        setTopIndex((prev) => (prev === rightScrollCards.length - 1 ? 0 : prev + 1));
    };

    const handleBottomPrev = () => {
        setBottomIndex((prev) => (prev === 0 ? leftScrollCards.length - 1 : prev - 1));
    };
    const handleBottomNext = () => {
        setBottomIndex((prev) => (prev === leftScrollCards.length - 1 ? 0 : prev + 1));
    };


  return (
    <div>
      <Navbar />
      <section className={styles.webDesigningHeroSection}>
        <div className={styles.overlay}>
          <img src={images.analytics} alt="analytics" className={styles.analytics} />
          <img src={images.search} alt="search" className={styles.search} />
          <img src={images.keywords} alt="tag" className={styles.tag} />
          <img src={images.seo} alt="seo" className={styles.seo} />
          <img src={images.datahandling} alt="datahandling" className={styles.datahandling} />
        </div>

        <div className={styles.webDesigning}>
          <img src={images.knowledgeHeroImage} alt="background" className={styles.webDesigningBgImage} />
        </div>

        <div className={styles.webDesigningContent}>
          <h1 className={styles.webDesigningTitle}>
            <span className={`${styles.webDesigningFalldown} ${styles.gradientText}`}>
              Digital Marketing Course in Chandigarh <br />
              <span className={styles.typedText}>{typedOutput}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>
          <h2 className={styles.webDesigningSubtitle}>
            Our Digital Marketing Course offers hands-on training in SEO, Google Ads, Social Media, and more—helping you run impactful campaigns that drive real results.
          </h2>
          <button className={styles.herobutton} onClick={() => setShowForm(true)}>
            Talk to us
          </button>
          {showForm && <Form closeForm={() => setShowForm(false)} />}
        </div>
      </section>

      {/* stat section */}
      <div className={styles.statsWrapper}>
        {statsData.map((stat, index) => (
          <div className={styles.statCircle} key={index}>
            <div className={styles.statsrotatingRing}></div>
            <div className={styles.statContent}>
              <h2 className={styles.statValue}>{stat.value}</h2>
              <p className={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>




      {/* tools */}
      <section className={styles.toolsMain}>
        <h1>Tools</h1>
        <div className={styles.webdevtoolsContainer}>

          <div className={styles.webdevtools}>
            <div>
              <h3 className={styles.title}>Analytics</h3>
              <p className={styles.description}>
                Analytics tools help track, measure, and optimize website and campaign performance.
                They provide insights into user behavior, traffic sources, and conversions — enabling
                smarter data-driven decisions.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.analytics} alt="Analytics" className={styles.webdevtoolsFeatureImg} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.datahandling} alt="Data Handling" className={styles.webdevtoolsFeatureImg} />
            </div>
            <div>
              <h3 className={styles.title}>Data Handling</h3>
              <p className={styles.description}>
                Data handling ensures structured storage, cleaning, and processing of information.
                Effective handling allows businesses to extract insights, maintain accuracy,
                and scale digital solutions seamlessly.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div>
              <h3 className={styles.title}>Keywords</h3>
              <p className={styles.description}>
                Keywords form the backbone of SEO and content marketing strategies.
                They connect user intent with business offerings, making them vital
                for search rankings and targeted traffic generation.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.keywords} alt="Keywords" className={styles.webdevtoolsFeatureImg} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.seo} alt="SEO" className={styles.webdevtoolsFeatureImg} />
            </div>
            <div>
              <h3 className={styles.title}>SEO</h3>
              <p className={styles.description}>
                Search Engine Optimization (SEO) improves visibility in search results
                through on-page, off-page, and technical strategies. It’s the key to driving
                organic traffic and building long-term online authority.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div>
              <h3 className={styles.title}>Search</h3>
              <p className={styles.description}>
                Search technology powers information discovery, from Google queries
                to advanced in-site search engines. Effective search optimization
                ensures users quickly find the most relevant results.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.search} alt="Search" className={styles.webdevtoolsFeatureImg} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.tag} alt="Tag Management" className={styles.webdevtoolsFeatureImg} />
            </div>
            <div>
              <h3 className={styles.title}>Tag Management</h3>
              <p className={styles.description}>
                Tags are essential for organizing content, tracking events, and
                managing marketing scripts. Tag management systems streamline
                how businesses deploy analytics and marketing tools.
              </p>
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div>
              <h3 className={styles.title}>Uber Case Study</h3>
              <p className={styles.description}>
                Uber showcases the power of scalable technology, leveraging
                real-time data, geolocation, and AI to deliver seamless user
                experiences in ride-sharing and beyond.
              </p>
            </div>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.uber} alt="Uber" className={styles.webdevtoolsFeatureImg} />
            </div>
          </div>

          <div className={styles.webdevtools}>
            <div className={styles.webdevtoolsFeature}>
              <img src={images.screaming} alt="Screaming Frog SEO" className={styles.webdevtoolsFeatureImg} />
            </div>
            <div>
              <h3 className={styles.title}>Screaming Frog</h3>
              <p className={styles.description}>
                Screaming Frog is a powerful SEO tool used for crawling websites,
                auditing technical SEO issues, analyzing metadata, and uncovering
                optimization opportunities for better rankings.
              </p>
            </div>
          </div>

        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </section>




      {/* what will you learn */}
      <div className={styles.container}>
        <h1 className={styles.whatHeading}>Who Can Join Our Digital Marketing Course?</h1>

        <p className={styles.subheading}>
          Explore our <strong>SEO training course</strong> curriculum to discover exactly what you'll master in the world of Search Engine Optimization.
          SEO Markit is one of India’s leading industrial training institutes, providing in-depth SEO training to aspiring <strong>digital marketers</strong>.
        </p>


        <div className={styles.roadmapBox}>
          <div className={styles.leftSection}>
            <div className={styles.whoCanJoinSection}>
              <h2 className={styles.sectionTitle}>Who Can Join & What You'll Gain</h2>
              <ul className={styles.pointsList}>
                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Students (10th/12th Pass)</strong><br />
                    Turn your curiosity into a career! Get early exposure to real-world tech skills and unlock internships or junior roles in web, design, or digital sectors.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Graduates / Job Seekers</strong><br />
                    Bridge the gap between education and employment. Master job-relevant tools and confidently apply for high-demand roles in tech, marketing, or business.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Freelancers & Entrepreneurs</strong><br />
                    Transform your ideas into income. Learn to build websites, promote your brand online, and scale your freelance services or startup with digital excellence.
                  </div>
                </li>

                <li className={styles.pointItem}>
                  <span className={styles.arrow}>→</span>
                  <div>
                    <strong>Working Professionals (Upskilling)</strong><br />
                    Future-proof your career. Stay ahead in your field, shift into trending tech roles, or gain the edge for promotions and leadership opportunities.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.rightSection}>
            <img
              src={images.willGet}
              alt="Web Training Roadmap"
              className={styles.whatlearnimg}
            />
          </div>
        </div>
      </div>


      <EnrollProcess />
      
      {/* placemnet */}
       <div>
                  <h1 className={styles.storyHeading}>Our Success Story</h1>
      
                 
      
                  {/* 🔹 Bottom: videos, right → left */}
                  <div className={styles.leftCarouselWrapper}>
                      <div
                          className={styles.leftCarousel}
                          style={{
                              transform: `translateX(-${bottomIndex * VIDEO_WIDTH}px)`,
                              transition: bottomTransition ? "transform 0.8s ease-in-out" : "none",
                          }}
                          onMouseEnter={handleBottomMouseEnter}
                          onMouseLeave={handleBottomMouseLeave}
                      >
                          {[...leftScrollCards, ...leftScrollCards].map((item, i) => (
                              <div key={i} className={styles.leftCard}>
                                  <iframe
                                      src={item.iframe}
                                      className={styles.leftIframe}
                                      title={`video-${i}`}
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                      allowFullScreen
                                      loading="lazy"
                                  />
                                  <div className={styles.leftProfileSection}>{item.name}</div>
                                  <div className={styles.leftCompanySection}>{item.company}</div>
                              </div>
                          ))}
                      </div>
                      <div className={styles.carouselButtons}>
                          <button onClick={handleBottomPrev} className={styles.carouselBtn}>◀️</button>
                          <button onClick={handleBottomNext} className={styles.carouselBtn}>▶️</button>
                      </div>
                  </div>


                   {/* 🔹 Top: images, left → right */}
                  <div className={styles.carouselWrapper}>
                      <div
                          className={styles.carousel}
                          style={{
                              // Start far left, move towards 0
                              transform: `translateX(${-rightScrollCards.length * CARD_WIDTH + topIndex * CARD_WIDTH
                                  }px)`,
                              transition: topTransition ? "transform 0.8s ease-in-out" : "none",
                          }}
                          onMouseEnter={handleTopMouseEnter}
                          onMouseLeave={handleTopMouseLeave}
                      >
                          {[...rightScrollCards, ...rightScrollCards].map((item, i) => (
                              <div key={i} className={styles.card}>
                                  <img src={item.image} alt="student" className={styles.cardImage} />
                              </div>
                          ))}
                      </div>
                      <div className={styles.carouselButtons}>
                          <button onClick={handleTopPrev} className={styles.carouselBtn}>◀️</button>
                          <button onClick={handleTopNext} className={styles.carouselBtn}>▶️</button>
                      </div>
      
                  </div>
              </div>
      
      


      <StudentCarousel/>




      {/* sylabus */}
      <div className={styles.syllabusContainer}>
        <h1>What Will Our Trainees Learn In Digital Marketing Training</h1>
        <p>Explore our <strong>Digital Marketing training course</strong> curriculum to know exactly what skills you will gain. Ziion Technology is one of India’s leading industrial training institutes, offering comprehensive training to our <strong>trainees</strong> in SEO, social media marketing, content strategy, and online advertising.</p>

       
        <div className={styles.syllabusWrapper}>
         {/* Left side - topic list */}
         <div className={styles.topicList}>
           <ul className={styles.syllabusList}>
             {Object.keys(syllabusData).map((topic) => (
               <li
                 key={topic}
                 className={`${styles.topicItem} ${selected === topic ? styles.active : ''}`}
                 onClick={() => setSelected(topic)}
               >
                 {topic}
               </li>
             ))}
           </ul>
         </div>
       
         {/* Right side - topic details */}
         <div className={styles.topicDetails}>
           <h3>{selected}:</h3>
           <ul className={styles.syllabusList}>
             {syllabusData[selected]?.map((item, index) => (
               <li key={index}>{item}</li>
             ))}
           </ul>
         </div>
       </div>
      </div>




{/* project */}
<div className={styles.projectBackModal}>
  <section className={styles.projectSection}>
    
    {/* Heading */}
    <div className={styles.projectSectionHeader}>
      <h2 className={styles.projectSectionHeading}>
        Digital Marketing Projects Driving Growth
      </h2>
    </div>

    {/* Grid */}
    <div className={styles.projectSectionGrid}>
      
      {/* Project 1 */}
      <div className={`${styles.projectSectionCard} ${styles.project1}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>📢</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>Social Media Campaign Optimization</h3>
          <p className={styles.projectSectionDesc}>
            Analyzed engagement metrics to optimize ad targeting, boosting ROI across Facebook, Instagram, and LinkedIn campaigns.
          </p>
        </div>
      </div>

      {/* Project 2 */}
      <div className={`${styles.projectSectionCard} ${styles.project2}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>✉️</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>Email Marketing Analytics</h3>
          <p className={styles.projectSectionDesc}>
            Designed A/B testing strategies to improve email open rates and conversion through data-driven personalization.
          </p>
        </div>
      </div>

      {/* Project 3 */}
      <div className={`${styles.projectSectionCard} ${styles.project3}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>🔍</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>SEO Performance Tracking</h3>
          <p className={styles.projectSectionDesc}>
            Conducted keyword research and analytics to enhance website visibility and improve organic search rankings.
          </p>
        </div>
      </div>

      {/* Project 4 */}
      <div className={`${styles.projectSectionCard} ${styles.project4}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>💰</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>Pay-Per-Click (PPC) Campaigns</h3>
          <p className={styles.projectSectionDesc}>
            Managed Google Ads and Bing Ads campaigns, leveraging analytics to optimize click-through rates and conversions.
          </p>
        </div>
      </div>

      {/* Project 5 */}
      <div className={`${styles.projectSectionCard} ${styles.project5}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>📊</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>Customer Journey Mapping</h3>
          <p className={styles.projectSectionDesc}>
            Built data-driven journey maps to understand customer behavior across touchpoints and improve funnel efficiency.
          </p>
        </div>
      </div>

      {/* Project 6 */}
      <div className={`${styles.projectSectionCard} ${styles.project6}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>🎥</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>Video Marketing Analytics</h3>
          <p className={styles.projectSectionDesc}>
            Evaluated YouTube and TikTok campaign performance, optimizing content strategies for higher engagement.
          </p>
        </div>
      </div>

      {/* Project 7 */}
      <div className={`${styles.projectSectionCard} ${styles.project7}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>🛍️</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>E-Commerce Conversion Optimization</h3>
          <p className={styles.projectSectionDesc}>
            Applied analytics and A/B testing to improve product page layouts and increase online store conversions.
          </p>
        </div>
      </div>

      {/* Project 8 */}
      <div className={`${styles.projectSectionCard} ${styles.project8}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>🤝</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>Influencer Marketing ROI</h3>
          <p className={styles.projectSectionDesc}>
            Measured campaign effectiveness of influencer collaborations, identifying high-performing partnerships.
          </p>
        </div>
      </div>

      {/* Project 9 */}
      <div className={`${styles.projectSectionCard} ${styles.project9}`}>
        <div className={styles.projectSectionIconWrapper}>
          <div className={styles.projectSectionIcon}>📱</div>
        </div>
        <div className={styles.projectSectionContent}>
          <h3 className={styles.projectSectionTitle}>Mobile App Marketing Analytics</h3>
          <p className={styles.projectSectionDesc}>
            Tracked installs, user retention, and in-app engagement to optimize mobile marketing strategies and app monetization.
          </p>
        </div>
      </div>

    </div>
  </section>
</div>





      {/* carrer opportunities*/}

      <div className={styles.carerrOpportunities}>
        <h2 className={styles.opportunitiesHeading}>
          💼 Career <span>Opportunities</span> After This Course.
        </h2>
        <div className={styles.careerOpportunitiesGrid}>
          {careerOpportunities.map((service, index) => (
            <div
              key={index}
              className={`${styles.careerCard} ${styles.curveTopRight} ${styles.curveBottomLeft}`}
            >
              <div className={styles.careerCardContent}>
                <div className={styles.careerIcon}></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.herobutton} onClick={() => setShowForm(true)}>
          Talk to us
        </button>
      </div>







 {/* certificate section */}

<section className={styles.achieversSection}>
  <div className={styles.achieversInner}>
    <h2 id="achievers-title" className={styles.achieversTitle}>
      <span className={styles.shimmer}>Our Achievers</span>
    </h2>

    <p className={styles.achieversSubtitle}>
      From <span className={styles.highlight}>classroom</span> to{" "}
      <span className={styles.highlight}>career</span> — turning ambition into offers at leading companies.
    </p>
  </div>

  <div className={styles.appFeatureContainer}>
    {/* Aayush - Data Science */}
    <div
      className={`${styles.appFeatureCard} ${active === 'nisha' ? styles.active : ''}`}
      onMouseEnter={() => setActive('nisha')}
      onMouseLeave={() => setActive(null)}
    >
      <img src={images.vartika} className={styles.appFeatureImage} alt="Aayush" />
      <div className={styles.appFeatureOverlay}>
        {active === 'nisha' && (
          <p className={styles.appFeatureText}>
            “Data is powerful — those who master it, master the future.”
          </p>
        )}
      </div>
    </div>

    {/* Abhishek - Data Science */}
    <div
      className={`${styles.appFeatureCard} ${active === 'parmeet' ? styles.active : ''}`}
      onMouseEnter={() => setActive('parmeet')}
      onMouseLeave={() => setActive(null)}
    >
      <img src={images.sharanjeet} className={styles.appFeatureImage} alt="Abhishek" />
      <div className={styles.appFeatureOverlay}>
        {active === 'parmeet' && (
          <p className={styles.appFeatureText}>
            “Consistency in learning turns raw data into career-changing insights.”
          </p>
        )}
      </div>
    </div>
     {/* Harmanpreet - Data Science */}
    <div
      className={`${styles.appFeatureCard} ${active === 'rupalpreet' ? styles.active : ''}`}
      onMouseEnter={() => setActive('rupalpreet')}
      onMouseLeave={() => setActive(null)}
    >
      <img src={images.manish} className={styles.appFeatureImage} alt="Harmanpreet" />
      <div className={styles.appFeatureOverlay}>
        {active === 'rupalpreet' && (
          <p className={styles.appFeatureText}>
            “Failures are just experiments — keep iterating, keep improving.”
          </p>
        )}
      </div>
    </div>

    {/* Aryan - Data Science */}
    <div
      className={`${styles.appFeatureCard} ${active === 'raghav' ? styles.active : ''}`}
      onMouseEnter={() => setActive('raghav')}
      onMouseLeave={() => setActive(null)}
    >
      <img src={images.himanshu} className={styles.appFeatureImage} alt="Aryan" />
      <div className={styles.appFeatureOverlay}>
        {active === 'raghav' && (
          <p className={styles.appFeatureText}>
            “Every dataset is a new opportunity — embrace the challenge.”
          </p>
        )}
      </div>
    </div>
  </div>
</section>






      {/* why choose us section  */}

      <section className={styles.whychooseusSection}>
        <div className={styles.whychooseusTitleBlock}>
          <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
          <h2 className={styles.whychooseusHeading}>
            Why Choose <span>Ziion Technology</span> For Digital Marketing Course In Mohali?
          </h2>
          <p className={styles.whychooseusSubtitle}>
            Ziion Technology enables every student to develop exceptional skills in <strong>Digital Marketing Training</strong> and guarantees 100% job assistance in the industry.
          </p>
        </div>

        <div className={styles.whychooseusGrid}>
          <div className={styles.whychooseusList}>
            {chooseUsLeftItems.map((item, index) => (
              <div className={styles.whychooseusItem} key={index}>
                <span className={styles.whychooseusIcon}>{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.whychooseusImage}>
            <img src={images.whyChooseImg} alt="Graduate Illustration" />
          </div>

          <div className={styles.whychooseusList}>
            {chooseUsRightItems.map((item, index) => (
              <div className={styles.whychooseusItem} key={index}>
                <span className={styles.whychooseusIcon}>{item.icon}</span>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ReviewsSection />






      {/* faq section */}


      <div className={styles.faqContainer}>
        <div className={styles.faqContent}>
          <div className={styles.faqLeft}>
            <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
            {/* <p className={styles.faqDescription}>
              Blandit nunc sapien orci egestas scelerisque mattis. Pulvinar pellentesque cursus ornare neque non mi pellentesque adipiscing mollis.
            </p> */}

            <div className={styles.faqFaqs}>
              {faqQuestions.map((item, index) => (
                <div key={index} className={styles.faqFaqCard}>
                  <div
                    className={styles.faqFaqHeader}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className={styles.faqIconCircle}>
                      {openIndex === index ? '−' : '+'}
                    </span>
                    <span className={styles.faqQuestionText}>{item.question}</span>
                  </div>
                  {openIndex === index && (
                    <div
                      ref={(el) => (faqRefs.current[index] = el)}
                      className={styles.faqFaqBody}
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>



{/* realcertificate */}
<section className={styles.certificateSection}>
      <div className={styles.mainContainer}>
        <div className={styles.certificateImage}>
          <img src={images.certificatehero} alt="Ziion Certificate" />
        </div>

        <div className={styles.certificateContent}>
          <h2>WHAT BENEFITS AWAIT YOU AT ZIION TECHNOLOGY?</h2>
          <p className={styles.highlight}>
            Highly Acclaimed Program Over the Years, We've Educated Over 35,000+ Learners & Supported Them in Landing Their Initial IT Sector Role.
          </p>
          <p className={styles.certificateDescription}>
            We Provide Fully Career-Focused Courses for Professionals, Entrepreneurs, High School Graduates, University Students, Small Business Owners, Marketing Experts & Career Changers at Reasonable Costs. We Empower Driven Individuals Like You to Shape Their Future by Teaching Skills That Every Sector Seeks.
          </p>
          <p className={styles.showcase}>
            <strong>Showcase Your Success</strong><br />
            Post it on LinkedIn, Twitter, and Facebook to enhance your profile. Highlight your accomplishment and share the news with peers and coworkers.
          </p>
        </div>
      </div>

      <div className={styles.certificateGallery}>
        <img src={images.vartika} alt="Certificate Sample1" />
        <img src={images.sharanjeet} alt="Certificate Sample2" />
        <img src={images.manish} alt="Certificate Sample3" />
        <img src={images.himanshu} alt="Certificate Sample4" />
      </div>
    </section>


<SecondForm/>


      <Footer />
    </div>
  )
}
export default DigitalMarketing;