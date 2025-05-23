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
          <div className='p-2 rounded-md bg-slate-300 dark:bg-slate-600' key={files?.[0].name}>
          <p className='flex flex-row justify-between p-2 items-center'>
            <span className='flex flex-row items-center gap-2'>
              {/* <ChosenIcon e={files?.[0].name.split(".")[files?.[0].name.split(".").length -1]} className="text-[20px] flex flex-row gap-2"/> */}
              {files?.[0].name.slice(0,8)}...{files?.[0].name.split(".")[files?.[0].name.split(".").length -1]}
            </span>
            <button className='top-0' type='button'>Pending..</button>
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
