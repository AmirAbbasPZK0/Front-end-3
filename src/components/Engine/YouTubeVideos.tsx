"use client"

import {useEffect , useState } from "react";
import { isRTL } from "@/functions/isRTL";

interface Video {
  title : string
  url : string
  source : string
  link : string
  date : string
  imageUrl : string
  imageHeight : string
  imageWidth : string
}


const YouTubeVideos = ({ url , data } : {url : string , data : Video}) => {
  const [videoId, setVideoId] = useState("");

  const [alternativeImage , setAlternativeImage] = useState<string | null>(null)

  const imageAdd = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKU8u0KLyQR4olL2YNLvNXdst_RLTInVKa1A&s"

  // Function to extract the video ID
  const getVideoId = (url : string) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const id = getVideoId(url);
    if (id) setVideoId(id);
  }, [url]);

  if (!videoId) {
    return 
  }

  return (<>
    <a target="_blank" href={url} className="md:w-[260px] w-[100%] md:h-[230px] h-[220px] flex flex-col gap-2 rounded-md">
        <img  onError={()=>setAlternativeImage("ffffff")} className="md:w-[300px] w-[100%] md:h-[150px] h-[150px] object-cover rounded-md" src={data.source === "YouTube" ? !alternativeImage ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : imageAdd : data?.imageUrl ? data?.imageUrl : imageAdd} alt="Videos" />
        <div className={`flex flex-col w-[250px] ${isRTL(data?.title) ? "text-right" : "text-left"}`}>
          <p className="text-[12px]">{data?.title}</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-300">{data?.date}</p>
        </div>
    </a>
  </>);
};

export default YouTubeVideos;