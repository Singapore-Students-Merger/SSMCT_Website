type WriteupDetails = {
    id: number;
    title: string;
    description: string;
    author: string;
    contentFile: string;
    topics: string[];
    categories: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    length: string;
    date: Date;
    ctf?: string;
    source?: string;
    thumbnail?: string;
}

// WriteupSummary is used to display all the different writeups
type WriteupSummary = Omit<WriteupDetails, 'source' | 'contentFile'>;

// WriteupUpload is used when uploading a writeup
type WriteupUpload = Omit<WriteupDetails, 'date' | 'length' | 'author'>;

export type { WriteupDetails, WriteupSummary, WriteupUpload };
