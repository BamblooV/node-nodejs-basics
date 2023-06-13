import { access, rm } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const pathToDelete = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await access(pathToDelete);
    } catch (error) {
        throw new Error("FS operation failed");
    }

    try {
        await rm(pathToDelete);
    } catch (e) {
        throw e;
    }
};

await remove();