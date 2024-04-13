import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCourseForm from './components/AddCourseForm';
import AdminLogin from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AddUsers from './components/AddUsers';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/CourseForm" element={<AddCourseForm />} />
        <Route path="/" element={<AdminLogin />} />
        <Route path="/Dashboard" element={<AdminDashboard />} />
        <Route path="/AddUsers" element={<AddUsers />} />

      </Routes>
    </Router>
  );
}

export default App;
