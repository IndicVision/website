function Project (project) {
    return (
        <div className="project">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <img src={project.media} alt={project.title} />
        </div>
    );
}

export default Project;