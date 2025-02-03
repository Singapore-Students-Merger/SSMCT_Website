import path from "path";

function getAssetNames(content: string): string[] {
    const regex = /!\[.*?\]\((.*?)\)/g;
    const assetNames = new Set<string>();

    let match;
    while ((match = regex.exec(content)) !== null) {
        const assetPath = match[1].trim(); // Get the full image path
        const assetName = path.basename(assetPath); // Extract only the filename
        assetNames.add(assetName); // Store it uniquely
    }

    return Array.from(assetNames);
}


function processMarkdownContent(content: string, imageLoadPath: string, images: Map<string, string>) {
    const regex = /!\[.*?\]\((.*?)\)/g;

    return content.replace(regex, (match, imagePath) => {
        const imageName = path.basename(imagePath).toLowerCase(); // Extract filename and normalize casing

        for (const [storedName, newFileName] of images.entries()) {
            if (storedName.toLowerCase() === imageName) { // Case-insensitive comparison
                return match.replace(imagePath, `${imageLoadPath}${newFileName}`);
            }
        }

        return match; // Return original if no match found
    });
}

export {processMarkdownContent, getAssetNames};
