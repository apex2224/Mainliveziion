import React, { useState, useEffect } from "react";
import styles from "./Placements.module.css";

// --- All Image Imports (Keep your existing imports) ---
import abhishek from "../../../../assets/placementImages copy/abhishek.jpeg";
import anuj from "../../../../assets/placementImages copy/anuj.jpeg";
// ... (Keep all your other imports exactly as they are) ...
import vansh from "../../../../assets/placementImages copy/vansh.jpeg";

import Mou1 from "../../../../assets/MOUimages/Mou1.jpg";
// ... (Keep MOU imports) ...
import Mou9 from "../../../../assets/MOUimages/Mou9.jpg";

// --- Data Arrays ---
const placementData = [
  { image: abhishek, name: "Abhishek Sharma" },
  { image: anuj, name: "Anuj Kumar" },
  // ... (Add the rest of your data here) ...
  { image: vansh, name: "Vansh Kumar" },
];

const mouImages = [
  { src: Mou1, alt: "MOU 1" },
  // ... (Add rest of MOU data) ...
  { src: Mou9, alt: "MOU 9" },
];

const Placements = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Ideally put this in .env
    const API_KEY = "AIzaSyB4j-jus5VeS0omz4f2WbPxaN43Fs5GVis";
    const PLAYLIST_ID = "PL35lLDct7CfqAVx-W91xJWmxHW9PSQN8G";

    if (!API_KEY) return;

    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setVideos(data.items);
        }
      })
      .catch((error) => console.error("Error fetching YouTube videos:", error));
  }, []);

  return (
    <div className={styles.placementsPage}>
      {/* --- SECTION 1: Placed Students --- */}
      <section className={styles.marqueeSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.blackText}>Our </span>
          <span className={styles.gradientText}>Achievers</span>
        </h2>

        {/* Navigation Buttons (Placed outside wrapper for better z-index control if needed, or keep absolute inside) */}
        <div className={styles.imageMarqueeContainer}>
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className={styles.imageTrack}>
            {/* Double map for seamless loop */}
            {[...placementData, ...placementData].map((student, index) => (
              <div key={index} className={styles.imageSlide}>
                <img
                  src={student.image}
                  alt={student.name}
                  className={styles.placementImage}
                  loading="lazy"
                />
                <p className={styles.studentName}>{student.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: Video Testimonials --- */}
      {videos.length > 0 && (
        <section className={styles.marqueeSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.blackText}>Hear From Our </span>
            <span className={styles.gradientText}>Students</span>
          </h2>
          <div className={styles.videoMarqueeWrapper}>
            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              aria-label="Previous"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              aria-label="Next"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div className={styles.videoTrack}>
              {[...videos, ...videos].map((video, index) => (
                <div className={styles.videoSlide} key={index}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                    title={video.snippet.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- SECTION 3: MOU Section --- */}
      <section className={styles.mouSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.blackText}>MOU signed with </span>
          <span className={styles.gradientText}>CGC Landran</span>
        </h2>

        {/* Static Featured Images */}
        <div className={styles.mouMainImages}>
          <img
            src={mouImages[3]?.src}
            alt="MOU signing"
            className={styles.mouPrimaryImage}
          />
          <img
            src={mouImages[6]?.src}
            alt="MOU collaboration"
            className={styles.mouPrimaryImage}
          />
        </div>

        {/* Marquee Logos */}
        <div className={styles.imageMarqueeContainer}>
          <div className={styles.mouMarqueeContent}>
            {[...mouImages.slice(2), ...mouImages.slice(2)].map(
              (mou, index) => (
                <div className={styles.mouGalleryItem} key={index}>
                  <img
                    src={mou.src}
                    alt={mou.alt}
                    className={styles.mouGalleryImage}
                    loading="lazy"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placements;
