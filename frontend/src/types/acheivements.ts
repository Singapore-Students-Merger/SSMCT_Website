type AchievementDetails = {
    title: string;
    description: string | null;
    date: Date;
    points: number | null;
    members: {
        realName?: string;
        name: string;
    }[];
    placing: string;
    link: string|null;
    logo?: string|null;
}

type Event = {
    name: string;
    id: number | null;
}
export type { AchievementDetails,Event };