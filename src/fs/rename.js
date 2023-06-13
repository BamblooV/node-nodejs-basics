import { access, rename as renameP } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const oldPath = path.join(__dirname, "files", "wrongFilename.txt");
    const newPath = path.join(__dirname, "files", "properFilename.md");

    try {
        await access(oldPath);
    } catch (error) {
        throw new Error("FS operation failed");
    }

    try {
        await access(newPath);
        throw new Error("FS operation failed");
    } catch (e) {
        if (e?.code !== "ENOENT") {
            throw e;
        }
    }

    try {
        await renameP(oldPath, newPath);
    } catch (e) {
        throw e;
    }
};

await rename();