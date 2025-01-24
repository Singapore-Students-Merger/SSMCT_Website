"use client"
import { Members } from "@/types/members";
import { useInView } from 'react-hook-inview'

interface MemberCardProps {
    member: Members;
    idx: number;
}
const MemberCard: React.FC<MemberCardProps> = ({member,idx}) => {
    const [ref, isVisible] = useInView({
        unobserveOnEnter: true
      })

    const rolesElement = member.roles.length > 0 && (
        <div>
            <h3 className="text-xl font-bold text-white">Roles</h3>
            <p className="text-white text-lg">{member.roles.join(", ")}</p>
        </div>
    )
    return (
        <div ref = {ref} className={`!animate-fill-forwards
            opacity-0
            !animate-duration-500
        flex flex-col gap-4 relative px-12 py-6 ${isVisible && ((Math.floor(idx/3)%2)?'lg:animate-fadeIn-left':'lg:animate-fadeIn-right')} 
            ${isVisible && ((Math.floor(idx/2)%2)?'animate-fadeIn-left':'animate-fadeIn-right')}`}>
            <div className={`bg-[#1E3D49]/50 ${Math.floor(idx/3)%2?'lg:skew-x-6':'lg:-skew-x-6'} ${Math.floor(idx/2)%2?'skew-x-6':"-skew-x-6"} absolute w-full h-full -z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}></div>
            <div>
            <h3 className="text-2xl font-bold text-white">{member.realName??member.username}</h3>
            <p className="italic text-lg">{member.username}</p>
            </div>
            {member.ctfCount?<p className="text-white text-lg">Participated in {member.ctfCount} CTFs</p>:null}
            {rolesElement}
        </div>
    )
}
export default MemberCard;