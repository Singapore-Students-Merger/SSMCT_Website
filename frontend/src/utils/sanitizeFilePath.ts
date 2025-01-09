import fs from "fs";
import path from "path";

export default function sanitizeFilePath(
  basePath: string,
  filename: string,
  extensions: string[]
): string {
  // Validate extensions
  if (!Array.isArray(extensions) || extensions.length === 0) {
    throw new Error("Extensions must be a non-empty array");
  }

  // Create a regex to match allowed extensions
  const extensionPattern = extensions.join('|');
  const regex = new RegExp(`^[a-zA-Z0-9_\\-]+\\.(${extensionPattern})$`);
  // Validate filename
  if (!regex.test(filename)) {
    throw new Error(`Invalid filename. Allowed extensions: ${extensions.join(", ")}`);
  }

  // Construct and resolve the full path
  const fullPath = path.resolve(basePath, filename);

  // Ensure the resolved path is within the allowed base directory
  if (!fullPath.startsWith(basePath)) {
    throw new Error("Invalid file path");
  }

  // Check if the file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error("File not found");
  }

  return fullPath;
}
