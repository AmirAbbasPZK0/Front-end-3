"use client"

import { LuText } from "react-icons/lu";
import { RxTextAlignJustify } from "react-icons/rx";
import { MdShortText } from "react-icons/md";
import { ChangeEvent, useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import Loading from "./Loading";
import ReactMarkdown from "react-markdown"

const EmailGeneratorYard = () => {

    const [length , setLength] = useState("long")

    const [pending , setPending] = useState(false)

    const [personalize , setPersonalize] = useState(false)

    const [result , setResult] = useState<any>(false)

    const [error , setError] = useState(false)

    const [advanced , setAdvanced] = useState(true)

    const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        // setPending(true)
        if(e?.target?.purpose?.value === "" || e.target?.recipient?.value === "" || e.target?.sender?.value === ""){
            console.log(e?.target?.purpose?.value , e.target?.recipient?.value , e.target?.sender?.value)
            setError(true)
            
        }else{
            setPending(true)
            let data = personalize ? {
                personalize : e.target?.personalize?.value,
            } : {
                purpose : e.target?.purpose?.value,
                subject : e.target?.subject_line?.value,
                email_type : e.target?.email_type?.value,
                recipient_role : e.target?.recipient_role?.value,
                receiver_name : e.target?.recipient?.value,
                sender_name : e.target?.sender?.value,
                language : e.target?.language?.value,
                add_greeting : e.target?.add_greeting?.checked,
                length,
                tone : e.target?.tone?.value,
                other_options : e?.target?.other_options?.value
            }
            
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
                console.log(data)
                setResult(data?.generated_text)
                // setResult()
            }).catch(err => {
                console.log(err)
            }).finally(()=>{
                setPending(false)
            })
        }
    }

    if(pending)
        return(<div className="flex flex-col gap-3 items-center justify-center h-screen w-full">
            <h3 className="text-[20px] font-semibold">Generating Email Please be Patient...</h3>
            <Loading/>
        </div>)

    if(result){
        return(<>
            <div className="flex gap-2 dark:bg-[#111828] flex-col w-full items-center min-h-screen justify-center">
                <div className="flex p-3 shadow-md rounded-md bg-white dark:bg-slate-800 flex-col w-full md:w-1/2 gap-2">
                    <div className="flex w-full justify-between">
                        <h3 className="font-semibold text-[20px] md:text-[26px]">Generated Email</h3>
                        <button onClick={()=> setResult(false)} className="p-1 rounded-md border-2">Generate New Email</button>
                    </div>
                    <ReactMarkdown>{result}</ReactMarkdown>
                </div>
                {/* <div className="flex p-3 shadow-md rounded-md bg-white dark:bg-slate-800 items-center justify-between w-full md:w-1/2 gap-2">
                    <input type="text" placeholder="Comment" className="outline-none w-full" />
                    <button className="text-[20px]"><FiSend/></button>
                </div> */}
            </div>
        </>)
    }

    return (<>
        <div className="w-full dark:bg-[#111828] p-3 md:w-full flex flex-col gap-4 items-center justify-evenly min-h-screen">
            <h1 className="text-[40px] font-semibold dark:text-white text-slate-700">Email Generator</h1>
            <form onSubmit={handleSubmit} className="flex p-3 shadow-md rounded-md bg-white dark:bg-slate-800 flex-col w-full md:w-1/2 gap-2">
                {/* <label className="flex flex-col gap-2">
                    <h2 className="font-semibold">Type</h2>
                    <div className="flex gap-2">
                        <button onClick={()=> setPersonalize(true)} type="button" className={`py-2 px-3 rounded-3xl font-semibold ${!personalize ? "bg-transparent text-blue-600" : "bg-blue-600 text-white"} border-2 border-blue-600`}>Personalize</button>
                        <button onClick={()=> setPersonalize(false)} type="button" className={`py-2 px-3 rounded-3xl font-semibold ${personalize ? "bg-transparent text-blue-600" : "bg-blue-600 text-white"} border-2 border-blue-600`}>Default</button>
                    </div>
                </label> */}
                
                
                    <InputParts placeholder="Example: Introduction to New Client, Proposal for Marketing Campaign, Follow-up on Job Application." inputType="default" name="subject_line" title="Subject Line"/>
                    <InputParts error={error} placeholder="I am writing to purpose a new marketing campain that i believe will be effective for your business" inputType="textarea" name="purpose" title="Purpose"/>
                    <div className="flex flex-col md:flex-row gap-3 md:items-end">
                        <label className="flex flex-col gap-2">
                            <h3 className="font-semibold">Length</h3>
                            <div className="flex flex-row gap-2 justify-start">
                                <button type="button" className={`px-2 py-1 text-[25px] ${length === "long" ? "bg-slate-300 dark:bg-slate-900" : "bg-slate-100 dark:bg-slate-800"} cursor-pointer rounded-md`} onClick={()=>setLength("long")}><RxTextAlignJustify/></button>
                                <button type="button" className={`px-2 py-1 text-[20px] ${length === "medium" ? "bg-slate-300 dark:bg-slate-900" : "bg-slate-100 dark:bg-slate-800"} cursor-pointer rounded-md`} onClick={()=>setLength("medium")}><LuText/></button>
                                <button type="button" className={`px-2 py-1 text-[25px] ${length === "short" ? "bg-slate-300 dark:bg-slate-900" : "bg-slate-100 dark:bg-slate-800"} cursor-pointer rounded-md`} onClick={()=>setLength("short")} ><MdShortText/></button>
                            </div>
                        </label>
                        {/* <InputParts placeholder="" title="Avoid Dashed" name="avoid_dashes" inputType={"checkbox"} /> */}
                        <InputParts placeholder="" title="Add Greeting" name="add_greeting" inputType={"checkbox"} />
                    </div>
                    <InputParts placeholder="" inputType="select-option" name="language" title="Language" options={["english" , "french" , "german" , "spanish" , "italian" , "portuguese" , "hindi" , "thai"]}/>
                    <InputParts placeholder="Forexample : Friendly" title="Choose a Tone" options={['friendly','professional','casual','formal','persuasive','humorous','inspirational','neutral']} inputType="select-option" name="tone"/>
                    
                    {/* Advanced Options */}

                    {/* <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" onClick={(e)=> setAdvanced(item => !item)} className="sr-only peer" value="" />
                            <div
                                className="group peer bg-white rounded-full duration-300 w-16 h-8 ring-2 ring-slate-500 after:duration-300 after:bg-slate-500 peer-checked:after:bg-slate-500 peer-checked:ring-slate-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"
                            ></div>
                        </label>
                    </div> */}

                    {advanced && (<>
                        <InputParts error={error} placeholder="Example: potential client, colleague, or supervisor." inputType="default" name="recipient" title="Recipient"/>
                        <InputParts error={error} placeholder="Example: John Smith, Marketing Department, Product Team A, Acme Corporation." inputType="default" name="sender" title="Sender"/>
                        <InputParts error={error} placeholder="Forexample : Follow-Up" title="Email Type" inputType="select-option" options={["introduction" , "follow-Up" , "request" , "thank You" , "meeting Schedule"]} name="email_type"/>
                        <InputParts placeholder="" inputType="select-option" name="recipient_role" title="Recipient Role" options={["peer" , "manager" , "client"]}/>
                        <InputParts placeholder="Describe what features do you want to have in your Email" name="other_options" height={"h-[200px]"} title={"Other Options"} inputType={"textarea"}/>
                    </>)}

                <button type="submit" className="w-full shadow-md bg-blue-500 flex items-center gap-2 justify-center p-2 rounded-md bg-linear-to-r from-cyan-500 to-blue-500 text-white cursor-pointer"><span className="text-[20px]">Generate</span> <RiAiGenerate className="text-[20px]"/></button>
            </form>
        </div>
    </>);
}

const InputParts = ({name , title , inputType , options , placeholder , height , error} : {name : string , title : string , height ?: string , inputType : "textarea" | "default" | "select-option" | "checkbox" , options ?: string[] , placeholder : string , error ?: boolean}) => {
    switch(inputType){
        case "textarea":
            return <label className="flex flex-col gap-1">
                <h3 className="font-semibold">{title}</h3>
                <textarea placeholder={placeholder} className={`rounded-md border-2 p-3 dark:bg-slate-700 ${error ? "border-red-500" : "border-slate-100"} dark:border-none outline-none ${height ? height : "h-[100px]"}`} name={name} id=""></textarea>
                {error && <span className="text-red-600">Required</span>}
            </label>
        case "default":
            return <label className="flex flex-col gap-1">
                <h3 className="font-semibold">{title}</h3>
                <input name={name} type="text" placeholder={placeholder} className={`p-3 border-2 dark:bg-slate-700 ${error ? "border-red-500" : "border-slate-100"} dark:border-none rounded-md border-1 w-full outline-none`} />
                {error && <span className="text-red-600">Required</span>}
            </label>
        case "select-option":
            return <label className="flex flex-col gap-2">
                <h3 className="font-semibold">{title}</h3>
                <select className="p-2 cursor-pointer rounded-md border-1 dark:bg-slate-700 dark:border-none border-2  outline-none" name={name} id="">
                    {options?.map((item : any , index : number) => (
                        <option key={index} value={item}>{item}</option>
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