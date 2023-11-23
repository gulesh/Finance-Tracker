import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useExpenseQueries() {
    const queryClient = useQueryClient();
    const { getAccessTokenSilently, user } = useAuth0();

    const accountQueryKey = "accounts";
    const categoryQueryKey = "categories";
    const expenseQueryKey = "expenses";

    const getExpenses = async () =>{
      try {
        const token = await getAccessTokenSilently({ scope: "read:data" });
        const response = await axios.get("http://localhost:8080/expenses/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: user.sub,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
      }
    };

    const addExpense = async (data) => {
      try {
        const token = await getAccessTokenSilently({ scope: "write:data" });
        const response = await axios.post(
          "http://localhost:8080/expenses/",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId: user.sub,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error adding the new Expense:", error);
        throw error; // Re-throw the error to let React Query handle it
      }
    };

    const deleteExpenseById = async (id) =>{
      try {
        const token = await getAccessTokenSilently({ scope: "write:data" });
        const response = await axios.delete(
          `http://localhost:8080/expenses/${encodeURIComponent(id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId: user.sub,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error deleting the expense: ", error);
        throw error;
      }
    };

    const editExpenseById = async ({data, id}) => {
      try {
        const token = await getAccessTokenSilently({ scope: "write:data" });
        const response = await axios.patch(
          `http://localhost:8080/expenses/${encodeURIComponent(id)}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId: user.sub,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error editing the expense: ", error);
        throw error;
      } 
    };

    const useGetExpensesQuery = () => {
      return useQuery({ queryKey: [expenseQueryKey], queryFn: getExpenses });
    };

    const useAddExpenseQuery = () => {
      return useMutation(addExpense, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [expenseQueryKey] });
          queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
          queryClient.invalidateQueries({ queryKey: [categoryQueryKey] });
        },
      });
    };


  const useDeleteExpenseQuery = () => {
    return useMutation(deleteExpenseById, {
      onSuccess: (deletedCategory) => {
        queryClient.invalidateQueries({ queryKey: [expenseQueryKey] });
        queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
        queryClient.invalidateQueries({ queryKey: [categoryQueryKey] });
      },
    });
  };

  const useEditExpenseQuery = () => {
    return useMutation(editExpenseById, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [expenseQueryKey] });
        queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
        queryClient.invalidateQueries({ queryKey: [categoryQueryKey] });
      },
    });
  };

  return {
    useGetExpensesQuery,
    useAddExpenseQuery,
    useEditExpenseQuery,
    useDeleteExpenseQuery
  }
}
