import { createWriteStream } from "node:fs"
import { access } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

    try {
        await access(filePath);
    } catch (e) {
        throw new Error("File don't exist");
    }

    try {
        const stream = createWriteStream(filePath);

        process.stdin.pipe(stream);
    } catch (e) {
        console.log(e);
    }
};

await write();