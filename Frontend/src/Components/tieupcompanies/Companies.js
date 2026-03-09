import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./companies.module.css";
import placementImages from "../../assets/placementImages";

const companies = [
  { src: placementImages.accenture, name: "Accenture" },
  { src: placementImages.appliedInformation, name: "Applied Information" },
  { src: placementImages.applify, name: "Applify" },
  { src: placementImages.bookMyShow, name: "BookMyShow" },
  { src: placementImages.capgemini, name: "Capgemini" },
  { src: placementImages.cloudFirst, name: "Cloud First" },
  { src: placementImages.cognization, name: "Cognizant" },
  { src: placementImages.firstCry, name: "FirstCry" },
  { src: placementImages.ibm, name: "IBM" },
  { src: placementImages.infosys, name: "Infosys" },
  { src: placementImages.nureca, name: "Nureca" },
  { src: placementImages.oracle, name: "Oracle" },
  { src: placementImages.persistance, name: "Persistent" },
  { src: placementImages.sanrai, name: "Sanrai" },
  { src: placementImages.tata, name: "Tata" },
];

export default function Companies() {
  return (
    <section className={styles.companiesSection}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            <span>Industry Partners</span>
          </div>
          <h2 className={styles.sectionTitle}>
            Trusted by Leading{" "}
            <span className={styles.highlight}>Organizations</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Our students are placed in top-tier companies across various
            industries
          </p>
        </div>

        {/* Companies Carousel */}
        <div className={styles.carouselWrapper}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={5}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              480: { slidesPerView: 3, spaceBetween: 18 },
              768: { slidesPerView: 4, spaceBetween: 22 },
              1024: { slidesPerView: 5, spaceBetween: 28 },
            }}
            className={styles.swiper}
          >
            {companies.map((company, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div className={styles.companyCard}>
                  <img
                    src={company.src}
                    alt={company.name}
                    className={styles.companyImage}
                    title={company.name}
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
