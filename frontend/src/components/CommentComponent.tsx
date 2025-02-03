import Image from 'next/image'
import Comment from '@/types/comment'
export default function CommentComp({ comment } : { comment: Comment }) {
    const date = new Date(comment.date)
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    return (
        <div className="flex items-start space-x-8">
            <Image src={comment.user.image??"/default.png"} alt="Profile Picture" width={50} height={50} className="rounded-full m-0"/>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center space-x-2'>
                    <h3 className="font-bold text-xl">{comment.user.name}</h3>
                    <p className="text-sm text-gray-400">{formattedDate}</p>
                </div>

                <p className='text-white text-xl'>{comment.comment}</p>
            </div>
        </div>
    )
}