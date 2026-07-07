import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from './SEO';
import '../css/BlogDetail.css';

function BlogDetail() {
  const { slug } = useParams();
  const [data, setData] = useState(null);      // ✅ ADDED: Full response
  const [blog, setBlog] = useState(null);      // ✅ Keep for single blog
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);    // ✅ ADDED: Error state

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const json = await res.json();
        setData(json);
        
        // ✅ Find the specific blog by slug
        const foundBlog = json.blogs.find(b => b.slug === slug);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog(); // ✅ Changed from fetchProjects()
  }, [slug]);

  // ─── CONDITIONAL RENDERING ────────────────────────────
  if (loading) {
    return (
      <div className="blog-detail-loading">
        <div className="loader-spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <Link to="/blog" className="blog-detail-back-btn">
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-error">
        <h2>Blog Not Found</h2>
        <p>The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="blog-detail-back-btn">
          Back to Blog
        </Link>
      </div>
    );
  }

  // ─── MAIN RENDER ────────────────────────────────────────
  return (
    <div className="blog-detail">
      <SEO
        title={blog.title}
        description={blog.excerpt || blog.shortDesc}
        keywords={blog.tags?.join(', ')}
        image={blog.featuredImage}
        canonicalPath={`/blog/${blog.slug}`}
        type="article"
      />
      <div className="blog-detail-container">
        
        {/* Back Button */}
        <Link to="/blog" className="blog-detail-back">
          ← Back to Blog
        </Link>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="blog-detail-image-wrapper">
            <img 
              src={blog.featuredImage} 
              alt={blog.title} 
              className="blog-detail-image"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="blog-detail-title">{blog.title}</h1>

        {/* Meta */}
        <div className="blog-detail-meta">
          <span className="blog-detail-category">{blog.category || 'General'}</span>
          <span className="blog-detail-date">
            {blog.date ? new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'No date'}
          </span>
          <span className="blog-detail-read-time">{blog.readTime || '3 min read'}</span>
          <span className="blog-detail-author">By {blog.author || 'JAMSI Technologies'}</span>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="blog-detail-tags">
            {blog.tags.map((tag, i) => (
              <span key={i} className="blog-detail-tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="blog-detail-content">
          {blog.content?.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* CTA */}
        <div className="blog-detail-cta">
          <h3>Ready to build something amazing?</h3>
          <p>Let's talk about your project.</p>
          <Link to="/contact" className="blog-detail-cta-btn">
            Start a Project
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;