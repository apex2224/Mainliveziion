import React from "react";
import { Link } from "react-router-dom";
import styles from "./FurtherNav.module.css";

const FurtherNav = () => {
  return (
    <div className={styles.furtherMenu}>
      <ul className={styles.middleMenuList}>
        <li className={styles.menuItem}>
          <Link to="/allcourses" className={styles.furtherMenuLink}>
            <i className="fas fa-book-open"></i>
            <span>All Courses</span>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/industrial-training" className={styles.furtherMenuLink}>
            <i className="fas fa-industry"></i>
            <span>Industrial Training</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FurtherNav;
