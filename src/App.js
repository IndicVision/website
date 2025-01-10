import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';
import projects from './projects.json';

function App() {
  const sections = ['about', 'portfolio', 'contact'];
  const [selectedSection, setSelectedSection] = useState('about');

  const scrollToSection = (section) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      setSelectedSection(section);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <div className="App-header-company">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Indicvision</h1>
        </div>
        <div className="App-header-sections">
          {sections.map((section, index) => {
            return (
              <div
                key={index}
                className={selectedSection === section ? 'App-header-section selected' : 'App-header-section'}
                onClick={() => scrollToSection(section)}
              >
                {section.toUpperCase()}
              </div>
            );
          })}
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
            {projects.map((project, index) => {
              return (
                <div key={index} className="App-project">
                  <img src={project.icon} alt="project" />
                  <h3>{project.title}</h3>
                </div>
              );
            })}
          </div>
      </div>
      <div id="contact" className="App-contact App-section">
        <h2>Contact Us</h2>
        <p>Reach out to us for more information!</p>
      </div>
    </div>
  </div>
  );
}

export default App;
