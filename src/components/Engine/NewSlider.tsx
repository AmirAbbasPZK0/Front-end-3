import React , {useRef , useState , useEffect} from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";
import { Navigation } from "swiper/modules";

const NewSlider = ({images} : {images : {imageUrl : string}[]}) => {

    const [newImages , setNewImages] = useState<typeof images>([])
    const swiperRef = useRef<any>(null);

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

    return (<>
        <div className="flex flex-row gap-2 items-center justify-center">
            <button className="pb-[100px]" onClick={() => swiperRef.current?.slidePrev()}><IoIosArrowBack/></button>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                loop={true}
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
                modules={[ Navigation]}
                className="flex items-center rounded-md p-3 justify-center"
            >
                {newImages?.map((item , index) => (
                    <SwiperSlide className="h-[300px]" key={index}>
                        <img className=" flex items-center justify-center" src={item.imageUrl} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="pb-[100px]" onClick={() => swiperRef.current?.slideNext()}><IoIosArrowForward/></button>
        </div>
    </>)
}


export default NewSlider