import React, { useEffect, useState, useRef } from "react";

import * as THREE from "three";

import styles from "./integrationnextsection.module.css";

import Navbar from "../head/Navbar";

import images from "../../assets/images";

import Footer from "../footer/Footer";

import ReviewsSection from "../reviews/ReviewsSection";

import StudentCarousel from "../placement/StudentCarousel";
import PlacedImages from "../../assets/placementImages/PlacedImages.jpeg";

// import ZiionPlaced from "../../assets/placementImages/ZiionPlaced.jpg";

import useCustom from "../customHook/useCustom";

// --- Data Arrays ---

const brightStarsData = [
  {
    image: images.nisha,

    name: "Nisha",

    title: "Frontend Developer",

    date: "10 Jan, 2025",

    description:
      "Building responsive, user-friendly web applications with modern technologies like React, JavaScript, and CSS to deliver seamless digital experiences.",
  },

  {
    image: images.NishaRani,

    name: "Nisha Rani",

    title: "Graphic Designing",

    date: "12 Jan, 2025",

    description:
      "Creating visually appealing designs, logos, and branding assets using Adobe Creative Suite and modern design trends for impactful communication.",
  },

  {
    image: images.parmeet,

    name: "Parmeet",

    title: "Frontend Developer",

    date: "10 Jan, 2025",

    description:
      "Focused on crafting clean UI components, performance optimization, and cross-browser compatibility for enhanced user interactions.",
  },

  {
    image: images.raghav,

    name: "Raghav",

    title: "Frontend Developer",

    date: "12 Jan, 2025",

    description:
      "Building modern, responsive, and user-friendly websites using technologies like React, JavaScript, HTML, and CSS to create seamless digital experiences.",
  },

  {
    image: images.rupal,

    name: "Rupal",

    title: "Frontend Developer",

    date: "12 Jan, 2025",

    description:
      "Specializing in modern frameworks and delivering pixel-perfect, mobile-first websites with smooth animations and fast performance.",
  },

  {
    image: images.shubham,

    name: "Shubham",

    title: "Frontend Development",

    date: "11 Jan, 2025",

    description:
      "Building responsive, user-friendly web applications with modern technologies like React, JavaScript, and CSS to deliver seamless digital experiences.",
  },

  {
    image: images.simranjeet,

    name: "Simranjeet",

    title: "Data Analytics",

    date: "12 Jan, 2025",

    description:
      "Applying machine learning, predictive analytics, and data visualization to solve real-world challenges and uncover valuable insights from datasets.",
  },
];

const collegeFeatures = [
  { image: images.kuk, text: "Kurukshetra University (KUK)" },

  { image: images.chitkara, text: "Chitkara University" },

  { image: images.lpu, text: "Lovely Professional University (LPU)" },

  { image: images.cgc, text: "Chandigarh Group of Colleges (CGC)" },

  { image: images.baddi, text: "Baddi University" },

  { image: images.pu, text: "Punjab University (PU)" },

  { image: images.mm, text: "Maharishi Markandeshwar University (MMU)" },

  {
    image: images.aimt,

    text: "Ambala Institute of Management & Technology (AIMT)",
  },

  { image: images.jmit, text: "JMIT Radaur" },

  { image: images.maimt, text: "Maharaja Agrasen Institute (MAIMT)" },

  { image: images.timt, text: "TIMT Yamunanagar" },

  { image: images.cgc2, text: "CGC Landran" },
];

const Integration = () => {
  useCustom("Placement | Ziion Technology");

  const [projectCount, setProjectCount] = useState(0);

  const [industryCount, setIndustryCount] = useState(0);

  const [videos, setVideos] = useState([]);

  const canvasRef = useRef(null);

  // Three.js Scene Setup

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0xf8fafc, 5, 15); // Subtle white fog

    const camera = new THREE.PerspectiveCamera(
      75,

      window.innerWidth / window.innerHeight,

      0.1,

      1000,
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,

      alpha: true,

      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles

    const particlesGeometry = new THREE.BufferGeometry();

    const particlesCount = 3000;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      "position",

      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,

      color: 0x3b82f6,

      transparent: true,

      opacity: 0.8,

      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,

      particlesMaterial,
    );

    scene.add(particlesMesh);

    // Floating Cubes

    const cubes = [];

    const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);

    for (let i = 0; i < 15; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: i % 3 === 0 ? 0x3b82f6 : i % 3 === 1 ? 0xf97316 : 0xec4899,

        transparent: true,

        opacity: 0.6,

        emissive: i % 3 === 0 ? 0x3b82f6 : i % 3 === 1 ? 0xf97316 : 0xec4899,

        emissiveIntensity: 0.3,
      });

      const cube = new THREE.Mesh(cubeGeometry, material);

      cube.position.set(
        (Math.random() - 0.5) * 10,

        (Math.random() - 0.5) * 10,

        (Math.random() - 0.5) * 10,
      );

      cube.rotation.set(
        Math.random() * Math.PI,

        Math.random() * Math.PI,

        Math.random() * Math.PI,
      );

      cubes.push(cube);

      scene.add(cube);
    }

    // Lighting

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 1, 100);

    pointLight1.position.set(5, 5, 5);

    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf97316, 1, 100);

    pointLight2.position.set(-5, -5, -5);

    scene.add(pointLight2);

    // Mouse interaction

    let mouseX = 0;

    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;

      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate particles

      particlesMesh.rotation.y = elapsedTime * 0.05;

      particlesMesh.rotation.x = elapsedTime * 0.03;

      // Animate cubes

      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.01;

        cube.rotation.y += 0.01;

        cube.position.y =
          Math.sin(elapsedTime + i) * 0.5 + cube.position.y * 0.99;
      });

      // Camera follows mouse

      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;

      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      window.removeEventListener("resize", handleResize);

      renderer.dispose();

      particlesGeometry.dispose();

      particlesMaterial.dispose();

      cubeGeometry.dispose();

      cubes.forEach((cube) => cube.material.dispose());
    };
  }, []);

  // Counter Animation

  useEffect(() => {
    const animateCounter = (target, setter) => {
      let start = 0;

      const end = parseInt(target);

      if (end === 0) return;

      let duration = 2000;

      let incrementTime = Math.max(1, Math.floor(duration / end));

      const timer = setInterval(() => {
        start += 1;

        setter(start);

        if (start >= end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    };

    animateCounter(1200, setProjectCount);

    animateCounter(70, setIndustryCount);
  }, []);

  // YouTube Videos Fetch

  useEffect(() => {
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
    <div className={styles.pageContainer}>
      <Navbar />

      {/* ---------------------------------------------------- */}

      {/* --- HERO SECTION: THREE.JS 3D BACKGROUND --- */}

      {/* ---------------------------------------------------- */}

      <section className={styles.heroSection}>
        {/* Three.js Canvas */}

        <canvas ref={canvasRef} className={styles.threeCanvas}></canvas>

        {/* Hero Content */}

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Learn With Us, <br />
            Provide{" "}
            <span className={styles.heroHighlight}>The Best Services</span>
          </h1>

          <p className={styles.heroSubtitle}>
            We partner with leading universities and companies to bridge the gap
            between education and industry, ensuring our students are placing in
            top-tier roles.
          </p>
        </div>
      </section>

      {/* --- Placement Overview Image --- */}

      <section className={styles.placementOverview}>
        <div className={styles.sectionHeader}>
          <span className={styles.categoryLabel}>Success Stories</span>

          <h1 className={styles.sectionTitle}>Our Placed Students</h1>

          <p className={styles.sectionSubtitle}>
            Empowering careers through industry-aligned training. Our students
            have secured positions at leading companies across diverse sectors,
            showcasing the impact of quality education and dedicated placement
            support.
          </p>
        </div>

        {/* eslint-disable-next-line */}
        <img
          src={PlacedImages}
          alt="Ziion Placement Overview"
          className={styles.overviewImage}
          loading="lazy"
        />
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

      {/* --- College Partnership Section --- */}

      <section className={styles.collegeSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.categoryLabel}>Partnerships</span>

          <h1 className={styles.sectionTitle}>Our College Network</h1>

          <p className={styles.sectionSubtitle}>
            We are proud to collaborate with a wide network of esteemed
            universities and institutions.
          </p>
        </div>

        <div className={styles.collegeGrid}>
          {collegeFeatures.map((feature, index) => (
            <div key={index} className={styles.collegeCard}>
              <div className={styles.collegeIcon}>
                <img src={feature.image} alt={feature.text} loading="lazy" />
              </div>

              <p>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- Placement Stats Section --- */}

      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statsImageWrapper}>
            <div className={styles.statsLabel}>
              <p>
                Career Growth,
                <br />
                Tailored For You
              </p>
            </div>

            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
              alt="Placement Support"
              className={styles.statsImage}
              loading="lazy"
            />
          </div>

          <div className={styles.statsContent}>
            <span className={styles.categoryLabel}>Placements</span>

            <h1 className={styles.sectionHeading}>
              Dedicated Placement Support
            </h1>

            <p className={styles.sectionDescription}>
              We connect talented students with leading companies, ensuring the
              right career opportunities and industry exposure.
            </p>

            <div className={styles.statsCounter}>
              <div className={styles.statBox}>
                <span className={styles.statNumber}>{projectCount}+</span>

                <span className={styles.statText}>Students Placed</span>
              </div>

              <div className={styles.statBox}>
                <span className={styles.statNumber}>{industryCount}+</span>

                <span className={styles.statText}>Recruiting Companies</span>
              </div>
            </div>

            <div className={styles.statsHighlight}>
              <div className={styles.statsHighlightIcon}>➔</div>

              <p>
                Our placement team works closely with top recruiters. From
                skill-building to interview preparation, we help you launch a
                successful career with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <Footer />
    </div>
  );
};

export default Integration;
