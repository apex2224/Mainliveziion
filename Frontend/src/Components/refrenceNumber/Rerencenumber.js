import React, { useState, useEffect } from "react";
import styles from './refrencenumber.module.css';

const FIREBASE_URL = "https://studentdata-18fe7-default-rtdb.firebaseio.com/";

const Referencenumber = ({ onClose }) => {
  const [refNumber, setRefNumber] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation on next tick
    const timer = setTimeout(() => setIsVisible(true), 0);

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, []);

  const searchStudent = async () => {
    if (!refNumber.trim()) {
      setMessage("Please enter a reference number");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");
    setStudentData(null);

    try {
      const response = await fetch(`${FIREBASE_URL}/studentData.json`);
      const data = await response.json();

      if (data) {
        const entries = Object.entries(data);
        const found = entries.find(([id, student]) => student.referenceNumber === refNumber);

        if (found) {
          const [id, student] = found;
          setStudentData({
            id,
            referenceNumber: student.referenceNumber,
            name: student.name,
            course: student.course,
            startDate: student.startDate,
            endDate: student.endDate,
          });
          setMessage("Student found successfully!");
          setMessageType("success");
        } else {
          setStudentData(null);
          setMessage("No student found with this reference number");
          setMessageType("error");
        }
      } else {
        setStudentData(null);
        setMessage("No student data found in database");
        setMessageType("error");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error fetching data. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // 1. Start the close animation
  const handleClose = () => {
    setIsVisible(false);
  };

  // 2. When the animation is done, clean up and unmount
  const handleTransitionEnd = (e) => {
    // Only fire on the overlay's opacity transition
    if (e.propertyName === 'opacity' && !isVisible) {
      setRefNumber("");
      setStudentData(null);
      setMessage("");
      setMessageType("");
      onClose(); // Tell parent to unmount
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      searchStudent();
    }
  };

  return (
    <div 
      className={`${styles.modalOverlay} ${isVisible ? styles.visible : ''}`} 
      onClick={handleOverlayClick}
      onTransitionEnd={handleTransitionEnd} // <-- ADD THIS
    >
      <div 
        className={`${styles.modalBox} ${isVisible ? styles.visible : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            {/* SIMPLIFIED: Removed iconWrapper */}
            <div>
              <h2 className={styles.title}>Search Student</h2>
              <p className={styles.subtitle}>Find student records by reference number</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className={styles.closeBtn}
            aria-label="Close"
          >
            <svg className={styles.closeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Search Section */}
          <div className={styles.searchSection}>
            <label className={styles.label}>
              Reference Number
              <span className={styles.required}>*</span>
            </label>
            <div className={styles.searchContainer}>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter reference number..."
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={styles.input}
                  autoFocus
                  disabled={loading}
                />
              </div>
              <button
                onClick={searchStudent}
                disabled={loading}
                className={`${styles.searchBtn} ${loading ? styles.loading : ''}`}
              >
                {loading ? (
                  <>
                    <div className={styles.spinnerWrapper}>
                      <div className={styles.spinner}></div>
                    </div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <svg className={styles.btnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
            <p className={styles.hint}>Enter the unique reference number provided to the student</p>
          </div>

          {/* Message */}
          {message && (
            <div className={`${styles.message} ${styles[messageType]} ${styles.messageVisible}`}>
              <div className={styles.messageIconWrapper}>
                <svg className={styles.messageIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {messageType === "error" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
              <div className={styles.messageContent}>
                <p className={styles.messageTitle}>
                  {messageType === "error" ? "Error" : "Success"}
                </p>
                <p className={styles.messageText}>{message}</p>
              </div>
            </div>
          )}

          {/* Student Details */}
          {studentData && (
            <div className={styles.studentDetails}>
              <div className={styles.detailsHeader}>
                <div className={styles.detailsHeaderContent}>
                  {/* SIMPLIFIED: Removed detailsIconWrapper */}
                  <div>
                    <h3 className={styles.detailsTitle}>Student Information</h3>
                    <p className={styles.detailsSubtitle}>Complete profile details</p>
                  </div>
                </div>
                <div className={styles.statusBadge}>
                  <span className={styles.statusDot}></span>
                  Verified
                </div>
              </div>
              
              <div className={styles.detailsGrid}>
                {/* SIMPLIFIED: All cardIcons are removed from cards below */}
                <div className={styles.detailCard}>
                  <div className={styles.cardContent}>
                    <p className={styles.detailLabel}>Student ID</p>
                    <p className={styles.detailValue}>{studentData.id}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.cardContent}>
                    <p className={styles.detailLabel}>Reference Number</p>
                    <p className={styles.detailValue}>{studentData.referenceNumber}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.cardContent}>
                    <p className={styles.detailLabel}>Full Name</p>
                    <p className={styles.detailValue}>{studentData.name}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.cardContent}>
                    <p className={styles.detailLabel}>Course</p>
                    <p className={styles.detailValue}>{studentData.course}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.cardContent}>
                    <p className={styles.detailLabel}>Start Date</p>
                    <p className={styles.detailValue}>{studentData.startDate}</p>
                  </div>
                </div>

                <div className={styles.detailCard}>
                  <div className={styles.cardContent}>
                    <p className={styles.detailLabel}>End Date</p>
                    <p className={styles.detailValue}>{studentData.endDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referencenumber;