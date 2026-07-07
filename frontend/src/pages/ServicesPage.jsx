//import the services section from jsx folder
import SEO from "../components/jsx/SEO";
import Services from "../components/jsx/Services";
//call and render the services section
function ServicesPage(){
    return(
        <>
        <SEO
          title="Software Services for Businesses in Kenya"
          description="Explore web development, fintech, e-commerce, real estate, and content portal services built for African businesses."
          canonicalPath="/services"
        />
        <Services />
        </>
    )
}
//export the component for consumption by app.jsx
export default ServicesPage;