import React, { useState, useEffect } from "react";
import styles from "./Placements.module.css";

// --- EXISTING PLACEMENT IMPORTS ---
import abhishek from "../../../../assets/placementImages copy/abhishek.jpeg";
import anuj from "../../../../assets/placementImages copy/anuj.jpeg";
import vansh from "../../../../assets/placementImages copy/vansh.jpeg";
import taranveer from "../../../../assets/placementImages copy/taranveer.jpeg";
import simrat from "../../../../assets/placementImages copy/simrat.jpeg";
import simranjeet from "../../../../assets/placementImages copy/simranjeet.jpeg";
import shubham from "../../../../assets/placementImages copy/shubham.jpeg";
import nisha from "../../../../assets/placementImages copy/nisha.jpeg";
import parmeet from "../../../../assets/placementImages copy/parmeet.jpeg";
import rupal from "../../../../assets/placementImages copy/rupal.jpeg";
import raghav from "../../../../assets/placementImages copy/raghav.jpeg";
import nisharani from "../../../../assets/placementImages copy/nisharani.jpeg";

// --- MOU ASSETS IMPORTS ---
// Images
import Mou1 from "../../../../assets/MOUimages/Mou1.jpg";
import Mou2 from "../../../../assets/MOUimages/Mou2.jpg";
import Mou3 from "../../../../assets/MOUimages/Mou3.jpg";
import Mou4 from "../../../../assets/MOUimages/Mou4.jpg";
import Mou5 from "../../../../assets/MOUimages/Mou5.jpg";
import Mou6 from "../../../../assets/MOUimages/Mou6.jpg";
import Mou7 from "../../../../assets/MOUimages/Mou7.jpg";
import Mou8 from "../../../../assets/MOUimages/Mou8.jpg";
import Mou9 from "../../../../assets/MOUimages/Mou9.jpg";
import Mou10 from "../../../../assets/MOUimages/Mou10.jpg";
import Mou11 from "../../../../assets/MOUimages/Mou11.jpg";
import Mou12 from "../../../../assets/MOUimages/Mou12.jpg";

// Videos
import Mou13 from "../../../../assets/MOUimages/Mou13.mp4";
import Mou14 from "../../../../assets/MOUimages/Mou14.mp4";
import Mou15 from "../../../../assets/MOUimages/Mou15.mp4";

// --- DATA ---
const placementData = [
  { image: abhishek, name: "Abhishek Sharma" },
  { image: anuj, name: "Anuj Paimania" },
  { image: vansh, name: "Vansh Soni" },
  { image: taranveer, name: "Taranveer Singh" },
  { image: simrat, name: "Simrat Kaur" },
  { image: simranjeet, name: "Simranjeet Kaur" },
  { image: shubham, name: "Shubham Goyal" },
  { image: nisha, name: "Nisha" },
  { image: parmeet, name: "Parmeet" },
  { image: rupal, name: "Rupal" },
  { image: raghav, name: "Raghav" },
  { image: nisharani, name: "Nisha Rani" },
];

const mouVideos = [
  { id: 13, src: Mou13, title: "Collaboration Highlights" },
  { id: 14, src: Mou14, title: "Campus Walkthrough" },
  { id: 15, src: Mou15, title: "Student Interaction" },
];

const mouImages = [
  Mou1,
  Mou2,
  Mou3,
  Mou4,
  Mou5,
  Mou6,
  Mou7,
  Mou8,
  Mou9,
  Mou10,
  Mou11,
  Mou12,
];

const Placements = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // YouTube API Fetch Logic (Keep existing)
    const API_KEY = "AIzaSyB4j-jus5VeS0omz4f2WbPxaN43Fs5GVis";
    const PLAYLIST_ID = "PL35lLDct7CfqAVx-W91xJWmxHW9PSQN8G";

    if (!API_KEY) return;

    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setVideos(data.items);
      })
      .catch((error) => console.error("Error fetching YouTube videos:", error));
  }, []);

  return (
    <div className={styles.placementsPage}>
      {/* --- SECTION 1: MARQUEE (Placement Students) --- */}
      <section className={styles.marqueeSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.blackText}>Our </span>
          <span className={styles.gradientText}>Achievers</span>
        </h2>
        <div className={styles.imageMarqueeContainer}>
          <div className={styles.imageTrack}>
            {[...placementData, ...placementData, ...placementData].map(
              (student, index) => (
                <div key={index} className={styles.imageSlide}>
                  <img
                    src={student.image}
                    alt={student.name}
                    className={styles.placementImage}
                    loading="lazy"
                  />
                  <p className={styles.studentName}>{student.name}</p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: YOUTUBE TESTIMONIALS --- */}
      {videos.length > 0 && (
        <section className={styles.marqueeSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.blackText}>Hear From Our </span>
            <span className={styles.gradientText}>Students</span>
          </h2>
          <div className={styles.videoMarqueeWrapper}>
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

      {/* --- SECTION 3: MOU VIDEOS (Full Video Playback) --- */}
      <section className={styles.mouVideoSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.blackText}>Event </span>
            <span className={styles.gradientText}>Highlights</span>
          </h2>
          <p className={styles.subText}>
            Watch the key moments from our strategic alliance ceremony with CGC
            Landran.
          </p>
        </div>

        <div className={styles.videoGrid}>
          {mouVideos.map((video) => (
            <div key={video.id} className={styles.localVideoCard}>
              <video
                className={styles.videoPlayer}
                controls
                width="100%"
                preload="metadata"
              >
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className={styles.videoLabel}>{video.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SECTION 4: MOU IMAGE GALLERY (Masonry Layout - Full Image) --- */}
      <section className={styles.mouGallerySection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.blackText}>Gallery: </span>
            <span className={styles.gradientText}>The Signing Ceremony</span>
          </h2>
          <p className={styles.subText}>
            Capturing the spirit of collaboration and future innovation.
          </p>
        </div>

        {/* Using Masonry Layout Class here */}
        <div className={styles.imageMasonry}>
          {mouImages.map((imgSrc, index) => (
            <div key={index} className={styles.galleryItem}>
              <img
                src={imgSrc}
                alt={`MOU Event ${index + 1}`}
                className={styles.galleryImage}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Placements;
