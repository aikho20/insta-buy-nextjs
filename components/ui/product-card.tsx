import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";



interface ProductCardProps {
    title: string
    discount?: string
    description: string
    price: number
    image: string
    buttonLabel?: string
    buttonClick?: () => void
}


export default function ProductCard({ title, discount, description, price, image, buttonLabel,
    buttonClick }: ProductCardProps) {
    return (
        <Card className="bg-white flex flex-col max-h-sm max-w-xs rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <CardHeader className="relative">
                <img
                    src={image}
                    alt="Product Image"
                    className="w-full h-48 bg-contain bg-center"
                />
                <div className="absolute top-0 left-0 bg-primary p-2 text-white text-sm font-italic">
                    New Arrival
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-md font-semibold mb-2 truncate">{title}</CardTitle>
                <CardDescription className="text-gray-600 mb-4 truncate text-sm">
                    {description}
                </CardDescription>
                <p className="text-gray-700 mb-2">P{price}</p>
            </CardContent>

        </Card>

    );
}