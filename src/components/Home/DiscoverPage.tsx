"use client"

import { useState , useRef, useEffect } from "react";
import useAgent from "@/hooks/useAgent";
import { IoIosArrowBack , IoIosArrowForward } from "react-icons/io";
import { useAsync } from "@/hooks/useAsync";

interface CardProps {
    image : string
    url : string
    title : string
    description : string
}


const listOfTopics = [
    {
        title : "Top",
        tag : "top"
    },
    {
        title : "Politics",
        tag : "politics"
    },
    {
        title : "Business & Economy",
        tag : "business"
    },
    {
        title : "Science & Technology",
        tag : "science"
    },
    {
        title : "Health",
        tag : "health"
    },
    {
        title : "Sports",
        tag : "sports"
    },
    {
        title : "Arts & Culture",
        tag : "entertainment"
    }
]


const DiscoverPage = () => {
    
    const {isMobile} = useAgent()

    const [buttonDisplay , setButtonDisplay] = useState(false)
    
    const [data , setData] = useState([])

    const tabRef = useRef<any>(null)
    
    const [active , setActive] = useState("top")
    
    const {run , isLoading} = useAsync(active , "GET")

    useEffect(()=>{
        run().then((resData : any) => {
            setData(resData.articles)
        })
    },[active])

    return (<>
        <div ref={tabRef} className="flex p-3  flex-row gap-2 overflow-x-auto">
                {isMobile && <button onClick={()=>{
                    tabRef.current.scrollTo({
                        left: 0,
                        behavior: "smooth",
                    })
                    setButtonDisplay(false)
                }} className={`fixed top-40 p-1 left-2 rounded-full bg-slate-300 dark:bg-slate-600 ${buttonDisplay === false ? "hidden" : "flex"}`}><IoIosArrowBack/></button>}
                {listOfTopics?.map(item => (
                    <button onClick={()=> setActive(item.tag)} className={`${active === item.tag && "border-b-2 border-slate-400 "} p-2 px-4`}>{item.title}</button>
                ))}
                {isMobile && <button onClick={()=>{
                    tabRef.current.scrollTo({
                        left: 890,
                        behavior: "smooth",
                    })
                    setButtonDisplay(true)
                }} className={`fixed top-40 p-1 right-2 rounded-full bg-slate-300 dark:bg-slate-600 ${buttonDisplay === true ? "hidden" : "flex"}`}><IoIosArrowForward/></button>}
            </div>
        <div className="grid gap-4 grid-cols-1 p-3 md:grid-cols-2 lg:grid-cols-3">
            {isLoading && <div className="pb-80" >Loading...</div>}
            {!isLoading && data?.map((item : CardProps , index) => (
                <div className="p-4 border flex flex-col gap-2 rounded-lg shadow-lg bg-white dark:bg-[#111828]" key={index}>
                    <img src={item.image} className="w-full h-[170px]" alt="" />
                    <div className="flex flex-col gap-1">
                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                        <p className="text-sm mb-2">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </>);
}
 
export default DiscoverPage;