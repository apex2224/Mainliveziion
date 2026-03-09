import React from "react";
import styles from "./StudentGallery.module.css";
import img1 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.15.58_87387036.jpg";
import img2 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.15.59_220f1b7d.jpg";
import img3 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.15.59_76ff3e99.jpg";
import img4 from "../../assets/StudentGallery/WhatsApp Image 2025-12-08 at 16.16.00_5dba9910.jpg";

const StudentGallery = () => {
  const galleryItems = [
    { id: 1, src: img1 },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
    { id: 4, src: img4 },
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

        <div className={styles.gallery}>
          {galleryItems.map((item) => (
            <div key={item.id} className={styles.galleryItem}>
              <img
                src={item.src}
                alt="Student Gallery"
                className={styles.media}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentGallery;
