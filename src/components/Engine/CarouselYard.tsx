"use client"

import React from "react";
import YouTubeVideos from "./YouTubeVideos";
import Carousel from "react-multi-carousel";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";
import { useEffect , useState } from "react";

import { RxArrowTopRight } from "react-icons/rx";

const CarouselYard = ({videos} : {videos : any}) => {

  const [newVideos , setNewVideos] = useState([])

  useEffect(()=>{
      setNewVideos(()=>{
          let d = videos.filter((r: { source: string; }) => r.source === "YouTube")
          return d
      })
  },[])

    return(<>
     
        
        {newVideos?.length > 0 && (<>
          <Swiper
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
            modules={[ Pagination]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            className="h-[260px]"
          >
            {newVideos?.map((item : any , index : number) => (
                <SwiperSlide key={index}>
                  <YouTubeVideos url={item.link} data={item}/>
                </SwiperSlide>
            ))}
          </Swiper>
        </>)}
    </>)
}

export default CarouselYard