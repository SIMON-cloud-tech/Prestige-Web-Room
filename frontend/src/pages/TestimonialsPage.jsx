//import the component to display on the frontend
import SEO from "../components/jsx/SEO";
import Testimonials from "../components/jsx/Testimonials";
//call and render the component to our ccurrent component
function TestimonialsPage(){
    return(
        <>
        <SEO
          title="Client Testimonials & Success Stories"
          description="See how Prestige Web Room helps businesses grow with reliable software, websites, and digital products."
          canonicalPath="/testimonial"
        />
        <Testimonials />
        </>
    )
}
//export the component to the app.jsx
export default TestimonialsPage;