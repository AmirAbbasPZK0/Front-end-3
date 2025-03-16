"use client"
import ResponseDisplay from '@/components/Engine/ResponseDisplay';
import useWebSocket from '@/hooks/useWebSocket';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
// import Switch from 'react-ios-switch';
// import UrlInput from './UrlInput';
// import MenuButtons from './MenuButtons';
// import AttachFileModal from './AttachFileModal';
import { useAppSelector , useAppDispatch } from '@/services/redux/store';
import { addRecency, removeRecency } from '@/services/redux/reducers/resourceSlice';
// import ChosenIcon from './ChosenIcon';
// import UploadedFileBox from './UploadedFileBox';
// import ModuleBar from './ModuleBar';
// import NewDropdown from './NewDropdown';
// import BackToHomeButton from './BackToHomeButton';
import { IoIosAttach, IoMdSend } from "react-icons/io";
import NewDropdown from "../Engine/NewDropdown";
import { TbSend2 } from 'react-icons/tb';
import { addUrlToInputArray } from '@/services/redux/reducers/urlInputSlice';
import UrlInput from '../Engine/UrlInput';
import UploadedFileBox from '../Engine/UploadedFileBox';
import AttachFileModal from '../Engine/AttachFileModal';



const PropmptYard = () => {

    const [prompt , setPrompt] = useState("")
    const [selectedDepth , setSelectedDepth] = useState(false)
    const [selectedAnswerStyle , setSelectedAnswerStyle] = useState("")
    const [code , setCode] = useState("")
    const [newResponse, setNewResponse] = useState('');
    const selectedResources = useAppSelector(state => state.resourceSlice.selectedResource)
    const isNew = useAppSelector(state => state.resourceSlice.isNew)
    const uploadedFiles = useAppSelector(state => state.fileUploadsSlice)
    const urlInputs = useAppSelector(state => state.urlInputSlice)
    const dispatch = useAppDispatch()
    const { socket, response, setResponse, responseRef } = useWebSocket();
    const router = useRouter()
    const [isAttachOpen , setIsAttachOpen] = useState(false)
    const pathname = usePathname();
    const textareaRef = useRef<any>(null)

    const isRTL = (text : string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);

    const sendMessage = (prompt: string) => {
      if(selectedResources === "url" && urlInputs.urlInputs.includes("")){
        return false
      }
      localStorage.setItem('prompt', prompt);
      dispatch(removeRecency())
      if (selectedResources == 'url' && urlInputs.urlInputs.filter(e => e.length > 0).length == 0) {
        return;
      }
      const url = new URL(window.location.href);
      const codde = url.pathname.split('/search/')[1];
      responseRef.current = ''; // Reset the ref for the next response
      if(uploadedFiles.uploadedFilesUrl.length > 0){
        socket?.emit('send_message', {
          // code: code,
          query: prompt,
          source: "file",
          answerType: selectedAnswerStyle,
          llmType: "Preferred LLM",
          depth: selectedDepth,
          urls: uploadedFiles.urlsOfFiles,
          sessionId: localStorage.getItem('sessionId'),
          code: codde
        });
      }else{
        socket?.emit('send_message', {
          // code: code,
          query: prompt,
          source: selectedResources,
          answerType: selectedAnswerStyle,
          llmType: "Preferred LLM",
          depth: selectedDepth,
          urls: urlInputs.urlInputs,
          sessionId: localStorage.getItem('sessionId'),
          code: codde
        });
      }
      setResponse((prev : any) => {
        const cp: any = { ...prev };
        cp[prompt] = {
          text: '',
          isLoading: true,
          isDone : false,
          images: [],
          data: null,
          videos : [],
          relatedQuestions: []
        };
  
        return cp;
      });
  
      setPrompt('');

    };
    useEffect(() => {
      if (!socket) return;
  
      socket?.on('receive_start', (data: {
        code: string
      }) => {
        if(!window.location.href.includes(data.code)){
          router.push('/search/' + data.code);
          setCode(data.code);
        }
      });
  
      const onReceiveMessage = (data : any) => {
        responseRef.current += data.message;
        setNewResponse(prev => prev + data.message);
        setResponse((prev : any) => {
          const cp = { ...prev };
  
          cp[localStorage.getItem('prompt') as string].text += data.message;
  
          // Fact Check
          if(data.message.claim_1){
            cp[localStorage.getItem('prompt') as string].data = data;
          }
  
          return cp;
        });
      };
  
      socket?.on('receive_message', onReceiveMessage);
      socket?.on('receive_images', (data: { images: any; }) => {
        setResponse((prev: any) => {
          const cp = { ...prev };
  
          if(cp[localStorage.getItem("prompt") as string]?.images){
            cp[localStorage.getItem('prompt') as string].images = data.images;
          }
  
          return cp;
        });
      });
      socket?.on('new_session', (data : any) => {
        localStorage.setItem('sessionId', data.sessionId);
      });
      socket?.on('receive_citation', (data : any) => {
        setResponse((prev : any) => {
          const cp = { ...prev };
  
          cp[localStorage.getItem('prompt') as string].sources = Object.values(data);
          return cp;
        });
      });
      socket?.on('receive_relevant', (data : any) => {
        setResponse((prev : any) => {
          const cp = { ...prev };
  
          cp[localStorage.getItem('prompt') as string].relatedQuestions = data.data?.followUp;
  
          return cp;
        });
      });
  
      socket?.on("suggested videos" , (data : any) => {
        setResponse((prev : any) => {
          const cp = {...prev}
  
          cp[localStorage.getItem("prompt") as string].videos = data.data
          
          return cp
        })
      })
  
      socket?.on('response_done', (data: {
        message: string
      }) => {
        if (data.message == 'done#') {
          // Update the state with the final response
          setResponse((prev : any) => {
            const cp: any = { ...prev };
            const prom = localStorage.getItem('prompt') || prompt;
            if (prom) {
              if (!cp[prom]) {
                cp[prom] = {};
              }
              cp[prom].isLoading = false;
              cp[prom].isDone = true
              // cp[prom].images = null
              cp[prom].data = null
              cp[prom].text = responseRef.current;
            }
            return cp;
          });
        }
  
        if (data.message == 'done#') {
          setNewResponse('');
        }
      });
      return () => {
        socket.off('receive_message', onReceiveMessage);
      };
    }, [socket]);

    // useEffect(() => {
    //   window.scrollTo({
    //     top: document.documentElement.scrollHeight,
    //     behavior: "smooth",
    //   });
    // }, [response]);
  
    useEffect(()=>{
      if(window.location.href.includes("search")){
        dispatch(removeRecency())
      }else{
        dispatch(addRecency())
      }
    },[])

  useEffect(() => {
    if (newResponse.length > 0) {

      setResponse((prev: any) => {
        const cp: any = { ...prev };
        const prom = localStorage.getItem('prompt') || prompt;
        if (prom) {
          if (!cp[prom]) {
            cp[prom] = {};
          }
          cp[prom].isLoading = false;
        }
        return cp;
      });

    }
  }, [newResponse]);
  
    useEffect(() => {
      const handleKeyDown = (event: { key: string; }) => {
        if (event.key === "Enter") {
          if(prompt !== ""){
            sendMessage(prompt)
          }
        }
      };
  
      window.addEventListener("keydown", handleKeyDown);
  
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [prompt , urlInputs.urlInputs]);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
      }
    }, [prompt]);

    return (<>
        <div className="flex w-[100%] items-center min-h-[20vh] pt-4 justify-center gap-4 flex-col">
          {isNew && (<>
            <div className="md:w-[40%] w-[80%]">
            <form onSubmit={e => {
              e.preventDefault()
              if(prompt !== ""){
                sendMessage(prompt)
              }
            }} className='border-2 flex flex-col text-center gap-5 w-full border-slate-400 dark:border-slate-100 p-4 rounded-3xl'>
              <textarea ref={textareaRef} onChange={e => {
                setPrompt(e.target.value)
              }} placeholder='Write your text...' rows={1} cols={200} className={`w-full ${isRTL(prompt) ? "text-right" : "text-left"} resize-none w-full min-h-2 overflow-hidden placeholder-gray-500 bg-transparent outline-none`}></textarea>
              <div className='flex flex-row items-center justify-between gap-2 w-full'>
                <div className='flex flex-row gap-2'>

                  {/* Attach File Modal */}
                  <button onClick={()=>{
                    setIsAttachOpen(true)
                  }} type='button' className='flex flex-row gap-2 text-[20px] items-center justify-center'><IoIosAttach/></button>
                  {isAttachOpen && <AttachFileModal setClose={setIsAttachOpen}/>}
                  
                  {/* Modules */}
                  <NewDropdown disabled={uploadedFiles.uploadedFilesUrl.length > 0 || !isNew}/>
                    
                </div>
                <div className='flex flex-row gap-2 items-center justify-center'>
                  <button className='text-[20px] p-1' type='submit'><TbSend2/></button>
                </div>
              </div>
            </form>
            {selectedResources === 'url' && isNew && (
                  <div className='w-full'>
                    {urlInputs.urlInputs.map((url, index) => (
                      <UrlInput key={index} url={url} urlInputs={urlInputs.urlInputs} index={index}/>
                    ))}
                    <button
                      onClick={() => dispatch(addUrlToInputArray())}
                      className="border-2 border-slate-400 dark:border-slate-100 p-2 flex flex-row gap-2 justify-center rounded mt-2"
                      type="button"
                    >
                      <span>Add URL</span>
                    </button>
                  </div>
            )}
            
            {uploadedFiles.uploadedFilesUrl.length > 0 && uploadedFiles.uploadedFilesUrl.map((item , index) => (
              <UploadedFileBox key={index} data={item}/>
            ))}
            
            </div>
          </>)}
          {!isNew && Object.entries(response)?.map(([key, value]: any, index) =>
              <ResponseDisplay
                key={key}
                isDone={value.isDone}
                videos={value.videos}
                query={key}
                data={value.data ? value?.data : false}
                response={value.text}
                sources={value.sources}
                isLoading={value.isLoading}
                images={value.images}
                relatedQuestions={value.relatedQuestions}
                responseRef={(index == Object.keys(response).length - 1 && !value.text) ? responseRef : undefined}
                sendMessage={sendMessage}
              />
          )}
        </div>
    </>);
}
 
export default PropmptYard;