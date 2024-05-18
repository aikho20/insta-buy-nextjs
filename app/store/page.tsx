'use client'

'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useGetProductMutation } from "@/store/action/productAction";
import ProductCard from "@/components/ui/product-card";
import MerchantRegistrationForm from "@/components/forms/merchant-registration";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import StoreCard from "@/components/ui/store-card";

interface StoreProps {
    searchParams: {
        storeId: string
    }


}

export default function Store({ searchParams: { storeId } }: StoreProps) {
    const { data: session } = useSession()
    const [getProduct, { data, isLoading }] = useGetProductMutation()
    const router = useRouter()

    useEffect(() => {
        getProduct({ merchantId: storeId })
        console.log(storeId)
    }, [])

    return (
        <div className="w-full flex flex-col justify-center p-2 container">
            <p className="text-primary text-2xl font-semibold align-start py-3">Deals Today!</p>
            <Carousel
                className="w-full"
            >
                <CarouselContent className="w-100 p-2">
                    {data?.product?.map((item: any) => (
                        <CarouselItem key={item?.id} className="md:basis-1/3 lg:basis-1/4 sm:basis-1/2 basis-1/1 h-full">
                            <ProductCard title={item?.productName} description={item?.description} image={item?.images?.[0]} price={item?.price?.$numberDecimal} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    );
}