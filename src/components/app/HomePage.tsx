import {ChevronRight, Search} from "lucide-react"

import {Button} from "@/components/ui/button"
import RecipeGrid from "@/components/app/RecipeGrid.tsx";
import {Link} from "react-router";
import {RecipeBackend} from "@/lib/recipeBackend.ts";
import {useRecipes} from "@/lib/use-recipes.tsx";
import {useCallback, useEffect, useState} from "react";
import {Input} from "@/components/ui/input.tsx";

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

export default function HomePage() {
    const recipes: RecipeBackend[] = useRecipes();

    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState(recipes)


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
                    return recipe.name.toLowerCase().includes(q) || recipe.notes.toLowerCase().includes(q)
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
        <div className="container px-4 py-8 md:py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Chef</h1>
                    <p className="text-muted-foreground mt-2">Recetas para cualquier ocasión</p>
                </div>
                <Button asChild>
                    <Link to="/recipes/new">
                        Añadir receta
                        <ChevronRight className="ml-2 h-4 w-4"/>
                    </Link>
                </Button>
            </div>

            {/* Search Box */}
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
            {searchResults.length > 0 ? (
                <RecipeGrid recipes={searchResults}/>
            ) : (
                <div className="text-center py-12">
                    <h2 className="text-2xl font-semibold mb-2">No se han encontrado recetas</h2>
                    <p className="text-muted-foreground mb-6">Ajusta los criterios de búsqueda.</p>
                </div>
            )}
        </div>
    )
}

