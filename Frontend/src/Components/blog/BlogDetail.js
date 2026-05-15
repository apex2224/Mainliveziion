import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../head/Navbar";
import Footer from "../footer/Footer";
import { fetchBlogById, fetchAllBlogs } from "../../firebase/blogFirebase";
import styles from "./BlogDetail.module.css";
import "react-quill/dist/quill.snow.css";

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  useEffect(() => {
    const loadBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchBlogById(id);
        setBlog(data);

        // Fetch related blogs (same category)
        const allBlogs = await fetchAllBlogs();
        const related = allBlogs
          .filter((b) => b.id !== id && b.category === data.category)
          .slice(0, 3);
        setRelatedBlogs(related);
      } catch (err) {
        setError("Blog not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.loadingWrapper}>
          <div className={styles.loadingHero} />
          <div className={styles.loadingContent}>
            <div className={styles.loadingLine} style={{ width: "60%" }} />
            <div className={styles.loadingLine} style={{ width: "35%" }} />
            <div className={styles.loadingLine} />
            <div className={styles.loadingLine} />
            <div className={styles.loadingLine} style={{ width: "75%" }} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <Navbar />
        <div className={styles.errorWrapper}>
          <span className={styles.errorIcon}>😕</span>
          <h2>Oops! Blog not found</h2>
          <p>{error}</p>
          <button
            className={styles.backBtn}
            onClick={() => navigate("/blogs")}
          >
            ← Back to All Blogs
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />

      {/* Hero Image */}
      <div className={styles.heroImage}>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className={styles.heroBgImg}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=500&fit=crop";
          }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroOverlayContent}>
          <button
            className={styles.backBtnHero}
            onClick={() => navigate("/blogs")}
          >
            ← All Blogs
          </button>
          <span className={styles.heroCategoryBadge}>{blog.category}</span>
        </div>
      </div>

      {/* Article Container */}
      <article className={styles.articleWrapper}>
        <div className={styles.articleContainer}>
          {/* Meta Info */}
          <div className={styles.metaBar}>
            <span className={styles.metaItem}>✍️ {blog.author}</span>
            {blog.showTimestamp !== false && (
              <>
                <span className={styles.metaDot}>•</span>
                <span className={styles.metaItem}>
                  📅 {formatDate(blog.createdAt)}
                </span>
              </>
            )}
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaItem}>⏱ {blog.readTime}</span>
          </div>

          {/* Title */}
          <h1 className={styles.articleTitle}>{blog.title}</h1>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Excerpt */}
          {blog.excerpt && (
            <p className={styles.articleExcerpt}>{blog.excerpt}</p>
          )}

          {/* Content */}
          <div
            className={`${styles.articleContent} ql-snow`}
          >
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              style={{
                padding: 0,
                fontFamily: "'Inter', -apple-system, sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "#374151",
              }}
            />
          </div>

          {/* Tags */}
          <div className={styles.tagRow}>
            <span className={styles.tag}>{blog.category}</span>
            <span className={styles.tag}>Mainliveziion</span>
            <span className={styles.tag}>Tech Blog</span>
          </div>

          {/* Share Row */}
          <div className={styles.shareRow}>
            <span className={styles.shareLabel}>Share this article:</span>
            <button
              className={styles.shareBtn}
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}`,
                  "_blank"
                )
              }
            >
              LinkedIn
            </button>
            <button
              className={styles.shareBtn}
              onClick={() =>
                window.open(
                  `https://wa.me/?text=${encodeURIComponent(
                    blog.title + " - " + window.location.href
                  )}`,
                  "_blank"
                )
              }
            >
              WhatsApp
            </button>
            <button
              className={styles.shareBtn}
              onClick={handleCopyLink}
            >
              Copy Link
            </button>
          </div>
        </div>
      </article>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedContainer}>
            <h2 className={styles.relatedTitle}>
              Related <span className={styles.gradientText}>Articles</span>
            </h2>
            <div className={styles.relatedGrid}>
              {relatedBlogs.map((rb) => (
                <div
                  key={rb.id}
                  className={styles.relatedCard}
                  onClick={() => navigate(`/blogs/${rb.id}`)}
                >
                  <div className={styles.relatedImgWrapper}>
                    <img
                      src={rb.thumbnail}
                      alt={rb.title}
                      className={styles.relatedImg}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedCategory}>
                      {rb.category}
                    </span>
                    <h3 className={styles.relatedCardTitle}>{rb.title}</h3>
                    <span className={styles.relatedReadTime}>{rb.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Blogs CTA */}
      <div className={styles.ctaSection}>
        <button className={styles.ctaBtn} onClick={() => navigate("/blogs")}>
          ← View All Blogs
        </button>
      </div>

      <Footer />

      {/* ── Bottom Toast Notification ── */}
      <div className={`${styles.toast} ${toastVisible ? styles.toastShow : ""}`}>
        <span className={styles.toastIcon}>✅</span>
        <span>Link Copied!</span>
      </div>
    </div>
  );
};

export default BlogDetail;
