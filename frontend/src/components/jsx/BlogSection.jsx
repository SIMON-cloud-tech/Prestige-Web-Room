import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import "../css/BlogSection.css";

function BlogSection() {
  // ─── STATE ──────────────────────────────────────────────
  const [data, setData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisible] = useState(3);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ─── FETCH BLOGS ────────────────────────────────────────
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const json = await res.json();
        setData(json);
        setBlogs(json.blogs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // ✅ MOVE useMemo HERE (BEFORE conditional returns)
  const filteredBlogs = useMemo(() => {
    // If no blogs, return empty array (prevents errors)
    if (!blogs || blogs.length === 0) return [];

    const q = search.toLowerCase().trim();
    if (!q) return blogs;

    return blogs.filter((blog) => {
      const title = blog?.title?.toLowerCase() || "";
      const date = blog?.date?.toLowerCase() || "";
      const category = blog?.category?.toLowerCase() || "";
      return title.includes(q) || date.includes(q) || category.includes(q);
    });
  }, [blogs, search]);

  const visibleBlogs = filteredBlogs.slice(0, visible);
  const hasMore = visible < filteredBlogs.length;

  // ─── CONDITIONAL RENDERING (NOW AFTER ALL HOOKS) ──────
  if (loading) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-loading">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-error">Error: {error}</div>
        </div>
      </section>
    );
  }

  if (!data || !data.blogs || data.blogs.length === 0) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-error">No blog posts found</div>
        </div>
      </section>
    );
  }

  // ─── MAIN RENDER ────────────────────────────────────────
  return (
    <section className="blog-section">
      <div className="blog-container">
        {/* HEADER */}
        <h2 className="blog-title">{data.title || 'Latest Blog Updates'}</h2>
        <p className="blog-subtitle">
          {data.subtitle || 'Thoughts on fintech, software engineering, and building for Africa.'}
        </p>

        {/* SEARCH */}
        <div className="blog-search-wrapper">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisible(3);
            }}
            className="blog-search-input"
            placeholder="Search blogs by title, category, or date..."
          />
        </div>

        {/* LOAD MORE */}
        {hasMore && (
          <div className="blog-load-wrapper">
            <button onClick={() => setVisible(v => v + 3)} className="blog-load-more-btn">
              Load More ({filteredBlogs.length - visible} remaining)
            </button>
          </div>
        )}

        {/* GRID */}
        <div className="blog-grid">
          {visibleBlogs.map((blog, i) => (
            <div key={blog?.id || i} className="blog-card">
              <div className="blog-image-wrapper">
                <img
                  src={blog?.featuredImage || '/images/placeholder-blog.jpg'}
                  alt={blog?.title || 'Blog post'}
                  className="blog-image"
                  onError={(e) => {
                    e.target.src = '/images/placeholder-blog.jpg';
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="blog-content">
                <h3 className="blog-card-title">{blog?.title || "Untitled"}</h3>
                <div className="blog-meta">
                  {blog?.category && (
                    <span className="blog-category">{blog.category}</span>
                  )}
                  <span className="blog-date">
                    {blog?.date ? new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'No date'}
                  </span>
                </div>
                <p className="blog-excerpt">
                  {blog?.excerpt || blog?.shortDesc || "No description available..."}
                </p>
                <button
                  className="blog-read-more-btn"
                  onClick={() => navigate(`/blog/${blog.slug}`)}
                >
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && search && (
          <div className="blog-no-results">
            <p>No blogs found matching "{search}"</p>
            <button onClick={() => { setSearch(''); setVisible(3); }}>
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default BlogSection;