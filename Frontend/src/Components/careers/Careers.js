import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  MapPin, Briefcase, Tag, ArrowRight, ArrowDown,
  Globe, Building2, GraduationCap, Users,
  Rocket, BookOpen, Handshake, TrendingUp,
  BookMarked, Umbrella, Star, Layers, Award, PartyPopper,
  ChevronDown, Search, X,
} from "lucide-react";
import Navbar from "../head/Navbar";
import Footer from "../footer/Footer";
import { fetchPublishedJobs } from "../../firebase/careersFirebase";
import {
  hiringSteps,
  careersFAQ,
  employeeStories,
} from "./careersData";
import styles from "./Careers.module.css";

// ── Job Card ──────────────────────────────────────────────────────────────────
const JobCard = ({ job }) => (
  <div className={styles.roleCard}>
    <div className={styles.roleCardInner}>
      <div className={styles.roleCardLeft}>
        <div className={styles.roleCardMeta}>
          <span className={styles.roleDeptBadge}>{job.department}</span>
          <span className={styles.roleLevelBadge}>{job.experience}</span>
        </div>
        <h3 className={styles.roleTitle}>{job.title}</h3>
        <p className={styles.roleDesc}>{job.shortDescription}</p>
      </div>

      <div className={styles.roleCardMid}>
        <div className={styles.roleMeta}>
          <MapPin size={14} className={styles.roleMetaIcon} />
          <span>{job.location}</span>
        </div>
        <div className={styles.roleMeta}>
          <Briefcase size={14} className={styles.roleMetaIcon} />
          <span>{job.workMode}</span>
        </div>
        <div className={`${styles.roleMeta} ${styles.roleMetaSalary}`}>
          <Tag size={14} className={styles.roleMetaIcon} />
          <span>{job.employmentType}</span>
        </div>
        <div className={styles.roleSkills}>
          {(Array.isArray(job.skills) ? job.skills : []).slice(0, 4).map((s) => (
            <span key={s} className={styles.roleSkillTag}>{s}</span>
          ))}
        </div>
      </div>

      <div className={styles.roleCardRight}>
        <Link to={`/careers/${job.slug}`} className={styles.roleApplyBtn}>
          <span>View Role &amp; Apply</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
);

// ── FAQ Item ──────────────────────────────────────────────────────────────────
const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className={styles.faqItem}>
    <button className={styles.faqQuestion} onClick={onToggle} aria-expanded={isOpen}>
      <span>{item.question}</span>
      <ChevronDown size={16} className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ""}`} />
    </button>
    {isOpen && <p className={styles.faqAnswer}>{item.answer}</p>}
  </div>
);

// ── Main Careers Page ─────────────────────────────────────────────────────────
const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    fetchPublishedJobs()
      .then(setJobListings)
      .catch(() => setJobListings([]))
      .finally(() => setJobsLoading(false));
  }, []);

  const departments = [...new Set(jobListings.map((j) => j.department))];

  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      const q = searchQuery.toLowerCase();
      const skills = Array.isArray(job.skills) ? job.skills : [];
      const matchesSearch =
        !q ||
        (job.title || "").toLowerCase().includes(q) ||
        (job.department || "").toLowerCase().includes(q) ||
        skills.some((s) => s.toLowerCase().includes(q));
      const matchesDept =
        activeFilter === "all" || job.department === activeFilter;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, activeFilter, jobListings]);

  return (
    <div className={styles.careersPage}>
      <Helmet>
        <title>Careers at Ziion Technology | Join Our Team in Mohali</title>
        <meta
          name="description"
          content="Explore career opportunities at Ziion Technology in Mohali. We are hiring React Developers, Digital Marketing Executives, Graphic Designers and interns. Apply now."
        />
        <link rel="canonical" href="https://ziiontechnology.in/careers" />
      </Helmet>

      <Navbar />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroGlow1} />
        <div className={styles.heroGlow2} />
        <div className={styles.heroInner}>
          {/* Eyebrow */}
          <div className={styles.heroEyebrow}>
            <span className={styles.eyebrowPing} />
            <span className={styles.eyebrowText}>Positions Active</span>
            <span className={styles.eyebrowDivider}>·</span>
            <span className={styles.eyebrowSub}>CAREERS &amp; OPPORTUNITIES · MOHALI, INDIA</span>
          </div>


          {/* Heading + Description split */}
          <div className={styles.heroGrid}>
            <div className={styles.heroHeadingCol}>
              <h1 className={styles.heroHeading}>
                Build Your Career at the Edge of Technology.
              </h1>
            </div>
            <div className={styles.heroDescCol}>
              <p className={styles.heroDesc}>
                Join a team where technology, creativity and continuous learning
                come together. We build real products, mentor real people, and
                grow together — not just fill positions.
              </p>
              <div className={styles.heroCtas}>
                <a href="#positions" className={styles.ctaPrimary}>
                  Explore {jobsLoading ? "…" : jobListings.length} Open Positions
                  <ArrowDown size={16} />
                </a>
                <a href="#manifesto" className={styles.ctaSecondary}>
                  Our Culture
                </a>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <div className={styles.statsStrip}>
            {[
              { icon: <MapPin size={16} />, label: "Location", value: "Mohali, India", sub: "Phase 8, Industrial Area" },
              { icon: <Building2 size={16} />, label: "Founded", value: "2018", sub: "6+ years of training excellence" },
              { icon: <GraduationCap size={16} />, label: "Students Trained", value: "35,000+", sub: "Across all programs" },
              { icon: <Users size={16} />, label: "Open Positions", value: jobsLoading ? "…" : `${jobListings.length} Roles`, sub: "Full-time & Internships" },
            ].map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <div className={styles.statCardTop}>
                  <span className={styles.statLabel}>{stat.label}</span>
                  <span className={styles.statIcon}>{stat.icon}</span>
                </div>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statHeadline}>{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE / MANIFESTO ── */}
      <section className={styles.section} id="manifesto">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Our Principles</span>
              <h2 className={styles.sectionHeading}>How We Work &amp; Grow Together</h2>
            </div>
            <p className={styles.sectionSubtext}>
              We believe in building careers, not just filling positions. Here is
              what makes working at Ziion Technology genuinely different.
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            {[
              { num: "01", icon: <Rocket size={20} />, title: "Real Project Ownership", desc: "Work on live client projects from day one — not mock tasks or assignments. You own your work and see its impact directly." },
              { num: "02", icon: <BookOpen size={20} />, title: "Continuous Learning", desc: "Internal training, workshops, and certification support. We invest in your growth at every stage of your career." },
              { num: "03", icon: <Handshake size={20} />, title: "Direct Mentorship", desc: "Learn directly from experienced professionals. No layers of management — direct access to senior team members and founders." },
              { num: "04", icon: <TrendingUp size={20} />, title: "Transparent Growth", desc: "Clear career paths, regular performance reviews, and merit-based promotions. Your growth is structured and visible." },
            ].map((p) => (
              <div key={p.num} className={styles.pillarCard}>
                <div className={styles.pillarTop}>
                  <span className={styles.pillarNum}>{p.num}</span>
                  <span className={styles.pillarIcon}>{p.icon}</span>
                </div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS BENTO ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>What You Get</span>
              <h2 className={styles.sectionHeading}>Employee Benefits &amp; Work Culture</h2>
            </div>
            <p className={styles.sectionSubtext}>
              Designed to give you the best environment to learn, build, and grow.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Large card */}
            <div className={`${styles.bentoCard} ${styles.bentoCardLarge}`}>
              <div className={styles.bentoIconWrap}>
                <BookMarked size={22} />
              </div>
              <div>
                <h3 className={styles.bentoTitle}>Learning &amp; Development</h3>
                <p className={styles.bentoDesc}>
                  Internal training programs, certification support, and access to
                  learning resources. We actively invest in your technical and
                  professional growth.
                </p>
                <span className={styles.bentoBadge}>Ongoing Support</span>
              </div>
            </div>

            {/* Medium card */}
            <div className={`${styles.bentoCard} ${styles.bentoCardMed}`}>
              <div className={styles.bentoIconWrap}>
                <Umbrella size={22} />
              </div>
              <div>
                <h3 className={styles.bentoTitle}>Paid Time Off</h3>
                <p className={styles.bentoDesc}>
                  Paid leaves, public holidays, and festival holidays included.
                </p>
                <span className={styles.bentoBadge}>Paid Leaves Included</span>
              </div>
            </div>

            {/* Small cards */}
            {[
              { icon: <Star size={22} />, title: "Performance Recognition", description: "Regular appraisals and recognition for outstanding contributions." },
              { icon: <Layers size={22} />, title: "Collaborative Culture", description: "A supportive team environment where ideas are valued and collaboration is encouraged." },
              { icon: <Award size={22} />, title: "Skill Development", description: "Opportunities to upskill through workshops, projects, and cross-functional exposure." },
              { icon: <PartyPopper size={22} />, title: "Team Activities", description: "Team outings, celebrations, and activities that build a positive work culture." },
            ].map((b) => (
              <div key={b.title} className={styles.bentoCard}>
                <div className={styles.bentoIconWrap}>
                  {b.icon}
                </div>
                <div>
                  <h3 className={styles.bentoTitle}>{b.title}</h3>
                  <p className={styles.bentoDesc}>{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ── */}
      <section className={styles.section} id="positions">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Active Openings</span>
              <h2 className={styles.sectionHeading}>Current Open Positions</h2>
            </div>
            <div className={styles.positionsHeaderRight}>
              <span className={styles.positionsUpdated}>Updated: Today · All positions listed</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs}>
            <button
              className={`${styles.filterTab} ${activeFilter === "all" ? styles.filterTabActive : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All Roles ({jobListings.length})
            </button>
            {departments.map((dept) => (
              <button
                key={dept}
                className={`${styles.filterTab} ${activeFilter === dept ? styles.filterTabActive : ""}`}
                onClick={() => setActiveFilter(dept)}
              >
                {dept} ({jobListings.filter((j) => j.department === dept).length})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="Search by role, skill or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
              aria-label="Search jobs"
            />
            {searchQuery && (
              <button className={styles.searchClear} onClick={() => setSearchQuery("")}>
                <X size={14} />
              </button>
            )}
          </div>

          {/* Role Cards */}
          {jobsLoading ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyIcon}>⏳</p>
              <p>Loading open positions...</p>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className={styles.rolesList}>
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p className={styles.emptyIcon}>🔍</p>
              <h3>No positions found</h3>
              <p>Try adjusting your search or check back later for new openings.</p>
              <button onClick={() => { setSearchQuery(""); setActiveFilter("all"); }} className={styles.ctaPrimary}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── HIRING PROCESS ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Zero Ambiguity</span>
            <h2 className={styles.sectionHeading}>Our Transparent Hiring Process</h2>
            <p className={styles.sectionSubtextCenter}>
              We respect your time. Clear communication at every step, no surprises.
            </p>
          </div>

          <div className={styles.hiringGrid}>
            {hiringSteps.map((step, i) => (
              <div key={i} className={styles.hiringCard}>
                <div className={styles.hiringTopBar} />
                <div className={styles.hiringStepNum}>{step.step}</div>
                <h4 className={styles.hiringStepTitle}>{step.title}</h4>
                <p className={styles.hiringStepDesc}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMPLOYEE STORIES ── */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Team Voices</span>
              <h2 className={styles.sectionHeading}>What Our Team Says</h2>
            </div>
          </div>
          <div className={styles.storiesGrid}>
            {employeeStories.map((story) => (
              <div key={story.id} className={styles.storyCard}>
                <p className={styles.storyQuote}>"{story.quote}"</p>
                <div className={styles.storyAuthor}>
                  <div className={styles.storyAvatar}>{story.initials}</div>
                  <div>
                    <p className={styles.storyName}>{story.name}</p>
                    <p className={styles.storyRole}>{story.title} · {story.department}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionEyebrow}>Got Questions?</span>
            <h2 className={styles.sectionHeading}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.faqList}>
            {careersFAQ.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN APPLICATION BANNER ── */}
      <section className={styles.openAppBanner}>
        <div className={styles.openAppGlow} />
        <div className={styles.sectionInner}>
          <div className={styles.openAppGrid}>
            <div className={styles.openAppLeft}>
              <div className={styles.openAppEyebrow}>
                <span className={styles.openAppDot} />
              <span>Open Application Track</span>
              </div>
              <h2 className={styles.openAppHeading}>
                Don't See the Right Role?
              </h2>
              <p className={styles.openAppDesc}>
                Exceptional people rarely map perfectly onto job descriptions. If
                you are passionate about technology, design, or digital marketing
                — send us your work and we will reach out when the right
                opportunity arises.
              </p>
            </div>
            <div className={styles.openAppRight}>
              <a
                href="mailto:ziiontechnology@gmail.com?subject=Open Application — Ziion Technology"
                className={styles.openAppBtn}
              >
                Submit Open Application
                <ArrowRight size={16} />
              </a>
              <p className={styles.openAppEmail}>
                Direct: <a href="mailto:ziiontechnology@gmail.com">ziiontechnology@gmail.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
