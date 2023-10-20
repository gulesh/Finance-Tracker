import React, {useContext, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home  from './routes/Home';
import Expense from './routes/Expense';
import Category from './routes/Category';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Content from './components/layout/Content';
import Account from './routes/Account';
import EditCategory from './components/forms/EditCategory';
import MyContext from './MyContext';
import axios from "axios";

function App() {
  const { accounts, categories, updateCategories, updateAccounts } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, accountsResponse] = await Promise.all([
          axios.get("http://localhost:8080/categories/"),
          axios.get("http://localhost:8080/accounts/"),
        ]);

        const categoriesData = categoriesResponse.data;
        const accountsData = accountsResponse.data;

        updateCategories(categoriesData);
        updateAccounts(accountsData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [updateCategories, updateAccounts]);

  return (
    <Router>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/expenses"
            element={<Expense categories={categories} accounts={accounts} />}
          />
          <Route
            path="/categories"
            element={<Category categories={categories} />}
          />
          <Route path="/accounts" element={<Account accounts={accounts} />} />
          <Route
            path="/categories/edit/:categoryId"
            element={<EditCategory />}
          />
        </Routes>
      </Content>
      <Footer />
    </Router>
  );
}

export default App;
