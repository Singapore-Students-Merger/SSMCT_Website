type AchievementDetails = {
    ctf: string;
    place: number;
    description: string;
    date: Date;
    thumbnail?: string;
    members: string[];
    points: number;
}

type Event = {
    name: string;
    id: number | null;
}
export type { AchievementDetails,Event };