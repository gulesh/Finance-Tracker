import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function useExpenseQueries() {
    const queryClient = useQueryClient();

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
      const response = await axios.patch(
        `http://localhost:8080/expenses/${encodeURIComponent(id)}`,
        data
      );
      return response.data;
    };

    const useGetExpensesQuery = () => {
      return useQuery({ queryKey: ["expenses"], queryFn: getExpenses });
    };

    const useAddExpenseQuery = () => {
      return useMutation(addExpense, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["expenses"] });
        },
      });
    };


  const useDeleteExpenseQuery = () => {
    return useMutation(deleteExpenseById, {
      onSuccess: (deletedCategory) => {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
      },
    });
  };

  const useEditExpenseQuery = () => {
    return useMutation(editExpenseById, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
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
