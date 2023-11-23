import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useTransferQueries() {
    const queryClient = useQueryClient();
    const accountQueryKey = "accounts";
    const transferQueryKey = "transfers";
    const { getAccessTokenSilently, user } = useAuth0();

    const getTransfers = async () =>{
      try {
        const token = await getAccessTokenSilently({ scope: "read:data" });
        const response = await axios.get(
          "http://localhost:8080/transfers/",
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
        console.error("Error fetching accounts:", error);
        throw error;
      }
    };

    const useGetTransfersQuery = () => {
      return useQuery({ queryKey: [transferQueryKey], queryFn: getTransfers });
    };

    const addTransfer = async (data) => {
      try {
        const token = await getAccessTokenSilently({ scope: "write:data" });
        const response = await axios.post(
          "http://localhost:8080/transfers/",
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
        console.error("Error adding the new transfer:", error);
        throw error; 
      }
    };

    const useAddTransferQuery = () => {
      return useMutation(addTransfer, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [transferQueryKey] });
          queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
        },
      });
    };

    const deleteTransferById = async (id) => {
      try {
        const token = await getAccessTokenSilently({ scope: "write:data" });
        const response = await axios.delete(
          `http://localhost:8080/transfers/${encodeURIComponent(id)}`,
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
        console.error("Error deleting the transfer: ", error);
        throw error;
      }
    };

    const useDeleteTransferQuery = () => {
      return useMutation(deleteTransferById, {
        onSuccess: (deletedTransfer) => {
          queryClient.invalidateQueries({ queryKey: [transferQueryKey] });
          queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
        },
      });
    };

    const editTransferById = async ({data, id}) => {
      try {
        const token = await getAccessTokenSilently({ scope: "write:data" });
        const response = await axios.patch(
          `http://localhost:8080/transfers/${encodeURIComponent(id)}`,
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
        console.error("Error editing the transfer: ", error);
        throw error;
      }
    };

    const useEditTransferQuery = () => {
      return useMutation(editTransferById, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [transferQueryKey] });
          queryClient.invalidateQueries({ queryKey: [accountQueryKey] });
        },
      });
    };

    return {
      useGetTransfersQuery,
      useAddTransferQuery,
      useEditTransferQuery,
      useDeleteTransferQuery,
    };

};
