"use client"
import CommentForm from "./CommentForm";
import Comment from "../types/comment";
import CommentComp from "./CommentComponent";
import Link from "next/link";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";
interface CommentsSectionProps {
    comments: Comment[];
    id: string;
    type: "blogs"| "writeups";
    loggedIn:boolean
    commentError: boolean;
}

export default function CommentsSection({ comments,id,type,loggedIn,commentsError } : CommentsSectionProps) {
    const [commentsState, setComments] = useState<Comment[]>(comments);
    useEffect(() => {
        if(commentsError){
            toast.error("Error fetching comments");
        }
    }, [commentsError]);
    return (
        <>
            <section className="px-16 mt-4 mb-32">
                {loggedIn && <CommentForm id = {id} type = {type} setComments = {setComments}/>}
                {!loggedIn && <p className="text-center text-lg">Please <Link href = "/auth/signin" className="text-[#3182ce]">login</Link> to comment</p>}
                <hr className="border-t-2 mt-8 mb-16 border-secondary"/>
                <h2 className="text-3xl font-bold">Comments</h2>
                <div className="space-y-8 mt-8" id = "commentsSection">
                    {commentsState.length === 0 && <p className="text-center text-2xl mt-4 text-bold text-white" id = "no_comments">No comments yet</p>}
                    {commentsState.map((comment,idx) => <CommentComp comment = {comment} key = {idx}></CommentComp>)}
                </div>
            </section>
        </>
    )
}