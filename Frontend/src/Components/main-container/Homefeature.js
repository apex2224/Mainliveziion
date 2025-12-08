// import React from "react";
// import styles from './homeFeature.module.css';
// import { useNavigate } from "react-router-dom";

// const Homefeature = () => {
//     const navigate = useNavigate();

//     return (
//         <section className={styles['features-section']}>
//             <div className={styles['feature-header']}>
//                 {/* This continues to use the animated gradient text */}
//                 <h2 className={styles['animated-user-gradient-text']}>
//                     Our Professional Courses
//                 </h2>
//             </div>

//             <div className={styles['feature-container']}>
//                 {/* Feature 1 */}
//                 <div className={styles['feature-box']}>
//                     <div className={styles['feature-icon']}>
//                         <i className="fas fa-laptop-code"></i>
//                     </div>
//                     <h3>Web Development Training</h3>
//                     <p>Master front-end and back-end technologies to build dynamic and responsive websites.</p>
//                     <button
//                         className={styles.headerBtn}
//                         onClick={() => navigate("/web-development")}
//                     >
//                         Talk to us
//                     </button>
//                 </div>

//                 {/* Feature 2 */}
//                 <div className={styles['feature-box']}>
//                     <div className={styles['feature-icon']}>
//                         <i className="fas fa-database"></i>
//                     </div>
//                     <h3>Data Science & Analytics</h3>
//                     <p>Learn data analysis, machine learning, and visualization to make data-driven decisions.</p>
//                     <button
//                         className={styles.headerBtn}
//                         onClick={() => navigate("/data-science")}
//                     >
//                         Talk to us
//                     </button>
//                 </div>

//                 {/* Feature 3 */}
//                 <div className={styles['feature-box']}>
//                     <div className={styles['feature-icon']}>
//                         <i className="fas fa-robot"></i>
//                     </div>
//                     <h3>Artificial Intelligence & ML</h3>
//                     <p>Gain hands-on experience in AI, deep learning, and intelligent automation solutions.</p>
//                     <button
//                         className={styles.headerBtn}
//                         onClick={() => navigate("/ai")}
//                     >
//                         Talk to us
//                     </button>
//                 </div>

//                 {/* Feature 4 */}
//                 <div className={styles['feature-box']}>
//                     <div className={styles['feature-icon']}>
//                         <i className="fas fa-mobile-screen-button"></i>
//                     </div>
//                     <h3>Mobile App Development</h3>
//                     <p>Learn to design and develop high-performing Android and iOS mobile applications.</p>
//                     <button
//                         className={styles.headerBtn}
//                         onClick={() => navigate("/mobileapp")}
//                     >
//                         Talk to us
//                     </button>
//                 </div>

//                 {/* Feature 5 */}
//                 <div className={styles['feature-box']}>
//                     <div className={styles['feature-icon']}>
//                         <i className="fas fa-paint-brush"></i>
//                     </div>
//                     <h3>Graphic Designing</h3>
//                     <p>Master creative tools and techniques to design stunning visuals, logos, and branding materials.</p>
//                     <button
//                         className={styles.headerBtn}
//                         onClick={() => navigate("/graphic")}
//                     >
//                         Talk to us
//                     </button>
//                 </div>

//                 {/* Feature 6 */}
//                 <div className={styles['feature-box']}>
//                     <div className={styles['feature-icon']}>
//                         <i className="fas fa-bullhorn"></i>
//                     </div>
//                     <h3>Digital Marketing</h3>
//                     <p>Learn SEO, social media, and performance marketing to grow businesses online.</p>
//                     <button
//                         className={styles.headerBtn}
//                         onClick={() => navigate("/digital-marketing")}
//                     >
//                         Talk to us
//                     </button>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Homefeature;
