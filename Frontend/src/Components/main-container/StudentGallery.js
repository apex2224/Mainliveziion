import React from "react";
import styles from "./StudentGallery.module.css";

// Images
import img1 from "../../assets/StudentGallery/SG1.jpeg";
import img2 from "../../assets/StudentGallery/SG2.jpeg";
import img3 from "../../assets/StudentGallery/SG3.jpeg";
import img4 from "../../assets/StudentGallery/SG4.jpeg";
import img5 from "../../assets/StudentGallery/SG5.jpeg";
import img6 from "../../assets/StudentGallery/SG6.jpeg";
import img7 from "../../assets/StudentGallery/SG7.jpeg";
import waImg1 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.15.58_87387036.jpg";
import waImg2 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.15.59_220f1b7d.jpg";
import waImg3 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.15.59_76ff3e99.jpg";
import waImg4 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.16.00_5dba9910.jpg";

// Videos
import vid1 from "../../assets/StudentGallery/Vid1.mp4";
import vid2 from "../../assets/StudentGallery/Vid2.mp4";
import vid3 from "../../assets/StudentGallery/Vid3.mp4";
import vid4 from "../../assets/StudentGallery/Vid4.mp4";
import waVid1 from "../../assets/StudentGallery/WhatsApp Video 2025-12-08 at 16.16.00_0519f26d.mp4";
import waVid2 from "../../assets/StudentGallery/WhatsApp Video 2025-12-08 at 16.16.00_3071f7c8.mp4";

const StudentGallery = () => {
  // Array of all items with their types to render appropriately
  const galleryItems = [
    { id: 1, type: "image", src: img1 },
    { id: 2, type: "video", src: vid1 },
    { id: 3, type: "image", src: img2 },
    { id: 4, type: "image", src: waImg1 },
    { id: 5, type: "video", src: vid2 },
    { id: 6, type: "image", src: img3 },
    { id: 7, type: "video", src: waVid1 },
    { id: 8, type: "image", src: img4 },
    { id: 9, type: "image", src: waImg2 },
    { id: 10, type: "video", src: vid3 },
    { id: 11, type: "image", src: img5 },
    { id: 12, type: "image", src: waImg3 },
    { id: 13, type: "video", src: waVid2 },
    { id: 14, type: "image", src: img6 },
    { id: 15, type: "video", src: vid4 },
    { id: 16, type: "image", src: waImg4 },
    { id: 17, type: "image", src: img7 },
  ];

  return (
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Student <span className={styles.gradientText}>Gallery</span>
          </h2>
          <p className={styles.subtitle}>
            Capturing moments of learning, innovation, and success
          </p>
        </div>

        {/* Masonry Pinterest-style Grid */}
        <div className={styles.masonryGrid}>
          {galleryItems.map((item) => (
            <div key={item.id} className={styles.masonryItem}>
              {item.type === "video" ? (
                <video
                  src={item.src}
                  className={styles.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <img
                  src={item.src}
                  alt="Student Gallery"
                  className={styles.media}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentGallery;
