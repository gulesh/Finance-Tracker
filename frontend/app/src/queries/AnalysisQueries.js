import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useAnalysisQueries() {
    const queryClient = useQueryClient();
    const monthsQueryKey = "months";
    const yearQueryKey = "years"
    const { getAccessTokenSilently, user } = useAuth0();

    const getYears = async () => {
        try
        {
            const token = await getAccessTokenSilently({ scope: "write:data" });
        }
        catch(error)
        {
            console.error("Error editing the account: ", error);
            throw error;
        }
    }
}