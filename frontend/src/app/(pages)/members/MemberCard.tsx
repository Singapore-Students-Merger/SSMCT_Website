import { Members } from "@/types/members";

interface MemberCardProps {
    member: Members;
    idx: number;
}
const MemberCard: React.FC<MemberCardProps> = ({member,idx}) => {
    const rolesElement = member.roles.length > 0 && (
        <div>
            <h3 className="text-xl font-bold text-white">Roles</h3>
            <p className="text-white text-lg">{member.roles.join(", ")}</p>
        </div>
    )
    return (
        <div className="flex flex-col gap-4 relative px-12 py-6">
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