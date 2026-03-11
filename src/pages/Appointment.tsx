import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Appointment.css';

export default function Appointment() {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleBookAppointment = () => {
    setModalMessage('Your Zoom appointment request has been sent. We will contact you with the meeting details. Please have your address ready.');
    setShowModal(true);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="appointment-page">
      <header className="site-header">
        <div className="brand">A1 HOME REMODELING INC.</div>
        <a className="nav-link" onClick={handleGoBack}>← BACK TO HOME</a>
      </header>

      <div className="direction-panel">
        <h2>THREE SIMPLE STEPS</h2>
        <div className="sub-direction">YOUR ONLINE QUOTE</div>
        <div className="direction-steps">
          <div className="direction-step"><strong>1.</strong> BOOK APPOINTMENT</div>
          <div className="direction-step"><strong>2.</strong> ZOOM MEETING</div>
          <div className="direction-step"><strong>3.</strong> RECEIVE QUOTE</div>
        </div>
        <div className="highlight-bar">▼ START HERE ▼</div>
      </div>

      <main className="quote-page">
        <div className="quote-header">
          <h1>Get your quote with social distancing</h1>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">STEP 1</div>
            <p>Schedule a Zoom appointment below<br /><span>Include your address in the message box</span></p>
          </div>
          <div className="step-card">
            <div className="step-number">STEP 2</div>
            <p>We call you on Zoom at the scheduled time</p>
          </div>
          <div className="step-card">
            <div className="step-number">STEP 3</div>
            <p>We discuss your project and provide a quote</p>
          </div>
        </div>

        <div className="option-card">
          <h2>Online Zoom Appointment</h2>
          <div className="description">Your quote and consultation</div>
          <button className="btn-big" onClick={handleBookAppointment}>BOOK NOW</button>
          <div className="address-note">Please include your address when booking</div>
        </div>

        <div className="back-home">
          <a className="back-link" onClick={handleGoBack}>← RETURN TO HOMEPAGE</a>
        </div>
      </main>

      <footer className="footer-note">
        A1 HOME REMODELING INC. — CSLB #1059945 — 21 YEARS — LICENSED & INSURED
      </footer>

      {showModal && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
