import { useState, useCallback, memo } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import '../css/Contact.css';

// ─────────────────────────────────────────────
// 🔧 CONFIG
// ─────────────────────────────────────────────
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '254703433014';
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hello@jamsi.co.ke';

// ─────────────────────────────────────────────
// 📍 JAMSI CONTACT DATA
// ─────────────────────────────────────────────
const CONTACT_DETAILS = [
  {
    id: 'location',
    label: 'Location',
    value: 'Imara Daima, Nairobi, Kenya',
    href: 'https://maps.google.com/?q=Nairobi+Kenya',
    icon: <FaMapMarkerAlt />,
  },
  {
    id: 'phone',
    label: 'Phone / WhatsApp',
    value: '+254 703 433 014',
    href: 'tel:+254703433014',
    icon: <FaPhone />,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'simonmbithi143@gmail.com',
    href: 'mailto:simonmbithi143@gmail.com',
    icon: <FaEnvelope />,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: 'Chat with us',
    href: `https://wa.me/${WA_NUMBER}`,
    icon: <FaWhatsapp />,
  },
];

// ─────────────────────────────────────────────
// 🧩 ROW
// ─────────────────────────────────────────────
const DetailRow = memo(({ icon, label, value, href }) => (
  <a href={href} className="detail-row" target="_blank" rel="noopener noreferrer">
    <span className="detail-row__icon">{icon}</span>
    <span>
      <p>{value}</p>
    </span>
  </a>
));

const EMPTY_FORM = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
};

// ─────────────────────────────────────────────
// 🧩 MAIN COMPONENT
// ─────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus({ type: '', message: '' });
      setLoading(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus({
            type: 'success',
            message: '✅ Message sent successfully! We\'ll get back to you within 24 hours.',
          });
          setForm(EMPTY_FORM);
        } else {
          setStatus({
            type: 'error',
            message: data.error || '❌ Failed to send message. Please try again.',
          });
        }
      } catch (error) {
        setStatus({
          type: 'error',
          message: '❌ Network error. Please check your connection and try again.',
        });
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  return (
    <section className="contact-section" id="contact">

      {/* HEADER */}
      <div className="contact-header">
        <h2 className="contact-title">Let's Build Something Together</h2>
        <p className="contact-subtitle">
          Ready to start your project? Reach out and let's make it happen.
        </p>
        <p>
          <strong>Meetings:</strong> By appointment at Muimara Mall, or fully remote
          </p>
      </div>

      {/* BODY */}
      <div className="contact-body">

        {/* LEFT - Contact Info */}
        <div className="contact-left">
          <h3>Connect With Us</h3>
          <p className="contact-left-subtitle">
            Prefer a more direct approach? Reach out through any of these channels.
          </p>

          <div className="contact-details">
            {CONTACT_DETAILS.map((d) => (
              <DetailRow key={d.id} {...d} />
            ))}
          </div>

          <div className="contact-cta">
              <h4>What We Build</h4>
              <div className="contact-tags">
              <span>Fintech Platforms</span>
              <span>E-Commerce Solutions</span>
              <span>Healthcare Systems</span>
              <span>Real Estate Platforms</span>
              <span>Content Portals</span>
              <span>Custom Software</span>
              <span>Mobile & Web Apps</span>
              <span>Branding & Design</span>
            </div>
          </div>
        </div>

        {/* RIGHT - Form */}
        <div className="contact-right">
          <h3>Send Us a Message</h3>

          {status.message && (
            <div className={`form-status ${status.type}`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">

            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={form.email}
              onChange={handleChange}
              required
            />

            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Project Type</option>
              <option value="Fintech Platform">Fintech Platform</option>
              <option value="E-Commerce Solution">E-Commerce Solution</option>
              <option value="Real Estate System">Real Estate System</option>
              <option value="Content/News Portal">Content/News Portal</option>
              <option value="Custom Software">Custom Software</option>
              <option value="Consulting">Consulting</option>
              <option value="Static & Dynamic website development">Static & Dynamic website development</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Select Budget Range</option>
              <option value="Under KSH. 10,000">Under KSH. 10,000</option>
              <option value="KSH. 10,000 – 15,000">KSH. 10,000 – 15,000</option>
              <option value="KSH. 15,000 – 50,000">KSH. 15,000 – 50,000</option>
              <option value="KSH. 50,000 – 100,000">KSH. 50,000 – 100,000</option>
              <option value="KSH. 100,000+">KSH. 100,000+</option>
              <option value="Not sure">Not sure</option>
            </select>

            <textarea
              name="message"
              placeholder="Tell us about your project, your goals, and what you need... *"
              value={form.message}
              onChange={handleChange}
              required
              rows="5"
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

      </div>

      {/* MAP */}
      <div className="contact-map">
       <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4882.439633478269!2d36.875926360580806!3d-1.3279105246767673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f13040cca3027%3A0xd710b904557488db!2sThe%20Imaara%20Shopping%20Mall!5e0!3m2!1sen!2ske!4v1783235222991!5m2!1sen!2ske"
        title="Prestige Web Room - The Imaara Shopping Mall, Imara Daima"
        loading="lazy"
        allowFullScreen
        style={{ border: 0 }}
        />
      </div>

    </section>
  );
};

export default Contact;