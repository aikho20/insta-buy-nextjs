import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { Skeleton } from "./skeleton";



interface ProductCardProps {
    title?: string
    discount?: string
    description?: string
    price?: number
    image?: string
    buttonLabel?: string
    isLoading?: boolean
    buttonClick?: () => void
}


export default function ProductCard({ title, discount, description, price, image, buttonLabel, isLoading,
    buttonClick }: ProductCardProps) {
    return (
        <Card className="bg-white flex flex-col max-h-sm max-w-[180px] rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <CardHeader className="relative">
                {isLoading ? (
                    <Skeleton className="w-full h-[100px]" />
                ) : (
                    <img
                        src={image}
                        alt="Product Image"
                        className="w-full h-[100px] bg-contain bg-center"
                    />
                )}

            </CardHeader>
            <CardContent className="p-4">
                <CardTitle className="text-md font-semibold mb-2 truncate">{!isLoading ? title : <Skeleton className="w-full h-7" />}</CardTitle>
                <CardDescription className="text-gray-600 mb-4 truncate text-sm">
                    {!isLoading ? description : <Skeleton className="w-full h-6" />}
                </CardDescription>
                <p className="text-gray-700 mb-2">{!isLoading ? `P${price}` : <Skeleton className="w-10 h-5" />}</p>
            </CardContent>

        </Card>

    );
}