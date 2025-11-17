// import React, { useState, useEffect, useRef } from 'react'
// import styles from './graphic.module.css'
// import images from '../../../assets/images'
// import Navbar from '../../head/Navbar';
// import Footer from '../../footer/Footer';
// import { heroPhrases, statsData, chooseUsLeftItems, chooseUsRightItems, careerOpportunities, faqQuestions, syllabusData, leftScrollCards } from './graphicData';
// import EnrollProcess from '../ProcessSection/EnrollProcess';
// import Certification from '../../Certification/Certification';

// import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import Form from '../../form/Form'
// import {
//   SiAdobephotoshop,
//   SiAdobeillustrator,
//   SiAdobeindesign,
//   SiFigma,
//   SiCanva,
//   SiAdobeaftereffects,
//   SiCoreldraw,
//   SiBlender
// } from 'react-icons/si';
// import ReviewsSection from '../../reviews/ReviewsSection';
// import StudentCarousel from '../../placement/StudentCarousel';
// import SecondForm from '../../secondForm/SecondForm';

// const rightScrollCards = [
//     { image: images.raghav },
//     { image: images.nishaRani },
//     { image: images.parmeet },
//     { image: images.nisha },
//     { image: images.rupal },
//     { image: images.shubham },
//     { image: images.simranjeet },
//     { image: images.simrat },
//     { image: images.abhishek },
// ];

// const CARD_WIDTH = 300; // px
// const VIDEO_WIDTH = 310; // px

// const useCustomTypewriter = (phrasesArray) => {
//   const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
//   const [text, setText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const currentPhrase = phrasesArray[currentPhraseIndex];
//     let typingSpeed = isDeleting ? 50 : 100;

//     const timeout = setTimeout(() => {
//       setText((prev) =>
//         isDeleting
//           ? currentPhrase.substring(0, prev.length - 1)
//           : currentPhrase.substring(0, prev.length + 1)
//       );

//       if (!isDeleting && text === currentPhrase) {
//         setTimeout(() => setIsDeleting(true), 1200);
//       } else if (isDeleting && text === '') {
//         setIsDeleting(false);
//         setCurrentPhraseIndex((prev) => (prev + 1) % phrasesArray.length);
//       }
//     }, typingSpeed);

//     return () => clearTimeout(timeout);
//   }, [text, isDeleting, currentPhraseIndex, phrasesArray]);

//   return text;
// };
// const GraphicDesigning = () => {
//   const [showForm, setShowForm] = useState(false);
//   const typedOutput = useCustomTypewriter(heroPhrases);

//         const [active, setActive] = useState(null);

//   // FAQ toggle
//   const [openIndex, setOpenIndex] = useState(null);
//   const faqRefs = useRef([]);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   useEffect(() => {
//     faqRefs.current.forEach((ref, i) => {
//       if (ref) {
//         if (i === openIndex) {
//           ref.classList.add(styles.openBody);
//         } else {
//           ref.classList.remove(styles.openBody);
//         }
//       }
//     });
//   }, [openIndex]);

//   // Syllabus tab
//   const [selected, setSelected] = useState(Object.keys(syllabusData)[0] || '');

// // placement //
//   // Top (left → right)
//     const [topIndex, setTopIndex] = useState(0);
//     const [topTransition, setTopTransition] = useState(true);

//     // Bottom (right → left)
//     const [bottomIndex, setBottomIndex] = useState(0);
//     const [bottomTransition, setBottomTransition] = useState(true);

//     // Carousel play/pause state
//     const [isTopPaused, setIsTopPaused] = useState(false);
//     const [isBottomPaused, setIsBottomPaused] = useState(false);

//     // Auto move top carousel
//     useEffect(() => {
//         if (isTopPaused) return;
//         const id = setInterval(() => {
//             setTopIndex((prev) => prev + 1);
//         }, 2000);
//         return () => clearInterval(id);
//     }, [isTopPaused]);

//     // Auto move bottom carousel
//     useEffect(() => {
//         if (isBottomPaused) return;
//         const id = setInterval(() => {
//             setBottomIndex((prev) => prev + 1);
//         }, 2200);
//         return () => clearInterval(id);
//     }, [isBottomPaused]);

//     // Reset loop for top
//     useEffect(() => {
//         if (topIndex >= rightScrollCards.length) {
//             setTimeout(() => {
//                 setTopTransition(false);
//                 setTopIndex(0);
//                 requestAnimationFrame(() => setTopTransition(true));
//             }, 800);
//         }
//     }, [topIndex]);

//     // Reset loop for bottom
//     useEffect(() => {
//         if (bottomIndex >= leftScrollCards.length) {
//             setTimeout(() => {
//                 setBottomTransition(false);
//                 setBottomIndex(0);
//                 requestAnimationFrame(() => setBottomTransition(true));
//             }, 800);
//         }
//     }, [bottomIndex]);

//     // Pause on hover handlers
//     const handleTopMouseEnter = () => setIsTopPaused(true);
//     const handleTopMouseLeave = () => setIsTopPaused(false);

//     const handleBottomMouseEnter = () => setIsBottomPaused(true);
//     const handleBottomMouseLeave = () => setIsBottomPaused(false);

//     // Manual buttons
//     const handleTopPrev = () => {
//         setTopIndex((prev) => (prev === 0 ? rightScrollCards.length - 1 : prev - 1));
//     };
//     const handleTopNext = () => {
//         setTopIndex((prev) => (prev === rightScrollCards.length - 1 ? 0 : prev + 1));
//     };

//     const handleBottomPrev = () => {
//         setBottomIndex((prev) => (prev === 0 ? leftScrollCards.length - 1 : prev - 1));
//     };
//     const handleBottomNext = () => {
//         setBottomIndex((prev) => (prev === leftScrollCards.length - 1 ? 0 : prev + 1));
//     };

//   return (
//     <div>
//       <Navbar />
//       <section className={styles.webDesigningHeroSection}>

//         <div className={styles.overlay}>
//           <SiAdobephotoshop color="#31A8FF" title="Adobe Photoshop" className={styles.html} />
//           <SiAdobeillustrator color="#FF9A00" title="Adobe Illustrator" className={styles.css} />
//           <SiAdobeindesign color="#EE3D8F" title="Adobe InDesign" className={styles.js} />
//           <SiFigma color="#A259FF" title="Figma" className={styles.react} />
//           <SiAdobeaftereffects color="#9999FF" title="Adobe After Effects" className={styles.bootstrap} />

//         </div>
//         <div className={styles.webDesigning}>
//           <img src={images.knowledgeHeroImage} alt="background" className={styles.webDesigningBgImage} />
//         </div>

//         <div className={styles.webDesigningContent}>
//           <h1 className={styles.webDesigningTitle}>
//             <span className={`${styles.webDesigningFalldown} ${styles.gradientText}`}>
//               Graphic Designing Course in Chandigarh <br />
//               <span className={styles.typedText}>{typedOutput}</span>
//               <span className={styles.cursor}>|</span>
//             </span>
//           </h1>
//           <h2 className={styles.webDesigningSubtitle}>
//             Our Graphic Designing Course is designed to provide hands-on training with real-world tools and techniques.
//           </h2>
//           <button className={styles.herobutton} onClick={() => setShowForm(true)}>
//             Talk to us
//           </button>
//           {showForm && <Form closeForm={() => setShowForm(false)} />}              </div>
//       </section>
//       {/*Stat Section*/}
//       <div className={styles.statsWrapper}>
//         {statsData.map((stat, index) => (
//           <div className={styles.statCircle} key={index}>
//             <div className={styles.rotatingRing}></div> {/* Fixed class name */}
//             <div className={styles.statContent}>
//               <h2 className={styles.statValue}>{stat.value}</h2>
//               <p className={styles.statLabel}>{stat.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Tool Section - Graphic Designing Focused */}
//       <section className={styles.toolsMain}>
//         <h1>Tools</h1>
//         <div className={styles.webdevtoolsContainer}>

//           <div className={styles.webdevtools}>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>Adobe Photoshop</h3>
//               <p className={styles.toolDescription}>
//                 A powerful image editing software used for photo retouching, digital painting, and graphic design tasks.
//               </p>
//             </div>
//             <div className={styles.webdevtoolsFeature}>
//               <SiAdobephotoshop size={60} color="#31A8FF" className={styles.toolName}/>
//             </div>
//           </div>

//           <div className={styles.webdevtools}>
//             <div className={styles.webdevtoolsFeature}>
//               <SiAdobeillustrator size={60} color="#FF9A00" className={styles.toolName}/>
//             </div>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>Adobe Illustrator</h3>
//               <p className={styles.toolDescription}>
//                 Industry-standard vector graphics software used for creating logos, icons, and illustrations.
//               </p>
//             </div>
//           </div>

//           <div className={styles.webdevtools}>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>Adobe InDesign</h3>
//               <p className={styles.toolDescription}>
//                 A desktop publishing software ideal for creating brochures, magazines, and flyers.
//               </p>
//             </div>
//             <div className={styles.webdevtoolsFeature}>
//               <SiAdobeindesign size={60} color="#EE3D8F" className={styles.toolName}/>
//             </div>
//           </div>

//           <div className={styles.webdevtools}>
//             <div className={styles.webdevtoolsFeature}>
//               <SiFigma size={60} color="#F24E1E" className={styles.toolName}/>
//             </div>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>Figma</h3>
//               <p className={styles.toolDescription}>
//                 A cloud-based UI/UX design tool used for collaborative interface design and prototyping.
//               </p>
//             </div>
//           </div>

//           <div className={styles.webdevtools}>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>Canva</h3>
//               <p className={styles.toolDescription}>
//                 A drag-and-drop tool for creating social media graphics, posters, presentations, and more.
//               </p>
//             </div>
//             <div className={styles.webdevtoolsFeature}>
//               <SiCanva size={60} color="#00C4CC" className={styles.toolName}/>
//             </div>
//           </div>

//           <div className={styles.webdevtools}>
//             <div className={styles.webdevtoolsFeature}>
//               <SiAdobeaftereffects size={60} color="#9999FF" className={styles.toolName}/>
//             </div>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>After Effects</h3>
//               <p className={styles.toolDescription}>
//                 A motion graphics and visual effects software used for creating animations and cinematic effects.
//               </p>
//             </div>
//           </div>

//           <div className={styles.webdevtools}>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>CorelDRAW</h3>
//               <p className={styles.toolDescription}>
//                 A vector illustration and page layout program widely used in logo, signage, and t-shirt design.
//               </p>
//             </div>
//             <div className={styles.webdevtoolsFeature}>
//               <SiCoreldraw size={60} color="#00B388" className={styles.toolName}/>
//             </div>
//           </div>

//           <div className={styles.webdevtools}>
//             <div className={styles.webdevtoolsFeature}>
//               <SiBlender size={60} color="#F5792A" className={styles.toolName}/>
//             </div>
//             <div className={styles.textBlock}>
//               <h3 className={styles.title}>Blender</h3>
//               <p className={styles.toolDescription}>
//                 An open-source 3D creation suite used for modeling, animation, and rendering graphics and videos.
//               </p>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* what will you learn */}
//       {/* who can join */}
//       <div className={styles.container}>
//         <h1 className={styles.whatHeading}>Who Can Join Our Graphic Designing Course?</h1>
//         <p className={styles.subheading}>
//           Our <strong>Graphic Designing course</strong> is open to everyone — whether you're a student exploring creative careers, a graduate looking for job-ready design skills, a freelancer aiming to offer premium services, or an entrepreneur building a strong brand identity. No prior experience required, just your passion for creativity and willingness to learn.
//         </p>

//         <div className={styles.roadmapBox}>
//           <div className={styles.leftSection}>
//             <div className={styles.whoCanJoinSection}>
//               <h2 className={styles.sectionTitle}>Who Can Join & What You'll Gain</h2>
//               <ul className={styles.pointsList}>
//                 <li className={styles.pointItem}>
//                   <span className={styles.arrow}>→</span>
//                   <div>
//                     <strong>Students (10th/12th Pass)</strong><br />
//                     Start early in a creative career! Learn industry tools like Photoshop & Canva and build a strong design portfolio to unlock internships or freelance gigs.
//                   </div>
//                 </li>

//                 <li className={styles.pointItem}>
//                   <span className={styles.arrow}>→</span>
//                   <div>
//                     <strong>Graduates / Job Seekers</strong><br />
//                     Acquire job-ready design skills and apply for roles such as Graphic Designer, UI/UX Intern, Branding Assistant, or Social Media Designer.
//                   </div>
//                 </li>

//                 <li className={styles.pointItem}>
//                   <span className={styles.arrow}>→</span>
//                   <div>
//                     <strong>Freelancers & Entrepreneurs</strong><br />
//                     Create compelling visuals for your clients or brand. Learn to design logos, banners, social media posts, and marketing assets with a professional touch.
//                   </div>
//                 </li>

//                 <li className={styles.pointItem}>
//                   <span className={styles.arrow}>→</span>
//                   <div>
//                     <strong>Working Professionals (Upskilling)</strong><br />
//                     Stand out in your current job or switch careers. Learn modern design tools and principles to contribute in marketing, branding, or creative departments.
//                   </div>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className={styles.rightSection}>
//             <img
//               src={images.willGet}
//               alt="Graphic Design Training Roadmap"
//               className={styles.whatlearnimg}
//             />
//           </div>
//         </div>
//       </div>

//       <EnrollProcess />

//       {/* placemnet */}
//        <div>
//                   <h1 className={styles.storyHeading}>Our Success Story</h1>

//                   {/* 🔹 Bottom: videos, right → left */}
//                   <div className={styles.leftCarouselWrapper}>
//                       <div
//                           className={styles.leftCarousel}
//                           style={{
//                               transform: `translateX(-${bottomIndex * VIDEO_WIDTH}px)`,
//                               transition: bottomTransition ? "transform 0.8s ease-in-out" : "none",
//                           }}
//                           onMouseEnter={handleBottomMouseEnter}
//                           onMouseLeave={handleBottomMouseLeave}
//                       >
//                           {[...leftScrollCards, ...leftScrollCards].map((item, i) => (
//                               <div key={i} className={styles.leftCard}>
//                                   <iframe
//                                       src={item.iframe}
//                                       className={styles.leftIframe}
//                                       title={`video-${i}`}
//                                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                                       allowFullScreen
//                                       loading="lazy"
//                                   />
//                                   <div className={styles.leftProfileSection}>{item.name}</div>
//                                   <div className={styles.leftCompanySection}>{item.company}</div>
//                               </div>
//                           ))}
//                       </div>
//                       <div className={styles.carouselButtons}>
//                           <button onClick={handleBottomPrev} className={styles.carouselBtn}>◀️</button>
//                           <button onClick={handleBottomNext} className={styles.carouselBtn}>▶️</button>
//                       </div>
//                   </div>

//                   {/* 🔹 Top: images, left → right */}
//                   <div className={styles.carouselWrapper}>
//                       <div
//                           className={styles.carousel}
//                           style={{
//                               // Start far left, move towards 0
//                               transform: `translateX(${-rightScrollCards.length * CARD_WIDTH + topIndex * CARD_WIDTH
//                                   }px)`,
//                               transition: topTransition ? "transform 0.8s ease-in-out" : "none",
//                           }}
//                           onMouseEnter={handleTopMouseEnter}
//                           onMouseLeave={handleTopMouseLeave}
//                       >
//                           {[...rightScrollCards, ...rightScrollCards].map((item, i) => (
//                               <div key={i} className={styles.card}>
//                                   <img src={item.image} alt="student" className={styles.cardImage} />
//                               </div>
//                           ))}
//                       </div>
//                       <div className={styles.carouselButtons}>
//                           <button onClick={handleTopPrev} className={styles.carouselBtn}>◀️</button>
//                           <button onClick={handleTopNext} className={styles.carouselBtn}>▶️</button>
//                       </div>

//                   </div>
//               </div>

// <StudentCarousel/>

//       {/* sylabus */}
//       <div className={styles.syllabusContainer}>
//         <h1>What Will Our Trainees Learn In Graphic Designing Training</h1>
//         <p>Explore our <strong>Graphic Designing training course</strong> curriculum to know exactly what skills you will gain. Ziion Technology is one of India’s leading industrial training institutes, offering comprehensive training to our <strong>trainees</strong> in visual design, branding, UI/UX fundamentals, and creative digital content creation.</p>

//         <div className={styles.syllabusWrapper}>
//          {/* Left side - topic list */}
//          <div className={styles.topicList}>
//            <ul className={styles.syllabusList}>
//              {Object.keys(syllabusData).map((topic) => (
//                <li
//                  key={topic}
//                  className={`${styles.topicItem} ${selected === topic ? styles.active : ''}`}
//                  onClick={() => setSelected(topic)}
//                >
//                  {topic}
//                </li>
//              ))}
//            </ul>
//          </div>

//          {/* Right side - topic details */}
//          <div className={styles.topicDetails}>
//            <h3>{selected}:</h3>
//            <ul className={styles.syllabusList}>
//              {syllabusData[selected]?.map((item, index) => (
//                <li key={index}>{item}</li>
//              ))}
//            </ul>
//          </div>
//          </div>
//       </div>

// <div className={styles.projectBackModal}>
//   <section className={styles.projectSection}>

//     {/* Heading */}
//     <div className={styles.projectSectionHeader}>
//       <h2 className={styles.projectSectionHeading}>
//         Graphic Design Projects Showcasing Creativity
//       </h2>
//     </div>

//     {/* Grid */}
//     <div className={styles.projectSectionGrid}>

//       {/* Project 1 */}
//       <div className={`${styles.projectSectionCard} ${styles.project1}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>🎨</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Brand Identity Design</h3>
//           <p className={styles.projectSectionDesc}>
//             Created logos, typography, and color schemes to establish strong and cohesive brand identities.
//           </p>
//         </div>
//       </div>

//       {/* Project 2 */}
//       <div className={`${styles.projectSectionCard} ${styles.project2}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>🖌️</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Illustration & Artwork</h3>
//           <p className={styles.projectSectionDesc}>
//             Designed custom illustrations and digital artwork for marketing campaigns, websites, and print materials.
//           </p>
//         </div>
//       </div>

//       {/* Project 3 */}
//       <div className={`${styles.projectSectionCard} ${styles.project3}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>📰</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Magazine & Print Layouts</h3>
//           <p className={styles.projectSectionDesc}>
//             Developed visually appealing layouts for magazines, brochures, and promotional print material.
//           </p>
//         </div>
//       </div>

//       {/* Project 4 */}
//       <div className={`${styles.projectSectionCard} ${styles.project4}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>🌐</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Web & UI Design</h3>
//           <p className={styles.projectSectionDesc}>
//             Crafted user-friendly interfaces and web graphics that enhance usability and visual appeal.
//           </p>
//         </div>
//       </div>

//       {/* Project 5 */}
//       <div className={`${styles.projectSectionCard} ${styles.project5}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>📦</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Packaging Design</h3>
//           <p className={styles.projectSectionDesc}>
//             Created product packaging concepts that attract attention, reinforce branding, and communicate value.
//           </p>
//         </div>
//       </div>

//       {/* Project 6 */}
//       <div className={`${styles.projectSectionCard} ${styles.project6}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>📱</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Social Media Graphics</h3>
//           <p className={styles.projectSectionDesc}>
//             Designed eye-catching graphics for social media campaigns to increase engagement and brand visibility.
//           </p>
//         </div>
//       </div>

//       {/* Project 7 */}
//       <div className={`${styles.projectSectionCard} ${styles.project7}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>🎬</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Motion Graphics & Animations</h3>
//           <p className={styles.projectSectionDesc}>
//             Produced dynamic animations and motion graphics for video content, advertisements, and presentations.
//           </p>
//         </div>
//       </div>

//       {/* Project 8 */}
//       <div className={`${styles.projectSectionCard} ${styles.project8}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>🖼️</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Infographic Design</h3>
//           <p className={styles.projectSectionDesc}>
//             Created data visualizations and infographics to communicate complex information in an engaging way.
//           </p>
//         </div>
//       </div>

//       {/* Project 9 */}
//       <div className={`${styles.projectSectionCard} ${styles.project9}`}>
//         <div className={styles.projectSectionIconWrapper}>
//           <div className={styles.projectSectionIcon}>🏆</div>
//         </div>
//         <div className={styles.projectSectionContent}>
//           <h3 className={styles.projectSectionTitle}>Event & Promotional Design</h3>
//           <p className={styles.projectSectionDesc}>
//             Designed banners, posters, and promotional materials for events and marketing campaigns.
//           </p>
//         </div>
//       </div>

//     </div>
//   </section>
// </div>

//  {/* achievers */}

// <section className={styles.achieversSection}>
//   <div className={styles.achieversInner}>
//     <h2 id="achievers-title" className={styles.achieversTitle}>
//       <span className={styles.shimmer}>Our Achievers</span>
//     </h2>

//     <p className={styles.achieversSubtitle}>
//       From <span className={styles.highlight}>classroom</span> to{" "}
//       <span className={styles.highlight}>career</span> — turning ambition into offers at leading companies.
//     </p>
//   </div>

//   <div className={styles.appFeatureContainer}>
//     {/* Aayush - Data Science */}
//     <div
//       className={`${styles.appFeatureCard} ${active === 'nisha' ? styles.active : ''}`}
//       onMouseEnter={() => setActive('nisha')}
//       onMouseLeave={() => setActive(null)}
//     >
//       <img src={images.nishaRani} className={styles.appFeatureImage} alt="Aayush" />
//       <div className={styles.appFeatureOverlay}>
//         {active === 'nisha' && (
//           <p className={styles.appFeatureText}>
//             “Data is powerful — those who master it, master the future.”
//           </p>
//         )}
//       </div>
//     </div>

//     {/* Aryan - Data Science */}
//     <div
//       className={`${styles.appFeatureCard} ${active === 'raghav' ? styles.active : ''}`}
//       onMouseEnter={() => setActive('raghav')}
//       onMouseLeave={() => setActive(null)}
//     >
//       <img src={images.parmeet} className={styles.appFeatureImage} alt="Aryan" />
//       <div className={styles.appFeatureOverlay}>
//         {active === 'raghav' && (
//           <p className={styles.appFeatureText}>
//             “Every dataset is a new opportunity — embrace the challenge.”
//           </p>
//         )}
//       </div>
//     </div>

//     {/* Harmanpreet - Data Science */}
//     <div
//       className={`${styles.appFeatureCard} ${active === 'rupalpreet' ? styles.active : ''}`}
//       onMouseEnter={() => setActive('rupalpreet')}
//       onMouseLeave={() => setActive(null)}
//     >
//       <img src={images.nisha} className={styles.appFeatureImage} alt="Harmanpreet" />
//       <div className={styles.appFeatureOverlay}>
//         {active === 'rupalpreet' && (
//           <p className={styles.appFeatureText}>
//             “Failures are just experiments — keep iterating, keep improving.”
//           </p>
//         )}
//       </div>
//     </div>

//     {/* Manan Manglesh - Data Science */}
//     <div
//       className={`${styles.appFeatureCard} ${active === 'shubham' ? styles.active : ''}`}
//       onMouseEnter={() => setActive('shubham')}
//       onMouseLeave={() => setActive(null)}
//     >
//       <img src={images.shubham} className={styles.appFeatureImage} alt="Manan Manglesh" />
//       <div className={styles.appFeatureOverlay}>
//         {active === 'shubham' && (
//           <p className={styles.appFeatureText}>
//             “In Data Science, persistence trains the mind like algorithms train the model.”
//           </p>
//         )}
//       </div>
//     </div>

//     {/* Mohit Kumar - Data Science */}
//     <div
//       className={`${styles.appFeatureCard} ${active === 'app' ? styles.active : ''}`}
//       onMouseEnter={() => setActive('app')}
//       onMouseLeave={() => setActive(null)}
//     >
//       <img src={images.arunesh} className={styles.appFeatureImage} alt="Mohit Kumar" />
//       <div className={styles.appFeatureOverlay}>
//         {active === 'app' && (
//           <p className={styles.appFeatureText}>
//             “Innovate with data, create with code, and build your tomorrow.”
//           </p>
//         )}
//       </div>
//     </div>

//     {/* Raman Deep - Data Science */}
//     <div
//       className={`${styles.appFeatureCard} ${active === 'marketing' ? styles.active : ''}`}
//       onMouseEnter={() => setActive('marketing')}
//       onMouseLeave={() => setActive(null)}
//     >
//       <img src={images.raghav} className={styles.appFeatureImage} alt="Raman Deep" />
//       <div className={styles.appFeatureOverlay}>
//         {active === 'marketing' && (
//           <p className={styles.appFeatureText}>
//             “Passion for data and persistence in learning define a true achiever.”
//           </p>
//         )}
//       </div>
//     </div>
//   </div>
// </section>

//       {/* career oportunities */}

//       <div className={styles.carerrOpportunities}>
//         <h2 className={styles.opportunitiesheading}>
//           💼 Career  <span> Opportunities</span> After This Course.
//         </h2>
//         <div className={styles.careerOpportunitiesGrid}>
//           {careerOpportunities.map((service, index) => (
//             <div
//               key={index}
//               className={`${styles.careerCard} ${styles.curveTopRight} ${styles.curveBottomLeft}`}
//             >
//               <div className={styles.careerCardContent}>
//                 <div className={styles.careerIcon}></div>
//                 <h3>{service.title}</h3>
//                 <p>{service.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>

//       {/* why choose us section  */}

//       <section className={styles.whychooseusSection}>
//         <div className={styles.whychooseusTitleBlock}>
//           <p className={styles.whychooseusTagline}>MASTER NEW SKILLS</p>
//           <h2 className={styles.whychooseusHeading}>
//             Why Choose <span>Ziion Technology</span> For Graphic Designing In Mohali?
//           </h2>
//           <p className={styles.whychooseusSubtitle}>
//             Ziion Technology enables every student to develop exceptional skills in <strong>Graphic Designing Training</strong> and guarantees 100% job assistance in the industry.
//           </p>
//         </div>

//         <div className={styles.whychooseusGrid}>
//           <div className={styles.whychooseusList}>
//             {chooseUsLeftItems.map((item, index) => (
//               <div className={styles.whychooseusItem} key={index}>
//                 <span className={styles.whychooseusIcon}>{item.icon}</span>
//                 <p>{item.text}</p>
//               </div>
//             ))}
//           </div>

//           <div className={styles.whychooseusImage}>
//             <img src={images.whyChooseImg} alt="Graduate Illustration" />
//           </div>

//           <div className={styles.whychooseusList}>
//             {chooseUsRightItems.map((item, index) => (
//               <div className={styles.whychooseusItem} key={index}>
//                 <span className={styles.whychooseusIcon}>{item.icon}</span>
//                 <p>{item.text}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <ReviewsSection />

// {/* certificate */}
// <section className={styles.certificateSection}>
//       <div className={styles.mainContainer}>
//         <div className={styles.certificateImage}>
//           <img src={images.certificatehero} alt="Ziion Certificate" />
//         </div>

//         <div className={styles.certificateContent}>
//           <h2>WHAT BENEFITS AWAIT YOU AT ZIION TECHNOLOGY?</h2>
//           <p className={styles.highlight}>
//             Highly Acclaimed Program Over the Years, We've Educated Over 35,000+ Learners & Supported Them in Landing Their Initial IT Sector Role.
//           </p>
//           <p className={styles.description}>
//             We Provide Fully Career-Focused Courses for Professionals, Entrepreneurs, High School Graduates, University Students, Small Business Owners, Marketing Experts & Career Changers at Reasonable Costs. We Empower Driven Individuals Like You to Shape Their Future by Teaching Skills That Every Sector Seeks.
//           </p>
//           <p className={styles.showcase}>
//             <strong>Showcase Your Success</strong><br />
//             Post it on LinkedIn, Twitter, and Facebook to enhance your profile. Highlight your accomplishment and share the news with peers and coworkers.
//           </p>
//         </div>
//       </div>

//       <div className={styles.certificateGallery}>
//         <img src={images.nisha} alt="Certificate Sample1" />
//         <img src={images.kavya} alt="Certificate Sample2" />
//         <img src={images.kritish} alt="Certificate Sample3" />
//         <img src={images.mohit} alt="Certificate Sample4" />
//       </div>
//     </section>

//       {/* faq section */}

//       <div className={styles.faqContainer}>
//         <div className={styles.faqContent}>
//           <div className={styles.faqLeft}>
//             <h1 className={styles.faqHeading}>Frequently Asked Questions</h1>
//             {/* <p className={styles.faqDescription}>
//               Blandit nunc sapien orci egestas scelerisque mattis. Pulvinar pellentesque cursus ornare neque non mi pellentesque adipiscing mollis.
//             </p> */}

//             <div className={styles.faqFaqs}>
//               {faqQuestions.map((item, index) => (
//                 <div key={index} className={styles.faqFaqCard}>
//                   <div
//                     className={styles.faqFaqHeader}
//                     onClick={() => toggleFAQ(index)}
//                   >
//                     <span className={styles.faqIconCircle}>
//                       {openIndex === index ? '−' : '+'}
//                     </span>
//                     <span className={styles.faqQuestionText}>{item.question}</span>
//                   </div>
//                   {openIndex === index && (
//                     <div
//                       ref={(el) => (faqRefs.current[index] = el)}
//                       className={styles.faqFaqBody}
//                     >
//                       {item.answer}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <SecondForm/>
//       <Footer />
//     </div>
//   )
// }
// export default GraphicDesigning;
