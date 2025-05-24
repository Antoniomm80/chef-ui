import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import {ChevronLeft, Trash2, FilePenLine} from "lucide-react";

interface RecipeToolbarProps {
    setIsDeleteDialogOpen: (isOpen: boolean) => void;
    onEditClick?: () => void;
}

export function RecipeToolbar({setIsDeleteDialogOpen, onEditClick}: RecipeToolbarProps) {
    return (
        <>
            <Button variant="ghost" asChild className="w-fit">
                <Link to="/">
                    <ChevronLeft className="mr-2 h-4 w-4"/>
                    Volver al listado
                </Link>
            </Button>

            <div className="flex gap-2">
                <Button variant="outline" onClick={onEditClick}>
                    <FilePenLine className="h-4 w-4 mr-2"/>
                    Editar receta
                </Button>
                <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Borrar receta
                </Button>
            </div>
        </>
    );
}