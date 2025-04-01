"use client"

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Navigation } from "swiper/modules";
import { useAsync } from "@/hooks/useAsync";
import { RefObject } from "react";
import {Swiper as SwiperType} from "swiper";

type DataTypes = {
  articles : TrendNewsProps[]
}

interface TrendNewsProps {
    image : string
    url : string
    title : string
    description : string
}

const TrendNewsCarousel = () => {

    const [data , setData] = useState<DataTypes>({
      articles : []
    })

    const {run} = useAsync("top" , "GET")

    useEffect(()=>{
      run().then((resData : DataTypes) => setData(resData))
    },[])

    const swiperRef : RefObject<SwiperType | null> = useRef(null);

    return (<>
        <div className="flex flex-row gap-2 w-[100%]">
          <button className="pb-[20px]" onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button>
          {data?.articles?.length > 0 && (<>
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
                {data?.articles?.map((item : TrendNewsProps) => (
                    <SwiperSlide key={item?.title} className="w-60 p-4 cursor-grab bg-gradient-to-l rounded-md">
                        <a href={item?.url} target="_blank" className="flex flex-col gap-1 relative">
                            <img src={item?.image} className="w-[100%] h-[140px] object-cover object-center brightness-50 transition-all rounded-md shadow-inner" alt="" />
                            <div className="flex flex-col gap-1 absolute top-12 left-2 mt-10">
                                <h3 className="font-semibold text-[13px] text-white">{item?.title.slice(0,25)} ...</h3>
                                <p className="text-[10px] text-white">{item?.description.slice(0,30)} ...</p>
                            </div>
                        </a>
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