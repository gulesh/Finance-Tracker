import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useAccountQueries() {
  const queryClient = useQueryClient();
  const accountQueryKey = "accounts";
  const { getAccessTokenSilently, user } = useAuth0();

  const getAccounts = async () =>{
    try
    {
      const token = await getAccessTokenSilently({ scope: "read:data" });
      const response = await axios.get("http://localhost:8080/accounts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: user.sub,
        },
      });
      return response.data;
    }
    catch(error)
    {
      console.error("Error fetching accounts:", error);
      throw error; 
    }
    
  };

  const useGetAccountsQuery = () => {
    return useQuery({ queryKey: [accountQueryKey], queryFn: getAccounts });
  };

  const addAccount = async (data) => {
    try
    {
      const token = await getAccessTokenSilently({ scope: "write:data" });
      const response = await axios.post(
        "http://localhost:8080/accounts/",
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
    }
    catch( error )
    {
      console.error("Error adding the new account:", error);
      throw error; 
    }
    
  };

  const useAddAccountQuery = () => {
    return useMutation(addAccount, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
      },
    });
  };

  const deleteAccountByName = async (name) => {
    try
    {
      const token = await getAccessTokenSilently({ scope: "write:data" });
      const response = await axios.delete(
        `http://localhost:8080/accounts/${encodeURIComponent(name)}`,
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
    }
    catch(error)
    {
      console.error("Error deleting the account: " , error);
      throw error;
    }
    
  };

  const useDeleteAccountQuery = () => {
    return useMutation(deleteAccountByName, {
      onSuccess: (deletedAccount) => {
        queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
      },
    });
  };

  const editAccountById = async ({data, id}) => {
    try
    {
      const token = await getAccessTokenSilently({ scope: "write:data" });
      const response = await axios.patch(
        `http://localhost:8080/accounts/${encodeURIComponent(id)}`,
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
    }
    catch(error)
    {
      console.error("Error editing the account: ", error);
      throw error;
    } 
  };

  const useEditAccountQuery = () => {
    return useMutation(editAccountById, {
      onSuccess: () => {
        console.log("invalidating on edit");
        queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
      },
    });
  };

  return {
    useGetAccountsQuery,
    useAddAccountQuery,
    useEditAccountQuery,
    useDeleteAccountQuery,
  };

};
