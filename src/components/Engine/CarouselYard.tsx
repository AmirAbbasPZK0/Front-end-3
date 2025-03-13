"use client"

import React from "react";
import YouTubeVideos from "./YouTubeVideos";
import Carousel from "react-multi-carousel";
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";

const CarouselYard = ({videos} : {videos : any}) => {

    // const responsive = {
    //     desktop: {
    //       breakpoint: { max: 3000, min: 1024 },
    //       items: 4,
    //       slidesToSlide: 1 // optional, default to 1.
    //     },
    //     tablet: {
    //       breakpoint: { max: 1024, min: 464 },
    //       items: 2,
    //       slidesToSlide: 1 // optional, default to 1.
    //     },
    //     mobile: {
    //       breakpoint: { max: 464, min: 0 },
    //       items: 1,
    //       slidesToSlide: 1 // optional, default to 1.
    //     }
    //   };

    return(<>
        {/* {videos?.length > 0 && (<>
          <Carousel arrows={false} responsive={responsive}>
            {videos?.map((item : any , index : number) => (
                <YouTubeVideos key={index} url={item.link} data={item}/>
            ))}
          </Carousel>
        </>)} */}
        {videos?.length > 0 && (<>
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
            modules={[FreeMode, Pagination]}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
          >
            {videos?.map((item : any , index : number) => (
                <SwiperSlide key={index}>
                  <YouTubeVideos url={item.link} data={item}/>
                </SwiperSlide>
            ))}
          </Swiper>
        </>)}
    </>)
}

export default CarouselYard