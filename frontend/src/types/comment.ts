interface Comment {
    id: number;
    user: {
        name: string;
        image: string;
    };
    comment: string;
    date: string;
}

export default Comment;