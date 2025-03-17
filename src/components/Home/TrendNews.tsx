interface TrendNewsProps {
    data : {
        Title : string
        Description : string
        Image : string
        URL : string
    }

}


const TrendNews = ({data} : TrendNewsProps) => {
    return(<>
        <a href={data.URL} target="_blank" className='border-2 hover:scale-[1.05] cursor-pointer transition-all border-slate-400 gap-2 flex flex-col dark:border-slate-100 p-4 rounded-3xl md:w-[13%] w-[80%]'>
            <img src={data.Image} className="md:h-[100px] h-[150px] rounded-2xl" alt="" />
            <div className="flex flex-col gap-1">
                <h3 className="text-[18px] font-semibold">{data.Title.slice(0,30)}...</h3>
                <p className="text-[10px]">{data.Description}</p>
            </div>
        </a>
    </>)
}

export default TrendNews