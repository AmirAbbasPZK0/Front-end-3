"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addRecency, selectResource } from "@/services/redux/reducers/resourceSlice";
import { removeAllFiles } from "@/services/redux/reducers/fileUploadSlice";
import { removeAllUrls } from "@/services/redux/reducers/urlInputSlice";
import { setCounterToPayload } from "@/services/redux/reducers/newThreadSlice";
import { useAppSelector } from "@/services/redux/store";

interface KeyBoardHandlerProps {
  children: ReactNode;
}

const KeyBoardHandler = ({ children }: KeyBoardHandlerProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const counter = useAppSelector((state) => state.newThreadSlice.counter);
  const isAllowed = useAppSelector(state => state.newThreadSlice.isAllowed)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "d" && event.shiftKey) {
        event.preventDefault();
        if(isAllowed){
            dispatch(addRecency());
            dispatch(removeAllFiles());
            dispatch(removeAllUrls());
            dispatch(selectResource("web"));
            dispatch(setCounterToPayload(0));
            localStorage.setItem("counter", `${counter}`);
            router.push("/");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [counter, dispatch, router]); // <-- add dependencies

  return <>{children}</>;
};

export default KeyBoardHandler;
