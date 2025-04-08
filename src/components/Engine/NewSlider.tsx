"use client"
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
    imageHeight : number
    imageWidth : number
}


const NewSlider = ({query , images} : {query : string , images : Image[]}) => {

    const [newImages , setNewImages] = useState<Image[]>([])

    const swiperRef : RefObject<SwiperType | null> = useRef(null);

    const handleImages = (imageList : Image[]) => {
        let newArray = imageList.filter((item : Image) => {
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
                setNewImages((prevImages : Image[]) =>
                    prevImages.map((prevImage : Image) =>
                        prevImage.imageUrl === image.imageUrl
                            ? { ...prevImage, loaded: true }
                            : prevImage
                    )
                );
            };
            img.onerror = () => {
                console.log(`Failed to load ${image.imageUrl}`);
                // Optionally, you can remove or replace the image here
                setNewImages((prevImages : Image[]) =>
                    prevImages.filter((prevImage : Image) => prevImage.imageUrl !== image.imageUrl)
                );
            };
        });
    },[])
    
    useEffect(()=>{
        setNewImages(handleImages(images))
    },[])


    return(<>
        <div className="flex flex-row gap-2 items-center justify-center">
            <button className="" onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button>
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
              
              className="w-full flex bg-slate-200 dark:bg-slate-900 rounded-md h-auto"
            >
                {newImages?.map((item , index) => (
                    <SwiperSlide className="flex items-center justify-center" key={index}>
                        <img className="w-full rounded-md items-center min-h-[300px] max-h-[300px] object-contain" src={item.imageUrl} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="" onClick={() => swiperRef.current?.slideNext()}><IoIosArrowForward/></button>
        </div>
    </>)
}

export default NewSlider