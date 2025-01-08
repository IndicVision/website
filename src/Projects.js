import React from 'react';
import projectsData from './projects.json'; // Import the JSON file
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Project({ title, description, media }) {
  return (
    <div className="project">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="media-container">
        {media.map((item, index) => (
          item.endsWith('.mp4') ? (
            <video key={index} controls width="300">
              <source src={item} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <a key={index} href={item} target="_blank" rel="noopener noreferrer">
              View Document
            </a>
          )
        ))}
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="projects">
        <Carousel 
            useKeyboardArrows="true"
            infiniteLoop="true"
        >
            {projectsData.map((project, index) => (
                <Project
                key={index}
                title={project.title}
                description={project.description}
                media={project.media}
                />
            ))}
        </Carousel>
    </div>
  );
}

export default Projects;
