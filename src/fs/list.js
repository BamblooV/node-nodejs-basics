import { access, opendir } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const targerPath = path.join(__dirname, "files");

    try {
        await access(targerPath);
    } catch (error) {
        throw new Error("FS operation failed");
    }

    const targetDir = await opendir(targerPath);
    for await (const dirent of targetDir) {
        const { name } = dirent;
        console.log(name);
    }
};

await list();