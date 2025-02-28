import { motion } from "framer-motion";
import Link from "next/link";

export const GlowingBtn = () => {
  return (
    <Link href="http://185.110.191.217:3000/">
      <button className="text-white font-medium px-3 py-2 rounded-md text-sm lg:text-base overflow-hidden relative transition-transform lg:hover:scale-105 lg:active:scale-95">
        <span className="relative z-10">Try findora</span>
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: "-300%" }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 4,
            ease: "linear",
          }}
          className="bg-[linear-gradient(to_right,#8f14e6,#e614dc,#e61453,#e68414,#e6e614)] absolute z-0 inset-0 w-[400%]"
        ></motion.div>
      </button>
    </Link>
  );
};
