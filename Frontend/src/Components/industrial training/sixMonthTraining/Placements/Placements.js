import React, { useState, useEffect } from "react";
import styles from "./Placements.module.css";

// --- All Image Imports ---
// (Image imports remain the same...)
import abhishek from "../../../../assets/placementImages copy/abhishek.jpeg";
import anuj from "../../../../assets/placementImages copy/anuj.jpeg";
import anuragrai from "../../../../assets/placementImages copy/anuragrai.jpeg";
import arshdeep from "../../../../assets/placementImages copy/arshdeep.jpeg";
import arunesh from "../../../../assets/placementImages copy/arunesh.jpeg";
import aryan from "../../../../assets/placementImages copy/aryan.jpeg";
import gagandeep from "../../../../assets/placementImages copy/gagandeep.jpeg";
import gurnash from "../../../../assets/placementImages copy/gurnash.jpeg";
import harleen from "../../../../assets/placementImages copy/harleen.jpeg";
import harmanpreet from "../../../../assets/placementImages copy/harmanpreet.jpeg";
import harnoor from "../../../../assets/placementImages copy/harnoor.jpeg";
import jashandeep from "../../../../assets/placementImages copy/jashandeep.jpeg";
import jasmeet from "../../../../assets/placementImages copy/jasmeet.jpeg";
import kritishdhiman from "../../../../assets/placementImages copy/kritishdhiman.jpeg";
import lovepreet from "../../../../assets/placementImages copy/lovepreet.jpeg";
import manan from "../../../../assets/placementImages copy/manan.jpeg";
import manroop from "../../../../assets/placementImages copy/manroop.jpeg";
import muskan from "../../../../assets/placementImages copy/muskan.jpeg";
import niketa from "../../../../assets/placementImages copy/niketa.jpeg";
import nisha from "../../../../assets/placementImages copy/nisha.jpeg";
import nisharani from "../../../../assets/placementImages copy/nisharani.jpeg";
import parmeet from "../../../../assets/placementImages copy/parmeet.jpeg";
import raghav from "../../../../assets/placementImages copy/raghav.jpeg";
import rubalpreet from "../../../../assets/placementImages copy/rubalpreet.jpeg";
import rupal from "../../../../assets/placementImages copy/rupal.jpeg";
import shubham from "../../../../assets/placementImages copy/shubham.jpeg";
import simranjeet from "../../../../assets/placementImages copy/simranjeet.jpeg";
import simrat from "../../../../assets/placementImages copy/simrat.jpeg";
import taranveer from "../../../../assets/placementImages copy/taranveer.jpeg";
import vansh from "../../../../assets/placementImages copy/vansh.jpeg";

// MOU Images
import Mou1 from "../../../../assets/MOUimages/Mou1.jpg";
import Mou2 from "../../../../assets/MOUimages/Mou2.jpg";
import Mou3 from "../../../../assets/MOUimages/Mou3.jpg";
import Mou4 from "../../../../assets/MOUimages/Mou4.jpg";
import Mou5 from "../../../../assets/MOUimages/Mou5.jpg";
import Mou6 from "../../../../assets/MOUimages/Mou6.jpg";
import Mou7 from "../../../../assets/MOUimages/Mou7.jpg";
import Mou8 from "../../../../assets/MOUimages/Mou8.jpg";
import Mou9 from "../../../../assets/MOUimages/Mou9.jpg";
// --- Data Arrays ---
const placementData = [
  { image: abhishek, name: "Abhishek Sharma" },
  { image: anuj, name: "Anuj Kumar" },
  { image: anuragrai, name: "Anurag Rai" },
  { image: arshdeep, name: "Arshdeep Kaur" },
  { image: arunesh, name: "Arunesh Singh" },
  { image: aryan, name: "Aryan Gupta" },
  { image: gagandeep, name: "Gagandeep Singh" },
  { image: gurnash, name: "Gurnash Kaur" },
  { image: harleen, name: "Harleen Kaur" },
  { image: harmanpreet, name: "Harmanpreet Singh" },
  { image: harnoor, name: "Harnoor Singh" },
  { image: jashandeep, name: "Jashandeep Kaur" },
  { image: jasmeet, name: "Jasmeet Singh" },
  { image: kritishdhiman, name: "Kritish Dhiman" },
  { image: lovepreet, name: "Lovepreet Kaur" },
  { image: manan, name: "Manan Sharma" },
  { image: manroop, name: "Manroop Kaur" },
  { image: muskan, name: "Muskan Gupta" },
  { image: niketa, name: "Niketa Devi" },
  { image: nisha, name: "Nisha Kumari" },
  { image: nisharani, name: "Nisha Rani" },
  { image: parmeet, name: "Parmeet Singh" },
  { image: raghav, name: "Raghav Sharma" },
  { image: rubalpreet, name: "Rubalpreet Kaur" },
  { image: rupal, name: "Rupal Verma" },
  { image: shubham, name: "Shubham Gupta" },
  { image: simranjeet, name: "Simranjeet Singh" },
  { image: simrat, name: "Simrat Kaur" },
  { image: taranveer, name: "Taranveer Singh" },
  { image: vansh, name: "Vansh Kumar" },
];

const mouImages = [
  { src: Mou1, alt: "MOU 1" },
  { src: Mou2, alt: "MOU 2" },
  { src: Mou3, alt: "MOU 3" },
  { src: Mou4, alt: "MOU 4" },
  { src: Mou5, alt: "MOU 5" },
  { src: Mou6, alt: "MOU 6" },
  { src: Mou7, alt: "MOU 7" },
  { src: Mou8, alt: "MOU 8" },
  { src: Mou9, alt: "MOU 9" },
];

const Placements = () => {
  const [videos, setVideos] = useState([]);

  // --- Effect for fetching YouTube videos ---
  useEffect(() => {
    console.log("Running useEFfect!");
  }, []);
  useEffect(() => {
    console.log("Inside useEFfect");
    const API_KEY = "AIzaSyB4j-jus5VeS0omz4f2WbPxaN43Fs5GVis";
    const PLAYLIST_ID = "PL35lLDct7CfqAVx-W91xJWmxHW9PSQN8G";

    if (!API_KEY) {
      console.error(
        "YouTube API Key is missing. Please add it to your .env.local file."
      );
      return;
    }
    console.log("🎯 Fetching videos...");

    fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${PLAYLIST_ID}&key=${API_KEY}`
    )
      .then((res) => {
        console.log("Response object:", res);
        return res.json(); // ✅ You must return this
      })
      .then((data) => {
        console.log("In data in fetch");
        console.log(data);

        if (data.items) {
          setVideos(data.items);
        } else {
          console.error("Failed to fetch videos:", data.error?.message);
        }
      })
      .catch((error) => console.error("Error fetching YouTube videos:", error));
  }, []);

  return (
    <div className={styles.placementsPage}>
      {/* --- SECTION 1: Placed Students Image Marquee --- */}
      <section className={styles.marqueeSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.blackText}>Our </span>
          <span className={styles.gradientText}> Achievers</span>
        </h2>
        <div className={styles.imageMarqueeContainer}>
          <div className={styles.imageTrack}>
            {/* Render images twice for a seamless, continuous loop */}
            {placementData.map((student, index) => (
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
            {placementData.map((student, index) => (
              <div key={`clone-${index}`} className={styles.imageSlide}>
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

      {/* --- SECTION 2: Placement Video Testimonials --- */}
      {videos.length > 0 && (
        <section className={styles.marqueeSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.blackText}>Hear From Our</span>
            <span className={styles.gradientText}> Students</span>
          </h2>
          <div className={styles.videoMarqueeWrapper}>
            <div className={styles.videoTrack}>
              {videos.map((video) => (
                <div className={styles.videoSlide} key={video.id}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ))}
              {videos.map((video) => (
                <div className={styles.videoSlide} key={`${video.id}-clone`}>
                  <iframe
                    src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                    title={video.snippet.title}
                    frameBorder="0"
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
          <span className={styles.blackText}> MOU signed with </span>
          <span className={styles.gradientText}>CGC Landran</span>
        </h2>
        <div className={styles.mouMainImages}>
          <img
            src={mouImages[3].src}
            alt="MOU signing ceremony"
            className={styles.mouPrimaryImage}
            loading="lazy"
          />
          <img
            src={mouImages[6].src}
            alt="University collaboration"
            className={styles.mouPrimaryImage}
            loading="lazy"
          />
        </div>
        <div className={styles.mouMarqueeWrapper}>
          <div className={styles.mouMarqueeContent}>
            {mouImages.slice(2).map((mou, index) => (
              <div className={styles.mouGalleryItem} key={`mou-a-${index}`}>
                <img
                  src={mou.src}
                  alt={mou.alt}
                  className={styles.mouGalleryImage}
                  loading="lazy"
                />
              </div>
            ))}
            {mouImages.slice(2).map((mou, index) => (
              <div className={styles.mouGalleryItem} key={`mou-b-${index}`}>
                <img
                  src={mou.src}
                  alt={mou.alt}
                  className={styles.mouGalleryImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Placements;