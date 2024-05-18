import Image from "next/image";

'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import StoreCard from "@/components/ui/store-card";
import { useGetAllStoreQuery } from "@/store/action/storeAction";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession()
  const { data, isLoading } = useGetAllStoreQuery({})
  const router = useRouter()
  useEffect(() => {
    console.log(data)
  })

  return (

    <div className="w-full flex flex-col justify-center p-2 container">
      <p className="text-primary text-2xl font-semibold align-start py-3">Available Store!</p>
      <Carousel
        className="w-full"
      >
        <CarouselContent className="w-100 p-2">
          {data?.store?.map((item: any) => (
            <CarouselItem key={item?.id} className="md:basis-1/3 lg:basis-1/4 sm:basis-1/2 basis-1/1 h-full">
              <StoreCard title={item?.name} image={item?.images?.[0]} buttonClick={() => {
                router.push(`/store?storeId=${item?._id}`)
              }} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

    </div>
  )
}

