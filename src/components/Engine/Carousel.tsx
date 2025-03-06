"use client"

import React, { useEffect } from "react";
import Slider from "react-slick"
import YouTubeVideos from "./YouTubeVideos";
import useAgent from "@/hooks/useAgent";
// import ChosenIcon from "./ChosenIcon";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


const Carousel = ({videos} : {videos : any}) => {

    const [newVideos , setNewVideos] = useState([])

    const {isMobile} = useAgent()

    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: isMobile ? 1 : 4,
        slidesToScroll: 1,
        centerMode : !isMobile,
        arrows : false
    };

    const slider = React.useRef<any>(null);

    useEffect(()=>{
        setNewVideos((_)=>{
            let d = videos.filter((r: { source: string; }) => r.source === "YouTube")
            return d
        })
    },[])

    return(<>
        <div className="flex w-full gap-3 flex-row">
            <button className="mb-20" onClick={() => slider?.current?.slickPrev()}><IoIosArrowBack/></button>
            <div className="md:w-[96%] w-[80%]">
                <div className="cursor-grab">
                    <Slider className="flex gap-2 w-full" ref={slider} {...settings}>
                    {newVideos?.map((item : any , index) => (
                        <YouTubeVideos key={index} url={item.link} data={item}/>
                    ))}
                    </Slider>
                </div>
            </div>
            <button className="mb-20" onClick={() => slider?.current?.slickNext()}><IoIosArrowForward/></button>
        </div>
    </>)
}

export default Carousel