type AchievementDetails = {
    ctf: string;
    place: number;
    description: string;
    date: Date;
    thumbnail?: string;
    members: string[];
    points: number;
    participants: number;
}

export type { AchievementDetails };