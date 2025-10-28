import React, { useState, useEffect } from "react"; // <-- Import useState, useEffect
import styles from "./Modal.module.css";

// <-- ADDED A CLOSE ICON COMPONENT -->
// This SVG creates the 'X' icon
const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 1L1 13"
      stroke="#101828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 1L13 13"
      stroke="#101828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Modal = ({ isOpen, onClose, children }) => {
  // State to handle the closing animation
  const [isClosing, setIsClosing] = useState(false);

  // This is the function that will be called by click events
  const handleClose = () => {
    setIsClosing(true); // Trigger closing animation
    
    // Wait for animation to finish, then call parent's onClose
    setTimeout(() => {
      onClose(); // This sets parent's isOpen to false
      setIsClosing(false); // Reset for next time
    }, 300); // Must match animation duration (0.3s)
  };

  // This stops the modal from closing if you click *inside* the content
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if modal is open and not already closing
      if (isOpen && !isClosing && e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // We add handleClose to dependencies, wrapped in useCallback if it were complex
    // but for this, it's fine.
  }, [isOpen, isClosing, onClose]);

  if (!isOpen) {
    return null; // Don't render anything if not open
  }

  return (
    // The backdrop
    // <-- UPDATED to use handleClose and check isClosing -->
    <div
      className={`${styles.modalBackdrop} ${
        isClosing ? styles.backdropClosing : ""
      }`}
      onClick={handleClose}
    >
      {/* The modal content window */}
      {/* <-- UPDATED to check isClosing --> */}
      <div
        className={`${styles.modalContent} ${
          isClosing ? styles.contentClosing : ""
        }`}
        onClick={handleContentClick}
      >
        {/* Close Button */}
        {/* <-- UPDATED to use handleClose and new Icon --> */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;