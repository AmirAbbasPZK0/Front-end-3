"use client"

import React, { useRef } from "react";
import YouTubeVideos from "./YouTubeVideos";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect , useState } from "react";
import useAgent from "@/hooks/useAgent";
import { Swiper as SwiperType } from 'swiper';
import { RefObject } from 'react';



interface Video {
  title : string
  url : string
  source : string
  link : string
}

interface CarouselYardProps {
  videos : Video[]
}

const CarouselYard = ({videos} : CarouselYardProps) => {

  const [newVideos , setNewVideos] = useState<Video[]>([])

  const {isMobile} = useAgent()

  const swiperRef: RefObject<SwiperType | null> = useRef(null);

  useEffect(()=>{
      setNewVideos(()=>{
          let d = videos.filter((r: { source: string; }) => r.source === "YouTube")
          return d
      })
  },[])

    return(<>
        <div className="flex flex-row gap-2">
          {isMobile ? videos?.length > 1 && <button className="pb-[100px]" onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button> : 
           videos?.length > 4 && <button className="pb-[100px]" onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button>}
          {newVideos?.length > 0 && (<>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              breakpoints={{
                1: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                700: {
                  slidesPerView: 4,
                  spaceBetween: 15,
                },
              }}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[ Pagination , Navigation]}
              
              className="h-[260px] w-full"
            >
              <div>
              {newVideos?.map((item : Video , index : number) => (
                  <SwiperSlide key={index}>
                    <YouTubeVideos url={item.link} data={item}/>
                  </SwiperSlide>
              ))}
              </div>
            </Swiper>
          </>)}
          {isMobile ? videos?.length > 1 && <button className="pb-[100px]" onClick={() => swiperRef.current?.slideNext()}><IoIosArrowForward/></button> : 
          videos?.length > 4 && <button className="pb-[100px]" onClick={() => swiperRef.current?.slideNext()}><IoIosArrowForward/></button>}
        </div>
    </>)
}

export default CarouselYard