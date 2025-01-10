import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import projects from './projects.json';

function App() {
  const sections = ['about', 'portfolio', 'contact'];
  const [selectedSection, setSelectedSection] = useState('about');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const scrollToSection = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setSelectedSection(section);
    }
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsAnimating(true); // Start animation
    setTimeout(() => setIsModalOpen(true), 10); // Open modal after animation starts
  };

  const closeProjectModal = () => {
    setIsAnimating(false); // Start exit animation
    setTimeout(() => {
      setSelectedProject(null);
      setIsModalOpen(false); // Fully close modal after animation
    }, 300); // Match the duration of the CSS animation
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="App-header-company">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Indicvision</h1>
        </div>
        <div className="App-header-sections">
          {sections.map((section, index) => (
            <div
              key={index}
              className={selectedSection === section ? 'App-header-section selected' : 'App-header-section'}
              onClick={() => scrollToSection(section)}
            >
              {section.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      <div className="App-main">
        <div id="about" className="App-about App-section">
          <div className="App-about-image" />
          <div className="App-about-text">
            <h2>About Us</h2>
            <p>
              Indicvision is a leading company specializing in cutting-edge technology for
              visual storytelling. We believe that every moment matters, and we are
              dedicated to creating experiences that inspire and captivate.
            </p>
          </div>
        </div>
        <div id="portfolio" className="App-projects-section App-section">
          <h2>Our Projects</h2>
          <div className="App-projects">
            {projects.map((project, index) => (
              <div
                key={index}
                className="App-project"
                onClick={() => openProjectModal(project)}
              >
                <img src={project.icon} alt="project" />
                <h3>{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div id="contact" className="App-contact">
          <h2>Contact Us</h2>
          <p>Reach out to us for more information!</p>
        </div>
      </div>

      {selectedProject && (
        <div
          className={`modal-overlay ${isModalOpen ? 'modal-enter-active' : ''} ${
            !isAnimating && isModalOpen ? 'modal-exit-active' : ''
          }`}
          onClick={closeProjectModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>
              ×
            </button>
            <h3>{selectedProject.title}</h3>
            <p>{selectedProject.description}</p>
            {selectedProject.media && <img src={selectedProject.icon} alt={selectedProject.title} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
