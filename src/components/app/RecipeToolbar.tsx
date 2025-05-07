import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import {ChevronLeft, Trash2} from "lucide-react";

interface RecipeToolbarProps {
    setIsDeleteDialogOpen: (isOpen: boolean) => void;
}

export function RecipeToolbar({setIsDeleteDialogOpen}: RecipeToolbarProps) {
    return (
        <>
            <Button variant="ghost" asChild className="w-fit">
                <Link to="/">
                    <ChevronLeft className="mr-2 h-4 w-4"/>
                    Volver al listado
                </Link>
            </Button>

            <div className="flex gap-2">
                {/*<Button asChild variant="outline">
                        <a href={`/recipes/edit/${recipe.id}`}>Edit Recipe</a>
                    </Button>*/}
                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Borrar receta
                </Button>
            </div>
        </>
    );
}