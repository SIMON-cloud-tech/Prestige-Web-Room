//import the blogsection to populate the blogs page
import SEO from "../components/jsx/SEO";
import BlogSection from "../components/jsx/BlogSection";

function Blogs(){
    //call and render the Blogs in the blogs page
    return(
        <>
        <SEO
          title="Tech Insights & Digital Strategy Blog"
          description="Read expert articles on fintech, software development, e-commerce, and digital transformation for African businesses."
          canonicalPath="/blog"
        />
        <BlogSection />
        </>
    )
}
//export the componemt for use by App.jsx
export default Blogs;