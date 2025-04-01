import {useQuery} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import {ScrappedRecipe} from "@/lib/scrappedRecipe.ts";

const scrapperService = {
    async scrapRecipe(url: string): Promise<ScrappedRecipe> {
        try {
            const result = await axios.post<ScrappedRecipe>(`api/v1/recipes/scrape`, {url});
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

export function useScrapper(url: string): ScrappedRecipe | undefined {
    const {
        data,
        isError,
        error
    } = useQuery({queryKey: ["scrapper", url], queryFn: () => scrapperService.scrapRecipe(url)});
    if (isError) {
        throw error;
    }
    return data;
}