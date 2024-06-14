import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface StoreCardProps {
    title: string
    image: string
    buttonClick?: () => void
}


export default function StoreCard({ title, image,
    buttonClick }: StoreCardProps) {
    return (
        <Card className="m-2 bg-white flex flex-col max-h-sm rounded-lg shadow-md hover:shadow-lg transition duration-300" onClick={buttonClick}>

            <img
                src={'https://as2.ftcdn.net/v2/jpg/02/32/16/07/1000_F_232160763_FuTBWDd981tvYEJFXpFZtolm8l4ct0Nz.jpg'}
                alt="Store Image"
                className="w-full h-48 bg-contain bg-center"
            />


            <CardContent className="p-4 flex flex-row space-x-2 items-center w-full">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-md font-semibold truncate w-full">{title}</CardTitle>


            </CardContent>

        </Card>

    );
}