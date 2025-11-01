import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Coversationchatbot.module.css'
import Footer from '../footer/Footer'
import LeverageChat from './LeverageChat'
import { motion } from 'framer-motion' 

// Import high-quality icons from react-icons
import { FaReact, FaMobileAlt } from 'react-icons/fa' 
import { SiOpenai, SiGoogleanalytics, SiGooglesheets, SiTensorflow, SiPython, SiCss3, SiScikitlearn } from 'react-icons/si'


// --- services array (Updated Positions - Digital Marketing and Web Designing moved up) ---
const services = [
  { to: "/web-development", label: "Web Development", icon: <FaReact />, color: "#61DAFB", position: { top: '15%', left: '-5%' }},
  { to: "/ai", label: "AI", icon: <SiOpenai />, color: "#412991", position: { top: '10%', left: '45%' }},
  { to: "/data-analytics", label: "Data Analytics", icon: <SiGoogleanalytics />, color: "#F9AB00", position: { top: '40%', left: '-10%' }},
  { to: "/digital-marketing", label: "Digital Marketing", icon: <SiGooglesheets />, color: "#0F9D58", position: { top: '35%', left: '20%' }},
  { to: "/ml", label: "ML", icon: <SiScikitlearn />, color: "#F7931E", position: { top: '40%', left: '90%' }},
  { to: "/data-science", label: "Data Science", icon: <SiPython />, color: "#3776AB", position: { top: '18%', left: '80%' }},
  { to: "/web-designing", label: "Web Designing", icon: <SiCss3 />, color: "#1572B6", position: { top: '35%', left: '55%' }},
  { to: "/mobileapp", label: "Mobile App Development", icon: <FaMobileAlt />, color: "#8BC34A", position: { top: '65%', left: '33%' }},
];

// Grid animation
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
    },
  },
};

// Animation variants
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 50,
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: [0, -6, 0, 6, 0], // Keyframes for floating
    transition: {
      // Transition for the initial fade-in/slide-up
      default: { 
        type: 'tween', 
        ease: 'easeInOut', 
        duration: 0.5 
      },
      
      // Transition for the 'y' property (the floating)
      y: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }
    },
  },
};


const Conversationchatbot = () => {
  return (
    <div>
      <div className={styles.chatbotContainer}>
        <motion.div
          className={styles.integrationGrid} 
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service.label}
              className={styles.appdiv}
              style={{ top: service.position.top, left: service.position.left }}
              variants={itemVariants} 
            >
              <Link to={service.to} className={styles.integrationLink}>
                <button className={styles.integrationButton}>
                  <span className={styles.icon} style={{ color: service.color }}>
                    {service.icon}
                  </span>
                  {service.label}
                </button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <LeverageChat />
      <Footer />
    </div>
  )
}

export default Conversationchatbot