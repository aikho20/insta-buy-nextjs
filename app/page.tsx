import Image from "next/image";

'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import StoreCard from "@/components/ui/store-card";
import { useGetAllStoreQuery } from "@/store/action/storeAction";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { data: session } = useSession()
  const { data, isLoading } = useGetAllStoreQuery({})
  const router = useRouter()
  useEffect(() => {
    console.log(data)
  })

  return (

    <div className="w-full flex flex-col justify-center p-2 container ">
      <div className="flex justify-center p-3">
        <Input placeholder="Search Store...." className="bg-gray-100 align-center h-[45px] max-w-[800px] w-full" />
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        {data?.store?.map((item: any) => (
          <StoreCard title={item?.name} image={item?.images?.[0]} buttonClick={() => {
            router.push(`/store?storeId=${item?._id}`)
          }} />
        ))}
      </div>
    </div>
  )
}

