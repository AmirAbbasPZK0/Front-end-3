"use client"

import React, { useRef } from "react";
import YouTubeVideos from "./YouTubeVideos";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { Navigation, Pagination } from "swiper/modules";
import { useEffect , useState } from "react";

const CarouselYard = ({videos} : {videos : any}) => {

  const [newVideos , setNewVideos] = useState([])


  const swiperRef = useRef<any>(null);

  useEffect(()=>{
      setNewVideos(()=>{
          let d = videos.filter((r: { source: string; }) => r.source === "YouTube")
          return d
      })
  },[])

    return(<>
        <div className="flex flex-row gap-2">
          <button onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button>
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
            
            className="h-[260px]"
          >
            <div>
            {newVideos?.map((item : any , index : number) => (
                <SwiperSlide key={index}>
                  <YouTubeVideos url={item.link} data={item}/>
                </SwiperSlide>
            ))}
            </div>
          </Swiper>
        </>)}
        <button onClick={() => swiperRef.current?.slideNext()}><IoIosArrowForward/></button>
        </div>
    </>)
}

export default CarouselYard