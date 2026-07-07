import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from './SEO';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import '../css/ProjectDetail.css';

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch project data');
        
        // The API returns the project directly
        const data = await res.json();
        setProject(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="project-detail-loading">
        <div className="loader-spinner"></div>
        <p>Loading project details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-detail-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <Link to="/projects" className="project-detail-back-btn">
          Back to Projects
        </Link>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-error">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects" className="project-detail-back-btn">
          Back to Projects
        </Link>
      </div>
    );
  }

  const caseStudy = project.caseStudy;

  return (
    <section className="project-detail">
      <SEO
        title={project.title}
        description={project.shortDescription}
        keywords={`${project.title}, ${project.client}, software project Kenya`}
        canonicalPath={`/projects/${project.slug}`}
        type="article"
      />
      <div className="project-detail-container">
        {/* Back Button */}
        <Link to="/projects" className="project-detail-back">
          <FaArrowLeft /> Back to Projects
        </Link>

        {/* Project Header */}
        <div className="project-detail-header">
          <div className="project-detail-header-content">
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-client">Client: {project.client}</p>
            <p className="project-detail-description">{project.shortDescription}</p>
            <div className="project-detail-meta">
              <div className="project-detail-tech">
                <span className="project-detail-label">Technologies:</span>
                <div className="project-detail-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="project-detail-tag">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="project-detail-completed">
                <span className="project-detail-label">Completed:</span>
                <span>{project.completed}</span>
              </div>
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-detail-live-btn">
                  View Live Site <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
          </div>
          <div className="project-detail-header-image">
            <img src={project.image} alt={project.title} />
          </div>
        </div>

        {/* Case Study */}
        {caseStudy && (
          <div className="project-case-study">
            <h2 className="project-case-study-title">Case Study</h2>

            {/* Challenge */}
            <div className="case-study-section">
              <h3>The Challenge</h3>
              <p>{caseStudy.challenge}</p>
            </div>

            {/* Solution */}
            <div className="case-study-section">
              <h3>Our Solution</h3>
              <p>{caseStudy.solution}</p>
            </div>

            {/* Results */}
            <div className="case-study-section">
              <h3>Results</h3>
              <p>{caseStudy.results}</p>
            </div>

            {/* Metrics */}
            {caseStudy.metrics && (
              <div className="case-study-metrics">
                {Object.entries(caseStudy.metrics).map(([key, value]) => (
                  <div key={key} className="metric-item">
                    <span className="metric-value">{value}</span>
                    <span className="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Screenshots */}
            {caseStudy.screenshots && caseStudy.screenshots.length > 0 && (
              <div className="case-study-screenshots">
                <h3>Screenshots</h3>
                <div className="screenshots-grid">
                  {caseStudy.screenshots.map((img, idx) => (
                    <img key={idx} src={img} alt={`Screenshot ${idx + 1}`} />
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial && (
              <div className="case-study-testimonial">
                <p className="testimonial-quote">"{caseStudy.testimonial}"</p>
                {caseStudy.clientTestimonial && (
                  <div className="testimonial-author">
                    <strong>{caseStudy.clientTestimonial.name}</strong>
                    <span>{caseStudy.clientTestimonial.role}</span>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            <Link to="/contact" className="project-detail-cta">
              Start a Project Like This
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectDetail;