import HomePage from "@/components/app/HomePage.tsx";
import {Route, Routes} from "react-router";
import RecipePage from "@/components/app/RecipePage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import NewRecipePage from "@/components/app/NewRecipePage.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="/recipes/new" element={<NewRecipePage/>}/>
                <Route path="/recipes" element={<HomePage/>}/>
                <Route path="/recipes/:recipe-id" element={<RecipePage/>}/>
            </Routes>
            <Toaster/>
        </QueryClientProvider>

    )
}

export default App
