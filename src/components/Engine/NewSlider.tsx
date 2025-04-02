"use client"
import { AnimatePresence, motion } from "motion/react"
import { useState , useEffect, useRef } from "react"
import { Navigation } from "swiper/modules";
import { IoIosArrowBack , IoIosArrowForward } from "react-icons/io"
import { Swiper , SwiperSlide} from "swiper/react"
import {Swiper as SwiperType} from "swiper"
import { RefObject } from "react"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Image {
    imageUrl : string
}


const NewSlider = ({query , images} : {query : string , images : Image[]}) => {

    const [newImages , setNewImages] = useState<Image[]>([])

    const swiperRef : RefObject<SwiperType | null> = useRef(null);

    const handleImages = (imageList : any) => {
        let newArray = imageList.filter((item : any) => {
            if(!(item.imageHeight > item.imageWidth * 2)){
                return item
            }
        })
        return newArray
    }

    useEffect(()=>{
        images.forEach((image) => {
            const img = new Image();
            img.src = image.imageUrl;
            img.onload = () => {
                setNewImages((prevImages : any) =>
                    prevImages.map((prevImage : any) =>
                        prevImage.imageUrl === image.imageUrl
                            ? { ...prevImage, loaded: true }
                            : prevImage
                    )
                );
            };
            img.onerror = () => {
                console.log(`Failed to load ${image.imageUrl}`);
                // Optionally, you can remove or replace the image here
                setNewImages((prevImages : any) =>
                    prevImages.filter((prevImage : any) => prevImage.imageUrl !== image.imageUrl)
                );
            };
        });
    },[])
    
    useEffect(()=>{
        setNewImages(handleImages(images))
    },[])


    return(<>
        <div className="flex flex-row gap-2 items-center justify-center">
            <button className="pb-[120px]" onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button>
            <Swiper 
                loop={true}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                1: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
              }}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation]}
              
              className="w-full flex bg-slate-200 dark:bg-slate-900 rounded-md"
            >
                {newImages?.map((item , index) => (
                    <SwiperSlide className="flex items-center justify-center" key={index}>
                        <img className="w-full block ml-auto rounded-md mr-auto" src={item.imageUrl} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="pb-[120px]" onClick={() => swiperRef.current?.slideNext()}><IoIosArrowForward/></button>
        </div>
    </>)
}

export default NewSlider