import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.min.css';

import SplashPage from './components/SplashPage';
import AboutRecipePage from './components/AboutRecipePage';
import CreateRecipePage from './components/CreateRecipePage';
import PlansPage from './components/PlansPage';
import RecipeHomePage from './components/RecipeHomePage';
import UserHomePage from './components/UserHomePage';
import NavigationBar from './components/NavigationBar';
import NutritionPage from './components/NutritionPage';
import NotFound from './components/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check whether the user is logged in; Only logged-in users can access other pages
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/.auth/me');
        const data = await response.json();
        setIsAuthenticated(data && data.clientPrincipal !== null);
      } catch (error) {
        console.error('Authentication check failed', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <NavigationBar />
      <div>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/createrecipe" element={isAuthenticated ? <CreateRecipePage /> : <Navigate replace to="/" />} />
          <Route path="/aboutrecipe/:id" element={isAuthenticated ? <AboutRecipePage /> : <Navigate replace to="/" />} />
          <Route path="/plans" element={isAuthenticated ? <PlansPage /> : <Navigate replace to="/" />} />
          <Route path="/recipehome" element={isAuthenticated ? <RecipeHomePage /> : <Navigate replace to="/" />} />
          <Route path="/userhome" element={isAuthenticated ? <UserHomePage /> : <Navigate replace to="/" />} />
          <Route path="/nutrition" element={isAuthenticated ? <NutritionPage /> : <Navigate replace to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
