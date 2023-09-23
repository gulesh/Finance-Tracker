import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from "./components/layout/header/Header";
import Footer from './components/layout/footer/Footer';
import Home  from './components/routes/Home';
import ErrorPage from './components/routes/ErrorPage'
import Expenses from './components/routes/Expenses';
import Categories from './components/routes/Categories'
import Accounts from './components/routes/Accounts';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/accounts" element={<Accounts />} />
          {/* Add a "not found" route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
