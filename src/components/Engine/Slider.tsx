"use client"
import { AnimatePresence, motion } from "motion/react"
import { useState , useEffect } from "react"
import { IoIosArrowBack , IoIosArrowForward } from "react-icons/io"

const Slider = ({images} : {images : {imageUrl : string}[]}) => {

    const [isActive , setIsActive] = useState(0)
    const [newImages , setNewImages] = useState([])
    const [isOpen , setIsOpen] = useState<string | boolean>(false)
    const [openedImageSlider , setOpenedImageSlider] = useState<number | boolean>(false)

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
        <div className="flex flex-row gap-2 w-full">
            <button onClick={()=>{
                setIsActive(item => item === 0 ? (newImages?.length - 1) : item - 1)
            }}><IoIosArrowBack/></button>
            <div className="md:w-[80%] w-[100%]">
                {newImages?.map((item : any , index) => (
                    <img onClick={()=>{
                        setIsOpen(item?.imageUrl)
                        setOpenedImageSlider(index)
                    }} className={`${isActive === index ? "md:max-w-full md:min-w-full min-h-[300px] max-h-[300px]" : "w-0 opacity-0"} object-cover cursor-pointer rounded-md`} src={item.imageUrl} alt="" />
                ))}
            </div>
            <button onClick={()=>{
                setIsActive(item => item === (newImages?.length - 1) ? 0 : item + 1)
            }}><IoIosArrowForward/></button>
        </div>
        {isOpen && 
        <AnimatePresence>
                <div>
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <button className='p-4 z-50' onClick={()=>{
                        setOpenedImageSlider((item : any) => item === 0 ? (newImages?.length - 1) : item - 1)
                    }}><IoIosArrowBack/></button>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50"
                            onClick={()=> setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-md dark:bg-slate-900 gap-2 text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                        >
                            {/* <a target="_blank" href={newImages[openedImageSlider as number]?.imageUrl}>
                                <ImageHandler className="" isForBigSlider={true} handleError={()=> console.log("Failed to load")} item={{imageUrl : newImages[openedImageSlider as number]?.imageUrl}}/>
                            </a> */}
                            {newImages?.filter((image : any) => image.loaded)?.map((item : any , index) => (
                                <img key={index} className={`${index === openedImageSlider ? "flex" : "hidden"}`} src={item.imageUrl} alt="" />
                            ))}
                        </motion.div>
                    <button className='p-4 z-50' onClick={()=>{
                        setOpenedImageSlider((item : any) => item === (newImages?.length - 1) ? 0 : item + 1)
                    }}><IoIosArrowForward/></button>
                </div>
                </div>
        </AnimatePresence>}
    </>)
}

export default Slider