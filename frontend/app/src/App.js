import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from "./components/layout/header/Header";
import Footer from './components/layout/footer/Footer';
import Home  from './routes/Home';
import ErrorPage from './routes/ErrorPage'
import Expenses from './routes/Expenses';
import Categories from './routes/Categories'
import Accounts from './routes/Accounts';

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
