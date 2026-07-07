//import requisite modules
import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

//import global components
import Navbar from './components/jsx/Navbar';
import ServiceDetail from './components/jsx/ServiceDetail';
import ProjectDetail from './components/jsx/ProjectDetail';
import Footer from './components/jsx/Footer';
import Chatbot from  './components/jsx/Chatbot';
import BlogDetail from './components/jsx/BlogDetail';

//import the pages
import HomePage from './pages/HomePage';
import Blogs from './pages/Blogs';
import ContactUs from './pages/ContactUS';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import TestimonialsPage from './pages/TestimonialsPage';


//call and render each page
function App() {
  return (
    <>
    {/*Global components to appear in all pages, 
    this includes the Navbar, 
    Footer and Chatbot* and so are declared outside the routes*/}
      <Navbar />
      {/*Enclose the pages inside routes to ensure SPA behavior*/}

      <Routes>
        {/*Route the navbar items each independently*/}
        <Route path="/" element={<HomePage />} />
        <Route path='/blog' element={<Blogs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/testimonial' element={<TestimonialsPage />} />

        {/*Route the services and projects by slug to ensure they appear 
        in their respective pages and are well enhanced regards SEO*/}

        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
       {/* <Route path='/blogs:slug' element={<BlogDetail />} />*/}

      </Routes>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;