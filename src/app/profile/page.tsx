import ProfileSection from "@/components/Global/ProfileSection";

const Page = () => {
    
    return (<>
        <div className="flex w-full items-center justify-center md:items-end md:justify-end">
            <div className="md:w-[90%] w-full h-[400px] p-3 m-4 rounded-md">
                <ProfileSection/>
            </div>
        </div>
    </>);
}
 
export default Page;