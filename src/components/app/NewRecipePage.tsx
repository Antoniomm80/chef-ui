import {ChevronLeft} from "lucide-react"
import {Button} from "@/components/ui/button"
import RecipeForm from "@/components/app/RecipeForm.tsx";
import {Link} from "react-router";


export default function NewRecipePage() {
    return (
        <div className="container px-4 py-8 md:py-12">
            <Button variant="ghost" asChild className="mb-6">
                <Link to="/">
                    <ChevronLeft className="mr-2 h-4 w-4"/>
                    Volver al listado
                </Link>
            </Button>

            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tight mb-6">Añadir receta</h1>
                <RecipeForm/>
            </div>
        </div>
    )
}

