//import the projects component for consumption by projects page
import SEO from "../components/jsx/SEO"
import Projects from "../components/jsx/Projects"
//call and render our Projects
function ProjectsPage(){
    return(
        <>
        <SEO
          title="Our Web & Software Projects"
          description="See how Prestige Web Room has built scalable websites, fintech systems, and digital platforms for ambitious businesses."
          canonicalPath="/projects"
        />
        <Projects />
        </>
    )
}
//export the page for use by app.jsx
export default ProjectsPage;