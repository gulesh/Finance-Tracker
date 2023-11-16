import React, {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home  from './routes/Home';
import Expense from './routes/Expense';
import Category from './routes/Category';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Content from './components/layout/Content';
import Account from './routes/Account';
import EditCategory from './components/forms/EditCategory';
import EditAccount from './components/forms/EditAccount';
import EditExpense from './components/forms/EditExpense';
import Transfer from './routes/Transfer';
import NavBar from './components/navigation/Navbar';
import EditTransfer from './components/forms/EditTransfer';

function App() {

   const [open, setOpen] = useState(true);

   const handleDrawerOpen = () => {
     setOpen(true);
   };

   const handleDrawerClose = () => {
     setOpen(false);
   };
  
  return (
    <Router>
      <Header />
      <Content open={open}>
        <NavBar
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
          open={open}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/expenses" element={<Expense />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/accounts" element={<Account />} />
          <Route path="/transfers" element={<Transfer />} />
          <Route
            path="/categories/edit/:categoryId"
            element={<EditCategory />}
          />
          <Route path="/accounts/edit/:accountId" element={<EditAccount />} />
          <Route
            path="/expenses/edit/:expenseId"
            element={
              <EditExpense  />
            }
          />
          <Route
            path="/transfers/edit/:transferId"
            element={<EditTransfer />}
          />
        </Routes>
      </Content>
      <Footer />
    </Router>
  );
}

export default App;
