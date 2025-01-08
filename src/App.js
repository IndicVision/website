import React, { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.png';
import Projects from './Projects';

function App() {
  const sections = ['about', 'portfolio', 'contact'];
  const [selectedSection, setSelectedSection] = useState('about');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentSectionIndex = sections.indexOf(entry.target.id);
          window.currentSectionIndex = currentSectionIndex; // Store current section index globally
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (index) => {
    if (index >= 0 && index < sections.length) {
      const sectionId = sections[index];
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      setSelectedSection(sectionId);
    }
  };

  const handleScroll = (e) => {
    if (window.currentSectionIndex == null) return;

    if (e.deltaY > 0) {
      // Scrolling down
      const nextIndex = Math.min(window.currentSectionIndex + 1, sections.length - 1);
      scrollToSection(nextIndex);
    } else if (e.deltaY < 0) {
      // Scrolling up
      const prevIndex = Math.max(window.currentSectionIndex - 1, 0);
      scrollToSection(prevIndex);
    }
  };

  const handleKeydown = (e) => {
    if (window.currentSectionIndex == null) return;

    if (e.key === 'ArrowDown') {
      // Scroll down with the down arrow key
      const nextIndex = Math.min(window.currentSectionIndex + 1, sections.length - 1);
      scrollToSection(nextIndex);
    } else if (e.key === 'ArrowUp') {
      // Scroll up with the up arrow key
      const prevIndex = Math.max(window.currentSectionIndex - 1, 0);
      scrollToSection(prevIndex);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header-company">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Indicvision</h1>
        </div>
        <nav className="App-nav">
          <ul>
            <li
              onClick={() => {
                scrollToSection(0);
              }}
              className={selectedSection === 'about' ? 'selected' : ''}
            >
              About Us
            </li>
            <li
              onClick={() => {
                scrollToSection(1);
              }}
              className={selectedSection === 'portfolio' ? 'selected' : ''}
            >
              Portfolio
            </li>
            <li
              onClick={() => {
                scrollToSection(2);
              }}
              className={selectedSection === 'contact' ? 'selected' : ''}
            >
              Contact Us
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="about" className="App-section">
          <h2>About Us</h2>
          <p>
            Welcome to our company! We are passionate about delivering excellent
            services to our clients. Learn more about our journey and mission.
          </p>
        </section>

        <section id="portfolio" className="App-section">
          <h2>Portfolio</h2>
          <p>
            Take a look at some of our amazing projects. We are proud of what we
            have accomplished so far and look forward to new challenges.
          </p>
          <Projects />
        </section>

        <section id="contact" className="App-section">
          <h2>Contact Us</h2>
          <p>
            Have any questions or want to work with us? Reach out through our
            contact page, and we will be happy to assist you.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
