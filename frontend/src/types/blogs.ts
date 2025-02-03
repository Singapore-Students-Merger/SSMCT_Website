type BlogDetails = {
    id: number;
    title: string;
    description: string;
    author: string;
    contentFile: string;
    topics: string[];
    category: string;
    difficulty: "None" | "Easy" | "Medium" | "Hard";
    event: string;
    date: string;
    thumbnail?: string;
    type: string;
    featured?: boolean;
}

// BlogSummary is used to display all the different Blogs
type BlogSummary = Omit<BlogDetails, 'source' | 'contentFile'>;

// BlogUpload is used when uploading a Blog
type BlogUpload = Omit<BlogDetails, 'date' | 'length' | 'author'>;

export type { BlogDetails, BlogSummary, BlogUpload };
