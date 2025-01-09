import CommentForm from "./CommentForm";

interface CommentsSectionProps {
    blogOrWriteup: "blog" | "writeup";
    id: string;
}

export default function CommentsSection({ blogOrWriteup, id } : CommentsSectionProps) {
    return (
        <>
            <section className="px-16">
                <CommentForm />
                <hr className="border-t-2 mt-8 mb-16 border-secondary"/>
                <h2 className="text-3xl font-bold">Comments</h2>
                <div>
                    {/* Comments will be displayed here */}
                </div>
            </section>
        </>
    )
}