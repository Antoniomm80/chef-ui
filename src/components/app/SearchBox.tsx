import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useCallback, useEffect, useState} from "react";
import {RecipeBackend} from "@/lib/recipeBackend.ts";

interface SearchBoxProps {
    recipes: RecipeBackend[];
    searchResults: RecipeBackend[];
    setSearchResults: React.Dispatch<React.SetStateAction<RecipeBackend[]>>
}

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export function SearchBox({recipes, searchResults, setSearchResults}: SearchBoxProps) {
    const [searchQuery, setSearchQuery] = useState("")
    // Debounce the search input to reduce frequency of search operations
    const debouncedSearchTerm = useDebounce(searchQuery, 300)

    // Search function that would eventually hit a backend
    const performSearch = useCallback((query: string) => {
        // Simulate a backend call with setTimeout
        setTimeout(() => {
            if (query.length < 3) {
                setSearchResults(recipes);
            } else {
                const filtered = recipes.filter((recipe) => {
                    const q = query.toLowerCase()
                    return recipe.name?.toLowerCase().includes(q) || recipe.notes?.toLowerCase().includes(q)
                })
                setSearchResults(filtered)
            }

        }, 100) // Simulate network delay
    }, [recipes])

    // Effect to trigger search when debounced term changes
    useEffect(() => {
        performSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm, performSearch])
    return (

        <div className="relative mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"/>
                <Input
                    type="text"
                    placeholder="Busca recetas por título o descripción..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-6 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                />
                {searchQuery && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-8 px-2"
                        onClick={() => setSearchQuery("")}
                    >
                        Borrar
                    </Button>
                )}
            </div>
            {searchQuery && searchQuery.length >= 3 && (
                <p className="text-sm text-muted-foreground mt-2">
                    Encontradas {searchResults.length} {searchResults.length === 1 ? "receta" : "recetas"} con "{searchQuery}
                    "
                </p>
            )}
        </div>
    );
}