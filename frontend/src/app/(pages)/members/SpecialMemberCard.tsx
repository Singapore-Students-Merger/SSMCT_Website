import Image from "next/image"
interface SpecialMembersCardProps {
    member: {
        image?: string;
        title: string;
        realName: string;
        username: string;
    }
}
export default function SpecialMembersCard({member}: SpecialMembersCardProps){
    const imageEle = member.image? (
        <div className='w-10/12 mx-auto mb-4 overflow-clip relative bg-[#284250]/50 rounded-full aspect-square'>
            <div className='absolute inset-0 bg-gradient-to-b from-[#0F1B26] to-50% to-[#0F1B2600] rounded-full'>

            </div>
            <Image 
            className='w-10/12 z-10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            src={member.image} alt={member.username} fill = {true}/>
            <div className='z-20 absolute inset-0 bg-gradient-to-t from-[#0F1B26] to-50% to-[#0F1B2600] rounded-full'>

            </div>
        </div>
        )
        : null
    
    return (
        <div className='flex flex-col gap-2'>
            {imageEle}
            <div className='relative bg-[#1E3D4980] text-lg py-2 px-4 w-full text-white text-center -skew-x-12'>
            {member.title}
            </div>
            <p className='text-center text-white text-xl font-bold'>{member.realName}</p>
            <p className='text-center text-white text-xl'>{member.username}</p>
        </div>
    )
}