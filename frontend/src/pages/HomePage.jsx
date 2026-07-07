//import all the jsx files to populate the Home comonent
import SEO from '../components/jsx/SEO';
import Hero from '../components/jsx/Hero';
import Process from '../components/jsx/Process';
import Services from '../components/jsx/Services';
import Projects from '../components/jsx/Projects';
import Testimonials from '../components/jsx/Testimonials';
import Contact from '../components/jsx/Contact';
import BlogSection from '../components/jsx/BlogSection';

function HomePage(){
    //Render the imported components as a JSX
    return(
        <>
        <SEO
          title="Custom Software & Web Development in Kenya"
          description="Prestige Web Room delivers custom websites, SaaS products, fintech software, and e-commerce platforms for businesses across Kenya and Africa."
          keywords="custom software Kenya, web development Kenya, SaaS development, fintech software, e-commerce platform"
          canonicalPath="/"
        />
        <Hero />
        <Process />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        <BlogSection />
        </>
    )
}
//export the component for consumption by the App.jsx
export default HomePage;