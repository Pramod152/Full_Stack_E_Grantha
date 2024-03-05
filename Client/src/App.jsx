import MainDashboard from './NewDesign/AdminPage/Pages/MainDashboard';
import ProtectedRoutes from './ProtectedRoutes';
import { Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
    <ProtectedRoutes />

    <Router>
      <Routes>
        
        <Route path="/E-Grantha/dashboard" element={<MainDashboard />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;