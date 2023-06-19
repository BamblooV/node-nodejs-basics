import { access, opendir, mkdir, copyFile } from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const copy = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const srcFolder = path.join(__dirname, 'files');
    const destFolder = path.join(__dirname, 'files_copy');

    try {
        await access(srcFolder);
    } catch (error) {
        throw new Error("FS operation failed");
    }

    try {
        await access(destFolder);
        throw new Error("FS operation failed");
    } catch (e) {
        if (e.code === "ENOENT") {
            await mkdir(destFolder);
        } else {
            throw e;
        }
    }

    try {
        const srcDir = await opendir(srcFolder);

        for await (const dirent of srcDir) {
            const { name } = dirent;
            copyFile(path.join(srcFolder, name), path.join(destFolder, name))
        }

    } catch (e) {
        throw e
    }
};

await copy();
