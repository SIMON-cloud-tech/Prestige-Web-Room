//import all the jsx files to populate the Home comonent
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