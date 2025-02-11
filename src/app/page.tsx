import Features from "@/components/Home/Features";
import Introduction from "@/components/Home/Introduction";
import Latest from "@/components/Home/Latest";
import UseOnPhone from "@/components/Home/UseOnPhone";
import WhoWeAre from "@/components/Home/WhoWeAre";

export default function Home() {
  return (
    <div>
      <Introduction />
      <WhoWeAre />
      <Features />
      <Latest />
      <UseOnPhone />
    </div>
  );
}
