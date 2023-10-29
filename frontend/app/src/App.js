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
import EditAccount from './components/forms/EditAccount';
import EditExpense from './components/forms/EditExpense';
import Transfer from './routes/Transfer';

function App() {
  const {
    accounts,
    categories,
    updateCategories,
    updateAccounts,
    updateExpenses,
  } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, accountsResponse, expenseResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/categories/"),
            axios.get("http://localhost:8080/accounts/"),
            axios.get("http://localhost:8080/expenses/"),
          ]);

        const categoriesData = categoriesResponse.data;
        const accountsData = accountsResponse.data;
        const expensesData = expenseResponse.data;

        updateCategories(categoriesData);
        updateAccounts(accountsData);
        updateExpenses(expensesData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [updateCategories, updateAccounts, updateExpenses]);
//a little later try using React-Query to do fetching to remove unnecessary fetch calls 
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
            element={<Category 
               />}
          />
          <Route path="/accounts" element={<Account accounts={accounts} />} />
          <Route path="/transfers" element={<Transfer accounts={accounts}/>} />
          <Route
            path="/categories/edit/:categoryId"
            element={<EditCategory />}
          />
          <Route path="/accounts/edit/:accountId" element={<EditAccount />} />
          <Route
            path="/expenses/edit/:expenseId"
            element={ <EditExpense categories={categories} accounts={accounts} /> }
          />
        </Routes>
      </Content>
      <Footer />
    </Router>
  );
}

export default App;
