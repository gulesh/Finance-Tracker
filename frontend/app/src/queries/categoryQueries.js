import { useQuery, useMutation , useQueryClient } from "react-query";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export function useCategoryQueries() {

  const queryClient = useQueryClient();
  const { getAccessTokenSilently, user } = useAuth0();
 
  const getCategories = async () => {
    try 
    {
      const token = await getAccessTokenSilently({ scope: "read:accounts" });
      const response = await axios.get("http://localhost:8080/categories/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: user.sub,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching categories: ", error);
      throw error;
    } 
     
  };

  const addCategory = async (data) => {
    try
    {
      const token = await getAccessTokenSilently({ scope: "write:data" });
      const response = await axios.post(
        "http://localhost:8080/categories/",
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
      console.error("Error adding the new category:", error);
      throw error; // Re-throw the error to let React Query handle it
    }
  };

  const deleteCategoryByName = async (name) => {
    try {
      const token = await getAccessTokenSilently({ scope: "write:data" });
      const response = await axios.delete(
        `http://localhost:8080/categories/${encodeURIComponent(name)}`,
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
      console.error("Error deleting the category: ", error);
      throw error;
    }
  };

  const editCategoryById = async ({data, id}) => {
    try {
      const token = await getAccessTokenSilently({ scope: "write:data" });
      const response = await axios.patch(
        `http://localhost:8080/categories/${encodeURIComponent(id)}`,
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
      console.error("Error editing the category: ", error);
      throw error;
    } 
  };

  const useGetCategoriesQuery = () => {
    return useQuery({ queryKey: ["categories"], queryFn: getCategories });
  };

  const useAddCategoryQuery = () =>{
    return useMutation(addCategory, {
        onSuccess: () =>{
            console.log("invalidating on add")
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    })
  };

  const useDeleteCategoryQuery = () => {
    return useMutation(deleteCategoryByName, {
      onSuccess: (deletedCategory) => {
        console.log("invalidating the delete categories");
        //below does not update the categories inreal time, requires refresh tp see the change
        // queryClient.setQueryData("categories", (prevData) => {
        //   return prevData.filter(
        //     (category) => category.name !== deletedCategory.name
        //   );
        // });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });
  };

  const useEditCategoryQuery = () => {
    return useMutation(editCategoryById, {
        onSuccess: () => {
            console.log("invalidating on edit");
            queryClient.invalidateQueries({queryKey: ['categories']})
        },
    });
  };

  return {
    useGetCategoriesQuery,
    useAddCategoryQuery,
    useDeleteCategoryQuery,
    useEditCategoryQuery
  };
}