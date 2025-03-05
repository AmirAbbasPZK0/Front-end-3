"use client"
import { useState } from "react"
import { IoIosArrowBack , IoIosArrowForward } from "react-icons/io"

const Slider = ({images} : {images : {imageUrl : string}[]}) => {

    const [isActive , setIsActive] = useState(0)

    return(<>
        <div className="flex flex-row gap-2 w-full">
            <button onClick={()=>{
                setIsActive(item => item === 0 ? 4 : item - 1)
            }}><IoIosArrowBack/></button>
            <div className="md:w-[80%] w-[100%]">
                {images?.map((item , index) => (
                    <img className={`${isActive === index ? "md:max-w-full md:min-w-full min-h-[300px] max-h-[300px]" : "w-0 opacity-0"} object-cover rounded-md`} src={item.imageUrl} alt="" />
                ))}
            </div>
            <button onClick={()=>{
                setIsActive(item => item === 4 ? 0 : item + 1)
            }}><IoIosArrowForward/></button>
        </div>
    </>)
}

export default Slider