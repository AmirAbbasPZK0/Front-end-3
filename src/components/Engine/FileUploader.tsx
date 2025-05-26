"use client"

import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useAppDispatch } from '@/services/redux/store';
import {addUrl} from "@/services/redux/reducers/fileUploadSlice"
import toast from "react-hot-toast";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles , setUploadedFiles] = useState<File[]>([])
  const [uploadStatus, setUploadStatus] = useState(false);
  const {edgestore} = useEdgeStore()
  const dispatch = useAppDispatch()

  const onDrop = useCallback((acceptedFiles : File[]) => {
    setFiles(
      acceptedFiles.map((file : File) => Object.assign(file, { preview: URL.createObjectURL(file) }))
    );
  }, []);

  const handleUpload = async () => {

    setUploadStatus(true)
    
    try{
      if(files[0]){
        const res = await edgestore.myFiles.upload({file : files[0]})
        dispatch(addUrl({url : res.url , name : files?.[0].name}))
        setUploadedFiles([...uploadedFiles , files?.[0]])
        toast.success("File has been uploaded Successfully", {
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "white",
            color: "black",
          },
        });
      }
    }catch(err){
      console.log(err)
    }finally{
      setUploadStatus(false)
    }

  };

  useEffect(()=>{
    handleUpload()
  },[files])

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='dark:bg-slate-900 flex flex-col gap-2'>
      <div

        {...getRootProps()}
       
        className='flex gap-2 border-dashed rounded-md text-center items-center h-[300px] p-[20px] border-2 cursor-pointer border-blue-500'
      >
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to select files</p>
      </div>
      <div className='p-2 rounded-md overflow-y-auto flex flex-col gap-2'>
        {uploadStatus && (
          <div className='p-2 rounded-md border-2 ' >
          <p className='flex flex-row justify-between p-2 items-center'>
            <span className='flex flex-row items-center gap-2'>
              {files?.[0].name.slice(0,8)}...{files?.[0].name.split(".")[files?.[0].name.split(".").length -1]}
            </span>
            <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
          </p>
      </div>
        )}
        <div className='flex flex-col gap-2 overflow-y-[230px]'>
          {/* {urls.map((file) => (
            <div className='p-2 rounded-md bg-slate-300 dark:bg-slate-600' key={file.name}>
                <p className='flex flex-row justify-between p-2 items-center'>
                  <span className='flex flex-row items-center gap-2'>
                    <ChosenIcon e={file.name.split(".")[file.name.split(".").length -1]} className="text-[20px] flex flex-row gap-2"/>
                    {file.name.slice(0,8)}...{file.name.split(".")[file.name.split(".").length -1]}
                  </span>
                  <button onClick={()=>{
                    dispatch(removeFile(file))
                  }} className='top-0' type='button'><ChosenIcon e='times'/></button>
                </p>
            </div>
          ))} */}
        </div>
      </div>
      <div className='flex flex-col gap-2'>
      </div>
    </div>
  );
};

export default FileUploader;
