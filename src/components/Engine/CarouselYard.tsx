"use client"

import React, { useEffect } from "react";
import YouTubeVideos from "./YouTubeVideos";
import useAgent from "@/hooks/useAgent";
// import ChosenIcon from "./ChosenIcon";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";

const CarouselYard = ({videos} : {videos : any}) => {

    const [newVideos , setNewVideos] = useState([])

    const {isMobile} = useAgent()

    useEffect(()=>{
        setNewVideos((_)=>{
            let d = videos.filter((r: { source: string; }) => r.source === "YouTube")
            return d
        })
    },[])

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };

    return(<>
        <Carousel responsive={responsive}>
            {newVideos?.map((item : any , index) => (
                <YouTubeVideos key={index} url={item.link} data={item}/>
            ))}
        </Carousel>
    </>)
}

export default CarouselYard