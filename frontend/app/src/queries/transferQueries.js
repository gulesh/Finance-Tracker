import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export function useTransferQueries() {
    const queryClient = useQueryClient();

    const getTransfers = async () =>{
        const response = await axios.get("http://localhost:8080/transfers/");
        return response.data;
    };

    const useGetTransfersQuery = () => {
      return useQuery({ queryKey: ["transfers"], queryFn: getTransfers });
    };

    const addTransfer = async (data) => {
      const response = await axios.post(
        "http://localhost:8080/transfers/",
        data
      );
      return response.data;
    };

    const useAddTransferQuery = () => {
      return useMutation(addTransfer, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transfers"] });
        },
      });
    };

    const deleteTransferById = async (id) => {
      const response = await axios.delete(
        `http://localhost:8080/transfers/${encodeURIComponent(id)}`
      );
      return response.data;
    };

    const useDeleteTransferQuery = () => {
      return useMutation(deleteTransferById, {
        onSuccess: (deletedTransfer) => {
          queryClient.invalidateQueries({ queryKey: ["transfers"] });
        },
      });
    };

    const editTransferById = async ({data, id}) => {
      const response = await axios.patch(
        `http://localhost:8080/transfers/${encodeURIComponent(id)}`,
        data
      );
      return response.data;
    };

    const useEditTransferQuery = () => {
      return useMutation(editTransferById, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transfers"] });
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
