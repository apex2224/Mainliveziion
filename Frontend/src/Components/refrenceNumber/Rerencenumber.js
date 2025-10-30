import React, { useState } from "react";
import './refrencenumber.css';

const FIREBASE_URL = "https://studentdata-18fe7-default-rtdb.firebaseio.com/";

const Refrencenumber = ({ onClose }) => {
  const [refNumber, setRefNumber] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [message, setMessage] = useState("");

  // Search student by reference number (fetch all, then filter in React)
  const searchStudent = async () => {
    if (!refNumber) {
      setMessage("⚠ Please enter a reference number");
      return;
    }

    try {
      const response = await fetch(`${FIREBASE_URL}/studentData.json`);
      const data = await response.json();

      if (data) {
        // Convert object into array of [id, student]
        const entries = Object.entries(data);

        // Find first student matching referenceNumber
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
          setMessage("✅ Student found!");
        } else {
          setStudentData(null);
          setMessage("❌ No student found with this reference number");
        }
      } else {
        setStudentData(null);
        setMessage("❌ No student data found in database");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠ Error fetching data");
    }
  };

  // Close modal and reset form
  const handleClose = () => {
    setRefNumber("");
    setStudentData(null);
    setMessage("");
    onClose();
  };

  // Close modal if clicking on overlay
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modalOverlay') || e.target.classList.contains('modalBox')) {
      // Only close if clicking on the overlay background, not inside the modal box
      if (e.target.classList.contains('modalOverlay')) {
        handleClose();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  // Add event listener for escape key when component mounts
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore body scroll when modal closes
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="modalOverlay" onClick={handleOverlayClick}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={handleClose}>✖</button>

        <h2 className="modalHeading">🔎Search Student by Reference Number</h2>

        <div className="modalInner">
          <div className="searchContainer">
            <input
              type="text"
              placeholder="Enter Reference Number"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              className="searchInput"
              autoFocus
            />
            <button className="searchBtn" onClick={searchStudent}>Search</button>
          </div>
        </div>

        {message && <p className="messageText">{message}</p>}

        {studentData && (
          <div className="studentCard">
            <h3 className="studentHeading">Student Details</h3>
            <div className="tableWrapper">
              <table className="studentTable">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Reference Number</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{studentData.id}</td>
                    <td>{studentData.name}</td>
                    <td>{studentData.course}</td>
                    <td>{studentData.referenceNumber}</td>
                    <td>{studentData.startDate}</td>
                    <td>{studentData.endDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Refrencenumber;
