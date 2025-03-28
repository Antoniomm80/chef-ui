import HomePage from "@/components/app/HomePage.tsx";
import {Route, Routes} from "react-router";

import RecipeForm from "@/components/app/RecipeForm.tsx";
import RecipePage from "@/components/app/RecipePage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="/recipes/new" element={<RecipeForm/>}/>
                <Route path="/recipes" element={<HomePage/>}/>
                <Route path="/recipes/:recipe-id" element={<RecipePage/>}/>
            </Routes>
        </QueryClientProvider>

    )
}

export default App
