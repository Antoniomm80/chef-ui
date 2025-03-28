import {RecipeBackend} from "@/lib/recipeBackend.ts";
import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";

const recipesService = {
    async findAll(): Promise<RecipeBackend[]> {
        try {
            const result = await axios.get<RecipeBackend[]>(`/chef/api/v1/recipes`);
            return result.data;
        } catch (error) {
            const errors = error as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                throw new Error(errors.message);
            } else {
                throw error;
            }
        }
    },
    async findById(recipeId: number): Promise<RecipeBackend> {
        try {
            const result = await axios.get<RecipeBackend>(`/chef/api/v1/recipes/${recipeId}`);
            return result.data;
        } catch (error) {
            const errors = error as Error | AxiosError;
            if (axios.isAxiosError(error)) {
                throw new Error(errors.message);
            } else {
                throw error;
            }
        }
    },
}

export function useRecipes(): RecipeBackend[] {
    const {
        data,
        isError,
        error
    } = useQuery({queryKey: ["recipes"], queryFn: () => recipesService.findAll()});
    if (isError) {
        throw error;
    }
    return data || [];
}

export function useRecipe(recipeId: number): RecipeBackend | undefined {
    const {
        data,
        isError,
        error
    } = useQuery({queryKey: ["recipes", recipeId], queryFn: () => recipesService.findById(recipeId)});
    if (isError) {
        throw error;
    }
    return data;
}