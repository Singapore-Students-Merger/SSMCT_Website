type BlogDetails = {
    id: number;
    title: string;
    description: string;
    author: string;
    contentFile: string;
    topics: string[];
    categories: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    date: Date;
    ctf?: string;
    source?: string;
    thumbnail?: string;
}

// BlogSummary is used to display all the different Blogs
type BlogSummary = Omit<BlogDetails, 'source' | 'contentFile'>;

// BlogUpload is used when uploading a Blog
type BlogUpload = Omit<BlogDetails, 'date' | 'length' | 'author'>;

export type { BlogDetails, BlogSummary, BlogUpload };
