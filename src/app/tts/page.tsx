"use client"

import { ChangeEvent, useState } from "react";

const Page = () => {
    const [downloadLink, setDownloadLink] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/tts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: e.target?.text?.value,
                }),
            });

            if (!res.ok) throw new Error("TTS request failed");

            const data = await res.json();
            setDownloadLink(data?.audio); // already proxied, no IP/HTTP issues
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <form onSubmit={onSubmit} className="w-[500px]">
                    <h1 className="text-[30px] text-center font-semibold">Text too speech</h1>
                    <textarea
                        placeholder="Paste your text here..."
                        className="p-2 rounded-md border-2 border-slate-500 w-full h-[200px]"
                        name="text"
                        id=""
                    ></textarea>
                    <button
                        disabled={loading}
                        className={`text-center p-2 ${loading ? "bg-blue-300" : "bg-blue-500"} rounded-md shadow-md w-full text-white`}
                        type="submit"
                    >
                        {loading ? "pending.." : "submit"}
                    </button>
                </form>

                {downloadLink && (
                    <button
                        type="button"
                        className="bg-red-500 m-2 p-2 text-white rounded-md"
                        onClick={() => {
                            const link = document.createElement("a");
                            console.log(downloadLink)
                            link.target = "_blank"
                            link.href = `http://141.11.123.21:8003${downloadLink}`;
                            link.download = "audio.mp3"; // suggested filename
                            link.click();
                        }}
                    >
                        Download Audio
                    </button>
                )}
            </div>
        </>
    );
};

export default Page;
