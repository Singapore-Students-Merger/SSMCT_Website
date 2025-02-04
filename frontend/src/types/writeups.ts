type WriteupDetails = {
    id: number;
    title: string;
    description: string;
    author: string;
    contentFile: string;
    topics: string[];
    category: string;
    difficulty: "Easy" | "Medium" | "Hard";
    date: string;
    ctf?: string;
    source?: string;
    thumbnail?: string;
}

// BlogSummary is used to display all the different Blogs
type WriteupSummary = Omit<WriteupDetails, 'source' | 'contentFile'>;

// BlogUpload is used when uploading a Blog
type WriteupUpload = Omit<WriteupDetails, 'date' | 'length' | 'author'>;

export type { WriteupDetails, WriteupSummary, WriteupUpload };
