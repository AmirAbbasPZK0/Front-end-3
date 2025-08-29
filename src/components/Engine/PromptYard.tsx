"use client"
import ResponseDisplay from '@/components/Engine/ResponseDisplay';
import useWebSocket from '@/hooks/useWebSocket';
import { useRouter } from 'next/navigation';
import { Key, RefObject, useEffect, useRef, useState } from 'react';
import { useAppSelector , useAppDispatch } from '@/services/redux/store';
import { addRecency, removeRecency } from '@/services/redux/reducers/resourceSlice';
import { IoIosAttach } from "react-icons/io";
import NewDropdown from "../Engine/NewDropdown";
import { TbSend2 } from 'react-icons/tb';
import { addUrlToInputArray } from '@/services/redux/reducers/urlInputSlice';
import UrlInput from '../Engine/UrlInput';
import UploadedFileBox from '../Engine/UploadedFileBox';
import AttachFileModal from '../Engine/AttachFileModal';
import { checkIsEmpty } from '@/functions/checkIsEmpty';
import { checkHistory, increaseCounter, makeItFalse , setCounterToPayload } from '@/services/redux/reducers/newThreadSlice';
import { selectResource } from '@/services/redux/reducers/resourceSlice';
import SkeletonLoading from './SkeletonLoading';
import useAgent from '@/hooks/useAgent';

const PropmptYard = () => {

    const [prompt , setPrompt] = useState("");
    const [newResponse, setNewResponse] = useState('');
    const [isAttachOpen , setIsAttachOpen] = useState(false);
    const textareaRef : RefObject<HTMLTextAreaElement | null> = useRef(null);
    const {isMobile} = useAgent()

    // Redux selectors (no shallowEqual)
    const selectedResources = useAppSelector(state => state.resourceSlice.selectedResource);
    const isNew = useAppSelector(state => state.resourceSlice.isNew);
    const uploadedFiles = useAppSelector(state => state.fileUploadsSlice);
    const urlInputs = useAppSelector(state => state.urlInputSlice);
    const user = useAppSelector(state => state?.userSlice);
    
    const historyChecker = useAppSelector(state => state?.newThreadSlice.history);
    const counter = useAppSelector(state => state.newThreadSlice.counter);
    const dispatch = useAppDispatch();
    const { socket, response, setResponse, responseRef , findoraMessageRef} = useWebSocket();
    const router = useRouter();
    const selectedAnswerStyle = "";

    const isRTL = (text : string) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);

    const sendMessage = (prompt: string) => {
      dispatch(increaseCounter());
      localStorage.setItem('counter' , `${counter}`);

      if(localStorage.getItem("sessionId") === "session_exist" || localStorage.getItem("sessionId") === undefined){
        localStorage.removeItem("sessionId");
      }
      dispatch(makeItFalse());
      if(selectedResources === "url" && urlInputs.urlInputs.includes("")){
        return false;
      }
      dispatch(removeRecency());
      if (selectedResources === 'url' && urlInputs.urlInputs.filter(e => e.length > 0).length === 0) {
        return;
      }
      findoraMessageRef.current = "";
      const url = new URL(window.location.href);
      const codde = url.pathname.split('/c/')[1];
      responseRef.current = ''; // Reset the ref for the next response
      socket?.emit('send_message', {
        query: prompt,
        depth : false,
        source: uploadedFiles.uploadedFilesUrl.length > 0 ? "file" : selectedResources,
        answerType: selectedAnswerStyle,
        llmType: "Preferred LLM",
        urls: uploadedFiles.uploadedFilesUrl.length > 0 ? uploadedFiles.urlsOfFiles : urlInputs.urlInputs,
        sessionId: localStorage.getItem('sessionId'),
        email : user?.data?.email,
        code: codde
      });
      setResponse((prev : any) => {
        const cp: any = { ...prev };
        cp[localStorage.getItem("counter") as string] = {
          question : prompt,
          text: '',
          isLoading: true,
          isDone : false,
          images: [],
          data: null,
          videos : [],
          findoraMessage : "",
          relatedQuestions: []
        };
        return cp;
      });
      setPrompt('');
    };

    useEffect(() => {
      if (!socket) return;

      socket?.on('receive_start', (data: { code: string }) => {
        if(!window.location.href.includes(data.code)){
          router.push('/c/' + data.code);
        }
      });

      const onReceiveMessage = (data : any) => {
        responseRef.current += data.message;
        setNewResponse(prev => prev + data.message);
        setResponse((prev : any) => {
          const cp = { ...prev };
          cp[localStorage.getItem('counter') as string].text += data.message;
          if(data.message.claim_1){
            cp[localStorage.getItem('counter') as string].data = data;
          }
          return cp;
        });
      };

      socket?.on('receive_message', onReceiveMessage);
      socket?.on('receive_images', (data: { images: any; }) => {
        setResponse((prev: any) => {
          const cp = { ...prev };
          if(cp[localStorage.getItem("counter") as string]?.images){
            cp[localStorage.getItem("counter") as string].images = data.images;
          }
          return cp;
        });
      });

      socket?.on('new_session', (data : any) => {
        localStorage.setItem("sessionId" , data.id);
      });

      socket?.on('receive_citation', (data : any) => {
        setResponse((prev : any) => {
          const cp = { ...prev };
          cp[localStorage.getItem('counter') as string].sources = Object.values(data);
          return cp;
        });
      });
      socket?.on('receive_relevant', (data : any) => {
        setResponse((prev : any) => {
          const cp = { ...prev };
          cp[localStorage.getItem('counter') as string].relatedQuestions = data.data?.followUp;
          return cp;
        });
      });

      socket?.on("suggested videos" , (data : any) => {
        setResponse((prev : any) => {
          const cp = {...prev};
          cp[localStorage.getItem("counter") as string].videos = data.data;
          return cp;
        });
      });

      socket?.on('response_done', (data: { message: string }) => {
        if (data.message === 'done#') {
          setResponse((prev : any) => {
            const cp: any = { ...prev };
            const prom = localStorage.getItem('counter') || prompt;
            if (prom) {
              if (!cp[prom]) {
                cp[prom] = {};
              }
              cp[prom].isLoading = false;
              cp[prom].isDone = true;
              cp[prom].data = null;
              cp[prom].text = responseRef.current;
              cp[prom].findoraMessage = findoraMessageRef.current;
            }
            return cp;
          });
          setNewResponse('');
        }
      });

      return () => {
        socket.off('receive_message', onReceiveMessage);
      };
    }, [socket]);

    useEffect(()=>{
      const onReceiveFindoraMessage = (data : any)=>{
        findoraMessageRef.current += data.message;
        setResponse((prev : any) => {
          const cp = {...prev};
          cp[localStorage.getItem("counter") as string].findoraMessage = findoraMessageRef.current;
          cp[localStorage.getItem("counter") as string].isLoading = false;
          return cp;
        });
      };
      socket?.on("findora_message" , onReceiveFindoraMessage);
      return () => socket?.off("findora_message" , onReceiveFindoraMessage);
    },[socket]);

    useEffect(()=>{
      if(window.location.href.includes("/c")){
        dispatch(removeRecency());
      }else{
        dispatch(addRecency());
      }
    },[]);

    useEffect(() => {
      if (newResponse.length > 0) {
        setResponse((prev: any) => {
          const cp: any = { ...prev };
          const prom = localStorage.getItem('counter') || prompt;
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
      const handleKeyDown = (event:any) => {
        if (event.key === "Enter" && !event.shiftKey) {
          if(!isMobile){
            if(checkIsEmpty(prompt)){
              sendMessage(prompt);
            }
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

    useEffect(()=>{
      const url = new URL(window.location.href);
      let history;
      if(localStorage.getItem("history") !== null && localStorage.getItem("history") !== undefined){
        history = JSON.parse(localStorage.getItem("history") as any);
      }
      if(url.pathname.includes("/c/")){
        const found = history?.find((item : any) => item?.code === window.location.href.split("/c/")[1]);
        if (found) {
          dispatch(setCounterToPayload(found?.conversation?.[found?.conversation?.length - 1]?.id + 1));
          localStorage.setItem('counter' , `${counter}`);
          const newResponses: any = {};
          found?.conversation?.forEach((d : any) => {
            newResponses[d?.id] = {
              text: d?.answer,
              question : d?.question,
              isLoading: false,
              isDone : true,
              images: d?.images,
              data: Object.values(d?.fact_check_data)?.length > 0 ? {message : d?.fact_check_data} : null,
              videos : d?.videos,
              findoraMessage : d?.findora_message,
              relatedQuestions: [],
              sources : Object?.values(d?.citations)
            };
            dispatch(selectResource(d?.module ? d?.module : "web"));
          });
          setResponse((prev: any) => ({ ...prev, ...newResponses }));
        }else{
          console.log("Failed")
        }
        dispatch(checkHistory(false));
      }
    },[localStorage.getItem("history")]);

    if(historyChecker){
      return <div className='flex w-[90%] items-end justify-end h-screen '>
        <SkeletonLoading/>
      </div>;
    }

    return (<>
        <div className="flex w-[100%] items-center min-h-[20vh] pt-4 pb-20 justify-center gap-4 flex-col">
          {isNew && (<>
            <div className="md:w-[40%] flex flex-col gap-4 items-center justify-center h-[80vh] w-[90%]">
              {user.isLogin ? 
                <h3 className="text-[24px] md:text-[30px] md:font-light font-normal text-zinc-900 dark:text-slate-200 antialiased text-center">
                    Welcome back <span className="font-normal">{user.data?.first_name}</span> <br/>
                </h3> 
                : 
                <h3 className="text-[24px] md:text-[36px] md:font-light font-normal text-zinc-900 dark:text-slate-200 antialiased text-center">
                    Ask Me Anything
                </h3>}
              <div className='flex flex-col text-center gap-5 w-full bg-slate-50 shadow-md dark:bg-[#202938] p-4 rounded-3xl'>
              <textarea ref={textareaRef} onChange={e => {
                setPrompt(e.target.value);
              }} value={prompt} placeholder='Write your text...' dir="auto" rows={1} cols={200} className={`w-full ${isRTL(prompt) ? "text-right" : "text-left"} resize-none w-full min-h-2 overflow-hidden placeholder-gray-500 bg-transparent outline-none`}></textarea>
              <div className='flex flex-row items-center justify-between gap-2 w-full'>
                <div className='flex flex-row gap-2'>
                  {/* Attach File Modal */}
                  <button onClick={()=>{
                    setIsAttachOpen(true);
                  }} type='button' className='flex flex-row gap-2 text-[20px] items-center justify-center'><IoIosAttach/></button>
                  {isAttachOpen && <AttachFileModal setClose={setIsAttachOpen}/>}
                  {/* Modules */}
                  <NewDropdown/>
                </div>
                <div className='flex flex-row gap-2 items-center justify-center'>
                  {/* <SpeechToText sendMessage={sendMessage}/> */}
                  {/* <div className='flex gap-2 items-center justify-center'>
                    <span className='font-semibold md:text-[15px] text-[13px]'>Deep Search</span>
                    {user.isLogin ? (
                      <button
                      onClick={() => {
                        if(user.isLogin){
                          setSelectedDepth(item => !item)
                        }
                      }}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                        selectedDepth ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          selectedDepth ? 'translate-x-6' : ''
                        }`}
                      ></div>
                    </button>
                    ) : 
                      <div className="relative inline-flex items-center opacity-50 cursor-not-allowed">
                        <button
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                          // disabled
                          className="w-14 h-8 flex items-center bg-gray-300 rounded-full p-1"
                        >
                          
                          <div className="bg-white flex items-center justify-center w-6 h-6 rounded-full shadow-md">
                            <IoLockClosedSharp className='text-slate-900'/>
                          </div>

                          {showTooltip && (
                            <div className="absolute top-full bg-slate-950 dark:bg-slate-50 dark:text-black text-white py-1 px-2 mt-2 w-[180px] rounded-md left-1/2 -translate-x-1/2">
                              Please log in to use Deep Search
                            </div>
                          )}
                        </button>
                        
                      </div>
                    }
                  </div> */}
                  <button onClick={()=>{
                    if(checkIsEmpty(prompt)){
                      sendMessage(prompt);
                    }
                  }} className='text-[20px] p-1' type='submit'><TbSend2/></button>
                </div>
              </div>
            </div>
            {selectedResources === 'url' && isNew && (
                  <div className='w-full'>
                    {urlInputs.urlInputs.map((url, index) => (
                      <UrlInput key={index} url={url} urlInputs={urlInputs.urlInputs} index={index}/>
                    ))}
                    <button
                      onClick={() => dispatch(addUrlToInputArray())}
                      className="bg-slate-50 shadow-md dark:bg-[#202938] p-3 flex flex-row gap-2 justify-center rounded-2xl  mt-2"
                      type="button"
                    >
                      <span>Add URL</span>
                    </button>
                  </div>
            )}
            {uploadedFiles.uploadedFilesUrl.length > 0 && uploadedFiles.uploadedFilesUrl.map((item: { name: string; url: string; } , index: Key | null | undefined) => (
              <UploadedFileBox key={index} data={item}/>
            ))}
            </div>
          </>)}
          {!isNew && Object.entries(response)?.map(([key, value]: any, index) =>
              <ResponseDisplay
                coreId={key}
                key={key}
                id={index}
                findoraMessage={value.findoraMessage}
                isDone={value.isDone}
                videos={value.videos}
                query={value?.question}
                data={value.data ? value?.data : false}
                response={value.text}
                sources={value.sources}
                isLoading={value.isLoading}
                images={value.images}
                relatedQuestions={value.relatedQuestions}
                responseRef={(index === Object.keys(response).length - 1 && !value.text) ? responseRef : undefined}
                sendMessage={sendMessage}
              />
          )}
        </div>
    </>);
};

export default PropmptYard;