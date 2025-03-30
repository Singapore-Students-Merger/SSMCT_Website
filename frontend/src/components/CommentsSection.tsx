"use client"
import CommentForm from "./CommentForm";
import Comment from "../types/comment";
import CommentComp from "./CommentComponent";
import Link from "next/link";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
interface CommentsSectionProps {
    id: string;
    type: "blogs"| "writeups";
    loggedIn:boolean
}

export default function CommentsSection({ id,type,loggedIn } : CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}/comment/${id}`)
        .then((res) => {
            if (!res.ok) {
                toast.error("Error fetching comments")
                throw new Error("Error fetching comments")
            }
            return res.json()
        })
        .then((data) => {
            setComments(data.data)
        })
        .catch((error) => {
            console.log(error)
            toast.error("Error fetching comments")
        })
    }, [id,type]);
    return (
        <>
            <section className="px-16 mt-4 mb-32">
                {loggedIn && <CommentForm id = {id} type = {type} setComments = {setComments}/>}
                {!loggedIn && <p className="text-center text-lg">Please <Link href = "/auth/signin" className="text-[#3182ce]">login</Link> to comment</p>}
                <hr className="border-t-2 mt-8 mb-16 border-secondary"/>
                <h2 className="text-3xl font-bold">Comments</h2>
                <div className="space-y-8 mt-8" id = "commentsSection">
                    {comments.length === 0 && <p className="text-center text-2xl mt-4 text-bold text-white" id = "no_comments">No comments yet</p>}
                    {comments.map((comment,idx) => <CommentComp comment = {comment} key = {idx}></CommentComp>)}
                </div>
            </section>
        </>
    )
}