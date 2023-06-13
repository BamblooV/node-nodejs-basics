import { createGunzip } from "node:zlib";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";

import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { access } from "node:fs/promises";

const decompress = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const targetPath = path.join(__dirname, 'files', "archive.gz");
    const destPath = path.join(__dirname, 'files', "fileToCompress.txt");

    try {
        await access(destPath);
        throw new Error("FS operation failed");
    } catch (e) { }

    const gunzip = createGunzip();
    const source = createReadStream(targetPath);
    const destination = createWriteStream(destPath);

    try {
        await pipeline(source, gunzip, destination);
    } catch (e) {
        console.log(e);
    }
};

await decompress();