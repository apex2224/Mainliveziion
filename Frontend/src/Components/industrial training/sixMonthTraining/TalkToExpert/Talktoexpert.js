import React, { useState } from "react";
import Form from "../../../form/Form";
import styles from "./Talktoexpert.module.css";

const TalkToExpert = () => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        We Create <span className={styles.highlight}>AI-Focused Products</span>{" "}
        That Enhance Productivity & Profitability.
      </h2>
      <button className={styles.expertButton} onClick={openForm}>
        Talk to Expert
      </button>
      {showForm && <Form closeForm={closeForm} />}
    </section>
  );
};

export default TalkToExpert;
