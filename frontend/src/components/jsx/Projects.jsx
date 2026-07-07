import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Projects.css';

function Projects() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects'); 
        if (!res.ok) throw new Error('Failed to fetch projects');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="projects-loading">Loading projects...</div>;
  if (error) return <div className="projects-error">Error: {error}</div>;
  if (!data || !data.projects) return <div className="projects-error">No projects found</div>;

  const visibleProjects = showAll ? data.projects : data.projects.slice(0, 3);

  return (
    <section className="projects section-border">
      <div className="projects-container">
        <h2 className="projects-title">{data.title}</h2>
        <p className="projects-subtitle">{data.subtitle}</p>

        <div className='show-more'>
          <button onClick={()=> setShowAll(prev => !prev)}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
        <div className="projects-grid">
          {visibleProjects.map((project) => {
            // ✅ DEBUG: Log each project's ID and image path
            console.log("Rendering project:", project.id, project.image);

            return (
              <div key={project.id} className="project-card">
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                    onError={(e) => {
                      console.error("Image failed to load:", project.image);
                      e.target.src = '/images/placeholder-project.jpg';
                      e.target.onerror = null;
                    }}
                  />
                  {project.featured && (
                    <span className="project-featured-badge">Featured</span>
                  )}
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-client">{project.client}</p>
                  <p className="project-description">{project.shortDescription}</p>
                  <div className="project-technologies">
                    {project.technologies.slice(0, 5).map((tech, idx) => (
                      <span key={idx} className="project-tech-tag">{tech}</span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="project-tech-tag more">+{project.technologies.length - 4}</span>
                    )}
                  </div>
                  <Link to={`/projects/${project.slug}`} className="project-link">
                    View Case Study →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;