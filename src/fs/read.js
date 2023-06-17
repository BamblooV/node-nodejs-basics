import { access, readFile } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const targetPath = path.join(__dirname, "files", "fileToRead.txt");

    try {
        await access(targetPath);
    } catch (error) {
        throw new Error("FS operation failed");
    }

    try {
        const data = await readFile(targetPath, { encoding: 'utf8' });
        console.log(data);
    } catch (e) {
        throw e;
    }

};

await read();