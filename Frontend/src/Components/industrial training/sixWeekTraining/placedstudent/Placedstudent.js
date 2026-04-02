import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Placedstudent.module.css";
// Import FaPlay for the new video facade
import { FaArrowLeft, FaArrowRight, FaPlay } from "react-icons/fa";

// --- (Image imports remain the same) ---
import ZiionPlaced from "../../../../assets/placementImages/ZiionPlaced.jpg";
import akash from "../../../../assets/placement-slider/akash.jpg";
import hemant from "../../../../assets/placement-slider/hemant.jpg";
import jatinder from "../../../../assets/placement-slider/jatinder.jpg";
import Maya_img from "../../../../assets/placement-slider/Maya_img.png";
import sahilyadav from "../../../../assets/placement-slider/sahilyadav.jpg";
import sandeep from "../../../../assets/placement-slider/sandeep.jpg";
import vatsal from "../../../../assets/placement-slider/vatsal.jpg";
import vinay from "../../../../assets/placement-slider/vinay.png";

// --- Student Data Updated ---
// Feedback has been updated to be more professional and specific.
const studentData = [
  {
    name: "MAYA",
    feedback:
      '"After completing my BCA, I joined the MERN stack internship here. The hands-on experience with technologies like React, Next.js, and MongoDB on live projects was invaluable. It directly led to my placement as a MERN Stack Developer at an MNC in Noida. I highly recommend this program for enhancing your skills."',
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PL35lLDct7CfqpzyHYH15dtZhwwND1pxgQ&index=0&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/bplbcMwCec0/hqdefault.jpg",
  },
  {
    name: "RAGHAV GULATI",
    feedback:
      '"I\'m pursuing a Data Science course here alongside my internship, and the experience has been fantastic. The mentors are highly experienced specialists in their fields. I found this program to be incredibly beneficial and would definitely recommend it to anyone looking for a company with strong mentorship."',
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PL35lLDct7CfqpzyHYH15dtZhwwND1pxgQ&index=1&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/jqavyDF02so/hqdefault.jpg",
  },
  {
    name: "ADITI SHARMA",
    feedback:
      '"The training provided here is top-notch. I was able to learn practical, industry-relevant skills that helped me clear my interviews with flying colors. The placement support team is very dedicated and guided me thoroughly."',
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PL35lLDct7CfqpzyHYH15dtZhwwND1pxgQ&index=2&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/HxV36qadGAw/hqdefault.jpg",
  },
  {
    name: "DEEPIKA",
    feedback:
      '"My experience here has been transformative. It bridged the gap between academic learning and industry expectations. The hands-on projects and continuous feedback from mentors were the key to my success. Highly recommended!"',
    videoUrl: "https://www.youtube.com/embed/videoseries?list=PL35lLDct7CfqpzyHYH15dtZhwwND1pxgQ&index=3&autoplay=1",
    thumbnailUrl: "https://img.youtube.com/vi/8QS1LuyrLio/hqdefault.jpg",
  },
];
// ------------------------------------

// Updated sliderImages to include name, package, company, and course data
const sliderImages = [
  {
    img: akash,
    name: "Akash Dhiman",
    package: "₹7.2 LPA",
    company: "Coding Cafe",
    course: "React.Js Dev",
  },
  {
    img: hemant,
    name: "Hemant Tuteja",
    package: "₹10 LPA",
    company: "Software Testing",
    course: "Meritech",
  },
  {
    img: jatinder,
    name: "Jatinder Kumar",
    package: "₹6.0 LPA",
    company: "Shaandaar Events",
    course: "Digital Marketing",
  },
  {
    img: Maya_img,
    name: "Maya Sharma",
    package: "₹4.5 LPA",
    company: "Ekarigar",
    course: "MERN Stack Development",
  },
  {
    img: sahilyadav,
    name: "Sahil Yadav",
    package: "₹18 LPA",
    company: "JIO Digital Life",
    course: "Data Analyst",
  },
  {
    img: sandeep,
    name: "Sandeep ",
    package: "₹7 LPA",
    company: "Appisoft Technologies",
    course: "Machine Learning",
  },
  {
    img: vatsal,
    name: "Vatsal Mehta",
    package: "₹7.5 LPA",
    company: "IRON",
    course: "FullStack Developer",
  },
  {
    img: vinay,
    name: "Vinay Kumar",
    package: "₹6.2 LPA",
    company: "AI Creative Web Solutions",
    course: "SEO Expert",
  },
];

const PlacedStudent = () => {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [isSliderPaused, setSliderPaused] = useState(false);

  // --- New State for Smooth Animations & Video Facade ---
  const [isAnimating, setAnimating] = useState(false);
  const [isVideoPlaying, setVideoPlaying] = useState(false);

  const sliderRef = useRef(null);
  const sliderIntervalRef = useRef(null);

  // --- Manual Student Navigation (Upgraded for Animation) ---

  // A wrapper function to handle the animation logic
  const changeStudent = (newIndex) => {
    // Prevent double-clicks while animating
    if (isAnimating) return;

    setAnimating(true); // Start fade-out

    // Wait for fade-out to complete (300ms, matches CSS)
    setTimeout(() => {
      setCurrentStudentIndex(newIndex);
      setVideoPlaying(false); // Reset video to show thumbnail
      setAnimating(false); // Start fade-in
    }, 300);
  };

  const handleNextStudent = () => {
    const newIndex = (currentStudentIndex + 1) % studentData.length;
    changeStudent(newIndex);
  };

  const handlePrevStudent = () => {
    const newIndex =
      currentStudentIndex === 0
        ? studentData.length - 1
        : currentStudentIndex - 1;
    changeStudent(newIndex);
  };

  // --- (Image Slider logic remains the same) ---
  const startSliderInterval = useCallback(() => {
    sliderIntervalRef.current = setInterval(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const scrollAmount = slider.offsetWidth * 0.9;
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 5000);
  }, []);

  const stopSliderInterval = () => {
    if (sliderIntervalRef.current) {
      clearInterval(sliderIntervalRef.current);
    }
  };

  useEffect(() => {
    if (!isSliderPaused) {
      startSliderInterval();
    } else {
      stopSliderInterval();
    }
    return () => stopSliderInterval();
  }, [isSliderPaused, startSliderInterval]);

  const handleNext = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.9;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.9;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const currentStudent = studentData[currentStudentIndex];

  return (
    <div className={styles.placedStudentPage}>
      <h1 className={styles.mainHeading}>Our Placed Students</h1>

      {/* --- Section One: Feedback and Video (Animation Class Added) --- */}
      <section
        className={`${styles.sectionOne} ${
          isAnimating ? styles.sectionOneFading : ""
        }`}
      >
        <div className={styles.feedbackSection}>
          <h3 className={styles.studentName}>{currentStudent.name}</h3>
          <blockquote className={styles.studentFeedback}>
            {currentStudent.feedback}
          </blockquote>

          {/* --- Styled Manual Controls --- */}
          {studentData.length > 1 && (
            <div className={styles.studentNav}>
              <button
                onClick={handlePrevStudent}
                className={styles.studentButton}
                aria-label="Previous testimonial"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={handleNextStudent}
                className={styles.studentButton}
                aria-label="Next testimonial"
              >
                <FaArrowRight />
              </button>
            </div>
          )}
          {/* ------------------------- */}
        </div>

        {/* --- Video Section (Facade Logic) --- */}
        <div className={styles.videoSection}>
          {isVideoPlaying ? (
            // 1. The Iframe (only renders when 'isVideoPlaying' is true)
            <iframe
              key={currentStudent.videoUrl} // Ensures React remounts the iframe for the new student
              src={currentStudent.videoUrl}
              title="Placed Student Testimonial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            // 2. The Facade (thumbnail and play button)
            <div
              className={styles.videoPlayerContainer}
              onClick={() => setVideoPlaying(true)}
              role="button"
              tabIndex={0}
              aria-label={`Play video for ${currentStudent.name}`}
            >
              <img
                src={currentStudent.thumbnailUrl}
                alt={`Testimonial thumbnail for ${currentStudent.name}`}
                className={styles.videoThumbnail}
              />
              <div className={styles.playButton}>
                <FaPlay />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* --- REPLACEMENT SECTION: Our Placed Students --- */}
      <section className={styles.placementOverview}>
        <div className={styles.sectionHeader}>
          <span className={styles.categoryLabel}>Success Stories</span>

          <p className={styles.sectionSubtitle}>
            Empowering careers through industry-aligned training. Our students
            have secured positions at leading companies across diverse sectors,
            showcasing the impact of quality education and dedicated placement
            support.
          </p>
        </div>
        <img
          src={ZiionPlaced}
          alt="Ziion Placement Overview"
          className={styles.overviewImage}
        />
      </section>
    </div>
  );
};

export default PlacedStudent;
