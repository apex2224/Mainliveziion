import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Placedstudent.module.css';
// Import FaPlay for the new video facade
import { FaArrowLeft, FaArrowRight, FaPlay } from 'react-icons/fa';

// --- (Image imports remain the same) ---
import studentImg1 from '../../../../assets/placement-slider/Maya_img.png';
import studentImg2 from '../../../../assets/placement-slider/placement-img-1.webp';
import studentImg3 from '../../../../assets/placement-slider/placement-img-2.webp';
import studentImg4 from '../../../../assets/placement-slider/placement-img-3.webp';
import studentImg5 from '../../../../assets/placement-slider/placement-img-4.webp';
import studentImg6 from '../../../../assets/placement-slider/placement-img-5.webp';
import studentImg7 from '../../../../assets/placement-slider/student-1.png';
import studentImg8 from '../../../../assets/placement-slider/student-2.png';

// --- Student Data Updated ---
// Added thumbnailUrl and added ?autoplay=1 to videoUrl
const studentData = [
  {
    name: 'MAYA',
    feedback:
      '"This program was a game-changer! The practical skills and portfolio projects helped me land my dream job at a top tech company. The instructors were incredibly supportive throughout the entire process."',
    videoUrl: 'https://www.youtube.com/embed/bplbcMwCec0?autoplay=1',
    thumbnailUrl: 'https://img.youtube.com/vi/bplbcMwCec0/hqdefault.jpg',
  },
  {
    name: 'RAGHAV GULATI',
    feedback:
      '"This program was a game-changer! The practical skills and portfolio projects helped me land my dream job at a top tech company. The instructors were incredibly supportive throughout the entire process."',
    videoUrl: 'https://www.youtube.com/embed/Tj_qRxJf7PM?autoplay=1',
    thumbnailUrl: 'https://img.youtube.com/vi/Tj_qRxJf7PM/hqdefault.jpg',
  },
];

const sliderImages = [
  studentImg1,
  studentImg2,
  studentImg3,
  studentImg4,
  studentImg5,
  studentImg6,
  studentImg7,
  studentImg8,
];
// ------------------------------------

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
      currentStudentIndex === 0 ? studentData.length - 1 : currentStudentIndex - 1;
    changeStudent(newIndex);
  };

  // --- (Image Slider logic remains the same) ---
  const startSliderInterval = useCallback(() => {
    sliderIntervalRef.current = setInterval(() => {
      if (sliderRef.current) {
        const slider = sliderRef.current;
        const scrollAmount = slider.offsetWidth * 0.9;
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.9;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const currentStudent = studentData[currentStudentIndex];

  return (
    <div className={styles.placedStudentPage}>
      <h1 className={styles.mainHeading}>Our Placed Students</h1>

      {/* --- Section One: Feedback and Video (Animation Class Added) --- */}
      <section
        className={`${styles.sectionOne} ${
          isAnimating ? styles.sectionOneFading : ''
        }`}
      >
        <div className={styles.feedbackSection}>
          <h3 className={styles.studentName}>{currentStudent.name}</h3>
          <blockquote className={styles.studentFeedback}>
            {currentStudent.feedback}
          </blockquote>

          {/* --- Styled Manual Controls --- */}
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

      {/* --- (Section Two remains the same) --- */}
      <section className={styles.sectionTwo}>
        <h2 className={styles.sliderTitle}>Glimpses of Our Achievers</h2>
        <div className={styles.sliderOuterContainer}>
          <button
            className={`${styles.sliderButton} ${styles.prevButton}`}
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <FaArrowLeft />
          </button>

          <div
            className={styles.sliderContainer}
            ref={sliderRef}
            onMouseEnter={() => setSliderPaused(true)}
            onMouseLeave={() => setSliderPaused(false)}
          >
            <div className={styles.sliderWrapper}>
              {sliderImages.map((src, index) => (
                <div className={styles.slide} key={index}>
                  <img src={src} alt={`Placed student ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.sliderButton} ${styles.nextButton}`}
            onClick={handleNext}
            aria-label="Next slide"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlacedStudent;