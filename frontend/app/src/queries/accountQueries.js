import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useAccountQueries() {
    const queryClient = useQueryClient();
    // const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

    const { getAccessTokenSilently, user } = useAuth0();

    const getAccounts = async () =>{
      const token = await getAccessTokenSilently({ scope: "read:accounts" });
      console.log(token);
      const response = await axios.get("http://localhost:8080/accounts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: user.sub,
        },
      });
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
