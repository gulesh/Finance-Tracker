import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function useExpenseQueries() {
    const queryClient = useQueryClient();
    const accountQueryKey = "accounts";
    const categoryQueryKey = "categories";
    const expenseQueryKey = "expenses";

    const getExpenses = async () =>{
        const response = await axios.get("http://localhost:8080/expenses/");
        return response.data;
    };

    const addExpense = async (data) => {
        const response = await axios.post(
          "http://localhost:8080/expenses/",
          data
        );
        return response.data;
    };

    const deleteExpenseById = async (id) =>{
        const response = await axios.delete(
          `http://localhost:8080/expenses/${encodeURIComponent(id)}`
        );
        return response.data;
    };

    const editExpenseById = async ({data, id}) => {
      console.log(data);
      const response = await axios.patch(
        `http://localhost:8080/expenses/${encodeURIComponent(id)}`,
        data
      );
      return response.data;
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
