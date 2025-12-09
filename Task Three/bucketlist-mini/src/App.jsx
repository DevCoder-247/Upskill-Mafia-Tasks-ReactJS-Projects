import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import TopNav from './components/TopNav.jsx';
import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';

const FormPage = lazy(() => import('./pages/FormPage.jsx'));
const About = lazy(() => import('./pages/About.jsx'));

export default function App() {
  return (
    <>
      <TopNav />
      <Container className="py-4">
        <Suspense fallback={
          <div className="d-flex justify-content-center py-5"><Spinner animation="border" /></div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
