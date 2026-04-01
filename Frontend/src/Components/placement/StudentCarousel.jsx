import React from "react";
import { Container } from "react-bootstrap";
import PlacedImages from "../../assets/placementImages/PlacedImages.jpeg";
// import placementImg from "../../assets/placementImages/ZiionPlaced.jpg";
import styles from "./StudentCarousel.module.css";

function StudentCarousel() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          {/* Text Section */}
          <div className={styles.headerWrapper}>
            <h3 className={styles.heading}>
              Placements <span className={styles.gradientText}>Overview</span>
            </h3>
            <p className={styles.subheading}>
              The World's Leading Companies{" "}
              <span className={styles.gradientText}>Hire Our Talent</span>
            </p>
          </div>

          {/* Single Large Image Section */}
          <div className={styles.imageWrapper}>
            <img
              src={PlacedImages}
              alt="Placement Overview"
              className={styles.heroImage}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StudentCarousel;
