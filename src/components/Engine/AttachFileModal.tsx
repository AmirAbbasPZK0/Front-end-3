import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUploader from './FileUploader';
import { FaTimes } from 'react-icons/fa';


interface AttachFileModalProps {
  setClose : (inner : boolean) => void
}

const AttachFileModal = ({setClose} : AttachFileModalProps) => {

  return (
    <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50"
            onClick={()=> setClose(false)}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md dark:bg-slate-900 gap-2 text-center flex flex-col rounded-2xl bg-white p-8 shadow-xl"
          >
            <div className='flex flex-row w-full justify-between'>
              <h1 className='text-black dark:text-slate-300 font-bold text-[30px]'>Attach Files</h1>
              <button className='text-[20px]' onClick={()=>{
                setClose(false)
              }}><FaTimes/></button>
            </div>
            <FileUploader/>
          </motion.div>
        </div>
      
    </AnimatePresence>
  );
};

export default AttachFileModal;
