"use client"
import  { useState, useRef } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import CommentComp from "./CommentComponent";
import Comment from "@/types/comment";
interface CommentFormProps {
  id: string;
  type: "blogs"| "writeups";
  setComments: (comments: Comment[]) => void; 
}

interface SubmitHandlerError {
  message: string;
}
const CommentForm = ({id,type,setComments} : CommentFormProps) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Function to auto-resize the textarea
  const inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to calculate new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to the new height
    }
    setComment(event.target.value);
  };




  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (comment.trim() === "") {
      toast.error("Comment cannot be empty");
      return;
    }
    const submitPromise = fetch(`/api/${type}/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: comment,
      }),
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      const newComment:Comment = (await response.json()).data;
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    })
    .catch((error: SubmitHandlerError | Error) => {
      console.error("Error submitting comment:", error instanceof Error ? error.message : (error as SubmitHandlerError).message);
      throw new Error("An error occurred while submitting the comment");
    });
    toast.promise(submitPromise, {
      loading: "Submitting comment...",
      success: "Comment submitted!",
      error: (err: SubmitHandlerError) => err.message || 'An error occurred',
    });
    return false;
  }
  return (
    <form onSubmit = {submitHandler}>
      <textarea
        className = {`
          mt-12
          text-white
        w-full
        rounded-lg
        px-4 py-4
        font-semibold
        hover:brightness-90 
        transition
        duration-200
        flex items-center justify-center
        text-lg
        focus:outline-none
        focus:ring-2
        focus:ring-secondary
        bg-secondary-tier3`}
        ref={textareaRef}
        value={comment}
        onChange={inputHandler}
        placeholder="Add Comment..."
        rows={2} // Default to a single row
      />
      <Button shadow={false} type="submit" version="secondary" className="ml-auto my-4 px-8">
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;
