import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Notification from './pages/notification';


const App = () => {
  return (
      <Router>
          <AnimatedRoutes />
      </Router>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/pages/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
              <Route path="/pages/notification" element={<PageWrapper><Notification /></PageWrapper>} />
          </Routes>
      </AnimatePresence>
  );
};

const PageWrapper = ({ children }) => (
  <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
  >
      {children}
  </motion.div>
);

export default App;