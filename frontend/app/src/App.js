import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home  from './routes/Home';
import Expense from './routes/Expense';
import Category from './routes/Category';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Content from './components/layout/Content';

function App() {
  return (
    <Router>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </Content>
      <Footer />
    </Router>
  );
}

export default App;
