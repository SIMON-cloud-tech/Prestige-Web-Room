//import the component for use by contactus page
import SEO from "../components/jsx/SEO";
import Contact from "../components/jsx/Contact";
//call and render our component
function ContactUs(){
    return(
        <>
        <SEO
          title="Contact Prestige Web Room"
          description="Book a consultation for custom software, web development, and digital growth solutions in Kenya."
          canonicalPath="/contact"
        />
        <Contact />
        </>
    )
}
//export the component for use by app.jsx
export default ContactUs;