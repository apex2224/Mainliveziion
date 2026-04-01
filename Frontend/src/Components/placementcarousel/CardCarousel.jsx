import React, { useEffect, useState } from "react";
import styles from "./CardCarousel.module.css";
import images from "../../assets/images";

const rightScrollCards = [
    { image: images.raghav },
    { image: images.NishaRani },
    { image: images.parmeet },
    { image: images.nisha },
    { image: images.rupal },
    { image: images.shubham },
    { image: images.simranjeet },
    { image: images.simratMl },
    { image: images.arunesh },
];

const leftScrollCards = [
    { name: "Maya", company: "MERN Stack", iframe: "https://www.youtube.com/embed/Qv99TJA9_3E" },
    { name: "Mandeep Singh", company: "MERN Stack", iframe: "https://www.youtube.com/embed/5c_ZlshtNAY" },
    { name: "Vandana", company: "MERN Stack", iframe: "https://www.youtube.com/embed/QNVCrzBAjN0" },
    { name: "Maya Dhingra", company: "MERN Stack", iframe: "https://www.youtube.com/embed/28f0eX_cAg0" },
    { name: "Suman", company: "Graphic Designing", iframe: "https://www.youtube.com/embed/nS2EpHjpmFo" },
    { name: "Himanshu", company: "Digital Marketing", iframe: "https://www.youtube.com/embed/8lDAZ-Vhbg8" },
    { name: "Ravi", company: "MERN Stack", iframe: "https://www.youtube.com/embed/moquD8DW7Xo" },
    { name: "Rohit", company: "Data Science", iframe: "https://www.youtube.com/embed/bZB0xpEuU4w" },
];

const CARD_WIDTH = 300; // px
const VIDEO_WIDTH = 310; // px

const CardCarousel = () => {
    // Top (left → right)
    const [topIndex, setTopIndex] = useState(0);
    const [topTransition, setTopTransition] = useState(true);

    // Bottom (right → left)
    const [bottomIndex, setBottomIndex] = useState(0);
    const [bottomTransition, setBottomTransition] = useState(true);

    // Carousel play/pause state
    const [isTopPaused, setIsTopPaused] = useState(false);
    const [isBottomPaused, setIsBottomPaused] = useState(false);

    // Auto move top carousel
    useEffect(() => {
        if (isTopPaused) return;
        const id = setInterval(() => {
            setTopIndex((prev) => prev + 1);
        }, 2000);
        return () => clearInterval(id);
    }, [isTopPaused]);

    // Auto move bottom carousel
    useEffect(() => {
        if (isBottomPaused) return;
        const id = setInterval(() => {
            setBottomIndex((prev) => prev + 1);
        }, 2200);
        return () => clearInterval(id);
    }, [isBottomPaused]);

    // Reset loop for top
    useEffect(() => {
        if (topIndex >= rightScrollCards.length) {
            setTimeout(() => {
                setTopTransition(false);
                setTopIndex(0);
                requestAnimationFrame(() => setTopTransition(true));
            }, 800);
        }
    }, [topIndex]);

    // Reset loop for bottom
    useEffect(() => {
        if (bottomIndex >= leftScrollCards.length) {
            setTimeout(() => {
                setBottomTransition(false);
                setBottomIndex(0);
                requestAnimationFrame(() => setBottomTransition(true));
            }, 800);
        }
    }, [bottomIndex]);

    // Pause on hover handlers
    const handleTopMouseEnter = () => setIsTopPaused(true);
    const handleTopMouseLeave = () => setIsTopPaused(false);

    const handleBottomMouseEnter = () => setIsBottomPaused(true);
    const handleBottomMouseLeave = () => setIsBottomPaused(false);

    // Manual buttons
    const handleTopPrev = () => {
        setTopIndex((prev) => (prev === 0 ? rightScrollCards.length - 1 : prev - 1));
    };
    const handleTopNext = () => {
        setTopIndex((prev) => (prev === rightScrollCards.length - 1 ? 0 : prev + 1));
    };

    const handleBottomPrev = () => {
        setBottomIndex((prev) => (prev === 0 ? leftScrollCards.length - 1 : prev - 1));
    };
    const handleBottomNext = () => {
        setBottomIndex((prev) => (prev === leftScrollCards.length - 1 ? 0 : prev + 1));
    };

    return (
        <div>
            <h1 className={styles.storyHeading}>Our Success Story</h1>

            {/* 🔹 Top: images, left → right */}
            <div className={styles.carouselWrapper}>
                <div
                    className={styles.carousel}
                    style={{
                        // Start far left, move towards 0
                        transform: `translateX(${-rightScrollCards.length * CARD_WIDTH + topIndex * CARD_WIDTH
                            }px)`,
                        transition: topTransition ? "transform 0.8s ease-in-out" : "none",
                    }}
                    onMouseEnter={handleTopMouseEnter}
                    onMouseLeave={handleTopMouseLeave}
                >
                    {[...rightScrollCards, ...rightScrollCards].map((item, i) => (
                        <div key={i} className={styles.card}>
                            <img src={item.image} alt="student" className={styles.cardImage} />
                        </div>
                    ))}
                </div>
                <div className={styles.carouselButtons}>
                    <button onClick={handleTopPrev} className={styles.carouselBtn}>◀️</button>
                    <button onClick={handleTopNext} className={styles.carouselBtn}>▶️</button>
                </div>

            </div>

            {/* 🔹 Bottom: videos, right → left */}
            <div className={styles.leftCarouselWrapper}>
                <div
                    className={styles.leftCarousel}
                    style={{
                        transform: `translateX(-${bottomIndex * VIDEO_WIDTH}px)`,
                        transition: bottomTransition ? "transform 0.8s ease-in-out" : "none",
                    }}
                    onMouseEnter={handleBottomMouseEnter}
                    onMouseLeave={handleBottomMouseLeave}
                >
                    {[...leftScrollCards, ...leftScrollCards].map((item, i) => (
                        <div key={i} className={styles.leftCard}>
                            <iframe
                                src={item.iframe}
                                className={styles.leftIframe}
                                title={`video-${i}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                            />
                            <div className={styles.leftProfileSection}>{item.name}</div>
                            <div className={styles.leftCompanySection}>{item.company}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.carouselButtons}>
                    <button onClick={handleBottomPrev} className={styles.carouselBtn}>◀️</button>
                    <button onClick={handleBottomNext} className={styles.carouselBtn}>▶️</button>
                </div>
            </div>
        </div>
    );
};

export default CardCarousel;