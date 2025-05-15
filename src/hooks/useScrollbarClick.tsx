import { useEffect } from 'react';

const useScrollbarClick = (callback : any) => {
  useEffect(() => {
    const handleMouseDown = (e : any) => {
      const isVerticalScrollbarClick =
        e.clientX >= document.documentElement.clientWidth;
      const isHorizontalScrollbarClick =
        e.clientY >= document.documentElement.clientHeight;

      if (isVerticalScrollbarClick || isHorizontalScrollbarClick) {
        callback?.(e);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [callback]);
};

export default useScrollbarClick;
