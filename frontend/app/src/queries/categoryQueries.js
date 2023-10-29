import { useQuery, useMutation , useQueryClient } from "react-query";
import axios from "axios";


export function useCategoryQueries() {

  const queryClient = useQueryClient();

  const getCategories = async () => {
    const response = await axios.get("http://localhost:8080/categories/");
    return response.data;
  };

  const addCategory = async (data) => {
    const response = await axios.post(
      "http://localhost:8080/categories/",
      data
    );
    return response.data;
  };

  const deleteCategoryByName = async (name) => {
    const response = await axios.delete(
      `http://localhost:8080/categories/${encodeURIComponent(name)}`
    );
    return response.data;
  };

  const editCategoryById = async ({data, id}) => {
    const response = await axios.patch(
      `http://localhost:8080/categories/${encodeURIComponent(id)}`,
      data
    );
    return response.data;
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