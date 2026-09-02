import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import EngineeringPage from './pages/EngineeringPage';
import EnvironmentalPage from './pages/EnvironmentalPage';
import HomePage from './pages/HomePage';
import JobApplicationPage from './pages/JobApplicationPage';
import JobDetailPage from './pages/JobDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import RealEstatePage from './pages/RealEstatePage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="engineering" element={<EngineeringPage />} />
        <Route path="environmental" element={<EnvironmentalPage />} />
        <Route path="real-estate" element={<RealEstatePage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="careers/:id" element={<JobDetailPage />} />
        <Route path="careers/:id/apply" element={<JobApplicationPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
