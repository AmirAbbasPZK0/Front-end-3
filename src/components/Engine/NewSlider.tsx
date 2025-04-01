import React , {useRef , useState , useEffect} from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";
import { Navigation } from "swiper/modules";
import { isRTL } from "@/functions/isRTL";
import {Swiper as SwiperType} from "swiper";

type HandleImageType = {
    imageWidth : number
    imageHeight : number
    imageUrl : string
}

const NewSlider = ({images , query} : {images : HandleImageType[] , query : string}) => {

    const [newImages , setNewImages] = useState<typeof images>([])
    const swiperRef = useRef<SwiperType | null>(null);

    const handleImages = (imageList : HandleImageType[]) => {
        let newArray = imageList.filter((item : HandleImageType) => {
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
                setNewImages((prevImages : HandleImageType[]) =>
                    prevImages.map((prevImage) =>
                        prevImage.imageUrl === image.imageUrl
                            ? { ...prevImage, loaded: true }
                            : prevImage
                    )
                );
            };
            img.onerror = () => {
                // Optionally, you can remove or replace the image here
                setNewImages((prevImages : HandleImageType[]) =>
                    prevImages.filter((prevImage) => prevImage.imageUrl !== image.imageUrl)
                );
            };
        });
    },[])
    
    useEffect(()=>{
        setNewImages(handleImages(images))
    },[])

    return (<>
        <div className="flex flex-row gap-2 items-center justify-center">
            <button className="pb-[100px]" onClick={() => swiperRef.current?.slidePrev()}>{isRTL(query) ? <IoIosArrowForward/> : <IoIosArrowBack/>}</button>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
                centeredSlides={true}
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
                className="flex items-center justify-center"
            >
                {newImages?.map((item , index) => (
                    <SwiperSlide className=" flex items-center justify-center" key={index}>
                        <img className="flex items-center w-full justify-center rounded-md" src={item.imageUrl} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="pb-[100px]" onClick={() => swiperRef.current?.slideNext()}>{isRTL(query) ? <IoIosArrowBack/> : <IoIosArrowForward/>}</button>
        </div>
    </>)
}


export default NewSlider