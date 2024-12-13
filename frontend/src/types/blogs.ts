type BlogDetails = {
    title: string;
    description: string;
    author: string;
    contentFile: string;
    topics: string[];
    categories: string[];
    level: "None" | "Easy" | "Medium" | "Hard";
    date: Date;
    thumbnail?: string;
}

// BlogSummary is used to display all the different Blogs
type BlogSummary = Omit<BlogDetails, 'source' | 'contentFile'>;

// BlogUpload is used when uploading a writeup
type BlogUpload = Omit<BlogDetails, 'date' | 'length' | 'author'>;

export type { BlogDetails, BlogSummary, BlogUpload };
