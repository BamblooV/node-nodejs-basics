import { open } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const create = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    try {

        open(filePath, 'wx', (err, fd) => {
            if (err?.code === "EEXIST") {
                throw new Error("FS operation failed");
            }
        });

        await writeFile(filePath, "I am fresh and young");
    } catch (error) {
        throw error;
    }
};

await create();