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
import Support from './routes/Support'
import NavBar from './components/navigation/Navbar';
import EditTransfer from './components/forms/EditTransfer';
import { Auth0ProviderWithNavigate} from './AuthProviderWithNavigate'
import Profile from './routes/Profile';
import { AuthenticationGuard } from './components/AuthenticationGuard'
import GettingStarted from './routes/GettingStarted';

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
        <Auth0ProviderWithNavigate>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route
              path="/profile"
              element={<AuthenticationGuard component={Profile} />}
            />
            <Route
              path="/home"
              element={<AuthenticationGuard component={Home} />}
            />

            <Route
              path="/expenses"
              element={<AuthenticationGuard component={Expense} />}
            />
            <Route
              path="/categories"
              element={<AuthenticationGuard component={Category} />}
            />
            <Route
              path="/accounts"
              element={<AuthenticationGuard component={Account} />}
            />
            <Route
              path="/transfers"
              element={<AuthenticationGuard component={Transfer} />}
            />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/categories/edit/:categoryId"
              element={<AuthenticationGuard component={EditCategory} />}
            />
            <Route
              path="/accounts/edit/:accountId"
              element={<AuthenticationGuard component={EditAccount} />}
            />
            <Route
              path="/expenses/edit/:expenseId"
              element={<AuthenticationGuard component={EditExpense} />}
            />
            <Route
              path="/transfers/edit/:transferId"
              element={<AuthenticationGuard component={EditTransfer} />}
            />
            {/* <Route path="*" element={<NotFoundPage />} />  this will be used when user tries to go to different route*/} 
          </Routes>
        </Auth0ProviderWithNavigate>
      </Content>
      <Footer />
    </Router>
  );
}

export default App;
