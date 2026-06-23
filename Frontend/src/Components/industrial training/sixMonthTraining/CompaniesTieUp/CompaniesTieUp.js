import React from "react";
import styles from "./CompaniesTieUp.module.css"; // 1. Import the CSS module

// This helper function dynamically imports all images from a directory
export function importAll(r) {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context(
    "../../../../assets/TieUpCompaniesImg",
    false,
    /\.(png|jpe?g|svg|webp)$/ // Added webp support just in case
  )
);

const CompaniesTieUp = () => {
  const imageSources = Object.keys(images).map((key) => ({
    src: images[key],
    alt: key.split(".")[0], // Use filename as alt text
  }));

  return (
    <div className={styles.tieUpContainer}>
      <h2 className={styles.title}>Companies Tie-Up</h2>
      {/* marquee wrapper */}
      <div className={styles.marqueeWrapper}>
        {/* scroll */}
        <div className={styles.marqueeTrack}>
          {/* Map the images once */}
          {imageSources.map((image, index) => (
            <div className={styles.logoContainer} key={index}>
              <img src={image.src} alt={image.alt} className={styles.logo} loading="lazy" />
            </div>
          ))}
          {/* loop */}
          {imageSources.map((image, index) => (
            <div className={styles.logoContainer} key={`clone-${index}`}>
              <img src={image.src} alt={image.alt} className={styles.logo} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesTieUp;
