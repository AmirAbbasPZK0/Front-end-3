"use client"

import React, { useRef } from "react";
import YouTubeVideos from "./YouTubeVideos";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Navigation, Pagination } from "swiper/modules";

interface TrendNewsProps {
    Image : string
    URL : string
    Title : string
    Description : string
}

interface TrendNewsCarouselProps {
    data : TrendNewsProps[]
}

const TrendNewsCarousel = ({data} : TrendNewsCarouselProps) => {

    const swiperRef = useRef<any>(null);

    return (<>
        <div className="flex flex-row gap-2 w-[100%]">
          <button className="pb-[20px]" onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button>
          {data?.length > 0 && (<>
            <Swiper
                loop={true}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                1: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                700:{
                    slidesPerView : 2,
                    spaceBetween : 15
                }
              }}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[ Navigation]}
              
              className=" w-full"
            >
              <div>
                {data?.map(item => (
                    <SwiperSlide key={item.Title} className="w-60 p-4 cursor-grab bg-gradient-to-l rounded-md">
                        <div className=" flex flex-col gap-1 relative">
                            <img src={item.Image} className="w-[100%] brightness-50 transition-all rounded-md shadow-inner" alt="" />
                            <div className="flex flex-col gap-1 absolute top-12 left-2 mt-10">
                                <h3 className="font-semibold text-[13px] text-white">{item.Title.slice(0,25)} ...</h3>
                                <p className="text-[10px] text-white">{item.Description.slice(0,30)} ...</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </>)}
          <button className="pb-[20px]" onClick={() => swiperRef.current?.slideNext()}><IoIosArrowForward/></button>
        </div>
    </>);
}
 
export default TrendNewsCarousel;