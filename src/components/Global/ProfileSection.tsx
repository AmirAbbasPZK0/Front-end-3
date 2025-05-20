"use client"

import ProfileAvatar from "../Engine/ProfileAvatar";
import { useAppSelector } from "@/services/redux/store";

const ProfileSection = () => {

    const user = useAppSelector(state => state.userSlice.data)

    return (<>
        <div className="flex flex-col gap-4">
            <h1 className="text-[30px]">My Account</h1>
            <div className="flex gap-4 items-center justify-start">
                <ProfileAvatar fontSize="text-[30px]" name={user?.first_name as string} size="w-20 h-20"/>
            </div>
        </div>
    </>);
}
 
export default ProfileSection;