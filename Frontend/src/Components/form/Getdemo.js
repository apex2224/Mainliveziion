// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { FormFilled, resetForm } from '../../store/studentSlice';
// // import styles from './form.module.css';
// // import emailjs from '@emailjs/browser';
// // function Form() {
// //   const formData = useSelector(state => state.student);
// //   const dispatch = useDispatch();

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     dispatch(FormFilled({ field: name, value }));
// //   };

// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault();

// //   //   try {
// //   //     const response = await fetch('https://ziion-form-entries-default-rtdb.firebaseio.com/form-entries.json', {
// //   //       method: 'POST',
// //   //       headers: {
// //   //         'Content-Type': 'application/json'
// //   //       },
// //   //       body: JSON.stringify(formData)
// //   //     });

// //   //     if (response.ok) {
// //   //       alert('Form submitted successfully');
// //   //       dispatch(resetForm());
// //   //     } else {
// //   //       alert('Failed to submit form');
// //   //     }
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //     alert('Error submitting form');
// //   //   }
// //   // };

// // const handleSubmit = async (e) => {
// //   e.preventDefault();

// //   try {
// //     await emailjs.send('service_4zv8d5l', 'template_7lt1pb6', {
// //       name: formData.name,
// //       email: formData.email,
// //       phone: formData.phone,
// //       course: formData.course
// //     }, 'j6fsWCbZRRU2n1J4A');

// //     alert('Form submitted and email sent!');
// //     dispatch(resetForm());
// //   } catch (error) {
// //     console.error('EmailJS Error:', error);
// //     alert('Failed to send email.');
// //   }
// // };

// //   return (
// //     <div className={styles.staticWrapper}>
// //       <div className={styles.leftBanner}>
// //         <img src="/logo192.png" alt="Tutort Academy" className={styles.logo} />
// //         <h3>ZIION TECHNOLOGY</h3>
// //       </div>

// //       <div className={styles.formContainer}>
// //         <h2>Apply Free Counselling</h2>
// //         <form onSubmit={handleSubmit} className={styles.form}>
// //           <input type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} required />
// //           <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
// //           <input type="tel" name="phone" placeholder="Phone Number*" value={formData.phone} onChange={handleChange} required />
// //           <select name="course" value={formData.course} onChange={handleChange} required>
// //             <option value="">Select Course*</option>
// //             <option value="Full Stack Development">Full Stack Development</option>
// //             <option value="Data Science">Data Science</option>
// //             <option value="Web Designing">Web Designing</option>
// //             <option value="Digital Marketing">Digital Marketing</option>
// //           </select>
// //           <button type="submit">Submit</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Form;

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FormFilled, resetForm } from '../../store/studentSlice';
// import styles from './form.module.css';
// import emailjs from '@emailjs/browser';
// import images from '../../assets/images';

// function Form({ closeForm }) {
//   const formData = useSelector(state => state.student);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(FormFilled({ field: name, value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await emailjs.send('service_4zv8d5l', 'template_7lt1pb6', {
//         name: formData.name,
//         email: formData.email,
//         phone: formData.phone,
//         course: formData.course
//       }, 'j6fsWCbZRRU2n1J4A');

//       alert('Form submitted and email sent!');
//       dispatch(resetForm());
//       closeForm();
//     } catch (error) {
//       console.error('EmailJS Error:', error);
//       alert('Failed to send email.');
//     }
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <button className={styles.closeBtn} onClick={closeForm}>&times;</button>

//         <div className={styles.leftBanner}>
//           <img src={images.ziionLogo} alt="Ziion Technology" className={styles.logo} />
//           <h3>Turning ideas into powerful IT solutions</h3>
//         </div>

//         <div className={styles.formContainer}>
//           <h2>Apply Free Counselling</h2>
//           <form onSubmit={handleSubmit} className={styles.form}>
//             <input type="text" name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} required />
//             <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} required />
//             <input type="tel" name="phone" placeholder="Phone Number*" value={formData.phone} onChange={handleChange} required />
//             <select name="course" value={formData.course} onChange={handleChange} required>
//               <option value="">Select Course*</option>
//               <option value="Full Stack Development">Full Stack Development</option>
//               <option value="Data Science">Data Science</option>
//               <option value="Web Designing">Web Designing</option>
//               <option value="Digital Marketing">Digital Marketing</option>
//             </select>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Form;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormFilled, resetForm } from "../../store/studentSlice";
import styles from "./form.module.css";
import emailjs from "@emailjs/browser";
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

function Form({ closeForm }) {
  const formData = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(FormFilled({ field: name, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_4zv8d5l",
        "template_7lt1pb6",
        {
          name: formData.name,
          email: formData.email,
          college: formData.college,
          phone: formData.phone,
          course: formData.course,
          preference: formData.category,
        },
        "j6fsWCbZRRU2n1J4A",
      );

      dispatch(resetForm());
      closeForm();
      navigate("/thank-you");
    } catch (error) {
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={closeForm}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeForm}>
          &times;
        </button>

        {/* LEFT BANNER */}
        <div className={styles.leftBanner}>
          <img
            src={images.ziionTechLogo}
            alt="Ziion Technology"
            className={styles.logo}
          />
          <h3>Delivering innovative IT strategies for real-world impact.</h3>
          <p>You can also find us here:</p>
          <div className={styles.socials}>
            <a
              href="https://www.instagram.com/ziion_technology/?next=%2F&hl=en"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className={styles.formIcon} />
            </a>
            <a
              href="https://www.linkedin.com/company/verma-programming-minds/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className={styles.formIcon} />
            </a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className={styles.formContainer}>
          <h2>
            Get a <span className={styles.gradientText}>Demo</span>
          </h2>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* --- Name Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label htmlFor="name" className={styles.floatingLabel}>
                Full Name*
              </label>
            </div>

            {/* --- Email Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label htmlFor="email" className={styles.floatingLabel}>
                Email*
              </label>
            </div>

            {/* --- College Name Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="college"
                id="college"
                placeholder=" "
                value={formData.college}
                onChange={handleChange}
                required
              />
              <label htmlFor="college" className={styles.floatingLabel}>
                College Name
              </label>
            </div>

            {/* --- Phone Input --- */}
            <div className={styles.inputGroup}>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder=" "
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <label htmlFor="phone" className={styles.floatingLabel}>
                Phone Number*
              </label>
            </div>

            {/* --- Course Select --- */}
            <div className={styles.inputGroup}>
              <select
                name="course"
                id="course"
                value={formData.course}
                onChange={handleChange}
                required
                className={!formData.course ? styles.invalidSelect : ""}
              >
                <option value="" disabled>
                  Select Course*
                </option>
                <option value="Full Stack Development">
                  Full Stack Development
                </option>
                <option value="Web Designing">Web Designing</option>
                <option value="Graphic Designing">Graphic Designing</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="DevOps">DevOps</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Python">Python</option>
              </select>
              <label htmlFor="course" className={styles.floatingLabel}>
                Select Course*
              </label>
            </div>

            {/* Radio Options */}
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="Working Professional"
                  checked={formData.category === "Working Professional"}
                  onChange={handleChange}
                  required
                />{" "}
                Working Professional
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="College Student - Pursuing"
                  checked={formData.category === "College Student - Pursuing"}
                  onChange={handleChange}
                />{" "}
                College Student - Pursuing
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="College Student - Final Year"
                  checked={formData.category === "College Student - Final Year"}
                  onChange={handleChange}
                />{" "}
                College Student - Final Year
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="Others"
                  checked={formData.category === "Others"}
                  onChange={handleChange}
                />{" "}
                Others
              </label>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FormFilled, resetForm } from '../../store/studentSlice';
// import styles from './form.module.css';
// import emailjs from '@emailjs/browser';
// import images from '../../assets/images';
// import { useNavigate } from 'react-router-dom';  // ✅ router hook

// function Form({ closeForm }) {
//   const formData = useSelector(state => state.student);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(FormFilled({ field: name, value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // ✅ 1. Send mail to Company/Admin
//       await emailjs.send(
//         'service_4zv8d5l',
//         'template_admin',  // 👉 Admin ke liye template ID
//         {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           course: formData.course,
//         },
//         'j6fsWCbZRRU2n1J4A'
//       );

//       // ✅ 2. Send confirmation mail to Student
//       await emailjs.send(
//         'service_4zv8d5l',
//         'template_student', // 👉 Student ke liye template ID
//         {
//           name: formData.name,
//           course: formData.course,
//           to_email: formData.email, // Student ka email dynamic
//         },
//         'j6fsWCbZRRU2n1J4A'
//       );

//       // ✅ Reset, Close & Redirect
//       dispatch(resetForm());
//       closeForm();
//       navigate('/thank-you');
//     } catch (error) {
//       console.error('EmailJS Error:', error);
//       alert('Failed to send email.');
//     }
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <button className={styles.closeBtn} onClick={closeForm}>
//           &times;
//         </button>

//         <div className={styles.leftBanner}>
//           <img
//             src={images.ziionLogo}
//             alt="Ziion Technology"
//             className={styles.logo}
//           />
//           <h3>Turning ideas into powerful IT solutions</h3>
//         </div>

//         <div className={styles.formContainer}>
//           <h2>Apply Free Counselling</h2>
//           <form onSubmit={handleSubmit} className={styles.form}>
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name*"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email*"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number*"
//               value={formData.phone}
//               onChange={handleChange}
//               required
//             />
//             <select
//               name="course"
//               value={formData.course}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Course*</option>
//               <option value="Full Stack Development">
//                 Full Stack Development
//               </option>
//               <option value="Data Science">Data Science</option>
//               <option value="Web Designing">Web Designing</option>
//               <option value="Digital Marketing">Digital Marketing</option>
//             </select>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Form;
