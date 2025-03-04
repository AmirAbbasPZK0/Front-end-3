"use client"

import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const AnimatedText = () => {

    const [textColor, setTextColor] = useState("#008f7a");

    return (<>
        <div className="flex items-center justify-center pt-10">
        <div
            className="text-4xl lg:text-5xl h-[15vh] md:h-[20vh] font-semibold"
            style={{ color: textColor }}
        >
            <TypeAnimation
            sequence={[
                "Accurate",
                1000,
                () => setTextColor("#008f7a"),
                "Transparent",
                1000,
                () => setTextColor("#eaba33"),
                "Intelligent",
                1000,
                () => setTextColor("#0b87b6"),
                "Trustworthy",
                1000,
                () => setTextColor("#7332a1"),
                "Reliable",
                1000,
                () => setTextColor("#c31069"),
                "Scientific",
                1000,
                () => setTextColor("#c67f48"),
                "Unbiased",
                1000,
                () => setTextColor("#3d6a7d"),
            ]}
            wrapper="span"
            speed={40}
            deletionSpeed={95}
            repeat={Infinity}
            />
        </div>
        </div>
    </>);
}
 
export default AnimatedText;