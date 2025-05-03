import RecipeGrid from "@/components/app/RecipeGrid.tsx";
import {RecipeBackend} from "@/lib/recipeBackend.ts";
import {useRecipes} from "@/lib/use-recipes.tsx";
import {useState} from "react";
import {HomePageHeader} from "@/components/app/HomePageHeader.tsx";
import {SearchBox} from "@/components/app/SearchBox.tsx";


export default function HomePage() {
    const recipes: RecipeBackend[] = useRecipes();
    const [searchResults, setSearchResults] = useState(recipes)

    return (
        <div className="container px-4 py-8 md:py-12 mx-auto">
            <HomePageHeader/>
            <SearchBox recipes={recipes} searchResults={searchResults} setSearchResults={setSearchResults}/>
            <RecipeGrid recipes={searchResults}/>
        </div>
    )
}

