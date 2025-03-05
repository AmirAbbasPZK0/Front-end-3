import React from 'react';

const Loading = () => {
  return (
    <div className="w-full gap-x-2 flex justify-center items-center">
      <div className="w-5 bg-[#008f7a] h-5 rounded-full animate-bounce" />
      <div className="w-5 h-5 bg-[#eaba33] rounded-full animate-bounce" />
      <div className="w-5 h-5 bg-[#0b87b6] rounded-full animate-bounce" />
      <div className="w-5 h-5 bg-[#7332a1] rounded-full animate-bounce" />
    </div>
  );
}

export default Loading;
