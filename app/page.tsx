import Image from "next/image";

'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { data: session } = useSession()


  return (

    <div className="w-full flex flex-col justify-center p-5">
      {/*
      
       <p className="text-primary text-2xl font-semibold align-start py-3">Deals Today!</p>
      <Carousel
        className="w-full"
      >
        <CarouselContent className="w-100">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/6 sm:basis-1/4 basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square mx-w-sm items-center justify-center p-6">
                    <span className="text-3xl">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>


      <p className="text-primary text-2xl font-semibold align-start py-3">See Available Store!</p>
      <Carousel
        className="w-full"
      >
        <CarouselContent className="w-100">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/5 lg:basis-1/6 sm:basis-1/4 basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square mx-w-sm items-center justify-center p-6">
                    <span className="text-3xl">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      */}

    </div>
  )
}

