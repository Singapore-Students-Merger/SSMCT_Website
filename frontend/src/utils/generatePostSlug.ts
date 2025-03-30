export default function generatePostSlug(title: string, id: number | string) {
    const formattedTitle = title.trim().replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
    return `${formattedTitle}-${id}`;
}