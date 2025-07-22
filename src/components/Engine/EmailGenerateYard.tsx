"use client"

import React, { ChangeEvent , useEffect, useRef, useState } from "react";
import { RiAiGenerate } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { IoCopyOutline } from "react-icons/io5";
import EmailTemplateYard from "./EmailTemplatesSlideBar";
import { AnimatePresence , motion } from "motion/react";
import { LiaTimesSolid } from "react-icons/lia";
import Cookies from "js-cookie";
import { LuLayoutTemplate } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/services/redux/store";
import { addToData } from "@/services/redux/reducers/templateSlice";
import { insertToForm } from "@/services/redux/reducers/templateSlice";


interface InputPartsProps {
    name : string
    title : string
    height ?: string
    inputType : "textarea" | "default" | "select-option" | "checkbox"
    options ?: string[]
    placeholder : string 
    error ?: boolean
    width ?: string
    value ?: string
    defaultValue ?: string
    onChange ?: (e : ChangeEvent<HTMLTextAreaElement>) => void
}

const EmailGeneratorYard = () => {

    const [pending , setPending] = useState(false)

    const templateForm = useAppSelector(state => state.templateSlice.form)

    const [mode , setMode] = useState(true)

    const [saveTemplateModal , setSaveTemplateModal] = useState(false)

    const resultRef = useRef<any>(null)

    const [result , setResult] = useState<string>("")

    const [open , setOpen] = useState(false)

    const idRef = useRef<any>(null)

    const [error , setError] = useState(false)

    const dispatch = useAppDispatch()

    const [body , setBody] = useState<any>({})

    const handleSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        
        e.preventDefault()
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
            
        setBody(data)

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/generate-email` , {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${Cookies.get("access_token")}`
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
            idRef.current = data?.id
        }).catch(err => {
            console.log(err)
        }).finally(()=>{
            setPending(false)
        })

        dispatch(insertToForm({}))
    }

    const copyTheResult = () => {
        navigator.clipboard.writeText(result as string)
        toast.success("Copied Successfully")
    }

    useEffect(()=>{
        if(result !== ""){
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    },[result])

    if(pending)
        return(<div className="flex flex-col gap-3 items-center justify-center h-screen w-full">
            <h3 className="text-[20px] font-semibold">Generating Email Please be Patient...</h3>
            <Loading/>
        </div>)


    return (<>
        <div className="w-full dark:bg-[#111828] p-3 md:w-full flex flex-col gap-4 items-center justify-evenly min-h-screen">
            {/* <h1 className="text-[40px] font-semibold dark:text-white text-slate-700">Email Generator</h1> */}
            <form onSubmit={handleSubmit} className="flex p-3 shadow-md rounded-md bg-white dark:bg-slate-800 flex-col w-full md:w-1/2 gap-2">
                <label className="flex flex-col md:flex-row w-full justify-between gap-2">
                    <div className="flex md:flex-row flex-col gap-2">
                        <button onClick={()=> setMode(true)} type="button" className={`py-2 px-3 rounded-3xl font-semibold ${!mode ? "bg-transparent text-blue-600" : "bg-blue-600 text-white"} border-2 border-blue-600`}>Compose New Email</button>
                        <button onClick={()=> setMode(false)} type="button" className={`py-2 px-3 rounded-3xl font-semibold ${mode ? "bg-transparent text-blue-600" : "bg-blue-600 text-white"} border-2 border-blue-600`}>Reply to Email</button>
                    </div>
                    <button className="p-2 font-semibold flex items-center justify-center gap-2 px-3 border-2 text-yellow-500 border-yellow-500 dark:text-yellow-400 dark:border-yellow-400 rounded-full" type="button" onClick={()=> setOpen(true)}><LuLayoutTemplate className="text-[24px]"/> <span className="text-[16px]">Templates</span></button>
                </label>

                    <InputParts error={error} placeholder="" height="h-[200px]" inputType="textarea" name="email_content" title="Email Content"/>
                    
                    {!mode && <InputParts error={error} placeholder="Received Email" name="received_email" title="Received Email" inputType="textarea"/>}

                    <div className="w-full md:flex-row flex-col flex gap-2">
                        <InputParts defaultValue={templateForm ? templateForm?.language : ""} width="w-full md:w-1/2" placeholder="" inputType="select-option" name="language" title="Language" options={["english" , "french" , "german" , "spanish" , "italian" , "portuguese" , "hindi"]}/>
                        <InputParts defaultValue={templateForm ? templateForm?.length : ""} width="w-full md:w-1/2" placeholder="" title="Length" inputType="select-option" name="length_d" options={["long" , "medium" , "short" , "very short"]}/>
                    </div>

                    <div className="w-full md:flex-row flex-col flex gap-2">
                        <InputParts width="w-full md:w-1/2" placeholder="Forexample : Friendly" defaultValue={templateForm ? templateForm?.tone : ""}  title="Choose a Tone" options={['friendly','professional','casual','formal','persuasive','humorous','inspirational','neutral']} inputType="select-option" name="tone"/>
                        <InputParts width="w-full md:w-1/2" placeholder="" defaultValue={templateForm ? templateForm?.recipient_role : ""} inputType="select-option" name="recipient_role" title="Recipient Role" options={["peer" , "manager" , "client"]}/>
                    </div>

                    <InputParts placeholder="Describe what features do you want to have in your Email" defaultValue={templateForm ? templateForm?.other_options : ""} name="other_options"  title={"Other Options"} inputType={"textarea"}/>
                    <InputParts placeholder="Signature" defaultValue={templateForm ? templateForm?.signature : ""} name="signature" title="Signature" inputType="default"/>
                <button type="submit" className="w-full shadow-md bg-blue-500 flex items-center gap-2 justify-center p-2 rounded-md bg-linear-to-r from-cyan-500 to-blue-500 text-white cursor-pointer"><span className="text-[20px]">Generate</span> <RiAiGenerate className="text-[20px]"/></button>
            </form>
            {result && <div ref={resultRef} className="flex p-3  shadow-md rounded-md bg-white dark:bg-slate-800 flex-col w-full md:w-1/2 gap-2">
                <div className="flex justify-between">
                    <h3 className="p-2 font-semibold text-[20px]">Generated Email</h3>
                    <button className="mt-2" onClick={copyTheResult}><IoCopyOutline/></button>
                </div>    
                <InputParts height="h-[400px]" onChange={(e)=> setResult(e.target.value)} defaultValue={result as string} title="" name="generated_email" placeholder="" inputType={"textarea"}/>
                <form onSubmit={(e : any) => {
                    e.preventDefault()
                    let data = {
                        id : idRef.current,
                        edits : e.target?.edit?.value
                    }

                    setPending(true)
                    
                    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/new-generated-text` , {
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body : JSON.stringify(data)
                    }).then(res => {
                        if(res.ok){
                            return res.json()
                        }
                    }).then(data => {
                        setResult(data?.generated_text)
                        idRef.current = data?.id
                    })
                    .catch(err => console.log(err))
                    .finally(()=> setPending(false))

                }} className="flex items-center gap-2 justify-between">
                    <InputParts name="edit" title="" placeholder="Comment to edit the generated email" inputType="default"/>
                    <button className="text-[25px] p-2"><FiSend /></button>
                </form>
                <button type="button" onClick={()=> setSaveTemplateModal(true)} className="text-[20px] cursor-pointer font-semibold dark:bg-green-800 rounded-md bg-green-300 p-2">Save Template</button>
                {saveTemplateModal && <SaveTemplateModal body={body} currentId={idRef.current} onClose={setSaveTemplateModal} open={saveTemplateModal}/>}
            </div>}
        </div>
        <EmailTemplateYard isOpen={open} setClose={()=> setOpen(false)}/>
    </>    
    );
}

interface SaveTemplateModal {
    onClose : (value : boolean) => void
    body : any,
    open : boolean
    currentId : number | string
}

const SaveTemplateModal : React.FC<SaveTemplateModal> = ({onClose , open , currentId , body}) => {

    const dispatch = useAppDispatch()

    const [pending , setPending] = useState(false)

    const onSubmit = (e : ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)
        let data = {name : e?.target?.nameD?.value}
        
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/generate-email/${currentId}`,{
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${Cookies.get("access_token")}`
            },
            body : JSON.stringify(data)
        }).then(res => {
            if(res.ok){
                return res.json()
            }
        }).then(data => {
            toast.success("Template Saved Successfully!")
            let email = {...body , name : e?.target?.nameD?.value}
            dispatch(addToData(email))
            onClose(false)
        }).finally(()=>{
            setPending(false)
        })
    }

    return(<>
        <AnimatePresence >
            <form onSubmit={onSubmit} className="fixed flex-col inset-0 z-50 flex items-center justify-center">
                {open && <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50"
                    onClick={()=> onClose(false)}
                />}
                {open &&  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-md gap-4 dark:bg-slate-900  text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
                >   
                    <button onClick={()=> onClose(false)}><LiaTimesSolid/></button>
                    <h1 className="text-[20px] font-semibold">Save Template</h1>
                    <InputParts name={"nameD"} title={""} inputType={"default"} placeholder={"Enter the name"} />
                    <button disabled={pending} className={`w-full p-2 bg-green-300 dark:bg-green-600 rounded-md`}>{pending ? "Pending..." : "Save"}</button>
                </motion.div>}
                
            </form>
        </AnimatePresence>
    </>)
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
                <input defaultValue={defaultValue} name={name} type="text" placeholder={placeholder} className={`p-3 w-full border-2 dark:bg-slate-700 ${error ? "border-red-500" : "border-slate-100 dark:border-none"} rounded-md border-1 w-full outline-none`} />
                {error && <span className="text-red-600">Required</span>}
            </label>
        case "select-option":
            return <label className={`flex ${width ? width : "w-full"} flex-col gap-2`}>
                <h3 className="font-semibold">{title}</h3>
                <select className={`p-2 cursor-pointer w-full rounded-md border-1 dark:bg-slate-700 dark:border-none border-2 outline-none`} name={name} id="">
                    {options?.map((item : any , index : number) => (
                        <option selected={defaultValue === item} key={index} value={item}> {name === "language" && countries_flag(item)} {name === "tone" && tone_emojies(item)} {item[0].toUpperCase() + item.substring(1)}</option>
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

const countries_flag = (countryName : string) => {
    switch(countryName){
        case "english":
            return "🇺🇸"
        case "french":
            return "🇫🇷"
        case "german":
            return "🇩🇪"
        case "spanish":
            return "🇪🇸"
        case "italian":
            return "🇮🇹"
        case "portuguese":
            return "🇵🇹"
        case "hindi":
            return "🇮🇳"
    }
}

const tone_emojies = (name : string) => {
    switch(name){
        case "friendly":
            return "😀"
        case "professional":
            return "👨‍💼"
        case "casual":
            return "😎"
        case "formal":
            return "🤵"
        case "persuasive":
            return "🗿"
        case "humorous":
            return "💖"
        case "inspirational":
            return "🚀"
        case "neutral":
            return "🙂"
    }
}

export default EmailGeneratorYard