import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Check } from "lucide-react";
import styles from "./thankyou.module.css";

export default function ThankYou() {
  const location = useLocation();
  const { name = "" } = location.state || {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Icon */}
        <div className={styles.iconWrapper}>
          <Check className={styles.icon} strokeWidth={2} />
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>Thank You{name ? `, ${name}` : ""}</h1>

        {/* Subtitle / Content */}
        <div className={styles.subtitleWrapper}>
          <p>Your inquiry has been successfully submitted;</p>
          <p>our team will contact you shortly.</p>

          <ul className={styles.listWrapper}>
            <li className={styles.listItem}>
              <span className={styles.checkIcon}>✔</span>
              <span>A confirmation email has been sent to your inbox.</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.checkIcon}>✔</span>
              <span>We’ll get back to you within 24–48 hours.</span>
            </li>
            <li className={styles.listItem}>
              <span className={styles.checkIcon}>✔</span>
              <span>Need to update something? Just reply to the email.</span>
            </li>
          </ul>
        </div>

        {/* Button */}
        <Link to="/" className={styles.homeButton}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}
