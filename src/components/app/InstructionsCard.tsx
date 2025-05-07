import {Card} from "@/components/ui/card.tsx";

interface InstructionsCardProps {
    recipeSteps: string[];
}

export function InstructionsCard({recipeSteps}: InstructionsCardProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Instrucciones</h2>
            <Card className="p-6">
                <ol className="space-y-4 ml-4 list-decimal">
                    {recipeSteps.map((step, index) => (
                        <li key={index} className="pl-2">
                            <p>{step}</p>
                        </li>
                    ))}
                </ol>
            </Card>
        </div>
    );
}