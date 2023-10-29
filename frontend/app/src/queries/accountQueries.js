import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function useAccountQueries() {
    const queryClient = useQueryClient();

    const getAccounts = async () =>{
        const response = await axios.get("http://localhost:8080/accounts/");
        return response.data;
    };

    const useGetAccountsQuery = () => {
      return useQuery({ queryKey: ["accounts"], queryFn: getAccounts });
    };

    const addAccount = async (data) => {
      const response = await axios.post(
        "http://localhost:8080/accounts/",
        data
      );
      return response.data;
    };

    const useAddAccountQuery = () => {
      return useMutation(addAccount, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
      });
    };

    const deleteAccountByName = async (name) => {
      const response = await axios.delete(
        `http://localhost:8080/accounts/${encodeURIComponent(name)}`
      );
      return response.data;
    };

    const useDeleteCategoryQuery = () => {
      return useMutation(deleteAccountByName, {
        onSuccess: (deletedAccount) => {
          queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
      });
    };

    const editAccountById = async ({data, id}) => {
      const response = await axios.patch(
        `http://localhost:8080/accounts/${encodeURIComponent(id)}`,
        data
      );
      return response.data;
    };

    const useEditAccountQuery = () => {
      return useMutation(editAccountById, {
        onSuccess: () => {
          console.log("invalidating on edit");
          queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
      });
    };

    return {
        useGetAccountsQuery,
        useAddAccountQuery,
        useEditAccountQuery,
        useDeleteCategoryQuery
    };

};
