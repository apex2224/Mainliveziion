import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBlogs } from "../../firebase/blogFirebase";
import styles from "./BlogPreview.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data.slice(0, 3)); // Show latest 3 blogs
      } catch {
        // silently fail on homepage
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Don't render section if no blogs found
  if (!loading && blogs.length === 0) return null;

  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Our Latest <span className={styles.gradientText}>Blogs</span>
        </h2>
        <p className={styles.subtitle}>
          Insights, stories, and knowledge from our learning community
        </p>
      </div>

      {/* Cards */}
      {loading ? (
        <div className={styles.skeletonGrid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <div className={styles.skeletonImg} />
              <div className={styles.skeletonBody}>
                <div className={styles.skeletonLine} />
                <div className={styles.skeletonLine} style={{ width: "65%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.swiperWrapper}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={blogs.length > 1}
            breakpoints={{
              640:  { slidesPerView: 1.2 },
              768:  { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <article
                  id={`home-blog-${blog.id}`}
                  className={styles.card}
                  onClick={() => navigate(`/blogs/${blog.id}`)}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      src={blog.thumbnail}
                      alt={blog.title}
                      className={styles.image}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop";
                      }}
                    />
                    <span className={styles.categoryBadge}>{blog.category}</span>
                  </div>
                  <div className={styles.content}>
                    <div className={styles.meta}>
                      <span>✍️ {blog.author}</span>
                      <span>⏱ {blog.readTime}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{blog.title}</h3>
                    <p className={styles.excerpt}>
                      {blog.excerpt || blog.content?.substring(0, 110) + "..."}
                    </p>
                    <div className={styles.footer}>
                      <span className={styles.date}>
                        {blog.showTimestamp !== false ? `📅 ${formatDate(blog.createdAt)}` : ""}
                      </span>
                      <span className={styles.readMore}>Read More →</span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* View All Button */}
      {!loading && blogs.length > 0 && (
        <div className={styles.cta}>
          <button
            id="home-view-all-blogs"
            className={styles.ctaBtn}
            onClick={() => navigate("/blogs")}
          >
            View All Blogs
            <span className={styles.ctaArrow}>→</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogPreview;
