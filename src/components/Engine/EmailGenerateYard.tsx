"use client"

import { LuText } from "react-icons/lu";
import { RxTextAlignJustify } from "react-icons/rx";
import { MdShortText } from "react-icons/md";
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { IoCopyOutline } from "react-icons/io5";

interface InputPartsProps {
    name : string ,
    title : string , 
    height ?: string , 
    inputType : "textarea" | "default" | "select-option" | "checkbox" , 
    options ?: string[] , 
    placeholder : string , 
    error ?: boolean
    width ?: string
    value ?: string
    defaultValue ?: string
    onChange ?: (e : ChangeEvent<HTMLTextAreaElement>) => void
}

const EmailGeneratorYard = () => {

    const [pending , setPending] = useState(false)

    const resultRef = useRef<any>(null)

    const [mode , setMode] = useState(true)

    const [result , setResult] = useState<string>("")

    const [error , setError] = useState(false)

    const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(mode){
            if(e?.target?.email_content?.value === ""){
                setError(true)
                return false
            }
        }else{
            if(e?.target?.email_content?.value === "" || e?.target?.received_email?.value === ""){
                setError(true)
                return false
            }
        }

        setPending(true)
            let data
            if(mode){
                data = {
                    email_content : e.target?.email_content?.value,
                    language : e.target?.language?.value,
                    length : e.target?.length_d?.value,
                    tone : e.target?.tone?.value,
                    other_options : e?.target?.other_options?.value,
                    signature : e?.target?.signature?.value
                }
            }else{
                data = {
                    email_content : e.target?.email_content?.value,
                    language : e.target?.language?.value,
                    length : e.target?.length_d?.value,
                    tone : e.target?.tone?.value,
                    received_email : e.target?.received_email?.value,
                    other_options : e?.target?.other_options?.value,
                    signature : e?.target?.signature?.value
                }
            }
            
            // console.log(data)

            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/generate-email` , {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data)
            }).then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    throw new Error("Error")
                }
            }).then(data => {
                setResult(data?.generated_text)
                // setResult()
            }).catch(err => {
                console.log(err)
            }).finally(()=>{
                setPending(false)
            })
    }

    const copyTheResult = () => {
        navigator.clipboard.writeText(result as string)
        toast.success("Copied Successfully")
    }

    useEffect(()=>{
        if(result !== ""){
            resultRef.current.scrollTo(0, 0)
        }
    },[result])

    if(pending)
        return(<div className="flex flex-col gap-3 items-center justify-center h-screen w-full">
            <h3 className="text-[20px] font-semibold">Generating Email Please be Patient...</h3>
            <Loading/>
        </div>)


    return (<>
        <div className="w-full dark:bg-[#111828] p-3 md:w-full flex flex-col-reverse gap-4 items-center justify-evenly min-h-screen">
            {/* <h1 className="text-[40px] font-semibold dark:text-white text-slate-700">Email Generator</h1> */}
            <form onSubmit={handleSubmit} className="flex p-3 shadow-md rounded-md bg-white dark:bg-slate-800 flex-col w-full md:w-1/2 gap-2">
                <label className="flex flex-col gap-2">
                    <h2 className="font-semibold">Type</h2>
                    <div className="flex gap-2">
                        <button onClick={()=> setMode(true)} type="button" className={`py-2 px-3 rounded-3xl font-semibold ${!mode ? "bg-transparent text-blue-600" : "bg-blue-600 text-white"} border-2 border-blue-600`}>Compose New Email</button>
                        <button onClick={()=> setMode(false)} type="button" className={`py-2 px-3 rounded-3xl font-semibold ${mode ? "bg-transparent text-blue-600" : "bg-blue-600 text-white"} border-2 border-blue-600`}>Reply to Email</button>
                    </div>
                </label>

                    {!mode && <InputParts error={error} placeholder="Received Email" name="received_email" title="Received Email" inputType="textarea"/>}

                    <InputParts error={error} placeholder="I am writing to email_content a new marketing campain that i believe will be effective for your business" height="h-[200px]" inputType="textarea" name="email_content" title="Email Content"/>
                    {/* <div className="flex flex-col md:flex-row gap-3 md:items-end">
                        <label className="flex flex-col gap-2">
                            <h3 className="font-semibold">Length</h3>
                            <div className="flex flex-row gap-2 justify-start">
                                <button type="button" className={`px-2 py-1 text-[25px] ${length === "long" ? "bg-slate-300 dark:bg-slate-900" : "bg-slate-100 dark:bg-slate-800"} cursor-pointer rounded-md`} onClick={()=>setLength("long")}><RxTextAlignJustify/></button>
                                <button type="button" className={`px-2 py-1 text-[20px] ${length === "medium" ? "bg-slate-300 dark:bg-slate-900" : "bg-slate-100 dark:bg-slate-800"} cursor-pointer rounded-md`} onClick={()=>setLength("medium")}><LuText/></button>
                                <button type="button" className={`px-2 py-1 text-[25px] ${length === "short" ? "bg-slate-300 dark:bg-slate-900" : "bg-slate-100 dark:bg-slate-800"} cursor-pointer rounded-md`} onClick={()=>setLength("short")} ><MdShortText/></button>
                            </div>
                        </label>
                    </div> */}
                    <div className="w-full md:flex-row flex-col flex gap-2">
                        <InputParts width="w-full md:w-1/2" placeholder="" title="Length" inputType="select-option" name="length_d" options={["long" , "medium" , "short"]}/>
                        <InputParts width="w-full md:w-1/2" placeholder="" inputType="select-option" name="language" title="Language" options={["english" , "french" , "german" , "spanish" , "italian" , "portuguese" , "hindi" , "thai"]}/>
                        <InputParts width="w-full md:w-1/2" placeholder="Forexample : Friendly" title="Choose a Tone" options={['friendly','professional','casual','formal','persuasive','humorous','inspirational','neutral']} inputType="select-option" name="tone"/>
                    </div>

                    {/* <InputParts placeholder="" inputType="select-option" name="recipient_role" title="Recipient Role" options={["peer" , "manager" , "client"]}/> */}
                    <InputParts placeholder="Describe what features do you want to have in your Email" name="other_options"  title={"Other Options"} inputType={"textarea"}/>
                    <InputParts placeholder="Signature" name="signature" title="Signature" inputType="default"/>
                <button type="submit" className="w-full shadow-md bg-blue-500 flex items-center gap-2 justify-center p-2 rounded-md bg-linear-to-r from-cyan-500 to-blue-500 text-white cursor-pointer"><span className="text-[20px]">Generate</span> <RiAiGenerate className="text-[20px]"/></button>
            </form>
            {result && <div ref={resultRef} className="flex p-3  shadow-md rounded-md bg-white dark:bg-slate-800 flex-col w-full md:w-1/2 gap-2">
                <div className="flex justify-between">
                    <h3 className="p-2 font-semibold text-[20px]">Generated Email</h3>
                    <button className="mt-2" onClick={copyTheResult}><IoCopyOutline/></button>
                </div>    
                <InputParts height="h-[400px]" onChange={(e)=> setResult(e.target.value)} defaultValue={result as string} title="" name="generated_email" placeholder="" inputType={"textarea"}/>
            </div>}
        </div>
    </>);
}

const InputParts = ({name , title , defaultValue , inputType , options , placeholder , height , error , width , onChange} : InputPartsProps) => {
    switch(inputType){
        case "textarea":
            return <label className={`flex ${width ? width : "w-full"} flex-col gap-1`}>
                <h3 className="font-semibold">{title}</h3>
                <textarea onChange={onChange} defaultValue={defaultValue} placeholder={placeholder} className={`rounded-md w-full border-2 p-3 dark:bg-slate-700 ${error ? "border-red-500" : "border-slate-100 dark:border-none"} outline-none ${height ? height : "h-[100px]"}`} name={name} id=""></textarea>
                {error && <span className="text-red-600">Required</span>}
            </label>
        case "default":
            return <label className={`flex ${width ? width : "w-full"} flex-col gap-1`}>
                <h3 className="font-semibold">{title}</h3>
                <input name={name} type="text" placeholder={placeholder} className={`p-3 w-full border-2 dark:bg-slate-700 ${error ? "border-red-500" : "border-slate-100 dark:border-none"} rounded-md border-1 w-full outline-none`} />
                {error && <span className="text-red-600">Required</span>}
            </label>
        case "select-option":
            return <label className={`flex ${width ? width : "w-full"} flex-col gap-2`}>
                <h3 className="font-semibold">{title}</h3>
                <select className={`p-2 cursor-pointer w-full rounded-md border-1 dark:bg-slate-700 dark:border-none border-2 outline-none`} name={name} id="">
                    {options?.map((item : any , index : number) => (
                        <option key={index} value={item}>{item[0].toUpperCase() + item.substring(1)}</option>
                    ))}
                </select>
            </label>
        case "checkbox":
            return <label className="flex p-1 items-center gap-2" htmlFor="">
                 <input type="checkbox" name={name} className="w-4 h-4 cursor-pointer bg-transparent border-2 rounded-lg"/>
                <h3 className="font-semibold text-sm">{title}</h3>
            </label>

    }
}

export default EmailGeneratorYard