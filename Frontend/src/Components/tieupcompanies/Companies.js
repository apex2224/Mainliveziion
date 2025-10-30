import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./companies.module.css";
import images from "../../assets/images";

const companies = [
  { src: images.accenture, name: "Accenture" },
  { src: images.appliedInformation, name: "Applied Information" },
  { src: images.applify, name: "Applify" },
  { src: images.bookMyShow, name: "BookMyShow" },
  { src: images.capgemini, name: "Capgemini" },
  { src: images.cloudFirst, name: "Cloud First" },
  { src: images.cognization, name: "Cognizant" },
  { src: images.firstCry, name: "FirstCry" },
  { src: images.ibm, name: "IBM" },
  { src: images.infosys, name: "Infosys" },
  { src: images.nureca, name: "Nureca" },
  { src: images.oracle, name: "Oracle" },
  { src: images.persistance, name: "Persistent" },
  { src: images.sanrai, name: "Sanrai" },
  { src: images.tata, name: "Tata" },
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
